# signhr-web SEO & Sitemap Remediation — Design Spec

**Date:** 2026-06-26
**Project:** signhr-web (Next.js 16 marketing site)
**Status:** Approved design — ready for implementation plan

## Context

signhr-web already has a mature SEO foundation: a dynamic `sitemap.ts`, a
`robots.ts`, `metadataBase`, per-page `metadata`/`generateMetadata` on every
route, canonical URLs almost everywhere, and JSON-LD on the home, pricing, blog,
features, customers and careers pages.

This is **not a greenfield build**. It is a targeted audit-and-fix pass that
closes the real gaps in that existing setup. An audit was run; two of its
findings were verified false and are explicitly excluded (see Non-Goals).

### Verified baseline (already correct — do NOT touch)

- [robots.ts](../../../src/app/robots.ts) — correct: points to sitemap, disallows `/api/`, `/dev`.
- [layout.tsx](../../../src/app/layout.tsx) — `metadataBase`, default title template, OG/Twitter defaults, `en-IN` locale. The **home page deliberately inherits the default title/description** — this is the strong homepage copy and must stay inherited (home only sets its own canonical).
- [pricing/page.tsx](../../../src/app/pricing/page.tsx) — already emits `FAQPage` **and** a full `Product`/`SoftwareApplication` with an `Offer` array. Only missing a `BreadcrumbList`.
- Home — `Organization`, `WebSite` (with `SearchAction`), `SoftwareApplication`/`Product`.
- Blog post — `BlogPosting` + `BreadcrumbList`, and per-post OG image via `post.cover`.
- Careers job — `JobPosting` + `BreadcrumbList`, `noindex` on apply/status routes.

## Goals

1. Per-item dynamic OG images for feature, customer, careers-job and blog-post pages, via a single shared brand template.
2. Fill the genuine JSON-LD gaps without schema spam.
3. Fix the sitemap: add the missing `/security` route; stop static-route `lastModified` churning on every deploy.
4. Metadata hygiene: lengthen two thin legal descriptions; add page-specific OpenGraph to three pages.

## Non-Goals (explicitly excluded)

- **No `FAQPage` on `/security`.** Verified: the security page has no FAQ — it has six security *pillars* (`AREAS`) and a compliance-docs block. The audit claim was a hallucination.
- **No new `Product`/`Offer`/`FAQPage` on `/pricing`.** Already present; only a `BreadcrumbList` is missing.
- **No homepage title/description override.** Inheriting the layout default is intentional and correct.
- **No per-company careers pages in the sitemap** (`/careers/[company]`, `/careers/[company]/[slug]`). These are tenant pages whose canonical public URL is the careers-subdomain `public_url`, already covered in the sitemap via marketplace jobs. Adding them risks unbounded, duplicate, non-canonical entries.
- **No dedicated `twitter-image` route files.** `summary_large_image` Twitter cards fall back to `og:image` at the crawler level; separate files would duplicate every OG route for no gain.

---

## Architecture

### Component 1 — Shared OG image template

**New file:** `src/components/seo/og-template.tsx`

- **Purpose:** one source of truth for the branded 1200×630 OG card so every OG route looks identical and the styling lives in one place.
- **Exports:**
  - `OG_SIZE = { width: 1200, height: 630 }`
  - `OG_CONTENT_TYPE = "image/png"`
  - `ogImage({ eyebrow, title, subtitle }): React.ReactElement` — returns the JSX passed to `ImageResponse` (gradient background, two soft halos, the "S" brand mark + "SignHR" wordmark, an uppercase eyebrow, a large title, and a muted subtitle). This is the existing root-OG visual, parameterized.
- **Dependencies:** none beyond `next/og` types (the JSX is plain inline-styled `<div>`s, satori-compatible — no Tailwind, no external fonts beyond satori defaults, matching the current root OG).
- **Constraints / interface contract:** `title` is the focal line; callers truncate `subtitle` to ~140 chars before passing. The function returns JSX only — each route wraps it in `new ImageResponse(ogImage({...}), { ...OG_SIZE })`.

**Refactor:** [src/app/opengraph-image.tsx](../../../src/app/opengraph-image.tsx) is rewritten to call `ogImage(...)` with the current home copy (eyebrow `"All-in-one HRMS"`, the existing headline, the existing subtitle). **Pixel output must be unchanged** — this is a pure DRY extraction. Keep its exported `alt`, `size`, `contentType`.

### Component 2 — Per-route OG image segments

Each is a file-based `opengraph-image.tsx` colocated with its page. Next 16
auto-injects the resulting `og:image` (and dimensions) into that route's
metadata, overriding the inherited root image. Each file exports `alt`, `size`
(= `OG_SIZE`), `contentType` (= `OG_CONTENT_TYPE`), and a default async
component reading the route params.

| New file | Data source | eyebrow / title / subtitle | Params strategy |
|---|---|---|---|
| `src/app/features/[slug]/opengraph-image.tsx` | `getFeaturePage(slug)` | `category` / `hero.title` (+ `titleAccent`) / `metaDescription` | `generateStaticParams` from `FEATURE_PAGE_SLUGS`; `notFound()` if missing |
| `src/app/customers/[slug]/opengraph-image.tsx` | `getCaseStudy(slug)` | `Customer story · {sector}` / `company` / `outcome` | `generateStaticParams` from `CASE_STUDIES` |
| `src/app/careers/[company]/[slug]/opengraph-image.tsx` | `getCompanyJob(company, slug)` | `company.name` / `title` / location (`city`/`state`/`country`) · `employment_type` | dynamic; inherit route `revalidate`; render the generic template if the fetch returns null |
| `src/app/blog/[slug]/opengraph-image.tsx` | `getPost(slug)` | when `post.cover`: full-bleed `<img src={post.cover}>`; else template with eyebrow `category`, title `post.title` | `generateStaticParams` from `getAllPosts`; `dynamicParams = true` |

**Blog coupling change:** remove the `openGraph.images` / `twitter.images`
(`post.cover`) blocks from `blog/[slug]` `generateMetadata` so the file-based OG
route is the **single** `og:image` source (prevents duplicate `og:image` tags).
The image route reproduces the cover-or-generated decision.

**Failure handling:** the blog/careers routes fetch remote data. On a null
fetch or a missing remote cover, fall back to the generic `ogImage(...)`
template (never throw from an image route — a broken OG endpoint degrades social
previews and can 500 the crawler).

### Component 3 — JSON-LD additions

Reuse the existing [JsonLd](../../../src/components/seo/json-ld.tsx) component. Keep each block small and accurate.

- **`customers/[slug]`** — add to the existing `BreadcrumbList`:
  - `Article` — `headline` = `outcome`, `description` = `excerpt`, `about` = SignHR, `author`/`publisher` = SignHR Organization, `mainEntityOfPage` = the page URL. (Case studies have no real publish date in `CaseStudy`; omit `datePublished` rather than fake it.)
  - `Review` — `itemReviewed` = SignHR `SoftwareApplication`, `author` = `{ "@type": "Organization", name: company }`, `reviewBody` = first pull-quote. No `reviewRating` (no numeric rating exists — do not invent one).
- **`features/[slug]`** — add a `WebPage` (or `SoftwareApplication` referencing SignHR with `featureList` from `capabilities[].title`) alongside the existing `BreadcrumbList`. Pick `SoftwareApplication` with `name = "SignHR — {category}"`, `applicationCategory = "BusinessApplication"`, `featureList` = capability titles.
- **`pricing`** — add a `BreadcrumbList` (Home → Pricing) to the existing `[FAQ_LD, PRODUCT_LD]` array.
- **`security`** — add a `BreadcrumbList` (Home → Security). No FAQPage.
- **Hub pages (`features`, `customers`, `blog`)** *(low priority — include if cheap)* — `BreadcrumbList` + a `CollectionPage` whose `mainEntity` is an `ItemList` of the child slugs. Skippable without blocking the rest.

### Component 4 — Sitemap fixes

[src/app/sitemap.ts](../../../src/app/sitemap.ts):

- Add `{ path: "/security", priority: 0.6, changeFreq: "monthly" }` to `STATIC_ROUTES`.
- Add an optional `lastmod?: string` (ISO date) field to each `STATIC_ROUTES` entry. Introduce a `SITE_LAUNCH` constant (a fixed ISO date). Static entries use `r.lastmod ?? SITE_LAUNCH` instead of `now`. This removes the every-deploy churn (Google distrusts a sitemap whose every `lastmod` jumps each crawl) without fragile fs/git mtime lookups. Dynamic entries (blog/jobs) keep their real content dates, which are already correct.

### Component 5 — Metadata hygiene

- [legal/privacy](../../../src/app/legal/privacy/page.tsx) and [legal/terms](../../../src/app/legal/terms/page.tsx): rewrite `description` to ~140–160 chars (currently ~67 / ~63), accurately summarizing each policy.
- Add a page-specific `openGraph: { title, description }` to [pricing](../../../src/app/pricing/page.tsx), [download](../../../src/app/download/page.tsx), and [security](../../../src/app/security/page.tsx). The image side is handled by inherited/route OG images; these only set page-appropriate OG title/description (avoid them inheriting the generic site default).

---

## Data flow

```
Crawler / social card
        │
        ├── GET /sitemap.xml  ── sitemap.ts ── STATIC_ROUTES (+/security, +SITE_LAUNCH lastmod)
        │                                     ├── FEATURE_PAGE_SLUGS / CASE_STUDIES
        │                                     └── getAllPosts() / getMarketplaceJobs()
        │
        ├── GET /{route}      ── generateMetadata ── title, description, canonical, openGraph
        │                       └── <JsonLd> blocks (Breadcrumb/Article/Review/Product/…)
        │
        └── GET /{route}/opengraph-image ── default component
                                            └── ogImage({eyebrow,title,subtitle})  ← shared template
                                                 (blog: cover <img> when present)
```

## Error handling

- OG image routes never throw: missing/null data → generic `ogImage(...)` fallback.
- `generateStaticParams` mirrors each page's existing param generation, so OG images are pre-rendered for the same set of static pages and don't add runtime cost for known slugs.
- Removing blog `openGraph.images` must be done in the same change as adding `blog/[slug]/opengraph-image.tsx` to avoid a window with zero blog OG image.

## Testing / verification

- `pnpm lint && pnpm build` → **0 errors / 0 warnings** (project gate).
- Manually hit generated OG routes in dev and confirm a 1200×630 PNG renders:
  `/opengraph-image`, `/features/ask-hr/opengraph-image`, `/customers/vyom-pay/opengraph-image`, `/blog/{a-real-slug}/opengraph-image`.
- Confirm `/security` appears in `/sitemap.xml` and that static `lastmod` values are stable (not "today") across two builds.
- Paste one of each new JSON-LD block into a schema validator (Google Rich Results / schema.org) — must be valid, no missing-required warnings. Confirm no page emits duplicate `og:image`.
- Confirm the root OG image is visually unchanged after the DRY refactor.

## Out-of-scope follow-ups (note, don't build)

- Dedicated `twitter-image` routes (only if Twitter-specific art is ever wanted).
- Real `dateModified` for case studies (would require adding a date field to `CaseStudy`).
- Per-company careers sitemap (would need a bounded, canonical strategy first).
