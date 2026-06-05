/**
 * Shared helpers for deriving human-friendly analytics labels from a pathname.
 * Used by the click tracker and the page-view tracker so event names stay
 * consistent across both.
 */

/**
 * A friendly page name derived from a pathname:
 * "/" → "Home", "/pricing" → "Pricing", "/features/ask-hr" → "Features / Ask Hr".
 */
export function pageName(pathname: string): string {
  if (pathname === "/") return "Home";
  return pathname
    .split("/")
    .filter(Boolean)
    .map((seg) =>
      seg.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    )
    .join(" / ");
}

/**
 * A compact page URL token for event names — the pathname without its leading
 * slash. Home stays "/"; "/features/ask-hr" → "features/ask-hr".
 */
export function pageUrl(pathname: string): string {
  return pathname === "/" ? "/" : pathname.replace(/^\/+/, "");
}
