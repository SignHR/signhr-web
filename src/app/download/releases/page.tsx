import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/marketing/hero";
import { getDesktopArchive } from "@/lib/desktop-builds";
import { DESKTOP_PLATFORM_LABELS, formatBuildSize } from "@/lib/desktop-builds-types";

export const metadata: Metadata = {
  title: "SignHR Desktop — all versions & checksums",
  description:
    "Every released version of the SignHR desktop app for Windows, macOS and Linux, with release notes and SHA-256 checksums for verification.",
  alternates: { canonical: "/download/releases" },
};

export const revalidate = 3600;

export default async function ReleasesPage() {
  const builds = await getDesktopArchive();

  return (
    <>
      <Hero
        variant="generic"
        eyebrow="Desktop"
        title={
          <>
            All versions &amp; <em className="serif-italic">checksums</em>
          </>
        }
        description="Every released build of the SignHR desktop app, with release notes and SHA-256 checksums."
      />

      <Section pad="standard">
        <Container size="md">
          {builds.length === 0 ? (
            <p className="text-[15px] text-ink-muted">No desktop releases published yet.</p>
          ) : (
            <div className="flex flex-col gap-10">
              {builds.map((build) => (
                <article key={build.id} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-[18px] font-semibold text-ink">
                      {DESKTOP_PLATFORM_LABELS[build.platform]} v{build.version}
                    </h2>
                    <span className="text-[12px] text-ink-muted">
                      {build.published_at
                        ? new Date(build.published_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : null}
                    </span>
                  </div>

                  {build.release_notes ? (
                    <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink-secondary">
                      {build.release_notes}
                    </p>
                  ) : null}

                  <ul className="mt-4 flex flex-col gap-2">
                    {build.files.map((file) => (
                      <li
                        key={file.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3"
                      >
                        <div className="min-w-0">
                          <a
                            href={file.download_url}
                            className="text-[14px] font-medium text-brand-600 hover:text-brand-700"
                          >
                            {file.label}
                          </a>
                          {formatBuildSize(file.file_size_bytes) ? (
                            <span className="ml-2 text-[12px] text-ink-muted">
                              {formatBuildSize(file.file_size_bytes)}
                            </span>
                          ) : null}
                        </div>
                        {file.checksum_sha256 ? (
                          <code className="max-w-full truncate font-mono text-[11px] text-ink-muted">
                            sha256: {file.checksum_sha256}
                          </code>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
