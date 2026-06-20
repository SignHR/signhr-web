/**
 * Shared, client-safe types and helpers for the SignHR app-download platforms.
 *
 * The live download state is fetched server-side via `getAppDownloads()` in
 * `app-downloads.ts` (server-only). This module holds only types, ordering,
 * static badge assets, and formatting helpers, so client components (e.g. the
 * OS-detecting desktop panel) can import them safely.
 */

/** The five platforms SignHR ships — mirrors the backend `DownloadPlatform` enum. */
export type Platform = "app_store" | "play_store" | "macos" | "windows" | "linux";

/** A single platform's public download state, as returned by `GET /builds/app-downloads`. */
export interface AppDownload {
  platform: Platform;
  /** Human label, e.g. "App Store", "macOS". */
  label: string;
  is_mobile: boolean;
  /** True when active and backed by an installer file or external link. */
  available: boolean;
  version: string | null;
  file_size_bytes: number | null;
  /** Resolved store/download URL, or null when unavailable. */
  download_url: string | null;
}

/** Mobile store platforms, in presentation order. */
export const MOBILE_PLATFORMS: Platform[] = ["app_store", "play_store"];

/** Desktop platforms, in presentation order. */
export const DESKTOP_PLATFORMS: Platform[] = ["macos", "windows", "linux"];

/**
 * Official store badge assets (in `/public`). The live API supplies the link;
 * the badge image is kept here and used unaltered per Apple/Google brand
 * guidelines.
 */
export const STORE_BADGES: Partial<
  Record<Platform, { src: string; width: number; height: number; alt: string }>
> = {
  app_store: {
    src: "/app-store-badge.webp",
    width: 120,
    height: 40,
    alt: "Download SignHR on the App Store",
  },
  play_store: {
    src: "/google-play-badge.webp",
    width: 130,
    height: 40,
    alt: "Get SignHR on Google Play",
  },
};
