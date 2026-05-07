import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

/**
 * SignHR mark — sourced from /public/logo.webp. Sized via Tailwind utilities
 * on `className` (defaults to size-8). The wrapper is square-ish; the image
 * is rendered with object-contain so the original aspect ratio is preserved.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block size-8 shrink-0", className)}
    >
      <Image
        src="/logo.webp"
        alt=""
        fill
        sizes="40px"
        priority
        className="object-contain"
      />
    </span>
  );
}

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="SignHR home"
      className={cn(
        "inline-flex items-center gap-2 group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <LogoMark className="size-9 transition-transform duration-300 group-hover:rotate-[-4deg]" />
      <span className="text-[19px] font-semibold tracking-tight text-white">
        SignHR
      </span>
    </Link>
  );
}
