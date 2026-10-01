---
name: performance
description: "Use when doing ANY task involving performance optimization. Triggers: Next.js performance, React rendering optimization, image optimization, bundle analysis, caching strategies, database query optimization, Supabase performance, CDN, lazy loading, code splitting, prefetching, server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), Core Web Vitals (LCP, FID, CLS), font optimization, third-party script optimization."
---

# Performance

## Core Principles

**1. Measure first — never optimize without data.**
Before making any performance changes, measure with:
- `npm run build` then analyze bundle with `@next/bundle-analyzer`
- Lighthouse CI or `npx lighthouse <url>` for Core Web Vitals
- Chrome DevTools Performance tab for runtime profiling
- React DevTools Profiler for component render analysis

**2. Prioritize by impact.**
Focus on changes that move Core Web Vitals the most:
1. Largest Contentful Paint (LCP) — optimize hero images, fonts, SSR
2. Cumulative Layout Shift (CLS) — reserve space for images, ads, embeds
3. Interaction to Next Paint (INP) — reduce JS bundle, optimize event handlers

## Next.js Specific

### Image Optimization
- Always use `next/image` `Image` component — never raw `<img>`
- Set explicit `width` and `height` to prevent CLS
- Use `priority` for above-the-fold hero images
- Use `placeholder="blur"` with `blurDataURL` for smooth loading
- Configure `remotePatterns` in `next.config.mjs` for external images

### Font Optimization
- Use `next/font` — never import fonts via CSS `<link>`
- Prefer `font-display: swap` (automatic with `next/font`)
- Self-host fonts when possible to avoid external request overhead
- Preload critical fonts with `font-display: swap`

### Bundle Analysis
```bash
npm install --save-dev @next/bundle-analyzer
```
```js
// next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(module.exports)
```
```bash
ANALYZE=true npm run build
```

### Code Splitting & Lazy Loading
- Use `next/dynamic` for client-side dynamic imports
- Lazy load non-critical components, modals, accordions
- Use `loading` fallback for Suspense boundaries
- Split large third-party libraries (e.g., `react-quill`, `leaflet`)

### Caching Strategies
- Use `Cache-Control` headers via `fetch` in server components
- Set `revalidate` for ISR — shorter for dynamic, longer for static
- Use `lru-cache` for expensive computations in API routes
- Cache Supabase queries with `staleTime` in client components

### Server Components vs Client Components
- Prefer Server Components by default — they send 0 bytes of JS
- Mark with `'use client'` only when you need hooks, browser APIs, or event handlers
- Move heavy logic to Server Components; keep Client Components thin
- Use `Suspense` for streaming server-rendered content

### Build Optimization
- Enable `experimental.turbo` in `next.config.mjs` for faster builds
- Use `next/image` with `unoptimized` for static exports
- Set `output: 'export'` for static-only sites (no SSR needed)
- Prerender static pages with `generateStaticParams`

## React Rendering

### Re-render Prevention
- Wrap event handlers in `useCallback` when passing to memoized children
- Use `useMemo` for expensive calculations
- Use `React.memo` for components that re-render with same props
- Avoid anonymous functions in JSX props — they break memoization

### State Management
- Keep state as local as possible — lift only when needed
- Use `useTransition` for non-urgent updates (React 18)
- Split large state objects into multiple `useState` calls
- Use `useReducer` for complex state logic

## Database (Supabase)

### Query Optimization
- Use `select()` to fetch only needed columns — never `select('*')`
- Use `eq()` instead of `like()` for exact matches
- Add indexes on filtered/sorted columns
- Use `gte()`/`lte()` for range queries on indexed columns
- Avoid `or()` filters — they prevent index usage
- Use `count: 'exact'` only when needed — `planned` is faster for large tables

### Connection Pooling
- Use `supabase-js` connection pooling for high-traffic apps
- Set `dbpool` in `supabase/config.toml` for local dev
- Use `supabase functions serve` for edge functions to reduce latency

## Third-Party Scripts

### Script Loading Strategy
- Use `next/script` with `strategy="lazyOnload"` for non-critical scripts
- Use `strategy="afterInteractive"` for analytics
- Use `strategy="beforeInteractive"` only for critical scripts (e.g., consent manager)
- Always set `async` or `defer` on third-party scripts

## Monitoring

### Core Web Vitals
- Use `next/script` with `reportWebVitals` to track metrics
- Send metrics to analytics (Vercel Analytics, GA4, etc.)
- Monitor LCP, FID, CLS in production

```js
// next.config.mjs
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics
}
```

## Checklist

Before deploying performance changes:
- [ ] Bundle analyzed with `@next/bundle-analyzer`
- [ ] Lighthouse score >90 for LCP, CLS, FID
- [ ] Images use `next/image` with width/height
- [ ] Fonts use `next/font` with `display: swap`
- [ ] Server Components used by default, Client Components only when needed
- [ ] Dynamic imports used for heavy components
- [ ] Caching headers set on API routes
- [ ] Supabase queries select only needed columns
- [ ] Third-party scripts use `next/script` with proper strategy
