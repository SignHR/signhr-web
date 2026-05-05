import type { Metadata } from "next";
import { CheckCircle2, Clock, Globe2, Shield, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DemoForm } from "@/components/marketing/demo-form";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { LOGO_NAMES } from "@/lib/testimonials";
import { GradientHalo } from "@/components/marketing/gradient-halo";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "30-minute walkthrough with a real engineer. We'll set up a sandbox with your data shape and show you exactly how SignHR fits.",
  alternates: { canonical: "/book-demo" },
};

const POINTS = [
  {
    icon: Clock,
    title: "30 minutes, no fluff",
    body: "We'll show you exactly the modules that fit — and skip the ones that don't.",
  },
  {
    icon: CheckCircle2,
    title: "Sandbox with your data shape",
    body: "Bring sample data, leave with a working sandbox you can keep using.",
  },
  {
    icon: Globe2,
    title: "Multi-country, multi-currency",
    body: "We'll cover statutory and currency setup if you operate across regions.",
  },
  {
    icon: Shield,
    title: "Security & compliance review",
    body: "SOC 2, encryption, SSO, audit trail — answered in your terms.",
  },
];

interface PageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function BookDemoPage({ searchParams }: PageProps) {
  const { plan } = await searchParams;

  return (
    <Section pad="standard" className="relative overflow-hidden">
      <GradientHalo
        variant="hero"
        size="xl"
        className="left-1/2 top-0 -translate-x-1/2"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Book a demo
            </p>
            <h1 className="text-display-lg mt-4 max-w-[18ch] text-ink">
              See SignHR <em className="serif-italic">in your context</em>
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-secondary">
              Thirty minutes with someone who built the product, not a sales
              rep reading from a deck. We&apos;ll set up a sandbox with your
              data shape and you&apos;ll leave knowing exactly whether
              we&apos;re a fit.
            </p>

            <ul className="mt-10 space-y-5">
              {POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <p.icon className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-[14px] text-ink-secondary">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <figure className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
              <div className="flex items-center gap-1 text-amber-500" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">
                &ldquo;The demo was the most useful 30 minutes I&apos;ve spent
                with an HR vendor in years. They actually understood our
                multi-entity setup before the call started.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[12px] text-ink-muted">
                Karthik Iyer · Operations Director, Globex Retail
              </figcaption>
            </figure>
          </div>

          {/* Right: form */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_30px_70px_-30px_rgba(45,30,90,0.25)] md:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Tell us about your team
              </p>
              <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-ink">
                Get a personalized demo
              </h2>
              <p className="mt-2 text-[14px] text-ink-secondary">
                We&apos;ll reply within one business day with three time slots.
              </p>
              <div className="mt-7">
                <DemoForm defaultPlan={plan} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            500+ growing teams already running on SignHR
          </p>
          <div className="mt-8">
            <LogoCloud names={LOGO_NAMES} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
