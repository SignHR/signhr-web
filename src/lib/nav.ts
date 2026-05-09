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
  BookOpen,
  FileText,
  LifeBuoy,
  Sparkles,
  Newspaper,
} from "lucide-react";

export type FeatureModule = {
  slug: string;
  name: string;
  href: string;
  icon: LucideIcon;
  group: "core" | "time" | "lifecycle" | "operations";
  short: string;
};

export const FEATURE_MODULES: FeatureModule[] = [
  {
    slug: "core-hrms",
    name: "Core HRMS",
    href: "/features/core-hrms",
    icon: Users,
    group: "core",
    short: "One source of truth for everyone on the team.",
  },
  {
    slug: "self-service",
    name: "Self-service",
    href: "/features/self-service",
    icon: Sparkles,
    group: "core",
    short: "Your team handles 80% of HR without filing a ticket.",
  },
  {
    slug: "workflows",
    name: "Workflows",
    href: "/features/workflows",
    icon: GitBranch,
    group: "core",
    short: "Every approval, automated end-to-end.",
  },
  {
    slug: "time-attendance",
    name: "Time & Attendance",
    href: "/features/time-attendance",
    icon: Clock,
    group: "time",
    short: "Punch in. Or don't. Either way, we've got it.",
  },
  {
    slug: "leave-management",
    name: "Leave Management",
    href: "/features/leave-management",
    icon: CalendarDays,
    group: "time",
    short: "Time off should be easy for everyone.",
  },
  {
    slug: "payroll",
    name: "Payroll",
    href: "/features/payroll",
    icon: Wallet,
    group: "lifecycle",
    short: "Transparent compensation, every cycle.",
  },
  {
    slug: "onboarding",
    name: "Onboarding",
    href: "/features/onboarding",
    icon: UserPlus,
    group: "lifecycle",
    short: "First day, done in minutes.",
  },
  {
    slug: "offboarding",
    name: "Offboarding",
    href: "/features/offboarding",
    icon: UserMinus,
    group: "lifecycle",
    short: "Exits done with dignity and a clean trail.",
  },
  {
    slug: "assets",
    name: "Asset Management",
    href: "/features/assets",
    icon: Laptop,
    group: "operations",
    short: "Know who has what — laptops, badges, all of it.",
  },
];

export const FEATURE_GROUPS: Array<{
  id: FeatureModule["group"];
  label: string;
  blurb: string;
}> = [
  {
    id: "core",
    label: "Core",
    blurb: "The foundation of your people data and processes.",
  },
  {
    id: "time",
    label: "Time",
    blurb: "Attendance, schedules, and leave in one rhythm.",
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    blurb: "From offer letter to exit interview.",
  },
  {
    id: "operations",
    label: "Operations",
    blurb: "Everything that keeps the business running.",
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
  { label: "Pricing", href: "/pricing", type: "link" },
  { label: "Customers", href: "/customers", type: "link" },
  { label: "Contact", href: "/contact", type: "link" },
];

export const FOOTER_NAV = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/changelog#roadmap" },
    { label: "Integrations", href: "/features#integrations" },
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
