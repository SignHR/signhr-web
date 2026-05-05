import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Long-form playbooks for modern HR teams. Onboarding, leave, payroll, performance, and more.",
  alternates: { canonical: "/resources/guides" },
};

const GUIDES = [
  {
    href: "/blog/honest-cost-of-hr-spreadsheets",
    title: "The honest cost of running HR in spreadsheets",
    eyebrow: "Strategy",
    minutes: 8,
    description:
      "What spreadsheets actually cost in time, errors, and risk — with real numbers from real teams.",
  },
  {
    href: "/blog/employee-handbook-guide",
    title: "How to write an employee handbook your team will read",
    eyebrow: "Culture",
    minutes: 11,
    description:
      "A 5-section structure, 12 writing rules, and how to handle the legal pushback — all in one piece.",
  },
  {
    href: "/blog/why-approval-workflows-fail",
    title: "Why approval workflows fail (and how to fix yours)",
    eyebrow: "Operations",
    minutes: 9,
    description:
      "The four failure modes we see across hundreds of workflows, and the fixes that actually work.",
  },
  {
    href: "/blog/onboarding-checklist-30-days",
    title: "Onboarding checklist: the first 30 days",
    eyebrow: "People",
    minutes: 10,
    description:
      "What every new hire should hit in their first month, and the order to deliver it.",
  },
  {
    href: "/blog/leave-policies-that-scale",
    title: "5 leave policies that scale from 10 to 100 employees",
    eyebrow: "Policy",
    minutes: 7,
    description:
      "Patterns that survive the headcount jump — and the ones that quietly break.",
  },
  {
    href: "/blog/compliance-basics-growing-teams",
    title: "Compliance basics for growing teams",
    eyebrow: "Compliance",
    minutes: 12,
    description:
      "What you can defer, what you cannot, and how to tell the difference.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <Hero
        eyebrow="GUIDES"
        title={
          <>
            Long reads from people who&apos;ve{" "}
            <em className="serif-italic">done the work</em>
          </>
        }
        description="Playbooks and field-tested patterns for the parts of HR that don't have a textbook answer. No paywalls. No email gates. Read what's useful."
      />

      <Section pad="standard" className="-mt-12">
        <Container size="md">
          <div className="space-y-4">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)] sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {g.eyebrow}
                  </p>
                  <h2 className="mt-2 text-[20px] font-semibold tracking-tight text-ink group-hover:text-brand-700">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-secondary">
                    {g.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[12px] text-ink-muted">
                    <Clock className="size-3" aria-hidden />
                    {g.minutes} min
                  </span>
                  <ArrowRight className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Guides help you think.{" "}
            <em className="serif-italic">A demo helps you ship.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "All resources", href: "/resources" }}
      />
    </>
  );
}
