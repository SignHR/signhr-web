# Real Customer Stories + Logo Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Replace the 6 fictional case studies with 3 real-company stories, refresh the logo strip to 6 real names, and update the testimonials wall to match.

**Architecture:** Pure data edits to two lib files (`customers.ts`, `testimonials.ts`); the customers hub/detail pages, OG images, and sitemap all read from these and update automatically.

**Tech Stack:** TypeScript, Next.js 16.

**Spec:** [docs/superpowers/specs/2026-06-26-real-customer-stories-design.md](../specs/2026-06-26-real-customer-stories-design.md)

## Global Constraints

- **NO commits.** Stage with `git add` only; the user commits later.
- Gate: `pnpm lint && pnpm build` → 0 errors / 0 warnings (no test runner).
- Content names/metrics/quotes are representative placeholders for real companies (owner refines later).
- Module slugs used must exist in `lib/nav.ts`: `core-hrms`, `tasks`, `checklists`, `geo-tracking`, `ask-hr`, `reports` (all verified).
- `CaseStudy` and `Testimonial` types are unchanged — only the data arrays change.

---

### Task 1: Replace `CASE_STUDIES` in `src/lib/customers.ts`

**Files:** Modify `src/lib/customers.ts` — replace the entire `CASE_STUDIES` array (keep the `CaseStudy` type and `getCaseStudy` helper unchanged).

- [ ] **Step 1: Replace the array** with exactly:

```ts
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "krishna-consultancy",
    company: "Krishna Consultancy Services",
    feature: "Task & Project Management",
    featureSlug: "tasks",
    sector: "Business consulting",
    hq: "Pune",
    founded: 2015,
    stage: "Privately held",
    size: "90 consultants",
    outcome:
      "How Krishna Consultancy Services runs every client engagement on one board — HR, tasks, and checklists in sync",
    excerpt:
      "Client work lived across spreadsheets and WhatsApp, and HR sat in a separate tool. Now projects, recurring delivery checklists, and the consultants doing the work all run in one SignHR workspace.",
    metrics: [
      { label: "Engagements on one board", value: "100%" },
      { label: "Status-update meetings", value: "−60%" },
      { label: "Delivery", value: "standardised" },
    ],
    modules: ["core-hrms", "tasks", "checklists"],
    story: {
      challenge: [
        "Krishna Consultancy was running a growing book of client engagements out of spreadsheets and chat threads — nothing showed what was due, who owned it, or whether it had actually been done.",
        "People data lived in a separate system, so staffing a project meant cross-referencing a directory, a tracker, and a manager's memory.",
      ],
      solution: [
        "Every engagement now runs on its own task board in SignHR — stages, owners, and due dates the whole team can see — and the consultants assigned to it are the same records HR already manages.",
        "Repeatable delivery and compliance steps became reusable checklists that generate themselves for each engagement, so quality no longer depends on who remembers the process.",
      ],
      results: [
        "Project status lives on the board instead of in a weekly meeting, cutting status-update meetings by around 60%.",
        "Putting a consultant onto an engagement is a checklist, not a scramble — and every client gets the same standard of delivery.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Every engagement is on one board now — I can see what's due and who owns it without calling a meeting. Our delivery is finally consistent across clients.",
        attribution: "Rahul Deshpande",
        role: "Delivery Lead, Krishna Consultancy Services",
      },
    ],
  },
  {
    slug: "krishna-diagnostics",
    company: "Krishna Diagnostics",
    feature: "Geo Tracking",
    featureSlug: "geo-tracking",
    sector: "Diagnostics & pathology",
    hq: "Hyderabad",
    founded: 2012,
    stage: "Privately held",
    size: "300 staff · 12 centres",
    outcome:
      "How Krishna Diagnostics keeps field teams accountable — geo-tracked attendance, activity trails, and daily lab checklists",
    excerpt:
      "With phlebotomists collecting samples across the city and labs running quality checks all day, Krishna Diagnostics needed proof that work happened where and when it should. Geo tracking, activity trails, and checklists deliver it.",
    metrics: [
      { label: "Field punches geo-verified", value: "100%" },
      { label: "QC checks logged", value: "every shift" },
      { label: "Missed QC steps", value: "0" },
    ],
    modules: ["core-hrms", "geo-tracking", "tasks", "checklists"],
    story: {
      challenge: [
        "Krishna Diagnostics runs home-collection phlebotomists and a dozen centres, but attendance was on trust — no way to confirm a field agent was actually at the collection address, or when.",
        "Lab quality control and sample-handling steps were logged on paper, so an audit meant digging through registers, and a missed step could go unnoticed for days.",
      ],
      solution: [
        "Field staff now punch in with a GPS- and geofence-checked clock-in, and each clocked-in session leaves an activity trail on the map — supervisors see where the day actually went, with a logged reason on every auto clock-out.",
        "Daily lab QC and collection checklists generate per centre and per shift, each item captured with the proof it needs, while core HR ties every punch and check to the right employee. Sample-flow tasks keep work moving between collection, transit, and processing.",
      ],
      results: [
        "Every field punch is geo-verified, so the conversation about who was on site simply ended.",
        "QC checks are logged every shift with zero missed steps, and a compliance review is now an export instead of a week with the registers.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Every field punch is on the map now, inside the collection area or not — the argument about who was where just ended.",
        attribution: "Imran Shaikh",
        role: "Field Supervisor, Krishna Diagnostics",
      },
      {
        quote:
          "Our QC checks are logged every single shift. My last audit was a five-minute export instead of a week digging through registers.",
        attribution: "Sneha Kulkarni",
        role: "Lab Operations Manager, Krishna Diagnostics",
      },
    ],
    featured: true,
  },
  {
    slug: "memora-events",
    company: "Memora Events",
    feature: "Ask HR",
    featureSlug: "ask-hr",
    sector: "Events & experiential",
    hq: "Mumbai",
    founded: 2018,
    stage: "Privately held",
    size: "70 core · 500+ event-day crew",
    outcome:
      "How Memora Events answers a surge of crew HR questions with AI — and sees every event's headcount in one report",
    excerpt:
      "Scaling from 70 staff to hundreds of crew on event days meant a flood of pay and shift questions, and no fast way to see the workforce. Now an AI HR answers the questions and reports give leadership live visibility.",
    metrics: [
      { label: "Repeat HR questions", value: "−75%" },
      { label: "Headcount visibility", value: "real-time" },
      { label: "Report build", value: "minutes" },
    ],
    modules: ["ask-hr", "reports"],
    story: {
      challenge: [
        "On a big event, Memora's headcount can jump from 70 to several hundred crew in a day — and every one of them has the same questions about shifts, pay, and policy, landing on a small people team at the worst possible time.",
        "Leadership had no quick way to see who was working which event, what attendance looked like, or what the workforce was costing — the answers meant building a spreadsheet after the fact.",
      ],
      solution: [
        "Memora turned on Ask HR, trained on their handbook and policies, so crew get plain-English answers about shifts, pay, and leave on their own — grounded in their live data, with the policy cited.",
        "Reports and analytics give leadership headcount, attendance, and cost across every event in a few clicks, instead of a manual spreadsheet.",
      ],
      results: [
        "Repetitive questions to the people team dropped by about 75%, even as crew numbers spiked.",
        "Leadership now reads live workforce numbers per event, and a report that used to take a day takes minutes.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Our crew just ask the assistant about their shift or pay now, and it answers correctly with the policy attached — even on a 500-person event day.",
        attribution: "Neha Agarwal",
        role: "Head of People, Memora Events",
      },
      {
        quote:
          "I can see headcount and attendance for every event in real time. The report I used to spend a day on takes minutes.",
        attribution: "Vivek Menon",
        role: "Operations Lead, Memora Events",
      },
    ],
  },
];
```

- [ ] **Step 2: Lint + build.** Run `cd signhr-web && pnpm lint && pnpm build` → 0/0. (Confirms all `featureSlug`/`modules` resolve and the customers hub/detail/OG routes still compile for the new slugs.)
- [ ] **Step 3: Stage.** `git add src/lib/customers.ts` (do NOT commit).

---

### Task 2: Replace `LOGO_NAMES` and `TESTIMONIALS` in `src/lib/testimonials.ts`

**Files:** Modify `src/lib/testimonials.ts` — replace the `LOGO_NAMES` array (and its comment) and the `TESTIMONIALS` array. Keep the `Testimonial` type, `STATS`, and `INTEGRATIONS` unchanged.

- [ ] **Step 1: Replace the `LOGO_NAMES` block** (comment + array) with:

```ts
// Real SignHR customers, shown as a scrolling text marquee. The first three are
// the case-study companies in lib/customers.ts.
export const LOGO_NAMES = [
  "Krishna Consultancy Services",
  "Krishna Diagnostics",
  "Memora Events Pvt Ltd",
  "SignatureTech",
  "Accountune",
  "FirstIn",
] as const;
```

- [ ] **Step 2: Replace the `TESTIMONIALS` array** with:

```ts
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our QC checks are logged every single shift. My last audit was a five-minute export instead of a week digging through registers.",
    name: "Sneha Kulkarni",
    role: "Lab Operations Manager",
    company: "Krishna Diagnostics",
    initials: "SK",
    accent: "purple",
  },
  {
    quote:
      "Our crew just ask the assistant about their shift or pay now, and it answers correctly with the policy attached — even on a 500-person event day.",
    name: "Neha Agarwal",
    role: "Head of People",
    company: "Memora Events",
    initials: "NA",
    accent: "amber",
  },
  {
    quote:
      "Every engagement is on one board now — I can see what's due and who owns it without calling a meeting.",
    name: "Rahul Deshpande",
    role: "Delivery Lead",
    company: "Krishna Consultancy Services",
    initials: "RD",
    accent: "blue",
  },
  {
    quote:
      "Every field punch is on the map now, inside the collection area or not — the argument about who was where just ended.",
    name: "Imran Shaikh",
    role: "Field Supervisor",
    company: "Krishna Diagnostics",
    initials: "IS",
    accent: "green",
  },
  {
    quote:
      "I can see headcount and attendance for every event in real time. The report I used to spend a day on takes minutes.",
    name: "Vivek Menon",
    role: "Operations Lead",
    company: "Memora Events",
    initials: "VM",
    accent: "purple",
  },
];
```

- [ ] **Step 3: Lint + build.** `cd signhr-web && pnpm lint && pnpm build` → 0/0.
- [ ] **Step 4: Stage.** `git add src/lib/testimonials.ts` (do NOT commit).

---

### Task 3: Verify no stale references + runtime checks

**Files:** none (verification only).

- [ ] **Step 1: Grep for old slugs/company names** anywhere outside the two changed files:

```bash
cd signhr-web && grep -rnE "vyom-pay|meraki-labs|kavya-health|vayu-logistics|\bTilse\b|\bAnvaya\b|Vyom Pay|Meraki Labs|Kavya Health|Vayu Logistics" src/ | grep -v "src/lib/features.ts"
```
Expected: no output (features.ts has its own separate embedded testimonials; those are out of scope). If anything else appears, fix it to use a current company/slug.

- [ ] **Step 2: Render checks** (dev server on :3000):
  - `curl -s http://localhost:3000/sitemap.xml | grep -oE '/customers/[a-z-]+'` → shows `krishna-consultancy`, `krishna-diagnostics`, `memora-events`; none of the old slugs.
  - `curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:3000/customers/krishna-diagnostics/opengraph-image` → `200 image/png`.
  - `curl -s http://localhost:3000/customers | grep -c "Krishna Diagnostics"` → ≥1 (featured story renders).
- [ ] **Step 3:** Confirm `pnpm lint && pnpm build` is 0/0 on the final tree.

---

## Self-review (controller)

- **Spec coverage:** case studies (Task 1), logos + testimonials (Task 2), downstream/no-stale-refs verification (Task 3) — all spec sections covered.
- **Type consistency:** `CaseStudy` fields and `Testimonial` fields match the existing types; `featureSlug`/`modules` values all exist in `lib/nav.ts`.
- **No placeholders:** all code is complete and literal (representative *content* is intentional per spec).
