export type AppPlatformKey = "ios" | "android" | "macos" | "windows";

export type AppPlatform = {
  key: AppPlatformKey;
  /** Shown on the "Coming soon" pill and the desktop download button. */
  label: string;
  /** null → "Coming soon". Set to a real store/download URL to go live. */
  href: string | null;
  /** Official store badge asset (used for iOS/Android once live). */
  badge?: { src: string; width: number; height: number; alt: string };
};

// To go live: set `href` to the store/download URL. iOS/Android badge assets live
// in public/ (official store badges, used unaltered per Apple/Google brand
// guidelines). macOS/Windows render a "Coming soon" pill until they get an href.
export const APP_DOWNLOADS: AppPlatform[] = [
  {
    key: "ios",
    label: "App Store",
    href: "https://apps.apple.com/in/app/signhr/id6767882933",
    badge: {
      src: "/app-store-badge.webp",
      width: 120,
      height: 40,
      alt: "Download SignHR on the App Store",
    },
  },
  {
    key: "android",
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.st.signhr",
    badge: {
      src: "/google-play-badge.webp",
      width: 130,
      height: 40,
      alt: "Get SignHR on Google Play",
    },
  },
  // Desktop apps — render a "Coming soon" pill until they get a download URL.
  // To go live: set `href` to the installer/download link (e.g. a .dmg / .exe
  // or a releases page).
  {
    key: "macos",
    label: "macOS",
    href: null,
  },
  {
    key: "windows",
    label: "Windows",
    href: null,
  },
];
