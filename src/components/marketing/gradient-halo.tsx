import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientHaloProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual preset */
  variant?: "hero" | "soft" | "amber" | "spotlight";
  /** Intensity of the blur/glow */
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * A soft radial gradient blob used behind hero sections, mockups, and
 * feature spotlights. Always positioned absolutely; consumers control
 * placement via additional className utilities.
 */
export function GradientHalo({
  className,
  variant = "hero",
  size = "lg",
  ...props
}: GradientHaloProps) {
  const sizeClass =
    size === "sm"
      ? "h-[260px] w-[260px]"
      : size === "md"
        ? "h-[420px] w-[420px]"
        : size === "lg"
          ? "h-[640px] w-[640px]"
          : "h-[860px] w-[860px]";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-[100px]",
        sizeClass,
        variant === "hero" &&
          "bg-[radial-gradient(circle_at_center,_hsl(var(--brand-300)/0.55)_0%,_hsl(var(--brand-200)/0.3)_45%,_transparent_70%)]",
        variant === "soft" &&
          "bg-[radial-gradient(circle_at_center,_hsl(var(--brand-200)/0.45)_0%,_transparent_65%)]",
        variant === "amber" &&
          "bg-[radial-gradient(circle_at_center,_hsl(35_90%_70%/0.35)_0%,_hsl(var(--brand-200)/0.2)_55%,_transparent_75%)]",
        variant === "spotlight" &&
          "bg-[conic-gradient(from_180deg_at_50%_50%,_hsl(var(--brand-300)/0.4)_0%,_hsl(35_90%_75%/0.3)_25%,_hsl(var(--brand-100)/0.2)_50%,_hsl(var(--brand-300)/0.4)_100%)]",
        className,
      )}
      {...props}
    />
  );
}
