"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCta } from "@/components/marketing/demo-cta";
import {
  CORE_HR,
  BILLING_TERMS,
  PRICING_CURRENCY,
  computeQuote,
  type BillingTerm,
} from "@/lib/pricing";

interface CoreHrCardProps {
  /** The term selected on first render; visitors can switch it via the toggle. */
  defaultTermId?: BillingTerm["id"];
  className?: string;
}

export function CoreHrCard({ defaultTermId = "3y", className }: CoreHrCardProps) {
  const [selectedId, setSelectedId] =
    React.useState<BillingTerm["id"]>(defaultTermId);
  const pillId = React.useId();

  const term =
    BILLING_TERMS.find((t) => t.id === selectedId) ?? BILLING_TERMS[0];
  const { perEmpMonth } = computeQuote({
    employees: 1,
    addonIds: [],
    termId: term.id,
  });
  const discounted = term.discount > 0;

  return (
    <div
      className={cn(
        "relative grid overflow-hidden rounded-3xl border border-brand-500/40 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent shadow-[0_30px_60px_-30px_rgba(124,77,255,0.45)] ring-1 ring-brand-500/30 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
        className,
      )}
    >
      {/* Left — the offer */}
      <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            {CORE_HR.name}
          </p>
          <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-secondary">
            {CORE_HR.tagline}
          </p>
        </div>

        {/* Term toggle */}
        <div
          role="group"
          aria-label="Billing term"
          className="flex w-full items-center gap-1 rounded-full border border-border bg-surface p-1"
        >
          {BILLING_TERMS.map((t) => (
            <TermTab
              key={t.id}
              active={selectedId === t.id}
              pillId={pillId}
              onClick={() => setSelectedId(t.id)}
            >
              {t.label}
            </TermTab>
          ))}
        </div>

        {/* Price */}
        <div>
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-[22px] text-ink-muted">
              {PRICING_CURRENCY.symbol}
            </span>
            <span className="font-mono text-[52px] font-semibold leading-none tracking-tight text-ink">
              {perEmpMonth}
            </span>
            <span className="text-sm text-ink-muted">/employee/mo</span>
            {discounted && (
              <span className="text-sm text-ink-muted line-through">
                {PRICING_CURRENCY.symbol}
                {CORE_HR.basePerEmpMonth}
              </span>
            )}
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            {term.label}
            {discounted ? (
              <>
                {" · "}
                <span className="text-success">
                  save {Math.round(term.discount * 100)}%
                </span>
              </>
            ) : (
              " · cancel anytime"
            )}
          </p>
        </div>

        {/* CTA */}
        <div>
          <DemoCta
            size="md"
            variant="brand"
            className="w-full"
            plan={`Core HR · ${term.label}`}
          >
            Start free trial
          </DemoCta>
          <p className="mt-3 text-center text-[11px] text-ink-muted">
            3-month free trial · no card · cancel anytime
          </p>
        </div>
      </div>

      {/* Right — what's included */}
      <div className="border-t border-brand-500/15 bg-brand-500/[0.04] p-8 md:border-l md:border-t-0 md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          What&rsquo;s included
        </p>
        <ul className="mt-5 grid gap-3.5">
          {CORE_HR.features.map((f) => {
            const [title, ...rest] = f.split(" — ");
            const desc = rest.join(" — ");
            return (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-600">
                  <Check className="size-3" aria-hidden />
                </span>
                <span className="text-[14px] leading-snug text-ink-secondary">
                  <span className="font-medium text-ink">{title}</span>
                  {desc && <span className="text-ink-muted"> — {desc}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function TermTab({
  active,
  pillId,
  onClick,
  children,
}: {
  active: boolean;
  pillId: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative flex-1 rounded-full px-2 py-1.5 text-[12px] font-medium transition-colors",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId={pillId}
          className="absolute inset-0 -z-10 rounded-full bg-brand-50 ring-1 ring-brand-200"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {children}
    </button>
  );
}
