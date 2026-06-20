"use client";

import * as React from "react";
import { useForm, Controller, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  submitApplication,
  type ScreeningQuestion,
  type ApplicationResult,
} from "@/lib/careers";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const baseSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().max(20).optional(),
  resume: z
    .instanceof(File)
    .refine(
      (f) => ACCEPTED_MIME.includes(f.type),
      "Please upload a PDF or Word document",
    )
    .refine((f) => f.size <= MAX_FILE_SIZE, "File must be 10MB or less"),
  cover_letter: z.string().max(2000).optional(),
  expected_salary: z
    .string()
    .regex(/^\d*$/, "Numbers only — enter the amount without currency symbols")
    .optional(),
  notice_period_days: z
    .string()
    .regex(/^\d*$/, "Numbers only")
    .optional(),
});

type BaseValues = z.infer<typeof baseSchema>;

// Dynamic screening answer fields use the key pattern `sq_{id}`.
// Use a loose intersection so zodResolver can bind to a concrete useForm type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = BaseValues & Record<string, any>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ApplyFormProps {
  /** Workspace/company slug — used for both the API call and the status tracking link. */
  company: string;
  slug: string;
  questions: ScreeningQuestion[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDynamicSchema(questions: ScreeningQuestion[]) {
  const extra: Record<string, z.ZodTypeAny> = {};
  for (const q of questions) {
    // File-type questions are not submitted — skip validation entirely.
    if (q.type === "file") continue;
    const key = `sq_${q.id}`;
    if (q.is_required) {
      extra[key] = z.string().min(1, `${q.label} is required`);
    } else {
      extra[key] = z.string().optional();
    }
  }
  return baseSchema.extend(extra);
}

function inputClass(error: boolean) {
  return cn(
    "h-11 w-full rounded-[12px] border bg-card px-4 text-[14.5px] text-ink placeholder:text-ink-muted/70 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    error
      ? "border-destructive focus-visible:ring-destructive"
      : "border-border hover:border-ink-muted focus-visible:border-brand-400",
  );
}

function textareaClass(error: boolean) {
  return cn(
    "min-h-[120px] w-full rounded-[12px] border bg-card px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-muted/70 transition-colors resize-y",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    error
      ? "border-destructive focus-visible:ring-destructive"
      : "border-border hover:border-ink-muted focus-visible:border-brand-400",
  );
}

// ---------------------------------------------------------------------------
// Field wrapper
// ---------------------------------------------------------------------------

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-[13px] font-medium text-ink"
      >
        {label}
        {optional && (
          <span className="text-[11px] font-normal text-ink-muted">Optional</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-[12px] text-destructive">{error}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screening question field renderer
// ---------------------------------------------------------------------------

function ScreeningField({
  question,
  error,
  value,
  onChange,
}: {
  question: ScreeningQuestion;
  error?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `sq_${question.id}`;

  // File uploads are not supported in this form — render a disabled notice
  // and skip the field so no bogus text value is submitted.
  if (question.type === "file") {
    return (
      <Field
        label={question.label}
        htmlFor={id}
        optional={!question.is_required}
      >
        <p className="rounded-[12px] border border-border bg-zinc-50 px-4 py-3 text-[13px] text-ink-muted">
          File uploads aren&apos;t supported in this form.
        </p>
      </Field>
    );
  }

  if (question.type === "textarea") {
    return (
      <Field
        label={question.label}
        htmlFor={id}
        error={error}
        optional={!question.is_required}
      >
        <textarea
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={textareaClass(!!error)}
        />
      </Field>
    );
  }

  if (question.type === "boolean") {
    return (
      <Field
        label={question.label}
        htmlFor={id}
        error={error}
        optional={!question.is_required}
      >
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={inputClass(!!error)}
        >
          <option value="">Select…</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </Field>
    );
  }

  if (question.type === "single_choice") {
    return (
      <Field
        label={question.label}
        htmlFor={id}
        error={error}
        optional={!question.is_required}
      >
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={inputClass(!!error)}
        >
          <option value="">Select…</option>
          {question.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  if (question.type === "multi_choice") {
    // value is a comma-separated string of checked options
    const checkedSet = new Set(value ? value.split(",").map((s) => s.trim()) : []);
    return (
      <Field
        label={question.label}
        htmlFor={id}
        error={error}
        optional={!question.is_required}
      >
        <div className="space-y-2 pt-1" id={id}>
          {question.options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 text-[14px] text-ink cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checkedSet.has(opt)}
                onChange={(e) => {
                  const next = new Set(checkedSet);
                  if (e.target.checked) {
                    next.add(opt);
                  } else {
                    next.delete(opt);
                  }
                  onChange([...next].join(", "));
                }}
                className="h-4 w-4 rounded border-border text-brand-500 focus-visible:ring-ring"
              />
              {opt}
            </label>
          ))}
        </div>
      </Field>
    );
  }

  // Default: text or number
  return (
    <Field
      label={question.label}
      htmlFor={id}
      error={error}
      optional={!question.is_required}
    >
      <input
        id={id}
        type={question.type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={inputClass(!!error)}
      />
    </Field>
  );
}

// ---------------------------------------------------------------------------
// Main form component
// ---------------------------------------------------------------------------

export function ApplyForm({ company, slug, questions }: ApplyFormProps) {
  const [result, setResult] = React.useState<ApplicationResult | null>(null);
  const [statusToken, setStatusToken] = React.useState<string>("");
  const [resumeFileName, setResumeFileName] = React.useState<string>("");

  // Sort questions by sort_order once
  const sortedQuestions = React.useMemo(
    () => [...questions].sort((a, b) => a.sort_order - b.sort_order),
    [questions],
  );

  const schema = React.useMemo(
    () => buildDynamicSchema(sortedQuestions),
    [sortedQuestions],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // zodResolver infers the schema's output type as Record<string,unknown> when built
    // dynamically via .extend(). Double-cast through unknown to satisfy useForm's generic.
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {},
  });

  const onSubmit = async (data: FormValues) => {
    // Build screening answers from sq_* fields (file questions are not submitted)
    const answers = sortedQuestions
      .filter((q) => q.type !== "file")
      .map((q) => {
        const raw = data[`sq_${q.id}`];
        return {
          question_id: q.id,
          value: typeof raw === "string" ? raw : "",
        };
      })
      .filter((a) => a.value !== "");

    const res = await submitApplication(company, slug, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || undefined,
      resume: data.resume as File,
      cover_letter: data.cover_letter || undefined,
      expected_salary: data.expected_salary || undefined,
      notice_period_days: data.notice_period_days || undefined,
      answers,
    });

    setResult(res);
    if (res.status === "ok") {
      setStatusToken(res.statusToken);
    }
  };

  // ---------------------------------------------------------------------------
  // Success state
  // ---------------------------------------------------------------------------

  if (result?.status === "ok") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-7">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="text-[20px] font-semibold tracking-tight text-ink">
          Application submitted!
        </h3>
        <p className="text-[15px] text-ink-secondary">
          Your application has been received. We&apos;ll review it and be in touch soon.
        </p>
        {statusToken && (
          <p className="mt-1 text-[14px] text-ink-secondary">
            Track your application status:{" "}
            <Link
              href={`/careers/${company}/applications/${statusToken}`}
              className="font-semibold text-brand-600 hover:underline"
            >
              View status
            </Link>
          </p>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FormValues>)} noValidate className="space-y-6">
      {/* Candidate details */}
      <fieldset className="space-y-5">
        <legend className="text-[15px] font-semibold text-ink mb-4">
          Personal Information
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="First name"
            htmlFor="apply-first-name"
            error={errors.first_name?.message as string | undefined}
          >
            <input
              id="apply-first-name"
              autoComplete="given-name"
              {...register("first_name")}
              aria-invalid={!!errors.first_name}
              className={inputClass(!!errors.first_name)}
            />
          </Field>

          <Field
            label="Last name"
            htmlFor="apply-last-name"
            error={errors.last_name?.message as string | undefined}
          >
            <input
              id="apply-last-name"
              autoComplete="family-name"
              {...register("last_name")}
              aria-invalid={!!errors.last_name}
              className={inputClass(!!errors.last_name)}
            />
          </Field>
        </div>

        <Field
          label="Email"
          htmlFor="apply-email"
          error={errors.email?.message as string | undefined}
        >
          <input
            id="apply-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Phone"
          htmlFor="apply-phone"
          error={errors.phone?.message as string | undefined}
          optional
        >
          <input
            id="apply-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputClass(false)}
            placeholder="+91 …"
          />
        </Field>
      </fieldset>

      {/* Application details */}
      <fieldset className="space-y-5">
        <legend className="text-[15px] font-semibold text-ink mb-4">
          Application Details
        </legend>

        {/* Resume upload */}
        <Field
          label="Resume / CV"
          htmlFor="apply-resume"
          error={errors.resume?.message as string | undefined}
        >
          <div
            className={cn(
              "relative flex items-center gap-3 rounded-[12px] border px-4 py-3 transition-colors",
              errors.resume
                ? "border-destructive"
                : "border-border hover:border-ink-muted",
            )}
          >
            <input
              id="apply-resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("resume", file, { shouldValidate: true });
                  setResumeFileName(file.name);
                }
              }}
            />
            <label
              htmlFor="apply-resume"
              className="cursor-pointer text-[13px] font-medium text-brand-600 hover:text-brand-700"
            >
              Choose file
            </label>
            <span className="text-[13px] text-ink-muted truncate">
              {resumeFileName || "No file chosen — PDF or Word, max 10 MB"}
            </span>
          </div>
        </Field>

        <Field
          label="Cover letter"
          htmlFor="apply-cover-letter"
          error={errors.cover_letter?.message as string | undefined}
          optional
        >
          <textarea
            id="apply-cover-letter"
            {...register("cover_letter")}
            aria-invalid={!!errors.cover_letter}
            className={textareaClass(!!errors.cover_letter)}
            placeholder="Tell us why you're a great fit…"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Expected salary"
            htmlFor="apply-expected-salary"
            error={errors.expected_salary?.message as string | undefined}
            optional
          >
            <input
              id="apply-expected-salary"
              type="number"
              min="0"
              {...register("expected_salary")}
              className={inputClass(!!errors.expected_salary)}
              placeholder="e.g. 1200000"
            />
          </Field>

          <Field
            label="Notice period (days)"
            htmlFor="apply-notice-period"
            error={errors.notice_period_days?.message as string | undefined}
            optional
          >
            <input
              id="apply-notice-period"
              type="number"
              min="0"
              {...register("notice_period_days")}
              className={inputClass(false)}
              placeholder="e.g. 30"
            />
          </Field>
        </div>
      </fieldset>

      {/* Screening questions */}
      {sortedQuestions.length > 0 && (
        <fieldset className="space-y-5">
          <legend className="text-[15px] font-semibold text-ink mb-4">
            Screening Questions
          </legend>

          {sortedQuestions.map((q) => (
            <Controller
              key={q.id}
              name={`sq_${q.id}` as keyof FormValues}
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <ScreeningField
                  question={q}
                  error={fieldState.error?.message}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                />
              )}
            />
          ))}
        </fieldset>
      )}

      {/* Inline error banner — shown for rate_limited/validation/error statuses */}
      {result && (result.status === "rate_limited" || result.status === "validation" || result.status === "error") && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {result.status === "rate_limited"
            ? "Too many applications submitted recently — please try again later."
            : result.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Submit application
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
