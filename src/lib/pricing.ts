export const PRICING_CURRENCY = {
  code: "INR",
  symbol: "₹",
} as const;

// ─── Core HR + Add-ons model ────────────────────────────────────────────────

export const CORE_HR = {
  name: "Core HR",
  tagline: "Everything a growing team needs, in one connected workspace.",
  basePerEmpMonth: 15, // INR, per employee / month
  features: [
    "Employee Management — central profiles, records, org structure, and full lifecycle.",
    "Attendance Management — web, mobile & kiosk check-in/out with selfie + GPS, shifts and timesheets.",
    "Leave & Request Management — policies, balances, and one-tap multi-level approvals.",
    "Asset Management — assign and track every device; know who has what.",
    "Document Generation — branded offers, contracts, and HR letters with e-signature.",
    "Geo-fencing — restrict attendance punches to approved office or site locations.",
    "Approval Workflows — multi-step, conditional, and parallel approvals with escalations.",
    "Onboarding & Offboarding — structured day-one onboarding and clean exit checklists.",
    "Mobile App — free SignHR app (iOS & Android) for every employee.",
  ],
} as const;

export type AddonUnit = "per-emp-month" | "flat-month";

export type Addon = {
  id: "tasks" | "geo" | "activity" | "reports" | "askhr" | "ai-recruitment";
  name: string;
  blurb: string;
  price: number; // INR
  unit: AddonUnit;
};

export const ADDONS: Addon[] = [
  {
    id: "tasks",
    name: "Task Management",
    blurb: "Assign, track, and close out work across the team.",
    price: 5,
    unit: "per-emp-month",
  },
  {
    id: "geo",
    name: "Geo Tagging",
    blurb: "Realtime employee location tracking for field and on-site teams.",
    price: 30,
    unit: "per-emp-month",
  },
  {
    id: "activity",
    name: "Activity Tracking",
    blurb: "Track app and screen activity to see how work hours are really spent.",
    price: 50,
    unit: "per-emp-month",
  },
  {
    id: "reports",
    name: "Reports",
    blurb: "Ready-made dashboards and exports across headcount, attendance, leave, and payroll.",
    price: 40,
    unit: "flat-month",
  },
  {
    id: "askhr",
    name: "AI HR",
    blurb: "AI HR assistant — answers leave and pay questions from live data, policy cited.",
    price: 50,
    unit: "flat-month",
  },
  {
    id: "ai-recruitment",
    name: "AI Powered Recruitment",
    blurb: "AI-assisted hiring — screen, shortlist, and rank candidates automatically.",
    price: 20,
    unit: "flat-month",
  },
];

export type BillingTerm = {
  id: "monthly" | "1y" | "3y";
  label: string;
  discount: number; // fractional discount, 0–1 (e.g. 0.1 = 10% off)
  badge?: string;
};

export const BILLING_TERMS: BillingTerm[] = [
  { id: "monthly", label: "Monthly", discount: 0 },
  { id: "1y", label: "Yearly", discount: 0.1, badge: "Save 10%" },
  { id: "3y", label: "3 Years", discount: 0.2, badge: "Save 20%" },
];

export type QuoteLine = {
  /** "core" for the Core HR base, otherwise the selected add-on's id. */
  id: "core" | Addon["id"];
  label: string;
  unit: AddonUnit;
  unitPrice: number; // INR — per employee/month, or flat/month
  employees: number; // headcount applied to this line (per-emp lines); 0 for flat lines
  monthlyBase: number; // INR/month for this line, before the term discount
};

export type Quote = {
  perEmpMonth: number; // Core HR base per-employee/month at the selected term (excludes add-ons)
  lines: QuoteLine[]; // Core HR + each selected add-on, at base (pre-discount) monthly amounts
  monthlyTotal: number; // whole rupees
  yearlyTotal: number; // whole rupees
  savedVsMonthlyYear: number; // whole rupees saved per year vs monthly term
};

const round = (n: number): number => Math.round(n);
const round1 = (n: number): number => Math.round(n * 10) / 10;

/**
 * Pure pricing calculator. The term discount applies to the whole bundle,
 * including AI HR's flat fee. Each selected per-employee add-on can carry its
 * own headcount via `addonEmployees`; when omitted it falls back to `employees`
 * (the Core headcount). Flat add-ons ignore `addonEmployees`.
 */
export function computeQuote({
  employees,
  addonIds,
  termId,
  addonEmployees,
}: {
  employees: number;
  addonIds: Addon["id"][];
  termId: BillingTerm["id"];
  addonEmployees?: Partial<Record<Addon["id"], number>>;
}): Quote {
  const term = BILLING_TERMS.find((t) => t.id === termId) ?? BILLING_TERMS[0];
  const multiplier = 1 - term.discount;
  const emp = employees > 0 ? employees : 1;

  // Headcount for a per-employee add-on: its own count if given (and valid),
  // otherwise the Core headcount.
  const addonEmp = (id: Addon["id"]): number => {
    const n = addonEmployees?.[id];
    return n !== undefined && n > 0 ? n : emp;
  };

  const selected = ADDONS.filter((a) => addonIds.includes(a.id));

  // Itemised base amounts (pre-discount). Their sum is the bundle's monthly
  // base, so the breakdown always reconciles to the displayed total once the
  // term discount is applied. Add-on lines follow ADDONS order.
  const lines: QuoteLine[] = [
    {
      id: "core",
      label: CORE_HR.name,
      unit: "per-emp-month",
      unitPrice: CORE_HR.basePerEmpMonth,
      employees: emp,
      monthlyBase: CORE_HR.basePerEmpMonth * emp,
    },
    ...selected.map((a): QuoteLine => {
      const lineEmp = a.unit === "per-emp-month" ? addonEmp(a.id) : 0;
      return {
        id: a.id,
        label: a.name,
        unit: a.unit,
        unitPrice: a.price,
        employees: lineEmp,
        monthlyBase: a.unit === "per-emp-month" ? a.price * lineEmp : a.price,
      };
    }),
  ];

  const monthlyBase = lines.reduce((sum, l) => sum + l.monthlyBase, 0);

  return {
    perEmpMonth: round1(CORE_HR.basePerEmpMonth * multiplier),
    lines,
    monthlyTotal: round(monthlyBase * multiplier),
    yearlyTotal: round(monthlyBase * 12 * multiplier),
    savedVsMonthlyYear: round(monthlyBase * 12 * term.discount),
  };
}

export const PRICING_FAQ = [
  {
    q: "How does per-employee pricing work?",
    a: "Core HR is ₹15 per active employee per month. New hires count from their join date; departures stop counting on their last working day.",
  },
  {
    q: "How are the add-ons billed?",
    a: "Task Management (₹5), Geo Tagging (₹30), and Activity Tracking (₹50) are billed per employee per month. AI HR (₹50), Reports (₹40), and AI Powered Recruitment (₹20) are flat per month, regardless of headcount. Add-ons sit on top of Core HR and can be turned on or off anytime.",
  },
  {
    q: "What do the 1-year and 3-year terms save me?",
    a: "A 1-year term takes 10% off your whole bill; a 3-year term takes 20% off — and the discount applies to Core HR and every add-on, including AI HR.",
  },
  {
    q: "Can I switch plans or change add-ons later?",
    a: "Anytime, in either direction. We prorate the difference automatically and never lock you in.",
  },
  {
    q: "Are prices inclusive of GST?",
    a: "All prices are in INR and exclusive of GST. Subscriptions are annual and renew each year; GST is charged as applicable.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, credit/debit card, net banking, and bank transfer (NEFT/RTGS). You can also pay against a GST invoice.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We're SOC 2 Type II compliant and encrypt data in transit and at rest. See our security page for the full list.",
  },
  {
    q: "Can I import data from my current HR system?",
    a: "Absolutely. We have direct importers for BambooHR, Zoho People, Keka, and GreytHR — and a CSV importer for everyone else.",
  },
];
