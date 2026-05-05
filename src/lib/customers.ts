export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  size: string;
  region: string;
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
    slug: "northwind-logistics",
    company: "Northwind Logistics",
    industry: "Logistics & supply chain",
    size: "248 employees",
    region: "Bengaluru, India",
    outcome: "How Northwind cut HR admin time by 70% in six months",
    excerpt:
      "When their headcount tripled in two years, Northwind's HR team was buried in spreadsheets. SignHR replaced four tools and gave them their evenings back.",
    metrics: [
      { label: "HR admin time", value: "−70%" },
      { label: "Tools replaced", value: "4 → 1" },
      { label: "Onboarding time", value: "12 min/hire" },
    ],
    modules: ["core-hrms", "leave-management", "payroll", "workflows"],
    story: {
      challenge: [
        "Northwind grew from 80 to 248 employees in two years. Their HR stack — a combination of BambooHR, Excel, Razorpay XPayroll, and a custom attendance app — couldn't keep up.",
        "Anita Reddy, their Head of People, found herself spending six hours a week reconciling headcount across systems. Onboarding was a half-day exercise. Leave queries flooded the HR Slack channel every Monday.",
        "Worse, an audit in late 2025 turned up 18 employees in payroll who'd already left, and 3 active employees missing from it entirely.",
      ],
      solution: [
        "Northwind chose SignHR as a single source of truth. Migration took an afternoon — SignHR's importer pulled everything from BambooHR and Razorpay XPayroll directly.",
        "The leave policy was rebuilt as code in the policy builder, with carry-forward and probation-aware accruals. Approval workflows replaced the ad-hoc Slack DMs.",
        "Payroll moved from a multi-day reconciliation to a 25-minute, three-step process per cycle. Onboarding became a self-driving checklist that completes itself the moment a new hire signs their offer.",
      ],
      results: [
        "Six months in, Anita's team has gone from 9 weekly hours of reconciliation work to under 2.",
        "Onboarding is now 12 minutes per hire on average, down from 4 hours.",
        "The HR Slack channel went from 60 messages a day to about 5 — most of which are policy clarifications, not status checks.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "We rebuilt our entire org chart in SignHR in an afternoon. It's the first time the chart has matched payroll in three years.",
        attribution: "Anita Reddy",
        role: "Head of People, Northwind Logistics",
      },
      {
        quote:
          "I keep waiting for it to break. It hasn't.",
        attribution: "Anita Reddy",
        role: "Head of People, Northwind Logistics",
      },
    ],
    featured: true,
  },
  {
    slug: "stark-industries",
    company: "Stark Industries",
    industry: "Engineering & manufacturing",
    size: "412 employees",
    region: "Pune, India",
    outcome: "Stark Industries onboards 60 hires a quarter without a hiccup",
    excerpt:
      "Hyper-growth meant Stark was hiring two engineers a week. The old onboarding process was a half-day fire drill per hire. Now it's a self-driving checklist.",
    metrics: [
      { label: "Time per onboarding", value: "12 min" },
      { label: "Day-one readiness", value: "100%" },
      { label: "Hiring velocity", value: "+45%" },
    ],
    modules: ["onboarding", "assets", "self-service", "workflows"],
    story: {
      challenge: [
        "Stark was hiring 60 engineers a quarter and the People Ops team of three was drowning. Each new hire required manual coordination across IT (laptop), Finance (bank), Ops (badge), and Engineering (repo access).",
        "Things slipped. New joiners showed up on day one without functional laptops. Onboarding satisfaction scores dropped two quarters in a row.",
      ],
      solution: [
        "Stark deployed SignHR's onboarding workflows with branch-aware checklists. Asset management linked directly to the workflow — when a hire signs their offer, IT gets a procurement task automatically.",
        "The day-one welcome experience was rebuilt as a personalized landing page with the hire's manager, buddy, and first-week schedule. Account provisioning to Slack, Google, and Notion is fully automated.",
      ],
      results: [
        "Onboarding time dropped from 4 hours per hire to 12 minutes of People Ops attention.",
        "Day-one readiness hit 100% for two consecutive quarters — every new joiner walks in with a working laptop and accounts.",
        "Hiring velocity went up 45% because the bottleneck was no longer People Ops capacity.",
      ],
    },
    pullQuotes: [
      {
        quote:
          "We used to spend half a day prepping for each new hire. Now it's a checklist that prepares itself.",
        attribution: "Marcus Chen",
        role: "People Operations, Stark Industries",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
