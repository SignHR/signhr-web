# signhr-web SEO & Sitemap Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the verified SEO gaps in signhr-web — add per-item dynamic OG images, fill targeted JSON-LD, fix the sitemap, and tidy thin metadata.

**Architecture:** A single shared `og-template.tsx` renders the branded 1200×630 card; four file-based `opengraph-image.tsx` route segments (features, customers, careers-job, blog) consume it so Next 16 auto-wires per-route `og:image`. JSON-LD is added inline via the existing `JsonLd` component. The sitemap gains `/security` and a stable `lastmod`.

**Tech Stack:** Next.js 16 (App Router, async params, Turbopack), React 19, TypeScript, `next/og` `ImageResponse` (satori).

**Spec:** [docs/superpowers/specs/2026-06-26-signhr-web-seo-remediation-design.md](../specs/2026-06-26-signhr-web-seo-remediation-design.md)

## Global Constraints

- **No test runner exists** in signhr-web. The project gate (per `signhr-web/CLAUDE.md`) is `pnpm lint && pnpm build` → **0 errors / 0 warnings**, plus manual verification. Every task is verified by lint + build + the manual check given; there are no unit-test steps. This overrides the writing-plans TDD default because there is no harness and adding one is out of scope (YAGNI).
- **NO COMMITS.** Per the monorepo `CLAUDE.md`: never `git commit`/`git push` until the user explicitly asks. Each task ends by **staging** (`git add`) only. The controller commits later, on the user's word. If running via subagents, the subagent stages and stops; it must not commit.
- **Next 16 specifics:** `opengraph-image` route `params` is a `Promise` (`await params`). Config exports are `alt`, `size`, `contentType`. Do not add `twitter-image` files (cards reuse `og:image`). Consult `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md` if anything about the API is unclear (AGENTS.md mandates this).
- **Satori rules:** every element with 2+ children needs `display: "flex"`; only inline styles, no Tailwind/CSS classes inside `ImageResponse` JSX.
- **SITE_URL** comes from `@/lib/utils`; never hardcode the domain.
- **Run commands from** `signhr-web/` (e.g. `cd signhr-web`).

---

### Task 1: Shared OG template + DRY refactor of root OG image

**Files:**
- Create: `src/components/seo/og-template.tsx`
- Modify: `src/app/opengraph-image.tsx` (full rewrite to consume the template — **pixel output must be identical**)

**Interfaces:**
- Produces: `OG_SIZE: { width: 1200; height: 630 }`, `OG_CONTENT_TYPE: "image/png"`, `ogImage({ eyebrow: string; title: ReactNode; subtitle: string }): JSX.Element`, `truncate(text: string, max: number): string`. Tasks 2–5 consume all four.

- [ ] **Step 1: Create the shared template**

`src/components/seo/og-template.tsx`:

> **Satori note:** `title` is a **plain string**, not a ReactNode. next/og (satori) does not lay out mixed inline text + `<span>` inside a wrapping heading — the segments overlap into garbage. So the social card forgoes inline accents; the `<h1>` is a plain block (no `display:flex`).

```tsx
/** Shared 1200×630 dimensions for every generated OG image. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

/** Word-boundary truncation with an ellipsis, for OG subtitles. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * The branded SignHR OG card, parameterized. Returns JSX for `ImageResponse`
 * (next/og). `title` must be a plain string — satori does not lay out mixed
 * inline text + <span> children in a wrapping heading (they overlap), so the
 * social card forgoes inline accents in favor of correct multi-line wrapping.
 */
export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #F4EFFF 0%, #FFFFFF 50%, #FFF6E6 100%)",
        padding: 80,
        position: "relative",
      }}
    >
      {/* Soft halos */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(159,115,255,0.45) 0%, rgba(159,115,255,0) 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.32) 0%, rgba(245,166,35,0) 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Brand mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #9F73FF 0%, #5B2EE0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          S
        </div>
        <span
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#171B2C",
            letterSpacing: -0.5,
          }}
        >
          SignHR
        </span>
      </div>

      {/* Headline block */}
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#5B2EE0",
            margin: 0,
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: "#171B2C",
            margin: "20px 0 0 0",
            maxWidth: 1000,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 26,
            color: "#3B4156",
            marginTop: 28,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the root OG to consume the template**

Replace the entire body of `src/app/opengraph-image.tsx` with:

```tsx
import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/seo/og-template";

export const alt = "SignHR — All-in-one HRMS for growing teams";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return new ImageResponse(
    ogImage({
      eyebrow: "All-in-one HRMS",
      title: "Run your entire HR without the chaos.",
      subtitle:
        "Onboarding to offboarding for teams of 20 to 500 — in one elegant, multi-tenant platform.",
    }),
    { ...size },
  );
}
```

- [ ] **Step 3: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 errors / 0 warnings.

- [ ] **Step 4: Verify the root OG is visually unchanged**

Run `pnpm dev`, then:
`curl -s -o /tmp/og-root.png -w "%{http_code} %{content_type}\n" http://localhost:3000/opengraph-image`
Expected: `200 image/png`. Open `/tmp/og-root.png` and confirm it matches the previous home OG (gradient, "S" mark, "Run your entire HR *without* the chaos.").

- [ ] **Step 5: Stage (do NOT commit)**

```bash
git add src/components/seo/og-template.tsx src/app/opengraph-image.tsx
```

---

### Task 2: Feature page OG image

**Files:**
- Create: `src/app/features/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `ogImage`, `OG_SIZE`, `OG_CONTENT_TYPE`, `truncate` (Task 1); `getFeaturePage(slug)` from `@/lib/features`.

- [ ] **Step 1: Create the route**

`src/app/features/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getFeaturePage } from "@/lib/features";

export const alt = "SignHR feature";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  const eyebrow = page?.category ?? "SignHR";
  const title = page
    ? `${page.hero.title}${page.hero.titleAccent ? ` ${page.hero.titleAccent}` : ""}`
    : "SignHR";
  const subtitle = truncate(
    page?.metaDescription ?? "AI-powered HRMS for Indian teams.",
    140,
  );

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
```

- [ ] **Step 2: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0. The route is statically generated for each `FEATURE_PAGE_SLUGS` entry (inherits the page's `generateStaticParams`).

- [ ] **Step 3: Verify**

With `pnpm dev` running:
`curl -s -o /tmp/og-feat.png -w "%{http_code} %{content_type}\n" http://localhost:3000/features/ask-hr/opengraph-image`
Expected: `200 image/png`. Confirm `/tmp/og-feat.png` shows eyebrow "Ask HR", the feature hero title, and the meta description.
Also confirm the page now references it:
`curl -s http://localhost:3000/features/ask-hr | grep -o 'og:image[^>]*'` → a URL ending `/features/ask-hr/opengraph-image`.

- [ ] **Step 4: Stage**

```bash
git add src/app/features/[slug]/opengraph-image.tsx
```

---

### Task 3: Customer case-study OG image

**Files:**
- Create: `src/app/customers/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: Task 1 exports; `getCaseStudy(slug)` from `@/lib/customers`.

- [ ] **Step 1: Create the route**

`src/app/customers/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getCaseStudy } from "@/lib/customers";

export const alt = "SignHR customer story";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  const eyebrow = study ? `Customer story · ${study.sector}` : "Customer story";
  const title = study?.company ?? "SignHR";
  const subtitle = truncate(
    study?.outcome ?? "How growing teams run HR on SignHR.",
    140,
  );

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
```

- [ ] **Step 2: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 3: Verify**

`curl -s -o /tmp/og-cust.png -w "%{http_code} %{content_type}\n" http://localhost:3000/customers/vyom-pay/opengraph-image`
Expected: `200 image/png`; the card shows "Customer story · Fintech", "Vyom Pay", and the outcome line.

- [ ] **Step 4: Stage**

```bash
git add src/app/customers/[slug]/opengraph-image.tsx
```

---

### Task 4: Careers job OG image

**Files:**
- Create: `src/app/careers/[company]/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: Task 1 exports; `getCompanyJob(company, slug)` from `@/lib/careers` (returns `PublicJob | null` with `title`, `company.name`, `city`/`state`/`country`, `employment_type`).

- [ ] **Step 1: Create the route**

`src/app/careers/[company]/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getCompanyJob } from "@/lib/careers";

export const alt = "Open role at a SignHR-powered company";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;

export default async function Image({
  params,
}: {
  params: Promise<{ company: string; slug: string }>;
}) {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);

  const eyebrow = job?.company?.name ? `Careers · ${job.company.name}` : "Careers";
  const title = job?.title ?? "Open role";
  const location = job
    ? [job.city, job.state, job.country].filter(Boolean).join(", ")
    : "";
  const employment = job?.employment_type?.replace(/_/g, " ") ?? "";
  const parts = [location, employment].filter(Boolean);
  const subtitle = parts.length
    ? truncate(parts.join(" · "), 140)
    : "Join the team — apply on SignHR.";

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
```

- [ ] **Step 2: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0. (This route is dynamic/ISR — it won't be prerendered at build; that's expected.)

- [ ] **Step 3: Verify**

Requires the backend careers API to be reachable (`NEXT_PUBLIC_API_URL`). With `pnpm dev` and a known company+slug:
`curl -s -o /tmp/og-job.png -w "%{http_code} %{content_type}\n" "http://localhost:3000/careers/<company>/<job-slug>/opengraph-image"`
Expected: `200 image/png`. If the API is unavailable locally, instead confirm the route compiles and renders the fallback card (`Careers` / `Open role`) — it must never 500.

- [ ] **Step 4: Stage**

```bash
git add "src/app/careers/[company]/[slug]/opengraph-image.tsx"
```

---

### Task 5: Blog post OG image (cover-or-generated) + single og:image source

**Files:**
- Create: `src/app/blog/[slug]/opengraph-image.tsx`
- Modify: `src/app/blog/[slug]/page.tsx` (remove `images` from `openGraph` and `twitter` in `generateMetadata`)

**Interfaces:**
- Consumes: Task 1 exports; `getPost(slug)` from `@/lib/blog` (returns a post with `title`, `excerpt`, `category`, `cover?`).

- [ ] **Step 1: Create the route**

`src/app/blog/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getPost } from "@/lib/blog";

export const alt = "SignHR blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;
export const dynamicParams = true;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // Real cover photos make the best social cards — use them full-bleed.
  if (post?.cover) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
      { ...size },
    );
  }

  // No cover → branded template from the title.
  return new ImageResponse(
    ogImage({
      eyebrow: post?.category ?? "SignHR Blog",
      title: post?.title ?? "SignHR Blog",
      subtitle: post?.excerpt
        ? truncate(post.excerpt, 140)
        : "Honest writing about modern HR.",
    }),
    { ...size },
  );
}
```

- [ ] **Step 2: Make the file-based image the single og:image source**

In `src/app/blog/[slug]/page.tsx` `generateMetadata`, remove the cover spreads so there is exactly one `og:image` (the route above). Change the `openGraph` and `twitter` blocks from:

```tsx
    openGraph: {
      type: "article",
      title: `${title} — SignHR`,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
```

to:

```tsx
    openGraph: {
      type: "article",
      title: `${title} — SignHR`,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
```

(Leave the `articleLd.image` fallback in the page body unchanged.)

- [ ] **Step 3: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 4: Verify**

With `pnpm dev` and a real post slug (find one: `curl -s http://localhost:3000/sitemap.xml | grep '/blog/'`):
`curl -s -o /tmp/og-blog.png -w "%{http_code} %{content_type}\n" http://localhost:3000/blog/<slug>/opengraph-image`
Expected: `200 image/png` (the cover image if the post has one, else the branded card).
Confirm exactly one og:image on the post page:
`curl -s http://localhost:3000/blog/<slug> | grep -o 'property="og:image"' | wc -l` → `1`.

- [ ] **Step 5: Stage**

```bash
git add "src/app/blog/[slug]/opengraph-image.tsx" "src/app/blog/[slug]/page.tsx"
```

---

### Task 6: Customer case-study JSON-LD (Article + Review)

**Files:**
- Modify: `src/app/customers/[slug]/page.tsx` (add `articleLd`, `reviewLd`; widen the `JsonLd` array)

**Interfaces:**
- Consumes: `study` (from `getCaseStudy`), `slug`, `SITE_URL`, existing `breadcrumbLd` — all already in scope in `CaseStudyPage`.

- [ ] **Step 1: Add the schema objects**

In `src/app/customers/[slug]/page.tsx`, immediately after the existing `breadcrumbLd` declaration (ends ~line 84), add:

```tsx
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.outcome,
    description: study.excerpt,
    about: {
      "@type": "SoftwareApplication",
      name: "SignHR",
      applicationCategory: "BusinessApplication",
    },
    author: { "@type": "Organization", name: "SignHR", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "SignHR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/customers/${slug}`,
    },
  };

  const firstQuote = study.pullQuotes[0];
  const reviewLd = firstQuote
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "SoftwareApplication",
          name: "SignHR",
          applicationCategory: "BusinessApplication",
        },
        author: { "@type": "Organization", name: study.company },
        reviewBody: firstQuote.quote,
      }
    : null;
```

- [ ] **Step 2: Widen the JsonLd array**

Change `<JsonLd data={breadcrumbLd} />` (line ~88) to:

```tsx
      <JsonLd data={[breadcrumbLd, articleLd, ...(reviewLd ? [reviewLd] : [])]} />
```

- [ ] **Step 3: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 4: Verify**

`curl -s http://localhost:3000/customers/vyom-pay | grep -o '"@type":"[A-Za-z]*"' | sort -u`
Expected to include `"@type":"Article"`, `"@type":"Review"`, `"@type":"BreadcrumbList"`. Paste the JSON-LD into the Google Rich Results test — no errors.

- [ ] **Step 5: Stage**

```bash
git add "src/app/customers/[slug]/page.tsx"
```

---

### Task 7: Feature-page JSON-LD (SoftwareApplication)

**Files:**
- Modify: `src/app/features/[slug]/page.tsx` (add `softwareLd`; widen the `JsonLd` array)

**Interfaces:**
- Consumes: `page` (from `getFeaturePage`), `slug`, `SITE_URL`, existing `breadcrumbLd` — all in scope in `FeatureDetailPage`.

- [ ] **Step 1: Add the schema object**

In `src/app/features/[slug]/page.tsx`, after the existing `breadcrumbLd` declaration (ends ~line 80), add:

```tsx
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `SignHR — ${page.category}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: page.metaDescription,
    url: `${SITE_URL}/features/${slug}`,
    featureList: page.capabilities.map((c) => c.title),
    publisher: { "@type": "Organization", name: "SignHR", url: SITE_URL },
  };
```

- [ ] **Step 2: Widen the JsonLd array**

Change `<JsonLd data={breadcrumbLd} />` (line ~84) to:

```tsx
      <JsonLd data={[breadcrumbLd, softwareLd]} />
```

- [ ] **Step 3: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 4: Verify**

`curl -s http://localhost:3000/features/ask-hr | grep -o '"@type":"SoftwareApplication"'`
Expected: one match. Confirm `featureList` lists the capability titles.

- [ ] **Step 5: Stage**

```bash
git add "src/app/features/[slug]/page.tsx"
```

---

### Task 8: BreadcrumbList on pricing and security

**Files:**
- Modify: `src/app/pricing/page.tsx` (add `BREADCRUMB_LD`; append to existing array)
- Modify: `src/app/security/page.tsx` (import `JsonLd` + `SITE_URL`; add a `BreadcrumbList` + render it)

**Interfaces:**
- Pricing already imports `JsonLd` and `SITE_URL`. Security imports neither yet.

- [ ] **Step 1: Pricing — add the breadcrumb**

In `src/app/pricing/page.tsx`, after the `PRODUCT_LD` constant (ends ~line 117), add:

```tsx
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_URL}/pricing`,
    },
  ],
};
```

Change `<JsonLd data={[FAQ_LD, PRODUCT_LD]} />` (line ~122) to:

```tsx
      <JsonLd data={[FAQ_LD, PRODUCT_LD, BREADCRUMB_LD]} />
```

- [ ] **Step 2: Security — import + add the breadcrumb**

In `src/app/security/page.tsx`, add these imports below the existing component imports (after the `SecuritySection` import, ~line 18):

```tsx
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
```

Add this constant just below the `metadata` export (after line ~25):

```tsx
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Security",
      item: `${SITE_URL}/security`,
    },
  ],
};
```

In the returned JSX, add the `JsonLd` as the first child of the fragment — change the opening of the return from:

```tsx
  return (
    <>
      <Hero
```

to:

```tsx
  return (
    <>
      <JsonLd data={BREADCRUMB_LD} />
      <Hero
```

- [ ] **Step 3: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 4: Verify**

`curl -s http://localhost:3000/security | grep -o '"@type":"BreadcrumbList"'` → one match.
`curl -s http://localhost:3000/pricing | grep -o '"@type":"BreadcrumbList"'` → one match.

- [ ] **Step 5: Stage**

```bash
git add src/app/pricing/page.tsx src/app/security/page.tsx
```

---

### Task 9 (OPTIONAL — low priority): Hub-page CollectionPage + BreadcrumbList

Include only if cheap; the rest of the plan is complete without it. Adds an `ItemList` of children to the `/features`, `/customers`, and `/blog` index pages.

**Files:**
- Modify: `src/app/features/page.tsx`, `src/app/customers/page.tsx`, `src/app/blog/page.tsx`

- [ ] **Step 1: Read the three hub pages** to find the return-fragment start and whether `JsonLd`/`SITE_URL` are already imported. Add the imports where missing:

```tsx
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
```

- [ ] **Step 2: Features hub** — `src/app/features/page.tsx`. Add near the top of the component body (import `FEATURE_PAGES` from `@/lib/features` if not present):

```tsx
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SignHR Features",
    url: `${SITE_URL}/features`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: Object.values(FEATURE_PAGES).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.category,
        url: `${SITE_URL}/features/${p.slug}`,
      })),
    },
  };
```

Render `<JsonLd data={collectionLd} />` as the first child of the returned fragment.

- [ ] **Step 3: Customers hub** — `src/app/customers/page.tsx` (import `CASE_STUDIES` from `@/lib/customers` if not present):

```tsx
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SignHR Customer Stories",
    url: `${SITE_URL}/customers`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CASE_STUDIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.company,
        url: `${SITE_URL}/customers/${c.slug}`,
      })),
    },
  };
```

Render `<JsonLd data={collectionLd} />` as the first child of the returned fragment.

- [ ] **Step 4: Blog hub** — `src/app/blog/page.tsx`. The component is async and already loads posts; reuse that array (commonly `const posts = await getAllPosts();`). If a posts array isn't already in scope, add `import { getAllPosts } from "@/lib/blog";` and `const posts = await getAllPosts();` at the top of the component, then:

```tsx
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SignHR Blog",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    },
  };
```

Render `<JsonLd data={collectionLd} />` as the first child of the returned fragment.

- [ ] **Step 5: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 6: Verify**

`curl -s http://localhost:3000/features | grep -o '"@type":"CollectionPage"'` → one match (repeat for `/customers`, `/blog`).

- [ ] **Step 7: Stage**

```bash
git add src/app/features/page.tsx src/app/customers/page.tsx src/app/blog/page.tsx
```

---

### Task 10: Sitemap — add /security, stop lastModified churn

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the SITE_LAUNCH constant and the lastmod field type**

In `src/app/sitemap.ts`, change the `STATIC_ROUTES` type annotation to include an optional `lastmod`, and add a launch constant above it:

```tsx
/**
 * Stable fallback `lastmod` for static routes. Using build-time `new Date()`
 * makes every crawl see a fresh date, which search engines learn to distrust.
 * Bump this when static page content is meaningfully revised.
 */
const SITE_LAUNCH = "2026-06-01";

const STATIC_ROUTES: Array<{
  path: string;
  priority?: number;
  changeFreq?: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastmod?: string;
}> = [
```

- [ ] **Step 2: Add the /security route**

Insert into the `STATIC_ROUTES` array (e.g. after the `/changelog` entry):

```tsx
  { path: "/security", priority: 0.6, changeFreq: "monthly" },
```

- [ ] **Step 3: Use the stable lastmod for static entries**

Change the `staticEntries` map from `lastModified: now,` to:

```tsx
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.lastmod ?? SITE_LAUNCH),
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));
```

Leave `now` defined (still used by the job-entry fallback) and leave the dynamic feature/customer/blog/job entries unchanged.

- [ ] **Step 4: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 5: Verify**

`curl -s http://localhost:3000/sitemap.xml | grep -c '/security'` → `1`.
`curl -s http://localhost:3000/sitemap.xml | grep -A1 '<loc>'$SITE_URL'/about' ` — confirm the `<lastmod>` for static routes is `2026-06-01`, not today's date.

- [ ] **Step 6: Stage**

```bash
git add src/app/sitemap.ts
```

---

### Task 11: Metadata hygiene — legal descriptions + page-specific OpenGraph

**Files:**
- Modify: `src/app/legal/privacy/page.tsx`, `src/app/legal/terms/page.tsx`, `src/app/pricing/page.tsx`, `src/app/download/page.tsx`, `src/app/security/page.tsx`

- [ ] **Step 1: Lengthen the legal descriptions**

In `src/app/legal/privacy/page.tsx`, replace the `description` value in `metadata` with:

```tsx
  description:
    "How SignHR collects, uses, stores, and protects your employee and HR data — your rights, our retention and security practices, and GDPR & India DPDP Act alignment.",
```

In `src/app/legal/terms/page.tsx`, replace the `description` value with:

```tsx
  description:
    "The terms governing your use of SignHR — accounts and access, subscription and billing, acceptable use, data ownership, liability, and termination for Indian teams.",
```

- [ ] **Step 2: Add page-specific OpenGraph to pricing**

In `src/app/pricing/page.tsx` `metadata`, after the `alternates` line, add an `openGraph`:

```tsx
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "HR Software Pricing in India — SignHR",
    description:
      "Simple per-employee HR software pricing in INR — Core HR from ₹15/employee/month plus add-ons. 1- & 3-year terms save 10–20%.",
    type: "website",
    url: "/pricing",
  },
```

- [ ] **Step 3: Add page-specific OpenGraph to download**

In `src/app/download/page.tsx` `metadata`, after the `alternates` line, add:

```tsx
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download the SignHR HR App — iOS & Android",
    description:
      "Get the SignHR mobile app for iOS and Android — punch in, apply for leave, approve requests, and view payslips from your phone.",
    type: "website",
    url: "/download",
  },
```

(Keep the existing `description`; adjust the OG `description` text to match the page's real copy if it differs.)

- [ ] **Step 4: Add page-specific OpenGraph to security**

In `src/app/security/page.tsx` `metadata`, after the `alternates` line, add:

```tsx
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security & Compliance — SignHR",
    description:
      "How SignHR protects your employee, payroll, and HR data — encryption in transit and at rest, role-based access, daily backups, and GDPR & India DPDP Act alignment.",
    type: "website",
    url: "/security",
  },
```

- [ ] **Step 5: Lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: 0 / 0.

- [ ] **Step 6: Verify**

`curl -s http://localhost:3000/legal/privacy | grep -o 'name="description" content="[^"]*"'` — confirm the longer description (~150 chars).
`curl -s http://localhost:3000/pricing | grep -o 'property="og:title" content="[^"]*"'` — confirm the pricing-specific OG title (not the generic site default).

- [ ] **Step 7: Stage**

```bash
git add src/app/legal/privacy/page.tsx src/app/legal/terms/page.tsx src/app/pricing/page.tsx src/app/download/page.tsx src/app/security/page.tsx
```

---

## Final verification (after all tasks)

- [ ] `cd signhr-web && pnpm lint && pnpm build` → **0 errors / 0 warnings**.
- [ ] With `pnpm dev`, spot-check each new OG route returns `200 image/png`: `/opengraph-image`, `/features/ask-hr/opengraph-image`, `/customers/vyom-pay/opengraph-image`, `/blog/<slug>/opengraph-image`.
- [ ] `curl -s http://localhost:3000/sitemap.xml` includes `/security` and shows stable static `lastmod`.
- [ ] No page emits duplicate `og:image` (check a blog post: exactly one).
- [ ] Validate one each of the new JSON-LD blocks (Article, Review, SoftwareApplication, BreadcrumbList) in Google Rich Results — no errors.
- [ ] Root OG image visually unchanged from before Task 1.
- [ ] Report status to the user. **Do not commit** — wait for explicit instruction.

## Spec coverage check

- Shared OG template + root refactor → Task 1 ✅
- Per-route OG (features, customers, careers, blog) → Tasks 2–5 ✅
- Single og:image source for blog → Task 5 ✅
- Twitter reuses og:image (no twitter-image files) → Global Constraints ✅
- JSON-LD: customers Article/Review → Task 6; features SoftwareApplication → Task 7; pricing/security Breadcrumb → Task 8; hubs CollectionPage → Task 9 (optional) ✅
- Sitemap /security + stable lastmod → Task 10 ✅
- Metadata hygiene (legal descriptions, page OG) → Task 11 ✅
- Excluded (Non-Goals): security FAQPage, pricing Product/Offer, homepage title override, per-company careers in sitemap — not implemented, by design ✅
