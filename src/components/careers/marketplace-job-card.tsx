import { MapPin, Briefcase, Clock, Building2 } from "lucide-react";
import type { MarketplaceJob } from "@/lib/marketplace";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Display label maps (mirrored from job-card.tsx)
// ---------------------------------------------------------------------------

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  temporary: "Temporary",
};

const WORK_MODE_LABELS: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  on_site: "On Site",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a human-readable location string from the structured fields,
 * falling back to the free-text location_text field.
 */
function resolveLocation(job: MarketplaceJob): string | null {
  const parts = [job.city, job.state, job.country].filter(Boolean);
  if (parts.length > 0) return parts.join(", ");
  return job.location_text ?? null;
}

/**
 * Format a Unix timestamp (seconds) as "Mon YYYY".
 */
function formatPublishedAt(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Build a human-readable experience range, e.g. "2–5 yrs" or "3+ yrs".
 */
function formatExperience(min: number | null, max: number | null): string | null {
  if (min === null && max === null) return null;
  if (min !== null && max !== null) {
    const unit = max === 1 ? "yr" : "yrs";
    return `${min}–${max} ${unit}`;
  }
  if (min !== null) return `${min}+ yrs`;
  if (max !== null) {
    const unit = max === 1 ? "yr" : "yrs";
    return `Up to ${max} ${unit}`;
  }
  return null;
}

/**
 * The marketplace (`/jobs`) and the canonical careers page are always served
 * from the SAME signhr-web origin, so navigate same-origin (path only). The
 * stored `public_url` is an absolute prod URL (kept for the sitemap + JSON-LD
 * canonical, which target the real domain); using it for in-app navigation
 * would wrongly leave the app in any non-prod environment (e.g. localhost).
 */
function toCareersPath(publicUrl: string): string {
  try {
    return new URL(publicUrl).pathname;
  } catch {
    return publicUrl;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MarketplaceJobCardProps {
  job: MarketplaceJob;
  className?: string;
}

/**
 * A marketplace job card for the /jobs listing page.
 *
 * Unlike the per-company JobCard, this card shows the hiring company's name
 * and logo, and links to `public_url` (the canonical careers page hosted on
 * the company's subdomain / careers page).
 *
 * Plain <img> is used for the company logo — tenant logo hosts are external
 * and not whitelisted in next.config.ts.
 */
export function MarketplaceJobCard({ job, className }: MarketplaceJobCardProps) {
  const location = resolveLocation(job);
  const experience = formatExperience(job.experience_min, job.experience_max);
  const employmentLabel =
    job.employment_type
      ? (EMPLOYMENT_TYPE_LABELS[job.employment_type] ?? job.employment_type)
      : null;
  const workModeLabel =
    job.work_mode ? (WORK_MODE_LABELS[job.work_mode] ?? job.work_mode) : null;
  const postedAt = job.published_at ? formatPublishedAt(job.published_at) : null;
  const careersHref = toCareersPath(job.public_url);

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.18)]",
        className,
      )}
    >
      {/* Company identity row */}
      <div className="flex items-center gap-3">
        {job.company_logo_url ? (
          /* Plain <img> — tenant logo host is not whitelisted in next.config.ts */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={job.company_logo_url}
            alt={`${job.company_name} logo`}
            className="h-10 w-10 shrink-0 rounded-xl border border-border bg-white object-contain p-1"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
            <Building2 className="size-5 text-ink-muted" aria-hidden />
          </span>
        )}
        <p className="text-[13px] font-semibold leading-snug text-ink-secondary">
          {job.company_name}
        </p>
      </div>

      {/* Job title + department */}
      <div className="flex flex-col gap-1">
        {job.department_name && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
            {job.department_name}
          </p>
        )}
        <a
          href={careersHref}
          className="text-[18px] font-semibold leading-snug tracking-tight text-ink group-hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {job.title}
        </a>
      </div>

      {/* Meta row: location + experience */}
      {(location || experience) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-secondary">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-ink-muted" aria-hidden />
              {location}
            </span>
          )}
          {experience && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="size-3.5 shrink-0 text-ink-muted" aria-hidden />
              {experience}
            </span>
          )}
        </div>
      )}

      {/* Short description (when available) */}
      {job.short_description && (
        <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-secondary">
          {job.short_description}
        </p>
      )}

      {/* Badges row */}
      {(employmentLabel || workModeLabel) && (
        <div className="flex flex-wrap gap-2">
          {employmentLabel && (
            <Badge variant="brand">{employmentLabel}</Badge>
          )}
          {workModeLabel && (
            <Badge variant="outline">{workModeLabel}</Badge>
          )}
        </div>
      )}

      {/* Footer: posted date + view role CTA */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        {postedAt ? (
          <span className="flex items-center gap-1.5 text-[12px] text-ink-muted">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            Posted {postedAt}
          </span>
        ) : (
          <span />
        )}
        <a
          href={careersHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          tabIndex={-1}
          aria-hidden="true"
        >
          View role
        </a>
      </div>
    </article>
  );
}
