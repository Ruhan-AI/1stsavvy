'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { ProductScreenshot } from '@/components/marketing/ProductScreenshot';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
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
    <div className="space-y-12 sm:space-y-20 pb-20 overflow-hidden relative">
      {/* 1. HERO SECTION */}
      <section className="relative pt-2 sm:pt-4 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 max-w-6xl mx-auto h-[480px] pointer-events-none z-0 opacity-30 dark:opacity-40">
          <CanvasErrorBoundary>
            <FamilyStarFlowCanvas />
          </CanvasErrorBoundary>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <FadeIn delay={0.05}>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">
              Family Financial Education
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-tight">
              <TextReveal text="Money habits start early." />
              <span className="block text-brand-sky mt-2 italic font-normal">
                <TextReveal text="Give them a better place to begin." delay={0.25} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              First Savvy gives kids a practical way to experience responsibility, earning, saving, and progress, while parents stay connected and in control. It starts with stars and grows into real financial understanding.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Create a Child Profile</span>
                <ArrowRight className="w-5 h-5 text-brand-sky" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Family Hero Product Preview with Floating Goal Card */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="mt-12 max-w-5xl mx-auto relative">
            <ProductScreenshot
              src="/images/app/dashboard-family.jpg"
              alt="First Savvy parent and child family dashboard with chore tracking and allowance ledger"
              label="Family Activity & Learning Hub"
              variant="browser"
              aspectRatio="16/9"
              priority={true}
            />

            {/* Floating Goal Card */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-6 w-[55%] sm:w-[40%] max-w-xs hidden xs:block z-20 hover:scale-105 transition-transform duration-300">
              <ProductScreenshot
                src="/images/app/goal-creation.jpg"
                alt="First Savvy reward goal setup"
                label="Goal Milestone"
                variant="floating"
                aspectRatio="4/3"
                enableLightbox={true}
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: IT STARTS WITH RESPONSIBILITY (Task Creation with Callouts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">It Starts With Responsibility</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              <TextReveal text="Before kids manage money, they can learn what it means to earn it." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Create everyday tasks and responsibilities your child can understand and complete. As they make progress, they begin connecting effort with earning and seeing that money is something to understand, not simply receive.
            </p>

            {/* Highlighted Field Callouts */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Task Details', desc: 'Clear title & description' },
                { label: 'Star Value', desc: 'Weighted by effort' },
                { label: 'Schedule', desc: 'Daily or weekly rhythm' },
                { label: 'Assign to Child', desc: 'Personalized space' },
              ].map((callout, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="font-bold text-xs text-brand-navy dark:text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky" />
                    {callout.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{callout.desc}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-7">
            <ProductScreenshot
              src="/images/app/task-creation.jpg"
              alt="First Savvy task creation modal showing task title, stars, schedule, and child assignment"
              label="Task & Chore Assignment"
              caption="Assign tasks with custom star rewards and recurring schedules."
              variant="browser"
              aspectRatio="4/3"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECTION: FROM STARS TO REWARDS & GOALS (Goal Creation Visual) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <ScrollReveal direction="left" className="order-2 lg:order-1 lg:col-span-7">
            <ProductScreenshot
              src="/images/app/goal-creation.jpg"
              alt="First Savvy goal creation with target star cost and assignment"
              label="Reward & Saving Goal Builder"
              caption="Turn stars into tangible rewards and long-term saving goals."
              variant="browser"
              aspectRatio="4/3"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" className="order-1 lg:order-2 lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">From Stars to Rewards and Goals</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Earn stars. Choose rewards. Save toward goals.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              When tasks are completed, kids earn stars. Stars can be redeemed for small rewards or saved toward larger goals. As children grow, the same framework supports allowances, giving them a structured way to practice making choices with money they earned.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Stars', 'Rewards', 'Allowances', 'Goals'].map((label) => (
                <span key={label} className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-slate-200">
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SECTION: THEIR EXPERIENCE AND YOUR VISIBILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-bold uppercase tracking-wider">
              Different access. Same family.
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Their experience. Your visibility.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Kids see what they need to see: their tasks, their stars, their rewards, and their goals. Parents manage the system, approve tasks, set allowances, and keep full visibility into the family environment without giving children access to adult finances.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                PIN-protected or password-protected child spaces with isolated parent controls.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductScreenshot
              src="/images/app/dashboard-family.jpg"
              alt="First Savvy clean dashboard preview showing supervised family workspace"
              label="Supervised Family Space"
              caption="Different access. Same family."
              variant="browser"
              aspectRatio="16/10"
            />
          </div>
        </div>
      </section>

      {/* 5. EARLY ACCESS CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-8 sm:p-14 rounded-3xl bg-brand-navy dark:bg-[#15202B] text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Start Early</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
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

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Family Questions</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              Frequently asked about family features
            </h2>
          </div>
        </ScrollReveal>
        <FAQAccordion />
      </section>
    </div>
  );
}
