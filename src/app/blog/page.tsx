import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { PostCard } from "@/components/blog/post-card";
import { BlogIndexClient } from "@/components/blog/blog-index-client";
import { getAllPosts, getFeaturedPost, getCategories } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on modern HR in India — EPF compliance, workplace culture, payroll strategy, and the occasional rant about spreadsheets.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const [posts, featured, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getCategories(),
  ]);
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Hero
        eyebrow="THE FIELD NOTES"
        title={
          <>
            Honest writing about{" "}
            <em className="serif-italic">modern HR in India</em>
          </>
        }
        description="EPF compliance, payroll strategy, and building culture in Indian startups. No fluff. Just things we've learned and things we're still figuring out."
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
          <BlogIndexClient posts={rest} categories={categories} />
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
              Field notes, product updates, and the occasional template for Indian HR teams.
              Unsubscribe in one click — we won&apos;t make it hard.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
