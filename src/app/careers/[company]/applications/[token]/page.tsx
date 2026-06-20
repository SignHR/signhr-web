import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { getApplicationStatus } from "@/lib/careers";
import type { ApplicationStatus } from "@/lib/careers";

// No ISR — token-based page, not crawled.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ company: string; token: string }> };

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Application Status",
    robots: { index: false, follow: false },
  };
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

interface StatusDisplay {
  label: string;
  /** Tailwind class set for the badge background + text */
  badgeClass: string;
}

/**
 * Derives the visible badge from the application's `status` (terminal states)
 * and `current_stage.kind` (pipeline progression). The `status` field only
 * carries `active | hired | rejected | withdrawn`; stage-level granularity
 * comes from `current_stage.kind`.
 */
function getStatusDisplay(
  status: string,
  stageKind: string | null | undefined,
): StatusDisplay {
  // Terminal states take priority — these are final outcomes.
  if (status === "hired") {
    return {
      label: "Hired",
      badgeClass:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    };
  }
  if (status === "rejected") {
    return {
      label: "Not selected",
      badgeClass:
        "bg-zinc-100 text-zinc-500 ring-1 ring-inset ring-zinc-200",
    };
  }
  if (status === "withdrawn") {
    return {
      label: "Withdrawn",
      badgeClass:
        "bg-zinc-100 text-zinc-500 ring-1 ring-inset ring-zinc-200",
    };
  }

  // Active application — map pipeline stage kind to a user-friendly label.
  switch (stageKind) {
    case "sourced":
    case "applied":
      return {
        label: "Applied",
        badgeClass:
          "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-200",
      };
    case "screening":
      return {
        label: "In review",
        badgeClass:
          "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
      };
    case "assessment":
      return {
        label: "Assessment",
        badgeClass:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
      };
    case "interview":
      return {
        label: "Interview",
        badgeClass:
          "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200",
      };
    case "offer":
      return {
        label: "Offer",
        badgeClass:
          "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
      };
    default:
      // Unknown stage kind — fall back to a safe neutral label.
      return {
        label: "In review",
        badgeClass:
          "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
      };
  }
}

function formatAppliedAt(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ApplicationStatusPage({ params }: Props) {
  const { company, token } = await params;
  const application: ApplicationStatus | null = await getApplicationStatus(
    company,
    token,
  );
  if (!application) notFound();

  const greeting = application.candidate_first_name
    ? `Hi ${application.candidate_first_name}!`
    : "Your application";

  const statusDisplay = getStatusDisplay(
    application.status,
    application.current_stage?.kind,
  );

  return (
    <Section pad="standard" surface="gradient">
      <Container size="sm">
        <div className="mx-auto max-w-lg">
          {/* Card */}
          <div className="rounded-3xl border border-border bg-card px-8 py-10 shadow-sm">
            {/* Greeting */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Application Status
            </p>
            <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-ink">
              {greeting}
              {application.job_title && (
                <span className="block text-[17px] font-normal text-ink-secondary mt-1">
                  for{" "}
                  <span className="font-medium text-ink">
                    {application.job_title}
                  </span>
                </span>
              )}
            </h1>

            {/* Status badge */}
            <div className="mt-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-muted mb-2">
                Current Status
              </p>
              <span
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${statusDisplay.badgeClass}`}
              >
                {statusDisplay.label}
              </span>
            </div>

            {/* Current stage */}
            {application.current_stage && (
              <div className="mt-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-muted mb-1">
                  Stage
                </p>
                <p className="text-[15px] font-medium text-ink">
                  {application.current_stage.name}
                </p>
              </div>
            )}

            {/* Applied date */}
            {application.applied_at != null && (
              <div className="mt-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-muted mb-1">
                  Applied On
                </p>
                <p className="text-[15px] text-ink-secondary">
                  {formatAppliedAt(application.applied_at)}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-[13px] text-ink-muted mb-4">
                Want to explore more opportunities?
              </p>
              <Link
                href={`/careers/${company}`}
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                View all open roles
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
