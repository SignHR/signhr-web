import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Data Processing Addendum", href: "/legal/dpa" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section pad="standard">
      <Container size="lg">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Legal
            </p>
            <nav className="mt-3 flex flex-col gap-1">
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-2.5 py-1.5 text-[14px] text-ink-secondary transition-colors hover:bg-muted hover:text-ink aria-[current=page]:text-brand-700 aria-[current=page]:font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="prose prose-signhr min-w-0 max-w-none text-[16px] leading-[1.75]">
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
