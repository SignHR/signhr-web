import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { getAllPosts } from "@/lib/blog";
import { FEATURE_PAGE_SLUGS } from "@/lib/features";
import { CASE_STUDIES } from "@/lib/customers";

const STATIC_ROUTES: Array<{ path: string; priority?: number; changeFreq?: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/features", priority: 0.9, changeFreq: "weekly" },
  // { path: "/pricing", priority: 0.9, changeFreq: "weekly" }, // hidden for now
  { path: "/customers", priority: 0.8, changeFreq: "weekly" },
  { path: "/about", priority: 0.6, changeFreq: "monthly" },
  { path: "/blog", priority: 0.8, changeFreq: "weekly" },
  { path: "/resources", priority: 0.7, changeFreq: "weekly" },
  { path: "/resources/guides", priority: 0.7, changeFreq: "weekly" },
  { path: "/resources/templates", priority: 0.6, changeFreq: "monthly" },
  { path: "/resources/help", priority: 0.7, changeFreq: "weekly" },
  { path: "/changelog", priority: 0.7, changeFreq: "weekly" },
  { path: "/book-demo", priority: 0.9, changeFreq: "monthly" },
  { path: "/contact", priority: 0.5, changeFreq: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFreq: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFreq: "yearly" },
  { path: "/legal/dpa", priority: 0.3, changeFreq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  const featureEntries: MetadataRoute.Sitemap = FEATURE_PAGE_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/features/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const customerEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${SITE_URL}/customers/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  return [
    ...staticEntries,
    ...featureEntries,
    ...customerEntries,
    ...blogEntries,
  ];
}
