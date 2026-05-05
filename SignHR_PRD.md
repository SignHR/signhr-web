# SignHR — Marketing Website PRD

**Product Requirements Document for the Public Marketing Site**

**Owner:** SignHR Team
**Status:** Ready for build
**Target stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion
**Design bar:** Lovable / Linear / Vercel-grade polish
**Last updated:** 2025

---

## 1. Executive Summary

SignHR is a multi-tenant SaaS HRMS platform covering the full employee lifecycle — onboarding, core HRMS, time & attendance, scheduling, leave, payroll, assets, offboarding, invoicing, and a self-service portal. This PRD defines the **public-facing marketing website** (NOT the product app itself). The site's job is to:

1. Convert qualified HR/Ops/Founder visitors into **demo bookings** and **free-trial signups**.
2. Communicate the breadth of the platform without overwhelming.
3. Establish SignHR as a modern, trustworthy, design-forward alternative to legacy HRMS tools (BambooHR, Zoho People, Keka, GreytHR).
4. Power inbound SEO via a high-quality blog and resource library.

**Primary CTA:** `Book a Demo`
**Secondary CTA:** `Start Free Trial` (or `Get Started Free` depending on plan structure)

---

## 2. Product Vision & Positioning

**One-liner:** _"The HR platform your team will actually want to log into."_

**Positioning statement:**
For growing companies (20–500 employees) that have outgrown spreadsheets but find legacy HR tools clunky, SignHR is an all-in-one HRMS that unifies onboarding, attendance, leave, payroll, and offboarding in one elegant, multi-tenant platform — so HR teams stop chasing approvals and start building culture.

**Key differentiators to communicate on site:**

- **All-in-one** — onboarding to offboarding in one platform (vs point solutions stitched together)
- **Multi-tenant SaaS** — workspace-per-company with isolated data, custom branding, currency, timezone
- **Workflow-native** — every request flows through a configurable approval engine
- **Self-service first** — employees can do 80% of HR tasks themselves
- **Built for the modern team** — not a 2008 enterprise tool with a CSS facelift

---

## 3. Target Audience & Personas

### Primary: HR Manager / Head of People

- Company size: 20–500 employees
- Pain: drowning in spreadsheets, email threads, manual approvals
- Wants: time back, audit trail, employee self-service
- Decision power: champions, but needs founder/CFO buy-in

### Secondary: Founder / COO at scaling startup

- Pain: HR is a black box, no visibility, compliance risk
- Wants: scalable system, fast onboarding, low admin overhead
- Decision power: signs the contract

### Tertiary: IT Admin / Ops

- Pain: integrating disparate tools, security
- Wants: SSO, audit logs, multi-tenancy controls

### Anti-personas (not targeted)

- Enterprises >5,000 employees (need Workday)
- Solo freelancers (don't need HRMS)

---

## 4. Brand & Design Direction

### 4.1 Visual identity

**Mood:** Clean, optimistic, human, premium-but-not-corporate. Reference points: **Onfolk, Taltrackr, Linear, Vercel, Polar.sh, Wallo, Teamanage**.

**Inspiration takeaways from reference images:**

- _Typedream_ — friendly avatars, soft pastel gradient halos, mixed UI mockups floating in space
- _Wallo_ — elegant serif/sans pairing, soft purple gradient, premium feel
- _Polar_ — clean dashboard mockup as hero visual, subtle purple gradient
- _Teamanage_ — 3D floating UI screenshots, soft lavender/blue, tasteful glassmorphism

### 4.2 Color system

Follow `.claude/DESIGN_SYSTEM.md`

### 4.3 Typography

```
Display / headings : "Instrument Serif" (italic-capable, used for accent words)
                   + "Geist Sans" (primary sans for headings)
Body              : "Geist Sans" (400, 500)
Mono / numbers    : "Geist Mono" (used in pricing, stats, code snippets)
```

**Type scale (desktop):**

- Hero H1: 72–88px, tight tracking, mixed serif italic + sans
- H2 section: 48–56px
- H3 card: 24–28px
- Body: 17px / 1.6
- Small: 14px

**Headline pattern:** Mix sans + serif italic for a premium feel.

> Example: `Run your **people ops** *without* the chaos.`
> Where _without_ is in Instrument Serif italic.

### 4.4 Layout & spacing

- Max content width: `1280px` (custom container with generous side padding)
- Section vertical rhythm: `120px` desktop / `72px` mobile
- Generous whitespace — never cramped
- Border radius: `16px` cards, `12px` buttons, `24px` for hero feature cards
- Subtle shadows only — prefer borders + tonal contrast over heavy shadows

### 4.5 Motion & interaction

- **Page transitions:** soft fade + 8px y-offset, 400ms ease-out
- **Scroll reveals:** sections fade-in + slight rise on viewport enter (Framer Motion `whileInView`)
- **Hero:** floating UI mockups with slow Y-bobbing animation (4–6s loop)
- **Buttons:** subtle scale (1.02) + shadow lift on hover
- **Marquee/logo strip:** infinite horizontal scroll for trust logos
- **Number counters:** count up when stats section enters viewport
- **Cursor-follow halos** on the hero (optional, tasteful)

### 4.6 Imagery & assets

- **Real product screenshots** (Figma-mocked at minimum) — never lorem-ipsum boxes
- **3D floating elements** (saxophone, palette, etc. _Typedream_ style) — used **sparingly**, only on hero and 1–2 feature sections
- **Avatars:** stylized illustrated avatars (Memoji-style or Open Peeps) for testimonial mocks
- **No stock photos of suited people in boardrooms.** Ever.

---

## 5. Information Architecture

### 5.1 Sitemap

```
/                              → Home / Landing
/features                      → Features overview (hub page)
  /features/core-hrms          → Core HRMS deep-dive
  /features/time-attendance    → Time & Attendance deep-dive
  /features/leave-management   → Leave Management deep-dive
  /features/payroll            → Payroll deep-dive
  /features/onboarding         → Onboarding deep-dive
  /features/offboarding        → Offboarding deep-dive
  /features/self-service       → Employee Self-Service deep-dive
  /features/workflows          → Approvals & Workflows deep-dive
  /features/assets             → Asset Management deep-dive
/pricing                       → Pricing tiers + FAQ
/customers                     → Case studies / logos
  /customers/[slug]            → Individual case study (dynamic)
/about                         → Company story, team, values
/blog                          → Blog index (filterable by category)
  /blog/[slug]                 → Blog post (dynamic, MDX)
/resources                     → Resource hub
  /resources/guides            → Long-form guides
  /resources/templates         → Free HR templates (lead magnets)
  /resources/help              → Help center / FAQ
/changelog                     → Product updates
/contact                       → Contact form
/book-demo                     → Demo booking (Calendly embed or custom)
/legal/privacy                 → Privacy policy
/legal/terms                   → Terms of service
/legal/dpa                     → Data processing addendum
404                            → Custom not-found page
```

### 5.2 Global navigation

**Top nav (sticky, frosted glass on scroll):**

```
[Logo]   Features ▾   Pricing   Customers   Resources ▾   Blog       [Login]  [Book a Demo]
```

**Features dropdown (mega-menu):**

- 3-column layout: Core | Time | Lifecycle
- Each item: icon + name + 1-line description
- Bottom CTA: "See all features →"

**Resources dropdown:**

- Guides, Templates, Help Center, Changelog, Blog

**Footer (5 columns + bottom bar):**

```
Product         Company        Resources      Legal          Stay in touch
─ Features      ─ About        ─ Blog         ─ Privacy      [email signup]
─ Pricing       ─ Customers    ─ Guides       ─ Terms        [social icons]
─ Changelog     ─ Careers      ─ Help         ─ DPA
─ Roadmap       ─ Contact      ─ Templates    ─ Security
─ Integrations                 ─ API docs

[Logo + tagline]                         © 2025 SignHR. All rights reserved.
                                         [Status page] [Made with care]
```

---

## 6. Page-by-Page Requirements

### 6.1 Home `/`

The home page is the highest-trafficked surface. It must communicate **breadth + ease** in <10 seconds.

**Section order:**

1. **Hero**
   - Headline (mixed sans + serif italic): `Run your **entire HR** *without* the chaos.`
   - Subheadline: 1–2 lines explaining what SignHR is
   - Primary CTA: `Book a Demo` (filled, dark)
   - Secondary CTA: `Start Free Trial` (ghost, with arrow)
   - Hero visual: floating dashboard mockup + 1 mobile mockup, with gradient halo behind
   - Trust line below CTAs: "No credit card required • Set up in 10 minutes"

2. **Logo cloud / Trusted by**
   - 6–8 customer logos (grayscale, hover → color)
   - Heading: "Trusted by 500+ growing teams"

3. **Problem → Solution framing**
   - Two-column "Before / After" or "From → To" block
   - Visual contrast: messy spreadsheets/email vs. clean SignHR UI

4. **Core platform pillars (5 cards)**
   - Each pillar = one major module group
     1. Core HRMS — single source of truth for people data
     2. Time & Leave — attendance, schedules, leave in one flow
     3. Payroll & Comp — transparent salary, components, history
     4. Workflows — every approval, automated
     5. Self-service — your employees do 80% of the work themselves
   - Card design: icon + title + 2-line desc + "Learn more →"
   - Each card links to its `/features/[module]` page

5. **Feature spotlight — alternating left/right**
   - 3 alternating sections, each with:
     - Eyebrow label (e.g., "ATTENDANCE")
     - H2 headline
     - 3-bullet feature list
     - Real UI screenshot/mockup
   - Sections to feature: Onboarding, Time & Attendance, Approvals workflow

6. **Live workflow demo** _(interactive component)_
   - Animated illustration of a leave request flowing: Employee → Manager → HR → Approved
   - Auto-plays on viewport enter, can be replayed

7. **Stats band**
   - 4 numbers with count-up animation:
     - `500+` companies
     - `50K+` employees managed
     - `10 min` average setup time
     - `99.9%` uptime
   - Background: subtle gradient

8. **Testimonials**
   - 3-card grid OR a horizontal scroll of testimonial cards
   - Each: avatar + name + role + company + 2–3 line quote
   - Mix of personas (HR Manager, Founder, Ops)

9. **Integrations strip**
   - 12–16 logo tiles in a grid (Slack, Google Workspace, Zoom, QuickBooks, Stripe, etc.)
   - "Plays nicely with your stack"

10. **Pricing teaser**
    - 3-column simplified pricing preview
    - "See full pricing →" link
    - Includes "Book a Demo for Enterprise" callout

11. **Blog teaser**
    - 3 latest posts
    - "Read the blog →" link

12. **Final CTA band**
    - Full-width, gradient background
    - Headline: "Ready to give HR the upgrade it deserves?"
    - Both CTAs prominent

13. **Footer** (global)

---

### 6.2 Features overview `/features`

Hub page that links to all 9 feature deep-dive pages.

**Sections:**

1. Hero: "Everything you need to run your people ops"
2. Feature category navigator (sticky tabs by layer):
   - Workforce, Time, Lifecycle, Operations, Engagement
3. Grid of feature cards (one per module from the inventory):
   - Each card has: icon, title, 2-line description, "Explore →"
4. Comparison teaser: "How SignHR compares" (links to comparison pages — optional Phase 2)
5. CTA band

---

### 6.3 Feature deep-dive `/features/[module]`

**Template (used for all 9 module pages):**

1. Hero
   - Eyebrow: module category (e.g., "TIME & ATTENDANCE")
   - H1: feature-specific headline
   - Sub: 1-paragraph description
   - CTA: Book Demo + Try Free
   - Visual: large UI screenshot for that module

2. "What you can do" — 4–6 capability cards (icon + title + desc)

3. Feature-specific spotlight (alternating L/R, 2–3 sections)

4. Mini-testimonial — 1 quote relevant to this module

5. "Works with the rest of SignHR" — 3 cross-link cards to related modules

6. CTA band

**Per-module headlines & content guidance:**

- **Core HRMS:** "One source of truth for everyone." → employee profiles, org chart, documents, contracts
- **Time & Attendance:** "Clock in. Or don't. Either way, we've got it." → punch in/out, mobile, geo, audit
- **Leave Management:** "Time off should be easy for everyone." → policies, balances, calendar, approvals
- **Payroll:** "Transparent compensation, every time." → components, history, payslips
- **Onboarding:** "First day, done in minutes." → invite flow, document collection, contract signing
- **Offboarding:** "Exits done with dignity." → checklists, asset return, IT access removal
- **Self-service:** "Your team, empowered." → profile, requests, documents, devices
- **Workflows:** "Every approval, automated." → multi-step flows, comments, audit trail
- **Assets:** "Know who has what." → catalog, assignment, check-in/out

---

### 6.4 Pricing `/pricing`

**Sections:**

1. Hero: "Simple pricing. No surprises."
2. Toggle: Monthly / Annual (annual saves 20%)
3. Pricing tiers (3 columns):

   | Starter                      | Growth (most popular)                              | Enterprise                                        |
   | ---------------------------- | -------------------------------------------------- | ------------------------------------------------- |
   | $X/employee/mo               | $Y/employee/mo                                     | Custom                                            |
   | Up to 25 employees           | 26–250 employees                                   | 250+                                              |
   | Core HRMS, Leave, Attendance | Everything in Starter + Payroll, Workflows, Assets | Everything + SSO, dedicated CSM, custom contracts |
   | Email support                | Priority support                                   | 24/7 + dedicated CSM                              |
   | [Start Free Trial]           | [Start Free Trial]                                 | [Book a Demo]                                     |

4. Feature comparison table (collapsible by category)
5. "What's included in every plan" band
6. Pricing FAQ (8–10 Qs in accordion)
7. Money-back / trust callout
8. CTA band

---

### 6.5 Customers `/customers`

1. Hero: "Stories from teams that grew with SignHR"
2. Featured case study (large card)
3. Logo grid
4. Case study card grid (filterable by industry or company size)
5. CTA band

**Case study detail `/customers/[slug]`:**

- Hero: company logo + headline outcome (e.g., "How Acme cut HR admin time by 70%")
- Stats band (3 KPIs)
- Story: Challenge → Solution → Results (long-form prose)
- Pull quotes
- "Modules they use" grid
- CTA band

---

### 6.6 About `/about`

1. Hero: company mission statement
2. Origin story (long-form prose, friendly)
3. Values (4 cards)
4. Team grid (avatars + names + roles)
5. Investors / press logos
6. Careers callout (link to job board or `/careers`)
7. CTA band

---

### 6.7 Blog `/blog`

1. Hero: "Insights for modern HR teams"
2. Category filter chips (All, HR Strategy, Compliance, Product Updates, Culture, Guides)
3. Featured post (large hero card)
4. Post grid (3 columns desktop, 1 mobile)
   - Each card: cover image, category, title, author + date, read time
5. Pagination or infinite scroll
6. Newsletter signup band
7. Footer

**Blog post `/blog/[slug]`:**

- Breadcrumb: Blog > Category
- Cover image
- H1 title
- Author + date + read time + share icons
- TOC (sticky on desktop, collapsible on mobile)
- MDX-rendered content
- Author bio card at end
- Related posts (3 cards)
- Newsletter signup
- CTA band

**Content management:** MDX files in `/content/blog/` with frontmatter (title, slug, date, author, category, cover, excerpt, readTime, featured).

---

### 6.8 Resources `/resources`

Hub page linking to:

- **Guides** — long-form pillar content (e.g., "The Ultimate Guide to Employee Onboarding")
- **Templates** — gated downloads (offer letter, leave policy, etc.) — captures email
- **Help Center** — FAQ-style with search
- **Changelog** — product updates
- **API docs** (linked, hosted separately)

---

### 6.9 Book Demo `/book-demo`

1. Two-column layout:
   - **Left:** Heading + 4-bullet "What to expect on the call" + small testimonial
   - **Right:** Embedded Calendly OR custom form (name, email, company, size, message)
2. Trust strip below: customer logos + "Book a 30-minute call. No pressure."
3. Footer

---

### 6.10 Contact `/contact`

Simple split-page:

- **Left:** contact methods (email, support email, sales email, address)
- **Right:** contact form (name, email, topic, message)

---

### 6.11 404

Custom illustrated 404 with "Back to home" + popular links (Home, Features, Pricing, Blog).

---

## 7. Component Library

These shared components must be built once and reused across pages:

### Layout

- `<Container>` — max-width wrapper with responsive padding
- `<Section>` — vertical-rhythm wrapper with optional background
- `<Grid>` — responsive grid helper

### Navigation

- `<Navbar>` — sticky, frosted on scroll, mega-menu support
- `<MobileMenu>` — slide-in sheet on mobile
- `<Footer>`
- `<Breadcrumbs>`

### Marketing primitives

- `<Hero>` — variant: home / feature / generic
- `<CTABand>` — full-width gradient with headline + 2 buttons
- `<FeatureCard>` — icon + title + desc + optional link
- `<TestimonialCard>` — avatar + quote + attribution
- `<StatNumber>` — count-up animated number
- `<LogoCloud>` — responsive grayscale logo grid
- `<LogoMarquee>` — infinite horizontal scroll
- `<Spotlight>` — alternating-side feature section (image + copy)
- `<PricingCard>` — tier card with feature list
- `<FAQAccordion>`
- `<NewsletterSignup>`

### UI primitives

- `<Button>` — variants: primary, secondary, ghost, link; sizes: sm, md, lg
- `<Badge>` — variants: default, accent, success, warning
- `<Tabs>`
- `<Accordion>`
- `<Tooltip>`
- `<Dialog>` (Radix)
- `<Toast>`
- `<Input>`, `<Textarea>`, `<Select>` (Radix-styled)

### Blog/Resource

- `<PostCard>`, `<PostHeader>`, `<TOC>`, `<AuthorCard>`, `<RelatedPosts>`
- MDX components: `<Callout>`, `<CodeBlock>`, `<ImageCaption>`, `<Quote>`

### Visual elements

- `<GradientHalo>` — soft radial gradient background blob
- `<FloatingMockup>` — wraps dashboard screenshots with bobbing animation
- `<WorkflowDemo>` — animated leave-approval flow

---

## 8. Content Strategy

### Tone of voice

- **Confident but not corporate** — "Run your entire HR" not "Leverage holistic talent solutions"
- **Specific over vague** — "Set up in 10 minutes" not "Quick to deploy"
- **Human** — talk like a smart friend, not a brochure
- **Short sentences** — most paragraphs 2–3 lines max

### Content rules

- Every page has a clear primary CTA
- No more than one CTA band per scroll viewport
- Headlines lead with benefit, not feature
- Feature pages: outcome → capability → proof
- Stats are real or marked clearly as projected
- Never use "synergy", "leverage", "seamless", "robust"

### Initial blog seed (10 posts to launch with)

1. "The honest cost of running HR in spreadsheets"
2. "How to write an employee handbook your team will actually read"
3. "5 leave policies that scale from 10 to 100 employees"
4. "Onboarding checklist: the first 30 days"
5. "Why approval workflows fail (and how to fix yours)"
6. "Compliance basics for growing teams"
7. "Building a remote-first attendance policy"
8. "Offboarding done right: a manager's guide"
9. "The HR tech stack for 2025"
10. "From spreadsheets to SignHR: a migration guide"

---

## 9. SEO & Metadata Requirements

- **Per-page metadata** via Next.js `metadata` export (title, description, OG image, canonical)
- **Dynamic OG image generation** for blog posts using `next/og` (`ImageResponse`)
- **Sitemap.xml** — auto-generated from all routes including dynamic blog posts
- **Robots.txt**
- **Schema.org JSON-LD** on:
  - Home: `Organization`
  - Blog posts: `Article`
  - Pricing: `Product` with `Offer`
  - FAQ accordions: `FAQPage`
- **Semantic HTML** — proper heading hierarchy, `<main>`, `<article>`, `<nav>`, `<aside>`
- **Title pattern:** `[Page Title] — SignHR` (home: `SignHR — All-in-one HRMS for growing teams`)
- **Meta description:** 150–160 chars, benefit-focused, includes primary keyword

**Target keywords (initial):**

- "HRMS software" / "HR management system"
- "all-in-one HR platform"
- "employee onboarding software"
- "HR software for small business" / "HR for startups"
- "leave management system"
- Long-tail: blog posts target informational queries

---

## 10. Performance, Accessibility & Quality Bar

### Performance

- Lighthouse: 95+ Performance, 100 Accessibility, 100 Best Practices, 95+ SEO
- LCP < 1.8s on 4G
- CLS < 0.05
- Images via `next/image`, AVIF/WebP, properly sized
- Fonts via `next/font`, self-hosted, `display=swap`
- Above-fold content streams first; heavy mockups lazy-loaded
- No layout shift on font load

### Accessibility (WCAG 2.1 AA minimum)

- All interactive elements keyboard-reachable
- Focus rings visible (custom-styled, not removed)
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large
- All images have `alt` text (decorative = `alt=""`)
- Forms: labels, error messages, ARIA attributes
- Reduced-motion media query honored — bobbing animations pause
- Skip-to-content link

### Browser support

- Last 2 versions of Chrome, Safari, Firefox, Edge
- Mobile Safari 15+
- Mobile Chrome 100+

---

## 11. Tech Stack

```
Framework      : Next.js 16+ (App Router)
Language       : TypeScript (strict mode)
Styling        : Tailwind CSS v4 (CSS-first config)
UI primitives  : Radix UI (Dialog, Accordion, Tabs, Tooltip, Dropdown)
Animation      : Framer Motion (motion/react)
Icons          : Lucide React
Fonts          : next/font with Geist Sans, Geist Mono, Instrument Serif
Forms          : React Hook Form + Zod validation
Email          : Resend (newsletter, demo requests, contact form)
Blog content   : MDX via @next/mdx + contentlayer (or fumadocs-mdx)
Analytics      : Vercel Analytics + PostHog
Booking demo   : Cal.com or Calendly embed
Deploy         : Vercel
CMS (Phase 2)  : Sanity or Notion (content team friendly)
Image hosting  : Vercel / Cloudinary for case study assets
```

---

## 12. Success Metrics

**Primary KPIs:**

- Demo bookings per week (target: 25 by month 3)
- Free trial signups per week (target: 50 by month 3)
- Demo → trial conversion rate (target: 35%)

**Secondary:**

- Organic traffic growth MoM
- Blog article rankings (target: 20 articles in top 10 within 6 months)
- Newsletter signups
- Time-on-page for feature pages (target: >2 min)
- Pricing page → CTA click rate (target: 8%+)

---

## 13. Out of Scope (Phase 2+)

- Localization (i18n) — site launches English-only; structure should accommodate
- Dark mode — design tokens prepared, not built initially
- Comparison pages (vs. BambooHR, vs. Zoho People) — Phase 2 SEO play
- Customer portal / community
- Live chat (Intercom/Crisp) — to be added post-launch
- Webinar landing page template
- Affiliate / partner program page

---

## 14. Acceptance Criteria

The site is **done** when:

- [ ] All routes in section 5.1 render with production-ready content
- [ ] Lighthouse scores meet section 10 targets
- [ ] All forms submit successfully (demo, contact, newsletter)
- [ ] Blog supports MDX with TOC, code blocks, callouts, images
- [ ] Sitemap, robots, OG images all generated
- [ ] Mobile responsive at 375px, 768px, 1024px, 1440px
- [ ] Keyboard navigation works on all interactive elements
- [ ] Reduced-motion is respected
- [ ] No console errors or hydration warnings
- [ ] Analytics events fire on CTAs and form submissions

---

_End of PRD._
