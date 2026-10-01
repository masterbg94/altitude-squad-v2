---
name: seo-aeo
description: "Use when doing ANY task involving SEO or AI search optimization. Triggers: SEO optimization, meta tags, structured data (JSON-LD), sitemap.xml, robots.txt, Open Graph tags, Twitter Cards, canonical URLs, hreflang tags, keyword optimization, schema.org markup, alt text for images, heading structure (H1-H6), internal linking, URL structure, content optimization, SEO audit, Google Search Console, indexing issues, E-E-A-T, topical authority, AI SEO, GEO, generative engine optimization, llms.txt, AI Overviews, ChatGPT citations, Perplexity citations, answer engine optimization."
disable-model-invocation: true
---
# SKILL.md — Classic SEO + AI SEO (GEO) Mastery

> Goal: Rank in classic search AND get retrieved, cited, and recommended by AI engines (ChatGPT, Google AI Overviews, Perplexity, Claude).

## PART A — Classic SEO

### A1. Technical Foundations
- Rendering: SSR or prerendering for every indexable route — never CSR-only for content pages.
- Crawlability: clean robots.txt, XML sitemap (auto-generated, fresh, referenced in robots.txt), no orphan pages, crawl depth ≤ 3 clicks.
- URLs: short, lowercase, hyphenated, semantic, stable. 301 for moves, 410 for gone content, zero redirect chains.
- Canonicals on every page; correct handling of pagination, filters, and faceted navigation (canonical/noindex rules decided deliberately).
- hreflang for multi-language sites (bidirectional, self-referencing).
- HTTPS everywhere + HSTS; mobile-first; CWV passing (see performance skill).
- Pagination/parameter hygiene: don't let infinite combinations explode the crawl budget.

### A2. On-Page
- Unique `<title>` per page: 50–60 chars, primary keyword early, brand last.
- Unique meta description: 150–160 chars, benefit-driven, written for CTR.
- One H1 per page; logical H2/H3 hierarchy containing natural keyword variants.
- Descriptive alt text on meaningful images; descriptive anchor text for internal links (never "click here").
- Internal linking: pillar pages link to clusters and back; contextual links inside body content.

### A3. Structured Data (JSON-LD)
- Core schemas: Organization, WebSite (+ SearchAction), BreadcrumbList.
- Content schemas as applicable: Article/BlogPosting, Product (+ Offer, AggregateRating), FAQPage, HowTo, Event, VideoObject.
- Validate with Rich Results Test on every template change; markup must match visible content exactly (parity rule).

### A4. Content Strategy
- Search intent first: identify intent type (informational/commercial/transactional/navigational) and match the format before writing.
- E-E-A-T: real named authors with credentials, cited sources, firsthand experience and original data, visible publish/update dates.
- Topical authority: pillar + cluster architecture, fully interlinked, covering the topic completely rather than scattering keywords.
- Refresh decaying content quarterly; consolidate or prune thin/duplicate pages.

## PART B — AI SEO / GEO (Generative Engine Optimization)

### B1. Answer-First Content Structure
- First 1–2 sentences under each heading = a complete, self-contained answer (extractable passage).
- Clean H2/H3 hierarchy; each section must make sense when read alone (AI engines quote passages, not pages).
- FAQ blocks with direct question → concise answer pairs; TL;DR summaries under long sections.
- Prefer tables, lists, definitions, step sequences — structured formats extract best.
- Write unambiguous statements: name entities explicitly instead of pronouns ("Angular Signals do X" not "They do X").

### B2. Be a Citable Source
- Publish original assets: benchmarks, data studies, firsthand tests, expert commentary — AI engines prefer primary sources over rehashed content.
- Keep facts precise, current, and consistent across pages; contradictions reduce citability.
- Visible `datePublished` / `dateModified`; update high-value pages regularly (freshness is heavily weighted).

### B3. Technical AI Foundations
- robots.txt: deliberately decide AI crawler policy — allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended if you want visibility; never block by accident.
- Add `llms.txt` at site root: a curated map of your most important content for AI consumers.
- Full JSON-LD structured data (same schemas as classic SEO) — AI engines lean on it for entity understanding.
- Fast, server-rendered, crawlable pages — AI crawlers have the same constraints as search crawlers.

### B4. Entity & Brand Authority
- Consistent brand/entity naming across your site and the web.
- Detailed About page; author pages with credentials; sameAs links in Organization schema to official profiles.
- Earn third-party mentions and citations (docs, forums, industry publications, comparisons) — AI models weight corroborated claims over self-claims.
- Knowledge panel / Wikidata presence where justified.

### B5. Measurement
- Quarterly AI audit: query ChatGPT, Perplexity, Google AI Overviews, Claude for your target topics — are you cited, accurate, positive?
- Track AI referral traffic (chatgpt.com, perplexity.ai, copilot.microsoft.com referrers) in analytics.
- Track classic: impressions/CTR/positions in Search Console per cluster.

## PART C — Operating Rules
1. Classic SEO gets you indexed and ranked; AI SEO gets you cited — they share 80% of foundations, so never treat them as separate projects.
2. Never sacrifice readability for either: content must serve humans first; structure serves machines.
3. One source of truth for metadata: a per-route SEO service (title, meta, canonical, JSON-LD) — no hand-edited duplication.