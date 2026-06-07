import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * `BLOG_REVALIDATE_SECRET` must be set in the environment and must match
 * the backend's `config('blog.revalidate_secret')`. The backend's
 * `WebRevalidator` calls: POST {BLOG_WEB_URL}/api/revalidate?secret=…[&slug=…]
 */
const SECRET = process.env.BLOG_REVALIDATE_SECRET;

/** Cache tags — must mirror src/lib/blog.ts (BLOG_TAG / blogPostTag). */
const BLOG_TAG = "blog";
const blogPostTag = (slug: string) => `blog:post:${slug}`;

/**
 * On-publish revalidation webhook.
 *
 * Accepts the shared secret via:
 *   - query param: ?secret=…
 *   - header:      x-revalidate-secret: …
 *
 * Accepts the affected slug via:
 *   - query param: ?slug=…
 *   - JSON body:   { "slug": "…" }
 *
 * Next 16: revalidateTag REQUIRES a second argument. `{ expire: 0 }` forces
 * immediate expiry (webhook-driven revalidation). The single-arg overload
 * does not exist in this version and is a TypeScript error.
 */
export async function POST(req: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { revalidated: false, reason: "not configured" },
      { status: 500 },
    );
  }

  const fromQuery = req.nextUrl.searchParams.get("secret");
  const fromHeader = req.headers.get("x-revalidate-secret");
  const provided = fromQuery ?? fromHeader ?? "";

  if (provided.length !== SECRET.length || provided !== SECRET) {
    return NextResponse.json(
      { revalidated: false, reason: "unauthorized" },
      { status: 401 },
    );
  }

  // Affected slug(s) from query param or JSON body. The backend's
  // WebRevalidator posts `{ slugs: [...] }`; a single `?slug=`/`{ slug }` is
  // also accepted. Absence is fine — the broad revalidation below still runs.
  const slugs = new Set<string>();
  const querySlug = req.nextUrl.searchParams.get("slug");
  if (querySlug) {
    slugs.add(querySlug);
  }
  try {
    const body = (await req.json()) as
      | { slug?: string; slugs?: string[] }
      | null;
    if (body?.slug) {
      slugs.add(body.slug);
    }
    for (const s of body?.slugs ?? []) {
      if (typeof s === "string" && s) {
        slugs.add(s);
      }
    }
  } catch {
    // No/invalid body — fine, just revalidate broadly.
  }

  // Always revalidate the whole blog listing (and the home-page teasers, which
  // share the BLOG_TAG fetch).
  revalidateTag(BLOG_TAG, { expire: 0 });
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  // Per-post revalidation for each affected slug.
  for (const slug of slugs) {
    revalidateTag(blogPostTag(slug), { expire: 0 });
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
