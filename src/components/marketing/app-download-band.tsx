import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AppBadges } from "@/components/marketing/app-badges";

/**
 * Home-page "get the app" band: copy + download badges on one side, a phone
 * visual on the other. Reuses the established CTA-panel gradient.
 */
export function AppDownloadBand() {
  return (
    <Section pad="standard" data-section="App Download">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 to-card px-6 py-12 md:px-12 md:py-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Mobile app
            </p>
            <h2 className="text-display-md mt-4 text-ink">
              HR in your <em className="serif-italic">pocket</em>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
              Punch in, approve leave, check payslips, and get push updates —
              wherever you are. Free with every SignHR workspace.
            </p>
            <AppBadges className="mt-7" platforms={["app_store", "play_store"]} />
          </div>
          <div className="relative mx-auto w-full max-w-[260px]">
            <Image
              src="/assets/mobile.webp"
              alt="SignHR mobile app"
              width={1386}
              height={2996}
              className="h-auto w-full rounded-[28px] shadow-[0_40px_80px_-30px_rgba(45,30,90,0.35)]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
