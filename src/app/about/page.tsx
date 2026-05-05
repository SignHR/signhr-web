import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Compass,
  Shield,
  Mail,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built in Bengaluru by a small team that's been on the receiving end of bad HR software. SignHR is the platform we wish had existed.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: Sparkles,
    title: "Ship in plain English",
    body: "Our changelog reads like a friend telling you what's new. No 'leveraging synergies'. No 'unlocking value'. Just what shipped and why.",
  },
  {
    icon: Heart,
    title: "Respect the day-job",
    body: "Every workflow we ship has to make Monday calmer. If it adds clicks, it doesn't ship. If it adds anxiety, it gets a redesign.",
  },
  {
    icon: Compass,
    title: "Customers > investors",
    body: "We take long calls with HR leads at companies we'll never sell to. The product gets better because we listen to people who use it.",
  },
  {
    icon: Shield,
    title: "Security is table stakes",
    body: "SOC 2, encryption, audit logs, SSO — all from day one, on every plan. Not a separate SKU.",
  },
];

const TEAM = [
  { name: "Vikram Joshi", role: "Co-founder & CEO", initials: "VJ", grad: "from-violet-300 to-indigo-400" },
  { name: "Ria Banerjee", role: "Co-founder & CTO", initials: "RB", grad: "from-amber-300 to-rose-400" },
  { name: "Daniel Park", role: "Head of Engineering", initials: "DP", grad: "from-teal-300 to-emerald-400" },
  { name: "Aisha Patel", role: "Head of Product", initials: "AP", grad: "from-pink-300 to-orange-300" },
  { name: "Karthik Iyer", role: "Founding Designer", initials: "KI", grad: "from-sky-300 to-blue-400" },
  { name: "Faiza Khan", role: "Head of Customer Success", initials: "FK", grad: "from-fuchsia-300 to-purple-400" },
  { name: "Marcus Chen", role: "Head of Operations", initials: "MC", grad: "from-emerald-300 to-teal-500" },
  { name: "Priya Mehta", role: "Lead Engineer", initials: "PM", grad: "from-orange-300 to-pink-400" },
];

const INVESTORS = [
  "Sequoia Capital",
  "Accel",
  "Lightspeed",
  "Stellaris",
  "Blume Ventures",
  "First Round",
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="OUR STORY"
        title={
          <>
            We&apos;ve been on the wrong end of{" "}
            <em className="serif-italic">bad HR software</em>. So we built the
            right one.
          </>
        }
        description="SignHR started in 2023 in a co-working space in Bengaluru, after our co-founders spent two years running People Ops with seven tools that didn't talk to each other."
      />

      {/* Origin story */}
      <Section pad="standard">
        <Container size="md">
          <div className="prose prose-signhr max-w-none text-[18px] leading-[1.75] text-ink-secondary">
            <p>
              Vikram and Ria met in 2018 building HR ops at a fast-growing
              fintech in Bengaluru. By the time the company hit 200 employees,
              they had:
            </p>
            <ul>
              <li>One spreadsheet that everyone called &quot;the master list&quot; — and which agreed with payroll roughly 60% of the time.</li>
              <li>Three different tools for leave, attendance, and onboarding — none of which talked to each other.</li>
              <li>A WhatsApp group for &quot;quick&quot; HR questions that rarely closed before midnight.</li>
              <li>An audit finding that listed eighteen people who&apos;d already left as &quot;active&quot;.</li>
            </ul>
            <p>
              They quit in early 2023 to build the tool they wished had existed.
              Eighteen months later, SignHR is the all-in-one HRMS for teams of
              20 to 500 — the size where the spreadsheets break, but Workday is
              still six rounds of funding away.
            </p>
            <p>
              We&apos;re a small team of nine, mostly based in Bengaluru, with
              one engineer in Berlin. We ship every two weeks. We do open
              roadmap calls every month. We answer support emails ourselves.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              How we operate
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              Four <em className="serif-italic">values</em> that show up in
              every release.
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

      {/* Team */}
      <Section pad="standard">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                The team
              </p>
              <h2 className="text-display-sm mt-3 text-ink">
                Nine humans, one Slack channel.
              </h2>
            </div>
            <Badge variant="outline">Bengaluru · Berlin</Badge>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col items-start rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ink-muted"
              >
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white",
                    member.grad,
                  )}
                >
                  {member.initials}
                </div>
                <p className="mt-4 text-[15px] font-semibold text-ink">
                  {member.name}
                </p>
                <p className="text-[13px] text-ink-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Investors */}
      <Section pad="compact" surface="muted">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Backed by people who believe modern HR matters
          </p>
          <div className="mt-8">
            <LogoCloud names={INVESTORS} />
          </div>
        </Container>
      </Section>

      {/* Careers */}
      <Section pad="standard" id="careers">
        <Container>
          <div className="grid gap-8 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50/40 to-card p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Join us
              </p>
              <h2 className="text-display-sm mt-4 text-ink">
                We&apos;re hiring six people in 2026.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-secondary">
                Engineering, design, customer success, and a founding sales
                role. If the idea of building HR software for the next decade
                excites you, we&apos;d love to hear from you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">
                    <Briefcase className="size-4" aria-hidden />
                    See open roles
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href="mailto:hello@signhr.example.com">
                    <Mail className="size-4" aria-hidden />
                    hello@signhr.example.com
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              <PerkRow label="Hybrid by default" value="3 days/week in office" />
              <PerkRow label="Equity for everyone" value="Real options, real vesting" />
              <PerkRow label="Quarterly offsites" value="Last one was in Goa" />
              <PerkRow label="Top-percentile pay" value="Plus the unspoken bonus of working with great people" />
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Curious how we built it?{" "}
            <em className="serif-italic">Try it.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}

function PerkRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3">
      <span className="text-[14.5px] font-medium text-ink">{label}</span>
      <span className="text-right text-[13px] text-ink-muted">{value}</span>
    </div>
  );
}
