import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98] select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-brand-600 shadow-sm hover:shadow-md hover:-translate-y-px",
        // Alias kept for places that previously asked for "brand" — now identical to primary.
        brand:
          "bg-primary text-primary-foreground hover:bg-brand-600 shadow-sm hover:shadow-md hover:-translate-y-px",
        dark: "bg-ink text-white hover:bg-ink-secondary shadow-sm hover:shadow-md hover:-translate-y-px dark:bg-card dark:text-ink dark:border dark:border-border",
        secondary:
          "bg-card text-ink border border-border hover:border-ink-muted hover:bg-muted",
        ghost: "text-ink hover:bg-muted",
        link: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[10px]",
        md: "h-11 px-5 text-[15px] rounded-[12px]",
        lg: "h-13 px-7 text-base rounded-[14px]",
        icon: "h-10 w-10 rounded-[12px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, asChild = false, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

export { buttonVariants };
