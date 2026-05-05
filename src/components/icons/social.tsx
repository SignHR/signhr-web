import * as React from "react";
import { cn } from "@/lib/utils";

type IconProps = React.SVGAttributes<SVGSVGElement>;

const base = "size-4";

export function TwitterIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn(base, className)}
      {...props}
    >
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.61l-5.18-6.78L5.3 22H2.04l8.04-9.19L1.5 2h6.78l4.68 6.18L18.244 2zm-1.16 18h1.83L7.04 4H5.1l11.984 16z" />
    </svg>
  );
}

export function LinkedinIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn(base, className)}
      {...props}
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM7.94 8h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46h-4.56V15.4c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V22H7.94V8z" />
    </svg>
  );
}

export function GithubIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn(base, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.79.62-3.38-1.38-3.38-1.38-.46-1.18-1.12-1.5-1.12-1.5-.91-.64.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.93.86.09-.66.35-1.12.63-1.38-2.23-.26-4.57-1.14-4.57-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .85-.28 2.78 1.05.81-.23 1.67-.34 2.53-.35.86.01 1.72.12 2.53.35 1.93-1.33 2.78-1.05 2.78-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49C19.14 20.62 22 16.78 22 12.25 22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}
