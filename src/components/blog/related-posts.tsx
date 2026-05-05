import { PostCard } from "@/components/blog/post-card";
import type { BlogPost } from "@/lib/blog-types";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        Keep reading
      </p>
      <h2 className="text-display-sm mt-3 text-ink">More from the field</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
