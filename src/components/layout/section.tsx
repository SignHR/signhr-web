import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical rhythm: standard ~ py-24 md:py-32, compact ~ py-16 md:py-20, large ~ py-32 md:py-40 */
  pad?: "compact" | "standard" | "large";
  /** Background variant */
  surface?: "default" | "muted" | "ink" | "gradient";
  as?: "section" | "div" | "header" | "footer";
}

export function Section({
  className,
  pad = "standard",
  surface = "default",
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-x-clip",
        pad === "compact" && "py-16 md:py-20",
        pad === "standard" && "py-24 md:py-32",
        pad === "large" && "py-32 md:py-40",
        surface === "muted" && "bg-muted/40",
        surface === "ink" && "bg-ink text-white",
        surface === "gradient" &&
          "bg-gradient-to-br from-brand-50 via-background to-amber-50/40",
        className,
      )}
      {...props}
    />
  );
}
