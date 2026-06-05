import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialMarqueeProps {
  testimonials: readonly Testimonial[];
  className?: string;
}

/**
 * Infinite horizontal scroll of testimonial cards. Pure CSS via the
 * `animate-marquee` utility (defined in globals.css) — pauses on hover so a
 * card can be read, and freezes under reduced-motion (the global reduced-motion
 * rule neutralizes the animation).
 */
export function TestimonialMarquee({
  testimonials,
  className,
}: TestimonialMarqueeProps) {
  // Duplicate the set so the -50% scroll loops seamlessly.
  const items = [...testimonials, ...testimonials];
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max items-stretch gap-5 py-2 animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <div key={`${t.name}-${i}`} className="w-[340px] shrink-0">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
