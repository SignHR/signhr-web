# Hero redesign — split dark layout (variant F)

**Date:** 2026-05-05
**Status:** Approved (visual direction)
**Owner:** Marketing site (`signhr-web`)
**Affects:** `src/components/marketing/hero.tsx`, `src/app/page.tsx`, related styles in `src/app/globals.css`

## Problem

The current home hero (`variant="home"` in `src/components/marketing/hero.tsx`) is a centered eyebrow → big serif headline → sub → CTAs → wide dashboard mockup below. It's safe and conversion-tested, but reads as a stock SaaS template. It doesn't lean into SignHR's existing design system strengths (purple brand, serif italics) or its product-confidence story, and it competes with the rest of the homepage's much more opinionated sections.

We want a hero that is **more memorable and more product-forward**, while still satisfying the conversion job: clear value prop, two CTAs above the fold, trust signals visible on first paint.

## Goals

1. **Brand statement:** big typographic energy, dark canvas, a hero that's recognisable without the logo.
2. **Product confidence:** show a real-feeling SignHR dashboard panel, not a hand-wavy illustration.
3. **Conversion preserved:** primary "Book a demo" + secondary "Start free trial" remain above the fold; trust signals visible immediately.
4. **Responsive parity:** desktop, tablet (768px), mobile (390px) all feel intentional — no layout breaking.

## Non-goals

- Replacing the hero on feature/generic pages. Only `variant="home"` is changing. The other variants stay as-is.
- Replacing or restructuring downstream homepage sections. The hero must hand off cleanly to the existing logo cloud / problem-solution sections below it.
- Building a fully interactive product demo inside the mockup. The dashboard is a static composition that *looks* live (animated dot, time stamps, scrolling ticker), not a functional app.

## High-level layout

A two-column dark hero on a near-black canvas (`#0d0d14`), with two soft radial halos (purple top-right, pink bottom-left) for atmosphere. Below the columns, a full-bleed feature ticker.

```
┌──────────────────────────────────────────────────────────────┐
│  [SignHR logo]   Features  Pricing  Customers …  Login [CTA] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ● Live · 248 workspaces active                              │
│                                          ┌──────────────────┐│
│  Run your entire HR                      │ ● ● ●  app...    ││
│  *without* the chaos.                    │──────────────────││
│                                          │ Sidebar │ Main   ││
│  The all-in-one HRMS for teams of …      │         │ KPIs   ││
│                                          │         │ Activity││
│  [⚡ Onboarding in 10 min] [✓ Slack]…    │                  ││
│                                          └──────────────────┘│
│  [Book a demo →]  [Start free trial]         ▢ Approved 2:14 │
│                                                              │
│  ◐◐◐◐+5  ★★★★★ 4.8/5 · 500+ teams                            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ ◀  👥 Core HRMS · 🗓 Leave · ⏱ Attendance · 💼 Payroll · …  ▶│
└──────────────────────────────────────────────────────────────┘
```

## Component structure

### Single home-only variant

The change is contained inside `src/components/marketing/hero.tsx`. When `variant === "home"`, render the new layout. All other variants (`feature`, `generic`) stay on the existing centered composition.

To keep `hero.tsx` readable, extract the home-variant body into a new sibling file:

- **`src/components/marketing/hero-home.tsx`** — the new dark split hero. Receives the same props as the home variant currently consumes (`eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`, `trust`).
- **`src/components/marketing/hero.tsx`** — keeps the multi-variant orchestrator. When `variant === "home"`, delegates to `<HeroHome … />` instead of rendering the centered tree.

Rationale: the new home hero has noticeably more internal structure (status pill, headline with gradient italic, feature chips, social-proof row, dashboard mockup, floating callout, ticker). Folding it into `hero.tsx` would make a single file responsible for three meaningfully different compositions, which is the kind of growth the project's CLAUDE.md flags as a smell. Splitting also lets us test/iterate the home hero in isolation without touching feature-page heroes.

### Internal composition of `<HeroHome />`

```
HeroHome
├── HeroBackground         ← absolute halos, dark canvas
├── (left column)
│   ├── StatusPill          ← live dot + "Live · N workspaces active"
│   ├── h1                  ← gradient italic on the highlighted word
│   ├── p.sub
│   ├── FeatureChips        ← 3 chips, each: icon + label
│   ├── HeroCtaRow          ← primary + secondary buttons
│   └── SocialProofRow      ← stacked avatars + stars/rating + count
├── (right column)
│   └── HeroDashboardMockup ← reuses DashboardMockup with framing chrome
│       └── FloatingCallout ← absolute "Approved in 2m 14s" badge
└── FeatureTicker           ← infinite-scroll marquee, full-bleed
```

`HeroDashboardMockup`, `FloatingCallout`, and `FeatureTicker` are sub-components in the same `hero-home.tsx` file. They aren't reused outside this hero, so they don't need their own files yet. If a second consumer appears later, lift them.

The existing `DashboardMockup` in `src/components/marketing/dashboard-mockup.tsx` already renders a sidebar + KPIs + activity feed pattern that matches what we need. The home hero uses `DashboardMockup` as its inner content and wraps it with:
- A "browser" chrome (3 dots + URL pill) above the dashboard.
- A 3D tilt (`rotateY(-6deg) rotateX(4deg)`) on desktop, removed on tablet/mobile.
- A radial purple glow behind it via a `::before` pseudo on the wrapper.
- The absolute floating callout pinned bottom-left with a slight `rotate(-2deg)` for personality.

Verify before implementation: open `dashboard-mockup.tsx` and confirm it accepts a className and renders self-contained. If it has incompatible internal padding/chrome, either pass props to suppress it or render a tighter inline composition inside `HeroDashboardMockup` instead. Do not modify `DashboardMockup` to suit the hero — that component is also used elsewhere (verify with grep first).

## Content (copy)

These are the strings rendered by the new hero. They flow in from `src/app/page.tsx` via the existing `<Hero>` props — the hero component does not own copy.

| Slot | Value |
|---|---|
| Status pill | `Live · 248 workspaces active` |
| Eyebrow icon | pulsing green dot (custom, not lucide) |
| H1 | `Run your entire HR <em>without</em> the chaos.` (existing) |
| Sub | existing copy from `src/app/page.tsx` |
| Feature chips | `Onboarding in 10 min` / `Approvals in Slack` / `Payroll in 1 click` |
| Primary CTA | `Book a demo →` → `/book-demo` (existing) |
| Secondary CTA | `Start free trial` → `/book-demo?plan=growth` (existing) |
| Social proof | 5 stacked avatars (initials P, K, A, R, +5) + `★★★★★ 4.8/5 across 200+ reviews · Loved by 500+ growing teams` |
| Floating callout | `Approved in 2m 14s` / `via Slack · no app switch` |
| Ticker | `Core HRMS · Leave management · Time & attendance · Payroll · Onboarding · Workflows & approvals · Asset management · Slack & email integrations` |

The status-pill workspace count, the social-proof rating + count, and the ticker items are **static strings** for now. We are not wiring them to live data in this iteration. The "Live" framing is set-dressing to convey product-confidence personality, not a live metrics feed. If we later want real numbers there, that's a separate spec.

The ticker items map to the existing feature module slugs in `src/lib/features.ts`: `core-hrms`, `leave-management`, `time-attendance`, `payroll`, `onboarding`, `workflows`, `asset-management`. The 8th item ("Slack & email integrations") doesn't correspond to a standalone module — it's a cross-cutting integration. Leave it as a non-linked label.

**Decision:** ticker items render as plain text, not links. Linking each to its feature page would create 8 more outbound links above the fold and dilute the primary CTA. If we want them clickable later, that's a follow-up.

## Visual tokens

All colors and effects must use the existing design tokens in `src/app/globals.css`. Key tokens to use:

- Canvas background: a new token `--hero-dark: 240 25% 6%` (≈ `#0d0d14`). Defined in HSL form to match the other tokens in `globals.css`. The hero is intentionally dark in both light and dark themes, so this token is set to the same value in both `:root` and `.dark` blocks (or defined once in `:root` if no override is needed).
- Halos: `--brand-500` at 0.42 alpha (top-right) and pink at 0.22 alpha (bottom-left). The pink isn't a brand token today; introduce `--accent-pink: 332 79% 58%` alongside the brand scale and reference it from this component only.
- Headline gradient italic: linear gradient from `--brand-300` → pink-300 → pink-400. Apply via `background-clip: text`.
- Status pill, chips, secondary button: glass treatment — `rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.10)` border, `backdrop-filter: blur(8px)`.
- Primary button: linear gradient `--brand-500` → `--brand-600`, with a `box-shadow` purple drop.
- Mockup body: white card (`#fff`) — the dashboard stays light even on the dark canvas. The contrast is part of the design.
- Ticker icon tiles: gradient background (`--brand-500/0.25` → pink/0.20), rounded 6px.

Do not introduce arbitrary hex values inline. Anything not covered by the brand scale or the new pink/dark tokens should be one of the existing `--ink-*`, `--muted`, `--card`, `--border` tokens.

## Animation

Three motion elements, all respecting `prefers-reduced-motion`:

1. **Status-pill green dot** — pulsing box-shadow ring, 1.6s ease-in-out infinite.
2. **Feature ticker** — horizontal infinite marquee. Implement by duplicating the items list once inside the track and animating `transform: translateX(0)` → `translateX(-50%)` over 50s linear infinite. Use plain CSS keyframes, not Motion — the marquee runs forever and Motion's animation engine adds JS overhead we don't need here.
3. **Floating callout** — appears with a small fade + slide-up via Motion `<motion.div>` with `initial={{ opacity: 0, y: 8 }}` and `whileInView` so it animates the first time the hero scrolls into view, then stays.

When `useReducedMotion()` returns true:
- Pulsing dot becomes a static green dot (no box-shadow animation).
- Ticker track is paused (`animation-play-state: paused`) but still visible.
- Floating callout skips the slide and renders at its final position immediately.

## Responsive behavior

The hero is built mobile-first; desktop is the largest breakpoint, tablet in between.

| Breakpoint | Behavior |
|---|---|
| **Desktop ≥ 1024px** | Two-column grid `1.05fr / 1fr`. Headline ~88px (clamp 44–88). Mockup tilts (rotateY -6°, rotateX 4°). Floating callout pinned at `bottom: -16px; left: -28px`. Ticker 8 full-length items. |
| **Tablet 768–1023px** | Single column; copy stacks above mockup. Headline 56px. Mockup straightens (no tilt). Sidebar trimmed to 4 menu items. Floating callout repositioned to `bottom: -12px; left: 8px`. Ticker condenses to single-word labels (Leave, Attendance, Payroll, …). |
| **Mobile ≤ 767px** | Single column. Headline 40px. Mockup loses sidebar entirely (main content only). KPI tiles wrap (2-up; "Pending approvals" tile spans full width as the third row). CTAs go full-width and stack. Floating callout hidden. Feature chips reduced from 3 → 2. Status-pill text shortened to `Live · 248 workspaces`. Ticker shows 6 items with shortest labels. |

Use the existing project breakpoints (`md:`, `lg:` Tailwind defaults). Mobile burger menu reuses the existing `MobileMenu` — the hero only triggers it visually; the hamburger button is already part of the navbar, not the hero.

## Theming (light mode)

The hero is intentionally **always dark**, regardless of the visitor's theme. This is a brand choice, not a bug. The downstream sections still respect light/dark.

To prevent visual whiplash at the seam: the bottom edge of the hero (below the ticker) ends with a soft fade to whatever the next section's background is — implement with a `::after` overlay that gradient-fades from `transparent` to `var(--background)` over the last 24px of the hero.

Do not add a theme toggle inside the hero. The existing global `ThemeToggle` in the navbar continues to work; flipping it changes downstream sections only.

## Accessibility

- The pulsing green dot conveys "live, active." It is decorative — wrap it in `aria-hidden="true"`. The status text alone is sufficient for screen readers.
- The marquee ticker has `aria-hidden="true"`. A static, non-animated `<ul>` of the same feature names, visually hidden, sits before it for screen readers.
- The floating callout has a sensible alt text inside its `aria-label` ("Recent approval: 2 minutes 14 seconds via Slack"). Sighted users see the rotated card; screen readers hear the label once.
- Headline gradient italic must keep contrast ≥ 4.5:1 against the canvas. Verify with the chosen gradient stops; if any stop falls below, darken it.
- All CTAs keep the existing `<Button asChild><Link>` pattern so focus styles, keyboard nav, and prefetching behavior are unchanged.

## Page-level wiring

In `src/app/page.tsx`, the home `<Hero variant="home" … />` invocation is **kept as-is** structurally — the call site continues to compile and pass the same props. All new content (status pill text, feature chips, social proof, floating callout, ticker items) is hardcoded inside `HeroHome` since it's home-specific. If we later need to drive any of this from the page, extend the `HeroProps` interface — not in this iteration.

The `eyebrow` and `trust` props currently passed in (`{ label: "New: Asset Management is live", href: "/changelog" }` and `"No credit card required · Set up in 10 minutes"`) are **silently ignored** by `HeroHome`. The status pill replaces the eyebrow; trust signals are now expressed via the social-proof row. Both props continue to work for `feature` and `generic` variants — `HeroHome` just doesn't read them. We can either leave the unused props on the call site for now (no-op, harmless) or remove them in the same PR. **Decision:** remove them in the same PR for cleanliness; a future engineer reading `page.tsx` shouldn't see props that have no effect. If marketing wants the asset-management announcement back as a hero element later, we can reintroduce it as a small badge above the social-proof row.

## Files to change

- `src/components/marketing/hero.tsx` — when `variant === "home"`, delegate to `<HeroHome />`. Drop the `<FloatingMockup>` / `<DashboardMockup>` block from the home branch (it moves to `HeroHome`). Other variants untouched.
- `src/components/marketing/hero-home.tsx` — **new file**, contains `HeroHome`, `HeroDashboardMockup`, `FloatingCallout`, `FeatureTicker`, and `StatusPill`/`FeatureChips`/`SocialProofRow` as private sub-components.
- `src/app/globals.css` — add `--hero-dark` token (single-value, theme-independent) and `--accent-pink` to the brand color block.

No changes to `src/app/page.tsx` apart from confirming the existing `<Hero variant="home" … />` invocation continues to compile.

## Out of scope (deferred)

- A/B testing infrastructure.
- Live data feeds (workspace count, ratings, ticker counters).
- Light-mode variant of the hero.
- Linking ticker items to feature pages.
- Replacing the eyebrow's "Asset Management is live" announcement — currently dropped; can be reintroduced as a small badge in a follow-up if marketing wants it.

## Acceptance criteria

1. Visiting `/` on desktop renders the dark split hero with all the elements listed in "High-level layout."
2. Resizing to 768px and 390px viewports matches the responsive table above. No content overflows or wraps awkwardly.
3. `prefers-reduced-motion: reduce` removes the pulsing dot animation, pauses the ticker marquee, and skips the floating-callout slide-in.
4. Lighthouse accessibility score for `/` does not regress.
5. `pnpm lint && pnpm build` are clean (0 errors, 0 warnings).
6. The other `Hero` consumers (feature pages, generic pages) render identically to before — no visual regression.
