import type { LucideIcon } from "lucide-react";
import {
  Users,
  Clock,
  CalendarDays,
  Wallet,
  UserPlus,
  UserMinus,
  Sparkles,
  GitBranch,
  Laptop,
  FileText,
  Shield,
  MapPin,
  Smartphone,
  CheckCircle2,
  Bell,
  Layers,
  Receipt,
  Inbox,
  ClipboardCheck,
  Workflow,
  Building2,
  Network,
  KeyRound,
  PackageCheck,
  Boxes,
  ScanLine,
} from "lucide-react";
import { FEATURE_MODULES } from "./nav";

export type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type Spotlight = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  side: "left" | "right";
  mockup: SpotlightMockup;
};

export type SpotlightMockup =
  | { kind: "profile" }
  | { kind: "attendance" }
  | { kind: "leave-calendar" }
  | { kind: "payroll" }
  | { kind: "onboarding" }
  | { kind: "offboarding" }
  | { kind: "self-service" }
  | { kind: "workflow" }
  | { kind: "assets" }
  | { kind: "org-chart" };

export type FeaturePage = {
  slug: string;
  category: string;
  hero: {
    title: string;
    titleAccent?: string;
    description: string;
  };
  metaDescription: string;
  capabilities: Capability[];
  spotlights: Spotlight[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  related: string[]; // module slugs
};

export const FEATURE_PAGES: Record<string, FeaturePage> = {
  "core-hrms": {
    slug: "core-hrms",
    category: "Core HRMS",
    hero: {
      title: "One source of truth",
      titleAccent: "for everyone",
      description:
        "Profiles, contracts, documents, and org charts that always match reality. Your HR data stops living in five different spreadsheets.",
    },
    metaDescription:
      "A modern HRIS for growing teams. Profiles, documents, org charts, and audit trails that finally agree with each other.",
    capabilities: [
      {
        icon: Users,
        title: "Rich employee profiles",
        body: "Demographics, contracts, compensation history, emergency contacts, and custom fields — all on one screen.",
      },
      {
        icon: Network,
        title: "Live org chart",
        body: "Drag-and-drop reporting lines that update in real time and stay in sync with payroll.",
      },
      {
        icon: FileText,
        title: "Document vault",
        body: "Offer letters, IDs, and policy acknowledgments stored with version history and access logs.",
      },
      {
        icon: Shield,
        title: "Field-level permissions",
        body: "HR sees salary, managers don't. Set granular access without writing a single line of code.",
      },
      {
        icon: Building2,
        title: "Multi-entity ready",
        body: "Run subsidiaries, regions, and currencies from a single workspace with isolated data.",
      },
      {
        icon: ClipboardCheck,
        title: "Audit trail by default",
        body: "Every edit is logged with who, what, and when — compliance teams love this.",
      },
    ],
    spotlights: [
      {
        eyebrow: "PROFILE",
        title: "The profile your team actually keeps up to date",
        body: "Stop chasing people for missing PAN numbers. Self-service profiles make employees the source of truth — with HR holding the lock on what they can change.",
        bullets: [
          "Inline edit with field-level locks for HR-only data",
          "Custom fields for visa status, certifications, equipment",
          "Emergency contacts and dependents tracked privately",
        ],
        side: "right",
        mockup: { kind: "profile" },
      },
      {
        eyebrow: "ORG CHART",
        title: "An org chart you can trust on a Monday",
        body: "Reorgs, promotions, and new hires update everywhere instantly. Your CEO can finally print the chart without a redline meeting.",
        bullets: [
          "Drag-and-drop reporting changes",
          "Dotted-line relationships supported",
          "Export to PDF, PNG, or share a live link",
        ],
        side: "left",
        mockup: { kind: "org-chart" },
      },
    ],
    testimonial: {
      quote:
        "We rebuilt our entire org chart in SignHR in an afternoon. It's the first time the chart has matched payroll in three years.",
      name: "Anita Reddy",
      role: "Head of People",
      company: "Northwind Logistics",
      avatar: "AR",
    },
    related: ["self-service", "onboarding", "workflows"],
  },

  "time-attendance": {
    slug: "time-attendance",
    category: "Time & Attendance",
    hero: {
      title: "Clock in. Or don't.",
      titleAccent: "Either way, we've got it.",
      description:
        "Punch in from a browser, phone, or kiosk. Geofencing, IP rules, and shift schedules — all in one timesheet that managers can actually approve in under a minute.",
    },
    metaDescription:
      "Web, mobile, and kiosk attendance with geofencing, shift scheduling, and timesheet approvals built for hybrid teams.",
    capabilities: [
      {
        icon: Smartphone,
        title: "Mobile clock-in",
        body: "iOS and Android apps with geofence, selfie capture, and offline punch sync.",
      },
      {
        icon: MapPin,
        title: "Geo + IP rules",
        body: "Restrict punches to office Wi-Fi or a 50m radius — without policing employees.",
      },
      {
        icon: Layers,
        title: "Shift scheduler",
        body: "Rotating shifts, split shifts, night shifts, weekly off cycles — drag, drop, publish.",
      },
      {
        icon: CheckCircle2,
        title: "Auto regularization",
        body: "Missed punches surface to the employee, not the manager's email inbox.",
      },
      {
        icon: Clock,
        title: "Real-time timesheets",
        body: "Live dashboard of who's in, who's late, who's on leave — across every location.",
      },
      {
        icon: Bell,
        title: "Smart nudges",
        body: "Friendly reminders for forgotten clock-outs. No 9pm 'where's your timesheet' messages.",
      },
    ],
    spotlights: [
      {
        eyebrow: "MOBILE",
        title: "Clock-in that respects your team's time",
        body: "One tap. Geo-verified. Synced. The fastest way to capture attendance — without forcing anyone to install yet another tracking tool.",
        bullets: [
          "Selfie + GPS punch with on-device verification",
          "Works offline — syncs when back online",
          "Configurable per team, location, or role",
        ],
        side: "right",
        mockup: { kind: "attendance" },
      },
      {
        eyebrow: "SCHEDULING",
        title: "Shifts that schedule themselves",
        body: "Build a template once, repeat it forever. Swap, copy, or auto-fill from rules — and let the system tell people what's changed.",
        bullets: [
          "Rotating, split, and night shift support",
          "Conflict detection (no double-booked employees)",
          "Notifications go to the right people, no more, no fewer",
        ],
        side: "left",
        mockup: { kind: "leave-calendar" },
      },
    ],
    testimonial: {
      quote:
        "We cut our timesheet processing from two days to twenty minutes. Our store managers now do it on their phones over chai.",
      name: "Karthik Iyer",
      role: "Operations Director",
      company: "Globex Retail",
      avatar: "KI",
    },
    related: ["leave-management", "workflows", "payroll"],
  },

  "leave-management": {
    slug: "leave-management",
    category: "Leave Management",
    hero: {
      title: "Time off should be easy",
      titleAccent: "for everyone",
      description:
        "Policies that match how you actually work. Balances that update themselves. Approvals that don't bounce around six inboxes. Your team gets a real break.",
    },
    metaDescription:
      "Configurable leave policies, automatic accruals, team calendars, and one-click approvals. Built for hybrid and global teams.",
    capabilities: [
      {
        icon: CalendarDays,
        title: "Any policy, modeled",
        body: "Annual, sick, casual, comp-off, sabbatical, menstrual, paternity — all configurable, all auditable.",
      },
      {
        icon: Workflow,
        title: "Auto accruals",
        body: "Monthly, quarterly, anniversary, prorated for joiners — never manually adjust a balance again.",
      },
      {
        icon: Users,
        title: "Team calendar",
        body: "See who's out at a glance, with conflicts surfaced before they become a problem.",
      },
      {
        icon: CheckCircle2,
        title: "One-click approvals",
        body: "Slack, email, or in-app — managers approve in seconds with full context.",
      },
      {
        icon: Bell,
        title: "Public holidays",
        body: "Country-aware calendars for your global team. We handle Diwali and Thanksgiving.",
      },
      {
        icon: Receipt,
        title: "Year-end true-up",
        body: "Carry-forward, encashment, lapse — all automated against your policy rules.",
      },
    ],
    spotlights: [
      {
        eyebrow: "REQUEST",
        title: "Two taps to time off",
        body: "Pick your dates. See your balance. Hit submit. Your manager gets a Slack ping with everything they need to decide.",
        bullets: [
          "Live balance with carry-forward visible",
          "Half-day and hourly leave supported",
          "Cover-by suggestions surface from your team",
        ],
        side: "right",
        mockup: { kind: "leave-calendar" },
      },
      {
        eyebrow: "POLICY",
        title: "Policies as code, kind of",
        body: "Define your rules in plain English. SignHR enforces them. No more spreadsheet-based exceptions that nobody can find six months later.",
        bullets: [
          "Eligibility based on tenure, role, location",
          "Probation-aware accruals",
          "Negative-balance and grace-period rules",
        ],
        side: "left",
        mockup: { kind: "workflow" },
      },
    ],
    testimonial: {
      quote:
        "Our policy used to be a 14-page PDF nobody read. Now it's a button. Leave queries dropped by 80%.",
      name: "Priya Mehta",
      role: "HR Manager",
      company: "Initech Software",
      avatar: "PM",
    },
    related: ["time-attendance", "workflows", "self-service"],
  },

  payroll: {
    slug: "payroll",
    category: "Payroll",
    hero: {
      title: "Transparent compensation,",
      titleAccent: "every cycle",
      description:
        "Build the salary structure that fits your business. Run payroll in three steps. Send payslips your employees can actually understand. Done before lunch.",
    },
    metaDescription:
      "Configurable salary components, payroll runs, payslips, and statutory compliance — all in a few clicks.",
    capabilities: [
      {
        icon: Wallet,
        title: "Flexible salary structures",
        body: "Basic, HRA, allowances, deductions, reimbursements — modeled exactly how you pay.",
      },
      {
        icon: Receipt,
        title: "Payslips that explain themselves",
        body: "Beautiful, downloadable, and clear. No more 'what is this deduction' Slack threads.",
      },
      {
        icon: ClipboardCheck,
        title: "Statutory built in",
        body: "PF, ESI, TDS, PT calculated automatically with the right state rules.",
      },
      {
        icon: Layers,
        title: "Pre-payroll inputs",
        body: "Attendance, leave, bonuses, and ad-hoc items flow in without manual re-entry.",
      },
      {
        icon: CheckCircle2,
        title: "Approval workflow",
        body: "Multi-stage payroll approval with full diff view before money moves.",
      },
      {
        icon: FileText,
        title: "Reports your CFO loves",
        body: "Salary register, JV, bank advice, and Form 16 — generated, not assembled.",
      },
    ],
    spotlights: [
      {
        eyebrow: "RUN",
        title: "Payroll in three calm steps",
        body: "Pull inputs. Review the variance. Approve. The system does the rest — including bank file generation and payslip distribution.",
        bullets: [
          "Variance flagging vs last cycle",
          "What-if calculator for one-off changes",
          "Audit log for every adjustment",
        ],
        side: "right",
        mockup: { kind: "payroll" },
      },
      {
        eyebrow: "PAYSLIP",
        title: "Payslips your team understands",
        body: "Clear breakdowns, year-to-date totals, tax summaries — and a download button that actually works on a phone.",
        bullets: [
          "Self-service archive of every cycle",
          "PDF + secure share link",
          "Customizable with your logo and notes",
        ],
        side: "left",
        mockup: { kind: "self-service" },
      },
    ],
    testimonial: {
      quote:
        "First payroll I ran end-to-end in 22 minutes. I keep waiting for it to break. It hasn't.",
      name: "Faiza Khan",
      role: "Payroll Lead",
      company: "Wayne Enterprises India",
      avatar: "FK",
    },
    related: ["core-hrms", "time-attendance", "workflows"],
  },

  onboarding: {
    slug: "onboarding",
    category: "Onboarding",
    hero: {
      title: "First day,",
      titleAccent: "done in minutes",
      description:
        "Send the offer. Collect the documents. Sign the contract. Provision the laptop. All before they've poured their first coffee on day one.",
    },
    metaDescription:
      "Offer letters, document collection, e-signatures, and welcome flows — onboarding that respects everyone's time.",
    capabilities: [
      {
        icon: UserPlus,
        title: "Branded offer letters",
        body: "Templates that match your voice, populated from data, sent in a click.",
      },
      {
        icon: FileText,
        title: "Document collection",
        body: "ID proofs, PAN, bank, education — collected through a clean checklist, not 14 emails.",
      },
      {
        icon: ClipboardCheck,
        title: "E-signatures built in",
        body: "Legally valid contracts signed without a third tool to manage.",
      },
      {
        icon: Workflow,
        title: "Pre-boarding workflow",
        body: "IT, finance, ops, and people-ops tasks routed automatically before day one.",
      },
      {
        icon: Sparkles,
        title: "Welcome experience",
        body: "Personalized landing page with their team, manager, and first-week schedule.",
      },
      {
        icon: CheckCircle2,
        title: "Day-one ready",
        body: "Email, Slack, asset assignment all triggered the moment they accept the offer.",
      },
    ],
    spotlights: [
      {
        eyebrow: "OFFER",
        title: "From verbal yes to signed contract in hours",
        body: "Generate the offer from your template, send it for review, push it to the candidate. They sign on their phone and you're already provisioning.",
        bullets: [
          "Template variables for role, comp, location",
          "Approval chain before the offer goes out",
          "Signed copies stored automatically",
        ],
        side: "right",
        mockup: { kind: "onboarding" },
      },
      {
        eyebrow: "DAY ONE",
        title: "A first day that doesn't feel like a fire drill",
        body: "Their laptop is ready. Their accounts work. Their schedule is in their inbox. Their manager has a one-pager. They feel welcome — because the system did the boring work.",
        bullets: [
          "Auto-create accounts in Slack, Google, Notion",
          "First-week schedule with intro meetings",
          "Buddy program assignment",
        ],
        side: "left",
        mockup: { kind: "workflow" },
      },
    ],
    testimonial: {
      quote:
        "We used to spend half a day prepping for each new hire. Now it's a checklist that prepares itself. Our last cohort was onboarded in twelve minutes per person.",
      name: "Marcus Chen",
      role: "People Operations",
      company: "Stark Industries",
      avatar: "MC",
    },
    related: ["core-hrms", "assets", "workflows"],
  },

  offboarding: {
    slug: "offboarding",
    category: "Offboarding",
    hero: {
      title: "Exits done",
      titleAccent: "with dignity",
      description:
        "Notice, handover, asset return, IT access, full-and-final settlement — handled in a single thread that nobody has to remember to start.",
    },
    metaDescription:
      "Structured offboarding workflows that protect data, return assets, and pay people what they're owed — without the awkwardness.",
    capabilities: [
      {
        icon: UserMinus,
        title: "Notice and handover",
        body: "Auto-generate handover docs. Transfer projects. Schedule the exit interview.",
      },
      {
        icon: Laptop,
        title: "Asset return",
        body: "Track every laptop, badge, and headphone — including who signed for what.",
      },
      {
        icon: KeyRound,
        title: "IT access removal",
        body: "Revoke Slack, Google, Notion, and SSO with one click on the last working day.",
      },
      {
        icon: Receipt,
        title: "Final settlement",
        body: "Notice pay, leave encashment, gratuity, and tax — calculated and approved.",
      },
      {
        icon: FileText,
        title: "Experience letter",
        body: "Generated automatically from your template the day they leave.",
      },
      {
        icon: Shield,
        title: "Data lifecycle",
        body: "Personal data archived per your retention policy, with full audit trail.",
      },
    ],
    spotlights: [
      {
        eyebrow: "WORKFLOW",
        title: "A respectful exit, end to end",
        body: "Resignation triggers a checklist that pulls in every team that needs to act. Nothing slips. Nothing awkward gets missed. People leave on a high note.",
        bullets: [
          "Configurable per role, location, and tenure",
          "Auto-routed to IT, finance, and people-ops",
          "Reminders before, not after, the deadline",
        ],
        side: "right",
        mockup: { kind: "offboarding" },
      },
      {
        eyebrow: "F&F",
        title: "Full and final, calculated correctly",
        body: "Notice period adjustments, leave encashment, gratuity eligibility — all computed automatically and ready for review before the last day.",
        bullets: [
          "Live preview as inputs change",
          "Tax-aware computation",
          "Bank-ready output the same day",
        ],
        side: "left",
        mockup: { kind: "payroll" },
      },
    ],
    testimonial: {
      quote:
        "Offboarding used to be the worst week of every month. Now it's a button and a calendar invite for the exit interview. People leave saying nice things about us.",
      name: "Elena Schmidt",
      role: "VP People",
      company: "Massive Dynamic",
      avatar: "ES",
    },
    related: ["assets", "payroll", "workflows"],
  },

  "self-service": {
    slug: "self-service",
    category: "Self-service",
    hero: {
      title: "Your team,",
      titleAccent: "empowered",
      description:
        "Eighty percent of HR tickets are answers people could find themselves. Self-service in SignHR is so good, your team would rather use it than ping you on Slack.",
    },
    metaDescription:
      "An employee self-service portal that actually gets used. Profile, requests, payslips, documents — all in one mobile-friendly place.",
    capabilities: [
      {
        icon: Smartphone,
        title: "Mobile-first portal",
        body: "Everything an employee needs, optimized for the phone in their pocket.",
      },
      {
        icon: Inbox,
        title: "One-stop request center",
        body: "Leave, regularization, comp-off, document, expense — submit, track, done.",
      },
      {
        icon: FileText,
        title: "Documents on demand",
        body: "Payslips, Form 16, address proof, NOC — generated in the moment they're needed.",
      },
      {
        icon: Bell,
        title: "Notifications that respect them",
        body: "Smart digests, not 14 emails a day. Quiet hours honored.",
      },
      {
        icon: Users,
        title: "Team directory",
        body: "Searchable, filter by team or location, with profile cards that don't feel creepy.",
      },
      {
        icon: ClipboardCheck,
        title: "Tasks that surface themselves",
        body: "Pending items always visible, with deep links straight to the action.",
      },
    ],
    spotlights: [
      {
        eyebrow: "PORTAL",
        title: "The HR portal your team will bookmark",
        body: "Most HR portals look like they were built in 2007. This one feels like a consumer app — because it is. Your employees will actually use it.",
        bullets: [
          "Personalized home with what matters today",
          "Search across people, policies, and documents",
          "Dark mode for the night-shift folks",
        ],
        side: "right",
        mockup: { kind: "self-service" },
      },
      {
        eyebrow: "REQUESTS",
        title: "Every request, one inbox",
        body: "From leave to laptop replacement to address change — everything flows through a single tracker. People always know what's pending and what's done.",
        bullets: [
          "Real-time status with manager comments",
          "Attachments and supporting docs in-thread",
          "Audit trail every step of the way",
        ],
        side: "left",
        mockup: { kind: "workflow" },
      },
    ],
    testimonial: {
      quote:
        "My HR Slack channel went from 60 messages a day to about 5. The portal is doing the work I used to do at 9pm.",
      name: "Aisha Patel",
      role: "Head of HR",
      company: "Hooli India",
      avatar: "AP",
    },
    related: ["leave-management", "workflows", "core-hrms"],
  },

  workflows: {
    slug: "workflows",
    category: "Workflows",
    hero: {
      title: "Every approval,",
      titleAccent: "automated",
      description:
        "Multi-step, multi-approver, conditional, parallel — the workflow engine handles whatever your real process actually looks like, without the consultant fees.",
    },
    metaDescription:
      "A no-code approval engine for every HR process: leave, expenses, onboarding, payroll changes, exits — and anything custom you dream up.",
    capabilities: [
      {
        icon: Workflow,
        title: "Visual builder",
        body: "Drag, drop, branch. Build workflows the way you'd sketch them on a whiteboard.",
      },
      {
        icon: GitBranch,
        title: "Conditional routing",
        body: "If amount > X, escalate. If location = Y, add legal. Real logic, no code.",
      },
      {
        icon: Layers,
        title: "Parallel + sequential",
        body: "Mix any pattern: managers approve in parallel, then HR signs off, then ops executes.",
      },
      {
        icon: Bell,
        title: "Smart escalations",
        body: "If an approver is on leave or unresponsive, the request finds a path forward.",
      },
      {
        icon: ClipboardCheck,
        title: "Comments + audit trail",
        body: "Every comment, change, and decision logged. Disputes resolve themselves.",
      },
      {
        icon: CheckCircle2,
        title: "Slack, email, in-app",
        body: "Approve where you already are. Bring the work to people, not the other way around.",
      },
    ],
    spotlights: [
      {
        eyebrow: "BUILDER",
        title: "Build the workflow your business actually has",
        body: "Most tools force your process to fit their flowchart. SignHR adapts to yours — including the weird three-stage approval for international travel that only one person remembers.",
        bullets: [
          "20+ built-in templates to start from",
          "Reusable approver groups",
          "Sandbox mode to test before publishing",
        ],
        side: "right",
        mockup: { kind: "workflow" },
      },
      {
        eyebrow: "APPROVE",
        title: "Approvals that take seconds",
        body: "All the context, none of the clicking. Approvers see what they need, decide, and move on.",
        bullets: [
          "One-click approve from email or Slack",
          "Bulk approve when patterns repeat",
          "Delegate to a backup with one toggle",
        ],
        side: "left",
        mockup: { kind: "self-service" },
      },
    ],
    testimonial: {
      quote:
        "Our expense approval used to take five business days. Now it takes five minutes. The CFO actually thanked me.",
      name: "Ravi Sharma",
      role: "Finance Operations",
      company: "Acme Corp India",
      avatar: "RS",
    },
    related: ["leave-management", "self-service", "onboarding"],
  },

  assets: {
    slug: "assets",
    category: "Asset Management",
    hero: {
      title: "Know who has",
      titleAccent: "what",
      description:
        "Laptops, monitors, badges, sim cards — every asset assigned, tracked, and returned. The end of 'we think Karthik has it' on resignation day.",
    },
    metaDescription:
      "Track every asset across its lifecycle: procurement, assignment, maintenance, return. Built into HR so it actually gets updated.",
    capabilities: [
      {
        icon: Laptop,
        title: "Asset catalog",
        body: "Every device, accessory, and license — with serial, value, and warranty.",
      },
      {
        icon: PackageCheck,
        title: "Assign in one click",
        body: "Linked to onboarding so day-one allocation isn't a separate process.",
      },
      {
        icon: ScanLine,
        title: "QR-coded handovers",
        body: "Scan to verify return condition with photos and signature.",
      },
      {
        icon: Boxes,
        title: "Inventory pool",
        body: "Track what's available across locations, with low-stock alerts.",
      },
      {
        icon: Shield,
        title: "Insurance + warranty",
        body: "Automated reminders before warranties lapse or AMCs renew.",
      },
      {
        icon: Receipt,
        title: "Cost reporting",
        body: "Asset value by team, location, or vintage — for finance and audit.",
      },
    ],
    spotlights: [
      {
        eyebrow: "TRACKING",
        title: "An asset register that's actually accurate",
        body: "Because allocation flows through onboarding and return through offboarding, the register stays right. No more annual stocktake of pain.",
        bullets: [
          "Linked to employee profiles automatically",
          "Mobile scan for verification anywhere",
          "Bulk import from your existing spreadsheet",
        ],
        side: "right",
        mockup: { kind: "assets" },
      },
      {
        eyebrow: "RETURN",
        title: "Return day without the chaos",
        body: "Generate a return checklist when someone resigns. They sign off on what's going back. IT verifies. Done — with photos in the trail.",
        bullets: [
          "Photo + signature confirmation",
          "Damage and missing-item flagging",
          "Auto-trigger F&F deduction if needed",
        ],
        side: "left",
        mockup: { kind: "offboarding" },
      },
    ],
    testimonial: {
      quote:
        "We found 18 'missing' laptops in our first month. They were all sitting on desks. Now we just always know.",
      name: "Daniel Park",
      role: "IT Lead",
      company: "Wayne Enterprises India",
      avatar: "DP",
    },
    related: ["onboarding", "offboarding", "core-hrms"],
  },
};

export const FEATURE_PAGE_SLUGS = Object.keys(FEATURE_PAGES);

export function getFeaturePage(slug: string): FeaturePage | undefined {
  return FEATURE_PAGES[slug];
}

export function getRelatedFeatures(slug: string) {
  const page = FEATURE_PAGES[slug];
  if (!page) return [];
  return page.related
    .map((s) => FEATURE_MODULES.find((m) => m.slug === s))
    .filter(<T,>(x: T | undefined): x is T => Boolean(x));
}
