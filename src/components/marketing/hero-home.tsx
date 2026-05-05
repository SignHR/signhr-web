"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface HeroHomeProps {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

/**
 * Home-only hero. Two-column dark composition: copy + CTAs left, product
 * mockup right, feature ticker full-bleed below. Always dark, regardless of
 * theme. See docs/superpowers/specs/2026-05-05-hero-redesign-split-dark-design.md.
 */
export function HeroHome({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroHomeProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-hero-dark text-white",
        className,
      )}
    >
      <HeroBackground />
      <Container>
        <div className="relative grid items-center gap-12 py-20 md:gap-12 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <StatusPill />
            <h1 className="mt-5 max-w-[13ch] text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-white text-[clamp(44px,5.6vw,88px)] [&_em]:bg-[linear-gradient(135deg,hsl(var(--brand-300))_0%,hsl(var(--accent-pink)/0.85)_60%,hsl(var(--accent-pink))_100%)] [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:font-serif [&_em]:not-italic [&_em]:italic">
              {title}
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryCta && (
                  <Button asChild size="lg">
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-white/[0.02]" />
        </div>
      </Container>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -right-56 -top-56 size-[680px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand-500) / 0.42), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-56 bottom-32 size-[560px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--accent-pink) / 0.22), transparent 70%)",
        }}
      />
    </div>
  );
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 backdrop-blur">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span>Live · 248 workspaces active</span>
    </span>
  );
}
