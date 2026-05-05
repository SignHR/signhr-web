"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Badge } from "@/components/ui/badge";
import type { PricingTier } from "@/lib/pricing";

interface PricingToggleProps {
  tiers: PricingTier[];
  className?: string;
}

export function PricingToggle({ tiers, className }: PricingToggleProps) {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");

  return (
    <div className={className}>
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-sm">
        <BillingTab
          active={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </BillingTab>
        <BillingTab
          active={billing === "annual"}
          onClick={() => setBilling("annual")}
        >
          Annual
          <Badge
            variant="brand"
            className="px-1.5 py-0 text-[10px] tracking-tight"
          >
            Save 20%
          </Badge>
        </BillingTab>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} billing={billing} />
        ))}
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
        "relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId="billing-pill"
          className="absolute inset-0 -z-10 rounded-full bg-brand-50 ring-1 ring-brand-200"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {children}
    </button>
  );
}
