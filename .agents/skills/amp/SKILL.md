---
name: amp
description: "Use when doing ANY task involving AMP (Accelerated Mobile Pages). Triggers: AMP HTML, amp-img, amp-video, amp-story, amp-carousel, AMP validator, AMP cache, rel=amphtml, AMP boilerplate, AMP Email, Web Stories, AMP status report, mobile page acceleration, amp.dev components, legacy AMP migration, AMP deprecation."
disable-model-invocation: true
---

# SKILL.md — AMP (Accelerated Mobile Pages) Mastery

> Context (2026): AMP is no longer a ranking requirement or Top Stories gate. A fast canonical page beats AMP. This skill covers: (1) when AMP still makes sense, (2) how to build/maintain valid AMP, (3) AMP Email and Web Stories, (4) migration/deprecation strategy.

## 1. Decision Framework — Should You Use AMP?
- New builds: **No.** Invest in Core Web Vitals on canonical responsive pages instead.
- Maintain existing AMP: yes, if it still drives measurable traffic/conversions; otherwise plan migration.
- Still valid uses: AMP Email (Gmail interactive emails), Web Stories (Discover/social surfaces), legacy publishing stacks where AMP infrastructure already exists.
- Pilot rule: if evaluating AMP, run it on 1–2 templates (e.g. articles), measure before/after (CWV, impressions, engagement), scale only on clear stable gains.

## 2. AMP Architecture (Three Parts)
- **AMP HTML**: restricted HTML — custom elements replace standard ones (`<img>` → `<amp-img>`, `<video>` → `<amp-video>`, `<iframe>` → `<amp-iframe>`).
- **AMP JS**: the runtime (`v0.js`) — sandboxed, async-only, ~150KB; custom author JS is forbidden (use `amp-script` for limited cases).
- **AMP Cache**: Google's CDN that pre-renders and serves valid AMP for near-instant delivery.

## 3. Valid AMP Document — Mandatory Boilerplate
```html
<!doctype html>
<html amp>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Page Title</title>
  <link rel="canonical" href="https://yoursite.com/canonical-page/">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
</head>
<body><!-- content --></body>
</html>
```
Every valid AMP doc requires: doctype, `<html amp>` (or `<html ⚡>`), head+body, charset first in head, the v0.js runtime, canonical link, viewport meta, and the boilerplate CSS.

## 4. Core Rules & Restrictions
- No author-written JavaScript (except via `amp-script`); all interactivity through AMP components.
- CSS: single inline `<style amp-custom>`, max 75KB; no `!important` (except allowlisted), no external stylesheets (fonts via allowlisted providers).
- All media dimensioned: every `amp-img`/`amp-video`/`amp-iframe` requires explicit `layout` and sizes — this is how AMP guarantees CLS ≈ 0.
- Custom components require their script in head, e.g.:
  `<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>`
- Standardized component library: define allowed templates, image rules (formats, dimensions, weight), and interactive blocks up front — don't accumulate exceptions.

## 5. SEO & Parity Requirements
- Bidirectional linking: canonical page has `<link rel="amphtml" href="...amp-url">`, AMP page has `<link rel="canonical">` back.
- **Content parity**: same content, headings, key navigation, and actions on AMP and canonical versions.
- **Structured data parity**: identical JSON-LD on both versions.
- Validate with the AMP Test Tool + Rich Results Test; monitor the AMP status report in Search Console and validate fixes there.
- Ensure AMP pages aren't blocked by robots/noindex/login, and the canonical correctly links to them.

## 6. AMP Email (still a strong use case)
- Send interactive emails (carousels, forms, accordions) inside Gmail via AMP components.
- Requirements: AMP MIME part (`text/x-amp-html`) alongside HTML/plain fallbacks, sender registration with Google, SPF/DKIM/DMARC aligned, dynamic content requests handled with proper authentication (CORS for AMP email).
- Test against Gmail's requirements before every campaign; always provide a working HTML fallback.

## 7. Web Stories (amp-story)
- Structure: `<amp-story standalone>` is the **only direct child** of `<body>`; pages inside via `<amp-story-page>` (each with unique `id`), layers via `<amp-story-grid-layer>`.
- Assets designed at 9:16 aspect ratio; use `amp-img`/`amp-video` inside layers.
- Canonical points to the story URL itself; implement required metadata (publisher, poster, title) for Google Discover eligibility.
- Embed stories into regular pages with `<amp-story-player>` + `<a href="story-url">` children.

## 8. Quality Gates (per release)
- [ ] Page validates (AMP validator / AMP Test Tool) with zero errors
- [ ] Content + structured data parity with canonical verified
- [ ] CLS ≈ 0 and LCP ≤ 2.5s on the AMP version
- [ ] Analytics tagging plan tested (critical events fire)
- [ ] Accessibility: contrast, font sizes, tap targets on mobile
- [ ] Search Console AMP report clean; fixes validated

## 9. Migration / Deprecation Strategy (when retiring AMP)
1. Confirm canonical pages pass CWV before touching AMP.
2. Remove `rel="amphtml"` links from canonical pages.
3. 301 redirect AMP URLs → canonical URLs (or serve canonical directly).
4. Remove AMP from sitemaps; monitor Search Console for residual AMP impressions.
5. Keep AMP Email and Web Stories if they independently perform — they're separate ecosystems from AMP pages.