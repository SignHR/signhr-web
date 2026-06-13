import "server-only";
import type { DesktopBuild, LatestDesktopBuilds } from "./desktop-builds-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 3600;
const DESKTOP_BUILDS_TAG = "desktop-builds";

/** Surface fetch failures during local dev so a misconfigured API isn't an opaque "coming soon". */
function logDevError(context: string, detail: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[desktop-builds] ${context}`, detail);
  }
}

/**
 * The latest published build per platform for a channel, or null when the API
 * is unreachable / unconfigured (callers fall back to the "coming soon" UI).
 */
export async function getLatestDesktopBuilds(
  channel: "stable" | "beta" = "stable",
): Promise<LatestDesktopBuilds | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/builds/desktop/latest?channel=${channel}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags: [DESKTOP_BUILDS_TAG] },
    });
    if (!res.ok) {
      logDevError(`GET /builds/desktop/latest → HTTP ${res.status}`, null);
      return null;
    }
    const json: { data?: { builds?: LatestDesktopBuilds } } = await res.json();
    return json?.data?.builds ?? null;
  } catch (error) {
    logDevError("GET /builds/desktop/latest failed", error);
    return null;
  }
}

/**
 * All published builds (newest first), for the versions/checksums archive.
 * Capped at the backend's max page size (100) — sufficient for the public archive.
 */
export async function getDesktopArchive(
  channel: "stable" | "beta" = "stable",
): Promise<DesktopBuild[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/builds/desktop?channel=${channel}&per_page=100`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags: [DESKTOP_BUILDS_TAG] },
    });
    if (!res.ok) {
      logDevError(`GET /builds/desktop → HTTP ${res.status}`, null);
      return [];
    }
    const json: { data?: { builds?: DesktopBuild[] } } = await res.json();
    return json?.data?.builds ?? [];
  } catch (error) {
    logDevError("GET /builds/desktop failed", error);
    return [];
  }
}
