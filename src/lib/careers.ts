const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Cache tags so the backend revalidation webhook can target careers data. */
export const CAREERS_TAG = "careers";
export const careerJobTag = (slug: string) => `careers:job:${slug}`;

/**
 * Fallback ISR window for careers fetches. On-demand revalidation (the backend
 * publish webhook → /api/revalidate) makes publishes instant; this short window
 * bounds staleness to a few minutes if that webhook is unconfigured or fails.
 */
const CAREERS_REVALIDATE_SECONDS = 300;

// ---------------------------------------------------------------------------
// Backend resource shapes (internal — matches PHP resource field names exactly)
// ---------------------------------------------------------------------------

interface PublicScreeningQuestionResource {
  id: number;
  label: string;
  type: string; // text | textarea | number | boolean | single_choice | multi_choice
  options: string[];
  is_required: boolean;
  sort_order: number;
}

interface PublicJobListResource {
  id: number;
  title: string;
  slug: string;
  department: { name: string } | null;
  location_text: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  employment_type: string | null;
  work_mode: string | null;
  experience_min: number | null;
  experience_max: number | null;
  salary_min: number | null; // null when hide_salary
  salary_max: number | null; // null when hide_salary
  salary_currency: string | null;
  salary_period: string | null; // MONTH/YEAR/etc
  skills: string[];
  company: { name: string; logo: string | null } | null;
  published_at: number | null; // Unix timestamp
  closes_at: number | null;   // Unix timestamp
}

interface PublicJobResource extends PublicJobListResource {
  description: string; // HTML
  jd_file: string | null;
  jd_file_name: string | null;
  location: { id: number; name: string } | null;
  openings: number | null;
  screening_questions: PublicScreeningQuestionResource[];
}

interface PublicApplicationStatusResource {
  candidate_first_name: string | null;
  job_title: string | null;
  current_stage: { name: string; kind: string } | null;
  status: string; // active | hired | rejected | withdrawn
  applied_at: number | null; // Unix timestamp
}

interface Envelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

// ---------------------------------------------------------------------------
// Exported TypeScript types (the shapes components consume — snake_case kept
// to match the wire format, consistent with blog.ts's approach)
// ---------------------------------------------------------------------------

/** A job listing item as returned by /careers/{workspace}/jobs */
export interface PublicJobListItem {
  id: number;
  title: string;
  slug: string;
  department: { name: string } | null;
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
  skills: string[];
  company: { name: string; logo: string | null } | null;
  published_at: number | null; // Unix timestamp — use new Date(ts * 1000) in components
  closes_at: number | null;   // Unix timestamp — use new Date(ts * 1000) in components
}

/** A single job detail as returned by /careers/{workspace}/jobs/{slug} */
export interface PublicJob extends PublicJobListItem {
  description: string; // HTML
  /** Absolute URL to the recruiter-uploaded JD file, or null. */
  jd_file: string | null;
  /** Original filename of the uploaded JD, used as the download label. */
  jd_file_name: string | null;
  location: { id: number; name: string } | null;
  openings: number | null;
  screening_questions: ScreeningQuestion[];
}

/** A screening question attached to a job application form */
export interface ScreeningQuestion {
  id: number;
  label: string;
  type: string; // text | textarea | number | boolean | single_choice | multi_choice
  options: string[];
  is_required: boolean;
  sort_order: number;
}

/** Application status as returned by /careers/{workspace}/applications/{token} */
export interface ApplicationStatus {
  candidate_first_name: string | null;
  job_title: string | null;
  current_stage: { name: string; kind: string } | null;
  status: string; // active | hired | rejected | withdrawn
  applied_at: number | null; // Unix timestamp — use new Date(ts * 1000) in components
}

// ---------------------------------------------------------------------------
// Application submission
// ---------------------------------------------------------------------------

export interface ApplicationInput {
  // Candidate fields
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  // Application fields
  resume: File;
  cover_letter?: string;
  expected_salary?: string;
  notice_period_days?: string;
  // Screening answers
  answers: Array<{ question_id: number; value: string }>;
}

export type ApplicationResult =
  | { status: "ok"; statusToken: string }
  | { status: "rate_limited" }
  | { status: "validation"; message: string }
  | { status: "error"; message: string };

export async function submitApplication(
  workspace: string,
  slug: string,
  input: ApplicationInput,
): Promise<ApplicationResult> {
  if (!API_URL) {
    return { status: "error", message: "Application submission is not configured." };
  }

  // Build multipart FormData — do NOT set Content-Type header (browser sets multipart boundary)
  const fd = new FormData();
  fd.append("candidate[first_name]", input.first_name);
  fd.append("candidate[last_name]", input.last_name);
  fd.append("candidate[email]", input.email);
  if (input.phone) fd.append("candidate[phone]", input.phone);
  fd.append("resume", input.resume);
  if (input.cover_letter) fd.append("cover_letter", input.cover_letter);
  if (input.expected_salary) fd.append("expected_salary", input.expected_salary);
  if (input.notice_period_days) fd.append("notice_period_days", input.notice_period_days);
  input.answers.forEach((a, i) => {
    fd.append(`answers[${i}][question_id]`, String(a.question_id));
    fd.append(`answers[${i}][value]`, a.value);
  });

  let res: Response;
  try {
    res = await fetch(
      `${API_URL}/careers/${encodeURIComponent(workspace)}/jobs/${encodeURIComponent(slug)}/apply`,
      {
        method: "POST",
        headers: { Accept: "application/json" }, // no Content-Type — multipart
        body: fd,
      },
    );
  } catch {
    return { status: "error", message: "Network error — please try again." };
  }

  if (res.ok) {
    const json = (await res.json()) as { data?: { application_id?: number; status_token?: string } };
    return { status: "ok", statusToken: json.data?.status_token ?? "" };
  }
  if (res.status === 429) return { status: "rate_limited" };

  const message = await res
    .json()
    .then((d: { message?: string; error?: string }) => d?.message ?? d?.error ?? null)
    .catch(() => null);

  // 400 — form-request validation failures
  // 422 — semantic rejections (job closed, knockout answer, required answer missing)
  if (res.status === 400 || res.status === 422) {
    return { status: "validation", message: message ?? "Please check your details." };
  }
  return { status: "error", message: message ?? "Something went wrong — please try again." };
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

async function getJson<T>(
  path: string,
  tags: string[],
): Promise<T | null> {
  const dev = process.env.NODE_ENV !== "production";
  if (!API_URL) {
    if (dev) console.error("[careers] NEXT_PUBLIC_API_URL is not set — careers data unavailable.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: CAREERS_REVALIDATE_SECONDS, tags },
    });
    if (!res.ok) {
      if (dev) console.error(`[careers] GET ${path} → HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as Envelope<T>;
    return (json.data ?? null) as T | null;
  } catch (err) {
    // Surfaced in dev so a failing server-side fetch (e.g. local TLS to the
    // Herd .test API) isn't silently swallowed into an empty careers page.
    if (dev) {
      const cause = (err as { cause?: { code?: string; message?: string } })?.cause;
      console.error(
        `[careers] GET ${path} failed:`,
        (err as Error)?.message,
        cause?.code ?? cause?.message ?? "",
      );
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Mapping helpers (backend resource → exported type)
// ---------------------------------------------------------------------------

function mapJobListItem(j: PublicJobListResource): PublicJobListItem {
  return {
    id: j.id,
    title: j.title,
    slug: j.slug,
    department: j.department,
    location_text: j.location_text,
    city: j.city,
    state: j.state,
    country: j.country,
    employment_type: j.employment_type,
    work_mode: j.work_mode,
    experience_min: j.experience_min,
    experience_max: j.experience_max,
    salary_min: j.salary_min,
    salary_max: j.salary_max,
    salary_currency: j.salary_currency,
    salary_period: j.salary_period,
    skills: j.skills,
    company: j.company,
    published_at: j.published_at,
    closes_at: j.closes_at,
  };
}

function mapJob(j: PublicJobResource): PublicJob {
  return {
    ...mapJobListItem(j),
    description: j.description,
    jd_file: j.jd_file,
    jd_file_name: j.jd_file_name,
    location: j.location,
    openings: j.openings,
    screening_questions: j.screening_questions.map(mapScreeningQuestion),
  };
}

function mapScreeningQuestion(q: PublicScreeningQuestionResource): ScreeningQuestion {
  return {
    id: q.id,
    label: q.label,
    type: q.type,
    options: q.options,
    is_required: q.is_required,
    sort_order: q.sort_order,
  };
}

// ---------------------------------------------------------------------------
// Exported fetch functions
// ---------------------------------------------------------------------------

/** All published jobs for a workspace, newest first. */
export async function getCompanyJobs(workspace: string): Promise<PublicJobListItem[]> {
  const data = await getJson<{ jobs: PublicJobListResource[] }>(
    `/careers/${encodeURIComponent(workspace)}/jobs`,
    [CAREERS_TAG],
  );
  return (data?.jobs ?? []).map(mapJobListItem);
}

/** A single published job by slug, or null (draft/archived/unknown → 404 upstream). */
export async function getCompanyJob(
  workspace: string,
  slug: string,
): Promise<PublicJob | null> {
  const data = await getJson<{ job: PublicJobResource }>(
    `/careers/${encodeURIComponent(workspace)}/jobs/${encodeURIComponent(slug)}`,
    [CAREERS_TAG, careerJobTag(slug)],
  );
  return data?.job ? mapJob(data.job) : null;
}

/** Application status by token, or null if not found. */
export async function getApplicationStatus(
  workspace: string,
  token: string,
): Promise<ApplicationStatus | null> {
  const data = await getJson<{ application: PublicApplicationStatusResource }>(
    `/careers/${encodeURIComponent(workspace)}/applications/${encodeURIComponent(token)}`,
    [CAREERS_TAG],
  );
  if (!data?.application) return null;
  const a = data.application;
  return {
    candidate_first_name: a.candidate_first_name,
    job_title: a.job_title,
    current_stage: a.current_stage,
    status: a.status,
    applied_at: a.applied_at,
  };
}
