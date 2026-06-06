export type CaseStudy = {
  slug: string;
  company: string;
  feature: string; // short display label, e.g. "Ask HR"
  featureSlug: string; // module slug in FEATURE_MODULES (lib/nav.ts) — link target
  sector: string;
  hq: string;
  founded: number;
  stage: string;
  size: string;
  outcome: string;
  excerpt: string;
  metrics: { label: string; value: string }[];
  modules: string[];
  story: {
    challenge: string[];
    solution: string[];
    results: string[];
  };
  pullQuotes: { quote: string; attribution: string; role: string }[];
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "vyom-pay",
    company: "Vyom Pay",
    feature: "Ask HR",
    featureSlug: "ask-hr",
    sector: "Fintech",
    hq: "Bengaluru",
    founded: 2019,
    stage: "Series B",
    size: "240 employees",
    outcome:
      "How Vyom Pay gave every employee an AI HR that answers from real payroll math",
    excerpt:
      "Vyom Pay's people team was answering the same pay and leave questions at 9pm. Now an AI HR — trained on their handbook and wired to live payroll — answers in plain English, with the policy attached.",
    metrics: [
      { label: "Repeat HR questions", value: "−80%" },
      { label: "Answers cited", value: "100%" },
      { label: "Always on", value: "24/7" },
    ],
    modules: ["ask-hr", "payroll", "leave-management", "self-service"],
    story: {
      challenge: [
        "As a fintech scaling past 240 people, Vyom Pay's inbox filled with the same questions — 'why did my pay change this month?', 'what's my notice period?', 'how much leave do I have left?' — and the hardest ones landed after hours.",
        "Anita Reddy's team was the single point of truth, so every variable-pay or policy question routed through them. Answers were slow, inconsistent, and impossible to keep on the record.",
      ],
      solution: [
        "Vyom Pay turned on SignHR's Ask HR and trained it on their handbook and policies. Employees now ask in plain English and get an answer grounded in their own live data, with the exact policy section cited.",
        "Because it runs the same engine that builds payslips, it answers real what-ifs — 'if I take unpaid leave Friday to Monday, what's the deduction?' — as an estimate, not a guess. It's permission-scoped by construction, so it never surfaces anything an employee isn't already allowed to see.",
      ],
      results: [
        "Repetitive questions to the HR inbox dropped by about 80%, and the 9pm pings all but stopped.",
        "Every answer arrives cited and on the record, so employees trust it — and the people team spends its time on the work only humans can do.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Our people ask it the things they used to email me at 9pm — and it answers correctly, with the policy attached. My inbox finally went quiet.",
        attribution: "Anita Reddy",
        role: "Head of People, Vyom Pay",
      },
      {
        quote:
          "It runs the actual payroll math, so I trust the number it gives — and so does the team.",
        attribution: "Anita Reddy",
        role: "Head of People, Vyom Pay",
      },
    ],
    featured: true,
  },
  {
    slug: "meraki-labs",
    company: "Meraki Labs",
    feature: "Onboarding & Offboarding",
    featureSlug: "onboarding",
    sector: "Dev-tools SaaS",
    hq: "Pune",
    founded: 2020,
    stage: "Series A",
    size: "180 employees",
    outcome:
      "Meraki Labs runs offer-to-exit on autopilot — 12 minutes a hire, clean exits every time",
    excerpt:
      "Hiring two engineers a week made onboarding a half-day fire drill, and every exit a scramble. Now joining and leaving are both checklists that run themselves.",
    metrics: [
      { label: "Time per onboarding", value: "12 min" },
      { label: "Day-one readiness", value: "100%" },
      { label: "Missed exit steps", value: "0" },
    ],
    modules: ["onboarding", "assets", "workflows", "self-service"],
    story: {
      challenge: [
        "Meraki Labs was hiring 60 engineers a quarter, and each one meant manual coordination across IT, finance, and engineering. New joiners turned up without working laptops, and onboarding satisfaction slipped two quarters running.",
        "Exits were worse — nobody owned the clearance, so asset return and access removal depended on someone remembering to start.",
      ],
      solution: [
        "Meraki generates the offer from a template, gets it e-signed on a phone, and lets task-based pre-boarding route IT, finance, and people-ops work automatically before day one — accounts created and assets assigned in advance.",
        "On the way out, a resignation now triggers a clearance checklist that pulls in every team, returns assets, removes access, and previews a correctly-calculated full-and-final before the last day.",
      ],
      results: [
        "Onboarding dropped from four hours to about twelve minutes of people-ops attention per hire, with day-one readiness at 100% for two straight quarters.",
        "Exits run start-to-finish without a dropped step — no more chasing laptops or stray logins after someone's gone.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "We used to spend half a day prepping each new hire and dread every exit. Now both are checklists that run themselves.",
        attribution: "Karan Malhotra",
        role: "People Operations, Meraki Labs",
      },
    ],
  },
  {
    slug: "tilse",
    company: "Tilse",
    feature: "Attendance",
    featureSlug: "time-attendance",
    sector: "D2C skincare",
    hq: "Mumbai",
    founded: 2021,
    stage: "Series A",
    size: "120 employees",
    outcome:
      "Tilse captures attendance across warehouse, retail and HQ — one tap, geo-verified",
    excerpt:
      "A skincare brand spread across a warehouse, retail counters, and a head office had three ways to track time. SignHR made it one — a selfie-and-GPS punch on the floor, a kiosk in the warehouse, a browser at HQ.",
    metrics: [
      { label: "Systems", value: "3 → 1" },
      { label: "Punch accuracy", value: "98%" },
      { label: "Timesheet approval", value: "20 min" },
    ],
    modules: ["time-attendance", "leave-management", "self-service", "payroll"],
    story: {
      challenge: [
        "Tilse's team clocked in three different ways — a warehouse register, retail counter sheets, and HQ spreadsheets — and month-end was a scramble to reconcile them into one payroll.",
        "Store staff had no clean way to mark attendance or fix a missed punch, so corrections piled up in managers' chats.",
      ],
      solution: [
        "Tilse standardized on SignHR: a geofenced selfie-and-GPS punch for retail, a shared kiosk in the warehouse, and the browser at HQ — all into one timesheet. The shift scheduler handles rotating retail shifts, and missed punches auto-surface to the employee to regularize, not the manager's inbox.",
        "A live dashboard shows who's in, who's late, and who's on leave across every location, and verified attendance flows straight into payroll inputs.",
      ],
      results: [
        "Three capture methods collapsed into one system, with on-time punch accuracy at 98%.",
        "Managers approve timesheets in minutes, and attendance reaches payroll already clean.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Our store managers approve timesheets on their phones over chai — and the warehouse, retail, and office are finally on the same system.",
        attribution: "Aisha Patel",
        role: "Head of HR, Tilse",
      },
    ],
  },
  {
    slug: "kavya-health",
    company: "Kavya Health",
    feature: "Approval Flow",
    featureSlug: "workflows",
    sector: "Healthtech",
    hq: "Hyderabad",
    founded: 2018,
    stage: "Series A",
    size: "300 employees",
    outcome:
      "Kavya Health routes every clinical exception to the right approver — with a full audit trail",
    excerpt:
      "Around-the-clock clinical shifts mean constant swaps, leave, and exceptions. SignHR's workflow engine routes each one through the right approvers and logs every decision — so compliance reviews are an export, not a dread.",
    metrics: [
      { label: "Approval turnaround", value: "same-day" },
      { label: "Decisions logged", value: "100%" },
      { label: "Lost requests", value: "0" },
    ],
    modules: ["workflows", "time-attendance", "security", "reports"],
    story: {
      challenge: [
        "Kavya Health's clinical teams run 24/7, so shift swaps, leave, and exception requests never stop — and they used to bounce around email and chat with no clear owner. Some waited days; some got lost.",
        "For a healthtech company, the bigger problem was proof: showing who approved what, and when, meant digging through inboxes at audit time.",
      ],
      solution: [
        "Kavya built its real processes in SignHR's visual workflow builder — conditional routing (a night-shift swap adds the charge nurse; anything over a threshold escalates), parallel and sequential steps, and smart escalations when an approver is on shift.",
        "Every request carries its comments and decisions in one auditable trail, and approvers act from email or mobile without hunting for context.",
      ],
      results: [
        "Approvals that used to take days now close same-day, and nothing falls through the cracks.",
        "Every decision is logged, so a compliance review went from a dreaded hunt to a five-minute export.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Every approval has a paper trail now — my last compliance review was a five-minute export instead of a week of digging.",
        attribution: "Vidya Nair",
        role: "People Partner, Kavya Health",
      },
    ],
  },
  {
    slug: "vayu-logistics",
    company: "Vayu Logistics",
    feature: "Payroll",
    featureSlug: "payroll",
    sector: "Logistics & supply chain",
    hq: "Gurugram",
    founded: 2017,
    stage: "Series B",
    size: "480 employees",
    outcome:
      "How Vayu Logistics turned attendance and leave into clean payroll inputs across every hub",
    excerpt:
      "Across dozens of hubs, attendance, LOP, and overtime never quite made it into payroll — so each cycle meant three days of spreadsheet reconciliation. Now it's a 20-minute review.",
    metrics: [
      { label: "Payroll prep", value: "3 days → 20 min" },
      { label: "Double entry", value: "0" },
      { label: "Statutory inputs", value: "auto" },
    ],
    modules: ["payroll", "time-attendance", "leave-management", "core-hrms"],
    story: {
      challenge: [
        "Vayu Logistics ran payroll off spreadsheets stitched together from every hub. Attendance, leave, LOP, and overtime had to be re-keyed by hand, and the numbers drifted from reality — an audit once found 18 people on payroll who'd already left.",
        "Each cycle swallowed about three days of reconciliation before anything could be paid.",
      ],
      solution: [
        "SignHR now does the heavy lifting before payday: approved attendance and leave turn into LOP and overtime inputs automatically, salary structures and reimbursements are modeled exactly how Vayu pays, and statutory amounts (PF, ESI, PT, TDS) are computed as inputs.",
        "A reviewed input sheet flags variance against the last cycle before anything leaves SignHR, then exports cleanly to their payroll provider for the payout and filing.",
      ],
      results: [
        "Three days of spreadsheet reconciliation became a 20-minute review, with no double data entry.",
        "Payroll finally matches headcount, and employees pull their own payslips from self-service.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "What used to be three days of spreadsheet reconciliation is a 20-minute review — and the numbers finally match reality.",
        attribution: "Faiza Khan",
        role: "Payroll Lead, Vayu Logistics",
      },
    ],
  },
  {
    slug: "anvaya",
    company: "Anvaya",
    feature: "Mobile",
    featureSlug: "mobile",
    sector: "B2B SaaS",
    hq: "Chennai",
    founded: 2021,
    stage: "Series A",
    size: "95 employees",
    outcome:
      "Anvaya put HR in everyone's pocket — punches, approvals and payslips from the app",
    excerpt:
      "A 95-person team didn't want a quarter-long rollout. With everything on mobile — punches, approvals, payslips, announcements — adoption didn't need a training plan.",
    metrics: [
      { label: "Setup", value: "1 afternoon" },
      { label: "Week-one adoption", value: "95%" },
      { label: "Training sessions", value: "0" },
    ],
    modules: ["mobile", "self-service", "leave-management", "workflows"],
    story: {
      challenge: [
        "Anvaya had outgrown a shared leave spreadsheet, but every HR tool they tried looked like a quarter-long rollout for a 95-person company — and one nobody would actually open.",
        "They needed HR to live where their team already is: on their phones.",
      ],
      solution: [
        "Anvaya set up SignHR in an afternoon and rolled it out entirely on mobile. The app gives employees and managers one dashboard — punches, approvals, payslips, and announcements — with push notifications and real-time updates across locations.",
        "Managers approve leave from their phones, employees self-serve documents and balances, and it keeps working offline when the signal drops.",
      ],
      results: [
        "Ninety-five percent of the team was active in the first week, with zero formal training.",
        "Approvals that used to wait for someone at a desk now happen from a phone in seconds.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "Setup took an afternoon, not a quarter. Our managers approve leave from their phone now — adoption was instant.",
        attribution: "Karthik Iyer",
        role: "Operations Director, Anvaya",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
