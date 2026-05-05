export type Author = {
  name: string;
  role: string;
  initials: string;
  accent: "purple" | "amber" | "blue" | "green";
};

export type BlogCategory =
  | "HR Strategy"
  | "Compliance"
  | "Product"
  | "Culture"
  | "Guides";

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  readTime: string;
  author: Author;
  cover?: string;
  featured?: boolean;
  draft?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  body: string;
};

export type TocEntry = { id: string; text: string; level: number };

export const CATEGORIES: BlogCategory[] = [
  "HR Strategy",
  "Compliance",
  "Product",
  "Culture",
  "Guides",
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
