import Script from "next/script";

/**
 * Third-party marketing/analytics pixels — Google Analytics 4, the LinkedIn
 * Insight Tag, and the Meta (Facebook) Pixel. Each is loaded once via
 * `next/script` (`afterInteractive`) and rendered in the root layout, with the
 * `<noscript>` fallbacks for LinkedIn and Meta. Every snippet fires its own
 * initial page view on load; SPA route-change page views are handled separately
 * (see the design spec).
 */
const GA_MEASUREMENT_ID = "G-G1WBN3X6ZT";

export function MarketingScripts() {
  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
