import type { Metadata } from "next";
import {
  ShieldCheck,
  HeartHandshake,
  RefreshCcw,
  Globe2,
  Zap,
  Check,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { PricingEstimator } from "@/components/marketing/pricing-estimator";
import { AddonCard } from "@/components/marketing/addon-card";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import {
  CORE_HR,
  ADDONS,
  PRICING_CURRENCY,
  PRICING_FAQ,
  computeQuote,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "HR Software Pricing in India",
  description:
    "Simple per-employee HR software pricing in INR — Core HR from ₹15/employee/month plus add-ons. 1- & 3-year terms save 10–20%.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "HR Software Pricing in India — SignHR",
    description:
      "Simple per-employee HR software pricing in INR — Core HR from ₹15/employee/month plus add-ons. 1- & 3-year terms save 10–20%.",
    type: "website",
    url: "/pricing",
  },
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

const coreHr3y = computeQuote({ employees: 1, addonIds: [], termId: "3y" });

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
  "@type": ["Product", "SoftwareApplication"],
  name: "SignHR",
  description:
    "All-in-one AI-powered HR software for Indian teams. One Core HR plan plus optional add-ons, per-employee pricing in INR.",
  brand: { "@type": "Brand", name: "SignHR" },
  url: `${SITE_URL}/pricing`,
  image: `${SITE_URL}/opengraph-image`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: [
    {
      "@type": "Offer",
      name: CORE_HR.name,
      price: coreHr3y.perEmpMonth,
      priceCurrency: PRICING_CURRENCY.code,
      url: `${SITE_URL}/pricing`,
      seller: { "@type": "Organization", name: "SignHR" },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: coreHr3y.perEmpMonth,
        priceCurrency: PRICING_CURRENCY.code,
        unitText: "per employee per month",
      },
      availability: "https://schema.org/InStock",
    },
    ...ADDONS.map((a) => ({
      "@type": "Offer",
      name: a.name,
      price: a.price,
      priceCurrency: PRICING_CURRENCY.code,
      url: `${SITE_URL}/pricing`,
      seller: { "@type": "Organization", name: "SignHR" },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: a.price,
        priceCurrency: PRICING_CURRENCY.code,
        unitText:
          a.unit === "flat-month" ? "per month" : "per employee per month",
      },
      availability: "https://schema.org/InStock",
    })),
  ],
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_URL}/pricing`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[FAQ_LD, PRODUCT_LD, BREADCRUMB_LD]} />
      <Hero
        eyebrow="PRICING"
        title={
          <>
            Simple pricing. <em className="serif-italic">No surprises.</em>
          </>
        }
        description="One Core HR plan, optional add-ons, billed per active employee. All prices in INR, exclusive of GST."
      />

      <Section pad="standard" className="-mt-12">
        <Container>
          <PricingEstimator />
        </Container>
      </Section>

      {/* What's in Core HR */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              In Core HR
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Everything you need, <em className="serif-italic">included</em>.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Core HR is the foundation every SignHR workspace runs on — at{" "}
              {PRICING_CURRENCY.symbol}
              {CORE_HR.basePerEmpMonth}/employee/month.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-4 sm:grid-cols-2">
            {CORE_HR.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[15px] text-ink-secondary"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="size-3" aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Add-ons */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Add-ons
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Turn on <em className="serif-italic">only what you need</em>.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Optional modules that sit on top of Core HR. Toggle them in the
              estimator to see your total.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ADDONS.map((a) => (
              <AddonCard key={a.id} addon={a} />
            ))}
          </div>
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
              Security, migration, support, and the things that should be table
              stakes — included from day one.
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

      {/* FAQ */}
      <Section pad="standard">
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
    </>
  );
}
