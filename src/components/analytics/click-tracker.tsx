"use client";

import { useEffect } from "react";
import { useOpenPanel } from "@openpanel/nextjs";
import { pageName } from "@/lib/analytics";

/**
 * Logs a descriptive click event to OpenPanel for every button / role-button /
 * internal-link click, via a single delegated document listener. The event name
 * embeds the page, section and button label (e.g. "button click: Home - Hero -
 * Book Demo"); the same values plus name, id, type and href are sent as
 * properties. Skips elements the SDK already handles: `[data-track]`
 * (trackAttributes) and external links (trackOutgoingLinks). Mounted once in the
 * root layout.
 */
export function ClickTracker() {
  const { track } = useOpenPanel();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const start = e.target as Element | null;
      const el = start?.closest("button, [role='button'], a");
      if (!el) return;

      // Let the SDK own these:
      if (el.closest("[data-track]")) return; // trackAttributes handles it

      const isLink = el.tagName === "A";
      if (isLink) {
        const href = el.getAttribute("href") || "";
        try {
          const url = new URL(href, window.location.href);
          if (url.host !== window.location.host) return; // trackOutgoingLinks handles it
        } catch {
          // relative / hash / invalid href → treat as internal, keep tracking
        }
      }

      const label = (
        el.getAttribute("aria-label") ||
        (el as HTMLElement).innerText ||
        el.getAttribute("title") ||
        ""
      )
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 120);

      const page = window.location.pathname;
      const pageNameValue = pageName(page);
      const section = resolveSection(el);

      // Event name: "button click: <page> - <section> - <button>".
      const eventName = `button click: ${[pageNameValue, section, label]
        .filter(Boolean)
        .join(" - ")}`;

      track(eventName, {
        page_name: pageNameValue,
        page,
        section: section || undefined,
        button_name: label || undefined,
        name: el.getAttribute("name") || undefined,
        id: el.id || undefined,
        type: isLink ? "link" : el.getAttribute("type") || "button",
        href: isLink ? el.getAttribute("href") || undefined : undefined,
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [track]);

  return null;
}

/**
 * Resolves the nearest meaningful section around a clicked element — preferring
 * an explicit `data-section`, then the element id, then an aria-label, then the
 * landmark tag name (section / header / footer / nav / main). Returns undefined
 * when no such ancestor exists.
 */
function resolveSection(el: Element): string | undefined {
  const node = el.closest("[data-section], section, header, footer, nav, main");
  if (!node) return undefined;
  return (
    node.getAttribute("data-section") ||
    node.id ||
    node.getAttribute("aria-label") ||
    node.tagName.toLowerCase()
  );
}
