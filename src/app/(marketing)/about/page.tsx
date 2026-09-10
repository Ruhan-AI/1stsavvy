'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/brand/Logo';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { HeroGlow } from '@/components/marketing/HeroGlow';
import {
  FadeIn,
  TextReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { Compass, Shield, Network, Landmark, Users, ArrowRight } from 'lucide-react';

const SecurityShieldCanvas = dynamic(
  () => import('@/components/3d/SecurityShieldCanvas').then(mod => mod.SecurityShieldCanvas),
  { ssr: false }
);

export default function AboutPage() {
  return (
    // §3 marketing page root rhythm, §1 Rule B: nothing may widen the page.
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-20 overflow-hidden relative">
      {/* 1. HERO — §2 wide marketing container */}
      <section className="relative pt-2 sm:pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §12 decorative wash: responsive box ladder, clipped, never interactive */}
        <HeroGlow className="inset-x-0 top-0 mx-auto h-[280px] max-w-5xl sm:h-[380px] lg:h-[480px]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <FadeIn delay={0.05}>
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Our Philosophy</span>
          </FadeIn>

          {/* §12 the canvas needs an explicit box or it renders at zero height */}
          <div className="mx-auto w-full max-w-[140px] sm:max-w-[180px] h-[140px] sm:h-[180px]">
            <CanvasErrorBoundary>
              <SecurityShieldCanvas className="w-full h-full" />
            </CanvasErrorBoundary>
          </div>

          <FadeIn delay={0.15}>
            {/* §4 marketing sub-page H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              <TextReveal text="From first stars to lasting legacy." />
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            {/* §4 lead paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              First Savvy was created to solve a fundamental disconnect in modern life: our financial education, household budgeting, and personal wealth management have historically lived in separate worlds.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. CORE PRINCIPLES — §6 2-up ladder, §3 card gap */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-brand-sky/40 hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 shrink-0 mx-auto rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/70 dark:from-sky-950/80 dark:to-sky-900/50 border border-sky-200/80 dark:border-sky-800/80 text-[#52A5CE] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 stroke-[1.9]" />
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Learn by Doing</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Financial wisdom is not learned from lectures; it is built through everyday habits. By connecting chores, stars, rewards, and savings goals, children develop an intuitive relationship between responsibility and earning.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-emerald-500/40 hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 shrink-0 mx-auto rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 dark:from-emerald-950/80 dark:to-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 stroke-[1.9]" />
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Trust and Privacy First</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We uphold strict COPPA compliance and data minimization. Child accounts are isolated within a parent-governed space, with no external ad networks, tracking, or behavioral profiling.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-amber-400/40 hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 shrink-0 mx-auto rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/70 dark:from-amber-950/80 dark:to-amber-900/50 border border-amber-200/80 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Network className="w-6 h-6 stroke-[1.9]" />
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">One Connected Ecosystem</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                From star points and allowances to Plaid-connected accounts, multi-category budgeting, and net worth forecasting — we eliminate the fragmentation between family finance and adult financial management.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4 hover:border-indigo-400/40 hover:shadow-md transition-all text-center group">
              <div className="w-12 h-12 shrink-0 mx-auto rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/70 dark:from-indigo-950/80 dark:to-indigo-900/50 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Landmark className="w-6 h-6 stroke-[1.9]" />
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Built for Legacy</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Real wealth is more than a balance; it is peace of mind, thoughtful preparation, and empowering the next generation with values that endure.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 3. NARRATIVE — §3 hero panel padding */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-slate-900 text-white space-y-4 sm:space-y-6 text-center">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">The Vision</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
              Financial clarity that begins with a single star and grows with your family for decades.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are helping your seven-year-old learn the value of a chore or optimizing a multi-asset household portfolio, First Savvy is designed to be your family's lifelong financial operating system.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 sm:px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-bold shadow transition-colors"
              >
                <span>Join the First Savvy Community</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. FAQ — §2 prose container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
            Everything you need to know
          </h2>
        </div>
        <FAQAccordion />
      </section>
    </div>
  );
}
