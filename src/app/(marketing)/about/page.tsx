'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/brand/Logo';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { 
  FadeIn, 
  TextReveal, 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { ShieldCheck, Heart, Sparkles, Target, Users, ArrowRight } from 'lucide-react';

const SecurityShieldCanvas = dynamic(
  () => import('@/components/3d/SecurityShieldCanvas').then(mod => mod.SecurityShieldCanvas),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 space-y-16">
      {/* Header with 3D Security Shield Ring */}
      <div className="text-center space-y-4 relative">
        <FadeIn delay={0.05}>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Our Philosophy</span>
        </FadeIn>

        <div className="my-2 max-w-[200px] mx-auto">
          <CanvasErrorBoundary>
            <SecurityShieldCanvas />
          </CanvasErrorBoundary>
        </div>

        <FadeIn delay={0.15}>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
            <TextReveal text="From first stars to lasting legacy." />
          </h1>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            First Savvy was created to solve a fundamental disconnect in modern life: our financial education, household budgeting, and personal wealth management have historically lived in separate worlds.
          </p>
        </FadeIn>
      </div>

      {/* Core Principles Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-brand-sky/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-brand-sky flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Learn by Doing</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Financial wisdom is not learned from lectures; it is built through everyday habits. By connecting chores, stars, rewards, and savings goals, children develop an intuitive relationship between responsibility and earning.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-emerald-500/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Trust and Privacy First</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We uphold strict COPPA compliance and data minimization. Child accounts are isolated within a parent-governed space, with no external ad networks, tracking, or behavioral profiling.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-amber-400/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">One Connected Ecosystem</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              From star points and allowances to Plaid-connected accounts, multi-category budgeting, and net worth forecasting — we eliminate the fragmentation between family finance and adult financial management.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-indigo-400/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Built for Legacy</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Real wealth is more than a balance; it is peace of mind, thoughtful preparation, and empowering the next generation with values that endure.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Narrative Section */}
      <ScrollReveal>
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">The Vision</span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
            Financial clarity that begins with a single star and grows with your family for decades.
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you are helping your seven-year-old learn the value of a chore or optimizing a multi-asset household portfolio, First Savvy is designed to be your family's lifelong financial operating system.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-bold shadow transition-colors"
            >
              <span>Join the First Savvy Community</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* FAQ */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
            Everything you need to know
          </h2>
        </div>
        <FAQAccordion />
      </section>
    </div>
  );
}
