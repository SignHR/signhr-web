import type { Metadata } from "next";
import {
  ShieldCheck,
  HeartHandshake,
  RefreshCcw,
  Globe2,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { PricingToggle } from "@/components/marketing/pricing-toggle";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CTABand } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PRICING_TIERS, COMPARISON_GROUPS, PRICING_FAQ } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple per-employee pricing. 14-day free trial on every plan, no credit card. Starter, Growth, and Enterprise tiers from $3/employee/month.",
  alternates: { canonical: "/pricing" },
};

const INCLUDED_IN_EVERY = [
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    body: "SOC 2 Type II, encryption in transit and at rest, daily backups.",
  },
  {
    icon: RefreshCcw,
    title: "Free migration",
    body: "We import from BambooHR, Zoho People, Keka, GreytHR, and CSV.",
  },
  {
    icon: HeartHandshake,
    title: "Real human support",
    body: "Real engineers, not chatbots. Average first response: under 4 hours.",
  },
  {
    icon: Globe2,
    title: "Multi-currency, multi-country",
    body: "INR, USD, EUR, GBP, AED out of the box. Ten countries supported.",
  },
  {
    icon: Zap,
    title: "Set up in 10 minutes",
    body: "No consultants, no kick-off calls, no SOWs. Just sign up and go.",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const PRODUCT_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SignHR",
  description:
    "All-in-one HRMS for growing teams. Per-employee pricing with a 14-day free trial.",
  brand: { "@type": "Brand", name: "SignHR" },
  offers: PRICING_TIERS.filter((t) => t.annual !== null).map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: t.annual,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: t.annual,
      priceCurrency: "USD",
      unitText: "per employee per month",
    },
    availability: "https://schema.org/InStock",
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[FAQ_LD, PRODUCT_LD]} />
      <Hero
        eyebrow="PRICING"
        title={
          <>
            Simple pricing.{" "}
            <em className="serif-italic">No surprises.</em>
          </>
        }
        description="Pay per active employee. Free 14-day trial on every plan. Cancel anytime — your data leaves with you."
      />

      <Section pad="standard" className="-mt-12">
        <Container>
          <PricingToggle tiers={PRICING_TIERS} />
        </Container>
      </Section>

      {/* What's included in every plan */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              In every plan
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              The basics, <em className="serif-italic">never paywalled</em>.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Security, migration, support, and the things that should be
              table stakes — included from day one on every plan.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_IN_EVERY.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-secondary">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Compare every feature
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              No marketing fluff. <em className="serif-italic">The real list.</em>
            </h2>
          </div>
          <div className="mt-12">
            <ComparisonTable groups={COMPARISON_GROUPS} />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section pad="standard" surface="muted">
        <Container size="md">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Pricing FAQ
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Questions <em className="serif-italic">we keep getting</em>.
            </h2>
          </div>
          <div className="mt-12">
            <FAQAccordion items={PRICING_FAQ} defaultValue="item-0" />
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Try it free for 14 days.{" "}
            <em className="serif-italic">Card never asked for.</em>
          </>
        }
        body="If you outgrow Starter, we'll move you up. If something doesn't fit, we'll move you down. No lock-in, ever."
        primaryCta={{ label: "Start free trial", href: "/book-demo?plan=growth" }}
        secondaryCta={{ label: "Talk to sales", href: "/book-demo?plan=enterprise" }}
      />
    </>
  );
}
