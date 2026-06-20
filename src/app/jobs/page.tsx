import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MarketplaceJobCard } from "@/components/careers/marketplace-job-card";
import { getMarketplaceJobs } from "@/lib/marketplace";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Jobs — SignHR",
  description:
    "Browse open positions across companies using SignHR. Find your next role in HR-forward organisations.",
  alternates: { canonical: "/jobs" },
};

// ---------------------------------------------------------------------------
// Filter options
// ---------------------------------------------------------------------------

const EMPLOYMENT_TYPES = [
  { value: "", label: "All types" },
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
];

const WORK_MODES = [
  { value: "", label: "All modes" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on_site", label: "On Site" },
];

const PER_PAGE = 24;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface PageProps {
  searchParams: Promise<{
    q?: string;
    employment_type?: string;
    work_mode?: string;
    country?: string;
    city?: string;
    page?: string;
  }>;
}

export default async function JobsPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const q = sp.q?.trim() ?? "";
  const employment_type = sp.employment_type ?? "";
  const work_mode = sp.work_mode ?? "";
  const country = sp.country?.trim() ?? "";
  const city = sp.city?.trim() ?? "";
  const page = Math.max(1, Number(sp.page ?? 1) || 1);

  const result = await getMarketplaceJobs({
    q: q || undefined,
    employment_type: employment_type || undefined,
    work_mode: work_mode || undefined,
    country: country || undefined,
    city: city || undefined,
    page,
    per_page: PER_PAGE,
  });

  const { jobs, last_page, total } = result;

  // Build a URLSearchParams helper for pagination links (preserves filters).
  function paginationHref(targetPage: number): string {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q);
    if (employment_type) qs.set("employment_type", employment_type);
    if (work_mode) qs.set("work_mode", work_mode);
    if (country) qs.set("country", country);
    if (city) qs.set("city", city);
    if (targetPage > 1) qs.set("page", String(targetPage));
    const str = qs.toString();
    return `/jobs${str ? `?${str}` : ""}`;
  }

  return (
    <>
      {/* Hero */}
      <Section pad="compact" surface="gradient">
        <Container size="md">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Job marketplace
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Find your next{" "}
              <em className="serif-italic not-italic text-brand-700">role</em>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink-secondary">
              Open positions across companies using SignHR — modern teams with modern HR.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filters */}
      <Section pad="compact" surface="muted">
        <Container>
          <form method="GET" action="/jobs" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            {/* Keyword search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Job title, company, or keyword"
                className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-[14px] text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Employment type */}
            <select
              name="employment_type"
              defaultValue={employment_type}
              className="h-10 rounded-lg border border-border bg-card px-3 text-[14px] text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:w-[160px]"
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Work mode */}
            <select
              name="work_mode"
              defaultValue={work_mode}
              className="h-10 rounded-lg border border-border bg-card px-3 text-[14px] text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:w-[140px]"
            >
              {WORK_MODES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* Location — city */}
            <input
              type="text"
              name="city"
              defaultValue={city}
              placeholder="City"
              className="h-10 rounded-lg border border-border bg-card px-3 text-[14px] text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:w-[130px]"
            />

            {/* Location — country */}
            <input
              type="text"
              name="country"
              defaultValue={country}
              placeholder="Country"
              className="h-10 rounded-lg border border-border bg-card px-3 text-[14px] text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:w-[130px]"
            />

            <button
              type="submit"
              className="h-10 shrink-0 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Search
            </button>

            {/* Clear filters (only when something is active) */}
            {(q || employment_type || work_mode || city || country) && (
              <Link
                href="/jobs"
                className="h-10 shrink-0 inline-flex items-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-ink-secondary transition-colors hover:border-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Clear
              </Link>
            )}
          </form>

          {/* Result count */}
          <p className="mt-4 text-[13px] text-ink-muted">
            {total > 0 ? (
              <>
                <span className="font-semibold text-ink">{total}</span>{" "}
                {total === 1 ? "job" : "jobs"} found
              </>
            ) : null}
          </p>
        </Container>
      </Section>

      {/* Job grid */}
      <Section pad="standard">
        <Container>
          {jobs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <MarketplaceJobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-24 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                No results
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-ink">
                No jobs match your search
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-secondary">
                Try adjusting your filters or broadening your search — new
                roles are posted regularly.
              </p>
              {(q || employment_type || work_mode || city || country) && (
                <Link
                  href="/jobs"
                  className="mt-6 inline-flex items-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:border-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  View all jobs
                </Link>
              )}
            </div>
          )}

          {/* Pagination */}
          {last_page > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-10 flex items-center justify-center gap-2"
            >
              {page > 1 ? (
                <Link
                  href={paginationHref(page - 1)}
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-ink-secondary transition-colors hover:border-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Previous
                </Link>
              ) : (
                <span className="flex h-9 cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-ink-muted opacity-50">
                  <ChevronLeft className="size-4" aria-hidden />
                  Previous
                </span>
              )}

              <span className="px-3 text-[13px] text-ink-secondary">
                Page{" "}
                <span className="font-semibold text-ink">{page}</span>
                {" "}of{" "}
                <span className="font-semibold text-ink">{last_page}</span>
              </span>

              {page < last_page ? (
                <Link
                  href={paginationHref(page + 1)}
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-ink-secondary transition-colors hover:border-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Next
                  <ChevronRight className="size-4" aria-hidden />
                </Link>
              ) : (
                <span className="flex h-9 cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-ink-muted opacity-50">
                  Next
                  <ChevronRight className="size-4" aria-hidden />
                </span>
              )}
            </nav>
          )}
        </Container>
      </Section>
    </>
  );
}
