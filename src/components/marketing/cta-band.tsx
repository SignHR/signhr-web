import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GradientHalo } from "@/components/marketing/gradient-halo";
import { cn } from "@/lib/utils";

interface CTABandProps {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "gradient" | "ink";
  className?: string;
}

export function CTABand({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  variant = "gradient",
  className,
}: CTABandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        variant === "ink" && "bg-ink text-white",
        className,
      )}
    >
      {variant === "gradient" && (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/15 via-background to-brand-500/10" />
          <GradientHalo
            variant="hero"
            size="xl"
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </>
      )}
      {variant === "ink" && (
        <GradientHalo
          variant="spotlight"
          size="xl"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
      )}
      <Container size="md">
        <div className="text-center">
          {eyebrow && (
            <p
              className={cn(
                "text-[12px] font-semibold uppercase tracking-[0.18em]",
                variant === "ink" ? "text-white/60" : "text-brand-700",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={cn(
              "text-display-md mx-auto mt-4 max-w-[20ch]",
              variant === "ink" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
          {body && (
            <p
              className={cn(
                "mx-auto mt-5 max-w-xl text-[17px] leading-relaxed",
                variant === "ink" ? "text-white/70" : "text-ink-secondary",
              )}
            >
              {body}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant={variant === "ink" ? "brand" : "primary"}
            >
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant={variant === "ink" ? "ghost" : "secondary"}
                className={
                  variant === "ink" ? "text-white hover:bg-white/10" : ""
                }
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
