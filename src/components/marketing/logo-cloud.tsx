import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoCloudProps {
  names: readonly string[];
  className?: string;
  /** Render style for each text-logo */
  variant?: "grid" | "row";
}

const FONT_VARIANTS = [
  "font-sans font-semibold",
  "font-serif italic",
  "font-mono font-medium",
  "font-sans font-bold tracking-tight",
  "font-serif",
  "font-sans font-medium uppercase tracking-[0.18em] text-[14px]",
  "font-mono uppercase tracking-wider text-[15px]",
  "font-sans font-bold lowercase",
];

export function LogoCloud({
  names,
  className,
  variant = "grid",
}: LogoCloudProps) {
  return (
    <ul
      className={cn(
        variant === "grid"
          ? "grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8"
          : "flex flex-wrap items-center gap-x-10 gap-y-6",
        className,
      )}
    >
      {names.map((name, i) => (
        <li
          key={name}
          className={cn(
            "flex items-center justify-center text-[18px] text-ink-muted/70 transition-colors duration-300 hover:text-ink",
            FONT_VARIANTS[i % FONT_VARIANTS.length],
          )}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
