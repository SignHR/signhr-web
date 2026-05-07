import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Free HR templates: offer letters, leave policies, exit checklists, and more. Use them as-is or fork them.",
  alternates: { canonical: "/resources/templates" },
};

const TEMPLATES = [
  {
    title: "Offer letter (full-time)",
    description: "A clean, modern offer letter template — minus the legalese.",
    category: "Hiring",
  },
  {
    title: "Offer letter (contractor)",
    description: "Contractor agreement skeleton with placeholders for scope and payment terms.",
    category: "Hiring",
  },
  {
    title: "Leave policy (India)",
    description: "Annual, sick, casual, and comp-off — modeled for Indian labor law.",
    category: "Policy",
  },
  {
    title: "Leave policy (global remote)",
    description: "Tiered policy for distributed teams with multiple countries.",
    category: "Policy",
  },
  {
    title: "Onboarding checklist",
    description: "30-60-90 day plan template, customizable per team.",
    category: "Onboarding",
  },
  {
    title: "First-week welcome email",
    description: "Tone-perfect welcome email new hires actually want to read.",
    category: "Onboarding",
  },
  {
    title: "Exit interview script",
    description: "Five questions that surface what's actually broken.",
    category: "Offboarding",
  },
  {
    title: "Asset return checklist",
    description: "Laptop, badge, devices, accounts — what to verify and when.",
    category: "Offboarding",
  },
  {
    title: "Performance review template",
    description: "Structured 360 with prompts for both employee and manager.",
    category: "Performance",
  },
  {
    title: "1:1 meeting agenda",
    description: "What to discuss when there's nothing 'urgent' to discuss.",
    category: "Performance",
  },
  {
    title: "Maternity & paternity policy",
    description: "Generous, modern parental leave policy with phased return.",
    category: "Policy",
  },
  {
    title: "Code of conduct",
    description: "Plain-English code of conduct without the corporate boilerplate.",
    category: "Policy",
  },
];

const CAT_COLORS: Record<string, string> = {
  Hiring: "bg-brand-50 text-brand-700",
  Policy: "bg-warning/15 text-warning",
  Onboarding: "bg-success/10 text-success",
  Offboarding: "bg-info/10 text-info",
  Performance: "bg-rose-100 text-rose-700",
};

export default function TemplatesPage() {
  return (
    <>
      <Hero
        eyebrow="TEMPLATES"
        title={
          <>
            Twelve free templates,{" "}
            <em className="serif-italic">battle-tested</em>
          </>
        }
        description="The exact letters, policies, and checklists we use. Drop your email once, get them all in a single zip — and one short email a month with new ones."
      />

      <Section pad="standard" className="-mt-12">
        <Container size="md">
          <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Get the full pack
            </p>
            <h2 className="text-display-sm mt-4 text-ink">
              All twelve, in one download.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[14.5px] text-ink-secondary">
              Word + Google Docs format. No watermark. Use as-is or fork.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </Container>
      </Section>

      <Section pad="standard">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <div
                key={t.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-ink-muted"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FileText className="size-5" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      CAT_COLORS[t.category] ?? "bg-muted text-ink-muted",
                    )}
                  >
                    {t.category}
                  </span>
                </div>
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-secondary">
                  {t.description}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  <Download className="size-3.5" aria-hidden />
                  Download
                </button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Tired of starting from a template?{" "}
            <em className="serif-italic">Run it on SignHR.</em>
          </>
        }
        body="The templates here are the same flows SignHR runs natively — without you having to copy-paste anything."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See all features", href: "/features" }}
      />
    </>
  );
}
