import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Lock,
  KeyRound,
  Cloud,
  DatabaseBackup,
  ScrollText,
  FileLock2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

type SecurityCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SECURITY_CARDS: SecurityCard[] = [
  {
    icon: ShieldCheck,
    title: "GDPR Ready",
    description: "Privacy-first data handling practices.",
  },
  {
    icon: Scale,
    title: "DPDP Act Ready",
    description:
      "Aligned with India's Digital Personal Data Protection requirements.",
  },
  {
    icon: Lock,
    title: "256-bit SSL Encryption",
    description: "Secure communication using HTTPS encryption.",
  },
  {
    icon: KeyRound,
    title: "Role-Based Access Control",
    description: "Restrict access based on employee roles and permissions.",
  },
  {
    icon: Cloud,
    title: "Secure Cloud Infrastructure",
    description: "Hosted on reliable and secure cloud infrastructure.",
  },
  {
    icon: DatabaseBackup,
    title: "Daily Data Backups",
    description: "Automated backups for business continuity.",
  },
  {
    icon: ScrollText,
    title: "Audit Logs",
    description: "Complete activity tracking and audit history.",
  },
  {
    icon: FileLock2,
    title: "Data Encryption at Rest",
    description: "Sensitive data remains encrypted while stored.",
  },
];

interface SecuritySectionProps {
  /** Background variant — `muted` tints the band (e.g. between two default sections). */
  surface?: "default" | "muted";
  /** Show the "Learn More About Security" CTA. Hide it on the /security page itself. */
  showCta?: boolean;
}

/**
 * Enterprise security & compliance overview — a responsive 4-column grid of
 * trust cards with a CTA to the dedicated /security page. Built on the shared
 * Section/Container primitives and design tokens, so it tracks light & dark
 * mode automatically.
 */
export function SecuritySection({
  surface = "default",
  showCta = true,
}: SecuritySectionProps) {
  return (
    <Section pad="standard" surface={surface} data-section="Security & Compliance">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            Security &amp; Compliance
          </p>
          <h2 className="text-display-md mt-4 text-balance text-ink">
            Enterprise-Grade Security &amp; Compliance
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
            Your employee, payroll, and HR data is protected with
            industry-standard security practices.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_18px_40px_-24px_rgba(45,30,90,0.28)]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-200 group-hover:scale-105">
                <card.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {showCta && (
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg">
              <Link href="/security">
                Learn More About Security
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
