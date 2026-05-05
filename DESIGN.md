# SignHR Marketing Site — Design System

The hybrid design system for the SignHR marketing site. **Purple brand + semantic tokens** are inherited from the product app's `.claude/DESIGN_SYSTEM.md` (so visitors who book a demo and land in the app see one identity). **Marketing typography** (Geist + Instrument Serif, fluid display scale, gradient halos, floating mockups) is layered on top — a Lovable / Linear / Vercel-grade marketing language.

Everything below is implemented in `src/app/globals.css` and consumed via Tailwind v4 CSS-first tokens (`@theme`).

---

## 1. Color tokens

All color tokens are defined as HSL components in `:root` and exposed as Tailwind utilities (`bg-primary`, `text-ink`, etc.) via the `@theme inline` block. Always use semantic tokens — never hardcode HSL or hex.

### Semantic (shadcn-style)

| Token                | Light value      | Resolved   | Use                                       |
| -------------------- | ---------------- | ---------- | ----------------------------------------- |
| `--background`       | `220 14% 96%`    | `#F2F3F5`  | Page background                           |
| `--foreground`       | `230 25% 12%`    | `#171B2C`  | Primary text                              |
| `--card`             | `0 0% 100%`      | `#FFFFFF`  | Card / panel surface                      |
| `--primary`          | `258 58% 56%`    | `#7C4DFF`  | Brand purple (CTAs, links, focus rings)   |
| `--secondary`        | `258 30% 96%`    | `#F3F0FA`  | Subtle purple-tinted surface              |
| `--muted`            | `220 14% 93%`    | `#EBEBEF`  | Disabled / empty surfaces                 |
| `--muted-foreground` | `220 10% 46%`    | `#6B7080`  | Captions, labels                          |
| `--accent`           | `35 92% 55%`     | `#F5A623`  | Amber for warnings / highlights           |
| `--destructive`      | `0 72% 55%`      | `#E04343`  | Errors                                    |
| `--success`          | `152 56% 46%`    | `#34B77B`  | On-time / approved                        |
| `--info`             | `210 80% 55%`    | `#3B8BF5`  | Informational                             |
| `--border`           | `220 16% 90%`    | `#E0E2E8`  | All borders                               |
| `--ring`             | `258 58% 56%`    | `#7C4DFF`  | Focus rings                               |

### Marketing-extended

| Token              | Light value     | Resolved   | Use                                    |
| ------------------ | --------------- | ---------- | -------------------------------------- |
| `--ink`            | `230 25% 12%`   | `#171B2C`  | Marketing-grade primary text           |
| `--ink-secondary`  | `230 18% 28%`   | `#3B4156`  | Body paragraph color                   |
| `--ink-muted`      | `230 12% 42%`   | `#5C6175`  | Tertiary / metadata                    |
| `--brand-50…900`   | nine-stop scale | —          | Soft halo surfaces, hover states, etc. |

### Status pattern

```html
Active/Approved → bg-success/10  text-success
Pending/Warning → bg-accent/10   text-accent-foreground
Error/Rejected  → bg-destructive/10 text-destructive
On Leave       → bg-muted text-ink-muted
```

---

## 2. Typography

Three families wired via `next/font` (in `app/layout.tsx`) and exposed as Tailwind utilities via `--font-{sans,mono,serif}`:

- **Geist Sans** — body + display (`font-sans`)
- **Geist Mono** — pricing numbers, stats, code (`font-mono`)
- **Instrument Serif** — italic accent words inside headlines (`serif-italic` utility)

### Headline pattern

Mix sans + serif italic for premium feel:

```tsx
<h1 className="text-display-xl">
  Run your <span className="font-sans">entire HR</span>{" "}
  <em className="serif-italic">without</em> the chaos.
</h1>
```

### Display scale (fluid clamp via `text-display-*` utilities)

| Utility           | Size                          | LH   | Tracking  | Use                  |
| ----------------- | ----------------------------- | ---- | --------- | -------------------- |
| `text-display-xl` | `clamp(48px, 7vw, 88px)`      | 1.04 | -0.025em  | Home hero H1         |
| `text-display-lg` | `clamp(40px, 6vw, 72px)`      | 1.06 | -0.022em  | Feature hero H1      |
| `text-display-md` | `clamp(36px, 4.5vw, 56px)`    | 1.10 | -0.020em  | Section H2           |
| `text-display-sm` | `clamp(28px, 3.5vw, 40px)`    | 1.15 | -0.018em  | Subsection H3        |

Body: 17px / 1.65 line-height (`text-[17px] leading-[1.65]`). Buttons: 14–16px. Captions: 12–13px.

---

## 3. Spacing & rhythm

- Section vertical padding: `py-16 md:py-20` (compact), `py-24 md:py-32` (standard), `py-32 md:py-40` (large) — set via `<Section pad="…">`
- Container max-width: `max-w-[1280px]` default (`<Container size="lg">`); `md` = `max-w-5xl`, `sm` = `max-w-3xl`, `xl` = `max-w-[1440px]`
- Side padding: `px-6 md:px-8`
- Card inner padding: 24px mobile, 28–32px desktop

---

## 4. Borders & radii

| Token         | Value | Use                                          |
| ------------- | ----- | -------------------------------------------- |
| `rounded-sm`  | 8px   | Small badges                                 |
| `rounded-md`  | 10px  | Small buttons, inline elements               |
| `rounded-lg`  | 12px  | Buttons (md), inputs, sidebar items          |
| `rounded-xl`  | 16px  | Standard cards, mockup tiles                 |
| `rounded-2xl` | 24px  | Hero feature cards, big CTAs                 |
| `rounded-full`| 50%   | Avatars, status dots, billing pill           |

All borders use `border-border` (1px solid `#E0E2E8`). Hover lift on cards: `hover:border-ink-muted hover:-translate-y-1` + soft shadow.

---

## 5. Elevation

- Cards: borders, not shadows.
- Hover lift: `hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]` plus `-translate-y-1`.
- Hero mockup: heavy spread shadow `shadow-[0_50px_100px_-30px_rgba(45,30,90,0.35)]`.
- Floating mockup: combined with motion's slow Y-bob.

---

## 6. Animation

All custom animations honor `prefers-reduced-motion` via `globals.css` overrides.

| Utility           | Duration  | Use                                  |
| ----------------- | --------- | ------------------------------------ |
| `animate-marquee` | 38s       | Logo strip infinite scroll           |
| `animate-float`   | 6s        | Hero mockup vertical bob             |
| Motion library    | varies    | Reveal-on-scroll, count-up stats     |

Buttons: `transition-all duration-200 ease-out` + `active:scale-[0.98]` + `hover:-translate-y-px` (primary) for tactile feedback.

---

## 7. Component inventory

### `components/ui/`
- **`Button`** — cva variants `primary | brand | secondary | ghost | link`, sizes `sm | md | lg | icon`, `asChild` via Radix Slot
- **`Badge`** — variants `default | brand | success | warning | outline | glass`

### `components/layout/`
- **`Container`** — max-width wrapper with responsive padding (sizes `sm | md | lg | xl`)
- **`Section`** — vertical-rhythm wrapper (`pad`: compact/standard/large; `surface`: default/muted/ink/gradient)
- **`Navbar`** — sticky frosted-glass on scroll, Radix NavigationMenu mega-menu (3-col Features grouped by Core/Time/Lifecycle, Resources column), keyboard nav, route-aware active state
- **`MobileMenu`** — Radix Dialog slide-in sheet, accordion-collapsed sections, closes on route change
- **`Footer`** — 5-column nav + brand block + inline newsletter signup + status pill + social SVGs

### `components/marketing/`

| Component               | Purpose                                                                    |
| ----------------------- | -------------------------------------------------------------------------- |
| `Hero`                  | 3 variants (`home | feature | generic`), home includes floating mockup    |
| `GradientHalo`          | Soft radial-gradient background blob (4 variants × 4 sizes)                |
| `FloatingMockup`        | Motion wrapper with reduced-motion-safe Y-bob + optional 3D tilt           |
| `DashboardMockup`       | Full hand-built dashboard (sidebar, topbar, stat cards, chart, activity)   |
| `SpotlightMockupView`   | 10 module-specific mockups (profile, attendance, leave, payroll, …)        |
| `Spotlight`             | Alternating L/R image+copy section with bullets                            |
| `FeatureCard`           | Icon + title + body + optional href, hover lift                            |
| `TestimonialCard`       | Quote + avatar + attribution, 4 accent gradients                           |
| `StatNumber`            | Count-up animation on viewport enter (decimals + sr-only fallback)         |
| `LogoCloud`             | Mixed-font text-logo grid                                                  |
| `LogoMarquee`           | Pure-CSS infinite horizontal scroll with edge fade mask                    |
| `WorkflowDemo`          | Auto-playing 4-step animation with pause control + reduced-motion freeze   |
| `PricingCard`           | Tier card with monthly/annual price + savings note + highlight ring        |
| `PricingToggle`         | Animated billing toggle with `motion.layoutId` pill                        |
| `ComparisonTable`       | Plan comparison with category groupings                                    |
| `FAQAccordion`          | Radix accordion with animated +/× toggle                                   |
| `CTABand`               | Gradient + ink variants, halo backdrop                                     |
| `NewsletterSignup`      | RHF + Zod, inline / stacked variants                                       |
| `DemoForm`              | RHF + Zod, validated 5-field form, success state                           |
| `ContactForm`           | RHF + Zod, topic enum                                                      |

### `components/blog/`

- `PostCard` — grid + feature variants with gradient cover art
- `PostHeader` — breadcrumb, badge, author, gradient cover band
- `Toc` — sticky scrollspy via IntersectionObserver
- `AuthorCard` — author bio
- `RelatedPosts` — 3-card grid
- `BlogIndexClient` — animated category filter with `motion.AnimatePresence` `popLayout`
- `mdx-components` — overrides for `h2/h3/h4` (auto-anchor IDs), `a`, `pre`, `code`, `blockquote` + `<Callout>`

### `components/seo/`

- `JsonLd` — emits a single `<script type="application/ld+json">` tag with safe escaping

### `components/icons/`

- `LogoMark` / `Logo` — branded SVG mark with purple gradient
- `social.tsx` — inline Twitter / LinkedIn / GitHub SVGs (lucide v1 dropped brand icons)

---

## 8. Conventions for adding new pages

1. **Server component first.** Default to RSC. Only add `"use client"` for stateful islands (forms, motion-driven interactions, scrollspy).
2. **Compose from existing components.** Hero → content sections → CTA band → footer. Reach for a new component only after checking `components/marketing/` and `/dev`.
3. **Use the hybrid headline pattern.** `text-display-{xl|lg|md|sm}` + `<em className="serif-italic">` for accent words.
4. **Always export `metadata`.** Title, description, canonical URL. Per-page OG metadata is inherited from `app/layout.tsx`.
5. **Add to sitemap.** Static routes added to `STATIC_ROUTES` in `app/sitemap.ts`. Dynamic routes flow through `generateStaticParams`.
6. **Prefer SSG.** Use `generateStaticParams` for dynamic routes. The site is currently 43 SSG pages + 1 dynamic (book-demo with searchParams).
7. **Test responsive at 375 / 768 / 1024 / 1440.** Mobile is not a squished desktop — design intentionally.
8. **Run `pnpm lint` and `pnpm build` before opening a PR.**

---

## 9. Voice & content rules

From PRD §8.3, copied here so reviewers and contributors don't have to dig:

**Yes:**
- "Run your entire HR without the chaos."
- "First day, done in minutes."
- "Time off should be easy for everyone."

**Hell no:**
- "Unlock seamless workforce optimization"
- "Leverage holistic talent solutions"
- "Empower your synergistic HR ecosystem"
- "Robust enterprise-grade scalability"

If a sentence sounds like it could appear on 100 other SaaS sites, rewrite it. Specific over vague. Confident over corporate. Short over long. Human over robotic.

Banned words: **synergy, leverage, seamless, robust, holistic, empower, unlock**.

---

## 10. Internal QA route

`/dev` renders every primitive, mockup, and composed section in one page. It's marked `noindex` in metadata and excluded from `robots.txt`. Use it as a visual regression smoke test after any design-system change.
