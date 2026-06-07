import * as React from "react";
import { cn } from "@/lib/utils";
import { PRICING_CURRENCY, type Addon } from "@/lib/pricing";

interface AddonCardProps {
  addon: Addon;
  className?: string;
}

export function AddonCard({ addon, className }: AddonCardProps) {
  const priceLabel =
    addon.unit === "flat-month"
      ? `${PRICING_CURRENCY.symbol}${addon.price}/mo flat`
      : `${PRICING_CURRENCY.symbol}${addon.price}/emp/mo`;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[16px] font-semibold text-ink">{addon.name}</h3>
        <span className="shrink-0 font-mono text-[14px] font-semibold text-brand-700">
          {priceLabel}
        </span>
      </div>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-secondary">
        {addon.blurb}
      </p>
      <p className="mt-4 text-xs text-ink-muted">
        Toggle it in the estimator above to see it in your total.
      </p>
    </div>
  );
}
