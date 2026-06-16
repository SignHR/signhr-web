import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  Check,
  Clock,
  ClipboardCheck,
  FileText,
  Bell,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { AppBadges } from "@/components/marketing/app-badges";
import { cn } from "@/lib/utils";
import { type Platform } from "@/lib/app-downloads-types";

export const metadata: Metadata = {
  title: "Download the SignHR HR App — iOS & Android",
  description:
    "Get the SignHR app — punch in, approve leave and check payslips on iOS & Android, and run the full dashboard with native desktop apps for Windows, macOS and Linux.",
  alternates: { canonical: "/download" },
};

export const revalidate = 3600;

type PlatformBandProps = {
  /** `data-section` attribute for analytics/debugging. */
  section: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  features: string[];
  platforms: Platform[];
  visual: ReactNode;
  /** Place the visual on the left (copy on the right) at lg+ for layout rhythm. */
  flip?: boolean;
};

/**
 * One open device band — copy + visual in two columns, no bordered card.
 * Both bands sit on the page canvas inside a single Section, separated by a rule.
 */
function PlatformBand({
  section,
  eyebrow,
  title,
  description,
  features,
  platforms,
  visual,
  flip = false,
}: PlatformBandProps) {
  return (
    <div
      data-section={section}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn(flip && "lg:order-2")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          {eyebrow}
        </p>
        <h2 className="text-display-md mt-4 text-ink">{title}</h2>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
          {description}
        </p>
        <ul className="mt-7 flex flex-col gap-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[15px] text-ink"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check className="size-3.5" aria-hidden />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <AppBadges className="mt-8" platforms={platforms} />
      </div>
      <div className={cn(flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Clock,
    title: "Check in from anywhere",
    desc: "Selfie + GPS punch on mobile or kiosk, geo-fenced to your sites.",
  },
  {
    icon: ClipboardCheck,
    title: "Approvals on the go",
    desc: "Raise and approve leave, attendance and requests in a single tap.",
  },
  {
    icon: FileText,
    title: "Payslips & documents",
    desc: "Salary slips, letters and policies — always in your pocket.",
  },
  {
    icon: Bell,
    title: "Push notifications",
    desc: "Instant nudges for approvals, shift reminders and announcements.",
  },
  {
    icon: Users,
    title: "Team directory",
    desc: "Find anyone, see who's in, who's on leave, and reach them fast.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & fast",
    desc: "Biometric unlock, encrypted data, smooth even on low bandwidth.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <Hero
        variant="generic"
        eyebrow="Apps"
        title={
          <>
            SignHR, everywhere you <em>work</em>
          </>
        }
        description="Take HR with you — punch in from your phone, run the dashboard from your desk. One login, every device."
        trust="Free with every SignHR workspace."
      />

      {/* Device showcase — two open bands on one continuous canvas, divided by a rule. */}
      <Section pad="standard" data-section="App Showcase">
        <Container>
          <PlatformBand
            section="Mobile App"
            eyebrow="Mobile app"
            title={
              <>
                HR in your <em className="serif-italic">pocket</em>
              </>
            }
            description="Punch in, approve leave, check payslips and get push updates — wherever you are. Live on iOS and Android."
            features={[
              "One-tap check in & check out, with location",
              "Approve or raise leave & requests on the go",
              "Payslips & documents in your pocket",
            ]}
            platforms={["app_store", "play_store"]}
            visual={
              <div className="relative mx-auto w-full max-w-[280px]">
                <Image
                  src="/assets/mobile.webp"
                  alt="SignHR mobile app"
                  width={1386}
                  height={2996}
                  priority
                  sizes="280px"
                  className="h-auto w-full rounded-[28px] shadow-[0_40px_80px_-30px_rgba(45,30,90,0.35)]"
                />
              </div>
            }
          />

          <hr className="my-14 border-border md:my-16" />

          <PlatformBand
            section="Desktop App"
            eyebrow="Desktop · Coming soon"
            flip
            title={
              <>
                The full picture, <em className="serif-italic">on your desk</em>
              </>
            }
            description="A native desktop app for Windows, macOS and Linux — the complete SignHR dashboard with native notifications, built for the people who run HR all day."
            features={[
              "Full dashboard & reports, native and fast",
              "Desktop notifications for approvals & pings",
              "Sign in once — stays signed in",
            ]}
            platforms={["macos", "windows", "linux"]}
            visual={
              <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(45,30,90,0.35)]">
                <Image
                  src="/assets/dashboard.webp"
                  alt="SignHR desktop dashboard"
                  width={2926}
                  height={1647}
                  className="block h-auto w-full"
                />
              </div>
            }
          />
        </Container>
      </Section>

      {/* Features & benefits */}
      <Section pad="standard" surface="muted" data-section="App Benefits">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Features &amp; benefits
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              HR your team will actually{" "}
              <em className="serif-italic">open</em>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary">
              Everything an employee needs day-to-day — no logins to chase, no HR
              tickets to file.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <b.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
