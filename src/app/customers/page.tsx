import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CustomersCta } from "@/components/marketing/customers-cta";
import { CASE_STUDIES } from "@/lib/customers";
import { LOGO_NAMES } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "The Indian startups that run on SignHR — from fintech to logistics, from 80 to 800 employees.",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((c) => c.slug !== featured.slug);
  const [lead, ...rest] = others;

  return (
    <>
      <Hero
        eyebrow="CUSTOMER STORIES"
        title={
          <>
            The startups that{" "}
            <em className="serif-italic">run on SignHR</em>
          </>
        }
        description="From fintech to logistics, from 80 to 800 — the Indian teams that made the switch, and what changed for them."
      />

      {/* Featured case study */}
      <Section pad="standard" className="-mt-12">
        <Container>
          <Link
            href={`/customers/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-8 transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(124,77,255,0.4)] md:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-20 size-72 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-pink/20 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Featured story · {featured.feature}
                </p>
                <h2 className="text-display-md mt-4 max-w-[20ch] text-ink">
                  {featured.outcome}
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Read the full story
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 self-center">
                {featured.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border bg-card p-5 text-center"
                  >
                    <p className="font-mono text-2xl font-semibold tracking-tight text-brand-700">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[12px] text-ink-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* Editorial grid: one wide lead card + a 2-up of the rest */}
      <Section pad="standard">
        <Container>
          <h2 className="text-display-sm text-ink">All case studies</h2>
          <div className="mt-10 grid gap-5">
            {lead && <CaseStudyCard study={lead} variant="wide" />}
            <div className="grid gap-5 md:grid-cols-2">
              {rest.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Logo strip */}
      <Section pad="compact" surface="muted">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            More teams running on SignHR
          </p>
          <div className="mt-6">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
        </Container>
      </Section>

      <CustomersCta />
    </>
  );
}
