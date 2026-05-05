import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
  {
    variants: {
      variant: {
        default: "bg-muted text-ink-secondary",
        brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
        success:
          "bg-success/10 text-success ring-1 ring-inset ring-success/20",
        warning:
          "bg-accent/10 text-accent-foreground ring-1 ring-inset ring-accent/30",
        outline:
          "border border-border bg-card text-ink-muted",
        glass:
          "bg-white/70 text-ink-secondary backdrop-blur-md border border-white/60",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
