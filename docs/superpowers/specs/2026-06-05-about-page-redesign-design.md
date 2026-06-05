# About Page Redesign — Design Spec

- **Date:** 2026-06-05
- **Project:** `signhr-web` (SignHR marketing site)
- **Route:** `/about` — full rewrite of `src/app/about/page.tsx`
- **Status:** Approved design, ready for implementation planning
- **Owner:** Sonu Kumar Sony (Founder & CEO), Prem Chand Saini (CTO)

---

## 1. Context & problem

`signhr-web` is the public marketing site for SignHR, an all-in-one HRMS for Indian teams of 20–500. The site's job is to convert qualified visitors into demo bookings and trial signups.

The current `/about` page (`src/app/about/page.tsx`) is built on **fictional placeholder content** — invented co-founders (Vikram Joshi, Ria Banerjee), a fabricated fintech origin story, an 8-person invented team, and stock VC investor logos (Sequoia, Accel, Lightspeed…). It is internally well-built but its narrative is not true and does not reflect the real company.

We are replacing it entirely with a new structure and new content.

## 2. Goals / Non-goals

**Goals**
- Tell SignHR's **real** origin: a product built by **SignatureTech**, an IT-services firm, after repeatedly watching clients drown in HR spreadsheets and disconnected tools.
- Build trust for demo conversion (the page's primary job) using an honest credibility stack.
- Read as a native part of the site — reuse the existing design system and voice; introduce **no new visual language**.
- Be honest *today* while leaving clean slots to swap in real traction/photos later.

**Non-goals**
- No new brand/visual system, no new fonts/tokens.
- No standalone `/careers` page (careers is a single closing CTA line linking to `/contact`).
- No invented traction numbers, customer names, or investor logos presented as fact.
- No dark-mode work (site-wide out of scope per README).

## 3. Content basis (decided)

**Hybrid.** The *real* assets lead the page and carry it: **origin story, mission, values, and a 3-person leadership row**. *Placeholder-but-light* assets (customer logos, one testimonial) stay low on the page and are explicitly marked for later swap. **Stats are honest/structural** (true facts about the product), not invented traction.

## 4. Research basis & key decisions

Grounded in a verified deep-research pass (2026-06-05). Verified findings:

- **StoryBrand framing (the spine):** the *customer is the hero, the brand is the guide*. The HR team buried in spreadsheets is the hero; SignHR/SignatureTech is the guide that shows up with **empathy** ("we watched you drown in this") **and authority** ("we're the engineering firm that built the fix"). Sources: storybrand.com, growsurf.com.
- **The services-firm origin is an asset, not a liability.** Agency/services→SaaS is a well-trodden, credible pattern (Basecamp, Typeform, FreshBooks, Harvest). Tell it via "scratch-your-own-itch" framing. Source: davidhart.substack.com, basecamp.com/about.
- **Origin arc:** problem → insight → pivot, in **first-person founder voice**, ~4 short paragraphs, **signed**. Open on the *customer's* pain, then reveal the SignatureTech origin as proof — not a "we proudly decided to build a product" open (the anti-pattern). Sources: shopify.com, deliberatedirections.com, magnt.com.
- **Trust stack matters for HR software** (holds employee PII): elevate a security/compliance block alongside stats and logos. Source: webstacks.com.

**Honest caveat (recorded):** the HRMS-specific competitor survey (Rippling, Deel, Darwinbox, Keka, greytHR, Zoho People…) did **not** survive verification — those pages weren't reliably fetched. This blueprint rests on general best-in-class B2B-SaaS About-page craft, which is robust but not HR-vertical-proven. Two questions the research left open were resolved by product decision (below).

**Decisions:**
1. **Structure:** "The Guide" (story-led, conversion-tuned) — chosen over proof-first and recruit-led because it leads with our real assets and keeps placeholder proof in a supporting role.
2. **Team presentation** (open in research → decided): a **small real 3-person leadership row**, not a large grid, and not omitted.
3. **Careers** (open in research → decided): **not** a section; a small secondary CTA line linking to `/contact`.
4. **Stats:** honest/structural, not invented traction.
5. **Signature:** real founder — **Sonu Kumar Sony, Founder & CEO**.

## 5. Information architecture

Nine sections, top to bottom:

1. Hero
2. Origin — "Where we came from" (first-person, signed)
3. Mission — "Why we exist"
4. Leadership — small real row (3 people)
5. Stats band — honest/structural
6. Proof — logos + one quote (placeholder, light)
7. Trust & security
8. Values — "How we operate"
9. Closing CTA

Rhythm: real narrative (1–4) → credibility (5–7) → who-we-are reinforcement (8) → action (9). Section surfaces alternate (default / ink / muted) to match the home page's cadence.

---

## 6. Section-by-section spec (final copy)

> Copy below is final. Em-dashes, curly quotes, and serif-italic accent words (`<em className="serif-italic">`) are intentional. Honor the banned-words rule (§8).

### 6.1 · Hero — `<Hero variant="generic">`
**Purpose:** center the reader (the person running HR for a growing team), name the pain, hint at the origin.

- **Eyebrow:** `OUR STORY`
- **Headline:** Growing the team is the fun part. *Running HR for it* shouldn't be the hard part.
  - Inside the Hero, wrap the accent words in a plain `<em>` — the Hero styles `em` as serif with a brand→pink gradient on its dark canvas (do **not** use the `serif-italic` utility here).
- **Description:** SignHR is the all-in-one HR platform for Indian teams of 20 to 500 — onboarding, attendance, leave and payroll-ready, in one calm place. We built it at SignatureTech after watching client after client fight a pile of disconnected tools.
- **Primary CTA:** `Book a demo` → `/book-demo`
- **Secondary CTA:** `See the platform` → `/features`
- **Verified:** the `generic` Hero variant renders `primaryCta`/`secondaryCta` as a centered button row on the dark hero canvas — no extra work needed.

### 6.2 · Origin — prose + signature  `<Section pad="standard"><Container size="md">`
**Purpose:** the emotional core. Empathy → authority → the pivot (StoryBrand "guide").

- **Eyebrow:** `WHERE WE CAME FROM`
- **Heading:** We didn't set out to build an HR product.
- **Body (4 paragraphs):**

  > For years, SignatureTech built software for growing companies — and almost every one had the same mess behind the scenes. A "master" spreadsheet that disagreed with payroll. Leave requests buried in email threads. Three different tools for onboarding, attendance, and time off that never spoke to each other. One audit that listed people who'd left months ago as still active.
  >
  > We kept getting pulled in to patch it — a leave tracker here, an onboarding flow there, a script to reconcile headcount before the auditors showed up. After the fifth or sixth time rebuilding the same fixes, the pattern was impossible to ignore: teams between 20 and 500 had outgrown spreadsheets but couldn't justify a six-figure enterprise suite. Nothing in the middle actually fit.
  >
  > So we stopped patching and started building. SignHR is the platform we kept wishing our clients already had — one place for the whole employee journey, from offer letter to final settlement, that an HR team of one or two can actually run.
  >
  > We still answer our own support emails. We still ship every couple of weeks. And we still measure every release by one question: *did Monday get calmer?*

- **Signature block:** `— Sonu Kumar Sony, Founder & CEO` (small avatar/initials optional; keep understated).
- **Layout:** `prose`-style block, `max-w-none text-[18px] leading-[1.75] text-ink-secondary`, matching the current origin treatment.

### 6.3 · Mission — `<Section pad="standard" surface="ink"><Container size="md">`
**Purpose:** lift from anecdote to durable purpose. Dark (ink) surface for emphasis.

- **Eyebrow:** `OUR MISSION`
- **Statement (large, centered):** Make running HR feel *calm* — for every growing team, not just the ones who can afford an enterprise suite.
  - (`calm` set in `serif-italic`.)
- **Support line:** Spreadsheets break around 20 people. The big enterprise suites don't make sense until you're thousands. We exist for everyone in between — teams doing real HR with two people and no time to waste.

### 6.4 · Leadership — small real row  `<Section pad="standard"><Container>`
**Purpose:** pay off the first-person story with the real, accountable humans behind it.

- **Eyebrow:** `THE PEOPLE BEHIND IT`
- **Heading:** A small team that answers its own email.
- **Cards (3), gradient-initials avatars** (no invented photos):
  | Name | Role | Initials |
  |------|------|----------|
  | Sonu Kumar Sony | Founder & CEO | SS |
  | Prem Chand Saini | CTO · Head of Engineering | PS |
  | Vidhupriya Agarwal | Head of Marketing | VA |
- **Note:** use the existing gradient-initials avatar style (consistent with the current team cards). Leave a clean slot to drop in real headshots later. Do **not** invent a head-office location string.

### 6.5 · Stats band — `<Section pad="standard" surface="muted"><Container>` grid of `<StatNumber>`
**Purpose:** proof via honest, structural facts. No invented traction. (Setup, trial, and cadence all match claims already on the home page; "tools replaced" reinforces the origin story.)

| Value | Suffix | Label |
|-------|--------|-------|
| 1 | ` day` | average setup, not a quarter |
| 5 | `+` | disconnected tools, replaced |
| 3 | ` months` | free, no card |
| 2 | ` weeks` | between releases |

- **Why not a module count:** the site is intentionally fuzzy here — the home leads with 8 module cards, `nav.ts` lists 11 live + 5 roadmap, the README said 9. A hard module number would read inconsistently, so "5+ tools replaced" is used instead — true, on-message, and stable.
- **Note:** `StatNumber(value, suffix, label, decimals=0)` count-up handles integers; pass `decimals={0}`. The `sr-only` fallback reads `{value}{suffix}`.

### 6.6 · Proof — `<Section pad="compact"><Container>`
**Purpose:** light social proof, deliberately kept small because it's placeholder.

- **Eyebrow:** `IN GOOD COMPANY`
- `<LogoMarquee names={LOGO_NAMES} />` (existing placeholder names from `lib/testimonials.ts`).
- One `<TestimonialCard testimonial={TESTIMONIALS[0]} size="lg" />`.
- **Marked placeholder** — swap for real customers + quote when available (§9).

### 6.7 · Trust & security — `<Section pad="standard" surface="muted"><Container>`
**Purpose:** de-risk a system that holds employee PII.

- **Eyebrow:** `SECURITY`
- **Heading:** Security isn't a separate SKU.
- **Sub:** You're trusting us with your team's most sensitive data. We treat it the way we'd want ours treated — and none of it costs extra.
- **Four items (icon + title + one line):**
  1. **Encrypted end to end** — in transit and at rest.
  2. **Full audit logs** — every action, who did it, when.
  3. **Role-based access & SSO** — people see only what they should.
  4. **Daily encrypted backups** — your data is never one mistake from gone.
- **Note:** every claim here must be **true before publishing** (§9). If a specific compliance certification (e.g. SOC 2) is genuinely held, add it; do not claim it otherwise. Item 4 ("daily encrypted backups") replaces an earlier "data stays in India" line, which requires verification of hosting region — re-add a data-residency item only if confirmed.

### 6.8 · Values — "How we operate"  `<Section pad="standard"><Container>`
**Purpose:** values woven and specific, not a sterile list.

- **Eyebrow:** `HOW WE OPERATE`
- **Heading:** Four *values* that show up in every release. (`values` in `serif-italic`.)
- **Cards (4):**
  1. **Ship in plain English** — Our changelog reads like a friend telling you what's new. No "leveraging synergies." Just what shipped, and why.
  2. **Respect the day-job** — Every workflow has to make Monday calmer. If it adds clicks, it doesn't ship. If it adds anxiety, it gets redesigned.
  3. **Customers over investors** — We take long calls with HR leads at companies we'll never sell to. The product gets better because we listen to the people who use it.
  4. **We run on it too** — SignatureTech runs its own HR on SignHR. We feel every rough edge before you do.

### 6.9 · Closing CTA — `<CTABand variant="gradient">` (+ careers line)
**Purpose:** one clear action; careers as a quiet aside.

- **Heading:** See SignHR on *your own* team's data. (`your own` in `serif-italic`.)
- **Body:** A 20-minute demo, or start free for three months — no card, no pressure.
- **Primary CTA:** `Book a demo` → `/book-demo` — `CTABand` auto-detects demo hrefs via `demoHref()` and opens the in-page demo modal (`DemoCta`) instead of navigating. That's the desired behavior.
- **Secondary CTA:** `See pricing` → `/pricing` (renders as a normal link button).
- **Careers line:** `CTABand` has no slot for extra text, so render the careers aside as muted, centered text **immediately below** the `<CTABand>`: "We're a small team, and we're hiring →" linking to `/contact`.
- **Anchor (required):** wrap the band + careers line in a container with `id="careers"`. The footer's "Careers" link points to `/about#careers` (`FOOTER_NAV.company` in `nav.ts`) and must still resolve.

---

## 7. Component & data mapping

**Reused components (no new shared components required):**
`Hero`, `Section`, `Container`, `Button`, `Badge`, `StatNumber`, `LogoMarquee`, `TestimonialCard`, `CTABand`.

**Inline helpers in `page.tsx`** (mirror the current file's `PerkRow` pattern): `LeaderCard`, `TrustItem`, `ValueCard`. Reuse the gradient-initials avatar and the icon-tile card styling already present in the current about page so nothing visually new is introduced.

**Data:** define inline `const` arrays in `page.tsx` (consistent with current convention): `LEADERS`, `ABOUT_STATS`, `TRUST`, `VALUES`. Import `LOGO_NAMES` and `TESTIMONIALS` from `@/lib/testimonials`.

**Icons (lucide-react v1):** pick from installed set — e.g. `Lock`/`ShieldCheck`, `ScrollText`, `KeyRound`/`Users`, `DatabaseBackup` for Trust; `Sparkles`, `Heart`, `Compass`, `Laptop` for Values. Verify each export exists in v1 before use.

**Metadata:**
```ts
export const metadata: Metadata = {
  title: "About",
  description:
    "SignHR is the all-in-one HR platform for growing teams — built by SignatureTech after years of watching companies fight disconnected HR tools.",
  alternates: { canonical: "/about" },
};
```

**SEO (optional, nice-to-have):** an `AboutPage` / `Organization` JSON-LD via the existing `<JsonLd>` helper. Not required for v1.

**Routing/sitemap:** `/about` is already a static route in `app/sitemap.ts` — no change.

**Wiring notes (verified against source):**
- The closing section must keep an `id="careers"` anchor — the footer's "Careers" link (`/about#careers`) depends on it.
- `CTABand` converts the `/book-demo` primary into the in-page demo modal automatically (`demoHref()` → `DemoCta`).
- Accent words: plain `<em>` inside the dark `Hero` (it styles `em` itself); `<em className="serif-italic">` on all light/ink sections.

## 8. Content & voice rules

- Calm, concrete, confident, human. Short over long. Specific over vague.
- **Banned words:** synergy, leverage, seamless, robust, holistic, empower, unlock.
- Headline pattern: sans + `<em className="serif-italic">` accent words.
- Numbers/stats in `font-mono` per design system.

## 9. Placeholders & claims to verify before publishing

| Item | State | Action before go-live |
|------|-------|----------------------|
| Stats (§6.5) | Honest/structural, true today | Optionally swap to real traction later |
| Proof logos + quote (§6.6) | **Placeholder** (fictional names) | Replace with real customers + a real attributed quote, or remove the section |
| Trust claims (§6.7) | Drafted as defensible product facts | **Verify each is literally true**; add a real cert (e.g. SOC 2) only if held |
| Leadership photos (§6.4) | Gradient initials | Drop in real headshots when available |
| Origin signature (§6.2) | **Real** — Sonu Kumar Sony | — |

## 10. Accessibility & responsive

- Server component by default; add `"use client"` only if a section needs interactivity (none currently anticipated — `StatNumber`/`LogoMarquee` are already client islands).
- Semantic HTML (`<main>`, `<section>`, `<article>` for the origin, `<figure>` for the quote).
- Respect `prefers-reduced-motion` (already global; `StatNumber` count-up and marquee freeze).
- Test at **375 / 768 / 1024 / 1440**. Leadership row: 1-col mobile → 3-col desktop. Stats: 2-col mobile → 4-col desktop.
- Keyboard-reachable CTAs with `focus-visible` rings (inherited from `Button`).

## 11. Acceptance criteria

- [ ] `src/app/about/page.tsx` fully replaced with the 9-section structure above; no leftover INVESTORS/8-person-TEAM/fictional-origin content.
- [ ] All copy matches §6 exactly (including banned-words compliance).
- [ ] Leadership row shows the 3 real people; origin signed by Sonu Kumar Sony.
- [ ] No new visual language; only existing design-system components + inline helpers.
- [ ] `pnpm lint` clean; `pnpm build` 0 errors / 0 warnings.
- [ ] Visually verified at 375 / 768 / 1024 / 1440.
- [ ] `metadata` updated; `/about` still in sitemap.
- [ ] Closing section has `id="careers"`; the footer's `/about#careers` link still resolves.

## 12. Out of scope / future

- Real customer logos & testimonials, real traction stats, real headshots (swap-ins per §9).
- A dedicated `/careers` page (currently a CTA link to `/contact`).
- JSON-LD `AboutPage` schema (optional follow-up).

## 13. Resolved open questions (record)

- **Team presentation** → small real 3-person leadership row (not a grid, not omitted).
- **Careers on About** → no section; one secondary CTA line to `/contact`.
- **Stats honesty** → structural facts now; traction later.
- **HRMS-specific competitor conventions** → unverified by research; proceeding on general B2B-SaaS craft + StoryBrand. Acceptable risk for a marketing About page.
