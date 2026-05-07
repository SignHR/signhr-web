import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { CTABand } from "@/components/marketing/cta-band";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Zap,
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Setup, integrations, troubleshooting — answers from the team that built SignHR.",
  alternates: { canonical: "/resources/help" },
};

const TOPICS = [
  { label: "Getting started", count: 8 },
  { label: "Importing data", count: 6 },
  { label: "Leave & policies", count: 12 },
  { label: "Payroll", count: 9 },
  { label: "Workflows", count: 7 },
  { label: "Integrations", count: 14 },
  { label: "Permissions & roles", count: 5 },
  { label: "Mobile app", count: 4 },
  { label: "API & webhooks", count: 11 },
];

const COMMON = [
  {
    q: "How do I import employees from BambooHR / Zoho People / Keka?",
    a: "Go to Settings → Import. Pick your source. Authorize. We pull profiles, leave balances, and document metadata in a single sync. The whole thing takes about 15 minutes for a 200-person company.",
  },
  {
    q: "Can I run my first payroll on SignHR within a week?",
    a: "Yes — assuming your employee list and salary structures are clean, the typical timeline is: day 1 import, day 2 verify structures, day 3-5 dry-run, day 6 first real run. We have a payroll engineer who joins the dry-run if you want.",
  },
  {
    q: "How do I configure leave policies for a multi-country team?",
    a: "Each policy has a 'jurisdiction' setting. Create one per country, set the rules (annual, sick, public holidays, etc.), and assign employees to the matching one. The system handles the rest, including country-specific public holidays.",
  },
  {
    q: "Does SignHR support SSO?",
    a: "Yes — SAML 2.0 and OIDC, both available on the Enterprise plan. We've tested with Okta, Azure AD, Google Workspace, OneLogin, and JumpCloud. Setup takes about 20 minutes.",
  },
  {
    q: "Can employees use SignHR on mobile?",
    a: "Yes. iOS and Android apps with full self-service: profile, leave, attendance, payslips, and team directory. The app works offline and syncs when connectivity returns.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "You can export everything — employees, leave history, payslips, documents — in a single zip file. We retain backups for 30 days after cancellation, then purge.",
  },
  {
    q: "How does support work?",
    a: "Email and in-app chat on every plan. Starter gets 24h first response, Growth gets 4h, Enterprise gets a dedicated CSM with a private channel. Real engineers, not chatbots.",
  },
  {
    q: "Can I customize the interface for my team?",
    a: "Yes — your logo, your brand color, custom fields, and a configurable home page per role. White-label is available on Enterprise.",
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <Hero
        eyebrow="HELP CENTER"
        title={
          <>
            Answers from the team that{" "}
            <em className="serif-italic">built it</em>
          </>
        }
        description="Search, browse by topic, or just email us. Real engineers respond — usually within 4 hours during business hours, faster on Enterprise."
      />

      <Section pad="standard" className="-mt-12">
        <Container size="md">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search the help center…"
              aria-label="Search help center"
              className="h-14 w-full rounded-2xl border border-border bg-card pl-14 pr-5 text-[15px] text-ink placeholder:text-ink-muted/70 shadow-sm transition-colors hover:border-ink-muted focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </Container>
      </Section>

      <Section pad="standard">
        <Container>
          <h2 className="text-display-sm text-ink">Browse by topic</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <Link
                key={t.label}
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-ink-muted"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Zap className="size-4" aria-hidden />
                  </span>
                  <span className="text-[15px] font-medium text-ink">{t.label}</span>
                </span>
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  {t.count}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section pad="standard" surface="muted">
        <Container size="md">
          <h2 className="text-display-sm text-ink">Common questions</h2>
          <div className="mt-8">
            <FAQAccordion items={COMMON} defaultValue="item-0" />
          </div>
        </Container>
      </Section>

      <Section pad="standard">
        <Container size="md">
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/contact"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-ink-muted"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Mail className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-[16px] font-semibold text-ink">Email support</p>
                <p className="mt-1 text-[14px] text-ink-secondary">
                  help@signhr.example.com — typical response in 4 hours.
                </p>
              </div>
            </Link>
            <Link
              href="/contact"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-ink-muted"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-[16px] font-semibold text-ink">In-app chat</p>
                <p className="mt-1 text-[14px] text-ink-secondary">
                  Open SignHR, click the chat bubble. Real humans — Mon–Fri.
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="link">
              <Link href="/changelog">
                Looking for something we shipped recently? Check the changelog →
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="GET STARTED"
        title={
          <>
            Still have questions?{" "}
            <em className="serif-italic">Talk to a human.</em>
          </>
        }
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
