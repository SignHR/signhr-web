import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/blog/post-card";
import { cn } from "@/lib/utils";

const COVER_ACCENT: Record<string, string> = {
  purple: "from-violet-200 via-fuchsia-200 to-indigo-300",
  amber: "from-amber-200 via-orange-200 to-rose-300",
  blue: "from-sky-200 via-cyan-200 to-blue-300",
  green: "from-teal-200 via-emerald-200 to-lime-300",
};

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
          <Avatar initials={post.author.initials} accent={post.author.accent} />
          <div>
            <p className="text-sm font-semibold text-ink">{post.author.name}</p>
            <p className="text-[13px] text-ink-muted">{post.author.role}</p>
          </div>
        </div>

        {/* Cover band */}
        <div
          className={cn(
            "mt-12 aspect-[16/7] overflow-hidden rounded-3xl bg-gradient-to-br ring-1 ring-black/5",
            COVER_ACCENT[post.author.accent] ?? COVER_ACCENT.purple,
          )}
          aria-hidden
        >
          <div className="size-full bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.55),_transparent_55%),radial-gradient(ellipse_at_80%_80%,_rgba(255,255,255,0.35),_transparent_50%)]" />
        </div>
      </Container>
    </Section>
  );
}
