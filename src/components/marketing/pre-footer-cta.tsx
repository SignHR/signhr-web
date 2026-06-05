"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DemoCta } from "@/components/marketing/demo-cta";

const USP_POINTS = [
  { title: "Fast setup", body: "Live in a day, not a quarter. No implementation consultants." },
  { title: "One place, not fewer features", body: "Core HR, attendance, leave & onboarding — connected, not twelve apps." },
  { title: "Transparent pricing", body: "Pay for what you turn on. No setup fee, no card to start." },
  { title: "Scales with you", body: "From 20 to 500+ without re-platforming." },
  { title: "HR they open daily", body: "Self-service so good your team would rather use it than email HR." },
  { title: "Made for India", body: "Comp-off, multi-location & statutory-aware payroll inputs." },
];

// Routes that should NOT show the pre-footer CTA.
const HIDDEN_PREFIXES = ["/book-demo", "/legal"];

export function PreFooterCta() {
  const pathname = usePathname();
  if (
    HIDDEN_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    )
  ) {
    return null;
  }

  return (
    <Section pad="standard">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 to-card px-6 py-12 shadow-sm md:px-12 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: pitch */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Why SignHR
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Set up your whole HR in{" "}
              <em className="serif-italic">minutes</em>, not months.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
              All the HR a growing team needs, none of the enterprise
              overhead. Built for Indian teams of 20 to 500 — and it scales as
              you grow.
            </p>
            <DemoCta size="lg" className="mt-7">
              Book a demo
              <ArrowRight className="size-4" aria-hidden />
            </DemoCta>
            <p className="mt-3 text-[12px] text-ink-muted">
              No credit card · 3-month free trial
            </p>
          </div>

          {/* Right: checklist */}
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {USP_POINTS.map((u) => (
              <div key={u.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{u.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">
                    {u.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
