## ROLE & MISSION

You are a senior frontend engineer and product designer. You are building **SignHR** — the public marketing website for an all-in-one HRMS SaaS platform.

This is a **production-grade**, multi-page website. The design bar is **Lovable / Linear / Vercel / Polar.sh** — premium, modern, distinctive. Not "AI-generated landing page" generic.

The full Product Requirements Document is in `SignHR_PRD.md`. **Read it before you write a single line of code.** Treat it as the source of truth for sitemap, content sections, design direction, and acceptance criteria.

---

## NON-NEGOTIABLE RULES

1. **Never ship lorem ipsum.** Every page must have real, brand-voice content as specified in the PRD. If a section needs copy, write it in the SignHR voice (confident, specific, human).
2. **Never use stock photos of people in suits.** Use stylized avatars, real product mockups, gradient halos, and 3D-feel illustrations — see the design direction in PRD §4.
3. **No layout shift, no console errors, no hydration warnings.** This is a quality bar, not a stretch goal.
4. **Mobile-first responsive.** Test at 375 / 768 / 1024 / 1440. Mobile must look intentional, not squished-desktop.
5. **Accessibility is shipped, not retrofitted.** Keyboard nav, focus rings, semantic HTML, reduced-motion respected from day one.
6. **Lighthouse 95+ Performance, 100 Accessibility.** Use `next/image`, `next/font`, lazy-load below-fold heavy assets.
7. **Use the App Router.** Next.js 16+ only. No `pages/` directory.
8. **TypeScript strict mode.** No `any`. Type every prop.

---

## TECH STACK (LOCKED)

```
Framework      : Next.js 16+ (App Router, RSC where possible)
Language       : TypeScript (strict mode, no any)
Styling        : Tailwind CSS v4 (CSS-first config via @theme in globals.css)
UI primitives  : Radix UI (Dialog, Accordion, Tabs, Tooltip, DropdownMenu, NavigationMenu)
Animation      : Framer Motion (motion/react)
Icons          : Lucide React
Fonts          : next/font/google → Geist Sans, Geist Mono, Instrument Serif
Forms          : React Hook Form + Zod
Blog (MDX)     : next-mdx-remote OR @next/mdx + gray-matter for frontmatter
Class merging  : clsx + tailwind-merge (export a `cn()` helper)
Variants       : class-variance-authority (cva) for Button, Badge, etc.
Linting        : ESLint + Prettier (default Next config is fine)
Deploy target  : Vercel
```

**Initialize the project with:**

```bash
npx create-next-app@latest signhr-site --typescript --tailwind --app --eslint --src-dir
cd signhr-site
npm i framer-motion lucide-react clsx tailwind-merge class-variance-authority
npm i @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu
npm i react-hook-form zod @hookform/resolvers
npm i gray-matter next-mdx-remote
npm i -D @tailwindcss/typography
```

---

## DESIGN SYSTEM — IMPLEMENT FIRST, BEFORE ANY PAGE

Before building any page, set up the design system in `src/app/globals.css` and `src/lib/`. Pages should compose from this system, not re-invent it.

### Colors (define as CSS variables in `@theme`)

Follow `.claude/DESIGN_SYSTEM.md`

### Typography rules

- **Headlines** mix `font-sans` (bold, tight tracking) with `font-serif` italic for accent words.
- **Hero H1:** `clamp(48px, 7vw, 88px)`, line-height 1.05, tracking -0.02em.
- **Section H2:** `clamp(36px, 4.5vw, 56px)`, line-height 1.1.
- **H3:** 24–28px.
- **Body:** 17px / 1.6.

Helper component pattern for mixed-font headlines:

```tsx
// <Headline>Run your <em>entire HR</em> without the chaos.</Headline>
// where <em> styled to use Instrument Serif italic
```

### Spacing rhythm

- Section vertical padding: `py-24 md:py-32` (mobile 96px, desktop 128px)
- Between major sections on a page: separator-free, rely on background swaps + spacing
- Container: max-w-[1280px] mx-auto px-6 md:px-8

### `cn()` helper — `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Button — `src/components/ui/button.tsx`

Use `class-variance-authority`. Variants: `primary` (filled near-black with white text), `secondary` (white surface with border), `ghost` (text only), `link` (underline on hover). Sizes: `sm`, `md`, `lg`. Always include focus-visible ring in brand color. Hover: subtle scale 1.02 + shadow lift on primary.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white hover:bg-ink-secondary hover:scale-[1.02] shadow-sm hover:shadow-md",
        secondary:
          "bg-surface text-ink border border-border hover:border-ink-muted hover:bg-muted",
        ghost: "text-ink hover:bg-muted",
        link: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[10px]",
        md: "h-11 px-5 text-[15px] rounded-[12px]",
        lg: "h-13 px-7 text-base rounded-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
```

---

## FILE & FOLDER STRUCTURE

```
signhr-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, navbar, footer, metadata
│   │   ├── page.tsx                # Home
│   │   ├── globals.css             # Tailwind v4 theme + globals
│   │   ├── not-found.tsx           # Custom 404
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx     # Default OG image
│   │   │
│   │   ├── features/
│   │   │   ├── page.tsx            # Hub
│   │   │   ├── core-hrms/page.tsx
│   │   │   ├── time-attendance/page.tsx
│   │   │   ├── leave-management/page.tsx
│   │   │   ├── payroll/page.tsx
│   │   │   ├── onboarding/page.tsx
│   │   │   ├── offboarding/page.tsx
│   │   │   ├── self-service/page.tsx
│   │   │   ├── workflows/page.tsx
│   │   │   └── assets/page.tsx
│   │   │
│   │   ├── pricing/page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── resources/
│   │   │   ├── page.tsx
│   │   │   ├── guides/page.tsx
│   │   │   ├── templates/page.tsx
│   │   │   └── help/page.tsx
│   │   ├── changelog/page.tsx
│   │   ├── book-demo/page.tsx
│   │   ├── contact/page.tsx
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       ├── terms/page.tsx
│   │       └── dpa/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # Primitives
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── container.tsx
│   │   │   └── section.tsx
│   │   ├── marketing/
│   │   │   ├── hero.tsx
│   │   │   ├── cta-band.tsx
│   │   │   ├── feature-card.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── stat-number.tsx
│   │   │   ├── logo-cloud.tsx
│   │   │   ├── logo-marquee.tsx
│   │   │   ├── spotlight.tsx
│   │   │   ├── pricing-card.tsx
│   │   │   ├── faq-accordion.tsx
│   │   │   ├── newsletter-signup.tsx
│   │   │   ├── gradient-halo.tsx
│   │   │   ├── floating-mockup.tsx
│   │   │   └── workflow-demo.tsx
│   │   ├── blog/
│   │   │   ├── post-card.tsx
│   │   │   ├── post-header.tsx
│   │   │   ├── toc.tsx
│   │   │   ├── author-card.tsx
│   │   │   └── related-posts.tsx
│   │   └── icons/                  # Custom SVG icons / brand mark
│   │       └── logo.tsx
│   │
│   ├── content/
│   │   └── blog/                   # MDX files for posts
│   │       ├── honest-cost-of-hr-spreadsheets.mdx
│   │       ├── employee-handbook-guide.mdx
│   │       └── ... (10 seed posts)
│   │
│   ├── lib/
│   │   ├── utils.ts                # cn() helper
│   │   ├── blog.ts                 # MDX loader, frontmatter parser
│   │   ├── nav.ts                  # Nav config (single source for nav items)
│   │   ├── features.ts             # Feature module data
│   │   ├── pricing.ts              # Pricing tier data
│   │   └── testimonials.ts         # Testimonial data
│   │
│   └── types/
│       └── index.ts
│
├── public/
│   ├── mockups/                    # Dashboard screenshots (use placeholders if needed)
│   ├── logos/                      # Customer + integration logos
│   ├── avatars/                    # Stylized avatar SVGs
│   └── og/                         # Static OG images
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## BUILD ORDER (FOLLOW STRICTLY)

Build in phases. Don't skip ahead. Verify each phase visually before moving on.

### Phase 1 — Foundation (no pages yet)

1. Initialize Next.js with the install commands above
2. Configure `next/font` for Geist Sans, Geist Mono, Instrument Serif in `app/layout.tsx`
3. Set up `globals.css` with the full `@theme` block from the Design System section
4. Build `src/lib/utils.ts` with `cn()` helper
5. Build the `<Button>` component with cva variants
6. Build core layout primitives: `<Container>`, `<Section>`
7. Build `<Navbar>` with mega-menu (Radix NavigationMenu) + sticky frosted-glass on scroll
8. Build `<Footer>` per PRD §5.2
9. Build `<MobileMenu>` (Radix Dialog as slide-in sheet)
10. Set up `src/lib/nav.ts` as single source of nav config
11. Wire navbar + footer into root `layout.tsx`

✅ Verify: navigate to `/` (will be empty), see header + footer rendering correctly on desktop AND mobile. Mega-menu opens on hover. Mobile sheet opens on tap.

### Phase 2 — Marketing component library

Build these and create a temporary `/dev` route that renders all of them so you can visually QA before composing pages:

1. `<Hero>` (props for variant: home / feature / generic)
2. `<GradientHalo>` — soft radial gradient blob; positioned absolute, z-0
3. `<FloatingMockup>` — wraps an image with Framer Motion bobbing animation (respect reduced-motion)
4. `<FeatureCard>`, `<TestimonialCard>`, `<StatNumber>` (count-up via Framer Motion `useInView`)
5. `<LogoCloud>`, `<LogoMarquee>` (infinite scroll, pure CSS or Framer)
6. `<Spotlight>` — alternating L/R image+copy section
7. `<CTABand>` — gradient background, headline + 2 buttons
8. `<FAQAccordion>` (Radix Accordion)
9. `<NewsletterSignup>` (RHF + Zod, even if backend stubbed)
10. `<PricingCard>`
11. `<WorkflowDemo>` — animated SVG flow showing leave request → manager → HR → approved (auto-plays on viewport enter)

✅ Verify on `/dev` that every component looks production-ready in isolation.

### Phase 3 — Home page (`/`)

Compose home using the components from Phase 2, in the section order from PRD §6.1. Write all real copy in SignHR voice.

**Critical:**

- Hero headline must use mixed sans + serif italic. Example DOM:
  ```tsx
  <h1>
    Run your <span className="font-sans">entire HR</span>{" "}
    <em className="font-serif italic font-normal">without</em> the chaos.
  </h1>
  ```
- Hero visual = floating dashboard mockup (use a polished placeholder PNG/SVG you generate or a `<div>` styled to look like a dashboard with realistic content — NOT a gray box)
- Logo cloud needs 8 plausible-sounding company names rendered as text-logos in different fonts (Acme, Northwind, Globex, Initech, Massive Dynamic, Stark Industries, Wayne Enterprises, Hooli) — grayscale, hover to color
- Stats use real-feeling numbers with count-up
- Testimonials need 3 fully-written quotes with names + roles + companies

✅ Verify: home renders correctly. Lighthouse Performance 95+, Accessibility 100. No CLS.

### Phase 4 — Feature pages

1. Build `/features` hub page (PRD §6.2)
2. Build the feature deep-dive **template** as a reusable composition — accepts data from `src/lib/features.ts`
3. Build all 9 feature pages using that template, each with module-specific copy from PRD §6.3

**Each feature page must have unique copy** — don't duplicate. Use the headline patterns in PRD §6.3.

✅ Verify: every `/features/*` route renders with distinct content. Internal cross-links between related modules work.

### Phase 5 — Pricing, Customers, About

1. **Pricing** — 3 tiers, monthly/annual toggle (state-managed), feature comparison table, FAQ accordion
2. **Customers** — index page with featured case study + grid; build at least 2 real-feeling case study `[slug]` pages
3. **About** — full page with origin story, values, team grid (use stylized avatar placeholders)

### Phase 6 — Blog system

1. Set up MDX pipeline: `src/lib/blog.ts` reads `.mdx` files from `src/content/blog/`, parses frontmatter via `gray-matter`, returns typed posts
2. Build `/blog` index with category filter (client component for filter state)
3. Build `/blog/[slug]` with: cover image, header, sticky TOC (auto-generated from headings), MDX content render, author card, related posts
4. Style MDX components: `<Callout>` (info/warning/tip variants), styled headings with anchor links, code blocks (use rehype-pretty-code or shiki), images with captions, blockquotes
5. Write **3 full seed blog posts** with real prose (1500+ words each) from the list in PRD §8. Stub the remaining 7 with frontmatter + lorem-replacement intro paragraphs (clearly marked as drafts).

### Phase 7 — Resources, Changelog, Book Demo, Contact, Legal

1. `/resources` hub
2. `/changelog` — list of versioned updates
3. `/book-demo` — two-column layout. For now, embed a Cal.com link OR build a custom form (RHF + Zod) that posts to a stub API route
4. `/contact` — split layout with form
5. `/legal/privacy`, `/legal/terms`, `/legal/dpa` — placeholder long-form prose, properly formatted

### Phase 8 — SEO, OG images, sitemap

1. Per-page `metadata` exports (title, description, OG, canonical)
2. `app/sitemap.ts` — generate from all static + dynamic (blog) routes
3. `app/robots.ts`
4. `app/opengraph-image.tsx` — default OG image with logo + tagline using `ImageResponse`
5. Add JSON-LD structured data: Organization on home, Article on blog posts, FAQPage on pricing
6. 404 page

### Phase 9 — Quality pass

1. Run Lighthouse on home, a feature page, pricing, blog index, blog post — all ≥95 Performance / 100 Accessibility
2. Test keyboard navigation through navbar, mobile menu, accordions, forms
3. Test at 375 / 768 / 1024 / 1440 widths
4. Verify reduced-motion: bobbing animations should freeze
5. Check no console errors, no hydration mismatches
6. Verify all CTA buttons link to `/book-demo` or signup
7. Run `pnpm build` — must build cleanly with zero warnings

---

## DESIGN DETAILS THAT MATTER

These are the small things that separate Lovable-grade from generic. Get them right.

### Hero

- **Background:** soft gradient halo (indigo → pink → cream) blurred behind the headline, NOT a solid color
- **Headline:** mixed font weights AND fonts. Make it visually interesting.
- **Visual:** dashboard mockup with subtle perspective (rotate 2deg on Y-axis), floating with slow bob, soft drop shadow underneath
- **Above the headline:** a small "What's new" pill linking to changelog (e.g., "✨ New: Asset Management is live →")
- **Below CTAs:** trust microcopy ("No credit card required • Set up in 10 minutes")

### Cards

- Border `1px solid var(--color-border)`, NOT shadows alone
- On hover: border darkens to `--color-ink-muted`, lifts 2px with subtle shadow
- Inner padding generous: 32px desktop, 24px mobile
- Icons: 40px, in a soft-tinted square (brand-50 background)

### Mockup styling

When inserting fake dashboard screenshots, build them as actual HTML/CSS components when possible. Real-looking mockups beat real screenshots of bad UI. Include:

- A sidebar with nav items + icons
- A top bar with breadcrumb + avatar
- Real-feeling data: charts, tables, employee names
- Use the SignHR brand palette inside the mockup so it feels cohesive

### Animations

- Reveal on scroll: `initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}` with stagger
- Hover on cards: `whileHover={{ y: -4 }}` with spring
- Numbers count up using `framer-motion` `useMotionValue` + `animate`
- **Never** auto-play sound, never use abrupt motion, never bounce excessively

### Forms

- Floating labels OR top-aligned labels with clear hierarchy
- Error state: red-500 border + small error message below
- Success state: green-500 with checkmark
- Submit button shows loading spinner when pending
- Use Zod schema for validation

### Footer

- Newsletter signup at the top of the footer (3-column wide form: email + button)
- 5 columns of links + a brand block
- Bottom bar: copyright, status page link, social icons (Twitter/X, LinkedIn, GitHub)
- Subtle top border, slightly darker background than page

---

## CONTENT VOICE (CRITICAL — DO NOT DEVIATE)

**Yes:**

- "Run your entire HR without the chaos."
- "First day, done in minutes."
- "Time off should be easy for everyone."
- "Built for teams of 20 to 500."

**Hell no:**

- "Unlock seamless workforce optimization"
- "Leverage holistic talent solutions"
- "Empower your synergistic HR ecosystem"
- "Robust enterprise-grade scalability"

If a sentence sounds like it could be on any of 100 SaaS sites, rewrite it.

---

## DELIVERABLES

When you finish, the repo must include:

1. ✅ All routes from PRD §5.1 rendering with real content
2. ✅ A `README.md` with: project description, install/run commands, env vars, content editing guide (where to add a blog post), deploy notes
3. ✅ A `DESIGN.md` with: design tokens, component inventory, conventions for adding new pages
4. ✅ Lighthouse screenshots (or scores noted in README) for home, a feature page, blog
5. ✅ Clean `pnpm build` with zero errors/warnings
6. ✅ Git history with meaningful commits per phase

---

## START

1. Read `SignHR_PRD.md` end-to-end first.
2. Confirm you understand the scope by listing the 9 feature pages, the design tokens, and the build phases.
3. Begin Phase 1.
4. Pause after each phase to summarize what was built and any deviations from the plan, then continue.

Quality > speed. Build it like it's going to be on the front page of your portfolio.

Go.
