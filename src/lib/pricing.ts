export type PricingTier = {
  id: "starter" | "growth" | "enterprise";
  name: string;
  tagline: string;
  monthly: number | null; // per employee per month, USD; null = custom
  annual: number | null; // per employee per month billed annually
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  features: string[];
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For lean teams getting out of spreadsheets.",
    monthly: 4,
    annual: 3,
    ctaLabel: "Start free trial",
    ctaHref: "/book-demo?plan=starter",
    features: [
      "Up to 25 employees",
      "Core HRMS, profiles, org chart",
      "Leave management with policy builder",
      "Web + mobile attendance",
      "Self-service portal",
      "Email support (24h response)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular for scaling teams of 25 to 250.",
    monthly: 7,
    annual: 6,
    highlight: true,
    badge: "Most popular",
    ctaLabel: "Start free trial",
    ctaHref: "/book-demo?plan=growth",
    features: [
      "26 to 250 employees",
      "Everything in Starter",
      "Payroll with statutory compliance",
      "Multi-step approval workflows",
      "Asset management",
      "Onboarding + offboarding flows",
      "Slack + Google integration",
      "Priority support (4h response)",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For 250+ employees and serious compliance needs.",
    monthly: null,
    annual: null,
    ctaLabel: "Talk to sales",
    ctaHref: "/book-demo?plan=enterprise",
    features: [
      "250+ employees",
      "Everything in Growth",
      "SSO + SCIM provisioning",
      "Custom workflows + API access",
      "Audit log export",
      "Dedicated CSM",
      "99.99% SLA",
      "Custom contract + DPA",
    ],
  },
];

export type ComparisonRow = {
  feature: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
};

export type ComparisonGroup = {
  category: string;
  rows: ComparisonRow[];
};

export const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    category: "People & profiles",
    rows: [
      {
        feature: "Employee profiles",
        starter: "Up to 25",
        growth: "Up to 250",
        enterprise: "Unlimited",
      },
      { feature: "Org chart", starter: true, growth: true, enterprise: true },
      {
        feature: "Document vault",
        starter: "5 GB",
        growth: "100 GB",
        enterprise: "Custom",
      },
      {
        feature: "Custom fields",
        starter: "10",
        growth: "50",
        enterprise: "Unlimited",
      },
      {
        feature: "Field-level permissions",
        starter: false,
        growth: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Time & leave",
    rows: [
      {
        feature: "Leave policies",
        starter: "Up to 5",
        growth: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        feature: "Mobile clock-in",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Geofencing + IP rules",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Shift scheduler",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Auto regularization",
        starter: false,
        growth: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Payroll",
    rows: [
      {
        feature: "Payroll runs",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Statutory compliance",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Multi-currency",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        feature: "Multi-entity",
        starter: false,
        growth: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Workflows & automation",
    rows: [
      {
        feature: "Built-in workflows",
        starter: "5",
        growth: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        feature: "Custom workflow builder",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Conditional approvals",
        starter: false,
        growth: true,
        enterprise: true,
      },
      { feature: "API access", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Security & support",
    rows: [
      { feature: "SSO", starter: false, growth: false, enterprise: true },
      {
        feature: "SCIM provisioning",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        feature: "Audit log export",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        feature: "Support",
        starter: "Email 24h",
        growth: "Priority 4h",
        enterprise: "Dedicated CSM",
      },
      { feature: "SLA", starter: "99.5%", growth: "99.9%", enterprise: "99.99%" },
    ],
  },
];

export const PRICING_FAQ = [
  {
    q: "Is there a free trial?",
    a: "Yes — 14 days, no credit card. You can invite your whole team and use every feature on the Growth plan during the trial.",
  },
  {
    q: "Can I switch plans later?",
    a: "Anytime, in either direction. We prorate the difference automatically and never lock you in.",
  },
  {
    q: "How does per-employee pricing work?",
    a: "You pay only for active employees on the platform. New hires count from their join date. Departures stop counting on their last working day.",
  },
  {
    q: "Do you charge for contractors and interns?",
    a: "Only if you want them in the system with full access. You can also add them as light profiles for free.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Credit card, ACH, UPI, and bank transfer for annual contracts. Enterprise customers can pay against an invoice on net-30 terms.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We're SOC 2 Type II compliant, encrypt data in transit and at rest, and offer SSO and SCIM on Enterprise. See our security page for the full list.",
  },
  {
    q: "Can I import data from my current HR system?",
    a: "Absolutely. We have direct importers for BambooHR, Zoho People, Keka, and GreytHR — and a CSV importer for everyone else. Most teams migrate in under an afternoon.",
  },
  {
    q: "What if we need a feature you don't have yet?",
    a: "Tell us — we ship every two weeks based on what customers ask for. Enterprise customers can request roadmap commitments in writing.",
  },
];
