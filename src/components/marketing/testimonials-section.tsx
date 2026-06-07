"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { TestimonialColumns } from "@/components/marketing/testimonial-columns";
import { TESTIMONIALS } from "@/lib/testimonials";

// Routes that should NOT show the testimonial section (focused conversion / legal).
const HIDDEN_PREFIXES = ["/book-demo", "/legal"];

/**
 * Global pre-footer social proof: a left intro panel (eyebrow, heading,
 * description, CTA) beside a two-column vertical-scroll wall of testimonials.
 * Shown on every page except the routes above. Mirrors the PreFooterCta
 * route-hiding pattern.
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
    <Section pad="standard" surface="muted" data-section="Testimonials">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              In their words
            </p>
            <h2 className="text-display-md mt-4 text-balance text-ink">
              Loved by the people who <em className="serif-italic">run HR</em>.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-secondary">
              Hear what HR leaders across India say about running people ops on
              SignHR.
            </p>
            <Button asChild className="mt-7">
              <Link href="/book-demo">
                Book a demo
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7">
            <TestimonialColumns testimonials={TESTIMONIALS} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
