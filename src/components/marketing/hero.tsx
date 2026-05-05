import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GradientHalo } from "@/components/marketing/gradient-halo";
import { FloatingMockup } from "@/components/marketing/floating-mockup";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
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
 * Hero — three variants:
 *   - home: centered headline + sub + CTAs over a wide dashboard mockup below
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
  const isHome = variant === "home";

  return (
    <section
      className={cn(
        "relative overflow-x-clip pb-20 pt-12 md:pb-28 md:pt-20",
        className,
      )}
    >
      {/* Halos */}
      <GradientHalo
        variant="hero"
        size="xl"
        className="left-1/2 top-[-10%] -translate-x-1/2"
      />
      <GradientHalo
        variant="amber"
        size="md"
        className="right-[-8%] top-[20%] hidden md:block"
      />
      <GradientHalo
        variant="soft"
        size="md"
        className="left-[-8%] top-[35%] hidden md:block"
      />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {eyebrow && <Eyebrow value={eyebrow} />}

          <h1
            className={cn(
              "mt-6 text-balance text-ink",
              isHome
                ? "text-display-xl"
                : variant === "feature"
                  ? "text-display-lg"
                  : "text-display-md",
            )}
          >
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-[1.65] text-ink-secondary md:text-[19px]">
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
                <Button asChild size="lg" variant="secondary">
                  <Link href={secondaryCta.href}>
                    {secondaryCta.label}
                    {!isHome && <ArrowRight className="size-4" aria-hidden />}
                  </Link>
                </Button>
              )}
            </div>
          )}

          {trust && (
            <p className="mx-auto mt-5 text-sm text-ink-muted">{trust}</p>
          )}
        </div>

        {/* Visual band — wide, centered, below the headline */}
        {isHome && (
          <div
            className="relative mx-auto mt-16 md:mt-20"
            style={{ perspective: "2000px" }}
          >
            {/* Soft glow under the mockup */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-12 -bottom-12 -z-10 h-40 rounded-[60%] bg-gradient-to-t from-brand-300/30 via-brand-200/20 to-transparent blur-2xl"
            />
            <FloatingMockup amplitude={10} duration={7} className="block w-full">
              <div
                className="mx-auto w-full max-w-[1080px]"
                style={{
                  transform: "rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <DashboardMockup className="w-full" />
              </div>
            </FloatingMockup>
            {/* Bottom fade so the mockup blends into the next section */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-2 h-24 bg-gradient-to-b from-transparent to-background"
            />
          </div>
        )}

        {visual && !isHome && (
          <div className="relative mx-auto mt-16 w-full max-w-3xl">
            {visual}
          </div>
        )}
      </Container>
    </section>
  );
}

function Eyebrow({ value }: { value: HeroProps["eyebrow"] }) {
  if (typeof value === "string") {
    return (
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        {value}
      </p>
    );
  }
  if (!value) return null;
  const inner = (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-secondary shadow-sm backdrop-blur transition-colors hover:border-brand-300 hover:text-ink">
      <span className="text-brand-600">
        {value.icon ?? <Sparkles className="size-3.5" aria-hidden />}
      </span>
      {value.label}
      {value.href && (
        <ArrowRight className="size-3.5 text-ink-muted" aria-hidden />
      )}
    </span>
  );
  return (
    <div className="flex justify-center">
      {value.href ? <Link href={value.href}>{inner}</Link> : inner}
    </div>
  );
}
