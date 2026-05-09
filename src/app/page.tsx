import Link from "next/link";
import Image from "next/image";
import {
  Users,
  CalendarDays,
  Wallet,
  GitBranch,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Mail,
  FileSpreadsheet,
  MessagesSquare,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import { Hero } from "@/components/marketing/hero";
import { Spotlight } from "@/components/marketing/spotlight";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CTABand } from "@/components/marketing/cta-band";
import { WorkflowDemo } from "@/components/marketing/workflow-demo";
import { PricingCard } from "@/components/marketing/pricing-card";
import { PRICING_TIERS } from "@/lib/pricing";

const PILLARS = [
  {
    icon: Users,
    title: "Core HRMS",
    body: "One source of truth — profiles, contracts, org chart, audit trail.",
    href: "/features/core-hrms",
  },
  {
    icon: CalendarDays,
    title: "Time & Leave",
    body: "Attendance, schedules, and leave in one rhythm. Mobile-first.",
    href: "/features/leave-management",
  },
  {
    icon: Wallet,
    title: "Payroll",
    body: "Configurable structures, statutory built in, payslips your team understands.",
    href: "/features/payroll",
  },
  {
    icon: GitBranch,
    title: "Workflows",
    body: "Visual approval engine. Conditional, parallel, sequential — all no-code.",
    href: "/features/workflows",
  },
  {
    icon: Sparkles,
    title: "Self-service",
    body: "Eighty percent of HR tickets become self-serve. Mobile portal your team will use.",
    href: "/features/self-service",
  },
];

const HOME_BLOG_TEASERS = [
  {
    slug: "honest-cost-of-hr-spreadsheets",
    title: "The honest cost of running HR in spreadsheets",
    category: "HR Strategy",
    readTime: "8 min read",
    excerpt:
      "Spreadsheets feel free until they don't. Here's the math on what they actually cost — in hours, errors, and risk.",
  },
  {
    slug: "employee-handbook-guide",
    title: "How to write an employee handbook your team will actually read",
    category: "Culture",
    readTime: "11 min read",
    excerpt:
      "Most handbooks are 60-page PDFs nobody opens. Here's how to write one your team treats like a useful product.",
  },
  {
    slug: "leave-policies-that-scale",
    title: "5 leave policies that scale from 10 to 100 employees",
    category: "Guides",
    readTime: "7 min read",
    excerpt:
      "What worked at 10 will break at 100. Five patterns we see in growing companies that actually hold up.",
  },
];

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SignHR",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description:
    "All-in-one HRMS for growing teams. Onboarding, attendance, leave, payroll, and offboarding in one platform.",
  sameAs: [
    "https://twitter.com/signhr",
    "https://linkedin.com/company/signhr",
    "https://github.com/signhr",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@signhr.io",
    availableLanguage: ["English"],
  },
};

const SITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SignHR",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[ORG_LD, SITE_LD]} />
      {/* Hero */}
      <Hero
        variant="home"
        title={
          <>
            Run your <span className="font-sans">entire HR</span> without the{" "}
            <em className="serif-italic">chaos</em>.
          </>
        }
        description="The all-in-one HRMS for teams of 20 to 500. Onboarding to offboarding, attendance to payroll, in one elegant platform your people will actually want to log into."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
      />

      {/* Problem → Solution */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="brand">From → To</Badge>
            <h2 className="text-display-md mt-5 text-balance text-ink">
              You shouldn&apos;t need <em className="serif-italic">five tools</em>{" "}
              and a spreadsheet to run HR.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
              Here&apos;s what most growing teams are stuck with — and what HR
              looks like once you&apos;re on SignHR.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <BeforePanel />
            <AfterPanel />
          </div>
        </Container>
      </Section>

      {/* Core platform pillars */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Platform pillars
            </p>
            <h2 className="text-display-md mt-4 text-balance text-ink">
              Five products. <em className="serif-italic">One</em> rhythm.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Each pillar handles a chunk of HR. Together they form the
              calmest version of your operations you&apos;ve ever seen.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <FeatureCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                body={p.body}
                href={p.href}
              />
            ))}
            <Link
              href="/features"
              className="group flex flex-col justify-between rounded-2xl border border-dashed border-brand-500/40 bg-gradient-to-br from-brand-500/10 to-transparent p-6 md:p-7 transition-all hover:border-brand-500/70 hover:from-brand-500/20"
            >
              <div>
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-ink">
                  Plus 4 more modules
                </h3>
                <p className="mt-2 text-[15px] text-ink-secondary">
                  Onboarding, offboarding, asset management, performance —
                  every part of the lifecycle.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Explore all 9 modules
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Feature spotlights */}
      <Section pad="standard">
        <Container>
          <Spotlight
            eyebrow="ONBOARDING"
            title={
              <>
                First day, <em className="serif-italic">done in minutes</em>
              </>
            }
            body={
              <>
                Send the offer. Collect documents. Sign the contract. Provision
                the laptop. All before they&apos;ve poured their first coffee on
                day one — without you opening another spreadsheet.
              </>
            }
            bullets={[
              "Branded offer letters generated from templates",
              "E-signatures + document collection in the same flow",
              "Auto-creates Google, Notion, and SSO accounts",
            ]}
            side="right"
            visual={
              <SpotlightImage
                src="/assets/onboarding.webp"
                alt="SignHR onboarding flow"
                width={1535}
                height={1025}
              />
            }
          />
        </Container>
      </Section>

      <Section pad="standard" surface="muted">
        <Container>
          <Spotlight
            eyebrow="TIME & ATTENDANCE"
            title={
              <>
                Clock in. Or don&apos;t.{" "}
                <em className="serif-italic">Either way</em>, we&apos;ve got it.
              </>
            }
            body="Punch in from a browser, phone, or kiosk. Geofencing, IP rules, and shift schedules — all in one timesheet that managers actually approve in under a minute."
            bullets={[
              "Selfie + GPS verification on mobile",
              "Rotating, split, and night shift support",
              "Auto-regularization for missed punches",
            ]}
            side="left"
            visual={
              <SpotlightImage
                src="/assets/check-in-out.webp"
                alt="SignHR attendance dashboard with check-in and check-out timeline"
                width={1536}
                height={1024}
              />
            }
          />
        </Container>
      </Section>

      <Section pad="standard">
        <Container>
          <Spotlight
            eyebrow="WORKFLOWS"
            title={
              <>
                Every approval, <em className="serif-italic">automated</em>
              </>
            }
            body="Multi-step, multi-approver, conditional, parallel — the workflow engine handles whatever your real process actually looks like, without the consultant fees."
            bullets={[
              "Visual builder, no code, sandbox to test",
              "Approve from email, mobile, or the inbox — wherever you are",
              "Smart escalations when approvers are out",
            ]}
            side="right"
            visual={
              <SpotlightImage
                src="/assets/approval-flow.webp"
                alt="SignHR visual approval workflow builder"
                width={1201}
                height={1310}
              />
            }
          />
        </Container>
      </Section>

      {/* Live workflow demo */}
      <Section pad="standard" surface="muted">
        <Container>
          <WorkflowDemo />
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section pad="standard">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Pricing
            </p>
            <h2 className="text-display-md mt-4 text-balance text-ink">
              Simple pricing. <em className="serif-italic">No surprises.</em>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Per-employee, billed monthly or annually. 3-month free trial on
              every plan, no card required.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} billing="annual" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary" size="md">
              <Link href="/pricing">
                Compare every feature
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Blog teaser */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Field notes
              </p>
              <h2 className="text-display-md mt-4 max-w-[18ch] text-ink">
                Honest writing about modern HR.
              </h2>
            </div>
            <Button asChild variant="link" className="hidden md:inline-flex">
              <Link href="/blog">
                Read the blog
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {HOME_BLOG_TEASERS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {post.category}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-ink group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-secondary">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-[12px] text-ink-muted">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Ready to give HR{" "}
            <em className="serif-italic">the upgrade</em> it deserves?
          </>
        }
        body="Set up in 10 minutes. 3-month free trial on the Growth plan. No credit card."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Start free trial", href: "/book-demo?plan=growth" }}
      />
    </>
  );
}

function SpotlightImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-25px_rgba(45,30,90,0.25)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

function BeforePanel() {
  const items: Array<{ icon: React.ComponentType<{ className?: string }>; text: string }> = [
    { icon: FileSpreadsheet, text: "Three spreadsheets that disagree on headcount" },
    { icon: Mail, text: "Leave requests buried in 14 email threads" },
    { icon: MessagesSquare, text: "Late-night DMs asking for payslips" },
    { icon: X, text: "Day-one onboarding done by hand, every time" },
  ];
  return (
    <div className="rounded-3xl border border-border bg-muted/40 p-7">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 items-center rounded-full bg-destructive/10 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-destructive">
          Today
        </span>
      </div>
      <h3 className="text-display-sm mt-4 text-ink">The HR you have</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((it) => (
          <li key={it.text} className="flex items-start gap-3 text-[15px] text-ink-secondary">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <it.icon className="size-3" aria-hidden />
            </span>
            {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AfterPanel() {
  const items = [
    "One workspace. Every employee, document, and policy in sync.",
    "Leave applied in two taps. Manager approves in one click.",
    "Payroll run end-to-end in under ten minutes.",
    "Day-one onboarding kicks off the moment they sign.",
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent p-7">
      <div
        aria-hidden
        className="absolute -right-12 -top-12 size-48 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-pink/20 blur-3xl"
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 items-center rounded-full bg-brand-100 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          With SignHR
        </span>
      </div>
      <h3 className="text-display-sm mt-4 text-ink">The HR you want</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-[15px] text-ink">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Check className="size-3" aria-hidden />
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
