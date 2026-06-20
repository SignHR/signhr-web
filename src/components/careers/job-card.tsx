import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";
import type { PublicJobListItem } from "@/lib/careers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Display label maps
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
function resolveLocation(job: PublicJobListItem): string | null {
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
 * Build a human-readable experience range, e.g. "2–5 yrs" or "3+ yrs" or "0–1 yr".
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface JobCardProps {
  job: PublicJobListItem;
  company: string;
  className?: string;
}

export function JobCard({ job, company, className }: JobCardProps) {
  const location = resolveLocation(job);
  const experience = formatExperience(job.experience_min, job.experience_max);
  const employmentLabel =
    job.employment_type ? (EMPLOYMENT_TYPE_LABELS[job.employment_type] ?? job.employment_type) : null;
  const workModeLabel =
    job.work_mode ? (WORK_MODE_LABELS[job.work_mode] ?? job.work_mode) : null;
  const postedAt = job.published_at ? formatPublishedAt(job.published_at) : null;
  const href = `/careers/${company}/${job.slug}`;

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.18)]",
        className,
      )}
    >
      {/* Header row: title + department */}
      <div className="flex flex-col gap-1">
        {job.department && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
            {job.department.name}
          </p>
        )}
        <Link
          href={href}
          className="text-[18px] font-semibold leading-snug tracking-tight text-ink group-hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {job.title}
        </Link>
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

      {/* Footer: posted date + apply CTA */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        {postedAt ? (
          <span className="flex items-center gap-1.5 text-[12px] text-ink-muted">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            Posted {postedAt}
          </span>
        ) : (
          <span />
        )}
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          tabIndex={-1}
          aria-hidden
        >
          Apply now
        </Link>
      </div>
    </article>
  );
}
