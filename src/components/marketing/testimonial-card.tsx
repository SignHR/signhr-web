import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  size?: "md" | "lg";
  className?: string;
}

const ACCENT: Record<Testimonial["accent"], string> = {
  purple: "from-violet-300 to-indigo-400",
  amber: "from-amber-300 to-rose-400",
  blue: "from-sky-300 to-blue-400",
  green: "from-teal-300 to-emerald-400",
};

export function TestimonialCard({
  testimonial,
  size = "md",
  className,
}: TestimonialCardProps) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-ink-muted",
        size === "lg" && "p-8",
        className,
      )}
    >
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn(
              "size-4",
              i < rating
                ? "fill-accent text-accent"
                : "fill-none text-ink-muted/40",
            )}
          />
        ))}
      </div>
      <blockquote
        className={cn(
          "mt-4 flex-1 text-ink-secondary",
          size === "lg"
            ? "text-[19px] leading-[1.55]"
            : "text-[16px] leading-relaxed",
        )}
      >
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
            ACCENT[testimonial.accent],
          )}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-ink-muted">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
