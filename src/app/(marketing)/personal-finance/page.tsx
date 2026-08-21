import React from 'react';
import Link from 'next/link';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { WealthGlobeCanvas } from '@/components/3d/WealthGlobeCanvas';
import { FinancialWaveCanvas } from '@/components/3d/FinancialWaveCanvas';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { 
  FadeIn, 
  TextReveal, 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { 
  Wallet, 
  TrendingUp, 
  Calendar, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Briefcase, 
  PieChart,
  Repeat
} from 'lucide-react';

export default function PersonalFinancePage() {
  return (
    <div className="space-y-12 sm:space-y-20 pb-20 overflow-hidden relative">
      {/* 1. HERO SECTION WITH 3D WEALTH GLOBE & WAVE */}
      <section className="relative pt-2 sm:pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 flex flex-col items-center relative z-10">
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Personal & Household Finance</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="my-2 hover:scale-105 transition-transform duration-300">
              <WealthGlobeCanvas size={220} />
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-tight">
              <TextReveal text="Your money tells a bigger story." />
              <span className="block text-brand-sky mt-2 italic font-normal">
                <TextReveal text="See the whole picture." delay={0.3} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              FirstSavvy brings accounts, transactions, budgets, recurring activity, and net worth into one organized financial experience. Understand where your money is, how it is moving, what is coming next, and how your overall financial position is changing.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Build Your Financial View</span>
                <ArrowRight className="w-5 h-5 text-brand-sky" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="pt-2 text-xs font-serif italic font-semibold text-brand-sky">
              Know where you stand. See what comes next.
            </div>
          </FadeIn>
        </div>

        {/* 4 Feature Pillars Grid with Stagger */}
        <ScrollReveal delay={0.2} direction="up">
          <StaggerContainer className="mt-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-brand-sky/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-brand-navy dark:text-white">Unified Accounts</div>
                <div className="text-xs text-slate-500">Plaid sandbox & manual tracking for complete asset visibility.</div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-brand-navy dark:text-white">Connected Budgets</div>
                <div className="text-xs text-slate-500">Planned vs. actual spending compared dynamically as the month unfolds.</div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-brand-navy dark:text-white">Financial Calendar</div>
                <div className="text-xs text-slate-500">Anticipate recurring bills and payday events before they arrive.</div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-brand-softBlue/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-slate-800 text-brand-navy dark:text-brand-softBlue flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-brand-navy dark:text-white">True Net Worth</div>
                <div className="text-xs text-slate-500">Assets and liabilities combined into your real financial direction.</div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: EVERYTHING IN VIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6 hover:shadow-md transition-shadow duration-300">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Everything in View</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              <TextReveal text="Your financial life should not require five different places to understand. Bring the pieces together." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              See connected and manually managed accounts alongside the financial activity around them, giving you a clearer view without constantly moving between banking apps, spreadsheets, and separate tools.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {['Accounts', 'Balances', 'Transactions', 'Activity'].map((l) => (
                <span key={l} className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-slate-200">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SECTION: TRANSACTIONS & LESS REPETITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Transactions</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
            Every transaction is part of a larger picture. Know where your money is moving.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Search, review, categorize, and organize financial activity so individual transactions become useful information rather than an endless feed of numbers. FirstSavvy helps you understand what came in, what went out, and where recurring patterns are beginning to form.
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Less Repetition</span>
            <h3 className="text-xl font-serif font-bold text-brand-navy dark:text-white">
              Some financial activity keeps repeating. Your organization shouldn't have to.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Transaction rules help reduce repetitive work around familiar activity, while recurring transaction visibility makes it easier to recognize the payments and income that continue to return.
            </p>
            <div className="text-xs font-serif italic font-bold text-brand-sky pt-1">
              Spend less time organizing. More time understanding.
            </div>
            <div className="pt-2">
              <Link href="/signup" className="text-xs font-bold text-brand-navy dark:text-white hover:text-brand-sky underline">
                Start Organizing Your Finances →
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-softBlue">Transaction Rules Engine</div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2 text-xs">
            <div className="font-bold text-amber-300">Rule #1: Whole Foods Market</div>
            <div className="text-slate-300">IF merchant contains "Whole Foods" THEN set category to "Groceries"</div>
            <div className="text-[10px] text-emerald-400">✓ Matched 14 transactions this month</div>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2 text-xs">
            <div className="font-bold text-amber-300">Rule #2: Shell Oil & Gas</div>
            <div className="text-slate-300">IF description matches "Shell" THEN set category to "Vehicle & Gas"</div>
            <div className="text-[10px] text-emerald-400">✓ Matched 6 transactions this month</div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: BUDGETING & NET WORTH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Budgeting</span>
          <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
            Planning is only half the picture. See how the plan compares with reality.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Set expected income and spending, then follow how actual financial activity compares as the month unfolds. Instead of treating a budget as a static plan, FirstSavvy keeps it connected to what is actually happening with your money.
          </p>
          <div className="flex gap-2 pt-2">
            {['Planned', 'Actual', 'Remaining'].map((l) => (
              <span key={l} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-slate-200">
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Net Worth</span>
          <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
            An account balance tells you what is there. Net worth tells you where you stand.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            FirstSavvy brings assets and liabilities together to give you a broader view of your financial position. Follow how that position changes over time and move beyond simply asking what you spent toward understanding the direction of your finances.
          </p>
          <div className="text-xs font-serif italic font-bold text-brand-sky pt-2">
            See the number behind the numbers.
          </div>
        </div>
      </section>

      {/* 5. SECTION: FINANCIAL CALENDAR & ONE FINANCIAL PICTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Financial Calendar</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
            Transactions tell you what happened. See what is coming next.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Recurring bills, income, payments, and important financial dates become easier to understand when you can see them ahead of time. FirstSavvy brings financial activity into a calendar view so you can look forward instead of only reviewing the past.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {['Bills', 'Income', 'Recurring Activity', 'Reminders'].map((l) => (
              <span key={l} className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-slate-200">
                {l}
              </span>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">One Financial Picture</span>
            <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
              More information does not always mean more clarity. Bring context to the numbers.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
              Accounts, transactions, budgets, recurring activity, your calendar, and net worth each tell part of the story. FirstSavvy brings those perspectives closer together so you can understand what is happening with your money and how the pieces relate to your broader financial life.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <span>See Your Financial Picture</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-sky" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERSONAL FINANCE FAQ SECTION */}
      <FAQAccordion
        eyebrow="Personal Finance FAQs"
        title="Frequently Asked Questions About Personal Finance"
        subtitle="Answers to common questions about bank connections, Plaid security, budgets, and net worth tracking."
        items={[
          {
            question: 'How do bank connections and account syncing work in FirstSavvy?',
            answer:
              'FirstSavvy integrates with Plaid to securely connect with over 12,000 financial institutions across the US and Canada. Syncing is read-only, meaning FirstSavvy can never initiate transactions or move money on your behalf.',
          },
          {
            question: 'Can I create custom transaction rules and auto-categorization?',
            answer:
              'Yes! You can create custom keyword and merchant rules (e.g., automatically categorize "Whole Foods" as Groceries) so transactions are categorized instantly as soon as they sync.',
          },
          {
            question: 'How does the Net Worth Tracker handle assets and liabilities?',
            answer:
              'FirstSavvy aggregates real-time balances from checking, savings, brokerage, 401(k), and crypto accounts as assets, while tracking credit cards, mortgages, auto loans, and student loans as liabilities. You also get a historical progression chart showing your net worth growth over time.',
          },
          {
            question: 'Will FirstSavvy remind me before upcoming recurring bills are due?',
            answer:
              'Yes. The Financial Calendar automatically schedules your detected recurring bills, subscriptions, and payday deposits, providing advance alerts so you avoid overdraft fees.',
          },
          {
            question: 'Can I export my financial data and budget reports?',
            answer:
              'Yes, you can export your complete transaction history, spending breakdowns, and net worth summaries to CSV format anytime for tax or accounting purposes.',
          },
        ]}
      />

      {/* 7. SECTION: WHAT'S NEXT (BUSINESS WAITLIST) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">What's Next</span>
          <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">
            Your financial life doesn't stop at personal. Business is coming next.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            FirstSavvy is expanding toward a deeper financial experience for entrepreneurs and business owners, bringing more of your financial life into one connected platform. Join the Business waitlist to be among the first to hear when access becomes available.
          </p>
          <div className="max-w-md mx-auto pt-2">
            <WaitlistForm category="business" buttonText="Join the Business Waitlist" />
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-brand-navy text-white shadow-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Your finances are already connected by the life behind them. Give yourself a clearer view of it.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bring your accounts, activity, budgets, and broader financial position into one experience designed to help you understand where you stand and what comes next.
          </p>
          <div className="pt-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-base font-semibold shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Start Your Financial View</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
