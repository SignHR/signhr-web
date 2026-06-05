# SignHR Marketing Site — Working notes

This is the **public marketing site** for SignHR, separate from the product app. Read `README.md` and `DESIGN.md` before making changes — they cover the routes, the hybrid design system (purple brand + marketing typography), and the conventions for adding pages/posts/features.

## Stack-specific gotchas

- **Next.js 16** — async `params`/`searchParams`, Turbopack default, `next lint` removed (use `pnpm lint` which calls eslint directly), `cacheLife`/`cacheTag` no longer have `unstable_` prefix. See `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` for the full list.
- **lucide-react v1** — brand icons (Github, Twitter, LinkedIn) were dropped. We inline our own SVGs in `src/components/icons/social.tsx`.
- **Motion** — we use `motion` (the unified package), imported as `motion/react`. Not `framer-motion`.
- **Zod 4** — `z.email()` (not `z.string().email()`); `z.enum([...])` works the same.
- **Server-only modules** — `src/lib/blog.ts` reads from `node:fs` and is marked `import "server-only"`. Client components must import types/helpers from `src/lib/blog-types.ts` instead.
- **set-state-in-effect** lint rule (React 19) flags route-change → close-menu effects. The `Navbar`'s `setMobileOpen(false)` on pathname change has an inline `eslint-disable` with a reason — that's the right pattern when you genuinely need to sync UI to external (router) state.
- **Demo lead form** posts to the backend at `NEXT_PUBLIC_API_URL` (`/leads`). Local default `https://sign.signhr.test/api`; prod `https://api.signhr.io/api`. CORS on the backend already allows `api/*` from any origin. If the var is unset, `submitLead` returns a friendly "not configured" error instead of throwing.

## Auto-run rules

- After modifying `next.config.ts`, `postcss.config.mjs`, or `tsconfig.json`, restart `pnpm dev`.
- After `pnpm add`/`pnpm remove`, restart `pnpm dev`.
- Before declaring any UI work done, run `pnpm lint && pnpm build`. Lint should be clean; build should be 0 errors / 0 warnings.

## See also

- Parent monorepo `CLAUDE.md` (one level up) — covers SignHR-wide preferences (max effort mode, no unsolicited commits, review-grade code).
- `AGENTS.md` — Next 16 reminder to consult `node_modules/next/dist/docs/` before writing Next code.

@AGENTS.md
