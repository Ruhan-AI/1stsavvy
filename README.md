# First Savvy — From Stars to Legacy

> The connected platform for family financial education and personal finance management.

First Savvy brings family money management and personal finance into one unified platform. Parents can help children learn responsibility, earning, saving, patience, and progress through tasks, stars, rewards, allowances, and goals. Adults can manage accounts, transactions, budgets, recurring bills, calendars, investments, and net worth.

---

## 🌟 Key Features

1. **Public Marketing Website (`1stsavvy.com`)**:
   - 12 comprehensive pages: Home, Family, Personal Finance, About, Contact, FAQ, Feature Updates, Privacy Policy, Terms of Use, Beta Terms, Children's Privacy Notice, Cookie Preferences.
   - Interactive "How It Works" workflow and waitlist submissions with spam protection and rate limiting.
   - Dynamic XML Sitemap (`/sitemap.xml`) and SEO metadata.

2. **Family Experience & Supervised Kid Space**:
   - **Task Manager**: Chore scheduling (daily, weekly, custom) with star values, approval requirements, and notes.
   - **Immutable Star Ledger**: Complete audit trail of all earned, awarded, and redeemed stars.
   - **Goals & Rewards**: Star reward goals and monetary savings goals with progress tracking.
   - **Supervised Kid View (`/kid-view`)**: Age-appropriate dashboard with task completions, star counters, and reward redemptions.
   - **COPPA Parental Consent**: Mandatory consent audit record before child profile creation and secure 4-digit PIN hashing.

3. **Personal Finance Suite (`app.firstsavvy.com`)**:
   - **Dashboard**: Metric tabs (Net Worth, Spending, In/Out, Balance), period filters (MTD, 30D, 3M, 6M, YTD, 1Y, ALL), and interactive Recharts graphs.
   - **Banking**: Plaid Link sandbox modal, manual asset/debt tracking, advanced transaction filters, bulk categorization, and transaction rules engine.
   - **Budgeting**: Planned vs. actual spending, income streams, and 30+ pre-seeded categories.
   - **Financial Calendar**: Month/Day views for bills, income, reminders, and meal planning.
   - **Net Worth**: Assets vs. liabilities, liquid cash, debt ratio, and 6-month historical progression.
   - **Investments**: ETF, stock, crypto, and bond holdings with real-time gain/loss tracking.
   - **Contacts**: Family directory and financial advisor relationships.
   - **Roadmap Modules**: Accurately labeled previews for Credit Score, Estate Planning, Integrations, Password Vault, and Affiliate.

---

## 🚀 Quick Start & Local Development

First Savvy runs out-of-the-box in standalone demo mode pre-seeded with "The Miller Family" (adult owner, spouse, 2 kids, 8+ accounts, 3 months of transactions, tasks, budgets, and goals).

```bash
# 1. Install dependencies
npm.cmd install

# 2. Run unit tests
npm.cmd test

# 3. Start local development server
npm.cmd run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser:
- Marketing Website: `http://localhost:3000`
- Adult Login: `http://localhost:3000/login`
- Kid Space Login: `http://localhost:3000/kid-login`
- Main Dashboard: `http://localhost:3000/dashboard`

---

## 🧪 Testing Suite

```bash
# Run Vitest unit tests for money math, star ledger, budget calculations & COPPA rules
npm.cmd test

# Run Playwright end-to-end user journey tests
npm.cmd run test:e2e
```

---

## 📁 Repository Structure

- `src/app/(marketing)/` — Public marketing and legal pages
- `src/app/(auth)/` — Adult and child authentication flows
- `src/app/(app)/` — Authenticated application routes & shell
- `src/components/brand/` — Vector SVG logos and brand components
- `src/lib/store/` — Reactive persistent state store with Miller Family demo data
- `src/lib/types/` — Strict TypeScript domain definitions
- `supabase/migrations/` — PostgreSQL schema with 37+ tables, indexes, and RLS policies
- `docs/` — System architecture, audit report, data model, security, and deployment guides.
