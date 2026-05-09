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
    title: "India HR Compliance Guides",
    body: "Deep dives into EPF, ESI, TDS, PT, and navigating the complexities of Indian payroll and labor laws.",
    accent: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400",
    className: "md:col-span-2 md:row-span-2 p-8 md:p-12",
    hasGlow: true,
  },
  {
    href: "/resources/templates",
    icon: FileText,
    title: "HR Templates",
    body: "Ready-to-use templates for offer letters, FnF settlements, POSH policies, and leave rules (PL/SL/CL).",
    accent: "bg-warning/15 text-warning",
    className: "md:col-span-1 p-8",
  },
  {
    href: "/resources/help",
    icon: LifeBuoy,
    title: "Help Center",
    body: "Setup guides, TDS calculations, and troubleshooting specifically for Indian payroll contexts.",
    accent: "bg-info/15 text-info",
    className: "md:col-span-1 p-8",
  },
  {
    href: "/changelog",
    icon: Sparkles,
    title: "Changelog",
    body: "Every update we ship, in plain English. Stay up-to-date with new tax regimes and compliance patches.",
    accent: "bg-success/15 text-success",
    className: "md:col-span-1 md:row-span-2 p-8",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "SignHR Blog",
    body: "Field notes on HR strategy, workplace culture, and modernizing people ops in India.",
    accent: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400",
    className: "md:col-span-2 p-8",
  },
  {
    href: "https://api.signhr.io",
    icon: Code,
    title: "API docs",
    body: "REST API to sync employee data with your existing Indian accounting software (Tally, Zoho Books).",
    accent: "bg-muted text-ink",
    external: true,
    className: "md:col-span-1 p-8",
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
        description="Guides, templates, the changelog, the blog, and the API docs. Everything you need to scale your HR operations and stay compliant with Indian labor laws."
      />

      <Section pad="standard" className="-mt-12">
        <Container>
          <div className="grid gap-5 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]">
            {RESOURCES.map((r) => {
              const inner = (
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_24px_60px_-24px_rgba(124,77,255,0.25)] dark:bg-surface/50 dark:hover:bg-surface",
                    r.className
                  )}
                >
                  {r.hasGlow && (
                    <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-500/15 blur-[64px] transition-transform duration-700 ease-out group-hover:scale-150 dark:bg-brand-500/20" />
                  )}
                  <span
                    className={cn(
                      "relative flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                      r.accent,
                    )}
                  >
                    <r.icon className="size-5" aria-hidden />
                  </span>
                  <div className="relative mt-6 flex flex-1 flex-col">
                    <h2 className="text-[22px] font-semibold tracking-tight text-ink group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {r.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink-secondary">
                      {r.body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                      {r.external ? "Open docs" : "Browse"}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
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
