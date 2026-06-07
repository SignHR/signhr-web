import type { BlogPost, Author } from "./blog-types";

export type {
  BlogPost,
  BlogFrontmatter,
  BlogCategory,
  Author,
  TocEntry,
} from "./blog-types";
export {
  CATEGORIES,
  slugify,
  formatDate,
  extractTocFromHtml,
} from "./blog-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Cache tags so the backend revalidation webhook can target blog data. */
export const BLOG_TAG = "blog";
export const blogPostTag = (slug: string) => `blog:post:${slug}`;

/** Shape returned by the backend `PublicArticleResource` (see plan contract). */
interface PublicArticleResource {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string; // HTML
  cover: string | null;
  category: { name: string; slug: string } | null;
  author: {
    name: string;
    role: string;
    initials: string | null;
    accent: "purple" | "amber" | "blue" | "green";
    avatar: string | null;
  } | null;
  tags: string[];
  featured: boolean;
  read_time_minutes: number | null;
  date: string; // ISO (published_at)
}

interface CategoryResource {
  id: number;
  name: string;
  slug: string;
}

interface Envelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

/**
 * Fallback ISR window for blog fetches. On-demand revalidation (the backend
 * publish webhook → /api/revalidate) makes publishes instant; this short window
 * bounds staleness to a few minutes if that webhook is unconfigured or fails.
 */
const BLOG_REVALIDATE_SECONDS = 300;

function mapAuthor(a: PublicArticleResource["author"]): Author {
  return {
    name: a?.name ?? "SignHR",
    role: a?.role ?? "",
    initials: a?.initials ?? "",
    accent: a?.accent ?? "purple",
  };
}

function mapPost(p: PublicArticleResource): BlogPost {
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    body: p.content,
    cover: p.cover ?? undefined,
    category: (p.category?.name ?? "") as BlogPost["category"],
    readTime:
      p.read_time_minutes != null ? `${p.read_time_minutes} min read` : "",
    author: mapAuthor(p.author),
    date: p.date,
    featured: Boolean(p.featured),
  };
}

async function getJson<T>(
  path: string,
  tags: string[],
): Promise<T | null> {
  const dev = process.env.NODE_ENV !== "production";
  if (!API_URL) {
    if (dev) console.error("[blog] NEXT_PUBLIC_API_URL is not set — blog data unavailable.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: BLOG_REVALIDATE_SECONDS, tags },
    });
    if (!res.ok) {
      if (dev) console.error(`[blog] GET ${path} → HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as Envelope<T>;
    return (json.data ?? null) as T | null;
  } catch (err) {
    // Surfaced in dev so a failing server-side fetch (e.g. local TLS to the
    // Herd .test API) isn't silently swallowed into an empty blog.
    if (dev) {
      const cause = (err as { cause?: { code?: string; message?: string } })?.cause;
      console.error(
        `[blog] GET ${path} failed:`,
        (err as Error)?.message,
        cause?.code ?? cause?.message ?? "",
      );
    }
    return null;
  }
}

/** All published posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await getJson<{ posts: PublicArticleResource[] }>(
    "/blog/posts?per_page=100",
    [BLOG_TAG],
  );
  const posts = (data?.posts ?? []).map(mapPost);
  // Backend already orders by published_at desc; keep a stable client fallback.
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** A single published post by slug, or undefined (draft/archived/unknown → 404 upstream). */
export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const data = await getJson<{ post: PublicArticleResource }>(
    `/blog/posts/${encodeURIComponent(slug)}`,
    [BLOG_TAG, blogPostTag(slug)],
  );
  return data?.post ? mapPost(data.post) : undefined;
}

/** The single featured hero post, if any. */
export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const data = await getJson<{ posts: PublicArticleResource[] }>(
    "/blog/posts?featured=1&per_page=1",
    [BLOG_TAG],
  );
  const first = data?.posts?.[0];
  return first ? mapPost(first) : undefined;
}

/** Up to `count` related posts — same category first, then recency. */
export async function getRelatedPosts(
  slug: string,
  count = 3,
): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, count);
}

/** Category display names for the index filter chips (dynamic from the API). */
export async function getCategories(): Promise<string[]> {
  const data = await getJson<{ categories: CategoryResource[] }>(
    "/blog/categories",
    [BLOG_TAG],
  );
  return (data?.categories ?? []).map((c) => c.name);
}
