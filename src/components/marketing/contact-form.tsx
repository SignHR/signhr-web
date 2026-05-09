"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOPICS = [
  "General question",
  "Sales / pricing",
  "Existing customer support",
  "Partnership",
  "Press / media",
] as const;

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.email("Enter a valid email"),
  topic: z.enum(TOPICS),
  message: z.string().min(10, "Tell us a bit more"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { topic: "General question" },
  });

  const onSubmit = async (data: Values) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError("root", {
        message:
          "Couldn't send your message. Please try again, or email info@signhr.io.",
      });
      throw new Error("send-failed");
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-7">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="text-[20px] font-semibold tracking-tight text-ink">
          Got it. We&apos;ll be in touch.
        </h3>
        <p className="text-[14.5px] text-ink-secondary">
          Typical response: under 4 hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field label="Your name" htmlFor="contact-name" error={errors.name?.message}>
        <input
          id="contact-name"
          autoComplete="name"
          {...register("name")}
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="What's this about?" htmlFor="contact-topic">
        <select
          id="contact-topic"
          {...register("topic")}
          className={inputClass(false)}
        >
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        htmlFor="contact-message"
        error={errors.message?.message}
      >
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
          className={cn(
            inputClass(!!errors.message),
            "min-h-[140px] resize-y py-3",
          )}
        />
      </Field>

      {errors.root && (
        <p
          role="alert"
          className="rounded-[10px] border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive"
        >
          {errors.root.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Send message
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-ink"
      >
        {label}
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
