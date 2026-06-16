import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { getAllPosts } from "@/lib/blog";
import { FEATURE_PAGE_SLUGS } from "@/lib/features";
import { CASE_STUDIES } from "@/lib/customers";
import { getMarketplaceJobs } from "@/lib/marketplace";

const STATIC_ROUTES: Array<{ path: string; priority?: number; changeFreq?: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/features", priority: 0.9, changeFreq: "weekly" },
  { path: "/pricing", priority: 0.9, changeFreq: "weekly" },
  { path: "/customers", priority: 0.8, changeFreq: "weekly" },
  { path: "/about", priority: 0.6, changeFreq: "monthly" },
  { path: "/blog", priority: 0.8, changeFreq: "weekly" },
  { path: "/jobs", priority: 0.8, changeFreq: "daily" },
  { path: "/download", priority: 0.7, changeFreq: "monthly" },
  { path: "/download/releases", priority: 0.5, changeFreq: "weekly" },
  { path: "/changelog", priority: 0.7, changeFreq: "weekly" },
  { path: "/book-demo", priority: 0.9, changeFreq: "monthly" },
  { path: "/contact", priority: 0.5, changeFreq: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFreq: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFreq: "yearly" },
  { path: "/legal/dpa", priority: 0.3, changeFreq: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const posts = await getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  // Marketplace job entries — each job's canonical public_url (careers subdomain link).
  // The backend clamps per_page to ≤50, so we loop pages to accumulate all jobs.
  const allMarketplaceJobs: Awaited<ReturnType<typeof getMarketplaceJobs>>["jobs"] = [];
  const SITEMAP_PER_PAGE = 50;
  const MAX_SITEMAP_PAGES = 50; // guard against an infinite loop
  let currentPage = 1;
  let lastPage = 1;
  do {
    const result = await getMarketplaceJobs({ per_page: SITEMAP_PER_PAGE, page: currentPage });
    allMarketplaceJobs.push(...result.jobs);
    lastPage = result.last_page;
    currentPage += 1;
  } while (currentPage <= lastPage && currentPage <= MAX_SITEMAP_PAGES);

  const jobEntries: MetadataRoute.Sitemap = allMarketplaceJobs
    .filter((job) => !!job.public_url)
    .map((job) => ({
      url: job.public_url, // absolute URL — already set by the projector
      lastModified: job.published_at ? new Date(job.published_at * 1000) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [
    ...staticEntries,
    ...featureEntries,
    ...customerEntries,
    ...blogEntries,
    ...jobEntries,
  ];
}
