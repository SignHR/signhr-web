import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Spotlight } from "@/components/marketing/spotlight";
import { SpotlightMockupView } from "@/components/marketing/spotlight-mockups";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { GradientHalo } from "@/components/marketing/gradient-halo";
import { FloatingMockup } from "@/components/marketing/floating-mockup";
import { AppBadges } from "@/components/marketing/app-badges";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import {
  FEATURE_PAGE_SLUGS,
  getFeaturePage,
  getRelatedFeatures,
} from "@/lib/features";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeaturePage(slug);
  if (!page) return {};
  const title = `${page.category} Software for Indian Teams`;
  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: `/features/${slug}` },
    openGraph: {
      title: `${title} — SignHR`,
      description: page.metaDescription,
      url: `/features/${slug}`,
      type: "article",
    },
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getFeaturePage(slug);
  if (!page) notFound();

  const related = getRelatedFeatures(slug);
  const firstSpot = page.spotlights[0];
  const heroVisual = firstSpot?.mockup ?? { kind: "self-service" };
  // Hero band uses an explicit hero.image only (no auto-fallback to the first
  // spotlight's image) — so a spotlight can have its own image without it being
  // pulled up into the hero band.
  const heroImage = page.hero.image;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: `${SITE_URL}/features`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.category,
        item: `${SITE_URL}/features/${slug}`,
      },
    ],
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `SignHR — ${page.category}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: page.metaDescription,
    url: `${SITE_URL}/features/${slug}`,
    featureList: page.capabilities.map((c) => c.title),
    publisher: { "@type": "Organization", name: "SignHR", url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, softwareLd]} />
      <Hero
        variant="feature"
        eyebrow={page.category.toUpperCase()}
        title={
          <>
            {page.hero.title}{" "}
            {page.hero.titleAccent && (
              <em className="serif-italic">{page.hero.titleAccent}</em>
            )}
          </>
        }
        description={page.hero.description}
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {/* Big hero visual band */}
      <Section pad="compact" className="-mt-10 md:-mt-16">
        <Container>
          <div className="relative">
            <GradientHalo
              variant="hero"
              size="lg"
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <FloatingMockup amplitude={8} duration={7} className="block w-full">
              {heroImage ? (
                <SpotlightImage
                  {...heroImage}
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="mx-auto w-full max-w-[1200px]"
                />
              ) : (
                <SpotlightMockupView
                  mockup={heroVisual}
                  className="mx-auto w-full max-w-[1200px]"
                />
              )}
            </FloatingMockup>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              What you can do
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Built for the way HR <em className="serif-italic">actually</em>{" "}
              works.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.capabilities.map((cap) => (
              <FeatureCard
                key={cap.title}
                icon={cap.icon}
                title={cap.title}
                body={cap.body}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Spotlights */}
      {page.spotlights.map((spot, i) => (
        <Section
          key={i}
          id={spot.anchor}
          pad="standard"
          surface={i % 2 === 1 ? "muted" : "default"}
          className={spot.anchor ? "scroll-mt-24" : undefined}
        >
          <Container>
            <Spotlight
              eyebrow={spot.eyebrow}
              title={
                <span dangerouslySetInnerHTML={{ __html: spot.title }} />
              }
              body={spot.body}
              bullets={spot.bullets}
              side={spot.side}
              action={
                spot.anchor === "mobile" ? (
                  <AppBadges platforms={["app_store", "play_store"]} />
                ) : undefined
              }
              visual={
                spot.image ? (
                  <SpotlightImage {...spot.image} />
                ) : spot.mockup ? (
                  <SpotlightMockupView mockup={spot.mockup} />
                ) : null
              }
            />
          </Container>
        </Section>
      ))}

      {/* Mini testimonial */}
      <Section pad="standard">
        <Container size="md">
          <div className="mx-auto max-w-2xl">
            <TestimonialCard
              size="lg"
              testimonial={{
                quote: page.testimonial.quote,
                name: page.testimonial.name,
                role: page.testimonial.role,
                company: page.testimonial.company,
                initials: page.testimonial.avatar,
                accent: ["purple", "amber", "blue", "green"][
                  page.testimonial.name.charCodeAt(0) % 4
                ] as "purple" | "amber" | "blue" | "green",
              }}
            />
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section pad="standard" surface="muted">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Works with the rest of SignHR
                </p>
                <h2 className="text-display-sm mt-3 text-ink">
                  Pair with these modules
                </h2>
              </div>
              <Button asChild variant="link">
                <Link href="/features">
                  See all features
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((m) => (
                <FeatureCard
                  key={m.slug}
                  icon={m.icon}
                  title={m.name}
                  body={m.short}
                  href={m.href}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

function SpotlightImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-card shadow-[0_30px_60px_-25px_rgba(45,30,90,0.25)] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </div>
  );
}
