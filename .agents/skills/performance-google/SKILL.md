---
name: performance-google
description: "Use when doing ANY task involving web performance, page speed, or Core Web Vitals. Triggers: Google PageSpeed Insights, Core Web Vitals, LCP, INP, CLS, TTFB, FCP, Lighthouse audit, render-blocking resources, bundle size optimization, lazy loading, image optimization, code splitting, critical CSS, preload/prefetch, Web Vitals field data, CrUX report, RUM monitoring, main thread blocking, hydration performance, SSR performance, performance budgets, slow website, page load speed."
disable-model-invocation: true
---

# SKILL.md — Google PageSpeed Insights & Core Web Vitals Mastery

> Goal: Pass Core Web Vitals at the 75th percentile of field data (CrUX/RUM), not just Lighthouse lab runs.

## 1. Metrics & Thresholds

| Metric | Measures | Good | Needs Improvement | Poor | Internal Alert (80% buffer) |
|---|---|---|---|---|---|
| LCP (Largest Contentful Paint) | Loading of main content | ≤ 2.5s | 2.5–4.0s | > 4.0s | ≤ 2.0s |
| INP (Interaction to Next Paint) | Responsiveness to all interactions | ≤ 200ms | 200–500ms | > 500ms | ≤ 160ms |
| CLS (Cumulative Layout Shift) | Visual stability | ≤ 0.1 | 0.1–0.25 | > 0.25 | ≤ 0.08 |
| TTFB (diagnostic) | Server response | ≤ 800ms | — | — | ≤ 600ms |
| FCP (diagnostic) | First paint | ≤ 1.8s | — | — | ≤ 1.5s |

Rules:
- A page passes CWV only when **all three** metrics pass at p75, on mobile, in field data.
- Lab (Lighthouse) is for debugging; field (CrUX, RUM) is the source of truth.
- INP replaced FID — optimize *every* interaction, not just the first.

## 2. LCP Playbook
1. Find the LCP element (Lighthouse "Largest Contentful Paint element" / DevTools Performance panel). Usually: hero image, poster frame, or large text block.
2. Images: AVIF/WebP, responsive `srcset` + `sizes`, explicit `width`/`height`, `fetchpriority="high"` on the LCP image only.
3. Preload LCP image: `<link rel="preload" as="image" fetchpriority="high" imagesrcset="...">`.
4. Never lazy-load above-fold images; lazy-load everything below the fold (`loading="lazy"`).
5. Kill render-blocking: defer non-critical JS, inline only critical CSS, remove unused CSS.
6. Server: CDN edge caching, Brotli, HTTP/3, early hints (103), SSR/SSG instead of client-rendered shells.
7. Break LCP into phases and optimize each: TTFB → resource load delay → resource load time → render delay.

## 3. INP Playbook
1. Any task > 50ms is a long task — find them in DevTools Performance (flame chart) and `web-vitals` attribution build.
2. Yield to the main thread: `scheduler.yield()` between chunks of work.
3. Move heavy computation to Web Workers; debounce input handlers; avoid layout thrash (batch DOM reads then writes).
4. Defer hydration/initialization of below-fold components.
5. Audit third parties: analytics, tag managers, chat widgets, ads — load `async`/`defer`, use facade pattern (load real script only on interaction).
6. Angular specifics: Signals + OnPush everywhere, zoneless change detection, `@defer` blocks, `NgOptimizedImage`, virtual scrolling for long lists.

## 4. CLS Playbook
1. Always set dimensions (or `aspect-ratio`) on img, video, iframe, embeds.
2. Reserve fixed slots for ads, banners, cookie notices, late-injected content.
3. Fonts: `font-display: swap` + size-adjusted fallback (`size-adjust`, `ascent-override`) to prevent FOIT/FOUT shift; preload critical fonts.
4. Animate only `transform` and `opacity` — never `top/left/width/height`.
5. Never insert content above the viewport fold unless user-initiated.

## 5. Budgets & CI
- Initial JS ≤ 200KB gzipped (target), ≤ 300KB hard max; initial CSS ≤ 50KB.
- Route-level lazy loading; tree-shaking; no CommonJS dependencies.
- Lighthouse CI on every PR with assertions: LCP, INP proxies (TBT), CLS, and budget limits — fail the build on regression.
- Enforce budgets in `angular.json` (`budgets` array) so `ng build` fails on oversized bundles.

## 6. Measurement Workflow
1. RUM: load `web-vitals` (with attribution), send LCP/INP/CLS/FCP/TTFB to analytics with page, device, connection dimensions.
2. Monitor CrUX in Search Console weekly; segment mobile vs desktop.
3. Lab-test on throttled 4G + mid-tier Android (Moto G class), not just desktop.
4. Debug loop: field data identifies → lab reproduces → fix → verify in next CrUX data.

## 7. Quick-Win Checklist
- [ ] SSR/prerender for all public pages
- [ ] LCP image preloaded with fetchpriority="high"
- [ ] All images dimensioned + modern formats
- [ ] Third-party scripts deferred/facaded
- [ ] Fonts preloaded with metric-matched fallbacks
- [ ] Long tasks chunked or moved off main thread
- [ ] Bundle budgets enforced in CI
- [ ] RUM dashboard live