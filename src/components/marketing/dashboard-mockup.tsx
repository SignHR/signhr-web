import * as React from "react";
import {
  Users,
  Calendar,
  Clock,
  Wallet,
  Sparkles,
  TrendingUp,
  Bell,
  Search,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { LogoMark } from "@/components/icons/logo";
import { cn } from "@/lib/utils";

interface DashboardMockupProps {
  className?: string;
}

/**
 * Simplified, hero-scale dashboard mockup. Built as real DOM (no images),
 * deliberately spare so it reads in under two seconds at hero size.
 *
 * Layout: window chrome → narrow sidebar → main with single greeting band,
 * three breathing stat cards, and one focused approval card with a sparkline.
 */
export function DashboardMockup({ className }: DashboardMockupProps) {
  return (
    <div
      role="img"
      aria-label="SignHR product dashboard preview"
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-border/80 bg-card",
        "shadow-[0_60px_120px_-40px_rgba(45,30,90,0.40),0_30px_70px_-20px_rgba(45,30,90,0.20)] ring-1 ring-black/[0.04]",
        "select-none",
        className,
      )}
    >
      {/* Browser-style chrome */}
      <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-b from-card to-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex h-7 items-center gap-2 rounded-md bg-muted/60 px-3 text-[12px] text-ink-muted">
          <span className="size-1.5 rounded-full bg-success/80" />
          app.signhr.io
        </div>
        <div className="w-14" />
      </div>

      {/* App body */}
      <div className="grid grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-border/60 bg-muted/20 p-4">
          <div className="flex items-center gap-2">
            <LogoMark className="size-7" />
            <span className="text-[14px] font-semibold tracking-tight text-ink">
              SignHR
            </span>
          </div>

          <nav className="mt-6 space-y-1">
            <SidebarItem icon={TrendingUp} label="Overview" active />
            <SidebarItem icon={Users} label="People" />
            <SidebarItem icon={Calendar} label="Leave" badge="3" />
            <SidebarItem icon={Clock} label="Attendance" />
            <SidebarItem icon={Wallet} label="Payroll" />
            <SidebarItem icon={Sparkles} label="Workflows" />
          </nav>
        </aside>

        {/* Main */}
        <div className="bg-background">
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-border/60 bg-card px-6 py-3">
            <div className="flex items-center gap-2 text-[12px] text-ink-muted">
              <span>Workspace</span>
              <span className="text-ink-muted/50">/</span>
              <span className="font-medium text-ink">Overview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-44 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[12px] text-ink-muted">
                <Search className="size-3.5" aria-hidden />
                Search
                <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </span>
              </div>
              <button
                type="button"
                aria-label="Notifications"
                tabIndex={-1}
                className="relative flex size-8 items-center justify-center rounded-lg text-ink-muted hover:bg-muted"
              >
                <Bell className="size-4" aria-hidden />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-[11px] font-semibold text-white">
                AR
              </div>
            </div>
          </div>

          {/* Content — generous, hero-friendly spacing */}
          <div className="space-y-6 p-7">
            {/* Greeting */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[12px] text-ink-muted">Tuesday, April 30</p>
                <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-ink">
                  Good morning, Anita
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[12px] font-medium text-success">
                <CheckCircle2 className="size-3.5" aria-hidden />
                All on track
              </span>
            </div>

            {/* Stat cards — three only, generous */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="People" value="248" delta="+4 this month" />
              <StatCard label="On leave today" value="6" delta="2 unplanned" />
              <StatCard
                label="Pending approvals"
                value="3"
                delta="2 leave · 1 expense"
                tone="brand"
              />
            </div>

            {/* Focused approval + sparkline */}
            <div className="grid grid-cols-5 gap-4">
              <FeatureApproval className="col-span-3" />
              <SparklineCard className="col-span-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── sub-components ──────────────── */

function SidebarItem({
  icon: Icon,
  label,
  active,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-2.5 py-2 text-[12.5px] transition-colors",
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-ink-muted hover:bg-muted",
      )}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="size-4" />
        {label}
      </span>
      {badge && (
        <span className="rounded bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "brand";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 transition-colors",
        tone === "brand"
          ? "border-brand-200 bg-gradient-to-br from-brand-50/60 to-card"
          : "border-border",
      )}
    >
      <p className="text-[12px] text-ink-muted">{label}</p>
      <p className="mt-2 text-[28px] font-semibold tracking-tight text-ink">
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-[11.5px]",
          tone === "brand" ? "text-brand-700" : "text-ink-muted",
        )}
      >
        {delta}
      </p>
    </div>
  );
}

function FeatureApproval({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink">Approval queue</p>
        <button tabIndex={-1} className="text-[11.5px] font-medium text-brand-600">
          View all
        </button>
      </div>

      {/* Highlighted top approval */}
      <div className="mt-4 flex items-center gap-4 rounded-xl border border-brand-200 bg-brand-50/40 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-orange-300 text-[12px] font-semibold text-white">
          PM
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-ink">
            Priya Mehta · Casual leave
          </p>
          <p className="text-[11.5px] text-ink-muted">May 2 — May 3 · Manager approved</p>
        </div>
        <button tabIndex={-1} className="rounded-lg bg-success px-3 py-1.5 text-[11.5px] font-semibold text-white shadow-sm">
          Approve
        </button>
        <button tabIndex={-1} className="rounded-lg border border-border px-3 py-1.5 text-[11.5px] font-medium text-ink-muted">
          Skip
        </button>
      </div>

      {/* Two muted rows */}
      <div className="mt-2 space-y-2">
        <MutedRow initials="KI" name="Karthik Iyer" kind="Comp-off · May 4" />
        <MutedRow
          initials="MC"
          name="Marcus Chen"
          kind="Expense ₹4,820 · Mumbai travel"
        />
      </div>
    </div>
  );
}

function MutedRow({
  initials,
  name,
  kind,
}: {
  initials: string;
  name: string;
  kind: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10.5px] font-semibold text-ink-secondary">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-medium text-ink">{name}</p>
      </div>
      <span className="text-[11.5px] text-ink-muted">{kind}</span>
    </div>
  );
}

function SparklineCard({ className }: { className?: string }) {
  // Smooth bell-ish curve ending in upward trend
  const path =
    "M0,42 C18,40 36,32 54,28 C72,24 90,30 108,24 C126,18 144,12 162,16 C180,20 198,10 216,6";
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink">This week</p>
        <span className="text-[11.5px] text-ink-muted">Hours logged</span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <p className="font-mono text-[26px] font-semibold tracking-tight text-ink">
          1,284
        </p>
        <span className="inline-flex items-center gap-0.5 text-[11.5px] font-medium text-success">
          <ArrowUpRight className="size-3" />
          6.2%
        </span>
      </div>

      <svg
        viewBox="0 0 220 56"
        className="mt-3 h-14 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "hsl(var(--brand-500))" }} stopOpacity="0.32" />
            <stop offset="100%" style={{ stopColor: "hsl(var(--brand-500))" }} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L220,56 L0,56 Z`} fill="url(#spark-fill)" />
        <path
          d={path}
          fill="none"
          style={{ stroke: "hsl(var(--brand-500))" }}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="216" cy="6" r="3.5" style={{ fill: "hsl(var(--brand-500))" }} />
        <circle cx="216" cy="6" r="6" style={{ fill: "hsl(var(--brand-500))" }} fillOpacity="0.18" />
      </svg>

      <p className="mt-2 text-[11.5px] text-ink-muted">vs 1,209 last week</p>
    </div>
  );
}
