import Image from "next/image";
import { APP_DOWNLOADS, type AppPlatformKey } from "@/lib/app-downloads";
import { cn } from "@/lib/utils";

interface AppBadgesProps {
  /** Which platforms to show; defaults to all in APP_DOWNLOADS order. */
  platforms?: AppPlatformKey[];
  className?: string;
}

export function AppBadges({ platforms, className }: AppBadgesProps) {
  const items = APP_DOWNLOADS.filter(
    (p) => !platforms || platforms.includes(p.key),
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((p) => {
        // Live with an official badge asset (iOS / Android).
        if (p.href && p.badge) {
          return (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.badge.alt}
              className="inline-block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={p.badge.src}
                width={p.badge.width}
                height={p.badge.height}
                alt={p.badge.alt}
                unoptimized
              />
            </a>
          );
        }
        // Live without a store badge (e.g. a desktop direct download).
        if (p.href) {
          return (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-border bg-card px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink-muted"
            >
              Download for {p.label}
            </a>
          );
        }
        // Not live yet.
        return (
          <span
            key={p.key}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-ink-muted"
          >
            {p.label}
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
              Coming soon
            </span>
          </span>
        );
      })}
    </div>
  );
}
