import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) — the only third-party marketing tag loaded here.
 * Loaded via `next/script` with `lazyOnload` so it stays off the critical path
 * and fires on idle, after the page is interactive. SPA route-change page views
 * are handled separately (see the design spec).
 */
const GA_MEASUREMENT_ID = "G-G1WBN3X6ZT";

export function MarketingScripts() {
  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
