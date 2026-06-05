"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOpenPanel } from "@openpanel/nextjs";
import { DEMO_SIZES, setDemoCooldown, submitLead, type LeadResult } from "@/lib/leads";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.email("Enter a valid work email"),
  company: z.string().min(2, "What's your company?"),
  size: z.enum(DEMO_SIZES),
  phone: z.string().max(20).optional(),
});

type Values = z.infer<typeof schema>;

const SIZES: { value: Values["size"]; label: string }[] = [
  { value: "1-25", label: "1–25 people" },
  { value: "26-100", label: "26–100 people" },
  { value: "101-500", label: "101–500 people" },
  { value: "500+", label: "500+ people" },
];

interface DemoFormProps {
  plan?: string;
}

export function DemoForm({ plan }: DemoFormProps) {
  const [result, setResult] = React.useState<LeadResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { size: "26-100" },
  });
  const { track } = useOpenPanel();

  const onSubmit = async (data: Values) => {
    const res = await submitLead({ ...data, plan });
    setResult(res);
    if (res.status === "ok") {
      setDemoCooldown();
      track("demo_lead", {
        email: data.email,
        company: data.company,
        size: data.size,
        plan: plan ?? null,
      });
    }
  };

  if (result?.status === "ok") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-7">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="text-[20px] font-semibold tracking-tight text-ink">
          Thanks — we&apos;ve got your request.
        </h3>
        <p className="text-[15px] text-ink-secondary">
          We&apos;ve saved your details and the team has been notified.
        </p>
        <p className="mt-1 flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-[14px] font-semibold text-brand-700">
          <Clock className="size-4" aria-hidden />
          Our team will contact you within 3 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field label="Your name" error={errors.name?.message} htmlFor="demo-name">
        <input
          id="demo-name"
          autoComplete="name"
          {...register("name")}
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Work email" error={errors.email?.message} htmlFor="demo-email">
        <input
          id="demo-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          className={inputClass(!!errors.email)}
          placeholder="you@company.com"
        />
      </Field>

      <Field label="Company" error={errors.company?.message} htmlFor="demo-company">
        <input
          id="demo-company"
          autoComplete="organization"
          {...register("company")}
          aria-invalid={!!errors.company}
          className={inputClass(!!errors.company)}
        />
      </Field>

      <Field label="Team size" htmlFor="demo-size">
        <select id="demo-size" {...register("size")} className={inputClass(false)}>
          {SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Phone" htmlFor="demo-phone" optional>
        <input
          id="demo-phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          className={inputClass(false)}
          placeholder="+91 …"
        />
      </Field>

      {result && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive"
        >
          {result.status === "rate_limited"
            ? "You've already requested a demo recently — we'll be in touch."
            : result.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Request a demo
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>
      <p className="text-center text-[12px] text-ink-muted">
        Our team will contact you within 3 hours. No marketing spam, ever.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  optional,
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
      {error && <p className="mt-1.5 text-[12px] text-destructive">{error}</p>}
    </div>
  );
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
