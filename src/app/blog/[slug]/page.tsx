import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { PostHeader } from "@/components/blog/post-header";
import { Toc } from "@/components/blog/toc";
import { AuthorCard } from "@/components/blog/author-card";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ArticleBody } from "@/components/blog/article-body";
import { ViewBeacon } from "@/components/blog/view-beacon";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  extractTocFromHtml,
} from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  // Public resource exposes title/excerpt; seo_* live on the admin resource.
  // Defensive `||` keeps forward-compat if the public shape later adds them.
  const title = post.title;
  const description = post.excerpt;
  const url = `/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${title} — SignHR`,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const toc = extractTocFromHtml(post.body);
  const related = await getRelatedPosts(slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.cover ? { image: [post.cover] } : {}),
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
      <ViewBeacon slug={post.slug} />
      <PostHeader post={post} />

      <Section pad="standard">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[1fr_240px] lg:gap-14">
            <ArticleBody html={post.body} />
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
    </article>
  );
}
