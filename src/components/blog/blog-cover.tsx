import Image from "next/image";
import type { BlogPost } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

type CoverVariant = "grid" | "feature" | "banner";

const ACCENT_GRADIENT: Record<string, string> = {
  purple: "from-violet-200 via-fuchsia-200 to-indigo-300",
  amber: "from-amber-200 via-orange-200 to-rose-300",
  blue: "from-sky-200 via-cyan-200 to-blue-300",
  green: "from-teal-200 via-emerald-200 to-lime-300",
};

// Every blog image is shown in a 16:9 box (covers are uploaded at 1600×900).
const SHAPE: Record<CoverVariant, string> = {
  grid: "aspect-video w-full",
  feature: "aspect-video w-full",
  banner: "aspect-video w-full",
};

const SIZES: Record<CoverVariant, string> = {
  grid: "(min-width: 768px) 33vw, 100vw",
  feature: "(min-width: 1024px) 50vw, 100vw",
  banner: "(min-width: 1024px) 800px, 100vw",
};

interface BlogCoverProps {
  post: Pick<BlogPost, "cover" | "title" | "author">;
  variant?: CoverVariant;
  className?: string;
  priority?: boolean;
}

/**
 * Renders a post's uploaded cover image when present, falling back to an
 * accent-tinted gradient for posts without one. Centralises cover rendering for
 * the post cards, home-page teasers, and the article header banner so every
 * surface uses the real `post.cover` consistently.
 */
export function BlogCover({
  post,
  variant = "grid",
  className,
  priority,
}: BlogCoverProps) {
  const accent = ACCENT_GRADIENT[post.author.accent] ?? ACCENT_GRADIENT.purple;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        SHAPE[variant],
        // Real covers letterbox against a neutral surface (full image, never
        // cropped); the gradient is only the placeholder for cover-less posts.
        post.cover ? "bg-muted" : cn("bg-gradient-to-br", accent),
        className,
      )}
    >
      {post.cover ? (
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes={SIZES[variant]}
          priority={priority}
          className="object-contain"
        />
      ) : (
        <div
          aria-hidden
          className="size-full bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.55),_transparent_55%),radial-gradient(ellipse_at_80%_80%,_rgba(255,255,255,0.35),_transparent_50%)]"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/5 dark:ring-white/10"
      />
    </div>
  );
}
