"use client";

import * as React from "react";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DESKTOP_PLATFORM_LABELS,
  formatBuildSize,
  pickPrimaryFile,
  type DesktopBuild,
  type DesktopPlatform,
  type LatestDesktopBuilds,
} from "@/lib/desktop-builds-types";

const PLATFORM_ORDER: DesktopPlatform[] = ["windows", "macos", "linux"];

const FEATURES = [
  "Full dashboard & reports, native and fast",
  "Desktop notifications for approvals & pings",
  "Sign in once — stays signed in",
];

function detectOS(): DesktopPlatform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return null;
}

export function DesktopDownload({ builds }: { builds: LatestDesktopBuilds }) {
  const [detected, setDetected] = React.useState<DesktopPlatform | null>(null);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state with external platform API (navigator.userAgent) on mount; no subscription needed
    setDetected(detectOS());
  }, []);

  const detectedBuild = detected ? builds[detected] : null;
  const primary = detectedBuild ? pickPrimaryFile(detectedBuild) : null;

  return (
    <div data-section="Desktop App" className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy column */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
          Desktop app
        </p>
        <h2 className="text-display-md mt-4 text-ink">
          The full picture, <em className="serif-italic">on your desk</em>
        </h2>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-secondary">
          A native desktop app for Windows, macOS and Linux — the complete SignHR dashboard with
          native notifications, built for the people who run HR all day.
        </p>
        <ul className="mt-7 flex flex-col gap-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[15px] text-ink">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check className="size-3.5" aria-hidden />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {detectedBuild ? (
          <div className="mt-7">
            <WhatsNew build={detectedBuild} />
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          <a href="/download/releases" className="font-semibold text-brand-600 hover:text-brand-700">
            All versions &amp; release notes
          </a>
          <a href="/download/releases" className="font-semibold text-brand-600 hover:text-brand-700">
            Verify checksums (SHA-256)
          </a>
        </div>
      </div>

      {/* Download panel column */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-32px_rgba(45,30,90,0.25)]">
        {primary && detected && detectedBuild ? (
          <div className="mb-6">
            <Button asChild size="lg" className="w-full">
              <a href={primary.download_url}>
                <Download className="size-4" aria-hidden />
                Download for {DESKTOP_PLATFORM_LABELS[detected]}
                <span className="font-normal opacity-80">· {primary.label}</span>
              </a>
            </Button>
            <p className="mt-2 text-center text-[12px] text-ink-muted">
              We detected{" "}
              <span className="font-semibold text-ink-secondary">
                {DESKTOP_PLATFORM_LABELS[detected]}
              </span>
              {" · "}v{detectedBuild.version}
            </p>
          </div>
        ) : null}

        <div className="divide-y divide-border">
          {PLATFORM_ORDER.map((platform) => (
            <PlatformRow
              key={platform}
              platform={platform}
              build={builds[platform]}
              highlighted={platform === detected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsNew({ build }: { build: DesktopBuild }) {
  if (!build.release_notes) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        What&apos;s new in v{build.version} · {DESKTOP_PLATFORM_LABELS[build.platform]}
      </p>
      <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-ink-secondary">
        {build.release_notes}
      </p>
    </div>
  );
}

function PlatformRow({
  platform,
  build,
  highlighted,
}: {
  platform: DesktopPlatform;
  build: DesktopBuild | null;
  highlighted: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0",
        highlighted && "-mx-2 rounded-xl bg-brand-50/60 px-2",
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">
            {DESKTOP_PLATFORM_LABELS[platform]}
          </span>
          {highlighted ? (
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold text-white">
              Your system
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-[12px] text-ink-muted">{build ? `v${build.version}` : "Coming soon"}</p>
      </div>
      <div className="flex shrink-0 flex-wrap justify-end gap-2">
        {build
          ? build.files.map((file) => {
              const size = formatBuildSize(file.file_size_bytes);
              return (
                <Button key={file.id} asChild variant="secondary" size="sm">
                  <a href={file.download_url}>
                    {file.label}
                    {size ? <span className="font-normal text-ink-muted"> {size}</span> : null}
                  </a>
                </Button>
              );
            })
          : null}
      </div>
    </div>
  );
}
