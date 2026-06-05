"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { DemoCta } from "@/components/marketing/demo-cta";
import Image from "next/image";
import { FloatingMockup } from "@/components/marketing/floating-mockup";
import { cn } from "@/lib/utils";

interface HeroHomeProps {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

/**
 * Home-only hero. Centered, stacked, always-dark, product-forward: centered copy
 * + CTAs + trust logos, with the dashboard.webp product shot in a browser frame below.
 * See docs/superpowers/specs/2026-06-05-hero-centered-dark-redesign-design.md.
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
      data-section="Hero"
      className={cn(
        "relative isolate overflow-hidden bg-hero-dark pt-20 pb-16 text-white md:pt-28 md:pb-24",
        className,
      )}
    >
      <HeroBackground />

      {/* Centered copy */}
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <StatusPill />
          </div>
          <h1 className="mt-6 text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-white text-[clamp(40px,5.4vw,72px)] [&_em]:bg-[linear-gradient(135deg,hsl(var(--brand-300))_0%,hsl(var(--accent-pink)/0.85)_60%,hsl(var(--accent-pink))_100%)] [&_em]:bg-clip-text [&_em]:font-serif [&_em]:text-transparent">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-pretty text-[17px] leading-[1.6] text-white/70 md:text-[18px]">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {primaryCta && (
                <DemoCta size="lg">
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </DemoCta>
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
          <SocialProofRow />
        </div>
      </Container>

      {/* Product mockup — dark, in its browser frame, below the copy */}
      <Container className="relative mt-14 md:mt-16">
        <div className="relative mx-auto max-w-[1120px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-10 -z-10 h-44"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, hsl(var(--brand-500) / 0.45), transparent 70%)",
              filter: "blur(44px)",
            }}
          />
          <FloatingMockup amplitude={6} duration={7} className="block w-full">
            <div className="overflow-hidden rounded-2xl shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src="/assets/dashboard.webp"
                alt="The SignHR dashboard — headcount, team activity, today's shift timer, leave balance and pending approvals in one view"
                width={2926}
                height={1647}
                priority
                sizes="(min-width: 768px) 1120px, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </FloatingMockup>
        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* faint grid, masked to the top-center */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(circle at 50% 0%, #000, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, #000, transparent 62%)",
        }}
      />
      <div
        className="absolute -top-40 left-1/2 size-[680px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand-500) / 0.42), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-40 bottom-0 size-[480px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--accent-pink) / 0.2), transparent 70%)",
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
      <span>Live · trusted by 50+ teams</span>
    </span>
  );
}

const SOCIAL_PROOF_AVATARS: ReadonlyArray<{
  initial: string;
  gradient: string;
}> = [
  { initial: "P", gradient: "from-amber-500 to-pink-500" },
  { initial: "K", gradient: "from-cyan-500 to-indigo-500" },
  { initial: "A", gradient: "from-lime-500 to-teal-500" },
  { initial: "R", gradient: "from-brand-500 to-fuchsia-500" },
];

function SocialProofRow() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
      <div aria-hidden className="flex">
        {SOCIAL_PROOF_AVATARS.map(({ initial, gradient }, i) => (
          <span
            key={initial}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border-2 border-hero-dark text-[11px] font-bold text-white bg-gradient-to-br",
              gradient,
              i > 0 && "-ml-2",
            )}
          >
            {initial}
          </span>
        ))}
        <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-hero-dark bg-white/10 text-[10px] font-medium text-white/85">
          +5
        </span>
      </div>
      <p className="text-[13px] leading-snug text-white/70">
        <span aria-hidden className="mr-1.5 tracking-[1px] text-amber-300">
          ★★★★★
        </span>
        <span className="font-semibold text-white">4.8/5</span> across 200+
        reviews
        <span className="mx-1.5 opacity-50">·</span>
        Loved by <span className="font-semibold text-white">50+</span> growing
        teams
      </p>
    </div>
  );
}
