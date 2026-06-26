import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Clock,
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
  UserPlus,
  Bot,
  Laptop,
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
import { WorkflowDemo } from "@/components/marketing/workflow-demo";
import { SpotlightMockupView } from "@/components/marketing/spotlight-mockups";
import { CoreHrCard } from "@/components/marketing/core-hr-card";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { AppDownloadBand } from "@/components/marketing/app-download-band";
import { StatNumber } from "@/components/marketing/stat-number";
import { BlogCover } from "@/components/blog/blog-cover";
import { LOGO_NAMES, STATS } from "@/lib/testimonials";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_MODULES = [
  {
    icon: Bot,
    title: "Ask HR",
    body: "Your company's own AI HR — answers from live data & policy.",
    href: "/features/ask-hr",
  },
  {
    icon: Users,
    title: "Employee Management",
    body: "Profiles, records & lifecycle — the data hub everything flows from.",
    href: "/features/core-hrms",
  },
  {
    icon: Clock,
    title: "Attendance & Check-In/Out",
    body: "Web, mobile, GPS & geofenced punches.",
    href: "/features/time-attendance",
  },
  {
    icon: CalendarDays,
    title: "Leave Management",
    body: "Policies, balances & one-tap approvals.",
    href: "/features/leave-management",
  },
  {
    icon: UserPlus,
    title: "Easy Onboarding",
    body: "Offer → docs → day one, in minutes.",
    href: "/features/onboarding",
  },
  {
    icon: GitBranch,
    title: "Approval Workflows",
    body: "Multi-level chains for every request.",
    href: "/features/workflows",
  },
  {
    icon: Wallet,
    title: "Payroll-ready",
    body: "We compute the inputs; your payroll engine pays out.",
    href: "/features/payroll",
  },
  {
    icon: Laptop,
    title: "Asset Management",
    body: "Know who has what — assign & track every device.",
    href: "/features/assets",
  },
];

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SignHR",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.webp`,
  },
  description:
    "All-in-one AI-powered HR software for Indian teams of 20–500 — onboarding, attendance, leave, and payroll-ready compliance in one platform.",
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

const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "Product"],
  name: "SignHR",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "AI-powered HRMS for Indian teams — core HR, attendance, leave, payroll-ready compliance and an in-app AI HR assistant.",
  image: `${SITE_URL}/opengraph-image`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: 12,
    highPrice: 15,
    offerCount: 1,
    url: `${SITE_URL}/pricing`,
  },
};

export default async function HomePage() {
  // Latest published posts from the CMS for the home-page teaser (newest first).
  const blogTeasers = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <JsonLd data={[ORG_LD, SITE_LD, SOFTWARE_LD]} />
      {/* Hero */}
      <Hero
        variant="home"
        title={
          <>
            The world&apos;s first <em className="serif-italic">AI-powered</em>{" "}
            HRMS.
          </>
        }
        description="Onboarding, attendance, leave and payroll-ready — with your own AI HR built in. One platform for Indian teams of 20 to 500."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Explore", href: "/features" }}
      />

      {/* Logo cloud */}
      <Section pad="compact" data-section="Logo Cloud" className="border-y border-border/60">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            50+ teams already running on SignHR
          </p>
          <div className="mt-6">
            <LogoMarquee names={LOGO_NAMES} />
          </div>
        </Container>
      </Section>

      {/* Problem → Solution */}
      <Section pad="standard" surface="muted" data-section="Problem & Solution">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="brand">From → To</Badge>
            <h2 className="text-display-md mx-auto mt-5 max-w-[26ch] text-balance text-ink">
              Still running HR on{" "}
              <em className="serif-italic">spreadsheets and WhatsApp</em>?
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
              Here&apos;s what most growing teams are stuck with — and what HR
              looks like once it&apos;s one connected system on SignHR.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <BeforePanel />
            <AfterPanel />
          </div>
        </Container>
      </Section>

      {/* Core platform pillars */}
      <Section pad="standard" data-section="Platform Pillars">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              The platform
            </p>
            <h2 className="text-display-md mt-4 text-balance text-ink">
              Everything a growing team needs.{" "}
              <em className="serif-italic">One</em> platform.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Each module handles a chunk of HR. Together they form the calmest
              version of your operations you&apos;ve ever seen.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HERO_MODULES.map((p) => (
              <FeatureCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                body={p.body}
                href={p.href}
              />
            ))}
            <Link
              href="/features#roadmap"
              className="group flex flex-col justify-between rounded-2xl border border-dashed border-brand-500/40 bg-gradient-to-br from-brand-500/10 to-transparent p-6 md:p-7 transition-all hover:border-brand-500/70 hover:from-brand-500/20"
            >
              <div>
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-ink">
                  Plus what&apos;s coming
                </h3>
                <p className="mt-2 text-[15px] text-ink-secondary">
                  Recruitment, performance, reports &amp; analytics, and more —
                  on the roadmap.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                See the roadmap
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Ask HR — flagship AI section */}
      <Section pad="standard" surface="muted" data-section="Ask HR">
        <Container>
          <Spotlight
            eyebrow="ASK HR"
            title={
              <>
                Your company&apos;s own <em className="serif-italic">AI HR</em>
              </>
            }
            body={
              <>
                Every employee gets an AI HR they can just ask — leave balance,
                “why did my pay change?”, an unpaid-leave deduction — answered
                from your live data and policies, with the source cited.
                Read-only and permission-scoped.
              </>
            }
            bullets={[
              "Plain-English answers grounded in your data, with the policy cited",
              "Runs real what-if math on live payroll — shown as an estimate",
              "Read-only & permission-scoped — it only sees what the employee may see",
            ]}
            side="left"
            cta={{ label: "Explore Ask HR", href: "/features/ask-hr" }}
            visual={<SpotlightMockupView mockup={{ kind: "ask-hr" }} />}
          />
        </Container>
      </Section>

      {/* Feature spotlights */}
      <Section pad="standard" data-section="Onboarding">
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

      <Section pad="standard" surface="muted" data-section="Time & Attendance">
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

      <Section pad="standard" data-section="Workflows">
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
      <Section pad="standard" surface="muted" data-section="Workflow Demo">
        <Container>
          <WorkflowDemo />
        </Container>
      </Section>

      {/* Stats band */}
      <Section pad="standard" data-section="Stats">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <StatNumber
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={Number.isInteger(s.value) ? 0 : 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      <AppDownloadBand />

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
              One Core HR plan, optional add-ons. 1-year saves 10%, 3-year saves
              20%.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <CoreHrCard defaultTermId="3y" />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary" size="md">
              <Link href="/pricing">
                See full pricing
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Blog teaser — live published posts from the CMS; hidden when none */}
      {blogTeasers.length > 0 && (
      <Section pad="standard" surface="muted" data-section="Blog">
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
            {blogTeasers.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-ink-muted hover:shadow-[0_18px_40px_-20px_rgba(45,30,90,0.15)]"
              >
                <BlogCover post={post} variant="grid" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {post.category}
                  </p>
                  <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-ink group-hover:text-brand-700">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-secondary">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-[12px] text-ink-muted">
                    {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      )}
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
    <div className="overflow-hidden">
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
  const items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    text: string;
  }> = [
    {
      icon: FileSpreadsheet,
      text: "Three spreadsheets that disagree on headcount",
    },
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
          <li
            key={it.text}
            className="flex items-start gap-3 text-[15px] text-ink-secondary"
          >
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
