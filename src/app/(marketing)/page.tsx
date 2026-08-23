'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { HeroPreview } from '@/components/marketing/HeroPreview';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { LiveGlobalSearchPreview } from '@/components/marketing/live-previews/LiveGlobalSearchPreview';
import { LiveTransactionsTablePreview } from '@/components/marketing/live-previews/LiveTransactionsTablePreview';
import { LiveTaskCreationPreview } from '@/components/marketing/live-previews/LiveTaskCreationPreview';
import { LiveGoalCreationPreview } from '@/components/marketing/live-previews/LiveGoalCreationPreview';
import { LiveAccountTypesPreview } from '@/components/marketing/live-previews/LiveAccountTypesPreview';
import { 
  FadeIn, 
  AuroraBackground, 
  CountUp,
  TextReveal, 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/animations/MotionWrappers';
import { 
  ArrowRight, 
  Sparkles, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Calendar,
  Layers,
  Star,
  Lock,
  DollarSign
} from 'lucide-react';

const HeroConstellationCanvas = dynamic(
  () => import('@/components/3d/HeroConstellationCanvas').then(mod => mod.HeroConstellationCanvas),
  { ssr: false }
);

const FinancialWaveCanvas = dynamic(
  () => import('@/components/3d/FinancialWaveCanvas').then(mod => mod.FinancialWaveCanvas),
  { ssr: false }
);

const FamilyStarFlowCanvas = dynamic(
  () => import('@/components/3d/FamilyStarFlowCanvas').then(mod => mod.FamilyStarFlowCanvas),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-20 overflow-hidden relative">
      <AuroraBackground />

      {/* 1. HERO SECTION */}
      <section className="relative pt-2 sm:pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CanvasErrorBoundary>
          <HeroConstellationCanvas />
        </CanvasErrorBoundary>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3 sm:space-y-4">
          {/* Headline */}
          <FadeIn delay={0.15}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-[1.15]">
              <TextReveal text="Your family. Your money." />
              <span className="block mt-2 text-brand-sky font-normal italic">
                <TextReveal text="From stars to legacy." delay={0.3} />
              </span>
            </h1>
          </FadeIn>

          {/* Body */}
          <FadeIn delay={0.3}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              First Savvy brings family money management and personal finance into one connected experience.
              See your accounts, budgets, transactions, bills, and net worth in one place, while giving your kids a practical way to learn earning, saving, responsibility, and progress.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              As life becomes more complex, First Savvy is designed to grow with you.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.5}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 inline-flex items-center justify-center gap-3 group"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-5 h-5 shrink-0 text-brand-sky group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-slate-700 text-brand-navy dark:text-white border border-slate-300/80 dark:border-slate-700 text-base font-semibold shadow-sm transition-all duration-200 inline-flex items-center justify-center"
              >
                See How It Works
              </a>
            </div>
          </FadeIn>

          {/* Feature Badges */}
          <FadeIn delay={0.6}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span className="inline-flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                Bank-Level 256-Bit Security
              </span>
              <span className="inline-flex items-center gap-2 min-w-0">
                <Star className="w-4 h-4 shrink-0 text-brand-amber fill-brand-amber" />
                COPPA Child-Safe Architecture
              </span>
              <span className="inline-flex items-center gap-2 min-w-0">
                <Layers className="w-4 h-4 shrink-0 text-brand-sky" />
                12,000+ Connected Institutions
              </span>
            </div>
          </FadeIn>

          {/* Real Interactive Webapp Hero Experience */}
          <div className="pt-6 sm:pt-10">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight text-brand-navy dark:text-white tabular-nums">
                <CountUp value={437} prefix="$" suffix="K+" duration={2} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
                Household Wealth Tracked
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight text-brand-sky tabular-nums">
                <CountUp value={12000} suffix="+" duration={2.2} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
                Chores &amp; Stars Earned
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
                <CountUp value={256} suffix="-Bit" duration={1.8} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
                Plaid Bank Encryption
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight text-amber-500 tabular-nums">
                <CountUp value={100} suffix="%" duration={1.5} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
                COPPA Child Safe
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: MONEY IS CONNECTED (Live Global Search Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="lg:col-span-5 min-w-0 space-y-3 sm:space-y-4 text-left">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Money is Connected</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
                Your financial tools should be too.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                A task completed by your child, an allowance earned, a bill coming due, a balance growing, and a financial goal getting closer may look like separate moments. First Savvy brings them into a more connected financial experience.
              </p>
              <div className="pt-2">
                <Link
                  href="/family"
                  className="inline-flex items-center gap-2 min-h-[44px] lg:min-h-0 lg:py-1 text-sm font-bold text-brand-sky hover:text-brand-navyDark transition-colors group"
                >
                  <span>Experience Connected Finance</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <LiveGlobalSearchPreview />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SECTION: THE FIRST SAVVY WAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">The First Savvy Way</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight mt-2">
              <TextReveal text="More than tracking money. Learn it. Manage it. Grow it." />
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-brand-sky/40 transition-colors">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-brand-sky">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Learn It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Learn real money skills through earning, saving, responsibility, and working toward goals.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Manage It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Manage accounts, transactions, budgets, and recurring financial activity in one place.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-brand-softBlue/40 transition-colors">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-navy-50 dark:bg-slate-800 flex items-center justify-center text-brand-navy dark:text-brand-softBlue">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Grow It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Grow your understanding of net worth and the bigger financial picture as life changes.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4. SECTION: PERSONAL FINANCE PREVIEW (Live Transactions Table) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
              Personal Finance Preview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Review, filter, and organize every dollar in one workspace.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              First Savvy brings accounts, transactions, budgets, recurring activity, and net worth into one organized view.
            </p>
          </div>

          <div className="max-w-5xl mx-auto min-w-0">
            <LiveTransactionsTablePreview />
          </div>
        </div>
      </section>

      {/* 5. SECTION: FAMILY PREVIEW (Live Task & Goal Creation Modals + 3D Stars in Background) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[380px] overflow-hidden pointer-events-none -z-0 opacity-20 dark:opacity-30">
          <CanvasErrorBoundary>
            <FamilyStarFlowCanvas />
          </CanvasErrorBoundary>
        </div>

        <div className="space-y-6 sm:space-y-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky block">
              Family Experience Preview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Turn responsibility into visible progress through tasks, stars, and goals.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Kids complete tasks, earn rewards, receive allowances, and save toward goals with supervised clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="min-w-0">
              <LiveTaskCreationPreview />
            </div>
            <div className="min-w-0">
              <LiveGoalCreationPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: SEE MORE THAN A BALANCE (Live Account Types Vector Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="lg:col-span-5 min-w-0 space-y-3 sm:space-y-4 text-left">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">See More Than a Balance</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Your balance is not your financial position.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              First Savvy organizes banking, vehicles, properties, investments, and liabilities so you understand your true net worth and can follow how your financial standing evolves.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 min-h-[44px] lg:min-h-0 lg:py-1 text-sm font-bold text-brand-sky hover:text-brand-navyDark transition-colors group"
              >
                <span>Track Your Net Worth</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <LiveAccountTypesPreview />
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Simple, Transparent Steps</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              How First Savvy works
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              Getting started is straightforward. Designed for the whole family in three steps.
            </p>
          </div>
        </ScrollReveal>

        <HowItWorks />
      </section>

      {/* 8. EARLY ACCESS & FINAL CTA WITH 3D PARTICLES AND RICH DARK GRADIENT */}
      <section id="early-access" className="scroll-mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#070B10] border border-slate-700/80 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
            {/* 3D Wave Particle Canvas Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none -z-0">
              <CanvasErrorBoundary>
                <FinancialWaveCanvas className="w-full h-full" />
              </CanvasErrorBoundary>
            </div>

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#52A5CE]/15 blur-3xl -z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#EFCE7B]/10 blur-3xl -z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Early Access</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                Be among the first families to experience First Savvy.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join our early access group. Get updates as new features launch and help shape the future of family financial tools.
              </p>
              <div className="pt-4">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Answers for curious minds
            </h2>
          </div>
        </ScrollReveal>
        <FAQAccordion />
      </section>
    </div>
  );
}
