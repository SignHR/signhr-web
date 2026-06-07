"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
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
  // Kept as a raw string so the number input never stores NaN and never flips
  // between controlled types; parsed to a clamped number only for the quote.
  const [empRaw, setEmpRaw] = React.useState("100");
  const [addonIds, setAddonIds] = React.useState<Addon["id"][]>([]);

  const term = BILLING_TERMS.find((t) => t.id === termId) ?? BILLING_TERMS[0];
  const emp = clampEmployees(parseInt(empRaw, 10));
  const stepEmployees = (delta: number) =>
    setEmpRaw(String(clampEmployees((parseInt(empRaw, 10) || 0) + delta)));
  const quote = computeQuote({ employees: emp, addonIds, termId });
  const discounted = term.discount > 0;

  const selectedNames = ADDONS.filter((a) => addonIds.includes(a.id)).map(
    (a) => a.name,
  );
  const planLabel =
    `Core HR${selectedNames.length ? " + " + selectedNames.join(", ") : ""}` +
    ` · ${term.label} · ${emp} employees (≈${inr(quote.yearlyTotal)}/yr)`;

  const toggleAddon = (id: Addon["id"]) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

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
                  className="px-1.5 py-0 text-[10px] tracking-tight"
                >
                  {t.badge}
                </Badge>
              )}
            </BillingTab>
          ))}
        </div>

        <div className="mt-8">
          <label htmlFor="emp-count" className="text-[13px] font-medium text-ink">
            How many employees?
          </label>
          <div className="mt-2 flex w-fit items-center gap-2 rounded-xl border border-border bg-surface p-1">
            <Stepper label="Decrease employees" onClick={() => stepEmployees(-5)}>
              <Minus className="size-4" aria-hidden />
            </Stepper>
            <input
              id="emp-count"
              type="number"
              min={1}
              max={MAX_EMPLOYEES}
              value={empRaw}
              onChange={(e) => setEmpRaw(e.target.value)}
              onBlur={() => setEmpRaw(String(emp))}
              className="w-20 bg-transparent text-center font-mono text-[18px] font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Stepper label="Increase employees" onClick={() => stepEmployees(5)}>
              <Plus className="size-4" aria-hidden />
            </Stepper>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[13px] font-medium text-ink">Add-ons</p>
          <ul className="mt-2 space-y-2">
            {ADDONS.map((a) => {
              const on = addonIds.includes(a.id);
              const price =
                a.unit === "flat-month"
                  ? `${PRICING_CURRENCY.symbol}${a.price}/mo flat`
                  : `${PRICING_CURRENCY.symbol}${a.price}/emp/mo`;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={a.name}
                    onClick={() => toggleAddon(a.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
                      on
                        ? "border-brand-500/40 bg-brand-50"
                        : "border-border bg-surface hover:border-ink-muted",
                    )}
                  >
                    <span>
                      <span className="text-[14.5px] font-medium text-ink">
                        {a.name}
                      </span>
                      <span className="ml-2 text-[13px] text-ink-muted">
                        {price}
                      </span>
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
                </li>
              );
            })}
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
            {inr(quote.yearlyTotal)} <span className="text-ink-muted">/ year</span>
          </p>
        </div>

        {quote.savedVsMonthlyYear > 0 && (
          <p className="mt-3 text-xs text-success">
            You save {inr(quote.savedVsMonthlyYear)}/yr vs monthly billing
          </p>
        )}

        <DemoCta size="md" variant="brand" className="mt-6 w-full" plan={planLabel}>
          Book a demo
        </DemoCta>

        <p className="mt-3 text-center text-[11px] text-ink-muted">
          Prices in INR, exclusive of GST. 3-month free trial, no card.
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
        "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId="estimator-term-pill"
          className="absolute inset-0 -z-10 rounded-full bg-brand-50 ring-1 ring-brand-200"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {children}
    </button>
  );
}

function Stepper({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
    >
      {children}
    </button>
  );
}
