import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, LifeBuoy, Sparkles, Newspaper, Code } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, templates, help center, and the developer documentation. Everything we make publicly to help HR teams do better work.",
  alternates: { canonical: "/resources" },
};

const RESOURCES = [
  {
    href: "/resources/guides",
    icon: BookOpen,
    title: "Guides",
    body: "Long-form playbooks on running a modern people function — onboarding, leave, payroll, and the rest.",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    href: "/resources/templates",
    icon: FileText,
    title: "Templates",
    body: "Free, copy-able templates: offer letters, leave policies, exit checklists, and 14 more.",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    href: "/resources/help",
    icon: LifeBuoy,
    title: "Help Center",
    body: "Setup, integrations, troubleshooting — answers from the team that built the product.",
    accent: "bg-info/15 text-info",
  },
  {
    href: "/changelog",
    icon: Sparkles,
    title: "Changelog",
    body: "Every update we ship, in plain English. Updated every two weeks like clockwork.",
    accent: "bg-success/15 text-success",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog",
    body: "Field notes, opinions, and HR strategy from our team and the people we work with.",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    href: "https://api.signhr.example.com",
    icon: Code,
    title: "API docs",
    body: "REST API, webhooks, and SDK references for building on top of SignHR.",
    accent: "bg-muted text-ink",
    external: true,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Hero
        eyebrow="LEARN"
        title={
          <>
            Everything we publish to help{" "}
            <em className="serif-italic">HR teams do better work</em>
          </>
        }
        description="Guides, templates, the changelog, the blog, and the API docs. Use what's useful — none of it is gated except the templates, which need an email so we can send updates."
      />

      <Section pad="standard" className="-mt-12">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => {
              const inner = (
                <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl",
                      r.accent,
                    )}
                  >
                    <r.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="mt-5 text-[20px] font-semibold tracking-tight text-ink">
                    {r.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-secondary">
                    {r.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                    {r.external ? "Open docs" : "Browse"}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              );
              return r.external ? (
                <a
                  key={r.title}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                <Link key={r.title} href={r.href} className="block h-full">
                  {inner}
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Resources are nice.{" "}
            <em className="serif-italic">A real demo</em> is faster.
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
