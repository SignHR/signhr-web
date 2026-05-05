import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  names: readonly string[];
  className?: string;
  /** Edge fade strength */
  fade?: boolean;
}

/**
 * Infinite horizontal scroll of text-logos. Pure CSS via the
 * `animate-marquee` utility (defined in globals.css) — pauses
 * under reduced-motion.
 */
export function LogoMarquee({
  names,
  className,
  fade = true,
}: LogoMarqueeProps) {
  const items = [...names, ...names];
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-12 py-2">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 text-[20px] font-semibold text-ink-muted/60"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
