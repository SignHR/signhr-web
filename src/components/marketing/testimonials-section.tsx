"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TestimonialMarquee } from "@/components/marketing/testimonial-marquee";
import { TESTIMONIALS } from "@/lib/testimonials";

// Routes that should NOT show the testimonial strip (focused conversion / legal).
const HIDDEN_PREFIXES = ["/book-demo", "/legal"];

/**
 * Global pre-footer social-proof strip: a heading + the auto-scrolling
 * testimonial marquee, shown above the PreFooterCta on every page except the
 * routes above. Mirrors the PreFooterCta route-hiding pattern.
 */
export function TestimonialsSection() {
  const pathname = usePathname();
  if (
    HIDDEN_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    )
  ) {
    return null;
  }

  return (
    <Section pad="standard" surface="muted">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            In their words
          </p>
          <h2 className="text-display-md mt-4 text-balance text-ink">
            Loved by the people who <em className="serif-italic">run HR</em>.
          </h2>
        </div>
      </Container>
      {/* Full-bleed marquee (outside the Container) */}
      <div className="mt-12">
        <TestimonialMarquee testimonials={TESTIMONIALS} />
      </div>
    </Section>
  );
}
