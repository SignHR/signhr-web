export type Author = {
  name: string;
  role: string;
  initials: string;
  accent: "purple" | "amber" | "blue" | "green";
  avatar?: string | null;
};

export type BlogCategory =
  | "HR Strategy"
  | "Compliance"
  | "Product"
  | "Culture"
  | "Guides";

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  readTime: string;
  author: Author;
  cover?: string;
  featured?: boolean;
  draft?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  body: string;
};

export type TocEntry = { id: string; text: string; level: number };

export const CATEGORIES: BlogCategory[] = [
  "HR Strategy",
  "Compliance",
  "Product",
  "Culture",
  "Guides",
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Build a table-of-contents from rendered HTML by scanning <h2>/<h3> tags.
 * The body is HTML (Plate output) — not markdown — so headings are parsed
 * from tags. Ids are slugified from the text and must match the ids that
 * ArticleBody injects onto the same headings.
 */
export function extractTocFromHtml(html: string): TocEntry[] {
  const toc: TocEntry[] = [];
  const re = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const level = Number(m[1]);
    const text = decodeEntities(stripTags(m[2])).trim();
    if (!text) continue;
    toc.push({ id: slugify(text), text, level });
  }
  return toc;
}

export function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

export function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
