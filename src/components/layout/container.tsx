import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Container({
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        size === "sm" && "max-w-3xl",
        size === "md" && "max-w-5xl",
        size === "lg" && "max-w-[1280px]",
        size === "xl" && "max-w-[1440px]",
        className,
      )}
      {...props}
    />
  );
}
