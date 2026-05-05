import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  BlogFrontmatter,
  BlogPost,
  Author,
  TocEntry,
} from "./blog-types";
import { slugify } from "./blog-types";

export type {
  BlogPost,
  BlogFrontmatter,
  BlogCategory,
  Author,
  TocEntry,
} from "./blog-types";
export { CATEGORIES, slugify, formatDate } from "./blog-types";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export const AUTHORS: Record<string, Author> = {
  vikram: {
    name: "Vikram Joshi",
    role: "Co-founder & CEO",
    initials: "VJ",
    accent: "purple",
  },
  ria: {
    name: "Ria Banerjee",
    role: "Co-founder & CTO",
    initials: "RB",
    accent: "amber",
  },
  aisha: {
    name: "Aisha Patel",
    role: "Head of Product",
    initials: "AP",
    accent: "green",
  },
  daniel: {
    name: "Daniel Park",
    role: "Head of Engineering",
    initials: "DP",
    accent: "blue",
  },
};

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as BlogFrontmatter;
    return { ...fm, slug, body: content };
  });

  cache = posts.sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, count);
}

export function getFeaturedPost(): BlogPost | undefined {
  return getAllPosts().find((p) => p.featured && !p.draft);
}

export function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");
  const toc: TocEntry[] = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/[`*_]/g, "").trim();
      const id = slugify(text);
      toc.push({ id, text, level });
    }
  }
  return toc;
}
