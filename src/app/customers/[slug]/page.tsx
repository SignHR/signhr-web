import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { CTABand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CASE_STUDIES, getCaseStudy } from "@/lib/customers";
import { FEATURE_MODULES } from "@/lib/nav";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.outcome,
    description: study.excerpt,
    alternates: { canonical: `/customers/${slug}` },
    openGraph: {
      title: `${study.outcome} — SignHR`,
      description: study.excerpt,
      type: "article",
      url: `/customers/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const modules = study.modules
    .map((s) => FEATURE_MODULES.find((m) => m.slug === s))
    .filter(<T,>(x: T | undefined): x is T => Boolean(x));

  return (
    <>
      <Section pad="compact" className="border-b border-border">
        <Container size="md">
          <Link
            href="/customers"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All case studies
          </Link>
        </Container>
      </Section>

      <Section pad="standard">
        <Container size="md">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brand">{study.company}</Badge>
            <span className="text-sm text-ink-muted">
              {study.industry} · {study.size} · {study.region}
            </span>
          </div>
          <h1 className="text-display-lg mt-6 max-w-[20ch] text-ink">
            {study.outcome}
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-secondary">
            {study.excerpt}
          </p>
        </Container>
      </Section>

      {/* Stats band */}
      <Section pad="compact" surface="muted">
        <Container size="md">
          <div className="grid gap-4 md:grid-cols-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <p className="font-mono text-[36px] font-semibold tracking-tight text-brand-700">
                  {m.value}
                </p>
                <p className="mt-2 text-[13px] text-ink-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section pad="standard">
        <Container size="md">
          <StorySection title="The challenge" paragraphs={study.story.challenge} />
          {study.pullQuotes[0] && (
            <PullQuote {...study.pullQuotes[0]} className="my-12" />
          )}
          <StorySection title="The solution" paragraphs={study.story.solution} />
          <StorySection
            title="The results"
            paragraphs={study.story.results}
            className="mt-10"
          />
          {study.pullQuotes[1] && (
            <PullQuote {...study.pullQuotes[1]} className="my-12" />
          )}
        </Container>
      </Section>

      {/* Modules used */}
      <Section pad="standard" surface="muted">
        <Container size="md">
          <h2 className="text-display-sm text-ink">Modules they use</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <FeatureCard
                key={m.slug}
                icon={m.icon}
                title={m.name}
                body={m.short}
                href={m.href}
                size="sm"
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="START YOURS"
        title={
          <>
            Want a story like {study.company}&apos;s?{" "}
            <em className="serif-italic">Let&apos;s talk.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}

function StorySection({
  title,
  paragraphs,
  className,
}: {
  title: string;
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-display-sm text-ink">{title}</h2>
      <div className="prose prose-signhr mt-5 max-w-none text-[17px] leading-[1.7] text-ink-secondary">
        {paragraphs.map((p, i) => (
          <p key={i} className="mt-4 first:mt-0">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function PullQuote({
  quote,
  attribution,
  role,
  className,
}: {
  quote: string;
  attribution: string;
  role: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-8 ${className ?? ""}`}
    >
      <Quote className="absolute right-6 top-6 size-8 text-brand-200" aria-hidden />
      <blockquote className="text-display-sm text-ink">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm text-ink-secondary">
        <span className="font-semibold text-ink">{attribution}</span> ·{" "}
        {role}
      </figcaption>
    </figure>
  );
}
