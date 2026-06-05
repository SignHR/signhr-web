import type { LucideIcon } from "lucide-react";
import {
  Users,
  Clock,
  CalendarDays,
  Wallet,
  UserPlus,
  UserMinus,
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
  LifeBuoy,
  PackageCheck,
  Boxes,
  ScanLine,
  Sparkles,
  Calculator,
  Quote,
  BookOpen,
  UserCog,
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
  /** Optional id rendered on the spotlight section for deep-linking (e.g. "security", "mobile"). */
  anchor?: string;
  /** Optional real-image override; takes precedence over the synthetic mockup. */
  image?: { src: string; alt: string; width: number; height: number };
};

export type SpotlightMockup =
  | { kind: "profile" }
  | { kind: "attendance" }
  | { kind: "leave-calendar" }
  | { kind: "payroll" }
  | { kind: "payroll-handoff" }
  | { kind: "onboarding" }
  | { kind: "offboarding" }
  | { kind: "self-service" }
  | { kind: "workflow" }
  | { kind: "security" }
  | { kind: "assets" }
  | { kind: "org-chart" }
  | { kind: "ask-hr" }
  | { kind: "ask-hr-persona" }
  | { kind: "ask-hr-math" }
  | { kind: "ask-hr-private" }
  | { kind: "doc-request" }
  | { kind: "doc-vault" };

export type FeaturePage = {
  slug: string;
  category: string;
  hero: {
    title: string;
    titleAccent?: string;
    description: string;
    /** Image rendered in the big hero visual band. Falls back to the first spotlight's image/mockup when omitted. */
    image?: { src: string; alt: string; width: number; height: number };
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
  "ask-hr": {
    slug: "ask-hr",
    category: "Ask HR",
    hero: {
      title: "Ask HR",
      titleAccent: "anything.",
      description:
        "Every company gets its own AI HR — name it, give it a face, train it on your handbook. Employees just ask, and it answers from your live data and policies, even running the real numbers. Read-only, permission-scoped, and on the record.",
      image: {
        src: "/assets/ask-hr.webp",
        alt: "SignHR Ask HR — an AI assistant answering an employee question",
        width: 1653,
        height: 952,
      },
    },
    metaDescription:
      "Ask HR — your company's own AI HR. Plain-English answers grounded in your live data and policies, real payroll math, a per-company persona, and permission-scoped privacy. Read-only v1.",
    capabilities: [
      {
        icon: Sparkles,
        title: "Ask in plain English",
        body: `Leave balance, “why did my pay change?”, notice period — answered from your data, with the policy section cited.`,
      },
      {
        icon: Calculator,
        title: "Runs the real math",
        body: `“Unpaid leave Fri–Mon — what's my deduction?” Computed by the same engine that builds your payslips, shown as an estimate.`,
      },
      {
        icon: Quote,
        title: "Cites every answer",
        body: "Policy replies quote the handbook; computed replies show the breakdown. Grounded in your sources, never invented.",
      },
      {
        icon: UserCog,
        title: "Your own AI HR",
        body: `Set its name, photo, and tone per company — “Ask Maya”, “Ask Raj” — so it feels like your HR, not a generic bot.`,
      },
      {
        icon: BookOpen,
        title: "Trained on your handbook",
        body: `Upload your policies and documents; answers stay grounded in your company's actual rules, not the open web.`,
      },
      {
        icon: Shield,
        title: "Permission-scoped & private",
        body: "It only ever sees what the asking employee may see — no salary or PII leaks — and your data never trains a model.",
      },
    ],
    spotlights: [
      {
        eyebrow: "GROUNDED ANSWERS",
        title: `Your company’s HR, <em class="serif-italic">on call 24/7</em>.`,
        body: "Employees ask in plain language and get a real answer — from your live HR data and your own policy docs, with the source cited. Not a generic assistant: it reads the real numbers and runs the real math.",
        bullets: [
          "Plain-English answers grounded in your data, with the policy section cited.",
          "Runs real what-ifs — like an unpaid-leave deduction — on your live payroll, shown as an estimate.",
          "Read-only by design: it answers and deep-links to the right screen, but never changes anything itself.",
        ],
        side: "right",
        mockup: { kind: "ask-hr" },
      },
      {
        eyebrow: "MAKE IT YOURS",
        title: `An AI HR that’s <em class="serif-italic">unmistakably yours</em>.`,
        body: "Every company shapes its own assistant — its name, its face, its tone — and grounds it in your actual policies. It speaks for your HR, in your tone.",
        bullets: [
          `Set the name, photo, and personality per company — “Ask Maya”, “Ask Raj”.`,
          "Upload your handbook and policy docs; answers stay grounded in your rules, not the open web.",
          "Tune its guidelines so it knows what to answer, what to escalate, and how to sound.",
        ],
        side: "left",
        mockup: { kind: "ask-hr-persona" },
        image: {
          src: "/assets/ai-settings.webp",
          alt: "SignHR Ask HR persona settings — name, photo, and tone per company",
          width: 1168,
          height: 1346,
        },
      },
      {
        eyebrow: "REAL MATH",
        title: `It runs the <em class="serif-italic">actual numbers</em>.`,
        body: "Ask a what-if and it computes — pulling your penalty rules, leave balance, salary, and the working-day calendar — with the same engine that produces your payslips. The number can’t drift from what payroll would really do.",
        bullets: [
          `“If I take unpaid leave Friday to Monday, what’s my deduction?” — answered with the breakdown.`,
          "Uses the same calculator as real payroll, so the estimate matches the system.",
          "Always framed as an estimate to confirm with HR — advisory on money, never the final word.",
        ],
        side: "right",
        mockup: { kind: "ask-hr-math" },
      },
      {
        eyebrow: "PRIVATE BY DESIGN",
        title: `Trust, <em class="serif-italic">built in</em>.`,
        body: `An HR assistant only earns its place if it’s safe. SignHR’s is permission-scoped by construction, cites its sources, and is an official, on-the-record channel — not a black box.`,
        bullets: [
          "Permission-scoped: it can only ever surface what the asking employee is already allowed to see.",
          "Cites every answer and shows its work, so there’s nothing to take on faith.",
          "On-the-record and auditable for HR — and your data is never used to train any model.",
        ],
        side: "left",
        mockup: { kind: "ask-hr-private" },
      },
    ],
    testimonial: {
      quote:
        "Our people ask it the things they used to email me at 9pm — and it answers correctly, with the policy attached. My inbox finally went quiet.",
      name: "Sana Kapoor",
      role: "Head of People",
      company: "Lumen Labs",
      avatar: "SK",
    },
    related: ["self-service", "payroll", "leave-management"],
  },

  "core-hrms": {
    slug: "core-hrms",
    category: "Core HRMS",
    hero: {
      title: "One source of truth",
      titleAccent: "for everyone",
      description:
        "Profiles, contracts, documents, and org charts that always match reality. Your HR data stops living in five different spreadsheets.",
      image: {
        src: "/assets/employee.webp",
        alt: "SignHR core HRMS workspace — profile, schedule, and org chart in one view",
        width: 1536,
        height: 1024,
      },
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
        title: "Searchable directory & org chart",
        body: "A live employee directory and drag-and-drop reporting lines that stay in sync with payroll.",
      },
      {
        icon: Building2,
        title: "Departments, roles & IDs",
        body: "Departments, designations, reporting lines, auto-generated employee IDs, and full employment history.",
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
        image: {
          src: "/assets/employee-profile.webp",
          alt: "SignHR employee profile screen",
          width: 1545,
          height: 1018,
        },
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
        image: {
          src: "/assets/org-chart.webp",
          alt: "SignHR live org chart",
          width: 1692,
          height: 930,
        },
      },
      {
        eyebrow: "SCHEDULES",
        title: "Every team's rhythm in one place",
        body: "Working hours, locations, and shift patterns live alongside the profile — so payroll, attendance, and the org chart all agree on who's working when.",
        bullets: [
          "Working hours and time-zone aware schedules",
          "Location and shift pattern per employee",
          "Single source for payroll, attendance, and reporting",
        ],
        side: "right",
        mockup: { kind: "leave-calendar" },
        image: {
          src: "/assets/schedule-attendance.webp",
          alt: "SignHR work schedule view with shifts and locations",
          width: 1536,
          height: 1024,
        },
      },
      {
        eyebrow: "SECURITY & ACCESS",
        title: "Access control that's actually granular",
        anchor: "security",
        body: "Role-based permissions decide who sees what — down to the field. Every action is logged, and sensitive documents stay locked to the right people.",
        bullets: [
          "Role-based access control (RBAC) for admins & managers",
          "Field-level permissions on sensitive data",
          "Activity logs and secure document storage",
        ],
        side: "left",
        mockup: { kind: "security" },
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
      image: {
        src: "/assets/check-in-out.webp",
        alt: "SignHR attendance dashboard with check-in and check-out timeline",
        width: 1536,
        height: 1024,
      },
    },
    metaDescription:
      "Web, mobile, and kiosk attendance with geofencing, shift scheduling, and timesheet approvals built for hybrid teams.",
    capabilities: [
      {
        icon: Smartphone,
        title: "Mobile & biometric clock-in",
        body: "iOS, Android, kiosk, or biometric device — geofence, selfie capture, and offline punch sync.",
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
        icon: Clock,
        title: "Overtime, breaks & half-days",
        body: "Overtime, break time, late-mark, and half-day rules computed automatically per policy.",
      },
      {
        icon: CheckCircle2,
        title: "Auto regularization",
        body: "Missed punches surface to the employee, not the manager's email inbox.",
      },
      {
        icon: ClipboardCheck,
        title: "Real-time timesheets",
        body: "Live dashboard of who's in, who's late, who's on leave — across every location.",
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
        image: {
          src: "/assets/check-in.webp",
          alt: "SignHR mobile clock-in with selfie and GPS verification",
          width: 1136,
          height: 1101,
        },
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
        image: {
          src: "/assets/schedules.webp",
          alt: "SignHR shift scheduling view",
          width: 1322,
          height: 1190,
        },
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
      image: {
        src: "/assets/leave-management.webp",
        alt: "SignHR leave management — balances and team calendar",
        width: 1535,
        height: 1024,
      },
    },
    metaDescription:
      "Configurable leave policies, automatic accruals, team calendars, and one-click approvals. Built for hybrid and global teams.",
    capabilities: [
      {
        icon: CalendarDays,
        title: "Any policy, modeled",
        body: "Annual, sick, casual, comp-off, sabbatical, paternity, and sandwich-leave rules — all configurable, all auditable.",
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
        body: "Email, mobile, or in-app — managers approve in seconds with full context.",
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
        body: "Pick your dates. See your balance. Hit submit. Your manager gets a notification with everything they need to decide.",
        bullets: [
          "Live balance with carry-forward visible",
          "Half-day and hourly leave supported",
          "Cover-by suggestions surface from your team",
        ],
        side: "right",
        mockup: { kind: "leave-calendar" },
        image: {
          src: "/assets/request.webp",
          alt: "SignHR leave request with live balance",
          width: 1426,
          height: 978,
        },
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
        image: {
          src: "/assets/leave-policies.webp",
          alt: "SignHR leave policy configuration",
          width: 1129,
          height: 1393,
        },
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
      title: "Payroll-ready,",
      titleAccent: "every cycle",
      description:
        "SignHR does the heavy lifting before payday — salary structures, attendance and leave turned into clean payroll inputs, payslip access for your team — then hands off to your payroll or compliance provider. We compute the inputs; you run the payout.",
      image: {
        src: "/assets/payroll.webp",
        alt: "SignHR payroll inputs and salary structure",
        width: 1615,
        height: 974,
      },
    },
    metaDescription:
      "Payroll support & integration: salary structures, attendance-to-payroll inputs, payslip access, reimbursements, and a clean hand-off to your payroll provider.",
    capabilities: [
      {
        icon: Wallet,
        title: "Flexible salary structures",
        body: "Basic, HRA, allowances, deductions, reimbursements — modeled exactly how you pay.",
      },
      {
        icon: Layers,
        title: "Attendance & leave → inputs",
        body: "LOP, overtime, and approved leave flow straight into payroll inputs — no re-keying.",
      },
      {
        icon: Receipt,
        title: "Payslip access",
        body: "Employees download payslips and year-to-date summaries from self-service, on any device.",
      },
      {
        icon: Inbox,
        title: "Expense reimbursement",
        body: "Claims, approvals, and reimbursements captured and ready to include in the cycle.",
      },
      {
        icon: ClipboardCheck,
        title: "Statutory-aware inputs",
        body: "PF, ESI, PT, and TDS amounts computed as inputs — your provider handles the filing.",
      },
      {
        icon: FileText,
        title: "Export & integration",
        body: "Clean exports and a tidy hand-off to your third-party payroll or compliance engine.",
      },
    ],
    spotlights: [
      {
        eyebrow: "INPUTS",
        title: "Payroll inputs, computed for you",
        body: "Pull attendance, leave, LOP, and components into one reviewed sheet. Catch variance against last cycle before anything leaves SignHR.",
        bullets: [
          "Variance flagging vs last cycle",
          "LOP and overtime auto-applied",
          "Audit log for every adjustment",
        ],
        side: "right",
        mockup: { kind: "payroll" },
        image: {
          src: "/assets/payroll-settings.webp",
          alt: "SignHR payroll settings and salary components",
          width: 2810,
          height: 1858,
        },
      },
      {
        eyebrow: "HAND-OFF",
        title: "Your payroll engine, fed cleanly",
        body: "Export a ready-to-run file or push inputs to your payroll/compliance provider. SignHR owns the prep; your engine owns the payout and filing.",
        bullets: [
          "Provider-ready export formats",
          "Payslip access in self-service",
          "No double data entry",
        ],
        side: "left",
        mockup: { kind: "payroll-handoff" },
      },
    ],
    testimonial: {
      quote:
        "Our attendance, leave, and components flow straight into payroll inputs now. What used to be three days of spreadsheet reconciliation is a 20-minute review.",
      name: "Faiza Khan",
      role: "Payroll Lead",
      company: "Wayne Enterprises India",
      avatar: "FK",
    },
    related: ["core-hrms", "time-attendance", "workflows"],
  },

  onboarding: {
    slug: "onboarding",
    category: "Onboarding & Offboarding",
    hero: {
      title: "From first day to final exit,",
      titleAccent: "handled",
      description:
        "Send the offer, collect the documents, sign the contract, provision the laptop — and when someone moves on, run the clearance, asset return, and full-and-final without anyone having to remember to start.",
      image: {
        src: "/assets/onboarding.webp",
        alt: "SignHR onboarding checklist and offer flow",
        width: 1535,
        height: 1025,
      },
    },
    metaDescription:
      "Joining to exit in one flow: offer letters, digital joining forms, e-signatures, welcome workflows, clearance checklists, and full-and-final settlement.",
    capabilities: [
      {
        icon: UserPlus,
        title: "Branded offer letters",
        body: "Templates that match your voice, populated from data, sent in a click — with an approval chain before they go out.",
      },
      {
        icon: FileText,
        title: "Digital joining forms",
        body: "ID proofs, PAN, bank, education — collected through a clean checklist, not 14 emails.",
      },
      {
        icon: ClipboardCheck,
        title: "E-signatures built in",
        body: "Legally valid contracts signed on a phone — no third tool to manage.",
      },
      {
        icon: Workflow,
        title: "Task-based pre-boarding",
        body: "IT, finance, ops, and people-ops tasks routed automatically before day one.",
      },
      {
        icon: UserMinus,
        title: "Clearance & exit checklist",
        body: "Resignation triggers handover, asset return, and IT-access removal — nothing slips.",
      },
      {
        icon: Receipt,
        title: "Full & final settlement",
        body: "Notice pay, leave encashment, and gratuity computed and ready for review before the last day.",
      },
    ],
    spotlights: [
      {
        eyebrow: "ONBOARDING",
        title: "From verbal yes to a great first day",
        body: "Generate the offer, get it signed on a phone, and let the system provision accounts, assets, and a first-week schedule before they pour their first coffee.",
        bullets: [
          "Template variables for role, comp, location",
          "Auto-create accounts and assign assets",
          "First-week schedule and buddy assignment",
        ],
        side: "right",
        mockup: { kind: "onboarding" },
        image: {
          src: "/assets/onboarding.webp",
          alt: "SignHR onboarding checklist and offer flow",
          width: 1536,
          height: 1024,
        },
      },
      {
        eyebrow: "OFFBOARDING",
        title: "Exits done with dignity",
        body: "Resignation kicks off a checklist that pulls in every team that needs to act — clearance, asset return, access removal, and a correctly-calculated full-and-final.",
        bullets: [
          "Configurable per role, location, and tenure",
          "Auto-routed to IT, finance, and people-ops",
          "Live full-and-final preview before the last day",
        ],
        side: "left",
        mockup: { kind: "offboarding" },
      },
    ],
    testimonial: {
      quote:
        "We used to spend half a day prepping for each new hire and dread every exit. Now both are checklists that run themselves — our last cohort was onboarded in twelve minutes per person.",
      name: "Marcus Chen",
      role: "People Operations",
      company: "Stark Industries",
      avatar: "MC",
    },
    related: ["core-hrms", "assets", "payroll"],
  },

  "self-service": {
    slug: "self-service",
    category: "Self-service",
    hero: {
      title: "Your team,",
      titleAccent: "empowered",
      description:
        "Eighty percent of HR tickets are answers people could find themselves. Self-service in SignHR is so good, your team would rather use it than file a ticket.",
      image: {
        src: "/assets/self.webp",
        alt: "SignHR employee self-service portal",
        width: 1389,
        height: 839,
      },
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
        body: "Payslips, address proof, NOC, and tax summaries — generated in the moment they're needed.",
      },
      {
        icon: Bell,
        title: "Notifications that respect them",
        body: "Smart digests, not 14 emails a day. Quiet hours honored.",
      },
      {
        icon: LifeBuoy,
        title: "HR Helpdesk",
        body: "Questions, tickets, and answers in one place — with the docs people need attached.",
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
        side: "left",
        mockup: { kind: "self-service" },
        image: {
          src: "/assets/dashboard.webp",
          alt: "SignHR self-service portal home — personalized dashboard with search",
          width: 2926,
          height: 1647,
        },
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
        side: "right",
        mockup: { kind: "workflow" },
        image: {
          src: "/assets/request.webp",
          alt: "SignHR request tracker for leave, documents, and approvals",
          width: 1426,
          height: 978,
        },
      },
      {
        eyebrow: "COLLECT & SIGN",
        title: 'Ask once. Track everything. <em class="serif-italic">Chase no one.</em>',
        body: "Ask employees to upload a proof, sign an agreement, or acknowledge a policy — then watch a single dashboard fill in instead of refreshing your inbox. Everything lands on the employee record, verified and stored.",
        bullets: [
          "Request the right documents per person, team, or role — PAN, address proof, certificates, a signed offer — and see signed-vs-pending at a glance.",
          "Read-and-acknowledge sign-off for handbooks and policies, each acknowledgment timestamped and logged — so when a policy changes, you know who's seen it.",
          "Expiry and renewal reminders for time-bound documents reach the employee before they lapse, and HR verifies each upload before it's filed.",
        ],
        side: "left",
        mockup: { kind: "doc-request" },
      },
      {
        eyebrow: "MY DOCUMENTS",
        title:
          'Every payslip, letter, and ID — <em class="serif-italic">one tap away.</em>',
        body: "Give employees one secure place for their own documents and details. Payslips and letters on demand, IDs and certificates uploaded once, personal details they keep current themselves — with HR holding the lock on what's official.",
        bullets: [
          "A personal document vault — payslips, tax summaries, address proof, IDs, certificates — viewable and downloadable on any device, generated the moment they're needed.",
          "Store a file or just a link, tag it by type, and set an expiry so renewals never sneak up — all surfaced back to HR in one place.",
          "Self-updated personal details with field-level locks: employees keep contacts and emergency info current, while statutory records stay HR-controlled and audit-logged.",
        ],
        side: "right",
        mockup: { kind: "doc-vault" },
      },
      {
        eyebrow: "MOBILE & PRODUCTIVITY",
        title: "HR that lives in their pocket",
        anchor: "mobile",
        body: "A mobile dashboard with everything today needs — punches, approvals, payslips, announcements — plus push notifications and real-time updates across every location.",
        bullets: [
          "Mobile dashboard for employees & managers",
          "Push notifications and real-time updates",
          "Multi-location and offline-friendly",
        ],
        side: "left",
        mockup: { kind: "self-service" },
        image: {
          src: "/assets/mobile.webp",
          alt: "SignHR mobile app — dashboard, punches, and push notifications",
          width: 1386,
          height: 2996,
        },
      },
    ],
    testimonial: {
      quote:
        "Inbound HR questions went from 60 a day to about 5. The portal is doing the work I used to do at 9pm.",
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
      image: {
        src: "/assets/approval-flow-detailed.webp",
        alt: "SignHR visual approval workflow builder",
        width: 2926,
        height: 1647,
      },
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
        title: "Email, mobile, in-app",
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
        image: {
          src: "/assets/approval-flow.webp",
          alt: "SignHR approval workflow with multi-step approvers",
          width: 1201,
          height: 1310,
        },
      },
      {
        eyebrow: "APPROVE",
        title: "Approvals that take seconds",
        body: "All the context, none of the clicking. Approvers see what they need, decide, and move on.",
        bullets: [
          "One-click approve from email or mobile",
          "Bulk approve when patterns repeat",
          "Delegate to a backup with one toggle",
        ],
        side: "left",
        mockup: { kind: "self-service" },
        image: {
          src: "/assets/request.webp",
          alt: "SignHR approval — one-click approve from the request",
          width: 1426,
          height: 978,
        },
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
      image: {
        src: "/assets/assets.webp",
        alt: "SignHR asset register with assigned devices",
        width: 1544,
        height: 1019,
      },
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
        image: {
          src: "/assets/asset-details.webp",
          alt: "SignHR asset detail and assignment history",
          width: 2535,
          height: 1995,
        },
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
    related: ["onboarding", "core-hrms"],
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
