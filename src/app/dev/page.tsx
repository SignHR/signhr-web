import type { Metadata } from "next";
import {
  ArrowRight,
  Sparkles,
  Users,
  CalendarDays,
  Wallet,
  GitBranch,
  Clock,
  UserPlus,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/marketing/hero";
import { GradientHalo } from "@/components/marketing/gradient-halo";
import { FloatingMockup } from "@/components/marketing/floating-mockup";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
import { SpotlightMockupView } from "@/components/marketing/spotlight-mockups";
import { FeatureCard } from "@/components/marketing/feature-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { StatNumber } from "@/components/marketing/stat-number";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { Spotlight } from "@/components/marketing/spotlight";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CoreHrCard } from "@/components/marketing/core-hr-card";
import { PricingEstimator } from "@/components/marketing/pricing-estimator";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { WorkflowDemo } from "@/components/marketing/workflow-demo";
import { TESTIMONIALS, LOGO_NAMES, STATS } from "@/lib/testimonials";
import { PRICING_FAQ } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Dev QA — Component library",
  robots: { index: false, follow: false },
};

export default function DevPage() {
  return (
    <>
      <Section pad="compact" className="border-b border-border bg-muted/30">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Internal QA · not indexed
          </p>
          <h1 className="text-display-md mt-3 text-ink">
            Marketing component library
          </h1>
          <p className="mt-3 max-w-xl text-ink-secondary">
            Visual regression surface for every primitive, mockup, and
            composed section used across the site.
          </p>
        </Container>
      </Section>

      <DevSection title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="brand">Brand purple</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link button</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">
            Small <ArrowRight className="size-3.5" />
          </Button>
          <Button size="md">
            Medium <ArrowRight className="size-3.5" />
          </Button>
          <Button size="lg">
            Large <ArrowRight className="size-4" />
          </Button>
          <Button size="icon" aria-label="icon">
            <Sparkles className="size-4" />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </DevSection>

      <DevSection title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="brand">
            <Sparkles className="size-3" /> New
          </Badge>
          <Badge variant="success">Approved</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="glass">Glass</Badge>
        </div>
      </DevSection>

      <DevSection title="Typography">
        <h1 className="text-display-xl text-ink">
          Display XL — <em className="serif-italic">moments</em> of clarity
        </h1>
        <h2 className="text-display-lg mt-4 text-ink">Display LG headline</h2>
        <h3 className="text-display-md mt-4 text-ink">Display MD section</h3>
        <h4 className="text-display-sm mt-4 text-ink">Display SM subsection</h4>
        <p className="mt-4 max-w-xl text-[17px] leading-[1.65] text-ink-secondary">
          Body 17 / 1.65 — the workhorse paragraph style. Sentences are short.
          Voice is human. We don&apos;t leverage anything.
        </p>
      </DevSection>

      <DevSection title="Hero — feature variant">
        <div className="-mx-6 md:-mx-8">
          <Hero
            variant="feature"
            eyebrow={{ label: "✨ New: Asset Management is live", href: "/changelog" }}
            title={
              <>
                Time off should be easy{" "}
                <em className="serif-italic">for everyone</em>
              </>
            }
            description="Policies, balances, calendar views, and one-click approvals. Built for hybrid and global teams that want a real break."
            primaryCta={{ label: "Book a demo", href: "/book-demo" }}
            secondaryCta={{ label: "See pricing", href: "/pricing" }}
            trust="No credit card required · Set up in 10 minutes"
          />
        </div>
      </DevSection>

      <DevSection title="GradientHalo & FloatingMockup (DashboardMockup hero visual)">
        <div className="relative grid place-items-center py-10">
          <GradientHalo variant="hero" size="xl" />
          <GradientHalo variant="amber" size="md" className="right-0 top-0" />
          <FloatingMockup>
            <DashboardMockup className="w-full max-w-[720px]" />
          </FloatingMockup>
        </div>
      </DevSection>

      <DevSection title="Spotlight mockups (per kind)">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "profile",
              "attendance",
              "leave-calendar",
              "payroll",
              "onboarding",
              "offboarding",
              "self-service",
              "workflow",
              "assets",
              "org-chart",
            ] as const
          ).map((kind) => (
            <div key={kind}>
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                {kind}
              </p>
              <SpotlightMockupView mockup={{ kind } as never} />
            </div>
          ))}
        </div>
      </DevSection>

      <DevSection title="Spotlight composition (alternating L/R)">
        <Spotlight
          eyebrow="ATTENDANCE"
          title={
            <>
              Clock-in that <em className="serif-italic">respects</em> your
              team&apos;s time
            </>
          }
          body="One tap. Geo-verified. Synced. The fastest way to capture attendance — without forcing anyone to install yet another tracking tool."
          bullets={[
            "Selfie + GPS punch with on-device verification",
            "Works offline — syncs when back online",
            "Configurable per team, location, or role",
          ]}
          side="right"
          visual={<SpotlightMockupView mockup={{ kind: "attendance" }} />}
        />
        <div className="my-12 border-t border-border" />
        <Spotlight
          eyebrow="WORKFLOWS"
          title={
            <>
              Build the workflow your business{" "}
              <em className="serif-italic">actually has</em>
            </>
          }
          body="Most tools force your process to fit their flowchart. SignHR adapts to yours — including the weird three-stage approval for international travel that only one person remembers."
          bullets={[
            "20+ built-in templates to start from",
            "Reusable approver groups",
            "Sandbox mode to test before publishing",
          ]}
          side="left"
          visual={<SpotlightMockupView mockup={{ kind: "workflow" }} />}
        />
      </DevSection>

      <DevSection title="FeatureCards">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Users}
            title="Core HRMS"
            body="One source of truth for everyone — profiles, contracts, org chart, audit trail."
            href="/features/core-hrms"
          />
          <FeatureCard
            icon={CalendarDays}
            title="Leave Management"
            body="Time off should be easy for everyone. Policies that match how you work."
            href="/features/leave-management"
          />
          <FeatureCard
            icon={Wallet}
            title="Payroll"
            body="Transparent compensation, every cycle. Run payroll before lunch."
            href="/features/payroll"
          />
        </div>
      </DevSection>

      <DevSection title="StatNumbers (count-up on viewport)">
        <div className="grid gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <StatNumber
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              decimals={s.value % 1 !== 0 ? 1 : 0}
            />
          ))}
        </div>
      </DevSection>

      <DevSection title="Testimonials">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </DevSection>

      <DevSection title="LogoCloud (grid)">
        <LogoCloud names={LOGO_NAMES} />
      </DevSection>

      <DevSection title="LogoMarquee (infinite)">
        <LogoMarquee names={LOGO_NAMES} />
      </DevSection>

      <DevSection title="WorkflowDemo">
        <WorkflowDemo />
      </DevSection>

      <DevSection title="CoreHrCard (term toggle)">
        <div className="mx-auto max-w-3xl">
          <CoreHrCard />
        </div>
      </DevSection>

      <DevSection title="PricingEstimator">
        <PricingEstimator />
      </DevSection>

      <DevSection title="FAQAccordion">
        <FAQAccordion items={PRICING_FAQ} />
      </DevSection>

      <DevSection title="NewsletterSignup">
        <div className="max-w-md space-y-4">
          <NewsletterSignup variant="inline" />
          <NewsletterSignup variant="stacked" />
        </div>
      </DevSection>

      <DevSection title="Module icon roundup (sanity)">
        <div className="flex flex-wrap items-center gap-4">
          {[Users, CalendarDays, Wallet, GitBranch, Clock, UserPlus, Sparkles].map(
            (Icon, i) => (
              <span
                key={i}
                className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"
              >
                <Icon className="size-5" />
              </span>
            ),
          )}
        </div>
      </DevSection>
    </>
  );
}

function DevSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section pad="compact" className="border-b border-border last:border-b-0">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {title}
        </p>
        <div className="mt-5">{children}</div>
      </Container>
    </Section>
  );
}
