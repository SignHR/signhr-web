"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useOpenPanel } from "@openpanel/nextjs";
import { pageName, pageUrl } from "@/lib/analytics";

/**
 * Fires a "screen view" event on initial load and on every App Router route
 * change. The event name is the constant "screen view"; the friendly page name
 * and page url ride along as properties. This replaces the SDK's generic auto
 * screen-view (disabled via `trackScreenViews={false}` in the layout) so page
 * visits land under one event in OpenPanel. Mounted once in the root layout.
 */
export function PageViewTracker() {
  const { track } = useOpenPanel();
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const pageNameValue = pageName(pathname);
    const pageUrlValue = pageUrl(pathname);

    track("screen_view", {
      page_name: pageNameValue,
      page_url: pageUrlValue,
      page: pathname,
    });
  }, [pathname, track]);

  return null;
}
