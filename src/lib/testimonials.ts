export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: "purple" | "amber" | "blue" | "green";
  /** 1–5 stars shown on the card. Omitted = 5. */
  rating?: number;
};

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
