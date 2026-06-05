import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/social";
import { Logo } from "@/components/icons/logo";
import { Container } from "@/components/layout/container";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";
import { FOOTER_NAV } from "@/lib/nav";

const SOCIAL = [
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-section="Footer" className="relative border-t border-border bg-muted/30">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-secondary">
              The HR platform your team will actually want to log into.
              Onboarding to offboarding in one elegant, multi-tenant SaaS — built
              for teams of 20 to 500.
            </p>
            <div className="mt-7 max-w-md">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Get the field notes
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                One short email a month. HR strategy, product updates, and the
                occasional template. No fluff.
              </p>
              <div className="mt-3">
                <NewsletterSignup variant="inline" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn label="Product" links={FOOTER_NAV.product} />
            <FooterColumn label="Company" links={FOOTER_NAV.company} />
            <FooterColumn label="Legal" links={FOOTER_NAV.legal} />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-border py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SignHR. Built with care in Bengaluru.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/changelog"
              className="hover:text-ink"
              aria-label="Status"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                All systems normal
              </span>
            </Link>
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex size-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-muted hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
        {label}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
