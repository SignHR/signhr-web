"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOpenPanel } from "@openpanel/nextjs";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.email({ message: "Enter a valid email" }),
});

type Values = z.infer<typeof schema>;

interface NewsletterSignupProps {
  variant?: "inline" | "stacked" | "panel";
  className?: string;
}

export function NewsletterSignup({
  variant = "inline",
  className,
}: NewsletterSignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema) });
  const { track } = useOpenPanel();

  const onSubmit = async (data: Values) => {
    // Stub — wire to /api/newsletter or Resend later.
    await new Promise((r) => setTimeout(r, 600));
    track("newsletter_signup", { email: data.email });
    reset({ email: "" });
  };

  if (isSubmitSuccessful) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success",
          className,
        )}
      >
        <Check className="size-4" aria-hidden />
        Thanks — check your inbox to confirm.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        variant === "stacked" ? "space-y-3" : "flex items-start gap-2",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@work-email.com"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          className={cn(
            "h-11 w-full rounded-[12px] border bg-card px-4 text-sm text-ink placeholder:text-ink-muted/70 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            errors.email
              ? "border-destructive focus-visible:ring-destructive"
              : "border-border hover:border-ink-muted",
          )}
        />
        {errors.email && (
          <p
            id="newsletter-email-error"
            className="mt-1.5 text-[12px] text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" size="md" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Subscribe
            <ArrowRight className="size-3.5" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
