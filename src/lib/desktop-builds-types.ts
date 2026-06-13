export type DesktopPlatform = "windows" | "macos" | "linux";

export interface DesktopBuildFile {
  id: number;
  arch: string | null;
  format: string;
  source: "upload" | "url";
  file_name: string;
  file_size_bytes: number | null;
  checksum_sha256: string | null;
  download_count: number;
  download_url: string;
  label: string;
}

export interface DesktopBuild {
  id: number;
  platform: DesktopPlatform;
  version: string;
  channel: "stable" | "beta";
  release_notes: string | null;
  status: "draft" | "published";
  published_at: string | null;
  is_latest: boolean;
  total_downloads: number;
  files: DesktopBuildFile[];
  created_at: string;
}

export interface LatestDesktopBuilds {
  windows: DesktopBuild | null;
  macos: DesktopBuild | null;
  linux: DesktopBuild | null;
}

export const DESKTOP_PLATFORM_LABELS: Record<DesktopPlatform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

/** Pick the recommended default file for a platform's "one-click" button. */
export function pickPrimaryFile(build: DesktopBuild): DesktopBuildFile | null {
  if (build.files.length === 0) return null;
  const preferred: Record<DesktopPlatform, (f: DesktopBuildFile) => boolean> = {
    macos: (f) => f.arch === "arm64",
    windows: (f) => f.format === "exe",
    linux: (f) => f.format === "AppImage",
  };
  return build.files.find(preferred[build.platform]) ?? build.files[0];
}

export function formatBuildSize(bytes: number | null): string | null {
  if (bytes == null) return null;
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}
