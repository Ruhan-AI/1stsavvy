'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { LiveTransactionsTablePreview } from '@/components/marketing/live-previews/LiveTransactionsTablePreview';
import { LiveAccountTypesPreview } from '@/components/marketing/live-previews/LiveAccountTypesPreview';
import { LiveBudgetSetupPreview } from '@/components/marketing/live-previews/LiveBudgetSetupPreview';
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

const WealthGlobeCanvas = dynamic(
  () => import('@/components/3d/WealthGlobeCanvas').then(mod => mod.WealthGlobeCanvas),
  { ssr: false }
);

const FinancialWaveCanvas = dynamic(
  () => import('@/components/3d/FinancialWaveCanvas').then(mod => mod.FinancialWaveCanvas),
  { ssr: false }
);

export default function PersonalFinancePage() {
  return (
    // §3 marketing page root rhythm — identical to the homepage root.
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-20 overflow-hidden relative">
      {/* 1. HERO SECTION — §2 wide marketing container */}
      <section className="relative pt-2 sm:pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §12 decorative canvas: responsive box ladder, clipped, never interactive */}
        <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[280px] sm:h-[380px] lg:h-[480px] overflow-hidden pointer-events-none -z-0 opacity-25 dark:opacity-35">
          <CanvasErrorBoundary>
            <FinancialWaveCanvas className="w-full h-full" />
          </CanvasErrorBoundary>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3 sm:space-y-4 flex flex-col items-center">
          <FadeIn delay={0.05}>
            <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Personal & Household Finance
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* §4 marketing hero H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-[1.15]">
              <TextReveal text="Your money tells a bigger story." />
              <span className="block text-brand-sky mt-2 italic font-normal">
                <TextReveal text="See the whole picture." delay={0.3} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            {/* §4 lead paragraph */}
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              First Savvy brings accounts, transactions, budgets, recurring activity, and net worth into one organized financial experience. Understand where your money is, how it is moving, what is coming next, and how your overall financial position is changing.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Build Your Financial View</span>
                <ArrowRight className="w-5 h-5 shrink-0 text-brand-sky" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="pt-2 text-xs sm:text-sm font-serif italic font-semibold text-brand-sky">
              Know where you stand. See what comes next.
            </div>
          </FadeIn>
        </div>

        {/* Hero Product Composite: Live Interactive Vector Transactions */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="relative z-10 mt-8 sm:mt-12 max-w-5xl mx-auto min-w-0">
            <LiveTransactionsTablePreview />
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: EVERYTHING IN VIEW (Live Account Types Vector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §6 asymmetric split — stacked below lg, copy first in DOM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left" className="lg:col-span-5 min-w-0 space-y-3 sm:space-y-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Everything in View</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              <TextReveal text="Banking, assets, vehicles, properties, and loans. In one place." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Stop checking five different apps to understand your balance sheet. First Savvy organizes every asset and liability category so you can see your liquid cash, investments, real estate, vehicles, and debts side by side.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Banking', 'Vehicles', 'Property', 'Investments', 'Loans & Debt'].map((label) => (
                <span key={label} className="inline-flex items-center min-h-[36px] px-3 sm:px-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-slate-200 whitespace-nowrap">
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-7 min-w-0">
            <LiveAccountTypesPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECTION: TRANSACTIONS & LESS REPETITION (Live Transactions Table) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Transactions & Cash Flow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Organize transactions without the manual repetitive headache.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Filter by date, category, status, and account. Exclude transfers, split categories, and see upcoming scheduled payments in seconds.
            </p>
          </div>

          <div className="max-w-5xl mx-auto min-w-0">
            <LiveTransactionsTablePreview />
          </div>
        </div>
      </section>

      {/* 4. SECTION: BUDGETING (Live Budget Setup Vector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §6 copy first in DOM, preview moves left only from lg up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="right" className="lg:order-2 lg:col-span-5 min-w-0 space-y-3 sm:space-y-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Budgeting</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Planned. Actual. Remaining.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Budgeting works best when it is simple to follow. First Savvy compares what you planned with what actually happened, keeping you aware of how much room remains in each category before the month is over.
            </p>
            <div className="space-y-2 sm:space-y-3 pt-2">
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-xs sm:text-sm">
                <span className="min-w-0 font-bold text-slate-700 dark:text-slate-300">50/30/20 Rule Ready</span>
                <span className="min-w-0 text-brand-sky font-semibold">Needs • Wants • Savings</span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-xs sm:text-sm">
                <span className="min-w-0 font-bold text-slate-700 dark:text-slate-300">Live Progress Bars</span>
                <span className="min-w-0 text-emerald-600 font-semibold">Instant Visual Alert</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:order-1 lg:col-span-7 min-w-0">
            <LiveBudgetSetupPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 5. 3D FINANCIAL WAVE SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute inset-0 opacity-40 pointer-events-none -z-0">
            <CanvasErrorBoundary>
              <FinancialWaveCanvas />
            </CanvasErrorBoundary>
          </div>

          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Connected Wealth Architecture</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
              Built for where your wealth is heading.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From day-to-day transaction flow to generational estate contacts and password records, First Savvy provides the infrastructure you need to protect and grow your legacy.
            </p>
            <div className="pt-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 sm:px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-bold shadow-md transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EARLY ACCESS CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#070B10] border border-slate-700/80 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 opacity-35 pointer-events-none -z-0">
              <CanvasErrorBoundary>
                <FinancialWaveCanvas className="w-full h-full" />
              </CanvasErrorBoundary>
            </div>

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#10b981]/15 blur-3xl -z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#52A5CE]/10 blur-3xl -z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Early Access</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                Take control of your household finances.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join families building smarter financial foundations with First Savvy.
              </p>
              <div className="pt-4">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. FAQ SECTION — §2 prose container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Financial Questions</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Frequently asked about personal finance
            </h2>
          </div>
        </ScrollReveal>
        <FAQAccordion />
      </section>
    </div>
  );
}
