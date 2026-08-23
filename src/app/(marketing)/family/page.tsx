'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { LiveHeroDashboardPreview } from '@/components/marketing/live-previews/LiveHeroDashboardPreview';
import { LiveTaskCreationPreview } from '@/components/marketing/live-previews/LiveTaskCreationPreview';
import { LiveGoalCreationPreview } from '@/components/marketing/live-previews/LiveGoalCreationPreview';
import {
  FadeIn,
  TextReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from '@/components/animations/MotionWrappers';
import {
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gift,
  Target,
  Heart,
  Users,
  Lock,
  Layers
} from 'lucide-react';

const FamilyStarFlowCanvas = dynamic(
  () => import('@/components/3d/FamilyStarFlowCanvas').then(mod => mod.FamilyStarFlowCanvas),
  { ssr: false }
);

export default function FamilyPage() {
  return (
    // §3 marketing page root rhythm — identical to the homepage root.
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-20 overflow-hidden relative">
      {/* 1. HERO SECTION — §2 wide marketing container */}
      <section className="relative pt-2 sm:pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §12 decorative canvas: responsive box ladder, clipped, never interactive */}
        <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[280px] sm:h-[380px] lg:h-[480px] overflow-hidden pointer-events-none -z-0 opacity-30 dark:opacity-40">
          <CanvasErrorBoundary>
            <FamilyStarFlowCanvas />
          </CanvasErrorBoundary>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3 sm:space-y-4">
          <FadeIn delay={0.05}>
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">
              Family Financial Education
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* §4 marketing hero H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-[1.15]">
              <TextReveal text="Money habits start early." />
              <span className="block text-brand-sky mt-2 italic font-normal">
                <TextReveal text="Give them a better place to begin." delay={0.25} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            {/* §4 lead paragraph */}
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              First Savvy gives kids a practical way to experience responsibility, earning, saving, and progress, while parents stay connected and in control. It starts with stars and grows into real financial understanding.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Create a Child Profile</span>
                <ArrowRight className="w-5 h-5 shrink-0 text-brand-sky" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Family Hero Product Preview (Live Interactive Vector) */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="relative z-10 mt-8 sm:mt-12 max-w-5xl mx-auto min-w-0">
            <LiveHeroDashboardPreview />
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: IT STARTS WITH RESPONSIBILITY (Live Task Creation Vector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §6 asymmetric split — stacked below lg, copy first in DOM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left" className="lg:col-span-5 min-w-0 space-y-3 sm:space-y-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">It Starts With Responsibility</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              <TextReveal text="Before kids manage money, they can learn what it means to earn it." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Create everyday tasks and responsibilities your child can understand and complete. As they make progress, they begin connecting effort with earning and seeing that money is something to understand, not simply receive.
            </p>

            {/* Highlighted Field Callouts — §6 never grid-cols-3+ at base */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              {[
                { label: 'Task Details', desc: 'Clear title & description' },
                { label: 'Star Value', desc: 'Weighted by effort' },
                { label: 'Schedule', desc: 'Daily or weekly rhythm' },
                { label: 'Assign to Child', desc: 'Personalized space' },
              ].map((callout, idx) => (
                <div key={idx} className="min-w-0 p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-sky" />
                    <span className="min-w-0">{callout.label}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{callout.desc}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-7 min-w-0">
            <LiveTaskCreationPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECTION: FROM STARS TO REWARDS & GOALS (Live Goal Creation Vector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §6 copy first in DOM, preview moves left only from lg up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="right" className="lg:order-2 lg:col-span-5 min-w-0 space-y-3 sm:space-y-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">From Stars to Rewards and Goals</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Earn stars. Choose rewards. Save toward goals.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              When tasks are completed, kids earn stars. Stars can be redeemed for small rewards or saved toward larger goals. As children grow, the same framework supports allowances, giving them a structured way to practice making choices with money they earned.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Stars', 'Rewards', 'Allowances', 'Goals'].map((label) => (
                <span key={label} className="inline-flex items-center min-h-[36px] px-3 sm:px-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-slate-200 whitespace-nowrap">
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:order-1 lg:col-span-7 min-w-0">
            <LiveGoalCreationPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SECTION: THEIR EXPERIENCE AND YOUR VISIBILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="lg:col-span-5 min-w-0 space-y-3 sm:space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-bold uppercase tracking-wider">
              Different access. Same family.
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Their experience. Your visibility.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Kids see what they need to see: their tasks, their stars, their rewards, and their goals. Parents manage the system, approve tasks, set allowances, and keep full visibility into the family environment without giving children access to adult finances.
            </p>
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start sm:items-center gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
              <div className="min-w-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                PIN-protected or password-protected child spaces with isolated parent controls.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <LiveGoalCreationPreview />
          </div>
        </div>
      </section>

      {/* 5. EARLY ACCESS CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#070B10] border border-slate-700/80 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 opacity-35 pointer-events-none -z-0">
              <CanvasErrorBoundary>
                <FamilyStarFlowCanvas className="w-full h-full" />
              </CanvasErrorBoundary>
            </div>

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#EFCE7B]/15 blur-3xl -z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#52A5CE]/10 blur-3xl -z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Start Early</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
                Give your kids a better place to begin.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join our early access program and begin building lasting financial habits with your family today.
              </p>
              <div className="pt-4">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. FAQ SECTION — §2 prose container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Family Questions</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Frequently asked about family features
            </h2>
          </div>
        </ScrollReveal>
        <FAQAccordion />
      </section>
    </div>
  );
}
