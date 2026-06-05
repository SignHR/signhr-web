const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const DEMO_SIZES = ["1-25", "26-100", "101-500", "500+"] as const;
export type DemoSize = (typeof DEMO_SIZES)[number];

export interface LeadInput {
  name: string;
  email: string;
  company: string;
  size: DemoSize;
  phone?: string;
  message?: string;
  plan?: string;
}

export type LeadResult =
  | { status: "ok" }
  | { status: "rate_limited" }
  | { status: "validation"; message: string }
  | { status: "error"; message: string };

function splitName(full: string): { first_name: string; last_name?: string } {
  const parts = full.trim().split(/\s+/);
  const first = parts.shift() ?? "";
  const last = parts.join(" ");
  return last ? { first_name: first, last_name: last } : { first_name: first };
}

export function demoHref(href: string): { isDemo: boolean; plan?: string } {
  if (href !== "/book-demo" && !href.startsWith("/book-demo?")) {
    return { isDemo: false };
  }
  const q = href.indexOf("?");
  if (q === -1) return { isDemo: true };
  const plan = new URLSearchParams(href.slice(q + 1)).get("plan") ?? undefined;
  return { isDemo: true, plan };
}

function toPayload(input: LeadInput) {
  const composed = input.plan
    ? `[Interested in: ${input.plan}] ${input.message ?? ""}`.trim()
    : input.message?.trim() || "";
  const message = composed ? composed.slice(0, 1000) : undefined;

  return {
    ...splitName(input.name),
    email: input.email.trim(),
    company_name: input.company.trim(),
    company_size: input.size,
    phone: input.phone?.trim() || undefined,
    message,
    source: "website" as const,
  };
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  if (!API_URL) {
    return { status: "error", message: "Demo requests are not configured." };
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(toPayload(input)),
    });
  } catch {
    return { status: "error", message: "Network error — please try again." };
  }

  if (res.ok) return { status: "ok" };
  if (res.status === 429) return { status: "rate_limited" };

  const message = await res
    .json()
    .then((d: { message?: string; error?: string }) => d?.message ?? d?.error ?? null)
    .catch(() => null);

  if (res.status === 400) {
    return { status: "validation", message: message ?? "Please check your details." };
  }
  return { status: "error", message: message ?? "Something went wrong — please try again." };
}

// --- Auto-popup cooldown (client-only) ---------------------------------------

const COOLDOWN_KEY = "signhr_demo_cooldown_until";
const COOLDOWN_MS = 3 * 60 * 60 * 1000; // 3 hours

export function isDemoCooldownActive(): boolean {
  if (typeof window === "undefined") return true; // never auto-open during SSR
  const raw = window.localStorage.getItem(COOLDOWN_KEY);
  if (!raw) return false;
  const until = Number(raw);
  return Number.isFinite(until) && Date.now() < until;
}

export function setDemoCooldown(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_MS));
}
