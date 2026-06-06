const API_URL = process.env.NEXT_PUBLIC_API_URL;
const WORKSPACE_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_WORKSPACE_BASE_DOMAIN || "signhr.io";

export type WorkspaceLookup =
  | { status: "found"; slug: string; name: string; logo: string | null }
  | { status: "not_found" }
  | { status: "rate_limited" }
  | { status: "error"; message: string };

type WorkspacePayload = {
  found: boolean;
  slug?: string;
  name?: string;
  logo?: string | null;
};

/** Lowercase, trim, and reduce a pasted URL/host to a bare slug. */
export function normalizeWorkspaceInput(raw: string): string {
  let v = raw.trim().toLowerCase();
  v = v.replace(/^https?:\/\//, ""); // strip protocol
  v = v.split("/")[0]; // drop any path
  v = v.split(".")[0]; // leading subdomain label ("acme.signhr.io" → "acme")
  v = v.replace(/[^a-z0-9-]/g, ""); // slug-safe only
  return v;
}

/** Tenant workspace URL for a slug, e.g. https://acme.signhr.io */
export function workspaceUrl(slug: string): string {
  return `https://${slug}.${WORKSPACE_BASE_DOMAIN}`;
}

/** Verify a workspace exists & is active via the public backend endpoint. */
export async function lookupWorkspace(rawName: string): Promise<WorkspaceLookup> {
  const slug = normalizeWorkspaceInput(rawName);
  if (!slug) return { status: "not_found" };
  if (!API_URL) {
    return { status: "error", message: "Login isn't configured right now." };
  }

  let res: Response;
  try {
    res = await fetch(
      `${API_URL}/workspace/found?workspace=${encodeURIComponent(slug)}`,
      { headers: { Accept: "application/json" } },
    );
  } catch {
    return { status: "error", message: "Network error — please try again." };
  }

  if (res.status === 429) return { status: "rate_limited" };
  if (!res.ok) {
    return { status: "error", message: "Something went wrong — please try again." };
  }

  const ws = await res
    .json()
    .then(
      (d: {
        data?: { workspace?: WorkspacePayload };
        workspace?: WorkspacePayload;
      }) => d?.data?.workspace ?? d?.workspace ?? null,
    )
    .catch(() => null);

  if (!ws || !ws.found) return { status: "not_found" };
  return {
    status: "found",
    slug: ws.slug ?? slug,
    name: ws.name ?? slug,
    logo: ws.logo ?? null,
  };
}
