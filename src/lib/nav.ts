import type { LucideIcon } from "lucide-react";
import {
  Users,
  Clock,
  CalendarDays,
  Wallet,
  UserPlus,
  GitBranch,
  Laptop,
  Smartphone,
  ShieldCheck,
  Briefcase,
  Target,
  BarChart3,
  Megaphone,
  Plug,
  BookOpen,
  FileText,
  LifeBuoy,
  Sparkles,
  Newspaper,
  Bot,
} from "lucide-react";

export type FeatureModule = {
  slug: string;
  name: string;
  href: string; // live → "/features/<slug>"; some live modules deep-link into another page; roadmap → "/features#roadmap"
  icon: LucideIcon;
  group: "core" | "time" | "lifecycle" | "platform";
  status: "live" | "soon";
  short: string;
  roadmapBullets?: string[]; // shown on the /features "On the roadmap" cards
};

export const FEATURE_MODULES: FeatureModule[] = [
  // --- core ---
  {
    slug: "ask-hr",
    name: "Ask HR",
    href: "/features/ask-hr",
    icon: Bot,
    group: "core",
    status: "live",
    short: "Your company's own AI HR — ask it anything, answered from live data & policy.",
  },
  {
    slug: "core-hrms",
    name: "Core HR",
    href: "/features/core-hrms",
    icon: Users,
    group: "core",
    status: "live",
    short: "One source of truth — profiles, directory, departments, roles, org chart.",
  },
  {
    slug: "self-service",
    name: "Employee Self-Service",
    href: "/features/self-service",
    icon: Sparkles,
    group: "core",
    status: "live",
    short: "Your team handles 80% of HR without filing a ticket.",
  },
  // --- time ---
  {
    slug: "time-attendance",
    name: "Attendance & Time",
    href: "/features/time-attendance",
    icon: Clock,
    group: "time",
    status: "live",
    short: "Punch in. Or don't. Either way, we've got it.",
  },
  {
    slug: "leave-management",
    name: "Leave Management",
    href: "/features/leave-management",
    icon: CalendarDays,
    group: "time",
    status: "live",
    short: "Time off should be easy for everyone.",
  },
  {
    slug: "workflows",
    name: "Approval Workflows",
    href: "/features/workflows",
    icon: GitBranch,
    group: "time",
    status: "live",
    short: "Every approval, automated end-to-end.",
  },
  // --- lifecycle ---
  {
    slug: "onboarding",
    name: "Onboarding & Offboarding",
    href: "/features/onboarding",
    icon: UserPlus,
    group: "lifecycle",
    status: "live",
    short: "First day to final exit — handled in minutes.",
  },
  {
    slug: "payroll",
    name: "Payroll",
    href: "/features/payroll",
    icon: Wallet,
    group: "lifecycle",
    status: "live",
    short: "Payroll-ready — we compute the inputs, your payroll engine pays out.",
  },
  {
    slug: "recruitment",
    name: "Recruitment & Hiring",
    href: "/features#roadmap",
    icon: Briefcase,
    group: "lifecycle",
    status: "soon",
    short: "Source, track & hire — applicant tracking built in.",
    roadmapBullets: ["Job openings & ATS", "Candidate pipeline & interviews", "Resume & candidate database"],
  },
  // --- platform ---
  {
    slug: "assets",
    name: "Asset Management",
    href: "/features/assets",
    icon: Laptop,
    group: "platform",
    status: "live",
    short: "Know who has what — laptops, badges, all of it.",
  },
  {
    slug: "mobile",
    name: "Mobile & Productivity",
    href: "/features/self-service#mobile",
    icon: Smartphone,
    group: "platform",
    status: "live",
    short: "HR in your pocket — dashboard, punches & push notifications.",
  },
  {
    slug: "security",
    name: "Security & Access",
    href: "/features/core-hrms#security",
    icon: ShieldCheck,
    group: "platform",
    status: "live",
    short: "Role-based access, activity logs & secure document storage.",
  },
  {
    slug: "performance",
    name: "Performance",
    href: "/features#roadmap",
    icon: Target,
    group: "platform",
    status: "soon",
    short: "Goals, reviews & feedback that actually land.",
    roadmapBullets: ["Goals & KPIs", "Reviews & appraisals", "360° feedback"],
  },
  {
    slug: "reports",
    name: "Reports & Analytics",
    href: "/features#roadmap",
    icon: BarChart3,
    group: "platform",
    status: "soon",
    short: "Turn your people data into decisions.",
    roadmapBullets: ["Workforce analytics", "Department-level reports", "Custom & exportable reports"],
  },
  {
    slug: "communication",
    name: "Communication & Engagement",
    href: "/features#roadmap",
    icon: Megaphone,
    group: "platform",
    status: "soon",
    short: "Keep everyone in the loop, automatically.",
    roadmapBullets: ["Announcements & alerts", "Birthday & anniversary nudges", "Team updates"],
  },
  {
    slug: "integrations",
    name: "Integrations",
    href: "/features#roadmap",
    icon: Plug,
    group: "platform",
    status: "soon",
    short: "WhatsApp, Slack, biometric, API — connect it all.",
    roadmapBullets: ["WhatsApp, Email & Calendar", "Slack / Teams", "Biometric devices & REST API"],
  },
];

export const FEATURE_GROUPS: Array<{
  id: FeatureModule["group"];
  label: string;
  blurb: string;
}> = [
  {
    id: "core",
    label: "Core & AI",
    blurb: "Your people data, self-service, and an AI HR on top.",
  },
  {
    id: "time",
    label: "Time & Approvals",
    blurb: "Attendance, leave, and the approvals they trigger.",
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    blurb: "From offer letter to final settlement.",
  },
  {
    id: "platform",
    label: "Platform",
    blurb: "The engine, assets, and guardrails under it all.",
  },
];

export type ResourceLink = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    label: "Guides",
    href: "/resources/guides",
    description: "Long-form playbooks for modern HR teams.",
    icon: BookOpen,
  },
  {
    label: "Templates",
    href: "/resources/templates",
    description: "Free policies, letters, and checklists you can copy.",
    icon: FileText,
  },
  {
    label: "Help Center",
    href: "/resources/help",
    description: "Setup, integrations, and answers from the team.",
    icon: LifeBuoy,
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "Every shipment, in plain English.",
    icon: Sparkles,
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Field notes, opinions, and HR strategy.",
    icon: Newspaper,
  },
];

export const PRIMARY_NAV: Array<{
  label: string;
  href?: string;
  type: "link" | "mega-features" | "mega-resources";
}> = [
  { label: "Home", href: "/", type: "link" },
  { label: "Features", type: "mega-features" },
  // { label: "Pricing", href: "/pricing", type: "link" }, // hidden for now
  { label: "Customers", href: "/customers", type: "link" },
  { label: "Contact", href: "/contact", type: "link" },
];

export const FOOTER_NAV = {
  product: [
    { label: "Features", href: "/features" },
    // { label: "Pricing", href: "/pricing" }, // hidden for now
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/changelog#roadmap" },
    { label: "Integrations", href: "/features#roadmap" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Customers", href: "/customers" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "DPA", href: "/legal/dpa" },
    { label: "Security", href: "/legal/dpa#security" },
  ],
};
