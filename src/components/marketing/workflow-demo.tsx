"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import {
  User,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Play,
  Pause,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StepKind = "employee" | "manager" | "hr" | "approved";

type Step = {
  kind: StepKind;
  actor: string;
  role: string;
  label: string;
  detail: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  {
    kind: "employee",
    actor: "Priya Menon",
    role: "Designer",
    label: "Leave request submitted",
    detail: "May 8 – May 9 · Casual leave",
    timestamp: "10:14 AM",
    icon: User,
  },
  {
    kind: "manager",
    actor: "Karthik R.",
    role: "Engineering manager",
    label: "Approved in Slack",
    detail: "One-tap approve · no app switch",
    timestamp: "10:16 AM",
    icon: UserCheck,
  },
  {
    kind: "hr",
    actor: "Anita Verma",
    role: "People ops",
    label: "HR review auto-skipped",
    detail: "Policy: requests ≤ 3 days bypass HR",
    timestamp: "10:16 AM",
    icon: Briefcase,
  },
  {
    kind: "approved",
    actor: "SignHR",
    role: "System",
    label: "Approved & on calendar",
    detail: "Synced to Google · team notified",
    timestamp: "10:16 AM",
    icon: CheckCircle2,
  },
];

const STEP_DURATION = 2400;

export function WorkflowDemo({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%", once: false });
  const reduce = useReducedMotion();

  const [active, setActive] = React.useState(reduce ? STEPS.length - 1 : 0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (reduce || !inView || !playing) return;
    const id = window.setInterval(() => {
      setActive((s) => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => window.clearInterval(id);
  }, [inView, playing, reduce]);

  const completedCount = active + 1;
  const progressPct = (completedCount / STEPS.length) * 100;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card",
        className,
      )}
    >
      {/* Header band */}
      <div className="relative border-b border-border bg-gradient-to-br from-card via-card to-muted/40 px-6 py-6 md:px-10 md:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Live workflow
              </p>
            </div>
            <h3 className="text-display-sm mt-3 max-w-[22ch] text-ink">
              One leave request, four people, zero email threads.
            </h3>
            <p className="mt-2 max-w-[52ch] text-[14px] text-ink-muted">
              Watch a real approval move from request to calendar — no chasing,
              no copy-paste, no &ldquo;did you see my email?&rdquo;
            </p>
          </div>

          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause workflow demo" : "Play workflow demo"}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-[12px] font-medium text-ink-muted transition-colors hover:bg-muted hover:text-ink"
            >
              {playing ? (
                <>
                  <Pause className="size-3.5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="size-3.5" />
                  Play
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress meter */}
        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600"
            />
          </div>
          <span className="shrink-0 font-mono text-[11px] text-ink-muted">
            {completedCount} / {STEPS.length}
          </span>
        </div>
      </div>

      {/* Body: timeline + preview */}
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Timeline */}
        <ol className="relative px-6 py-8 md:border-r md:border-border md:px-10">
          {STEPS.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;
            const isLast = i === STEPS.length - 1;
            return (
              <li key={step.kind} className="relative pl-12 pb-7 last:pb-0">
                {/* Vertical rail */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[18px] top-10 h-[calc(100%-1.25rem)] w-px bg-border"
                  />
                )}
                {!isLast && (
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleY: isDone ? 1 : 0 }}
                    style={{ transformOrigin: "top" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute left-[18px] top-10 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-brand-500 to-brand-600"
                  />
                )}

                {/* Node */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                    isActive
                      ? "border-brand-500 bg-brand-500 text-primary-foreground shadow-[0_0_0_6px_hsl(var(--brand-100))]"
                      : isDone
                        ? "border-success bg-success/15 text-success"
                        : "border-border bg-card text-ink-muted",
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <step.icon className="size-4" />
                  )}
                </motion.span>

                {/* Content */}
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className={cn(
                      "text-[14px] font-semibold transition-colors",
                      isActive || isDone ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {step.label}
                  </p>
                  <span className="shrink-0 font-mono text-[11px] text-ink-muted">
                    {step.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-ink-muted">{step.detail}</p>
                <div className="mt-2 flex items-center gap-2 text-[12px] text-ink-muted">
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold uppercase",
                      isActive
                        ? "bg-brand-100 text-brand-700"
                        : "bg-muted text-ink-muted",
                    )}
                  >
                    {step.actor.charAt(0)}
                  </span>
                  <span className="text-ink-secondary">{step.actor}</span>
                  <span className="text-ink-muted">·</span>
                  <span>{step.role}</span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Preview panel */}
        <div className="relative min-h-[320px] bg-gradient-to-br from-muted/30 via-card to-brand-50/40 px-6 py-8 md:px-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Preview
            </span>
            <span className="font-mono text-[10px] text-ink-muted">
              step {active + 1}
            </span>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={STEPS[active].kind}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Preview step={STEPS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4 md:px-10">
        <div className="flex items-center gap-2 text-[13px] text-ink-muted">
          <Clock className="size-3.5" />
          <span>
            Average resolution on Growth plan:{" "}
            <span className="font-mono text-ink">2 min 14 sec</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-ink-muted">
          <Sparkles className="size-3.5 text-brand-600" />
          <span>Powered by SignHR Workflows</span>
        </div>
      </div>
    </div>
  );
}

function Preview({ step }: { step: Step }) {
  switch (step.kind) {
    case "employee":
      return (
        <PreviewCard title="New leave request" badge="Submitted">
          <div className="space-y-3">
            <Field label="Type" value="Casual leave" />
            <Field label="Dates" value="Fri, May 8 → Sat, May 9" />
            <Field label="Days" value="2 working days" />
            <Field
              label="Reason"
              value="Family wedding in Coimbatore."
              multiline
            />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-[12px] text-brand-700">
            <Calendar className="size-3.5" />
            Routed to Karthik R. for approval
          </div>
        </PreviewCard>
      );
    case "manager":
      return (
        <PreviewCard title="#leave-requests" badge="Slack">
          <div className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-500 text-[13px] font-semibold text-primary-foreground">
              S
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-semibold text-ink">
                  SignHR
                </span>
                <span className="rounded bg-muted px-1 text-[9px] font-medium uppercase tracking-wide text-ink-muted">
                  App
                </span>
                <span className="font-mono text-[10px] text-ink-muted">
                  10:14 AM
                </span>
              </div>
              <p className="mt-1 text-[13px] text-ink-secondary">
                <span className="font-medium text-ink">Priya Menon</span>{" "}
                requested <span className="font-medium text-ink">2 days</span>{" "}
                of casual leave (May 8 – May 9).
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-1 rounded-md bg-success px-3 text-[12px] font-medium text-white shadow-sm"
                >
                  <CheckCircle2 className="size-3" />
                  Approve
                </button>
                <button
                  type="button"
                  className="inline-flex h-7 items-center rounded-md border border-border bg-card px-3 text-[12px] font-medium text-ink-secondary"
                >
                  Decline
                </button>
                <button
                  type="button"
                  className="inline-flex h-7 items-center rounded-md border border-border bg-card px-3 text-[12px] font-medium text-ink-secondary"
                >
                  Discuss
                </button>
              </div>
            </div>
          </div>
        </PreviewCard>
      );
    case "hr":
      return (
        <PreviewCard title="Policy engine" badge="Auto-skipped">
          <div className="space-y-3">
            <PolicyRow
              label="Tenure"
              value="2y 4mo"
              ok
              note="≥ 6 months required"
            />
            <PolicyRow
              label="Duration"
              value="2 days"
              ok
              note="≤ 3 days bypasses HR"
            />
            <PolicyRow
              label="Balance"
              value="9 days left"
              ok
              note="of 12 annual"
            />
            <PolicyRow
              label="Team capacity"
              value="83%"
              ok
              note="above 60% threshold"
            />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-[12px] text-success">
            <CheckCircle2 className="size-3.5" />
            All checks passed — HR review skipped
          </div>
        </PreviewCard>
      );
    case "approved":
      return (
        <PreviewCard title="Calendar — May 2026" badge="Synced">
          <div className="grid grid-cols-7 gap-1 text-center">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span
                key={`${d}-${i}`}
                className="text-[10px] font-medium uppercase text-ink-muted"
              >
                {d}
              </span>
            ))}
            {Array.from({ length: 14 }).map((_, i) => {
              const day = i + 1;
              const isLeave = day === 8 || day === 9;
              return (
                <span
                  key={day}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-md text-[11px]",
                    isLeave
                      ? "bg-brand-500 font-semibold text-primary-foreground"
                      : "text-ink-secondary",
                  )}
                >
                  {day}
                </span>
              );
            })}
          </div>
          <div className="mt-4 space-y-2">
            <NotificationRow
              icon={MessageSquare}
              text="Posted to #design-team"
            />
            <NotificationRow icon={Calendar} text="Added to Google Calendar" />
            <NotificationRow
              icon={UserCheck}
              text="Karthik notified · backup assigned"
            />
          </div>
        </PreviewCard>
      );
  }
}

function PreviewCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_24px_60px_-32px_rgba(15,15,40,0.18)]">
      <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 text-[12px]",
        multiline ? "flex-col" : "items-baseline justify-between",
      )}
    >
      <span className="shrink-0 uppercase tracking-wide text-ink-muted text-[10px] font-semibold">
        {label}
      </span>
      <span className="text-ink-secondary">{value}</span>
    </div>
  );
}

function PolicyRow({
  label,
  value,
  note,
  ok,
}: {
  label: string;
  value: string;
  note: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          ok ? "bg-success/15 text-success" : "bg-muted text-ink-muted",
        )}
      >
        <CheckCircle2 className="size-3" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-medium text-ink">{label}</span>
          <span className="font-mono text-[11px] text-ink-secondary">
            {value}
          </span>
        </div>
        <p className="text-[11px] text-ink-muted">{note}</p>
      </div>
    </div>
  );
}

function NotificationRow({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-[12px] text-ink-secondary">
      <Icon className="size-3.5 text-brand-600" />
      {text}
    </div>
  );
}
