import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps extends React.SVGAttributes<SVGSVGElement> {
  /** Render with `currentColor` so it inherits */
  monochrome?: boolean;
}

/**
 * SignHR mark — a stylized "S" inside a rounded square.
 * Uses brand purple by default; pass monochrome to inherit currentColor.
 */
export function LogoMark({
  className,
  monochrome = false,
  ...props
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-8", className)}
      {...props}
    >
      <defs>
        <linearGradient id="signhr-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#9F73FF" />
          <stop offset="100%" stopColor="#5B2EE0" />
        </linearGradient>
      </defs>
      <rect
        width="32"
        height="32"
        rx="8"
        fill={monochrome ? "currentColor" : "url(#signhr-grad)"}
      />
      <path
        d="M22 11.5c-1-1.6-2.7-2.5-4.7-2.5-2.8 0-4.8 1.5-4.8 3.6 0 1.8 1.4 3 4.5 3.7l1.4.3c2 .5 2.8 1 2.8 2 0 1.2-1.2 2-3 2-1.6 0-3-.7-3.8-2L11.6 20c1.1 1.7 3 2.7 5.4 2.7 3.1 0 5.2-1.5 5.2-3.9 0-2-1.4-3.1-4.5-3.8l-1.4-.3c-1.9-.4-2.8-1-2.8-2 0-1.2 1.2-1.9 3-1.9 1.5 0 2.7.6 3.4 1.7l2-1z"
        fill="white"
      />
    </svg>
  );
}

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function Logo({ className, href = "/", ...props }: LogoProps) {
  return (
    <a
      href={href}
      aria-label="SignHR home"
      className={cn(
        "inline-flex items-center gap-2 group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <LogoMark className="size-8 transition-transform duration-300 group-hover:rotate-[-4deg]" />
      <span className="text-[19px] font-semibold tracking-tight text-ink">
        SignHR
      </span>
    </a>
  );
}
