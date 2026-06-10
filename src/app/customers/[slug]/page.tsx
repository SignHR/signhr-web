import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CustomersCta } from "@/components/marketing/customers-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
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
  const title = `${study.company} — HR Software Case Study`;
  const description =
    study.excerpt.length > 158
      ? study.excerpt.slice(0, study.excerpt.lastIndexOf(" ", 158)).trimEnd() + "…"
      : study.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/customers/${slug}` },
    openGraph: {
      title: `${title} — SignHR`,
      description,
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

  // More stories: same sector first, then fill by roster order. Max 3.
  const related = [
    ...CASE_STUDIES.filter(
      (c) => c.slug !== study.slug && c.sector === study.sector,
    ),
    ...CASE_STUDIES.filter(
      (c) => c.slug !== study.slug && c.sector !== study.sector,
    ),
  ].slice(0, 3);

  const featureHref =
    FEATURE_MODULES.find((m) => m.slug === study.featureSlug)?.href ?? "/features";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Customers",
        item: `${SITE_URL}/customers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.company,
        item: `${SITE_URL}/customers/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
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
          <Link
            href={featureHref}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 hover:text-brand-600"
          >
            {study.feature}
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge variant="brand">{study.company}</Badge>
            <span className="text-sm text-ink-muted">
              {study.sector} · {study.hq} · {study.size}
            </span>
          </div>
          <p className="mt-3 text-[13px] font-medium text-ink-muted">
            Founded {study.founded} · {study.stage}
          </p>
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

      {/* More stories */}
      {related.length > 0 && (
        <Section pad="standard">
          <Container>
            <h2 className="text-display-sm text-ink">More stories</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((c) => (
                <CaseStudyCard key={c.slug} study={c} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CustomersCta />
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
      <blockquote className="text-display-sm text-ink">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-5 text-sm text-ink-secondary">
        <span className="font-semibold text-ink">{attribution}</span> · {role}
      </figcaption>
    </figure>
  );
}
