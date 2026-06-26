import { Avatar } from "@/components/blog/post-card";
import type { Author } from "@/lib/blog-types";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <aside className="flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-card p-6">
      <Avatar
        initials={author.initials}
        accent={author.accent}
        size={14}
        src={author.avatar}
        name={author.name}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-ink">{author.name}</p>
        <p className="text-[13px] text-ink-muted">{author.role} · SignHR</p>
        <p className="mt-2 text-[13px] text-ink-secondary">
          {SHORT_BIO[author.name] ?? "Writes here occasionally."}
        </p>
      </div>
    </aside>
  );
}

const SHORT_BIO: Record<string, string> = {
  "Vikram Joshi":
    "Spent six years building people ops at a fast-growing fintech before co-founding SignHR.",
  "Ria Banerjee":
    "Engineer first, founder second. Likes systems that explain themselves.",
  "Aisha Patel":
    "Ten years in HR ops at companies of every size. Now turns that into product.",
  "Daniel Park":
    "Builds the boring infrastructure that makes the interesting things possible.",
};
