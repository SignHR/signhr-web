# About Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/about` page in `signhr-web` with a 9-section, story-led "About" page grounded in SignHR's real origin (built by SignatureTech), real mission/values, and a real 3-person leadership row — composed entirely from the existing design system.

**Architecture:** Single server-component file (`src/app/about/page.tsx`) fully rewritten. It composes existing marketing/layout components (`Hero`, `Section`, `Container`, `StatNumber`, `LogoMarquee`, `TestimonialCard`, `CTABand`, `Badge`) plus inline data arrays and small inline card markup. No new shared components, no new tokens, no other files touched.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript (strict), Tailwind CSS v4, lucide-react v1, Motion (via existing client components).

**Spec:** `docs/superpowers/specs/2026-06-05-about-page-redesign-design.md`

---

## Conventions for this plan (read first)

**Verification model — NOT unit-test TDD.** `signhr-web` has no test runner (its only scripts are `dev`/`build`/`lint`/`start`), and a static marketing page does not warrant introducing one (YAGNI). Per `CLAUDE.md`/`DESIGN.md`, the established verification for UI work is:
- `pnpm lint` → clean
- `pnpm build` → 0 errors / 0 warnings
- visual check at **375 / 768 / 1024 / 1440**

These are the "tests" for every task below.

**No commits.** Per the repo's `CLAUDE.md` ("Never `git commit` until explicitly asked"), **no task commits**. The final task stages changes with `git add` only; the human commits later. If executed by subagents, the subagent stages with `git add` and the controller waits for the user.

**Auto-run:** if `pnpm dev` shows a compile error after an edit, restart it (`CLAUDE.md` rule). No config files change here, so no forced restarts are expected.

---

## File structure

- **Modify (full rewrite):** `src/app/about/page.tsx` — the entire `/about` route. One file, one responsibility (render the About page). This is the only file changed.
- **Read-only references** (already verified — do not modify):
  - `src/components/marketing/hero.tsx` — `Hero` renders the dark canvas + `primaryCta`/`secondaryCta`; styles its own `<em>` (serif + gradient).
  - `src/components/marketing/cta-band.tsx` — `CTABand`; `primaryCta` to `/book-demo` auto-opens the demo modal.
  - `src/components/layout/section.tsx` — `surface="ink"` ⇒ `bg-ink text-white`; `surface="muted"` ⇒ `bg-muted/40`.
  - `src/components/marketing/stat-number.tsx` — `StatNumber({ value, suffix, label, decimals })`, count-up.
  - `src/lib/testimonials.ts` — `LOGO_NAMES`, `TESTIMONIALS` (placeholder data reused for the Proof section).
  - `src/lib/nav.ts` — `FOOTER_NAV.company` "Careers" → `/about#careers` (the anchor this page must preserve).

---

## Task 1: Rewrite `src/app/about/page.tsx`

**Files:**
- Modify (replace entire file): `src/app/about/page.tsx`

- [ ] **Step 1: Replace the file with the complete implementation below**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  ScrollText,
  KeyRound,
  DatabaseBackup,
  Sparkles,
  Heart,
  Users,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { StatNumber } from "@/components/marketing/stat-number";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CTABand } from "@/components/marketing/cta-band";
import { Badge } from "@/components/ui/badge";
import { LOGO_NAMES, TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "SignHR is the all-in-one HR platform for growing teams — built by SignatureTech after years of watching companies fight disconnected HR tools.",
  alternates: { canonical: "/about" },
};

const LEADERS = [
  {
    name: "Sonu Kumar Sony",
    role: "Founder & CEO",
    initials: "SS",
    grad: "from-violet-300 to-indigo-400",
  },
  {
    name: "Prem Chand Saini",
    role: "CTO · Head of Engineering",
    initials: "PS",
    grad: "from-amber-300 to-rose-400",
  },
  {
    name: "Vidhupriya Agarwal",
    role: "Head of Marketing",
    initials: "VA",
    grad: "from-teal-300 to-emerald-400",
  },
];

const ABOUT_STATS = [
  { value: 1, suffix: " day", label: "average setup, not a quarter" },
  { value: 5, suffix: "+", label: "disconnected tools, replaced" },
  { value: 3, suffix: " months", label: "free, no card" },
  { value: 2, suffix: " weeks", label: "between releases" },
];

const TRUST: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Lock,
    title: "Encrypted end to end",
    body: "In transit and at rest.",
  },
  {
    icon: ScrollText,
    title: "Full audit logs",
    body: "Every action — who did it, and when.",
  },
  {
    icon: KeyRound,
    title: "Role-based access & SSO",
    body: "People see only what they should.",
  },
  {
    icon: DatabaseBackup,
    title: "Daily encrypted backups",
    body: "Your data is never one mistake from gone.",
  },
];

const VALUES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Sparkles,
    title: "Ship in plain English",
    body: "Our changelog reads like a friend telling you what's new. No “leveraging synergies.” Just what shipped, and why.",
  },
  {
    icon: Heart,
    title: "Respect the day-job",
    body: "Every workflow has to make Monday calmer. If it adds clicks, it doesn't ship. If it adds anxiety, it gets redesigned.",
  },
  {
    icon: Users,
    title: "Customers over investors",
    body: "We take long calls with HR leads at companies we'll never sell to. The product gets better because we listen to the people who use it.",
  },
  {
    icon: Laptop,
    title: "We run on it too",
    body: "SignatureTech runs its own HR on SignHR. We feel every rough edge before you do.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1 · Hero */}
      <Hero
        eyebrow="OUR STORY"
        title={
          <>
            Growing the team is the fun part.{" "}
            <em>Running HR for it</em> shouldn&apos;t be the hard part.
          </>
        }
        description="SignHR is the all-in-one HR platform for Indian teams of 20 to 500 — onboarding, attendance, leave and payroll-ready, in one calm place. We built it at SignatureTech after watching client after client fight a pile of disconnected tools."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See the platform", href: "/features" }}
      />

      {/* 2 · Origin */}
      <Section pad="standard">
        <Container size="md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Where we came from
          </p>
          <h2 className="text-display-sm mt-3 text-ink">
            We didn&apos;t set out to build an HR product.
          </h2>
          <div className="prose prose-signhr mt-6 max-w-none text-[18px] leading-[1.75] text-ink-secondary">
            <p>
              For years, SignatureTech built software for growing companies — and
              almost every one had the same mess behind the scenes. A
              &quot;master&quot; spreadsheet that disagreed with payroll. Leave
              requests buried in email threads. Three different tools for
              onboarding, attendance, and time off that never spoke to each
              other. One audit that listed people who&apos;d left months ago as
              still active.
            </p>
            <p>
              We kept getting pulled in to patch it — a leave tracker here, an
              onboarding flow there, a script to reconcile headcount before the
              auditors showed up. After the fifth or sixth time rebuilding the
              same fixes, the pattern was impossible to ignore: teams between 20
              and 500 had outgrown spreadsheets but couldn&apos;t justify a
              six-figure enterprise suite. Nothing in the middle actually fit.
            </p>
            <p>
              So we stopped patching and started building. SignHR is the platform
              we kept wishing our clients already had — one place for the whole
              employee journey, from offer letter to final settlement, that an HR
              team of one or two can actually run.
            </p>
            <p>
              We still answer our own support emails. We still ship every couple
              of weeks. And we still measure every release by one question:{" "}
              <em>did Monday get calmer?</em>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-indigo-400 text-sm font-semibold text-white">
              SS
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">
                Sonu Kumar Sony
              </p>
              <p className="text-[13px] text-ink-muted">Founder &amp; CEO</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 · Mission */}
      <Section pad="standard" surface="ink">
        <Container size="md">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">
              Our mission
            </p>
            <h2 className="text-display-md mx-auto mt-5 max-w-[24ch] text-balance text-white [&_em]:font-serif [&_em]:italic [&_em]:text-brand-300">
              Make running HR feel <em>calm</em> — for every growing team, not
              just the ones who can afford an enterprise suite.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
              Spreadsheets break around 20 people. The big enterprise suites
              don&apos;t make sense until you&apos;re thousands. We exist for
              everyone in between — teams doing real HR with two people and no
              time to waste.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4 · Leadership */}
      <Section pad="standard">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                The people behind it
              </p>
              <h2 className="text-display-sm mt-3 text-ink">
                A small team that answers its own email.
              </h2>
            </div>
            <Badge variant="outline">SignatureTech</Badge>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERS.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-start rounded-2xl border border-border bg-card p-6"
              >
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white",
                    m.grad,
                  )}
                >
                  {m.initials}
                </div>
                <p className="mt-4 text-[15px] font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-[13px] text-ink-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5 · Stats */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <StatNumber
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={0}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 6 · Proof */}
      <Section pad="compact">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            In good company
          </p>
          <div className="mt-8">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <TestimonialCard size="lg" testimonial={TESTIMONIALS[0]} />
          </div>
        </Container>
      </Section>

      {/* 7 · Trust & security */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Security
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Security isn&apos;t a separate SKU.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              You&apos;re trusting us with your team&apos;s most sensitive data.
              We treat it the way we&apos;d want ours treated — and none of it
              costs extra.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <t.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8 · Values */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              How we operate
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Four <em className="serif-italic">values</em> that show up in every
              release.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-5 rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9 · Closing CTA + careers anchor (footer /about#careers links here) */}
      <div id="careers">
        <CTABand
          variant="gradient"
          title={
            <>
              See SignHR on <em className="serif-italic">your own</em>{" "}
              team&apos;s data.
            </>
          }
          body="A 20-minute demo, or start free for three months — no card, no pressure."
          primaryCta={{ label: "Book a demo", href: "/book-demo" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
        <Container>
          <p className="mx-auto -mt-12 max-w-xl pb-20 text-center text-[14px] text-ink-muted md:-mt-16 md:pb-28">
            We&apos;re a small team, and we&apos;re hiring —{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-600 underline-offset-4 hover:underline"
            >
              get in touch
            </Link>
            .
          </p>
        </Container>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Lint**

Run: `cd signhr-web && pnpm lint`
Expected: no errors, no warnings.
If it flags an unused import, remove that import. (All imports above are used: `Badge` in Leadership, `Link` in the careers line, every icon in `TRUST`/`VALUES`.)

- [ ] **Step 3: Build (type-check + production build)**

Run: `cd signhr-web && pnpm build`
Expected: compiles, 0 errors / 0 warnings; `/about` listed as a static route.
**If the build errors on an unknown icon import**, that name isn't exported in lucide-react v1 — replace it with the nearest equivalent and re-run: `Lock`→`Shield`, `ScrollText`→`FileText`, `KeyRound`→`Key`, `DatabaseBackup`→`Database`. (Update both the `import` line and the `TRUST` array.)

---

## Task 2: Visual & responsive verification

**Files:** none (inspection only).

- [ ] **Step 1: Start the dev server**

Run: `cd signhr-web && pnpm dev` → open `http://localhost:3000/about`.

- [ ] **Step 2: Verify all 9 sections render in order with the right copy**

Top → bottom: (1) dark Hero with eyebrow "OUR STORY", gradient `em` on "Running HR for it", two CTAs; (2) Origin prose ending "did Monday get calmer?" + Sonu's signature; (3) **dark** Mission band, "calm" in brand serif italic; (4) Leadership — 3 cards (Sonu / Prem / Vidhupriya) with gradient-initial avatars + "SignatureTech" badge; (5) Stats — 1 day / 5+ / 3 months / 2 weeks (count-up on scroll); (6) Proof — logo marquee + one testimonial; (7) Trust — 4 icon cards on muted bg; (8) Values — 4 cards; (9) gradient CTA band + "we're hiring → get in touch" line.

- [ ] **Step 3: Check breakpoints 375 / 768 / 1024 / 1440**

- 375: Leadership stacks 1-col; Stats 2-col; Trust 1-col; Values 1-col; no horizontal scroll; Hero headline doesn't overflow.
- 768: Leadership 2-col; Stats 4-col; Trust 2-col; Values 2-col.
- 1024 / 1440: Leadership 3-col; Trust 4-col; content centered within `max-w` containers.
- **Tune the careers line spacing** (the `-mt-12 / -mt-16` pull): it should read as a quiet aside attached to the CTA block, not floating. Adjust the negative margin if it overlaps or gaps oddly at any width.

- [ ] **Step 4: Reduced motion**

In the browser, enable "Reduce motion" (or emulate it in devtools) and reload `/about`. Expected: the Stats show final values immediately (no count-up) and the logo marquee is static — no errors.

---

## Task 3: Cross-cutting checks + stage (no commit)

**Files:** stage `src/app/about/page.tsx`.

- [ ] **Step 1: Footer `#careers` anchor resolves**

From `/about`, click the footer's **Careers** link (it points to `/about#careers`). Expected: the page scrolls to the closing CTA block (the `<div id="careers">`). This is the only consumer of that anchor (`FOOTER_NAV.company` in `src/lib/nav.ts`).

- [ ] **Step 2: Banned-words check**

Run: `cd signhr-web && grep -niE "synergy|leverage|seamless|robust|holistic|empower|unlock" src/app/about/page.tsx`
Expected: **no matches** (the word "synergies" appears only inside curly quotes as an example of what NOT to say — confirm that single line is the deliberate `“leveraging synergies”` value and nothing else matches).
Note: that line contains "leveraging synergies" intentionally as a banned-phrase joke. If grep flags it, confirm it is that exact line and leave it; fix any other match.

- [ ] **Step 3: Final lint + build**

Run: `cd signhr-web && pnpm lint && pnpm build`
Expected: lint clean; build 0 errors / 0 warnings.

- [ ] **Step 4: Stage the change (DO NOT COMMIT)**

Run: `cd signhr-web && git add src/app/about/page.tsx`
Then **stop**. Per `CLAUDE.md`, the human reviews and commits. Do not run `git commit` or `git push`.

---

## Self-review

**1. Spec coverage** — every spec section maps to code in Task 1:
- §6.1 Hero ✓ · §6.2 Origin + signature ✓ · §6.3 Mission (ink) ✓ · §6.4 Leadership (3 real) ✓ · §6.5 Stats (1/5+/3/2) ✓ · §6.6 Proof (marquee + quote) ✓ · §6.7 Trust (4 items) ✓ · §6.8 Values (4) ✓ · §6.9 CTA + careers `id` ✓
- Metadata (§7) ✓ · banned-words gate (§8) → Task 3 Step 2 ✓ · `id="careers"` (acceptance) → Task 3 Step 1 ✓ · responsive (§10) → Task 2 Step 3 ✓ · reduced motion (§10) → Task 2 Step 4 ✓
- Removed content (INVESTORS, 8-person team, fictional origin): the full-file replace in Task 1 deletes all of it ✓

**2. Placeholder scan** — no "TBD"/"TODO" in the plan; the only placeholders are the *content* placeholders the spec intends (LOGO_NAMES/TESTIMONIALS in Proof), which are real, imported values rendering real components.

**3. Type consistency** — `LEADERS`/`ABOUT_STATS`/`TRUST`/`VALUES` shapes match their `.map()` usage; `StatNumber` props (`value`/`suffix`/`label`/`decimals`) match `stat-number.tsx`; `CTABand`/`Hero` prop objects (`{ label, href }`) match their interfaces; `TestimonialCard`/`LogoMarquee` usage matches the home page's working usage.

**4. Out of scope confirmed** — no new components, no token changes, no other files; placeholders/claims-to-verify (real logos, traction stats, security cert, headshots) are left for the human per spec §9.

---

## Execution handoff

Plan complete. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent for Task 1, review the diff, then Tasks 2–3. Subagent stages with `git add` only; I wait for you before any commit.
2. **Inline Execution** — I execute the tasks in this session with a checkpoint after Task 1's build passes.

Either way: **no commit happens without your explicit go-ahead.**
