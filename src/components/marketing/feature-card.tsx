import * as React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  href?: string;
  className?: string;
  /** Larger card for hub pages */
  size?: "sm" | "md" | "lg";
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
  href,
  className,
  size = "md",
}: FeatureCardProps) {
  const padding =
    size === "sm" ? "p-5" : size === "md" ? "p-6 md:p-7" : "p-8";

  const content = (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-card",
        "transition-all duration-300 ease-out",
        href && "hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]",
        padding,
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-secondary">
        {body}
      </p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors group-hover:text-brand-700">
          Learn more
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </span>
      )}
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  ) : (
    content
  );
}
