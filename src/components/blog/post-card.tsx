import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import { BlogCover } from "@/components/blog/blog-cover";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: BlogPost;
  variant?: "grid" | "row" | "feature";
  className?: string;
}

const ACCENT: Record<string, string> = {
  purple: "from-violet-200 to-indigo-300",
  amber: "from-amber-200 to-rose-300",
  blue: "from-sky-200 to-blue-300",
  green: "from-teal-200 to-emerald-300",
};

export function PostCard({
  post,
  variant = "grid",
  className,
}: PostCardProps) {
  if (variant === "feature") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group grid overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_24px_60px_-30px_rgba(45,30,90,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:grid-cols-[1.3fr_1fr]",
          className,
        )}
      >
        {/* Flush full-bleed 16:9 banner — fills its panel exactly (a 16:9 cover
            leaves no gaps) and is never cropped. The image column is slightly
            wider than the text so the banner's 16:9 height drives (and matches)
            the card height — no card-coloured gap below the image. */}
        <BlogCover post={post} variant="feature" priority />

        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
            <Star className="size-3 fill-brand-500 text-brand-500" aria-hidden />
            Featured · {post.category}
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink group-hover:text-brand-700 lg:text-[28px]">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-2 text-[16px] leading-relaxed text-ink-secondary">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <Avatar
                initials={post.author.initials}
                accent={post.author.accent}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {post.author.name}
                </p>
                <p className="text-xs text-ink-muted">
                  {formatDate(post.date)} · {post.readTime}
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
              Read article
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.18)]",
        className,
      )}
    >
      <BlogCover post={post} variant="grid" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          {post.category}
        </p>
        <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-tight text-ink group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-ink-secondary">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Avatar
            initials={post.author.initials}
            accent={post.author.accent}
          />
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-ink">
              {post.author.name}
            </p>
            <p className="text-[11px] text-ink-muted">
              {formatDate(post.date)} · {post.readTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Avatar({
  initials,
  accent,
  size = 9,
}: {
  initials: string;
  accent: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-semibold text-white",
        ACCENT[accent] ?? ACCENT.purple,
      )}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      {initials}
    </div>
  );
}
