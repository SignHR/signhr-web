import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CASE_STUDIES } from "@/lib/customers";
import { TESTIMONIALS, LOGO_NAMES } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Stories from teams that grew with SignHR — from logistics to engineering, from 50 to 500 employees.",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((c) => c.slug !== featured.slug);

  return (
    <>
      <Hero
        eyebrow="CUSTOMER STORIES"
        title={
          <>
            Stories from teams that{" "}
            <em className="serif-italic">grew with SignHR</em>
          </>
        }
        description="From 80 to 800 — these are the people who made the switch and what changed for them."
      />

      {/* Featured case study */}
      <Section pad="standard" className="-mt-12">
        <Container>
          <Link
            href={`/customers/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-50/60 to-card p-8 transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(124,77,255,0.4)] md:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-20 size-72 rounded-full bg-gradient-to-br from-brand-200/40 to-amber-200/30 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Featured story · {featured.industry}
                </p>
                <h2 className="text-display-md mt-4 max-w-[20ch] text-ink">
                  {featured.outcome}
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Read the full story
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
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

      {/* Logo grid */}
      <Section pad="compact" surface="muted">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            More teams running on SignHR
          </p>
          <div className="mt-8">
            <LogoCloud names={LOGO_NAMES} />
          </div>
        </Container>
      </Section>

      {/* Other case studies */}
      <Section pad="standard">
        <Container>
          <h2 className="text-display-sm text-ink">All case studies</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[featured, ...others].map((study) => (
              <Link
                key={study.slug}
                href={`/customers/${study.slug}`}
                className={cn(
                  "group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]",
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {study.industry} · {study.size}
                </p>
                <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-ink group-hover:text-brand-700">
                  {study.outcome}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-secondary">
                  {study.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-600">
                    Read the story →
                  </span>
                  <span className="text-[12px] text-ink-muted">
                    {study.region}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              In their words
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              The shorter version, <em className="serif-italic">in quotes</em>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="JOIN THEM"
        title={
          <>
            Be the next story.{" "}
            <em className="serif-italic">It starts with a 30-min call.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
