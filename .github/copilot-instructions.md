# DropLab — Copilot Instructions

> Auto-loaded for every Copilot request in this workspace. Keep it accurate and concise.

## Project

DropLab — premium air-suspension e-commerce + marketing site for a Belgrade shop (droplab.rs). Serbian is the primary locale (`sr`, no URL prefix); `en` is prefixed. Currency EUR, contacts +381.

## Stack (exact versions — do not guess)

- **Next.js 16.3.6** (App Router, React Server Components, `params`/`searchParams` are **Promises**)
- React 19.3.0, TypeScript 5.5.4 (strict), Tailwind CSS 3.4.7
- next-intl ^4.13.2 (plugin wired to `./src/i18n.ts` in `next.config.mjs`)
- Supabase: `@supabase/ssr` ^0.12.3 + `@supabase/supabase-js` ^2.110.0
- Resend ^6.17.2 (transactional email), sharp, lucide-react

## Commands

```bash
npm run dev        # next dev -H 0.0.0.0 (network-accessible)
npm run build      # next build
npm run start      # next start
npm run lint       # eslint .
npm run format     # prettier --write .
npx tsc --noEmit   # type check
```

`.husky/pre-commit` runs `npm run lint` on the **whole repo** — any lint error anywhere blocks the commit.

## Architecture

### Routing & i18n

- All pages live under `app/[locale]/` (`about`, `shop`, `shop/[slug]`, `fitment`, `fitment/checkout`, `gallery`, `gallery/[projectId]`, `cart`, `contact`, `faq`, `admin`).
- `app/[locale]/layout.tsx` must keep `generateStaticParams()` returning the locale list, or SSG child pages break with dynamic-server-usage errors.
- Locale config: `src/locales.ts` (`locales = ["sr","en"]`, `defaultLocale = "sr"`). Navigation helpers from `src/navigation.ts` (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`) — **never** raw `next/link` / `next/navigation` in route code.
- `localePrefix: "as-needed"` → `sr` unprefixed, `en` prefixed. Browser locale detection is **off** (`proxy.ts`), default is Serbian.
- Root `app/layout.tsx` hardcodes `<html lang="sr">`; per-locale metadata comes from `generateMetadata` in the locale layout.

### Middleware → `proxy.ts` (Next 16 codemod)

- `proxy.ts` (NOT `middleware.ts`) does two jobs: next-intl locale routing for non-admin paths + admin session enforcement for `/admin/*` (except `/admin/login`).
- Admin auth: Supabase `auth.getUser()` + `ADMIN_EMAILS` env allow-list (comma-separated, lowercased). Redirects to locale-aware `/admin/login?redirect=...` (locale prefix stripped to avoid double-prefixing).
- Matcher excludes `api`, `_next`, `_vercel`, static files.

### Data sources (source of truth)

- `lib/products.ts` — canonical catalog. `PRODUCTS` array: 4 kits (`dl-street` €2590, `dl-performance` €2990, `dl-track` €3990, `dl-suv` €4290) + parts (`dl-manifold`, `dl-tank-5gal`, `dl-compressor`). Helpers: `getProduct`, `getLocalizedProduct` (per-field Serbian `localized*` overrides with **English fallback** — separate from next-intl messages), `getLocalizedParts`, `getKits`, `getParts`, `getDefaultKit` (throws if no kit), `isKitSlug`/`isPartSlug`. Product type: `"kit" | "part"`.
- `lib/seo.ts` — all SEO helpers + JSON-LD schema builders: `buildAlternates` (canonical + hreflang + x-default), `buildOpenGraph`, `buildTwitter`, `buildOrganizationSchema`, `buildWebSiteSchema`, `buildLocalBusinessSchema`, `buildContactPageSchema`, `buildAboutPageSchema`, `buildFAQSchema`, `buildBreadcrumbSchema`. `SITE_URL` from `NEXT_PUBLIC_SITE_URL` (fallback `https://droplab.rs`).
- `lib/types.ts` — Supabase Row/Insert types (`Make`, `Model`, `ModelYear`, `Order`, `OrderItem` + `*Insert`) and slim `Pick` projections (`MakeOption`, `ModelOption`, `ModelYearOption`) for fitment UI. Generated types in `supabase/types/database.types.ts` — **regenerate after schema changes**.
- Supabase tables (public): `makes`, `models`, `model_years`, `orders`, `order_items`, `contacts`. Migrations under `supabase/migrations/`.
- `lib/gallery.ts` — static gallery source. `lib/fitment-order.ts` — client-side fitment checkout helper. `lib/phone.ts` — phone validation. `lib/fitments.ts` is **legacy** — do not use for new fitment work.

### Cart & orders

- `app/cart/CartContext.tsx` — client context (`"use client"`), in-memory, **parts-only**: `CartProvider.add()` rejects kit payloads. Kits must not enter the shop cart.
- Orders route through `app/api/orders/route.ts` with two channels: `shop` (parts-only, `items` array required, **vehicle-free**) and `fitment` (server resolves default kit + vehicle metadata). Never persist vehicle fields on a shop order.
- Email via Resend; product names/totals sourced from `lib/products.ts`, not a new DB source.

### Path alias

`@/*` → repo root (e.g. `@/lib/seo`, `@/components/Navbar`, `@/app/cart/CartContext`).

## Conventions

- API route handlers: return `NextResponse.json(...)`; validate params up front → `400 { error }`; DB failures → `500` with Supabase `error.message`. Keep fitment response shapes slim and explicit.
- Client components must start with `"use client"`.
- Styling: use tokens from `tailwind.config.ts` (`ink.*`, `accent` cyan, `ember`) and utility classes in `app/globals.css` (`.btn`, `.btn-primary`, `.card`, `.container-x`, `.h-display`, `.gradient-text`) — don't reinvent.
- Images: `next/image` with `fill` + `object-cover` + explicit `sizes` (missing `sizes` → build warning). Assets in `public/images/` and `public/logo/`.
- Messages in `messages/en.json` / `messages/sr.json`. next-intl arrays are index-accessed — **keep array lengths in parity** between locales.

## Known gotchas

- **ESLint must stay on ^9.** ESLint 10 crashes (`contextOrFilename.getFilename is not a function`) because `eslint-plugin-react` 7.37.5 supports ≤9.
- `export const instant = false` is only valid when `next.config.mjs` has `cacheComponents: true` — it doesn't, so don't use it (build fails).
- `params` is a `Promise` in Next 16 — `await` it in pages/layouts/`generateMetadata`.
- NAP/phone consistency: 3 variants exist in the repo — old `+381 11 555 0142` (in `lib/seo.ts` `buildOrganizationSchema` + `buildLocalBusinessSchema`), placeholder `+381 11 123 4567`, current `+381 60 34 34 490` (Footer, contact, llms.txt). Use the current one; fix schema builders if touching NAP.
- Logo path inconsistency: `lib/seo.ts` uses `/logo/logo.svg`, metadata uses `/logo/SVG/logo-wide.svg`. Both exist; prefer the SVG variants under `/logo/SVG/`.
- `app/sitemap.ts` includes the `cart` route while `robots.txt` only disallows `/api/` — cart likely should be noindex.
- `buildAboutPageSchema` timeline text ("started in 2026… Seven years later") is internally inconsistent — verify before reusing.
- FAQ counts currently mismatch: `en.json` 16 vs `sr.json` 17.
- No test framework — verify via `npm run build`, `npm run lint`, `npx tsc --noEmit`, and direct route behavior.

## Env vars needed

```
NEXT_PUBLIC_SITE_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_EMAILS=...
```
