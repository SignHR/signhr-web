import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import { getCompanyJob } from "@/lib/careers";

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ company: string; slug: string }> };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapEmploymentType(type: string): string {
  const map: Record<string, string> = {
    full_time: "FULL_TIME",
    part_time: "PART_TIME",
    contract: "CONTRACTOR",
    internship: "INTERN",
    temporary: "TEMPORARY",
  };
  return map[type] ?? "OTHER";
}

/** Render employment_type slug as a human-readable label */
function employmentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
    temporary: "Temporary",
  };
  return labels[type] ?? type;
}

/** Render work_mode slug as a human-readable label */
function workModeLabel(mode: string): string {
  const labels: Record<string, string> = {
    on_site: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  return labels[mode] ?? mode;
}

/**
 * Strip HTML tags and truncate to 160 characters.
 * Google requires the metadata description to be plain text.
 */
function descriptionSnippet(html: string): string {
  return html.replace(/<[^>]+>/g, "").slice(0, 160);
}

/** Format a numeric salary value with commas and optional currency symbol */
function formatSalary(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-IN")}`;
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);
  if (!job) return {};

  const title = `${job.title} — ${job.company?.name ?? company}`;
  const description = descriptionSnippet(job.description);
  const url = `/careers/${company}/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      ...(job.published_at != null
        ? { publishedTime: new Date(job.published_at * 1000).toISOString() }
        : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function JobDetailPage({ params }: Props) {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);
  if (!job) notFound();

  // --- Location display ---
  const locationComposite =
    [job.city, job.state, job.country].filter(Boolean).join(", ") || null;
  const locationDisplay = job.location_text ?? locationComposite;

  // --- Salary display ---
  const currency = job.salary_currency ?? "INR";
  const period = job.salary_period === "MONTH" ? "/mo" : "/yr";
  let salaryDisplay: string | null = null;
  if (job.salary_min != null && job.salary_max != null) {
    salaryDisplay = `${formatSalary(job.salary_min, currency)} – ${formatSalary(job.salary_max, currency)}${period}`;
  } else if (job.salary_min != null) {
    salaryDisplay = `From ${formatSalary(job.salary_min, currency)}${period}`;
  } else if (job.salary_max != null) {
    salaryDisplay = `Up to ${formatSalary(job.salary_max, currency)}${period}`;
  }

  // --- JSON-LD ---
  const jobLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    ...(job.published_at != null
      ? { datePosted: new Date(job.published_at * 1000).toISOString() }
      : {}),
    ...(job.closes_at != null
      ? { validThrough: new Date(job.closes_at * 1000).toISOString() }
      : {}),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company?.name ?? company,
      ...(job.company?.logo ? { logo: job.company.logo } : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(job.city ? { addressLocality: job.city } : {}),
        ...(job.state ? { addressRegion: job.state } : {}),
        ...(job.country ? { addressCountry: job.country } : {}),
      },
    },
    ...(job.employment_type
      ? { employmentType: mapEmploymentType(job.employment_type) }
      : {}),
    ...(job.work_mode === "remote" ? { jobLocationType: "TELECOMMUTE" } : {}),
    ...(job.salary_min != null || job.salary_max != null
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency,
            value: {
              "@type": "QuantitativeValue",
              ...(job.salary_min != null ? { minValue: job.salary_min } : {}),
              ...(job.salary_max != null ? { maxValue: job.salary_max } : {}),
              unitText: job.salary_period === "MONTH" ? "MONTH" : "YEAR",
            },
          },
        }
      : {}),
    directApply: true,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: `${SITE_URL}/careers/${company}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `${SITE_URL}/careers/${company}/${slug}`,
      },
    ],
  };

  const companyDisplayName = job.company?.name ?? company;

  return (
    <>
      <JsonLd data={[jobLd, breadcrumbLd]} />

      {/* Hero / header */}
      <Section pad="standard" surface="gradient">
        <Container size="md">
          {/* Visual breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-secondary"
          >
            <Link
              href="/"
              className="hover:text-ink transition-colors"
            >
              Home
            </Link>
            <span aria-hidden="true" className="select-none">
              /
            </span>
            <Link
              href={`/careers/${company}`}
              className="hover:text-ink transition-colors"
            >
              {companyDisplayName}
            </Link>
            <span aria-hidden="true" className="select-none">
              /
            </span>
            <span className="text-ink" aria-current="page">
              {job.title}
            </span>
          </nav>

          {/* Company identity */}
          <div className="mb-6 flex items-center gap-4">
            {job.company?.logo && (
              /* Plain <img> — tenant logo host is not whitelisted in next.config.ts */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.company.logo}
                alt={`${companyDisplayName} logo`}
                className="h-12 w-12 rounded-xl border border-border object-contain bg-white p-1"
              />
            )}
            <p className="text-[15px] font-medium text-ink-secondary">
              {companyDisplayName}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {job.title}
          </h1>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {locationDisplay && (
              <span className="flex items-center gap-1.5 text-[14px] text-ink-secondary">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {locationDisplay}
              </span>
            )}
            {job.employment_type && (
              <Badge variant="brand">
                {employmentTypeLabel(job.employment_type)}
              </Badge>
            )}
            {job.work_mode && (
              <Badge variant="outline">
                {workModeLabel(job.work_mode)}
              </Badge>
            )}
            {(job.experience_min != null || job.experience_max != null) && (
              <Badge variant="default">
                {job.experience_min != null && job.experience_max != null
                  ? `${job.experience_min}–${job.experience_max} yrs exp`
                  : job.experience_min != null
                    ? `${job.experience_min}+ yrs exp`
                    : `Up to ${job.experience_max} yrs exp`}
              </Badge>
            )}
          </div>

          {/* Salary */}
          <div className="mt-4">
            {salaryDisplay ? (
              <p className="text-[15px] font-medium text-ink">
                {salaryDisplay}
              </p>
            ) : (
              <p className="text-[14px] text-ink-muted">Salary not disclosed</p>
            )}
          </div>

          {/* Skills */}
          {job.skills.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Apply CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/careers/${company}/${slug}/apply`}
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Apply Now
            </Link>
            {job.jd_file && (
              <a
                href={job.jd_file}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-[15px] font-semibold text-ink shadow-sm transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <Download className="size-4" aria-hidden />
                Download job description
              </a>
            )}
          </div>
        </Container>
      </Section>

      {/* Job description */}
      <Section pad="standard">
        <Container size="sm">
          <div
            className="prose prose-signhr max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />

          {/* Repeat Apply CTA at the bottom for convenience */}
          <div className="mt-12 border-t border-border pt-10 text-center">
            <p className="text-[15px] text-ink-secondary mb-5">
              Ready to join the team at{" "}
              <span className="font-medium text-ink">{companyDisplayName}</span>
              ?
            </p>
            <Link
              href={`/careers/${company}/${slug}/apply`}
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-10 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Apply Now
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
