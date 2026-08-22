import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { SecurityShieldCanvas } from '@/components/3d/SecurityShieldCanvas';
import { 
  FadeIn, 
  TextReveal, 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { ShieldCheck, Heart, Sparkles, Target, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 space-y-16">
      {/* Header with 3D Security Shield Ring */}
      <div className="text-center space-y-4 relative">
        <FadeIn delay={0.05}>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Our Philosophy</span>
        </FadeIn>

        <div className="my-2 max-w-[200px] mx-auto">
          <SecurityShieldCanvas />
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
              We treat child data as strictly confidential. COPPA compliance, parental consent controls, zero data sale, and complete isolation between adult finances and child spaces are built into the bedrock of our software.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-brand-softBlue/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-slate-800 text-brand-navy dark:text-brand-softBlue flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Context Over Clutter</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              More financial data does not always mean more clarity. We design tools that cut through repetitive friction to show you what came in, what went out, what is coming next, and where you stand.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 h-full hover:border-amber-400/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Designed to Grow With You</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              What begins with a child earning their first stars develops into personal budgeting, household coordination, investing, and estate planning as life unfolds.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* About & Mission FAQ Accordion */}
      <FAQAccordion
        eyebrow="Mission FAQs"
        title="Frequently Asked Questions About First Savvy"
        subtitle="Learn more about our philosophy, product principles, and future roadmap."
        items={[
          {
            question: 'What does "From Stars to Legacy" mean?',
            answer:
              'It represents our guiding product thesis: financial literacy begins with simple childhood habits (earning star points for completing chores) and naturally matures into budgeting, smart spending, generational investing, and legacy estate planning as your family grows.',
          },
          {
            question: 'How does First Savvy ensure user and family data privacy?',
            answer:
              'First Savvy is built with zero-knowledge encryption architecture for sensitive vault assets, bank-grade 256-bit AES encryption for transaction logs, and full compliance with COPPA (Children\'s Online Privacy Protection Act). We never sell family data or advertise to children.',
          },
          {
            question: 'What is planned on the First Savvy roadmap?',
            answer:
              'We are currently expanding support for First Savvy Business accounts, automated credit score monitoring, AI financial insights, and comprehensive multi-generation estate planning vaults.',
          },
        ]}
      />

      {/* CTA Box */}
      <ScrollReveal direction="scale">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-navy text-white text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            <TextReveal text="Start your family's money journey today." />
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Join the initial group of families experiencing a more connected, calm financial platform.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-semibold inline-flex items-center gap-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
