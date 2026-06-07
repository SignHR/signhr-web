import Link from "next/link";
import { ArrowRight, Home, Sparkles, BookOpen, Wallet } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { GradientHalo } from "@/components/marketing/gradient-halo";

const QUICK_LINKS = [
  { href: "/", label: "Home", icon: Home, description: "The product, in one page." },
  { href: "/features", label: "Features", icon: Sparkles, description: "All ten modules." },
  { href: "/pricing", label: "Pricing", icon: Wallet, description: "Per-employee, simple." },
  { href: "/blog", label: "Blog", icon: BookOpen, description: "Field notes from the team." },
];

export default function NotFound() {
  return (
    <Section pad="standard" className="relative">
      <GradientHalo
        variant="hero"
        size="xl"
        className="left-1/2 top-0 -translate-x-1/2"
      />
      <Container size="md" className="text-center">
        <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          Error 404
        </p>
        <h1 className="text-display-lg mt-5 text-ink">
          We can&apos;t find that page.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-secondary">
          It might have moved, or you might have typed a URL that never
          existed. Either way, here are some popular places to land.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              Take me home
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Tell us what was broken</Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <l.icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">{l.label}</p>
                <p className="text-[12px] text-ink-muted">{l.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
