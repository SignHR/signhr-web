"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Zap } from "lucide-react";
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
 * Home-only hero. Two-column dark composition: copy + CTAs left (anchored to
 * the centered page container), product mockup right (full-bleed to the
 * viewport edge on desktop), feature ticker full-bleed below. Always dark.
 * Fills the viewport on desktop. See
 * docs/superpowers/specs/2026-05-05-hero-redesign-split-dark-design.md.
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
        "relative isolate flex flex-col overflow-hidden bg-hero-dark text-white",
        // Full viewport minus the 68px sticky navbar; capped on tall monitors.
        // 4rem fallback for the lower min-h is for when the navbar height is
        // overridden in shorter viewports.
        "min-h-[640px] lg:min-h-[calc(100vh-68px)] lg:max-h-[calc(900px-68px)]",
        className,
      )}
    >
      <HeroBackground />

      {/* Main band fills remaining vertical space; content vertically centered. */}
      <div className="relative flex flex-1 items-center pt-20 pb-12 md:pt-24">
        {/*
          The grid spans the full viewport on lg+ so the right column can
          bleed to the viewport edge. Below lg the grid sits inside the
          standard Container padding via the wrapper below.
        */}
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Left column: anchored to the centered Container's left edge. */}
          <div className="lg:flex lg:justify-end">
            <Container className="lg:mx-0 lg:max-w-[640px] lg:px-0 lg:pl-6 lg:pr-8">
              <StatusPill />
              {/* The h1 gradient italic targets <em> inside the title prop.
                  The em already carries .serif-italic from the call site, so we
                  only add the gradient + transparent fill — italic comes from
                  serif-italic. */}
              <h1 className="mt-5 max-w-[13ch] text-balance font-semibold leading-[0.98] tracking-[-0.035em] text-white text-[clamp(44px,5.6vw,88px)] [&_em]:bg-[linear-gradient(135deg,hsl(var(--brand-300))_0%,hsl(var(--accent-pink)/0.85)_60%,hsl(var(--accent-pink))_100%)] [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:font-serif">
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
              <FeatureChips />
              <SocialProofRow />
            </Container>
          </div>

          {/* Right column: mockup. On mobile/tablet wrapped in normal padding;
              on lg+ bleeds to the right viewport edge (no right padding, no
              right border-radius on the wrapper). */}
          <div className="px-6 md:px-8 lg:px-0">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>

      <FeatureTicker />

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
      <div
        className="absolute -right-56 -top-56 size-[680px] rounded-full opacity-60 blur-3xl"
        style={{
          // Inline style: Tailwind v4's bg-[radial-gradient(...)] doesn't reliably
          // accept closest-side + alpha-modified CSS vars in JIT.
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

function HeroDashboardMockup() {
  return (
    // perspective enables 3D space for the lg: tilt transform on the inner wrapper
    <div className="relative" style={{ perspective: "2000px" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-5 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 60% 40%, hsl(var(--brand-500) / 0.28), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative overflow-hidden shadow-[0_50px_80px_-30px_rgba(0,0,0,0.55)] lg:rounded-r-none lg:border-r-0 lg:[transform:rotateY(-6deg)_rotateX(4deg)] lg:[transform-style:preserve-3d]">
        <Image
          src="/assets/hero.webp"
          alt="HR team reviewing people analytics on screen"
          width={1600}
          height={1067}
          priority
          quality={75}
          className="block h-auto w-full object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}
const FEATURE_CHIPS: ReadonlyArray<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "brand" | "green" | "amber";
}> = [
  { icon: Zap, label: "Onboarding in 10 min", tone: "brand" },
  { icon: CheckCircle2, label: "Approvals in one click", tone: "green" },
  { icon: Star, label: "Payroll in 1 click", tone: "amber" },
];

function FeatureChips() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {FEATURE_CHIPS.map(({ icon: Icon, label, tone }) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12.5px] font-medium text-white/85 backdrop-blur"
        >
          <span
            aria-hidden
            className={cn(
              "flex size-[18px] items-center justify-center rounded-full text-white",
              tone === "brand" &&
                "bg-gradient-to-br from-brand-500/40 to-accent-pink/40",
              tone === "green" &&
                "bg-gradient-to-br from-emerald-500/40 to-teal-500/40",
              tone === "amber" &&
                "bg-gradient-to-br from-amber-500/40 to-accent-pink/40",
            )}
          >
            <Icon className="size-2.5" />
          </span>
          {label}
        </span>
      ))}
    </div>
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
    <div className="mt-7 flex flex-wrap items-center gap-3.5">
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
        Loved by <span className="font-semibold text-white">500+</span> growing
        teams
      </p>
    </div>
  );
}

const TICKER_FEATURES: ReadonlyArray<{ icon: string; label: string }> = [
  { icon: "👥", label: "Core HRMS" },
  { icon: "🗓", label: "Leave management" },
  { icon: "⏱", label: "Time & attendance" },
  { icon: "💼", label: "Payroll" },
  { icon: "🚀", label: "Onboarding" },
  { icon: "🔄", label: "Workflows & approvals" },
  { icon: "💻", label: "Asset management" },
  { icon: "💬", label: "Email & mobile approvals" },
];

function FeatureTicker() {
  // Duplicate the items so the loop is seamless.
  const items = [...TICKER_FEATURES, ...TICKER_FEATURES];
  return (
    <>
      {/* Screen-reader-only static list */}
      <ul className="sr-only">
        {TICKER_FEATURES.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="relative overflow-hidden border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,black_80px,black_calc(100%-80px),transparent)]"
      >
        <div className="animate-hero-ticker flex w-max items-center gap-12 py-5 will-change-transform">
          {items.map(({ icon, label }, i) => (
            <React.Fragment
              key={`${label}-${i < TICKER_FEATURES.length ? "a" : "b"}`}
            >
              <span className="flex shrink-0 items-center gap-2.5 text-[13.5px] font-medium text-white/85">
                <span className="flex size-[22px] items-center justify-center rounded-md border border-white/5 bg-gradient-to-br from-brand-500/25 to-accent-pink/20 text-[12px] text-white">
                  {icon}
                </span>
                {label}
              </span>
              <span className="size-1 shrink-0 rounded-full bg-white/20" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
