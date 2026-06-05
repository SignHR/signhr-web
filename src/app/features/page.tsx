import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { FeatureCard } from "@/components/marketing/feature-card";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { Button } from "@/components/ui/button";
import { DemoCta } from "@/components/marketing/demo-cta";
import { FEATURE_MODULES, FEATURE_GROUPS } from "@/lib/nav";
import { LOGO_NAMES } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Ten modules, one platform — core HR, attendance, leave, onboarding & offboarding, payroll-ready, workflows, self-service, assets, mobile, and security. Plus more on the roadmap.",
  alternates: { canonical: "/features" },
};

export default function FeaturesHubPage() {
  const soon = FEATURE_MODULES.filter((m) => m.status === "soon");
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
        description="Ten modules built to work together, not stitched together — with more on the roadmap. Pick your starting point; the rest is here when you need it."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
      />

      <Section pad="compact" className="border-y border-border/60 bg-muted/20">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            50+ teams already running on SignHR
          </p>
          <div className="mt-6">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
        </Container>
      </Section>

      <Section pad="standard">
        <Container>
          {FEATURE_GROUPS.map((group, i) => {
            const items = FEATURE_MODULES.filter(
              (m) => m.group === group.id && m.status === "live",
            );
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

      {/* On the roadmap */}
      <Section pad="standard" surface="muted" id="roadmap" className="scroll-mt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                On the roadmap
              </p>
              <h2 className="text-display-sm mt-2 text-ink">
                Coming soon — and it scales as you grow.
              </h2>
            </div>
            <span className="text-sm text-ink-muted">
              {soon.length} modules
            </span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {soon.map((m) => (
              <div
                key={m.slug}
                className="relative flex h-full flex-col rounded-2xl border border-dashed border-border bg-card/60 p-6 md:p-7"
              >
                <span className="absolute right-5 top-5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                  Coming soon
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-ink-muted">
                  <m.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-ink">
                  {m.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
                  {m.short}
                </p>
                {m.roadmapBullets && (
                  <ul className="mt-4 space-y-2">
                    {m.roadmapBullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-[13.5px] text-ink-muted"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison teaser */}
      <Section pad="standard">
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
                <DemoCta>
                  Book a 10-minute demo
                  <ArrowRight className="size-4" aria-hidden />
                </DemoCta>
                <Button asChild variant="secondary">
                  <Link href="/customers">See customer stories</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-border bg-card p-7">
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                On the roadmap
              </span>
              <p className="mt-3 text-[15px] text-ink-secondary">
                WhatsApp, Email, Calendar, Slack/Teams, biometric devices, and
                payroll software — connectors are on the way, alongside a clean
                REST API and webhooks.
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                <Link href="/features#roadmap" className="text-brand-600 hover:text-brand-700">
                  See what&apos;s coming →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
