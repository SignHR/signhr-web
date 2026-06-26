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
    slug: "krishna-consultancy",
    company: "Krishna Consultancy Services",
    feature: "Task & Project Management",
    featureSlug: "tasks",
    sector: "Business consulting",
    hq: "Pune",
    founded: 2015,
    stage: "Privately held",
    size: "90 consultants",
    outcome: "Every client engagement, on one board",
    excerpt:
      "Client work lived across spreadsheets and WhatsApp, and HR sat in a separate tool. Now projects, recurring delivery checklists, and the consultants doing the work all run in one SignHR workspace.",
    metrics: [
      { label: "On one board", value: "100%" },
      { label: "Status meetings", value: "−60%" },
      { label: "Faster delivery", value: "2×" },
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
    outcome: "Field attendance you can actually prove",
    excerpt:
      "With phlebotomists collecting samples across the city and labs running quality checks all day, Krishna Diagnostics needed proof that work happened where and when it should. Geo tracking, activity trails, and checklists deliver it.",
    metrics: [
      { label: "Punches verified", value: "100%" },
      { label: "Missed QC steps", value: "0" },
      { label: "Audit time", value: "−90%" },
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
    outcome: "An AI HR that scales with every event",
    excerpt:
      "Scaling from 70 staff to hundreds of crew on event days meant a flood of pay and shift questions, and no fast way to see the workforce. Now an AI HR answers the questions and reports give leadership live visibility.",
    metrics: [
      { label: "Repeat HR Qs", value: "−75%" },
      { label: "Headcount", value: "live" },
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
  {
    slug: "accountune",
    company: "Accountune",
    feature: "Core HRMS",
    featureSlug: "core-hrms",
    sector: "Accounting & finance",
    hq: "Bengaluru",
    founded: 2019,
    stage: "Privately held",
    size: "120 employees",
    outcome: "Every employee record in one system",
    excerpt:
      "Employee data was spread across spreadsheets and inboxes, and on-site work was invisible from head office. Accountune moved core HR into SignHR and turned on activity tracking to close both gaps.",
    metrics: [
      { label: "Records unified", value: "100%" },
      { label: "HR admin", value: "−50%" },
      { label: "Field activity", value: "tracked" },
    ],
    modules: ["core-hrms", "geo-tracking"],
    story: {
      challenge: [
        "Accountune's people data lived in spreadsheets, email threads, and a few managers' heads — onboarding, documents, and changes were slow and never quite agreed with each other.",
        "Staff regularly worked at client sites, but head office had no reliable picture of where field time actually went.",
      ],
      solution: [
        "Core HRMS became the single source of truth — profiles, documents, departments, and an audit trail that every change flows through.",
        "Activity and location tracking now captures field work against each employee record, so on-site time is visible without anyone chasing a status update.",
      ],
      results: [
        "Every employee record lives in one place, and routine HR admin dropped by about half.",
        "Field activity is visible at a glance, so head office and on-site teams finally share the same picture.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "All our people data is finally in one place, and I can see what the field teams are doing without a single phone call.",
        attribution: "Priya Nair",
        role: "HR Manager, Accountune",
      },
    ],
  },
  {
    slug: "signaturetech",
    company: "SignatureTech",
    feature: "All-in-one HR",
    featureSlug: "core-hrms",
    sector: "Software & IT services",
    hq: "Indore",
    founded: 2017,
    stage: "Privately held",
    size: "60 employees",
    outcome: "Five HR tools, down to one",
    excerpt:
      "SignatureTech had a different tool for every part of HR and none of them talked to each other. Consolidating onto SignHR put onboarding, attendance, leave, AI HR, and payroll-ready inputs in one place.",
    metrics: [
      { label: "HR tools", value: "5 → 1" },
      { label: "Onboarding", value: "minutes" },
      { label: "Re-keying", value: "0" },
    ],
    modules: [
      "core-hrms",
      "onboarding",
      "time-attendance",
      "leave-management",
      "ask-hr",
      "payroll",
    ],
    story: {
      challenge: [
        "SignatureTech ran HR across a stack of disconnected tools — one for attendance, another for leave, spreadsheets for everything else — so data was re-keyed constantly and never fully agreed.",
        "Onboarding a new hire and prepping payroll both meant stitching those tools together by hand every cycle.",
      ],
      solution: [
        "The team consolidated onto SignHR: core HR, onboarding, attendance, and leave in one workspace, with Ask HR answering employee questions and attendance and leave flowing into clean payroll inputs.",
        "One source of truth means a change made once shows up everywhere, with nothing to reconcile between systems.",
      ],
      results: [
        "Five separate HR tools collapsed into one, ending the constant re-keying.",
        "New hires are set up in minutes and each payroll cycle starts from clean, reconciled inputs.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "We replaced five tools with one. Onboarding takes minutes and payroll prep finally starts from numbers we trust.",
        attribution: "Prem Saini",
        role: "Founder, SignatureTech",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
