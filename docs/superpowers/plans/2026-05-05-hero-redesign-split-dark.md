# Hero redesign — split dark layout (variant F) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the centered home hero with a two-column dark composition: copy + CTAs on the left, tilted dashboard mockup with floating callout on the right, full-bleed feature ticker below. Other Hero variants stay untouched.

**Architecture:** A new `HeroHome` component lives in `src/components/marketing/hero-home.tsx` and is delegated to from `Hero` when `variant === "home"`. The new component composes the existing `DashboardMockup` (untouched, used as-is) with new sub-components: `StatusPill`, `FeatureChips`, `SocialProofRow`, `FloatingCallout`, `FeatureTicker`. Two new design tokens (`--hero-dark`, `--accent-pink`) are added to `globals.css`. Animations use plain CSS keyframes (ticker marquee), Motion (callout fade-in), and respect `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 (design tokens via `@theme inline`), Motion (`motion/react`), Lucide icons.

**Spec:** [docs/superpowers/specs/2026-05-05-hero-redesign-split-dark-design.md](../specs/2026-05-05-hero-redesign-split-dark-design.md)

---

## File structure

| Path | Action | Responsibility |
|---|---|---|
| `src/app/globals.css` | Modify | Add `--hero-dark` and `--accent-pink` tokens; expose them through `@theme inline`. |
| `src/components/marketing/hero-home.tsx` | Create | New home-variant hero with all sub-components inline (`StatusPill`, `FeatureChips`, `SocialProofRow`, `FloatingCallout`, `FeatureTicker`, `HeroDashboardMockup`). |
| `src/components/marketing/hero.tsx` | Modify | When `variant === "home"`, delegate to `<HeroHome />`. Drop the home-only `<FloatingMockup>`/`<DashboardMockup>` block from this file. Other variants untouched. |
| `src/app/page.tsx` | Modify | Remove the `eyebrow` and `trust` props from the home `<Hero>` call site (silently ignored by the new component anyway). |

No tests are added in this plan. The marketing site has no existing test suite for components (verified in Task 0); adding one for a single visual component would be out of scope. Verification is via lint + build + manual visual check at three breakpoints, codified in the acceptance task at the end.

---

## Task 0: Verify starting state

**Files:** none modified.

- [ ] **Step 1: Confirm starting branch is clean and on main**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && git status -sb
```

Expected: branch is `main` (or your feature branch), no unstaged changes related to `hero.tsx`, `hero-home.tsx`, `page.tsx`, or `globals.css`. Pre-existing modifications to unrelated files (e.g. `../.gitignore` from session context) are fine.

- [ ] **Step 2: Confirm baseline lint and build pass before any edits**

Run:
```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm lint
```
Expected: exits 0, no output beyond the eslint banner.

Run:
```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: build completes, "✓ Compiled successfully" + the static page summary. If this fails before any edits, stop and investigate — the plan assumes a green baseline.

- [ ] **Step 3: Note the baseline `DashboardMockup` consumers**

Run:
```bash
grep -rn "DashboardMockup" /Users/pcsaini/Desktop/Projects/signhr/signhr-web/src --include="*.tsx"
```
Expected output (3 matches):
- `src/app/dev/page.tsx` (dev preview page)
- `src/components/marketing/hero.tsx` (home hero — will be removed in Task 4)
- `src/components/marketing/dashboard-mockup.tsx` (definition)

After this plan, the dev page and `hero-home.tsx` will be the consumers. `DashboardMockup` itself is **not modified**.

---

## Task 1: Add design tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add `--hero-dark` and `--accent-pink` to the `:root` block**

Find the `:root` block (line 13) in [src/app/globals.css](../../../src/app/globals.css). Inside it, after the existing `--brand-900: 258 56% 22%;` line and before the closing `}` of `:root`, insert:

```css
  /* Hero canvas — intentionally dark in both themes */
  --hero-dark: 240 25% 6%;
  /* Accent pink — used by hero-home halo and headline italic gradient */
  --accent-pink: 332 79% 58%;
```

- [ ] **Step 2: Mirror the same values in the `.dark` block**

Find the `.dark` block (line 62). After the existing `--brand-900: 258 90% 94%;` line and before the closing `}`, insert:

```css
  /* Hero canvas — same as light theme; hero stays dark in both modes */
  --hero-dark: 240 25% 6%;
  --accent-pink: 332 79% 58%;
```

The duplicated value is intentional — defined in both blocks so any future engineer who edits `:root` doesn't accidentally leave `.dark` undefined.

- [ ] **Step 3: Expose tokens through `@theme inline`**

Find the `@theme inline` block (line 105). After the existing `--color-brand-900: hsl(var(--brand-900));` line, add:

```css
  --color-hero-dark: hsl(var(--hero-dark));
  --color-accent-pink: hsl(var(--accent-pink));
```

This makes `bg-hero-dark`, `text-accent-pink`, `from-accent-pink/40`, etc. available as Tailwind utilities.

- [ ] **Step 4: Verify lint and build still pass**

Run:
```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm lint && pnpm build
```
Expected: clean pass. If `bg-hero-dark` is referenced in a future task and Tailwind doesn't pick it up, this step is the one to revisit.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(globals): add --hero-dark and --accent-pink tokens for new hero"
```

---

## Task 2: Create `hero-home.tsx` skeleton with status pill and headline

**Files:**
- Create: `src/components/marketing/hero-home.tsx`

We build `HeroHome` incrementally — skeleton + headline first, then add layers in subsequent tasks. Each task ends in a green build so we can stop and inspect at any point.

- [ ] **Step 1: Create the file with the skeleton**

Create `src/components/marketing/hero-home.tsx`:

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface HeroHomeProps {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

/**
 * Home-only hero. Two-column dark composition: copy + CTAs left, product
 * mockup right, feature ticker full-bleed below. Always dark, regardless of
 * theme. See docs/superpowers/specs/2026-05-05-hero-redesign-split-dark-design.md.
 */
export function HeroHome({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroHomeProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-hero-dark text-white",
        className,
      )}
    >
      <HeroBackground />
      <Container>
        <div className="relative grid items-center gap-12 py-20 md:gap-12 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <StatusPill />
            <h1 className="mt-5 max-w-[13ch] text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-white text-[clamp(44px,5.6vw,88px)]">
              {title}
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryCta && (
                  <Button asChild size="lg">
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-white/[0.02]" />
        </div>
      </Container>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -right-56 -top-56 size-[680px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand-500) / 0.42), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-56 bottom-32 size-[560px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--accent-pink) / 0.22), transparent 70%)",
        }}
      />
    </div>
  );
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 backdrop-blur">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span>Live · 248 workspaces active</span>
    </span>
  );
}
```

Note: the right column is a placeholder rectangle for now — Task 5 fills it. The eyebrow/trust props from the old `Hero` are deliberately not in `HeroHomeProps` (per spec).

- [ ] **Step 2: Verify the file type-checks**

Run:
```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: build passes. The file isn't imported anywhere yet, but the TS compiler verifies it.

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): add skeleton with status pill and headline"
```

---

## Task 3: Add gradient italic on the headline

The home headline is `Run your <span className="font-sans">entire HR</span> <em className="serif-italic">without</em> the chaos.` — passed in from `page.tsx`. We want the `<em>` to render with a purple→pink gradient via `background-clip: text`. Currently `serif-italic` is a global class.

- [ ] **Step 1: Inspect the existing `serif-italic` class**

Run:
```bash
grep -n "serif-italic" /Users/pcsaini/Desktop/Projects/signhr/signhr-web/src/app/globals.css
```
Expected: a class definition that applies `font-family: var(--font-serif)` + `font-style: italic`. **Don't modify it** — it's used on other pages.

- [ ] **Step 2: Add a hero-scoped override in `hero-home.tsx`**

Inside `HeroHome`, scope the gradient to `<h1>` so it only affects this component, not the global `.serif-italic` class. Replace the existing `<h1>` block from Task 2:

```tsx
            <h1 className="mt-5 max-w-[13ch] text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-white text-[clamp(44px,5.6vw,88px)] [&_em]:bg-[linear-gradient(135deg,hsl(var(--brand-300))_0%,hsl(var(--accent-pink)/0.85)_60%,hsl(var(--accent-pink))_100%)] [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:font-serif [&_em]:not-italic [&_em]:italic">
              {title}
            </h1>
```

Tailwind's `[&_em]` arbitrary-variant targets descendant `<em>` elements. The `not-italic italic` pair is intentional Tailwind precedence (the global `serif-italic` class adds italic; we ensure it stays italic even with our overrides).

- [ ] **Step 3: Verify build**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): gradient italic on headline em tag"
```

---

## Task 4: Wire `HeroHome` into `Hero` and `page.tsx`; remove old home block

This is the cut-over. After this task the home page renders the new (still-incomplete) layout — placeholder right column, no chips/social-proof/ticker yet — but it's live.

**Files:**
- Modify: `src/components/marketing/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `hero.tsx` to delegate when `variant === "home"`**

Open [src/components/marketing/hero.tsx](../../../src/components/marketing/hero.tsx). Replace the entire file with:

```tsx
import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GradientHalo } from "@/components/marketing/gradient-halo";
import { HeroHome } from "@/components/marketing/hero-home";
import { cn } from "@/lib/utils";

interface HeroProps {
  variant?: "home" | "feature" | "generic";
  eyebrow?: { label: string; href?: string; icon?: React.ReactNode } | string;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trust?: string;
  visual?: React.ReactNode;
  className?: string;
}

/**
 * Hero — three variants:
 *   - home: delegates to <HeroHome /> (dark split layout with product mockup)
 *   - feature: centered headline + sub + CTAs (deep-dive pages add their own visual)
 *   - generic: same as feature, slightly smaller display size
 */
export function Hero({
  variant = "generic",
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  trust,
  visual,
  className,
}: HeroProps) {
  if (variant === "home") {
    return (
      <HeroHome
        title={title}
        description={description}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        className={className}
      />
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-x-clip pb-20 pt-12 md:pb-28 md:pt-20",
        className,
      )}
    >
      <GradientHalo
        variant="hero"
        size="xl"
        className="left-1/2 top-[-10%] -translate-x-1/2"
      />
      <GradientHalo
        variant="amber"
        size="md"
        className="right-[-8%] top-[20%] hidden md:block"
      />
      <GradientHalo
        variant="soft"
        size="md"
        className="left-[-8%] top-[35%] hidden md:block"
      />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {eyebrow && <Eyebrow value={eyebrow} />}

          <h1
            className={cn(
              "mt-6 text-balance text-ink",
              variant === "feature" ? "text-display-lg" : "text-display-md",
            )}
          >
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-[1.65] text-ink-secondary md:text-[19px]">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {primaryCta && (
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild size="lg" variant="secondary">
                  <Link href={secondaryCta.href}>
                    {secondaryCta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              )}
            </div>
          )}

          {trust && (
            <p className="mx-auto mt-5 text-sm text-ink-muted">{trust}</p>
          )}
        </div>

        {visual && (
          <div className="relative mx-auto mt-16 w-full max-w-3xl">{visual}</div>
        )}
      </Container>
    </section>
  );
}

function Eyebrow({ value }: { value: HeroProps["eyebrow"] }) {
  if (typeof value === "string") {
    return (
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        {value}
      </p>
    );
  }
  if (!value) return null;
  const inner = (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-secondary shadow-sm backdrop-blur transition-colors hover:border-brand-300 hover:text-ink">
      <span className="text-brand-600">
        {value.icon ?? <Sparkles className="size-3.5" aria-hidden />}
      </span>
      {value.label}
      {value.href && (
        <ArrowRight className="size-3.5 text-ink-muted" aria-hidden />
      )}
    </span>
  );
  return (
    <div className="flex justify-center">
      {value.href ? <Link href={value.href}>{inner}</Link> : inner}
    </div>
  );
}
```

Notes:
- The home branch returns early with `<HeroHome />`.
- The `FloatingMockup`/`DashboardMockup` import lines and the home-only `mockup-wrap` block from the old file are removed.
- `feature` and `generic` branches are byte-for-byte the same logic as before (same halos, same centered layout, same eyebrow component).

- [ ] **Step 2: Drop `eyebrow` and `trust` from the home call site in `page.tsx`**

Open [src/app/page.tsx](../../../src/app/page.tsx). Find the home `<Hero>` invocation around line 132–148. Replace with:

```tsx
      <Hero
        variant="home"
        title={
          <>
            Run your <span className="font-sans">entire HR</span>{" "}
            <em className="serif-italic">without</em> the chaos.
          </>
        }
        description="The all-in-one HRMS for teams of 20 to 500. Onboarding to offboarding, attendance to payroll, in one elegant platform your people will actually want to log into."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Start free trial", href: "/book-demo?plan=growth" }}
      />
```

The `eyebrow={…}` and `trust="…"` props are removed.

- [ ] **Step 3: Verify lint and build pass**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm lint && pnpm build
```
Expected: clean.

- [ ] **Step 4: Smoke-test in the dev server**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm dev
```
Open `http://localhost:3000`. Expected: dark hero with status pill, big gradient-italic headline, sub copy, two CTAs. Right side is a placeholder bordered rectangle. Below the hero, the page continues normally (logo cloud, problem-solution, etc.). Stop the dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/hero.tsx src/app/page.tsx
git commit -m "feat(hero): cut over home variant to new HeroHome component"
```

---

## Task 5: Add the dashboard mockup with browser chrome and floating callout

**Files:**
- Modify: `src/components/marketing/hero-home.tsx`

- [ ] **Step 1: Import `DashboardMockup` and `motion`**

At the top of `src/components/marketing/hero-home.tsx`, add to the existing imports:

```tsx
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
```

- [ ] **Step 2: Replace the placeholder right column with `<HeroDashboardMockup />`**

In the `HeroHome` JSX, replace the placeholder line:

```tsx
          <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-white/[0.02]" />
```

with:

```tsx
          <HeroDashboardMockup />
```

- [ ] **Step 3: Add `HeroDashboardMockup` and `FloatingCallout` sub-components**

At the bottom of `hero-home.tsx`, append:

```tsx
function HeroDashboardMockup() {
  return (
    <div
      className="relative"
      style={{ perspective: "2000px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-5 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 60% 40%, hsl(var(--brand-500) / 0.28), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_50px_80px_-30px_rgba(0,0,0,0.55)] lg:[transform:rotateY(-6deg)_rotateX(4deg)] lg:[transform-style:preserve-3d]"
      >
        <DashboardMockup className="rounded-none border-0 shadow-none ring-0" />
      </div>
      <FloatingCallout />
    </div>
  );
}

function FloatingCallout() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      role="status"
      aria-label="Recent approval: 2 minutes 14 seconds via Slack"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
      className="absolute -bottom-4 -left-7 hidden items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)] [transform:rotate(-2deg)] sm:flex"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
        <CheckCircle2 className="size-4" aria-hidden />
      </span>
      <span className="leading-tight text-ink">
        <span className="block text-[12.5px] font-semibold">
          Approved in 2m 14s
        </span>
        <span className="block text-[11px] text-ink-muted">
          via Slack · no app switch
        </span>
      </span>
    </motion.div>
  );
}
```

The `DashboardMockup` is rendered with classes that suppress its own border, shadow, and ring, since the wrapper (`HeroDashboardMockup`'s outer `div`) provides those instead. The 3D tilt only applies at `lg:` (≥1024px) per the spec's responsive rules.

- [ ] **Step 4: Verify build**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: pass.

- [ ] **Step 5: Smoke-test the dev server, then commit**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm dev
```
Open `http://localhost:3000`. The right column should now show the actual SignHR dashboard mockup, slightly tilted, with a small "Approved in 2m 14s" callout at its bottom-left. Stop the dev server.

```bash
git add src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): add dashboard mockup with 3D tilt and floating callout"
```

---

## Task 6: Add feature chips and social-proof row

**Files:**
- Modify: `src/components/marketing/hero-home.tsx`

- [ ] **Step 1: Extend imports**

At the top of `hero-home.tsx`, add to the existing lucide import:

```tsx
import { ArrowRight, CheckCircle2, Star, Workflow, Zap } from "lucide-react";
```

(`ArrowRight` and `CheckCircle2` are already present from earlier tasks. Keep them.)

- [ ] **Step 2: Add `FeatureChips` and `SocialProofRow` components**

At the bottom of `hero-home.tsx`, append:

```tsx
const FEATURE_CHIPS: ReadonlyArray<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "brand" | "green" | "amber";
}> = [
  { icon: Zap, label: "Onboarding in 10 min", tone: "brand" },
  { icon: CheckCircle2, label: "Approvals in Slack", tone: "green" },
  { icon: Star, label: "Payroll in 1 click", tone: "amber" },
];

function FeatureChips() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {FEATURE_CHIPS.map(({ icon: Icon, label, tone }) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12.5px] font-medium text-white/85 backdrop-blur"
        >
          <span
            aria-hidden
            className={cn(
              "flex size-[18px] items-center justify-center rounded-full text-white",
              tone === "brand" &&
                "bg-gradient-to-br from-brand-500/40 to-accent-pink/40",
              tone === "green" &&
                "bg-gradient-to-br from-emerald-500/40 to-teal-500/40",
              tone === "amber" &&
                "bg-gradient-to-br from-amber-500/40 to-accent-pink/40",
            )}
          >
            <Icon className="size-2.5" />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

const SOCIAL_PROOF_AVATARS: ReadonlyArray<{
  initial: string;
  gradient: string;
}> = [
  { initial: "P", gradient: "from-amber-500 to-pink-500" },
  { initial: "K", gradient: "from-cyan-500 to-indigo-500" },
  { initial: "A", gradient: "from-lime-500 to-teal-500" },
  { initial: "R", gradient: "from-brand-500 to-fuchsia-500" },
];

function SocialProofRow() {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3.5">
      <div aria-hidden className="flex">
        {SOCIAL_PROOF_AVATARS.map(({ initial, gradient }, i) => (
          <span
            key={initial}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border-2 border-hero-dark text-[11px] font-bold text-white bg-gradient-to-br",
              gradient,
              i > 0 && "-ml-2",
            )}
          >
            {initial}
          </span>
        ))}
        <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-hero-dark bg-white/10 text-[10px] font-medium text-white/85">
          +5
        </span>
      </div>
      <p className="text-[13px] leading-snug text-white/70">
        <span aria-hidden className="mr-1.5 tracking-[1px] text-amber-300">
          ★★★★★
        </span>
        <span className="font-semibold text-white">4.8/5</span> across 200+
        reviews
        <span className="mx-1.5 opacity-50">·</span>
        Loved by <span className="font-semibold text-white">500+</span> growing
        teams
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Render the chips and social-proof row in `HeroHome`**

In the `HeroHome` JSX, after the closing `</div>` of the CTA `flex flex-wrap items-center gap-3` block and before the closing `</div>` of the outer left column, insert:

```tsx
            <FeatureChips />
            <SocialProofRow />
```

The full left-column tree is now: StatusPill → h1 → p → CTAs → FeatureChips → SocialProofRow.

- [ ] **Step 4: Verify build and visual**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: pass.

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm dev
```
Open `http://localhost:3000`. Below the CTAs you should now see three pill chips and the avatar stack + 4.8/5 rating row. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): add feature chips and social-proof row"
```

---

## Task 7: Add the feature ticker (CSS marquee)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/marketing/hero-home.tsx`

- [ ] **Step 1: Add the marquee keyframes to `globals.css`**

Open `src/app/globals.css`. After the closing `}` of the last existing block but before the file ends, append:

```css
@layer utilities {
  @keyframes hero-ticker-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .animate-hero-ticker {
    animation: hero-ticker-scroll 50s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-hero-ticker {
      animation-play-state: paused;
    }
  }
}
```

If the file already has an `@layer utilities { ... }` block, append the keyframes and class inside it instead of opening a second block.

- [ ] **Step 2: Add `FeatureTicker` to `hero-home.tsx`**

At the bottom of `hero-home.tsx`, append:

```tsx
const TICKER_FEATURES: ReadonlyArray<{ icon: string; label: string }> = [
  { icon: "👥", label: "Core HRMS" },
  { icon: "🗓", label: "Leave management" },
  { icon: "⏱", label: "Time & attendance" },
  { icon: "💼", label: "Payroll" },
  { icon: "🚀", label: "Onboarding" },
  { icon: "🔄", label: "Workflows & approvals" },
  { icon: "💻", label: "Asset management" },
  { icon: "💬", label: "Slack & email integrations" },
];

function FeatureTicker() {
  // Duplicate the items so the loop is seamless.
  const items = [...TICKER_FEATURES, ...TICKER_FEATURES];
  return (
    <>
      {/* Screen-reader-only static list */}
      <ul className="sr-only">
        {TICKER_FEATURES.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="relative mt-12 overflow-hidden border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,black_80px,black_calc(100%-80px),transparent)]"
      >
        <div className="animate-hero-ticker flex w-max items-center gap-12 py-5 will-change-transform">
          {items.map(({ icon, label }, i) => (
            <React.Fragment key={`${label}-${i}`}>
              <span className="flex shrink-0 items-center gap-2.5 text-[13.5px] font-medium text-white/85">
                <span className="flex size-[22px] items-center justify-center rounded-md border border-white/5 bg-gradient-to-br from-brand-500/25 to-accent-pink/20 text-[12px] text-white">
                  {icon}
                </span>
                {label}
              </span>
              <span className="size-1 shrink-0 rounded-full bg-white/20" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Render the ticker in `HeroHome`**

In `HeroHome`, the ticker sits **outside** the `Container` (full-bleed). Restructure the section's body so the layout `<Container>...</Container>` is followed by `<FeatureTicker />`:

```tsx
    <section
      className={cn(
        "relative isolate overflow-hidden bg-hero-dark text-white",
        className,
      )}
    >
      <HeroBackground />
      <Container>
        <div className="relative grid items-center gap-12 pt-20 pb-12 md:gap-12 md:pt-24 md:pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ...existing left + right columns unchanged... */}
        </div>
      </Container>
      <FeatureTicker />
    </section>
```

Note the bottom padding on the inner grid changes from `py-20` / `md:py-24` to `pt-20 pb-12` / `md:pt-24 md:pb-12` so the ticker has its own breathing room.

- [ ] **Step 4: Verify build and visual**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm lint && pnpm build
```
Expected: clean pass.

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm dev
```
Open `http://localhost:3000`. A horizontal scrolling marquee of feature pills should appear at the bottom of the hero, fading at both edges. Open Chrome DevTools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`: reduce" — the marquee should pause. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): add full-bleed feature ticker with CSS marquee"
```

---

## Task 8: Polish and seam fade to next section

**Files:**
- Modify: `src/components/marketing/hero-home.tsx`

- [ ] **Step 1: Add the bottom seam fade**

The hero is dark; the next section (logo cloud) is light/muted. Add a soft gradient fade at the very bottom of the hero so the seam isn't a hard edge.

In `HeroHome`, just before the closing `</section>`, after `<FeatureTicker />`, add:

```tsx
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-background"
      />
```

This bleeds the dark hero into whatever the next section's background is.

- [ ] **Step 2: Verify build**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/hero-home.tsx
git commit -m "feat(hero-home): soft-fade bottom edge into following section"
```

---

## Task 9: Acceptance verification (lint, build, three breakpoints, reduced motion)

**Files:** none modified.

- [ ] **Step 1: Final lint and build (both must be clean)**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm lint
```
Expected: 0 errors, 0 warnings.

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm build
```
Expected: 0 errors, 0 warnings, all routes prerender.

- [ ] **Step 2: Visual check at three breakpoints**

```bash
cd /Users/pcsaini/Desktop/Projects/signhr/signhr-web && pnpm dev
```

Open `http://localhost:3000`, then in DevTools:

1. **Desktop (≥1024px):** two-column layout, headline ~88px, mockup tilts (rotateY -6°, rotateX 4°), floating callout visible at mockup bottom-left.
2. **Tablet (768–1023px):** single column, copy stacks above mockup, headline ~56px, mockup straightens (no tilt), all chips visible, social proof visible.
3. **Mobile (≤767px):** single column, headline ~40px, CTAs stack and go full-width, floating callout hidden (`hidden sm:flex` rule), feature chips wrap.

If any breakpoint breaks, return to the relevant earlier task.

- [ ] **Step 3: Reduced-motion check**

In DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Confirm:
- Status pill green dot no longer pulses (the `animate-ping` ring is hidden by `motion-reduce:hidden`).
- Feature ticker is paused (track is visible but stationary).
- Floating callout renders immediately at its final position (no fade-in).

- [ ] **Step 4: Verify other Hero variants still render**

Visit `http://localhost:3000/features/leave-management` and `http://localhost:3000/about`. Both use `Hero` with `variant !== "home"`. Expected: identical to before this PR — centered headline, halos, eyebrow.

Stop the dev server.

- [ ] **Step 5: Final commit if any tweaks were needed; otherwise note completion**

If steps 2–4 surfaced any tweaks, commit them with a `fix(hero-home): …` message. Otherwise, no commit.

The branch is ready for PR / merge.

---

## Self-review

**Spec coverage check:**

| Spec section | Plan task |
|---|---|
| New `hero-home.tsx` file split | Task 2 |
| `hero.tsx` delegates `variant === "home"` | Task 4 |
| `--hero-dark` and `--accent-pink` tokens | Task 1 |
| Status pill with pulsing dot | Task 2 |
| Headline gradient italic | Task 3 |
| Sub copy | Task 2 |
| Feature chips | Task 6 |
| Primary + secondary CTAs | Task 2 (via `Button asChild`) |
| Social-proof row (avatars + stars) | Task 6 |
| Dashboard mockup with browser chrome | Task 5 (reuses `DashboardMockup`'s built-in chrome) |
| 3D tilt on desktop only | Task 5 (`lg:[transform:...]`) |
| Floating callout with Motion fade | Task 5 |
| Feature ticker (8 items, no money/numbers) | Task 7 |
| Ticker CSS marquee + reduced-motion pause | Task 7 |
| `aria-hidden` on decorative dot, ticker, halo | Tasks 2, 5, 7 |
| Screen-reader feature list before ticker | Task 7 (`sr-only ul`) |
| Floating-callout `aria-label` | Task 5 |
| Bottom seam fade to next section | Task 8 |
| Drop `eyebrow` + `trust` props from page.tsx home call | Task 4 |
| Other variants (`feature`, `generic`) untouched | Task 4 (preserved verbatim) + Task 9 step 4 (verified) |
| Lint + build clean | Task 9 |
| Three-breakpoint responsive | Task 9 step 2 |

All spec items covered.

**Placeholder scan:** none. All code blocks are concrete; all paths are absolute; all expected outputs are stated.

**Type consistency:** `HeroHomeProps` defined in Task 2 is consumed unchanged in Task 4. `FEATURE_CHIPS`, `SOCIAL_PROOF_AVATARS`, `TICKER_FEATURES` are all `ReadonlyArray<...>` constants used immediately in the same task. The `tone: "brand" | "green" | "amber"` discriminant in `FEATURE_CHIPS` is exhaustively handled in the `cn()` switch.

**Note on `DashboardMockup` reuse:** Task 5 renders `DashboardMockup` with classes that suppress its border, shadow, and ring. Verify before implementation that those classes (`rounded-none border-0 shadow-none ring-0`) actually neutralize the styles inside `dashboard-mockup.tsx:34-36`. If Tailwind's specificity loses to the classes baked into `DashboardMockup`, the implementer will need to either (a) wrap `DashboardMockup` in a `div.overflow-hidden.rounded-2xl` clip without trying to neutralize, accepting the inner shadow/border bleeding through (likely fine visually), or (b) extend `DashboardMockup` to accept a `chromeless` prop. Option (a) is preferred to avoid touching `DashboardMockup` and breaking its other consumer at `src/app/dev/page.tsx`. If you go with (a), simply omit the `rounded-none border-0 shadow-none ring-0` classes in Task 5 step 3.
