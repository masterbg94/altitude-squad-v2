---
name: seo
description: "Use when doing ANY task involving SEO. Triggers: SEO optimization, meta tags, structured data (JSON-LD), sitemap.xml, robots.txt, Open Graph tags, Twitter Cards, canonical URLs, hreflang tags, page speed for SEO, keyword optimization, schema.org markup, alt text for images, heading structure (H1-H6), internal linking, URL structure, content optimization, SEO audit, Google Search Console, indexing issues."
---

# SEO

## Core Principles

**1. Measure first — never optimize without data.**
- Use Google Search Console to identify indexing issues, crawl errors, and top queries
- Use Lighthouse SEO audit (`npx lighthouse <url> --only-categories=seo`)
- Use `next-seo` or manual `next/head` to verify meta tags
- Check `sitemap.xml` and `robots.txt` with Google Search Console

**2. Prioritize by impact.**
1. Fix indexing issues (404s, canonical, robots.txt)
2. Optimize title tags and meta descriptions
3. Implement structured data (JSON-LD)
4. Improve Core Web Vitals (LCP, CLS, FID)
5. Optimize content and keyword targeting

## Next.js Specific

### Meta Tags with `next/head`
```tsx
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title | Brand Name</title>
        <meta name="description" content="Concise, compelling description under 160 chars." />
        <meta property="og:title" content="Page Title | Brand Name" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://example.com/page" />
      </Head>
      {/* page content */}
    </>
  )
}
```

### Using `next-seo` (Recommended)
```bash
npm install next-seo
```
```tsx
import { NextSeo } from 'next-seo'

export default function Page() {
  return (
    <>
      <NextSeo
        title="Page Title | Brand Name"
        description="Concise, compelling description under 160 chars."
        canonical="https://example.com/page"
        openGraph={{
          title: 'Page Title | Brand Name',
          description: 'Description for social sharing',
          url: 'https://example.com/page',
          images: [{ url: 'https://example.com/og-image.jpg' }],
          type: 'website',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {/* page content */}
    </>
  )
}
```

### Dynamic Meta Tags in App Router
```tsx
// app/page.tsx
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title | Brand Name',
    description: 'Concise, compelling description under 160 chars.',
    openGraph: {
      title: 'Page Title | Brand Name',
      description: 'Description for social sharing',
      url: 'https://example.com/page',
      images: [{ url: 'https://example.com/og-image.jpg' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: 'https://example.com/page',
    },
  }
}
```

## Structured Data (JSON-LD)

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/brand",
    "https://facebook.com/brand"
  ]
}
```

### Article/Blog Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article description",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-01-01T00:00:00Z",
  "image": "https://example.com/article-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Brand Name",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  }
}
```

### Product Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "image": "https://example.com/product.jpg",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "99.99",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/product"
  }
}
```

## Sitemap & Robots

### Sitemap
Next.js automatically generates `sitemap.xml` when using the App Router. For Pages Router, install `next-sitemap`:

```bash
npm install --save-dev next-sitemap
```
```js
// next-sitemap.js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://example.com/sitemap.xml'],
  },
}
```

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://example.com/sitemap.xml
```

## Internationalization (hreflang)

For multi-language sites, implement `hreflang` tags:
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="sr" href="https://example.com/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

## Content Optimization

### Title Tags
- Length: 50-60 characters
- Format: `Primary Keyword | Secondary Keyword | Brand Name`
- Unique per page
- Place most important keywords first

### Meta Descriptions
- Length: 120-160 characters
- Include primary keyword
- Write compelling copy to improve CTR
- Unique per page

### Heading Structure
- H1: One per page, contains primary keyword
- H2: Section headings, contains related keywords
- H3-H6: Sub-sections, supporting content
- Never skip heading levels

### Image Alt Text
- Describe the image accurately
- Include relevant keywords naturally
- Decorative images: `alt=""`
- Functional images: describe the action

## URL Structure
- Use hyphens, not underscores
- Keep URLs short and descriptive
- Include primary keyword
- Use lowercase
- Avoid unnecessary parameters

## Internal Linking
- Link to related content with descriptive anchor text
- Use contextual links within content
- Avoid generic "click here" links
- Maintain a flat site structure (max 3 clicks to any page)

## Core Web Vitals for SEO
- LCP < 2.5s: Optimize hero images, use SSR
- CLS < 0.1: Reserve space for images, ads, embeds
- FID < 100ms: Reduce JS bundle, optimize event handlers

## Checklist

Before deploying SEO changes:
- [ ] Title tag unique, <60 chars, includes primary keyword
- [ ] Meta description unique, <160 chars, compelling
- [ ] H1 present, contains primary keyword
- [ ] Images have descriptive alt text
- [ ] Canonical URL set (no duplicates)
- [ ] Open Graph tags set for social sharing
- [ ] Twitter Card tags set
- [ ] Structured data (JSON-LD) implemented
- [ ] Sitemap.xml generated and submitted
- [ ] robots.txt configured correctly
- [ ] hreflang tags set for multilingual sites
- [ ] Core Web Vitals passing (LCP, CLS, FID)
- [ ] Mobile-friendly (responsive design)
- [ ] HTTPS enforced
- [ ] Page loads in <3s
