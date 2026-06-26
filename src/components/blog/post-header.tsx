import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/blog/post-card";
import { BlogCover } from "@/components/blog/blog-cover";

export function PostHeader({ post }: { post: BlogPost }) {
  return (
    <Section pad="compact" className="border-b border-border">
      <Container size="md">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          All articles
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Badge variant="brand">{post.category}</Badge>
          <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
            <Clock className="size-3.5" aria-hidden />
            {post.readTime}
          </span>
          <span className="text-sm text-ink-muted">·</span>
          <time className="text-sm text-ink-muted" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        <h1 className="text-display-lg mt-6 max-w-[22ch] text-ink">
          {post.title}
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-ink-secondary">
          {post.excerpt}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Avatar
            initials={post.author.initials}
            accent={post.author.accent}
            src={post.author.avatar}
            name={post.author.name}
          />
          <div>
            <p className="text-sm font-semibold text-ink">{post.author.name}</p>
            <p className="text-[13px] text-ink-muted">{post.author.role}</p>
          </div>
        </div>

        {/* Cover band — only when the post actually has a cover image. */}
        {post.cover ? (
          <BlogCover
            post={post}
            variant="banner"
            className="mt-12 rounded-3xl"
            priority
          />
        ) : null}
      </Container>
    </Section>
  );
}
