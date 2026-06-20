import "server-only";
import {
  DESKTOP_PLATFORMS,
  MOBILE_PLATFORMS,
  type AppDownload,
  type Platform,
} from "./app-downloads-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Cache tag for app-download fetches — lets a future webhook flush on edit. */
export const APP_DOWNLOADS_TAG = "app-downloads";

/**
 * ISR window (5 min) — balances freshness against load for rarely-changing
 * download links. For instant updates, pair with on-demand revalidation
 * (revalidateTag on the `app-downloads` tag from an admin publish hook), as
 * careers/marketplace do.
 */
const APP_DOWNLOADS_REVALIDATE_SECONDS = 300;

/** Canonical presentation order, mirroring the backend `DownloadPlatform` enum. */
const PLATFORM_ORDER: Platform[] = [...MOBILE_PLATFORMS, ...DESKTOP_PLATFORMS];

/** Static labels for the offline fallback only — the live API supplies `label`. */
const PLATFORM_LABELS: Record<Platform, string> = {
  app_store: "App Store",
  play_store: "Google Play",
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

/** ResponseBuilder envelope — the collection lives under `data.app_downloads`. */
interface Envelope {
  data?: { app_downloads?: AppDownload[] };
}

/** Every platform marked unavailable — graceful fallback when the API is down. */
function fallbackDownloads(): AppDownload[] {
  return PLATFORM_ORDER.map((platform) => ({
    platform,
    label: PLATFORM_LABELS[platform],
    is_mobile: MOBILE_PLATFORMS.includes(platform),
    available: false,
    version: null,
    file_size_bytes: null,
    download_url: null,
  }));
}

/**
 * The five platforms with their current download state, from the admin-managed
 * `app_downloads` API. ISR-cached (1h) and tagged so edits can be flushed on
 * demand. Degrades to "all coming soon" on any fetch/parse failure rather than
 * throwing, so the page never errors when the API is unreachable.
 */
export async function getAppDownloads(): Promise<AppDownload[]> {
  if (!API_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[app-downloads] NEXT_PUBLIC_API_URL is not set — download links unavailable.",
      );
    }
    return fallbackDownloads();
  }

  try {
    const res = await fetch(`${API_URL}/builds/app-downloads`, {
      headers: { Accept: "application/json" },
      next: {
        revalidate: APP_DOWNLOADS_REVALIDATE_SECONDS,
        tags: [APP_DOWNLOADS_TAG],
      },
    });

    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          `[app-downloads] GET /builds/app-downloads → HTTP ${res.status}`,
        );
      }
      return fallbackDownloads();
    }

    const json = (await res.json()) as Envelope;
    const rows = json.data?.app_downloads;
    if (!rows || rows.length === 0) return fallbackDownloads();

    // Defensive: present in the canonical platform order regardless of API order.
    return [...rows].sort(
      (a, b) =>
        PLATFORM_ORDER.indexOf(a.platform) - PLATFORM_ORDER.indexOf(b.platform),
    );
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[app-downloads] GET /builds/app-downloads failed:",
        (err as Error)?.message,
      );
    }
    return fallbackDownloads();
  }
}
