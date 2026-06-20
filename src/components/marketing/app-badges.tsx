import Image from "next/image";
import { getAppDownloads } from "@/lib/app-downloads";
import { STORE_BADGES, type Platform } from "@/lib/app-downloads-types";
import { cn } from "@/lib/utils";

interface AppBadgesProps {
  /** Which platforms to show; defaults to all, in canonical order. */
  platforms?: Platform[];
  className?: string;
}

/**
 * Download links for the given platforms, sourced from the admin-managed
 * `app_downloads` API. Live store platforms render the official store badge;
 * live desktop platforms render a text button; unavailable platforms render a
 * "Coming soon" pill — matching the previous (hardcoded) presentation.
 */
export async function AppBadges({ platforms, className }: AppBadgesProps) {
  const downloads = await getAppDownloads();
  const items = downloads.filter(
    (d) => !platforms || platforms.includes(d.platform),
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item) => {
        const badge = STORE_BADGES[item.platform];

        // Live store platform with an official badge asset (App Store / Play Store).
        if (item.available && item.download_url && badge) {
          return (
            <a
              key={item.platform}
              href={item.download_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={badge.alt}
              className="inline-block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={badge.src}
                width={badge.width}
                height={badge.height}
                alt={badge.alt}
                unoptimized
              />
            </a>
          );
        }

        // Live without a store badge (e.g. a desktop direct download).
        if (item.available && item.download_url) {
          return (
            <a
              key={item.platform}
              href={item.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-border bg-card px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink-muted"
            >
              Download for {item.label}
            </a>
          );
        }

        // Not live yet.
        return (
          <span
            key={item.platform}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-ink-muted"
          >
            {item.label}
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
              Coming soon
            </span>
          </span>
        );
      })}
    </div>
  );
}
