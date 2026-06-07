import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialColumnsProps {
  testimonials: readonly Testimonial[];
  className?: string;
}

/**
 * A masked, fixed-height viewport holding vertically auto-scrolling columns of
 * testimonial cards. Two columns on `lg+` (one scrolling up, one down); a single
 * column below `lg`. Pure CSS via the `animate-marquee-y` utilities — each track
 * duplicates its cards so the `-50%` translate loops seamlessly, pauses on hover,
 * and freezes under reduced motion (handled in globals.css).
 */
export function TestimonialColumns({
  testimonials,
  className,
}: TestimonialColumnsProps) {
  // Interleave by index so accent colours alternate down each column.
  const colA = testimonials.filter((_, i) => i % 2 === 0);
  const colB = testimonials.filter((_, i) => i % 2 === 1);

  return (
    <div
      className={cn(
        "relative h-[560px] overflow-hidden",
        "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      {/* Desktop: two columns, opposite directions */}
      <div className="hidden h-full grid-cols-2 gap-5 lg:grid">
        <TestimonialColumn items={colA} animationClass="animate-marquee-y" />
        <TestimonialColumn
          items={colB}
          animationClass="animate-marquee-y-reverse"
        />
      </div>
      {/* Mobile / tablet: single column */}
      <div className="h-full lg:hidden">
        <TestimonialColumn items={testimonials} animationClass="animate-marquee-y" />
      </div>
    </div>
  );
}

function TestimonialColumn({
  items,
  animationClass,
}: {
  items: readonly Testimonial[];
  animationClass: "animate-marquee-y" | "animate-marquee-y-reverse";
}) {
  // Duplicate the set so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="group/col h-full">
      <div
        className={cn(
          "flex flex-col gap-5",
          animationClass,
          "group-hover/col:[animation-play-state:paused]",
        )}
      >
        {loop.map((t, i) => (
          <div key={`${t.name}-${i}`} aria-hidden={i >= items.length || undefined}>
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
