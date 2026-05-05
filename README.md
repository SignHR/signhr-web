# SignHR — Marketing Website

The public-facing marketing site for **SignHR**, an all-in-one HRMS SaaS platform for teams of 20 to 500. The site converts qualified visitors into demo bookings and trial signups, communicates the breadth of the platform, and powers inbound SEO via a high-quality blog and resource library.

This is one of three sub-projects in the SignHR monorepo (alongside `signhr-backend` and `signhr-vendor`/`signhr-admin` — the product app surfaces) and ships independently to Vercel.

## Stack

- **Next.js 16** (App Router, RSC where possible, Turbopack default)
- **React 19.2**
- **TypeScript** (strict mode, no `any`)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css`)
- **Radix UI** primitives (Dialog, Accordion, Tabs, Tooltip, NavigationMenu)
- **Motion** (the unified Framer Motion package, imported as `motion/react`)
- **Lucide React** v1 for icons (brand icons inlined as SVGs since they were dropped in v1)
- **next/font** for Geist Sans, Geist Mono, and Instrument Serif
- **React Hook Form + Zod v4** for forms
- **next-mdx-remote** + **gray-matter** for the MDX-based blog
- **class-variance-authority** + **clsx** + **tailwind-merge** via a `cn()` helper

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # type-check + production build (44 static pages + 1 dynamic)
pnpm start        # serve the production build
pnpm lint         # ESLint flat config
```

Node 20.9+ required (Next 16 baseline). pnpm is the canonical package manager — there is no `package-lock.json`.

## Environment variables

Create a `.env.local` for development:

```bash
NEXT_PUBLIC_SITE_URL=https://signhr.example.com
```

`SITE_URL` is consumed by `lib/utils.ts` for canonical URLs, the sitemap, JSON-LD, and OG image absolute references. In production (Vercel), set it to your real domain.

## Routes

```
/                              # Home
/features                      # Hub — 9 modules grouped by Core/Time/Lifecycle/Operations
/features/[slug]               # Deep-dive (9 dynamic routes, all SSG)
/pricing                       # Tiers + monthly/annual toggle + comparison + FAQ
/customers                     # Featured + grid + 2 case studies
/customers/[slug]              # Long-form case study (2 dynamic routes)
/about                         # Origin story, values, team, careers
/blog                          # MDX-driven index with category filter
/blog/[slug]                   # Post (10 dynamic routes — 3 long-form, 7 stubs)
/resources                     # Hub
/resources/{guides|templates|help}
/changelog                     # Versioned releases + roadmap
/book-demo                     # Two-column form page (custom RHF + Zod)
/contact                       # Split-page contact form
/legal/{privacy|terms|dpa}     # Long-form legal prose
/sitemap.xml                   # Auto-generated from all static + dynamic routes
/robots.txt                    # Disallows /api/ and /dev
/opengraph-image               # 1200x630 PNG via ImageResponse
/dev                           # Internal QA route — every component, noindex
404                            # Custom not-found with quick links
```

## Project structure

```
src/
├── app/                       # App Router pages (one .tsx per route)
├── components/
│   ├── ui/                    # Primitives (Button, Badge)
│   ├── layout/                # Container, Section, Navbar, MobileMenu, Footer
│   ├── marketing/             # Hero, FeatureCard, Spotlight, CTABand, mockups, ...
│   ├── blog/                  # PostCard, PostHeader, Toc, AuthorCard, MDX components
│   ├── icons/                 # LogoMark, social icons
│   └── seo/                   # JsonLd helper
├── content/
│   └── blog/                  # MDX posts with frontmatter
├── lib/
│   ├── utils.ts               # cn(), SITE_URL, absoluteUrl()
│   ├── nav.ts                 # PRIMARY_NAV, FEATURE_MODULES, FOOTER_NAV
│   ├── features.ts            # Per-module hero/capabilities/spotlights/related
│   ├── pricing.ts             # PRICING_TIERS, COMPARISON_GROUPS, PRICING_FAQ
│   ├── customers.ts           # CASE_STUDIES
│   ├── testimonials.ts        # TESTIMONIALS, LOGO_NAMES, STATS, INTEGRATIONS
│   ├── blog.ts                # Server-only: filesystem MDX loader
│   └── blog-types.ts          # Client-safe types + small helpers (CATEGORIES, slugify)
└── ...
```

## Adding a blog post

1. Create `src/content/blog/<slug>.mdx`.
2. Frontmatter (all required except `cover`, `featured`, `draft`):

   ```mdx
   ---
   title: "..."
   excerpt: "..."
   date: "2026-05-04"
   category: "HR Strategy" # | "Compliance" | "Product" | "Culture" | "Guides"
   readTime: "8 min read"
   author:
     name: "..."
     role: "..."
     initials: "XX"
     accent: "purple"      # | "amber" | "blue" | "green"
   featured: true          # optional — only one post should be featured
   draft: true             # optional — keeps it visible but flagged in stub posts
   ---
   ```

3. Body is standard Markdown plus our MDX components: `<Callout kind="info|warning|tip|success" title="…">…</Callout>`.
4. The post auto-appears in `/blog`, gets a static page at `/blog/<slug>`, and lands in `sitemap.xml` on next build.

## Adding a feature page

Edit `src/lib/features.ts` and add a new entry to `FEATURE_PAGES`. Then add it to `FEATURE_MODULES` in `src/lib/nav.ts` so it shows in the navbar mega-menu. The `/features/[slug]` route picks it up automatically via `generateStaticParams`.

## Adding a case study

Edit `src/lib/customers.ts` and append to `CASE_STUDIES`. The index and the dynamic `/customers/[slug]` route will include it on next build.

## Design system

The full token table, component inventory, and conventions live in `DESIGN.md`. Short version:

- Brand purple (`#7C4DFF`) from the product app's `.claude/DESIGN_SYSTEM.md`
- Marketing typography: Geist Sans (body + display) + Instrument Serif italic for accent words inside headlines
- Marketing-scale type utilities: `text-display-{xl,lg,md,sm}` use clamp() for fluid sizing
- Helper component pattern for mixed-font headlines: `<em className="serif-italic">word</em>` inside a heading

## Performance & a11y

- All pages SSG (one dynamic: `/book-demo`, because of `searchParams`)
- `next/font` self-hosts every typeface with `display: swap`
- Reduced-motion respected globally — bobbing animations and the workflow demo freeze
- Skip-to-content link in `app/layout.tsx`
- All interactive elements keyboard-reachable, focus rings via `focus-visible:ring-2 ring-ring`
- Semantic HTML throughout (`<main>`, `<article>`, `<nav>`, `<aside>`, `<figure>` where appropriate)

## Deploy

Push to `main` on this repo's GitHub remote. Vercel picks it up; the parent monorepo's deploy workflow (per `signhr-backend/.github/workflows/deploy.yml` pattern) is not needed for this site — it's a thin Next.js front and self-deploys.

For non-Vercel deploys, `pnpm build` produces a standard Next 16 output. Serve with `pnpm start`, or wrap in any Node 20.9+ container.

## Out of scope

Per PRD §13: i18n (English-only at launch), dark mode (tokens prepared, not wired), comparison pages (vs BambooHR / Zoho People), live chat, webinars, and the affiliate program. All of these can land later without restructuring.
