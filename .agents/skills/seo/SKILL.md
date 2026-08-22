---
name: claude-seo
description: Comprehensive AI SEO toolkit based on Claude SEO v2.2.4. Provides 25 specialist SEO skills, technical audits, JSON-LD schema generation, Generative Engine Optimization (GEO), Core Web Vitals, E-E-A-T analysis, and search visibility workflows.
---

# Claude SEO Toolkit (v2.2.4)

An enterprise-grade, open-source AI SEO skill toolkit for technical audits, on-page optimization, structured data, Generative Engine Optimization (GEO), and search visibility.

## 🎯 Core Skill Catalog (25 Workflows)

### 1. Full-Site Audit (`/seo audit <url>`)
- Multi-specialist audit coordinating technical crawlability, mobile responsiveness, Core Web Vitals (LCP, FID/INP, CLS), schema validation, and on-page signals.
- Automated business type classification (SaaS, FinTech, E-Commerce, Local, Publisher).

### 2. Technical SEO (`/seo technical <url>`)
- Crawlability & indexability analysis.
- Canonical tag consistency, trailing slash uniformity, and redirect chains.
- Security headers (`X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`).
- Mobile-friendly viewport and touch target audits.
- Next.js rendering audit (SSR vs Static Export vs Client Components).

### 3. E-E-A-T Content Review (`/seo content <url>`)
- Experience, Expertise, Authoritativeness, and Trustworthiness evaluation.
- Quality Rater Guidelines alignment for YMYL (Your Money Your Life / Financial) websites.
- Author schema verification, factual citation checks, and readability metrics.

### 4. Schema Markup & Structured Data (`/seo schema <url>`)
- Validates and generates `application/ld+json` structured data.
- Supported types: `Organization`, `WebSite`, `SoftwareApplication`, `FinancialProduct`, `FAQPage`, `BreadcrumbList`, `Article`, `HowTo`, `LocalBusiness`.
- Google Rich Results test compliance.

### 5. GEO / AI Search Optimization (`/seo geo <url>`)
- Generative Engine Optimization for ChatGPT Search, Google AI Overviews, Perplexity, Claude, and Bing Copilot.
- `llms.txt` and `llms-full.txt` discovery manifests.
- Crawler accessibility rules for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, and `Applebot`.
- AI citability scoring and information density optimization.

### 6. Single Page Analysis (`/seo page <url>`)
- Title tag precision (50-60 characters, brand-aligned, keyword-rich).
- Meta description optimization (140-160 characters with clear call-to-action).
- Single `<h1>` per page with semantic `<h2>`/`<h3>` hierarchy.
- Internal link density and keyword distribution.

### 7. Image SEO & Performance (`/seo images <url>`)
- Alt text completeness and descriptive quality.
- Modern format verification (WebP / AVIF).
- Explicit width/height dimensions to eliminate Cumulative Layout Shift (CLS).
- Lazy-loading strategy (`loading="lazy"` vs `priority` for above-the-fold assets).

### 8. XML Sitemap & Robots.txt (`/seo sitemap <url>`)
- XML Sitemap index validation, `lastmod` accuracy, and priority weighting.
- `robots.txt` syntax validation and crawler path directives.

### 9. International & Hreflang (`/seo hreflang <url>`)
- Multi-region and multi-language tag validation.
- ISO language/country code verification and self-referencing canonical checks.

### 10. Topic Clustering & SXO (`/seo cluster <topic>`)
- Search Experience Optimization (SXO) matching user search intent to UI layout.
- Hub-and-spoke content architecture.

---

## 🛠️ Execution Checklist for Next.js Projects

1. **Metadata & Head Tags**: Use Next.js App Router `export const metadata: Metadata` with title templates, openGraph, twitter, and canonical URLs.
2. **JSON-LD Schema**: Embed `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />` in layout and relevant pages.
3. **GEO Manifest**: Maintain a valid `public/llms.txt` file summarizing the site architecture, services, and core concepts for LLM web crawlers.
4. **Crawl Directives**: Configure `public/robots.txt` allowing essential AI bots (`GPTBot`, `ClaudeBot`, `PerplexityBot`) while protecting sensitive app dashboards.
5. **Image Best Practices**: Always provide meaningful `alt` text and use modern compressed images (`.webp`, `.svg`, optimized `.png`).
