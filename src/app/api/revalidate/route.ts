import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-publish revalidation webhook shared by the blog and careers modules.
 *
 * The backend's WebRevalidator (blog) and the careers publish hook both POST
 * here. Secret validation is the same; callers differentiate with `type`.
 *
 * Accepts the shared secret via:
 *   - query param: ?secret=…
 *   - header:      x-revalidate-secret: …
 *
 * Accepts the affected slug(s) via:
 *   - query param: ?slug=…
 *   - JSON body:   { "slug": "…" }  or  { "slugs": ["…"] }
 *
 * Type routing (JSON body field `type`):
 *   - omitted / "blog" — runs blog revalidation (legacy, default)
 *   - "careers"        — runs careers revalidation; also requires `workspace`
 *
 * Next 16: revalidateTag REQUIRES a second argument. `{ expire: 0 }` forces
 * immediate expiry (webhook-driven revalidation). The single-arg overload
 * does not exist in this version and is a TypeScript error.
 */

/**
 * Accept either REVALIDATE_SECRET (shared key for all modules) or the legacy
 * BLOG_REVALIDATE_SECRET so that existing blog webhook configs keep working
 * without a config change on the backend.
 */
const SECRET =
  process.env.REVALIDATE_SECRET ?? process.env.BLOG_REVALIDATE_SECRET;

/** Blog cache tags — must mirror src/lib/blog.ts (BLOG_TAG / blogPostTag). */
const BLOG_TAG = "blog";
const blogPostTag = (slug: string) => `blog:post:${slug}`;

/** Careers cache tags — must mirror src/lib/careers.ts (CAREERS_TAG / careerJobTag). */
const CAREERS_TAG = "careers";
const careerJobTag = (slug: string) => `careers:job:${slug}`;

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

  // ---------------------------------------------------------------------------
  // Parse body once — shared by both blog and careers branches.
  // Absence of a body, or an invalid JSON body, is fine (slugs stay empty).
  // ---------------------------------------------------------------------------
  const slugs = new Set<string>();
  const querySlug = req.nextUrl.searchParams.get("slug");
  if (querySlug) {
    slugs.add(querySlug);
  }

  type Body = { type?: string; slug?: string; slugs?: string[]; workspace?: string };
  let body: Body | null = null;
  try {
    const raw = (await req.json()) as Body | null;
    body = raw;
    const slug = raw?.slug;
    const slugArr = raw?.slugs;
    if (slug) {
      slugs.add(slug);
    }
    for (const s of slugArr ?? []) {
      if (typeof s === "string" && s) {
        slugs.add(s);
      }
    }
  } catch {
    // No/invalid body — fine, just revalidate broadly.
  }

  // ---------------------------------------------------------------------------
  // Blog revalidation — runs when type is "blog" or omitted (legacy default).
  // Always revalidate the whole blog listing (and home-page teasers, which
  // share the BLOG_TAG fetch).
  // ---------------------------------------------------------------------------
  if (!body?.type || body.type === "blog") {
    revalidateTag(BLOG_TAG, { expire: 0 });
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");

    // Per-post revalidation for each affected slug.
    for (const slug of slugs) {
      revalidateTag(blogPostTag(slug), { expire: 0 });
      revalidatePath(`/blog/${slug}`);
    }
  }

  // ---------------------------------------------------------------------------
  // Careers revalidation — runs when type === "careers".
  // Revalidates the workspace listing and any specific job slugs provided.
  // ---------------------------------------------------------------------------
  if (body?.type === "careers") {
    const workspace = body.workspace ?? "";
    revalidateTag(CAREERS_TAG, { expire: 0 });
    if (workspace) {
      revalidatePath(`/careers/${workspace}`, "page");
    }
    for (const slug of slugs) {
      revalidateTag(careerJobTag(slug), { expire: 0 });
      if (workspace) {
        revalidatePath(`/careers/${workspace}/${slug}`, "page");
      }
    }
  }

  return NextResponse.json({
    revalidated: true,
    type: body?.type ?? "blog",
    now: Date.now(),
  });
}
