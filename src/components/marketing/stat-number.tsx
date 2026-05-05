"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface StatNumberProps {
  value: number;
  /** Suffix appended after the formatted number (e.g. "+", "K+", "%") */
  suffix?: string;
  /** Label below the number */
  label: string;
  /** Decimals to show (e.g. 99.9 → decimals=1). Default 0 */
  decimals?: number;
  /** Animation duration in seconds */
  duration?: number;
  className?: string;
}

export function StatNumber({
  value,
  suffix = "",
  label,
  decimals = 0,
  duration = 1.6,
  className,
}: StatNumberProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const motionValue = useMotionValue(reduce ? value : 0);
  const display = useTransform(motionValue, (v) =>
    formatStat(v, decimals),
  );

  React.useEffect(() => {
    if (reduce) return;
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.22, 0.61, 0.36, 1],
      });
      return () => controls.stop();
    }
  }, [inView, value, duration, motionValue, reduce]);

  return (
    <div ref={ref} className={cn("text-center md:text-left", className)}>
      <p className="font-mono text-[clamp(40px,5.5vw,64px)] font-semibold tracking-tight text-ink">
        <motion.span aria-hidden>{display}</motion.span>
        <span aria-hidden>{suffix}</span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-ink-muted md:text-[15px]">{label}</p>
    </div>
  );
}

function formatStat(v: number, decimals: number) {
  if (decimals > 0) {
    return v.toFixed(decimals);
  }
  return Math.round(v).toLocaleString();
}
