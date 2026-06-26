import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Server,
  KeyRound,
  DatabaseBackup,
  BadgeCheck,
  Fingerprint,
  Check,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { SecuritySection } from "@/components/marketing/security-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "How SignHR protects your employee, payroll, and HR data — encryption in transit and at rest, role-based access, daily backups, GDPR & India DPDP Act alignment, and secure cloud infrastructure.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security & Compliance — SignHR",
    description:
      "How SignHR protects your employee, payroll, and HR data — encryption in transit and at rest, role-based access, daily backups, and GDPR & India DPDP Act alignment.",
    type: "website",
    url: "/security",
  },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Security",
      item: `${SITE_URL}/security`,
    },
  ],
};

type SecurityArea = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

const AREAS: SecurityArea[] = [
  {
    icon: ShieldCheck,
    title: "Data Security",
    description:
      "Your data is encrypted the moment it leaves a device and stays encrypted while we hold it.",
    points: [
      "TLS 1.2+ on every connection, HSTS enforced.",
      "Sensitive data encrypted at rest.",
      "Each workspace isolated in its own database.",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "Hosted on hardened, reputable cloud infrastructure with India-region data residency.",
    points: [
      "Managed cloud hosting in the ap-south-1 (India) region.",
      "Network isolation and least-privilege service access.",
      "Continuous monitoring and automated patching.",
    ],
  },
  {
    icon: KeyRound,
    title: "Access Control",
    description:
      "People see only what their role allows — and you stay in control of who that is.",
    points: [
      "Granular role-based permissions, down to the module.",
      "Token-based auth scoped to a single workspace.",
      "Admins manage roles, access, and offboarding centrally.",
    ],
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Recovery",
    description:
      "Automated backups and documented recovery so your data is never one mistake from gone.",
    points: [
      "Automated daily database backups.",
      "Versioned object storage for uploaded files.",
      "Documented, tested recovery procedures.",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Compliance",
    description:
      "Privacy-by-design practices aligned with the regulations that matter for Indian teams.",
    points: [
      "GDPR-aligned data handling.",
      "Aligned with India's Digital Personal Data Protection (DPDP) Act.",
      "Data Processing Agreement available on request.",
    ],
  },
  {
    icon: Fingerprint,
    title: "Privacy",
    description:
      "Your data is yours. We collect only what we need, and we never sell it.",
    points: [
      "Export or delete your data on request.",
      "We never sell or rent customer data.",
      "Configurable retention windows.",
    ],
  },
];

const DOCS: Array<{ label: string; href: string }> = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Data Processing Agreement", href: "/legal/dpa" },
  { label: "Terms of Service", href: "/legal/terms" },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_LD} />
      <Hero
        variant="feature"
        eyebrow="Security & Compliance"
        title={
          <>
            Enterprise-grade security, <em>built in</em>.
          </>
        }
        description="Your employee, payroll, and HR data is protected with industry-standard security practices."
        primaryCta={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCta={{ label: "Read our DPA", href: "/legal/dpa" }}
      />

      {/* Trust-card overview (CTA hidden — we're already on /security) */}
      <SecuritySection showCta={false} />

      {/* The six pillars, in depth */}
      <Section pad="standard" surface="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              How we protect your data
            </p>
            <h2 className="text-display-sm mt-4 text-balance text-ink">
              Six pillars, every plan.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Security isn&apos;t an add-on or an enterprise tier. It&apos;s how
              SignHR is built — for every team, from day one.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_18px_40px_-24px_rgba(45,30,90,0.28)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-200 group-hover:scale-105">
                  <area.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">
                  {area.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
                  {area.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {area.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-secondary"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Compliance documents */}
      <Section pad="standard">
        <Container size="md">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-[22px] font-semibold tracking-tight text-ink">
                  Read the fine print.
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
                  The policies and agreements behind how we handle your data.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {DOCS.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-brand-500/40 hover:text-brand-700"
                  >
                    <FileText className="size-4 text-brand-600" aria-hidden />
                    {doc.label}
                    <ArrowRight className="size-3.5 text-ink-muted" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
