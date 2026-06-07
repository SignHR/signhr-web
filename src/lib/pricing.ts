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
  id: "tasks" | "geo" | "askhr";
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
    id: "askhr",
    name: "Ask HR",
    blurb: "AI HR assistant — answers leave and pay questions from live data, policy cited.",
    price: 50,
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

export type Quote = {
  perEmpMonth: number; // Core HR base per-employee/month at the selected term (excludes add-ons)
  monthlyTotal: number; // whole rupees
  yearlyTotal: number; // whole rupees
  savedVsMonthlyYear: number; // whole rupees saved per year vs monthly term
};

const round = (n: number): number => Math.round(n);
const round1 = (n: number): number => Math.round(n * 10) / 10;

/**
 * Pure pricing calculator. The term discount applies to the whole bundle,
 * including Ask HR's flat fee.
 */
export function computeQuote({
  employees,
  addonIds,
  termId,
}: {
  employees: number;
  addonIds: Addon["id"][];
  termId: BillingTerm["id"];
}): Quote {
  const term = BILLING_TERMS.find((t) => t.id === termId) ?? BILLING_TERMS[0];
  const multiplier = 1 - term.discount;
  const emp = employees > 0 ? employees : 1;

  const selected = ADDONS.filter((a) => addonIds.includes(a.id));
  const perEmpAddon = selected
    .filter((a) => a.unit === "per-emp-month")
    .reduce((sum, a) => sum + a.price, 0);
  const flatAddon = selected
    .filter((a) => a.unit === "flat-month")
    .reduce((sum, a) => sum + a.price, 0);

  const perEmpMonthBase = CORE_HR.basePerEmpMonth + perEmpAddon;
  const monthlyBase = perEmpMonthBase * emp + flatAddon;

  return {
    perEmpMonth: round1(CORE_HR.basePerEmpMonth * multiplier),
    monthlyTotal: round(monthlyBase * multiplier),
    yearlyTotal: round(monthlyBase * 12 * multiplier),
    savedVsMonthlyYear: round(monthlyBase * 12 * term.discount),
  };
}

export const PRICING_FAQ = [
  {
    q: "Is there a free trial?",
    a: "Yes — 3 months, no credit card. Invite your whole team and use every Core HR feature during the trial.",
  },
  {
    q: "How does per-employee pricing work?",
    a: "Core HR is ₹15 per active employee per month. New hires count from their join date; departures stop counting on their last working day.",
  },
  {
    q: "How are the add-ons billed?",
    a: "Task Management (₹5) and Geo Tagging (₹30) are billed per employee per month. Ask HR is a flat ₹50 per month regardless of headcount. Add-ons sit on top of Core HR and can be turned on or off anytime.",
  },
  {
    q: "What do the 1-year and 3-year terms save me?",
    a: "A 1-year term takes 10% off your whole bill; a 3-year term takes 20% off — and the discount applies to Core HR and every add-on, including Ask HR.",
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
