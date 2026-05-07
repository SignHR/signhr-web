import * as React from "react";
import {
  CheckCircle2,
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Laptop,
  Plug,
  Building2,
} from "lucide-react";
import type { SpotlightMockup } from "@/lib/features";
import { cn } from "@/lib/utils";

interface SpotlightMockupViewProps {
  mockup: SpotlightMockup;
  className?: string;
}

const FRAME =
  "relative overflow-hidden rounded-[18px] border border-border/80 bg-card shadow-[0_30px_70px_-20px_rgba(45,30,90,0.22),0_12px_40px_-12px_rgba(45,30,90,0.12)] ring-1 ring-black/[0.03]";

export function SpotlightMockupView({
  mockup,
  className,
}: SpotlightMockupViewProps) {
  const wrapperClass = cn(FRAME, className);

  switch (mockup.kind) {
    case "profile":
      return <Profile className={wrapperClass} />;
    case "attendance":
      return <Attendance className={wrapperClass} />;
    case "leave-calendar":
      return <LeaveCalendar className={wrapperClass} />;
    case "payroll":
      return <Payroll className={wrapperClass} />;
    case "onboarding":
      return <Onboarding className={wrapperClass} />;
    case "offboarding":
      return <Offboarding className={wrapperClass} />;
    case "self-service":
      return <SelfService className={wrapperClass} />;
    case "workflow":
      return <Workflow className={wrapperClass} />;
    case "assets":
      return <Assets className={wrapperClass} />;
    case "org-chart":
      return <OrgChart className={wrapperClass} />;
  }
}

/* ───────────────── individual mockups ──────────────────── */

function Profile({ className }: { className?: string }) {
  return (
    <div
      className={className}
      role="img"
      aria-label="Employee profile preview"
    >
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        People / Anita Reddy
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-base font-semibold text-white">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-ink">Anita Reddy</p>
            <p className="text-[12px] text-ink-muted">
              Head of People · Bengaluru, IN
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
            <CheckCircle2 className="size-3" />
            Active
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ProfileField label="Joined" value="14 Mar 2022" />
          <ProfileField label="Department" value="People Ops" />
          <ProfileField label="Manager" value="Marcus Chen" />
          <ProfileField label="Employment" value="Full-time" />
          <ProfileField label="Tenure" value="3y 1m" />
          <ProfileField label="Annual leave" value="14 / 21 days" />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-brand-300 bg-brand-50/60 p-3">
          <p className="text-[11px] text-brand-700">
            HR-only fields locked: salary, contracts, performance.
          </p>
          <ShieldCheck className="size-4 text-brand-600" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-ink">{value}</p>
    </div>
  );
}

function Attendance({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Attendance check-in">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Attendance / Today
      </div>
      <div className="p-5">
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">
            Tuesday
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-tight">
            09:42 AM
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-white/80">
            <MapPin className="size-3.5" /> Bengaluru office · verified
          </div>
          <button className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-[13px] font-semibold text-brand-700">
            Clock in
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {[
            { name: "Marcus Chen", time: "09:14", status: "On time" },
            { name: "Karthik Iyer", time: "09:32", status: "On time" },
            { name: "Priya Mehta", time: "—", status: "On leave", warn: true },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 text-[12px]"
            >
              <span className="font-medium text-ink">{row.name}</span>
              <span className="font-mono text-[11px] text-ink-muted">
                {row.time}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  row.warn
                    ? "bg-accent/15 text-accent-foreground"
                    : "bg-success/10 text-success",
                )}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaveCalendar({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Leave calendar">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px]">
        <span className="text-ink-muted">Leave / May 2026</span>
        <span className="rounded-md bg-card px-2 py-0.5 font-medium text-ink">
          Team
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 text-[10px] text-ink-muted">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="text-center font-medium">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 2;
            const inMonth = day >= 1 && day <= 31;
            const today = day === 7;
            const has =
              [3, 8, 9, 14, 15, 22, 28, 29].includes(day) && inMonth;
            return (
              <div
                key={i}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-md text-[11px]",
                  inMonth ? "bg-muted/20 text-ink" : "text-ink-muted/40",
                  today && "ring-2 ring-primary",
                  has && "bg-brand-50 text-brand-700",
                )}
              >
                {inMonth ? day : ""}
                {has && (
                  <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 space-y-1.5">
          <LeaveRow
            who="Priya Mehta"
            range="May 8 – 9"
            kind="Casual"
            tone="brand"
          />
          <LeaveRow
            who="Karthik Iyer"
            range="May 14"
            kind="Sick"
            tone="amber"
          />
          <LeaveRow
            who="Marcus Chen"
            range="May 22"
            kind="Comp-off"
            tone="success"
          />
        </div>
      </div>
    </div>
  );
}

function LeaveRow({
  who,
  range,
  kind,
  tone,
}: {
  who: string;
  range: string;
  kind: string;
  tone: "brand" | "amber" | "success";
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px]">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 rounded-full",
            tone === "brand" && "bg-primary",
            tone === "amber" && "bg-accent",
            tone === "success" && "bg-success",
          )}
        />
        <span className="font-medium text-ink">{who}</span>
      </div>
      <span className="text-ink-muted">
        {range} · {kind}
      </span>
    </div>
  );
}

function Payroll({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Payroll run">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Payroll / April 2026
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-muted">Total payout</p>
            <p className="mt-0.5 font-mono text-2xl font-semibold tracking-tight text-ink">
              ₹ 38,42,640
            </p>
          </div>
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            Approved
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
          <PayrollStat label="Headcount" value="248" />
          <PayrollStat label="Bonuses" value="₹1.2L" tone="up" />
          <PayrollStat label="Deductions" value="₹3.8L" />
        </div>

        <div className="mt-4 rounded-xl border border-border bg-muted/20 p-3">
          <p className="text-[11px] font-medium text-ink">Variance vs March</p>
          <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted">
            <span className="h-full w-[62%] bg-primary" />
            <span className="h-full w-[18%] bg-success" />
            <span className="h-full w-[8%] bg-accent" />
            <span className="h-full w-[12%] bg-muted-foreground/40" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-ink-muted">
            <span>Salary +2.1%</span>
            <span>New joiners +0.4%</span>
            <span>Bonuses +0.6%</span>
            <span>Other +0.2%</span>
          </div>
        </div>

        <button className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-[12px] font-medium text-primary-foreground">
          Generate bank file
          <ArrowRight className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function PayrollStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up";
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-2.5 py-2">
      <p className="text-[10px] text-ink-muted">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-mono font-semibold text-ink",
          tone === "up" && "text-success",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Onboarding({ className }: { className?: string }) {
  const tasks = [
    { label: "Offer letter signed", done: true },
    { label: "Documents uploaded", done: true },
    { label: "Bank details verified", done: true },
    { label: "Laptop assigned", done: true },
    { label: "Google & SSO access", done: false, current: true },
    { label: "Day-one welcome call", done: false },
    { label: "Buddy intro lunch", done: false },
  ];
  return (
    <div className={className} role="img" aria-label="Onboarding checklist">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Onboarding / Aarav Singh
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-semibold text-ink">Aarav Singh</p>
            <p className="text-[11px] text-ink-muted">
              Software Engineer · Joining May 6
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-ink-muted">Progress</p>
            <p className="font-mono text-[14px] font-semibold text-brand-700">
              4 / 7
            </p>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[57%] bg-gradient-to-r from-brand-400 to-brand-600" />
        </div>

        <ul className="mt-4 space-y-1.5">
          {tasks.map((t, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[12px]",
                t.current && "border-brand-300 bg-brand-50/60",
              )}
            >
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full",
                  t.done
                    ? "bg-success/15 text-success"
                    : t.current
                      ? "bg-primary text-primary-foreground"
                      : "border border-border",
                )}
              >
                {t.done && <CheckCircle2 className="size-3" />}
              </span>
              <span
                className={cn(
                  "flex-1",
                  t.done ? "text-ink-muted line-through" : "text-ink",
                )}
              >
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Offboarding({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Offboarding checklist">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Offboarding / Marcus Chen
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-3">
          <div>
            <p className="text-[12px] font-semibold text-ink">
              Last working day · May 23
            </p>
            <p className="text-[11px] text-ink-muted">
              Notice 30 days · Handover scheduled
            </p>
          </div>
          <CalendarDays className="size-4 text-ink-muted" aria-hidden />
        </div>

        <div className="mt-3 space-y-1.5 text-[12px]">
          {[
            { label: "Resignation accepted", who: "People Ops", done: true },
            { label: "Knowledge transfer", who: "Engineering", done: true },
            { label: "Asset return — laptop, badge", who: "IT", done: false },
            { label: "Revoke SSO + Google", who: "IT", done: false },
            { label: "Final settlement preview", who: "Payroll", done: false },
            { label: "Experience letter", who: "People Ops", done: false },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-3.5 rounded-full",
                    row.done
                      ? "bg-success/20 ring-1 ring-success/40"
                      : "border border-border",
                  )}
                />
                <span className="text-ink">{row.label}</span>
              </div>
              <span className="text-[10px] text-ink-muted">{row.who}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelfService({ className }: { className?: string }) {
  return (
    <div
      className={cn(className, "max-w-[300px]")}
      role="img"
      aria-label="Employee self-service"
    >
      {/* Phone-style frame */}
      <div className="rounded-t-[18px] bg-ink px-4 py-1 text-center text-[10px] text-white/60">
        SignHR for iOS
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-muted">Hi, Priya</p>
            <p className="text-[14px] font-semibold text-ink">
              You have 2 things today
            </p>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-orange-300 text-[11px] font-semibold text-white">
            PM
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-white">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-white/70">Annual leave balance</p>
            <CalendarDays className="size-3.5 text-white/80" aria-hidden />
          </div>
          <p className="mt-0.5 font-mono text-2xl font-semibold tracking-tight">
            14<span className="text-base text-white/60"> / 21</span>
          </p>
          <button className="mt-2 inline-flex h-7 items-center rounded-lg bg-white/20 px-2.5 text-[11px] font-medium text-white">
            Request time off
          </button>
        </div>

        <div className="space-y-1.5">
          <SelfServiceRow
            icon={CheckCircle2}
            title="Approve Marcus's leave"
            meta="Action needed"
            tone="warn"
          />
          <SelfServiceRow
            icon={FileText}
            title="Sign updated handbook"
            meta="2 min read"
          />
          <SelfServiceRow
            icon={Clock}
            title="Last clock-in 09:14"
            meta="Today, Bengaluru"
          />
        </div>
      </div>
    </div>
  );
}

function SelfServiceRow({
  icon: Icon,
  title,
  meta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  meta: string;
  tone?: "warn";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-card p-2.5",
        tone === "warn" && "border-accent/40 bg-accent/5",
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-lg",
          tone === "warn"
            ? "bg-accent/15 text-accent-foreground"
            : "bg-brand-50 text-brand-600",
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-ink">{title}</p>
        <p className="text-[10px] text-ink-muted">{meta}</p>
      </div>
      <ArrowRight className="size-3.5 text-ink-muted" aria-hidden />
    </div>
  );
}

function Workflow({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Workflow builder">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Workflows / Leave approval
      </div>
      <div className="p-5">
        <div className="space-y-2">
          <WorkflowNode
            badge="1"
            title="Request submitted"
            meta="Employee"
            tone="ink"
          />
          <Connector />
          <WorkflowNode
            badge="2"
            title="Manager review"
            meta="Approve · Reject · Comment"
            tone="brand"
          />
          <Connector />
          <WorkflowNode
            badge="3"
            title="If &gt; 5 days → HRBP"
            meta="Conditional"
            tone="amber"
          />
          <Connector />
          <WorkflowNode
            badge="4"
            title="Notify & sync calendar"
            meta="Google · Outlook · SMS"
            tone="success"
          />
        </div>
      </div>
    </div>
  );
}

function WorkflowNode({
  badge,
  title,
  meta,
  tone,
}: {
  badge: string;
  title: string;
  meta: string;
  tone: "ink" | "brand" | "amber" | "success";
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-white"
      : tone === "brand"
        ? "bg-primary text-primary-foreground"
        : tone === "amber"
          ? "bg-accent text-accent-foreground"
          : "bg-success text-success-foreground";
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-lg text-[11px] font-semibold",
          toneClass,
        )}
      >
        {badge}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className="text-[12px] font-medium text-ink"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-[10px] text-ink-muted">{meta}</p>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="ml-3.5 h-3 w-px bg-border" aria-hidden />;
}

function Assets({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Asset register">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Assets / Allocated
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-ink">
            248 active assignments
          </p>
          <button className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
            Assign
          </button>
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            {
              kind: "Laptop",
              model: 'MacBook Pro 14" M3',
              who: "Aarav Singh",
              tag: "MBP-0148",
              icon: Laptop,
            },
            {
              kind: "Display",
              model: 'Dell UltraSharp 27"',
              who: "Priya Mehta",
              tag: "DSP-0042",
              icon: Building2,
            },
            {
              kind: "Adapter",
              model: "Anker USB-C Hub",
              who: "Marcus Chen",
              tag: "ACC-0211",
              icon: Plug,
            },
          ].map((row) => (
            <div
              key={row.tag}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <row.icon className="size-3.5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-ink">
                  {row.model}
                </p>
                <p className="text-[10px] text-ink-muted">
                  {row.kind} · {row.who}
                </p>
              </div>
              <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                {row.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrgChart({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Org chart">
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-ink-muted">
        Org chart / Live
      </div>
      <div className="p-6">
        <div className="flex justify-center">
          <Node name="Anita Reddy" role="Head of People" gradient="from-amber-300 to-rose-400" />
        </div>
        <div className="my-2 mx-auto h-4 w-px bg-border" />
        <div className="grid grid-cols-3 gap-3">
          <Node
            name="Aisha Patel"
            role="HR Manager"
            gradient="from-violet-300 to-indigo-400"
          />
          <Node
            name="Marcus Chen"
            role="Operations"
            gradient="from-teal-300 to-emerald-400"
          />
          <Node
            name="Faiza Khan"
            role="Payroll Lead"
            gradient="from-pink-300 to-orange-300"
          />
        </div>
        <div className="mt-2 text-center text-[10px] text-ink-muted">
          + 6 more direct reports
        </div>
      </div>
    </div>
  );
}

function Node({
  name,
  role,
  gradient,
}: {
  name: string;
  role: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white",
          gradient,
        )}
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-ink">{name}</p>
        <p className="text-[10px] text-ink-muted">{role}</p>
      </div>
    </div>
  );
}
