import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/customers";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** `wide` = full-width landscape lead card with metric tiles; `default` = vertical grid card. */
  variant?: "wide" | "default";
  className?: string;
}

export function CaseStudyCard({
  study,
  variant = "default",
  className,
}: CaseStudyCardProps) {
  const isWide = variant === "wide";

  return (
    <Link
      href={`/customers/${study.slug}`}
      className={cn(
        "group rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]",
        isWide
          ? "flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-9"
          : "flex h-full flex-col p-7",
        className,
      )}
    >
      <div className={cn("flex flex-col", isWide ? "md:max-w-xl" : "flex-1")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          {study.feature} · {study.sector}
        </p>
        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight text-ink group-hover:text-brand-700",
            isWide ? "text-[24px]" : "text-[20px]",
          )}
        >
          {study.outcome}
        </h3>
        <p
          className={cn(
            "mt-3 text-[14.5px] leading-relaxed text-ink-secondary",
            !isWide && "flex-1",
          )}
        >
          {study.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600">
            Read the story
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
          {!isWide && (
            <span className="text-[12px] text-ink-muted">{study.hq}</span>
          )}
        </div>
      </div>

      {isWide && (
        <div className="grid shrink-0 grid-cols-3 gap-3 md:w-[320px]">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border bg-background p-4 text-center"
            >
              <p className="font-mono text-xl font-semibold tracking-tight text-brand-700">
                {m.value}
              </p>
              <p className="mt-1 text-[11px] text-ink-muted">{m.label}</p>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
