import * as React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/lib/pricing";

interface PricingCardProps {
  tier: PricingTier;
  billing: "monthly" | "annual";
  className?: string;
}

export function PricingCard({ tier, billing, className }: PricingCardProps) {
  const price = billing === "monthly" ? tier.monthly : tier.annual;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-all",
        tier.highlight
          ? "border-brand-300 bg-gradient-to-b from-brand-50/60 to-card shadow-[0_30px_60px_-30px_rgba(124,77,255,0.45)] ring-1 ring-brand-200"
          : "border-border hover:border-ink-muted",
        className,
      )}
    >
      {tier.badge && (
        <Badge variant="brand" className="absolute -top-3 left-7 shadow-sm">
          <Sparkles className="size-3" aria-hidden />
          {tier.badge}
        </Badge>
      )}

      <div>
        <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          {tier.name}
        </p>
        <p className="mt-2 text-[15px] text-ink-secondary">{tier.tagline}</p>
      </div>

      <div className="mt-6">
        {price === null ? (
          <p className="font-mono text-[42px] font-semibold tracking-tight text-ink">
            Custom
          </p>
        ) : (
          <p className="flex items-baseline gap-1.5">
            <span className="font-mono text-[15px] text-ink-muted">$</span>
            <span className="font-mono text-[44px] font-semibold tracking-tight text-ink">
              {price}
            </span>
            <span className="text-sm text-ink-muted">/employee/mo</span>
          </p>
        )}
        {price !== null && billing === "annual" && (
          <p className="mt-1 text-xs text-success">Billed annually · saves ~20%</p>
        )}
        {price !== null && billing === "monthly" && (
          <p className="mt-1 text-xs text-ink-muted">Billed monthly · cancel anytime</p>
        )}
      </div>

      <Button
        asChild
        size="md"
        variant={tier.highlight ? "brand" : "primary"}
        className="mt-6 w-full"
      >
        <Link href={tier.ctaHref}>{tier.ctaLabel}</Link>
      </Button>

      <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[14.5px] text-ink-secondary"
          >
            <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="size-2.5" aria-hidden />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
