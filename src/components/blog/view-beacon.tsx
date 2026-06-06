"use client";

import * as React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fires a single fire-and-forget view event per mount:
 *   POST {NEXT_PUBLIC_API_URL}/blog/posts/{slug}/view  → 204
 *
 * Must be client-side: blog pages are ISR-cached, so the server render does
 * not run per visitor. Uses navigator.sendBeacon (non-blocking, survives
 * unload) with a keepalive fetch fallback. Renders nothing.
 */
export function ViewBeacon({ slug }: { slug: string }) {
  const fired = React.useRef(false);

  React.useEffect(() => {
    if (fired.current || !API_URL || !slug) return;
    fired.current = true;

    const url = `${API_URL}/blog/posts/${encodeURIComponent(slug)}/view`;

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.sendBeacon === "function"
      ) {
        // Empty Blob body keeps it a simple POST; backend reads no body.
        const ok = navigator.sendBeacon(url, new Blob([], { type: "text/plain" }));
        if (ok) return;
      }
      void fetch(url, { method: "POST", keepalive: true }).catch(() => {});
    } catch {
      // Never let analytics break the page.
    }
  }, [slug]);

  return null;
}
