import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { HeroHome } from "@/components/marketing/hero-home";
import { cn } from "@/lib/utils";

interface HeroProps {
  variant?: "home" | "feature" | "generic";
  eyebrow?: { label: string; href?: string; icon?: React.ReactNode } | string;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trust?: string;
  visual?: React.ReactNode;
  className?: string;
}

/**
 * Hero — three variants, all on the dark hero canvas:
 *   - home: delegates to <HeroHome /> (split layout with product mockup, full-viewport)
 *   - feature: centered headline + sub + CTAs (deep-dive pages add their own visual)
 *   - generic: same as feature, slightly smaller display size
 */
export function Hero({
  variant = "generic",
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  trust,
  visual,
  className,
}: HeroProps) {
  if (variant === "home") {
    return (
      <HeroHome
        title={title}
        description={description}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        className={className}
      />
    );
  }

  return (
    <section
      data-section="Hero"
      className={cn(
        "relative isolate overflow-hidden bg-hero-dark text-white pb-20 pt-12 md:pb-28 md:pt-20",
        className,
      )}
    >
      <DarkHeroBackground />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {eyebrow && <Eyebrow value={eyebrow} />}

          <h1
            className={cn(
              "mt-6 text-balance text-white [&_em]:bg-[linear-gradient(135deg,hsl(var(--brand-300))_0%,hsl(var(--accent-pink)/0.85)_60%,hsl(var(--accent-pink))_100%)] [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:font-serif",
              variant === "feature" ? "text-display-lg" : "text-display-md",
            )}
          >
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-[1.65] text-white/70 md:text-[19px]">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
                  <Link href={secondaryCta.href}>
                    {secondaryCta.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              )}
            </div>
          )}

          {trust && (
            <p className="mx-auto mt-5 text-sm text-white/50">{trust}</p>
          )}
        </div>

        {visual && (
          <div className="relative mx-auto mt-16 w-full max-w-3xl">
            {visual}
          </div>
        )}
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}

function DarkHeroBackground() {
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
        className="absolute -left-56 bottom-0 size-[560px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--accent-pink) / 0.22), transparent 70%)",
        }}
      />
    </div>
  );
}

function Eyebrow({ value }: { value: HeroProps["eyebrow"] }) {
  if (typeof value === "string") {
    return (
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">
        {value}
      </p>
    );
  }
  if (!value) return null;
  const inner = (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur transition-colors hover:border-white/20 hover:text-white">
      <span className="text-brand-300">
        {value.icon ?? <Sparkles className="size-3.5" aria-hidden />}
      </span>
      {value.label}
      {value.href && (
        <ArrowRight className="size-3.5 text-white/50" aria-hidden />
      )}
    </span>
  );
  return (
    <div className="flex justify-center">
      {value.href ? <Link href={value.href}>{inner}</Link> : inner}
    </div>
  );
}
