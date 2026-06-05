import type { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  ScrollText,
  KeyRound,
  DatabaseBackup,
  Sparkles,
  Heart,
  Users,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { StatNumber } from "@/components/marketing/stat-number";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { Badge } from "@/components/ui/badge";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
} from "@/components/icons/social";
import { LOGO_NAMES, TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "SignHR is the all-in-one HR platform for growing teams — built by SignatureTech after years of watching companies fight disconnected HR tools.",
  alternates: { canonical: "/about" },
};

const LEADERS = [
  {
    name: "Sonu Kumar Sony",
    role: "Founder & CEO",
    initials: "SS",
    grad: "from-violet-300 to-indigo-400",
    socials: {
      linkedin: "https://www.linkedin.com/in/sonu-kumar-soni-9947a4149/",
      instagram: "https://www.instagram.com/sonu_sony/",
      github: "https://github.com/sonusony19",
    },
  },
  {
    name: "Prem Chand Saini",
    role: "CTO · Head of Engineering",
    initials: "PS",
    grad: "from-amber-300 to-rose-400",
    socials: {
      linkedin: "https://www.linkedin.com/in/pcsaini/",
      instagram: "https://www.instagram.com/pcsaini779/",
      github: "https://github.com/pcsaini",
    },
  },
  {
    name: "Vidhupriya Agarwal",
    role: "Head of Marketing",
    initials: "VA",
    grad: "from-teal-300 to-emerald-400",
    socials: {
      linkedin: "https://www.linkedin.com/in/vidhupriya-agrawal/",
      instagram: "https://www.instagram.com/vidhu_2909/",
      github: "https://github.com/Vidhupriya2909",
    },
  },
];

const ABOUT_STATS = [
  { value: 1, suffix: "", label: "day to set up, not a quarter" },
  { value: 5, suffix: "+", label: "tools replaced by one platform" },
  { value: 3, suffix: "", label: "months free — no card" },
  { value: 2, suffix: "", label: "weeks between releases" },
];

const TRUST: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Lock,
    title: "Encrypted end to end",
    body: "In transit and at rest.",
  },
  {
    icon: ScrollText,
    title: "Full audit logs",
    body: "Every action — who did it, and when.",
  },
  {
    icon: KeyRound,
    title: "Role-based access & SSO",
    body: "People see only what they should.",
  },
  {
    icon: DatabaseBackup,
    title: "Daily encrypted backups",
    body: "Your data is never one mistake from gone.",
  },
];

const VALUES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Sparkles,
    title: "Ship in plain English",
    body: 'Our changelog reads like a friend telling you what\'s new. No “leveraging synergies.” Just what shipped, and why.',
  },
  {
    icon: Heart,
    title: "Respect the day-job",
    body: "Every workflow has to make Monday calmer. If it adds clicks, it doesn't ship. If it adds anxiety, it gets redesigned.",
  },
  {
    icon: Users,
    title: "Customers over investors",
    body: "We take long calls with HR leads at companies we'll never sell to. The product gets better because we listen to the people who use it.",
  },
  {
    icon: Laptop,
    title: "We run on it too",
    body: "SignatureTech runs its own HR on SignHR. We feel every rough edge before you do.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1 · Hero */}
      <Hero
        eyebrow={{ label: "Our Story" }}
        title={
          <>
            Growing the team is the fun part. Running HR for it shouldn&apos;t
            be{" "}
            <em>the hard part.</em>
          </>
        }
        description="SignHR is the all-in-one HR platform for Indian teams of 20 to 500 — onboarding, attendance, leave and payroll-ready, in one calm place. We built it at SignatureTech after watching client after client fight a pile of disconnected tools."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "See the platform", href: "/features" }}
      />

      {/* 2 · Origin */}
      <Section pad="standard">
        <Container size="md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Where we came from
          </p>
          <h2 className="text-display-sm mt-3 text-ink">
            We didn&apos;t set out to build an HR product.
          </h2>
          <div className="prose prose-signhr mt-6 max-w-none text-[18px] leading-[1.75] text-ink-secondary">
            <p>
              For years, SignatureTech built software for growing companies — and
              almost every one had the same mess behind the scenes. A
              &quot;master&quot; spreadsheet that disagreed with payroll. Leave
              requests buried in email threads. Three different tools for
              onboarding, attendance, and time off that never spoke to each
              other. One audit that listed people who&apos;d left months ago as
              still active.
            </p>
            <p>
              We kept getting pulled in to patch it — a leave tracker here, an
              onboarding flow there, a script to reconcile headcount before the
              auditors showed up. After the fifth or sixth time rebuilding the
              same fixes, the pattern was impossible to ignore: teams between 20
              and 500 had outgrown spreadsheets but couldn&apos;t justify a
              six-figure enterprise suite. Nothing in the middle actually fit.
            </p>
            <p>
              So we stopped patching and started building. SignHR is the platform
              we kept wishing our clients already had — one place for the whole
              employee journey, from offer letter to final settlement, that an HR
              team of one or two can actually run.
            </p>
            <p>
              We still answer our own support emails. We still ship every couple
              of weeks. And we still measure every release by one question:{" "}
              <em>did Monday get calmer?</em>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-300 to-indigo-400 text-sm font-semibold text-white">
              SS
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">
                Sonu Kumar Sony
              </p>
              <p className="text-[13px] text-ink-muted">Founder &amp; CEO</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 · Mission — always-dark band (bg-hero-dark stays dark in BOTH themes;
          surface="ink" would invert to light in dark mode and break white text) */}
      <Section
        pad="standard"
        className="border-y border-white/10 bg-hero-dark text-white"
      >
        <Container size="md">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">
              Our mission
            </p>
            <h2 className="text-display-md mx-auto mt-5 max-w-[24ch] text-balance text-white [&_em]:font-serif [&_em]:italic [&_em]:text-accent-pink">
              Make running HR feel <em>calm</em> — for every growing team, not
              just the ones who can afford an enterprise suite.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
              Spreadsheets break around 20 people. The big enterprise suites
              don&apos;t make sense until you&apos;re thousands. We exist for
              everyone in between — teams doing real HR with two people and no
              time to waste.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4 · Leadership (also hosts the #careers anchor for the footer link) */}
      <Section pad="standard" id="careers">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                The people behind it
              </p>
              <h2 className="text-display-sm mt-3 text-ink">
                A small team that answers its own email.
              </h2>
            </div>
            <Badge variant="outline">SignatureTech</Badge>
          </div>

          {/* Big team image — external stock photo (swap the src for a real
              team/office photo when you have one) */}
          <div className="mt-10 overflow-hidden rounded-3xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- external stock photo; next/image would need a next.config remote domain + a dev-server restart */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="The SignHR team collaborating"
              loading="lazy"
              className="aspect-[16/7] w-full object-cover"
            />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERS.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-start rounded-2xl border border-border bg-card p-6"
              >
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white",
                    m.grad,
                  )}
                >
                  {m.initials}
                </div>
                <p className="mt-4 text-[15px] font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-[13px] text-ink-muted">{m.role}</p>
                <div className="mt-4 flex items-center gap-2">
                  <SocialLink
                    href={m.socials.linkedin}
                    label={`${m.name} on LinkedIn`}
                  >
                    <LinkedinIcon className="size-4" />
                  </SocialLink>
                  <SocialLink
                    href={m.socials.instagram}
                    label={`${m.name} on Instagram`}
                  >
                    <InstagramIcon className="size-4" />
                  </SocialLink>
                  <SocialLink
                    href={m.socials.github}
                    label={`${m.name} on GitHub`}
                  >
                    <GithubIcon className="size-4" />
                  </SocialLink>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[14px] text-ink-muted">
            We&apos;re a small team, and we&apos;re hiring —{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-600 underline-offset-4 hover:underline"
            >
              get in touch
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* 5 · Stats */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <StatNumber
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={0}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 6 · Proof */}
      <Section pad="compact">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            In good company
          </p>
          <div className="mt-8">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <TestimonialCard size="lg" testimonial={TESTIMONIALS[0]} />
          </div>
        </Container>
      </Section>

      {/* 7 · Trust & security */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Security
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Security isn&apos;t a separate SKU.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              You&apos;re trusting us with your team&apos;s most sensitive data.
              We treat it the way we&apos;d want ours treated — and none of it
              costs extra.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <t.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8 · Values */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              How we operate
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Four <em className="serif-italic">values</em> that show up in every
              release.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-5 rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex size-8 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:border-brand-500/40 hover:bg-brand-50 hover:text-brand-600"
    >
      {children}
    </a>
  );
}
