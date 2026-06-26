"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DemoCta } from "@/components/marketing/demo-cta";
import {
  CORE_HR,
  ADDONS,
  BILLING_TERMS,
  PRICING_CURRENCY,
  computeQuote,
  type Addon,
  type BillingTerm,
} from "@/lib/pricing";

const inr = (n: number): string =>
  `${PRICING_CURRENCY.symbol}${Math.round(n).toLocaleString("en-IN")}`;

const MAX_EMPLOYEES = 100000;

const clampEmployees = (n: number): number =>
  Number.isFinite(n) && n >= 1 ? Math.min(Math.floor(n), MAX_EMPLOYEES) : 1;

export function PricingEstimator({ className }: { className?: string }) {
  const [termId, setTermId] = React.useState<BillingTerm["id"]>("3y");
  // Kept as raw strings so number inputs never store NaN and never flip
  // between controlled types; parsed to clamped numbers only for the quote.
  const [empRaw, setEmpRaw] = React.useState("100");
  const [addonIds, setAddonIds] = React.useState<Addon["id"][]>([]);
  // Per-add-on employee counts (raw strings), keyed by add-on id. Only
  // per-employee add-ons that are switched on have an entry.
  const [addonEmpRaw, setAddonEmpRaw] = React.useState<
    Partial<Record<Addon["id"], string>>
  >({});

  const term = BILLING_TERMS.find((t) => t.id === termId) ?? BILLING_TERMS[0];
  const emp = clampEmployees(parseInt(empRaw, 10));

  const addonEmployees: Partial<Record<Addon["id"], number>> = {};
  for (const id of addonIds) {
    const raw = addonEmpRaw[id];
    if (raw !== undefined)
      addonEmployees[id] = clampEmployees(parseInt(raw, 10));
  }

  const quote = computeQuote({
    employees: emp,
    addonIds,
    termId,
    addonEmployees,
  });
  const discounted = term.discount > 0;
  const subtotal = quote.lines.reduce((sum, l) => sum + l.monthlyBase, 0);
  const discountAmount = subtotal - quote.monthlyTotal;

  // Demo CTA summary: per-employee lines carry their headcount; flat add-ons
  // are listed without one.
  const planParts = quote.lines.map((l) =>
    l.unit === "per-emp-month" ? `${l.label} (${l.employees})` : l.label,
  );
  const planLabel = `${planParts.join(", ")} · ${term.label} · ≈${inr(quote.yearlyTotal)}/yr`;

  const toggleAddon = (a: Addon) => {
    const isOn = addonIds.includes(a.id);
    if (isOn) {
      setAddonIds((prev) => prev.filter((x) => x !== a.id));
      setAddonEmpRaw((m) => {
        const next = { ...m };
        delete next[a.id];
        return next;
      });
    } else {
      setAddonIds((prev) => [...prev, a.id]);
      // Per-employee add-ons seed their count to the current Core count.
      if (a.unit === "per-emp-month") {
        setAddonEmpRaw((m) => ({ ...m, [a.id]: String(emp) }));
      }
    }
  };

  return (
    <div
      className={cn(
        "mx-auto grid max-w-4xl gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:grid-cols-[1.2fr_1fr] md:p-8",
        className,
      )}
    >
      {/* Controls */}
      <div>
        <div className="flex w-fit items-center gap-1 rounded-full border border-border bg-surface p-1">
          {BILLING_TERMS.map((t) => (
            <BillingTab
              key={t.id}
              active={termId === t.id}
              onClick={() => setTermId(t.id)}
            >
              {t.label}
              {t.badge && (
                <Badge
                  variant="brand"
                  className="whitespace-nowrap px-1.5 py-0 text-[12px] tracking-tight"
                >
                  {t.badge}
                </Badge>
              )}
            </BillingTab>
          ))}
        </div>

        {/* Core HR — primary employee count */}
        <div className="mt-8">
          <p className="text-[13px] font-medium text-ink">
            Core HR — how many employees?
          </p>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-brand-500/40 bg-brand-50 p-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
              <Users className="size-4.5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-[14px] font-semibold text-ink">
                Core HR
              </span>
              <span className="text-[12px] text-ink-muted">
                {PRICING_CURRENCY.symbol}
                {CORE_HR.basePerEmpMonth}/emp/mo · always on
              </span>
            </span>
            <span className="flex-1" />
            <CountField
              value={empRaw}
              onChange={setEmpRaw}
              onBlur={() => setEmpRaw(String(emp))}
              ariaLabel="Core HR employees"
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[13px] font-medium text-ink">Add-ons</p>
          <ul className="mt-2 space-y-2">
            {ADDONS.map((a) => (
              <li key={a.id}>
                <AddonRow
                  addon={a}
                  on={addonIds.includes(a.id)}
                  onToggle={() => toggleAddon(a)}
                  countRaw={addonEmpRaw[a.id] ?? String(emp)}
                  onCountChange={(raw) =>
                    setAddonEmpRaw((m) => ({ ...m, [a.id]: raw }))
                  }
                  onCountBlur={() =>
                    setAddonEmpRaw((m) => ({
                      ...m,
                      [a.id]: String(
                        clampEmployees(parseInt(m[a.id] ?? "", 10)),
                      ),
                    }))
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col rounded-2xl border border-brand-500/30 bg-gradient-to-b from-brand-500/10 to-transparent p-6">
        <p className="text-[13px] text-ink-secondary">
          {CORE_HR.name} ·{" "}
          <span className="font-mono text-ink">
            {PRICING_CURRENCY.symbol}
            {quote.perEmpMonth}
          </span>
          /emp/mo
          {discounted && (
            <span className="ml-1 text-ink-muted line-through">
              {PRICING_CURRENCY.symbol}
              {CORE_HR.basePerEmpMonth}
            </span>
          )}
        </p>

        <div className="mt-4">
          <p className="flex items-baseline gap-1.5">
            <span className="font-mono text-[40px] font-semibold tracking-tight text-ink">
              {inr(quote.monthlyTotal)}
            </span>
            <span className="text-sm text-ink-muted">/month</span>
          </p>
          <p className="mt-1 text-[15px] text-ink-secondary">
            {inr(quote.yearlyTotal)}{" "}
            <span className="text-ink-muted">/ year</span>
          </p>
        </div>

        {quote.savedVsMonthlyYear > 0 && (
          <p className="mt-3 text-xs text-success">
            You save {inr(quote.savedVsMonthlyYear)}/yr vs monthly billing
          </p>
        )}

        {/* Itemised breakdown of the monthly total above. */}
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Breakdown
          </p>
          <div className="mt-3 space-y-2 text-[13px]">
            {quote.lines.map((line) => (
              <div
                key={line.id}
                className="flex items-baseline justify-between gap-3"
              >
                <span className="text-ink-secondary">
                  {line.label}
                  <span className="ml-1.5 text-ink-muted">
                    {line.unit === "flat-month"
                      ? "· flat"
                      : `· ${line.employees.toLocaleString("en-IN")} × ${inr(line.unitPrice)}`}
                  </span>
                </span>
                <span className="font-mono text-ink">
                  {inr(line.monthlyBase)}
                </span>
              </div>
            ))}

            {quote.lines.length > 1 && (
              <div className="flex items-baseline justify-between gap-3 border-t border-border pt-2">
                <span className="text-ink-secondary">Subtotal</span>
                <span className="font-mono text-ink">{inr(subtotal)}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-ink-secondary">
                  {term.label}
                  <span className="ml-1.5 text-ink-muted">
                    · −{Math.round(term.discount * 100)}%
                  </span>
                </span>
                <span className="font-mono text-success">
                  −{inr(discountAmount)}
                </span>
              </div>
            )}

            <div className="flex items-baseline justify-between gap-3 border-t border-border pt-2">
              <span className="font-medium text-ink">Total / month</span>
              <span className="font-mono font-semibold text-ink">
                {inr(quote.monthlyTotal)}
              </span>
            </div>
          </div>
        </div>

        <DemoCta
          size="md"
          variant="brand"
          className="mt-6 w-full"
          plan={planLabel}
        >
          Book a demo
        </DemoCta>

        <p className="mt-3 text-center text-[11px] text-ink-muted">
          Prices in INR, exclusive of GST.
        </p>
      </div>
    </div>
  );
}

function BillingTab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "text-ink border-1 bg-primary"
          : "text-ink-muted hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId="estimator-term-pill"
          className="absolute inset-0 -z-10 rounded-full bg-white/10 shadow-sm ring-1 ring-white/40"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {children}
    </button>
  );
}

function AddonRow({
  addon,
  on,
  onToggle,
  countRaw,
  onCountChange,
  onCountBlur,
}: {
  addon: Addon;
  on: boolean;
  onToggle: () => void;
  countRaw: string;
  onCountChange: (raw: string) => void;
  onCountBlur: () => void;
}) {
  const perEmp = addon.unit === "per-emp-month";
  const price = perEmp
    ? `${PRICING_CURRENCY.symbol}${addon.price}/emp/mo`
    : `${PRICING_CURRENCY.symbol}${addon.price}/mo flat`;
  return (
    <div
      className={cn(
        "rounded-xl border p-3 transition-colors",
        on
          ? "border-brand-500/40 bg-brand-50"
          : "border-border bg-surface hover:border-ink-muted",
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={addon.name}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span>
          <span className="text-[14.5px] font-medium text-ink">
            {addon.name}
          </span>
          <span className="ml-2 text-[13px] text-ink-muted">{price}</span>
        </span>
        <span
          aria-hidden
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
            on ? "bg-brand-600" : "bg-ink-muted/30",
          )}
        >
          <span
            className={cn(
              "inline-block size-4 rounded-full bg-white transition-transform",
              on ? "translate-x-[18px]" : "translate-x-0.5",
            )}
          />
        </span>
      </button>

      {on && perEmp && (
        <div className="mt-3 flex items-center gap-3 border-t border-dashed border-border pt-3">
          <span className="text-[12px] text-ink-muted">
            Employees on this add-on
          </span>
          <span className="flex-1" />
          <CountField
            size="sm"
            value={countRaw}
            onChange={onCountChange}
            onBlur={onCountBlur}
            ariaLabel={`${addon.name} employees`}
          />
        </div>
      )}
    </div>
  );
}

function CountField({
  value,
  onChange,
  onBlur,
  step = 5,
  ariaLabel,
  size = "md",
}: {
  value: string;
  onChange: (raw: string) => void;
  onBlur: () => void;
  step?: number;
  ariaLabel: string;
  size?: "md" | "sm";
}) {
  const bump = (delta: number) =>
    onChange(String(clampEmployees((parseInt(value, 10) || 0) + delta)));
  const sm = size === "sm";
  return (
    <div className="flex w-fit items-center gap-1 rounded-xl border border-border bg-surface p-1">
      <CountButton
        label={`Decrease ${ariaLabel}`}
        onClick={() => bump(-step)}
        sm={sm}
      >
        <Minus className="size-4" aria-hidden />
      </CountButton>
      <input
        type="number"
        min={1}
        max={MAX_EMPLOYEES}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          "bg-transparent text-center font-mono font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          sm ? "w-12 text-[15px]" : "w-20 text-[18px]",
        )}
      />
      <CountButton
        label={`Increase ${ariaLabel}`}
        onClick={() => bump(step)}
        sm={sm}
      >
        <Plus className="size-4" aria-hidden />
      </CountButton>
    </div>
  );
}

function CountButton({
  label,
  onClick,
  sm,
  children,
}: {
  label: string;
  onClick: () => void;
  sm: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700",
        sm ? "size-7" : "size-9",
      )}
    >
      {children}
    </button>
  );
}
