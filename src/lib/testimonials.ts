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
      "Our people ask it the things they used to email me at 9pm — and it answers correctly, with the policy attached. My inbox finally went quiet.",
    name: "Anita Reddy",
    role: "Head of People",
    company: "Vyom Pay",
    initials: "AR",
    accent: "purple",
  },
  {
    quote:
      "What used to be three days of spreadsheet reconciliation is a 20-minute review — and the numbers finally match reality.",
    name: "Faiza Khan",
    role: "Payroll Lead",
    company: "Vayu Logistics",
    initials: "FK",
    accent: "amber",
  },
  {
    quote:
      "We used to dread every exit. Now joining and leaving are both checklists that run themselves.",
    name: "Karan Malhotra",
    role: "People Operations",
    company: "Meraki Labs",
    initials: "KM",
    accent: "blue",
  },
  {
    quote:
      "Warehouse, retail, and office are finally on one system — our managers approve timesheets on their phones over chai.",
    name: "Aisha Patel",
    role: "Head of HR",
    company: "Tilse",
    initials: "AP",
    accent: "green",
    rating: 4,
  },
  {
    quote:
      "Setup took an afternoon, not a quarter. Our managers approve leave from their phone now — adoption was instant.",
    name: "Karthik Iyer",
    role: "Operations Director",
    company: "Anvaya",
    initials: "KI",
    accent: "purple",
  },
  {
    quote:
      "Every approval has a paper trail now — my last compliance review was a five-minute export.",
    name: "Vidya Nair",
    role: "People Partner",
    company: "Kavya Health",
    initials: "VN",
    accent: "amber",
  },
];

// Fictional, India-flavoured showcase brands. The six leading names are the
// case-study companies in lib/customers.ts; the rest add density.
export const LOGO_NAMES = [
  "Vyom Pay",
  "Meraki Labs",
  "Tilse",
  "Kavya Health",
  "Vayu Logistics",
  "Anvaya",
  "Zolva",
  "Indara Labs",
  "Suvarna Retail",
  "Nuvora",
  "Brij Traders",
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
