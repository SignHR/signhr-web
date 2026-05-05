import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
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
          "group relative grid gap-6 overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_24px_60px_-30px_rgba(45,30,90,0.25)] md:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12",
          className,
        )}
      >
        <div className="relative">
          <CoverArt accent={post.author.accent} variant="feature" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Featured · {post.category}
          </p>
          <h2 className="text-display-sm mt-4 text-ink group-hover:text-brand-700">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-secondary">
            {post.excerpt}
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            {post.author.name} · {formatDate(post.date)} · {post.readTime}
          </p>
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
      <CoverArt accent={post.author.accent} />
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

function CoverArt({
  accent,
  variant = "grid",
}: {
  accent: string;
  variant?: "grid" | "feature";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br",
        ACCENT[accent] ?? ACCENT.purple,
        variant === "grid" ? "h-44 rounded-b-none" : "aspect-[4/3] md:aspect-[16/12]",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4),_transparent_55%)]" />
      <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-xl bg-white/30 backdrop-blur-md">
        <span className="size-3 rounded-full bg-white/80" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
        <div className="h-1.5 rounded-full bg-white/40" />
        <div className="h-1.5 rounded-full bg-white/30" />
        <div className="h-1.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
