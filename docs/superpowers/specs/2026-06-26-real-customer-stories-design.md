# Real Customer Stories + Logo Refresh — Design Spec

**Date:** 2026-06-26
**Project:** signhr-web (Next.js 16 marketing site)
**Status:** Approved design — ready for implementation plan

## Goal

Replace the six fictional case studies with three real-company stories, refresh the home-page logo strip to six real names, and update the testimonials wall to match — keeping everything consistent.

## Decisions (from brainstorming)

- **Scope:** replace all 6 fictional case studies with 3 real ones.
- **Content:** representative content drafted now in the existing style; names/metrics/quotes are **placeholders the owner will refine** (real companies — specifics to be corrected later).
- **Logos:** text marquee (no image assets); replace all 12 names with 6.
- **Testimonials:** update for consistency (~5, drawn from the case-study quotes).

## Files changed

- `src/lib/customers.ts` — replace `CASE_STUDIES` (6 → 3).
- `src/lib/testimonials.ts` — replace `LOGO_NAMES` (12 → 6) and `TESTIMONIALS` (6 → 5); update the now-stale "fictional" comment.

**Automatically follow (no edits needed, verify only):** the sitemap `customerEntries`, the `customers/[slug]/opengraph-image` route (its `generateStaticParams` maps `CASE_STUDIES`), the customers hub (`featured` + grid), and per-study "related" all read from `CASE_STUDIES`. Grep for any hardcoded references to the old slugs/company names (`vyom-pay`, `meraki-labs`, `tilse`, `kavya-health`, `vayu-logistics`, `anvaya`) and fix or confirm none exist outside these two files.

## Feature → module-slug mapping (all verified against `lib/nav.ts`)

HR → `core-hrms` · Task Management → `tasks` · Checklists → `checklists` · Geo/Activity Tracking → `geo-tracking` · AI HR → `ask-hr` · Report → `reports`.

## Naming note

Case-study `company` uses the clean display form `"Memora Events"`; the logo strip keeps the full `"Memora Events Pvt Ltd"`. Krishna Consultancy Services and Krishna Diagnostics use the same name in both.

---

## Content — the three case studies (CaseStudy objects)

Each conforms to the existing `CaseStudy` type: `slug, company, feature, featureSlug, sector, hq, founded, stage, size, outcome, excerpt, metrics[], modules[], story{challenge[], solution[], results[]}, pullQuotes[]{quote, attribution, role}, featured?`.

### 1. Krishna Consultancy Services — `krishna-consultancy`

- feature: `"Task & Project Management"` · featureSlug: `"tasks"`
- sector: `"Business consulting"` · hq: `"Pune"` · founded: `2015` · stage: `"Privately held"` · size: `"90 consultants"`
- outcome: `"How Krishna Consultancy Services runs every client engagement on one board — HR, tasks, and checklists in sync"`
- excerpt: `"Client work lived across spreadsheets and WhatsApp, and HR sat in a separate tool. Now projects, recurring delivery checklists, and the consultants doing the work all run in one SignHR workspace."`
- metrics: `Engagements on one board → 100%` · `Status-update meetings → −60%` · `Delivery → standardised`
- modules: `["core-hrms", "tasks", "checklists"]`
- story.challenge:
  1. "Krishna Consultancy was running a growing book of client engagements out of spreadsheets and chat threads — nothing showed what was due, who owned it, or whether it had actually been done."
  2. "People data lived in a separate system, so staffing a project meant cross-referencing a directory, a tracker, and a manager's memory."
- story.solution:
  1. "Every engagement now runs on its own task board in SignHR — stages, owners, and due dates the whole team can see — and the consultants assigned to it are the same records HR already manages."
  2. "Repeatable delivery and compliance steps became reusable checklists that generate themselves for each engagement, so quality no longer depends on who remembers the process."
- story.results:
  1. "Project status lives on the board instead of in a weekly meeting, cutting status-update meetings by around 60%."
  2. "Putting a consultant onto an engagement is a checklist, not a scramble — and every client gets the same standard of delivery."
- pullQuotes:
  1. quote `"Every engagement is on one board now — I can see what's due and who owns it without calling a meeting. Our delivery is finally consistent across clients."` · attribution `"Rahul Deshpande"` · role `"Delivery Lead, Krishna Consultancy Services"`

### 2. Krishna Diagnostics — `krishna-diagnostics` · **featured: true**

- feature: `"Geo Tracking"` · featureSlug: `"geo-tracking"`
- sector: `"Diagnostics & pathology"` · hq: `"Hyderabad"` · founded: `2012` · stage: `"Privately held"` · size: `"300 staff · 12 centres"`
- outcome: `"How Krishna Diagnostics keeps field teams accountable — geo-tracked attendance, activity trails, and daily lab checklists"`
- excerpt: `"With phlebotomists collecting samples across the city and labs running quality checks all day, Krishna Diagnostics needed proof that work happened where and when it should. Geo tracking, activity trails, and checklists deliver it."`
- metrics: `Field punches geo-verified → 100%` · `QC checks logged → every shift` · `Missed QC steps → 0`
- modules: `["core-hrms", "geo-tracking", "tasks", "checklists"]`
- story.challenge:
  1. "Krishna Diagnostics runs home-collection phlebotomists and a dozen centres, but attendance was on trust — no way to confirm a field agent was actually at the collection address, or when."
  2. "Lab quality control and sample-handling steps were logged on paper, so an audit meant digging through registers, and a missed step could go unnoticed for days."
- story.solution:
  1. "Field staff now punch in with a GPS- and geofence-checked clock-in, and each clocked-in session leaves an activity trail on the map — supervisors see where the day actually went, with a logged reason on every auto clock-out."
  2. "Daily lab QC and collection checklists generate per centre and per shift, each item captured with the proof it needs, while core HR ties every punch and check to the right employee. Sample-flow tasks keep work moving between collection, transit, and processing."
- story.results:
  1. "Every field punch is geo-verified, so the conversation about who was on site simply ended."
  2. "QC checks are logged every shift with zero missed steps, and a compliance review is now an export instead of a week with the registers."
- pullQuotes:
  1. quote `"Every field punch is on the map now, inside the collection area or not — the argument about who was where just ended."` · attribution `"Imran Shaikh"` · role `"Field Supervisor, Krishna Diagnostics"`
  2. quote `"Our QC checks are logged every single shift. My last audit was a five-minute export instead of a week digging through registers."` · attribution `"Sneha Kulkarni"` · role `"Lab Operations Manager, Krishna Diagnostics"`

### 3. Memora Events — `memora-events`

- company: `"Memora Events"` · feature: `"Ask HR"` · featureSlug: `"ask-hr"`
- sector: `"Events & experiential"` · hq: `"Mumbai"` · founded: `2018` · stage: `"Privately held"` · size: `"70 core · 500+ event-day crew"`
- outcome: `"How Memora Events answers a surge of crew HR questions with AI — and sees every event's headcount in one report"`
- excerpt: `"Scaling from 70 staff to hundreds of crew on event days meant a flood of pay and shift questions, and no fast way to see the workforce. Now an AI HR answers the questions and reports give leadership live visibility."`
- metrics: `Repeat HR questions → −75%` · `Headcount visibility → real-time` · `Report build → minutes`
- modules: `["ask-hr", "reports"]`
- story.challenge:
  1. "On a big event, Memora's headcount can jump from 70 to several hundred crew in a day — and every one of them has the same questions about shifts, pay, and policy, landing on a small people team at the worst possible time."
  2. "Leadership had no quick way to see who was working which event, what attendance looked like, or what the workforce was costing — the answers meant building a spreadsheet after the fact."
- story.solution:
  1. "Memora turned on Ask HR, trained on their handbook and policies, so crew get plain-English answers about shifts, pay, and leave on their own — grounded in their live data, with the policy cited."
  2. "Reports and analytics give leadership headcount, attendance, and cost across every event in a few clicks, instead of a manual spreadsheet."
- story.results:
  1. "Repetitive questions to the people team dropped by about 75%, even as crew numbers spiked."
  2. "Leadership now reads live workforce numbers per event, and a report that used to take a day takes minutes."
- pullQuotes:
  1. quote `"Our crew just ask the assistant about their shift or pay now, and it answers correctly with the policy attached — even on a 500-person event day."` · attribution `"Neha Agarwal"` · role `"Head of People, Memora Events"`
  2. quote `"I can see headcount and attendance for every event in real time. The report I used to spend a day on takes minutes."` · attribution `"Vivek Menon"` · role `"Operations Lead, Memora Events"`

---

## Content — logo strip (`LOGO_NAMES`)

Replace all 12 with exactly (order = display order):

```
"Krishna Consultancy Services", "Krishna Diagnostics", "Memora Events Pvt Ltd",
"SignatureTech", "Accountune", "FirstIn"
```

Update the file comment (currently "Fictional, India-flavoured showcase brands…") to reflect that these are real customers and the first three are the case-study companies.

## Content — testimonials (`TESTIMONIALS`, 5 entries)

Type: `{ quote, name, role, company, initials, accent: "purple"|"amber"|"blue"|"green", rating? }`.

1. quote (Diagnostics, Lab Ops) `"Our QC checks are logged every single shift. My last audit was a five-minute export instead of a week digging through registers."` · name `"Sneha Kulkarni"` · role `"Lab Operations Manager"` · company `"Krishna Diagnostics"` · initials `"SK"` · accent `"purple"`
2. quote (Memora, People) `"Our crew just ask the assistant about their shift or pay now, and it answers correctly with the policy attached — even on a 500-person event day."` · name `"Neha Agarwal"` · role `"Head of People"` · company `"Memora Events"` · initials `"NA"` · accent `"amber"`
3. quote (Consultancy, Delivery) `"Every engagement is on one board now — I can see what's due and who owns it without calling a meeting."` · name `"Rahul Deshpande"` · role `"Delivery Lead"` · company `"Krishna Consultancy Services"` · initials `"RD"` · accent `"blue"`
4. quote (Diagnostics, Field) `"Every field punch is on the map now, inside the collection area or not — the argument about who was where just ended."` · name `"Imran Shaikh"` · role `"Field Supervisor"` · company `"Krishna Diagnostics"` · initials `"IS"` · accent `"green"`
5. quote (Memora, Ops) `"I can see headcount and attendance for every event in real time. The report I used to spend a day on takes minutes."` · name `"Vivek Menon"` · role `"Operations Lead"` · company `"Memora Events"` · initials `"VM"` · accent `"purple"`

---

## Verification

- `pnpm lint && pnpm build` → 0 errors / 0 warnings (project gate; no test runner).
- Customers hub `/customers` shows Krishna Diagnostics as the featured story + the other two in the grid.
- Each `/customers/{slug}` renders (story, metrics, modules, related) and its OG image (`/customers/{slug}/opengraph-image`) returns a 1200×630 PNG with the right company/sector/outcome.
- `/sitemap.xml` lists the 3 new customer URLs and none of the old ones.
- Home page logo marquee shows the 6 new names; testimonials wall shows the 5 new quotes; no old fictional names remain anywhere (grep clean).

## Out of scope

- Real logo image assets (marquee stays text).
- The embedded `testimonial` objects inside `lib/features.ts` (separate fictional content, not part of this change).
- Real/verified metrics — current values are representative placeholders for the owner to confirm.
