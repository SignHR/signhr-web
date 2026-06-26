import type { Metadata } from "next";
import { Sparkles, Wrench, Bug, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every SignHR release in plain English — new HR, attendance, leave and payroll features shipped every two weeks. See what's new and what's next.",
  alternates: { canonical: "/changelog" },
};

type EntryKind = "feature" | "improvement" | "fix" | "security";

const ICONS: Record<EntryKind, React.ComponentType<{ className?: string }>> = {
  feature: Sparkles,
  improvement: Zap,
  fix: Bug,
  security: Wrench,
};
const TONES: Record<EntryKind, string> = {
  feature: "bg-brand-50 text-brand-700",
  improvement: "bg-info/10 text-info",
  fix: "bg-warning/15 text-warning-foreground",
  security: "bg-destructive/10 text-destructive",
};

type Entry = { kind: EntryKind; title: string; body: string };
type Release = {
  version: string;
  date: string;
  title: string;
  entries: Entry[];
  highlight?: boolean;
};

const RELEASES: Release[] = [
  {
    version: "v2.8.0",
    date: "June 24, 2026",
    title: "Tasks, Checklists & Geo Tracking",
    highlight: true,
    entries: [
      {
        kind: "feature",
        title: "Tasks & Projects",
        body: "Organise work into projects and track it on a board, calendar or Gantt timeline. Subtasks, dependencies, automation rules, custom fields, and comments with @mentions — assigned to the people you already manage.",
      },
      {
        kind: "feature",
        title: "Operational checklists",
        body: "Recurring checklists for frontline teams, assigned to users, roles or departments, with photo, GPS, numeric and pass/fail proof on every item — and a compliance dashboard showing who did what.",
      },
      {
        kind: "feature",
        title: "Geo tracking for attendance",
        body: "Geofence your offices and sites, GPS-stamp every punch against the allowed area, see it on a map, and get a logged reason on every automatic clock-out.",
      },
    ],
  },
  {
    version: "v2.7.0",
    date: "June 16, 2026",
    title: "Recruitment & Reports",
    entries: [
      {
        kind: "feature",
        title: "Recruitment & hiring",
        body: "A full applicant tracking system — job openings, a drag-and-drop candidate pipeline, screening questions, interview scorecards and offer letters — that converts a hire into an employee in one step.",
      },
      {
        kind: "feature",
        title: "Reports & analytics",
        body: "Forty-plus ready reports across attendance, leave, payroll, tasks and workforce, plus a live KPI dashboard, rich filters, and PDF/Excel/CSV export.",
      },
      {
        kind: "improvement",
        title: "Scheduled report alerts",
        body: "Schedule any report to email itself to people, teams, departments or managers on a daily, weekly or monthly cadence.",
      },
    ],
  },
  {
    version: "v2.6.0",
    date: "June 2, 2026",
    title: "Ask HR is live",
    entries: [
      {
        kind: "feature",
        title: "Ask HR, your company's own AI HR",
        body: "Employees ask in plain English and get an answer grounded in your live HR data and policies, with the source cited. It's read-only by design: it answers and deep-links to the right screen, but never changes anything itself.",
      },
      {
        kind: "feature",
        title: "AI HR persona & knowledge base",
        body: "Give your assistant a name and a tone, and train it on your handbook and policy docs so every answer stays grounded in your company's actual rules — not the open web. Configure it all from Settings → AI HR.",
      },
      {
        kind: "security",
        title: "AI audit log",
        body: "Every Ask HR conversation is permission-scoped and on the record: it only ever surfaces what the asking employee may already see, and HR can review the full trail of what was asked and answered.",
      },
    ],
  },
  {
    version: "v2.5.0",
    date: "May 19, 2026",
    title: "Payroll runs, exceptions & loans",
    entries: [
      {
        kind: "feature",
        title: "Payroll runs, end to end",
        body: "Build a payroll run, review flagged exceptions before anything is finalized, and generate payslips per employee — all from one workspace, with a full audit trail on every run.",
      },
      {
        kind: "feature",
        title: "Employee loans & advances",
        body: "Track loans and salary advances with repayment schedules that recover automatically through payroll.",
      },
      {
        kind: "improvement",
        title: "Bank-transfer export & payroll settings",
        body: "Export a bank-ready transfer file for the cycle, and model your salary structures and components in payroll settings.",
      },
    ],
  },
  {
    version: "v2.4.0",
    date: "May 5, 2026",
    title: "Bulk onboarding & cleaner exits",
    entries: [
      {
        kind: "feature",
        title: "Bulk onboarding",
        body: "Onboard an entire cohort from a single sheet instead of one hire at a time, and track the status of every bulk run as it processes.",
      },
      {
        kind: "feature",
        title: "Offboarding, clearance & full-and-final",
        body: "A resignation now kicks off a clearance checklist and a full-and-final settlement, with configurable clearance templates, letter templates, and resignation reasons.",
      },
      {
        kind: "improvement",
        title: "Onboarding wizard",
        body: "A step-by-step joining flow walks each new hire through their details, documents, and first-day setup.",
      },
    ],
  },
  {
    version: "v2.3.0",
    date: "April 21, 2026",
    title: "Attendance regularization & schedules",
    entries: [
      {
        kind: "feature",
        title: "Attendance regularization",
        body: "Fix a missed or wrong punch by raising a correction request that routes for approval, with a clear before/after diff of exactly what changed.",
      },
      {
        kind: "feature",
        title: "Shift schedules with audit diff",
        body: "Build and publish shift schedules; every edit is captured as a diff, so you always know what changed and who changed it.",
      },
      {
        kind: "feature",
        title: "Comp-off",
        body: "Employees earn comp-off for extra hours and redeem it later, with a register that keeps balances and assignments straight.",
      },
    ],
  },
  {
    version: "v2.2.0",
    date: "April 7, 2026",
    title: "Leave, holidays & flexible requests",
    entries: [
      {
        kind: "feature",
        title: "Configurable leave types & LOP register",
        body: "Model your own leave types and policies, and track loss-of-pay days in a dedicated register that feeds straight into payroll.",
      },
      {
        kind: "feature",
        title: "A request system for anything",
        body: "Raise any kind of request — not just leave — with configurable dynamic fields per request type, each routed for approval and tracked to closure.",
      },
      {
        kind: "fix",
        title: "Leave balance edge cases",
        body: "Editing or cancelling a leave now recalculates balances correctly, including mid-cycle changes and partial days.",
      },
    ],
  },
  {
    version: "v2.1.0",
    date: "March 24, 2026",
    title: "Core HR: org chart, roles & files",
    entries: [
      {
        kind: "feature",
        title: "Org chart & rich employee profiles",
        body: "A live org chart, plus profiles that hold everything in one place — personal details, job and contract, financial info, documents, schedule, and assigned assets.",
      },
      {
        kind: "security",
        title: "Roles & permissions",
        body: "Granular role-based access decides who sees what, down to sensitive fields, so HR data stays with exactly the right people.",
      },
      {
        kind: "feature",
        title: "Files & document vault",
        body: "Organize company and employee documents in folders, with storage usage at a glance and configurable document types.",
      },
    ],
  },
];

const ROADMAP = [
  {
    quarter: "Q3 2026",
    items: [
      "Integrations — WhatsApp, Slack / Teams, biometric devices, and a REST API",
      "Performance — goals, reviews & appraisals, and 360° feedback",
    ],
  },
  {
    quarter: "Q4 2026",
    items: [
      "Communication & engagement — announcements, alerts, and birthday/anniversary nudges",
      "Expanded mobile app — more of the workspace in your pocket",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Hero
        eyebrow="CHANGELOG"
        title={
          <>
            Every shipment,{" "}
            <em className="serif-italic">in plain English</em>
          </>
        }
        description="We ship every two weeks. Here's what's new, what's improved, what's fixed, and what's being worked on."
      />

      <Section pad="standard" className="-mt-12">
        <Container size="md">
          {RELEASES.map((release, i) => (
            <article
              key={release.version}
              className={cn(
                "relative",
                i > 0 && "mt-16",
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={release.highlight ? "brand" : "outline"}>
                  {release.version}
                </Badge>
                <time className="text-sm text-ink-muted">{release.date}</time>
                {release.highlight && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                    <Sparkles className="size-3" aria-hidden />
                    Latest
                  </span>
                )}
              </div>
              <h2 className="text-display-sm mt-4 text-ink">{release.title}</h2>

              <div className="mt-6 space-y-3">
                {release.entries.map((entry, j) => {
                  const Icon = ICONS[entry.kind];
                  return (
                    <div
                      key={j}
                      className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-xl",
                          TONES[entry.kind],
                        )}
                      >
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-ink">
                          {entry.title}
                        </p>
                        <p className="mt-1 text-[14px] leading-relaxed text-ink-secondary">
                          {entry.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section pad="standard" surface="muted" id="roadmap">
        <Container size="md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            What&apos;s next
          </p>
          <h2 className="text-display-sm mt-3 text-ink">Roadmap</h2>
          <p className="mt-3 text-[15px] text-ink-secondary">
            Loosely committed. Order may shift based on customer requests.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ROADMAP.map((q) => (
              <div
                key={q.quarter}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {q.quarter}
                </p>
                <ul className="mt-4 space-y-2">
                  {q.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-[14.5px] text-ink"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400"
                        aria-hidden
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
