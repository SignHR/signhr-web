import type { Metadata } from "next";
import { Sparkles, Wrench, Bug, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { Badge } from "@/components/ui/badge";
import { CTABand } from "@/components/marketing/cta-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every release, in plain English. We ship every two weeks — here's what's new and what's next.",
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
    version: "v2.4.0",
    date: "April 28, 2026",
    title: "Asset Management is here",
    highlight: true,
    entries: [
      {
        kind: "feature",
        title: "Asset Management module",
        body: "Track every laptop, badge, and license across its lifecycle. QR-coded handovers, auto-allocated to onboarding flows, return checklists wired into offboarding. Available on Growth and Enterprise.",
      },
      {
        kind: "feature",
        title: "Mobile asset scan",
        body: "Scan a QR code on your phone to verify return condition, with photo capture and signature.",
      },
      {
        kind: "improvement",
        title: "Onboarding workflow speed",
        body: "Day-one provisioning steps now run in parallel where possible. Average onboarding completion time dropped 32%.",
      },
    ],
  },
  {
    version: "v2.3.5",
    date: "April 14, 2026",
    title: "Faster payroll, better filters",
    entries: [
      {
        kind: "improvement",
        title: "Payroll variance view",
        body: "New diff visualization shows what changed vs the previous cycle, by category. Catches anomalies in seconds.",
      },
      {
        kind: "improvement",
        title: "Employee directory filters",
        body: "Filter by department, location, employment type, manager, and tenure — combinable.",
      },
      {
        kind: "fix",
        title: "Slack notification deduplication",
        body: "Approval reminders no longer fire twice when a request is reassigned in the same minute.",
      },
    ],
  },
  {
    version: "v2.3.0",
    date: "March 31, 2026",
    title: "Workflow templates + Razorpay sync",
    entries: [
      {
        kind: "feature",
        title: "20 new workflow templates",
        body: "Common HR processes (offer letter, salary revision, role change, exit) now ship as one-click templates. Customize and publish in minutes.",
      },
      {
        kind: "feature",
        title: "Razorpay payroll integration",
        body: "Push approved payroll runs directly to Razorpay X for execution. Two-way sync of bank file status.",
      },
      {
        kind: "security",
        title: "SOC 2 Type II — renewed",
        body: "Our annual SOC 2 audit completed without findings. Updated report available in Trust Center.",
      },
    ],
  },
  {
    version: "v2.2.0",
    date: "March 17, 2026",
    title: "Multi-currency, multi-entity",
    entries: [
      {
        kind: "feature",
        title: "Multi-currency payroll",
        body: "Run payroll across INR, USD, EUR, GBP, AED and AUD from one workspace. Per-employee currency, per-entity reporting.",
      },
      {
        kind: "feature",
        title: "Multi-entity workspaces",
        body: "Run subsidiaries and regional entities from a single workspace with isolated data and rolled-up reports.",
      },
      {
        kind: "improvement",
        title: "API rate limits doubled",
        body: "1,000 requests/minute on Growth, 5,000/min on Enterprise. Webhook retries are now exponential backoff.",
      },
    ],
  },
  {
    version: "v2.1.0",
    date: "March 3, 2026",
    title: "Custom workflow builder, dark mode",
    entries: [
      {
        kind: "feature",
        title: "No-code workflow builder",
        body: "Drag, drop, branch. Build any approval workflow visually with conditional routing, parallel steps, and smart escalation.",
      },
      {
        kind: "feature",
        title: "Dark mode",
        body: "Available on web and mobile. Auto-syncs with your system setting; can be locked per user.",
      },
      {
        kind: "fix",
        title: "Calendar sync — Outlook",
        body: "Approved leave now correctly creates an all-day event in Outlook with the right time zone.",
      },
    ],
  },
];

const ROADMAP = [
  {
    quarter: "Q3 2026",
    items: [
      "Performance reviews with 360s",
      "Compensation planning workspace",
      "Public API SDK (TypeScript, Python)",
    ],
  },
  {
    quarter: "Q4 2026",
    items: [
      "Org chart printing & export refresh",
      "Goals & OKR tracking (light)",
      "Custom report builder",
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

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            We ship fast.{" "}
            <em className="serif-italic">See for yourself.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}
