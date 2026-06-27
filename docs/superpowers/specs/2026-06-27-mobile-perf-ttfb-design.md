# Mobile Performance / TTFB Remediation — Design Spec

**Date:** 2026-06-27
**Project:** signhr-web (Next.js 16 on Vercel)
**Status:** Approved design — ready to implement

## Problem (measured, mobile field data)

| Metric | Value | Target |
|---|---|---|
| TTFB | 2.5s | <0.8s |
| FCP | 4.4s | <1.8s |
| LCP | 4.8s | <2.5s |
| CLS | 0.00 | <0.1 ✅ |
| INP | N/A | — |

FCP and LCP cascade almost entirely from the **2.5s TTFB**. CLS is already perfect.

## Diagnosis (verified, not the report's guesses)

`signhr.io` is hosted on **Vercel** (`server: Vercel`, edge `bom1`/Mumbai), not a VPS. Verified via live headers:

- The home page is **prerendered + ISR** (`x-nextjs-prerender: 1`, `x-vercel-cache: HIT`); warm edge TTFB ≈ 0.1s. Static assets are `immutable`, edge-cached. So the frontend is already well-optimized (text hero → text LCP, `next/image`+AVIF/WebP, `next/font` `swap`).
- **No `vercel.json`** → serverless/ISR functions default to **`iad1` (US-East)** (`x-vercel-id: bom1::iad1::…`), while users + backend (`api.signhr.io`, nginx, India; S3 `ap-south-1`) are in India. So every **cache MISS / cold edge** renders in the US *and* makes a cross-continent backend call → slow origin renders.
- ISR `revalidate` is 5 min on most pages → for lower traffic, edges go cold often, so a large share of real visits hit **MISS → US origin**. That is what produces a 2.5s *field* TTFB despite ~0.1s warm HITs.
- `signhr.io` **307-redirects to `www.signhr.io`**, but code `SITE_URL`/canonical/OG/sitemap all use `signhr.io` — a redirect hop + a canonical-vs-served mismatch.

## What to IGNORE from the audit report (expert correction)

The report assumed a slow VPS with no CDN. Wrong. On Vercel these are already handled or counterproductive:
- **Do NOT add Cloudflare / "Cache Everything" / APO** — Vercel is already the edge CDN; double-proxying it is discouraged and can break ISR/edge.
- Brotli, HTTP/3, asset minify/caching, `compress: true` — already provided by Vercel.
- "Move to a faster VPS" — already on edge.
- Hero image/video/lottie, `next/image`, `next/font`, `font-display: swap`, image WebP/AVIF — already done; the hero is text.

## Decisions

- **Canonical = apex `signhr.io`** (matches existing code; no `SITE_URL` change). The redirect direction gets flipped to `www → signhr.io` (ops).
- **ISR revalidate windows: unchanged** (per request).

## Changes — code/config in `signhr-web` (implemented here)

1. **`vercel.json`** (new) — pin functions to Mumbai so origin renders + the India backend call are local:
   ```json
   { "regions": ["bom1"] }
   ```
   This is the primary TTFB lever (attacks the MISS→US-origin path). Affects ISR revalidation renders and all `ƒ` routes (`/api/*`, careers, OG images).

2. **Resource hints** in `src/app/layout.tsx` — render `<link>` hints (React 19 hoists to `<head>`) for the GA hosts the browser actually connects to:
   - `preconnect` + `dns-prefetch` → `https://www.googletagmanager.com` (GA script)
   - `preconnect` + `dns-prefetch` → `https://www.google-analytics.com` (GA beacon)
   Note: blog cover images are **not** hinted — `next/image` proxies them through same-origin `/_next/image`, so the browser never connects to S3 directly. Fonts are same-origin (`next/font`). Small win; no risk.

3. **`src/components/analytics/marketing-scripts.tsx`** — change GA `strategy` from `afterInteractive` to **`lazyOnload`** (defers GA off the critical path; analytics fire on idle — acceptable for marketing). Fix the stale comment (it claims LinkedIn + Meta pixels that aren't actually loaded — only GA is).

## Changes — infrastructure/ops checklist (YOU do; I cannot from the repo)

1. **Vercel → Project → Domains:** make `signhr.io` the **primary** domain and set the redirect to **`www.signhr.io → signhr.io`** (currently reversed). This removes the apex redirect hop and makes the served URL match the canonical.
2. **Deploy** so `vercel.json` takes effect, then verify functions moved: `curl -sI https://signhr.io/ | grep x-vercel-id` should show `…::bom1::…` (not `iad1`).
3. **Do not add Cloudflare** or any proxy in front of Vercel.
4. (Optional, biggest extra win for low traffic) consider raising ISR `revalidate` later if field TTFB is still hurt by cold edges — deferred per decision.

## Verification

- `pnpm lint && pnpm build` → 0 errors / 0 warnings (dev server stopped first; building clobbers a live `next dev`).
- `vercel.json` is valid JSON and Vercel-schema-correct.
- Built home HTML contains the `preconnect`/`dns-prefetch` `<link>`s in `<head>`.
- GA `<script>` uses `lazyOnload`.
- After deploy: `x-vercel-id` shows `bom1`; re-run PageSpeed (lab improves immediately; **field/CrUX data improves gradually** as the 28-day window rolls and edges stay warm).

## Out of scope

- `SITE_URL`/canonical changes (apex already correct).
- ISR revalidate changes (per decision).
- Any backend (`api.signhr.io`) performance work.
