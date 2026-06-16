const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Cache tag so the backend revalidation webhook can target marketplace data. */
export const MARKETPLACE_TAG = "marketplace";

/**
 * ISR window for marketplace fetches. On-demand revalidation (the backend
 * publish webhook → /api/revalidate with type "careers") makes publishes
 * near-instant; this bounds staleness when the webhook is unconfigured.
 */
const MARKETPLACE_REVALIDATE_SECONDS = 300;

// ---------------------------------------------------------------------------
// Backend resource shape (internal — matches MarketplaceJobResource exactly)
// ---------------------------------------------------------------------------

interface MarketplaceJobResource {
  id: number;
  title: string;
  slug: string;
  company_name: string;
  company_logo_url: string | null; // absolute URL, already resolved by the projector
  department_name: string | null;
  location_text: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  employment_type: string | null;
  work_mode: string | null;
  experience_min: number | null;
  experience_max: number | null;
  salary_min: number | null; // null when hide_salary is true (already masked in the projection)
  salary_max: number | null; // null when hide_salary is true
  salary_currency: string | null;
  salary_period: string | null; // MONTH | YEAR | etc.
  hide_salary: boolean;
  skills: string[];
  short_description: string | null;
  public_url: string; // canonical careers link — absolute URL, pass through unchanged
  published_at: number | null; // Unix timestamp (seconds)
}

/** ResponseBuilder meta block for paginated responses */
interface ResponseBuilderMeta {
  total_page: number;
  total_item: number;
  current_page: number;
  per_page: number;
}

/** ResponseBuilder envelope — data holds the named collection key; meta holds pagination */
interface Envelope {
  status?: boolean;
  message?: string;
  data?: { jobs?: MarketplaceJobResource[] };
  meta?: ResponseBuilderMeta;
}

// ---------------------------------------------------------------------------
// Exported TypeScript types (snake_case kept to match the wire format)
// ---------------------------------------------------------------------------

/** A single marketplace job as consumed by components. */
export interface MarketplaceJob {
  id: number;
  title: string;
  slug: string;
  company_name: string;
  company_logo_url: string | null;
  department_name: string | null;
  location_text: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  employment_type: string | null;
  work_mode: string | null;
  experience_min: number | null;
  experience_max: number | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  salary_period: string | null;
  hide_salary: boolean;
  skills: string[];
  short_description: string | null;
  /** Canonical careers page URL — links to /careers/[workspace]/[slug] on the backend-served page. */
  public_url: string;
  published_at: number | null; // Unix timestamp — use new Date(ts * 1000) in components
}

/** Paginated result returned by getMarketplaceJobs(). */
export interface MarketplaceJobsResult {
  jobs: MarketplaceJob[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/** Query parameters accepted by getMarketplaceJobs(). */
export interface MarketplaceJobParams {
  q?: string;
  employment_type?: string;
  work_mode?: string;
  country?: string;
  city?: string;
  company_id?: number;
  experience_max?: number;
  page?: number;
  per_page?: number;
}

// ---------------------------------------------------------------------------
// Mapping helper
// ---------------------------------------------------------------------------

function mapJob(r: MarketplaceJobResource): MarketplaceJob {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    company_name: r.company_name,
    company_logo_url: r.company_logo_url,
    department_name: r.department_name,
    location_text: r.location_text,
    city: r.city,
    state: r.state,
    country: r.country,
    employment_type: r.employment_type,
    work_mode: r.work_mode,
    experience_min: r.experience_min,
    experience_max: r.experience_max,
    salary_min: r.salary_min,
    salary_max: r.salary_max,
    salary_currency: r.salary_currency,
    salary_period: r.salary_period,
    hide_salary: r.hide_salary,
    skills: r.skills,
    short_description: r.short_description,
    public_url: r.public_url,
    published_at: r.published_at,
  };
}

// ---------------------------------------------------------------------------
// Exported fetch function
// ---------------------------------------------------------------------------

/**
 * Fetch marketplace jobs from the cross-tenant GET /jobs endpoint.
 *
 * Uses ISR (revalidate every 5 min) + the "marketplace" cache tag so the
 * backend publish webhook can flush this cache on-demand via /api/revalidate.
 *
 * Returns a graceful empty result on any fetch or parse failure — the page
 * degrades to an empty state rather than throwing.
 */
export async function getMarketplaceJobs(
  params: MarketplaceJobParams = {},
): Promise<MarketplaceJobsResult> {
  const EMPTY: MarketplaceJobsResult = {
    jobs: [],
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };

  if (!API_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[marketplace] NEXT_PUBLIC_API_URL is not set — marketplace data unavailable.");
    }
    return EMPTY;
  }

  // Build query string from non-empty params.
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.employment_type) qs.set("employment_type", params.employment_type);
  if (params.work_mode) qs.set("work_mode", params.work_mode);
  if (params.country) qs.set("country", params.country);
  if (params.city) qs.set("city", params.city);
  if (params.company_id !== undefined) qs.set("company_id", String(params.company_id));
  if (params.experience_max !== undefined) qs.set("experience_max", String(params.experience_max));
  if (params.page !== undefined) qs.set("page", String(params.page));
  if (params.per_page !== undefined) qs.set("per_page", String(params.per_page));

  const query = qs.toString();
  const path = `/jobs${query ? `?${query}` : ""}`;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: MARKETPLACE_REVALIDATE_SECONDS, tags: [MARKETPLACE_TAG] },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[marketplace] GET ${path} → HTTP ${res.status}`);
      }
      return EMPTY;
    }

    const json = (await res.json()) as Envelope;
    const jobs = json.data?.jobs;
    const meta = json.meta;
    if (!jobs || !meta) return EMPTY;

    return {
      jobs: jobs.map(mapJob),
      current_page: meta.current_page,
      last_page: meta.total_page,
      per_page: meta.per_page,
      total: meta.total_item,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      const cause = (err as { cause?: { code?: string; message?: string } })?.cause;
      console.error(
        `[marketplace] GET ${path} failed:`,
        (err as Error)?.message,
        cause?.code ?? cause?.message ?? "",
      );
    }
    return EMPTY;
  }
}
