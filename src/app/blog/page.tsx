import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { PostCard } from "@/components/blog/post-card";
import { BlogIndexClient } from "@/components/blog/blog-index-client";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on modern HR — strategy, compliance, product, culture, and the occasional rant about spreadsheets.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Hero
        eyebrow="THE FIELD NOTES"
        title={
          <>
            Honest writing about{" "}
            <em className="serif-italic">modern HR</em>
          </>
        }
        description="Strategy, compliance, product, culture. No leverage. No synergy. Just things we've learned and things we're still figuring out."
      />

      {featured && (
        <Section pad="standard" className="-mt-12">
          <Container>
            <PostCard post={featured} variant="feature" />
          </Container>
        </Section>
      )}

      <Section pad="standard" surface="muted">
        <Container>
          <BlogIndexClient posts={rest} />
        </Container>
      </Section>

      <Section pad="standard">
        <Container size="md">
          <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              The newsletter
            </p>
            <h2 className="text-display-sm mt-4 text-ink">
              One short email a month.{" "}
              <em className="serif-italic">No fluff.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-secondary">
              Field notes, product updates, and the occasional template.
              Unsubscribe in one click — we won&apos;t make it hard.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Reading about HR is fun.{" "}
            <em className="serif-italic">Doing it well</em> is even more fun.
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
