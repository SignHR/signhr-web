"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { BlogPost } from "@/lib/blog-types";
import { PostCard } from "@/components/blog/post-card";
import { cn } from "@/lib/utils";

interface BlogIndexClientProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogIndexClient({ posts, categories }: BlogIndexClientProps) {
  const [filter, setFilter] = React.useState<string>("All");

  const filtered =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={filter === "All"}
          onClick={() => setFilter("All")}
          count={posts.length}
        >
          All
        </FilterChip>
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length;
          if (count === 0) return null;
          return (
            <FilterChip
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
              count={count}
            >
              {cat}
            </FilterChip>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-muted">
          No articles in this category yet. Check back soon.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-all",
        active
          ? "border-brand-300 bg-brand-50 text-brand-700"
          : "border-border bg-card text-ink-secondary hover:border-ink-muted hover:text-ink",
      )}
    >
      {children}
      {typeof count === "number" && (
        <span
          className={cn(
            "rounded-full px-1.5 text-[11px]",
            active ? "bg-brand-200/80 text-brand-800" : "bg-muted text-ink-muted",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
