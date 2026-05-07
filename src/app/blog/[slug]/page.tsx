import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CTABand } from "@/components/marketing/cta-band";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { PostHeader } from "@/components/blog/post-header";
import { Toc } from "@/components/blog/toc";
import { AuthorCard } from "@/components/blog/author-card";
import { RelatedPosts } from "@/components/blog/related-posts";
import { mdxComponents } from "@/components/blog/mdx-components";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  extractToc,
} from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — SignHR`,
      description: post.excerpt,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = extractToc(post.body);
  const related = getRelatedPosts(slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "SignHR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <article>
      <JsonLd data={articleLd} />
      <PostHeader post={post} />

      <Section pad="standard">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[1fr_240px] lg:gap-14">
            <div className="prose prose-signhr min-w-0 max-w-none text-[17px] leading-[1.75]">
              <MDXRemote source={post.body} components={mdxComponents} />
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Toc entries={toc} />
              </div>
            </aside>
          </div>

          <div className="mt-16 max-w-[760px]">
            <AuthorCard author={post.author} />
          </div>

          <div className="mt-16 max-w-[760px] rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Stay in the loop
            </p>
            <h3 className="text-[22px] font-semibold tracking-tight text-ink mt-3">
              One email a month, written by humans.
            </h3>
            <div className="mx-auto mt-5 max-w-sm">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section pad="standard" surface="muted">
          <Container>
            <RelatedPosts posts={related} />
          </Container>
        </Section>
      )}

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            See SignHR in action.{" "}
            <em className="serif-italic">It&apos;s faster than reading.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </article>
  );
}
