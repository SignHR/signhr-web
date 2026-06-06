import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
  bullets?: string[];
  side?: "left" | "right";
  visual: React.ReactNode;
  cta?: { label: string; href: string };
  /** Extra content rendered in the copy column, below the bullets/CTA. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Alternating side-by-side feature highlight. Image on `side`, copy on the
 * other. On mobile, copy stacks above the visual.
 */
export function Spotlight({
  eyebrow,
  title,
  body,
  bullets,
  side = "right",
  visual,
  cta,
  action,
  className,
}: SpotlightProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
        className,
      )}
    >
      <div
        className={cn(
          "order-1 lg:order-1",
          side === "left" && "lg:order-2",
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          {eyebrow}
        </p>
        <h3 className="text-display-sm mt-4 max-w-[18ch] text-ink">{title}</h3>
        <div className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-secondary">
          {body}
        </div>
        {bullets && bullets.length > 0 && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="size-3" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            {cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
        {action && <div className="mt-7">{action}</div>}
      </div>
      <div
        className={cn(
          "relative order-2 lg:order-2",
          side === "left" && "lg:order-1",
        )}
      >
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-brand-500/20 via-transparent to-accent-pink/15 blur-2xl"
          />
          {visual}
        </div>
      </div>
    </div>
  );
}
