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
    company: "Northwind Logistics",
    initials: "AR",
    accent: "purple",
  },
  {
    quote:
      "I was skeptical that anything could fit how we actually run payroll. SignHR handled our edge cases on the second call. We migrated in three weeks.",
    name: "Faiza Khan",
    role: "Payroll Lead",
    company: "Wayne Enterprises India",
    initials: "FK",
    accent: "amber",
  },
  {
    quote:
      "The product is fast, the team is responsive, and the audit log saved me in a compliance review. Hard to ask for more from an HR tool.",
    name: "Marcus Chen",
    role: "Co-founder & COO",
    company: "Stark Industries",
    initials: "MC",
    accent: "blue",
  },
  {
    quote:
      "My favorite part is what didn't happen — no support tickets, no late-night messages asking 'how do I apply leave', no missing payslips at month end.",
    name: "Aisha Patel",
    role: "Head of HR",
    company: "Hooli India",
    initials: "AP",
    accent: "green",
  },
];

export const LOGO_NAMES = [
  "Acme Corp",
  "Northwind",
  "Globex",
  "Initech",
  "Massive Dynamic",
  "Stark Industries",
  "Wayne Enterprises",
  "Hooli",
  "Pied Piper",
  "Cyberdyne",
  "Tyrell Corp",
  "Soylent",
] as const;

export const STATS = [
  { value: 500, suffix: "+", label: "growing teams trust SignHR" },
  { value: 50, suffix: "K+", label: "employees managed daily" },
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
