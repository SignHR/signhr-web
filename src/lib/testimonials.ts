export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: "purple" | "amber" | "blue" | "green";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced four tools and a spreadsheet with SignHR. Six months in, our HR team has its evenings back and onboarding takes a fraction of the time.",
    name: "Anita Reddy",
    role: "Head of People",
    company: "Vayu Logistics",
    initials: "AR",
    accent: "purple",
  },
  {
    quote:
      "I was skeptical anything could fit how we actually run payroll. SignHR handled our edge cases on the second call — we migrated in three weeks.",
    name: "Faiza Khan",
    role: "Payroll Lead",
    company: "Suvarna Retail",
    initials: "FK",
    accent: "amber",
  },
  {
    quote:
      "Fast product, responsive team, and the audit log saved me in a compliance review. Hard to ask for more from an HR tool.",
    name: "Rohan Mehta",
    role: "Co-founder & COO",
    company: "Nuvora",
    initials: "RM",
    accent: "blue",
  },
  {
    quote:
      "My favorite part is what didn't happen — no 'how do I apply leave' pings, no missing payslips at month end.",
    name: "Aisha Patel",
    role: "Head of HR",
    company: "Maitri Foods",
    initials: "AP",
    accent: "green",
  },
  {
    quote:
      "Setup took an afternoon, not a quarter. Our managers approve leave from WhatsApp now — adoption was instant.",
    name: "Karthik Iyer",
    role: "Operations Director",
    company: "Pragati Motors",
    initials: "KI",
    accent: "purple",
  },
  {
    quote:
      "Ask HR quietly answers the questions that used to hit my inbox at 9pm — and the team trusts it because every answer cites the policy.",
    name: "Vidya Nair",
    role: "People Partner",
    company: "Tarang Studios",
    initials: "VN",
    accent: "amber",
  },
];

// Fictional, India-flavoured placeholder brands for the logo cloud.
export const LOGO_NAMES = [
  "Zolva",
  "Indara Labs",
  "Suvarna Retail",
  "Vayu Logistics",
  "Tarang Studios",
  "Kavya Health",
  "Brij Traders",
  "Anvaya",
  "Nuvora",
  "Maitri Foods",
  "Pragati Motors",
  "Sankalp Tech",
] as const;

export const STATS = [
  { value: 50, suffix: "+", label: "growing teams trust SignHR" },
  { value: 5, suffix: "K+", label: "employees managed daily" },
  { value: 10, suffix: " min", label: "average setup time" },
  { value: 99.9, suffix: "%", label: "uptime, measured monthly" },
] as const;

export const INTEGRATIONS = [
  "Google Workspace",
  "Microsoft 365",
  "Zoom",
  "QuickBooks",
  "Stripe",
  "Razorpay",
  "Notion",
  "Linear",
  "GitHub",
  "Okta",
  "Jira",
  "Workplace",
  "Zapier",
  "Tally",
  "Cleartax",
] as const;
