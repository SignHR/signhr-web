import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CTABand } from "@/components/marketing/cta-band";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { Button } from "@/components/ui/button";
import { FEATURE_MODULES, FEATURE_GROUPS } from "@/lib/nav";
import { LOGO_NAMES } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Nine modules, one platform. Core HRMS, time, leave, payroll, onboarding, offboarding, workflows, self-service, and assets — all working together.",
  alternates: { canonical: "/features" },
};

export default function FeaturesHubPage() {
  return (
    <>
      <Hero
        eyebrow="THE PLATFORM"
        title={
          <>
            Everything you need to{" "}
            <em className="serif-italic">run your people ops</em>
          </>
        }
        description="Nine modules built to work together, not stitched together. Pick your starting point — the rest is here when you need it."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      <Section pad="compact" className="border-y border-border/60 bg-muted/20">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            500+ teams already running on SignHR
          </p>
          <div className="mt-6">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
        </Container>
      </Section>

      <Section pad="standard">
        <Container>
          {FEATURE_GROUPS.map((group, i) => {
            const items = FEATURE_MODULES.filter((m) => m.group === group.id);
            if (items.length === 0) return null;
            return (
              <div
                key={group.id}
                className={i > 0 ? "mt-20" : undefined}
                id={group.id}
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                      {group.label}
                    </p>
                    <h2 className="text-display-sm mt-2 text-ink">{group.blurb}</h2>
                  </div>
                  <span className="text-sm text-ink-muted">
                    {items.length} {items.length === 1 ? "module" : "modules"}
                  </span>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((m) => (
                    <FeatureCard
                      key={m.slug}
                      icon={m.icon}
                      title={m.name}
                      body={m.short}
                      href={m.href}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* Comparison teaser */}
      <Section pad="standard" surface="muted" id="integrations">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Why one platform
              </p>
              <h2 className="text-display-md mt-4 text-ink">
                Stitching tools together is the{" "}
                <em className="serif-italic">tax</em> nobody warned you about.
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
                Most growing teams pile up four or five point solutions: one
                for leave, one for payroll, one for attendance, a spreadsheet
                for the rest. Each one needs an admin, an integration, and a
                weekly reconciliation. SignHR is one source of truth — built
                so the modules genuinely talk to each other.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/book-demo">
                    Book a 30-minute demo
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/customers">See customer stories</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Integrations
              </p>
              <p className="mt-2 text-[15px] text-ink-secondary">
                Plays nicely with Google Workspace, Microsoft 365, Zoom,
                Notion, Linear, GitHub, Stripe, Razorpay, QuickBooks, Tally,
                Cleartax, Okta, Jira, and Zapier.
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                Plus a clean REST API and webhooks for the things we
                haven&apos;t shipped a connector for yet.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            One platform. Nine modules.{" "}
            <em className="serif-italic">Calmer</em> Mondays.
          </>
        }
        body="Set up in 10 minutes. 3-month free trial. No credit card."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Compare plans", href: "/pricing" }}
      />
    </>
  );
}
