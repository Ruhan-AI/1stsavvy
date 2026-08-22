# First Savvy System Architecture & Technical Specifications

First Savvy is a unified platform combining family financial education and personal finance management into one connected, resilient architecture.

## 1. Domain Separation & Routing

The platform cleanly separates public marketing and authenticated application concerns:

- **Public Marketing Website (`1stsavvy.com`)**:
  - Contains indexable, server-rendered marketing and legal pages.
  - Generates dynamic XML sitemaps (`/sitemap.xml`) and canonical metadata.
  - Includes interactive "How It Works" previews and waitlist submission forms.
- **Authenticated Application (`app.firstsavvy.com`)**:
  - Full personal finance suite and supervised family management.
  - Blocked from search engine indexing via `robots.txt` and `X-Robots-Tag`.
  - Accessible via client-side routing with automatic redirects for legacy mixed-case URLs (`/Banking` -> `/banking`).

## 2. Technology Stack

- **Framework**: Next.js 14+ App Router (React 18, Strict TypeScript)
- **Styling**: Tailwind CSS with customized HSL brand color tokens:
  - Deep Navy: `#324154`
  - Darker Navy: `#2B3A4E`
  - Sky Blue: `#4FA3CD`
  - Supporting Blue: `#66AFD3`
  - Soft Blue: `#A4CDE1`
  - Off-White: `#F9F7F8`
- **Typography**: `Cormorant Garamond` for serif headlines; `Inter` for UI, tables, and dashboards.
- **Data & Storage**: PostgreSQL (Supabase) with Row Level Security (RLS) policies + local persistent sandbox adapter.
- **Visualizations**: Recharts for responsive net worth, spending, and asset allocation graphs.
- **Testing**: Vitest & React Testing Library for unit tests; Playwright for critical end-to-end flows.

## 3. Sandboxing & Safe Offline Mode

To ensure zero developer friction and instant QA verification, the platform features a complete standalone demo store pre-seeded with "The Miller Family" (adult owner, spouse, 2 children, 8+ accounts, 3 months of transactions, tasks, star ledger, goals, and calendar events). Live credentials are never required for local testing.
