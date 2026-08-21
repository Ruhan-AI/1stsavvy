'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Home, 
  Landmark, 
  Users, 
  Star, 
  TrendingUp, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: 'Create your Household',
    description: 'Set up your household workspace, preferred currency, and timezone in under 2 minutes.',
    icon: Home,
    color: '#324154',
    accent: 'bg-brand-navy/10 text-brand-navy dark:text-brand-softBlue dark:bg-slate-800',
    detail: 'Unified umbrella for your entire family, supporting multiple profiles with custom access permissions.',
  },
  {
    step: 2,
    title: 'Connect or Add Accounts',
    description: 'Link bank accounts securely with Plaid sandbox or add manual assets, vehicles, property, and loans.',
    icon: Landmark,
    color: '#4FA3CD',
    accent: 'bg-sky-500/10 text-brand-sky',
    detail: 'Supports checking, savings, credit cards, retirement IRAs, mortgages, and real estate valuation.',
  },
  {
    step: 3,
    title: 'Add Family & Child Profiles',
    description: 'Create individual profiles for your partner and supervised spaces for your kids with parental consent.',
    icon: Users,
    color: '#0F766E',
    accent: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    detail: 'Kids get a simple 4-digit PIN to access their tasks and goals. Adult finances stay 100% private.',
  },
  {
    step: 4,
    title: 'Assign Tasks & Star Goals',
    description: 'Set everyday chores and responsibilities. Kids earn stars toward tangible rewards and savings goals.',
    icon: Star,
    color: '#B45309',
    accent: 'bg-amber-500/10 text-amber-500',
    detail: 'Immutable star ledger ensures transparent earning, saving, and parent approval before rewards are redeemed.',
  },
  {
    step: 5,
    title: 'Track the Bigger Picture',
    description: 'Follow your net worth, monitor monthly budget utilization, and look ahead with the financial calendar.',
    icon: TrendingUp,
    color: '#66AFD3',
    accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    detail: 'From early allowance habits to building generational legacy — your financial tools evolve with you.',
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
    filter: 'blur(3px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 36 : -36,
    opacity: 0,
    filter: 'blur(3px)',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
};

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep) return;
    setDirection(newStep > activeStep ? 1 : -1);
    setActiveStep(newStep);
  };

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) {
      setDirection(1);
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setDirection(-1);
      setActiveStep((prev) => prev - 1);
    }
  };

  const currentStep = STEPS[activeStep];
  const Icon = currentStep.icon;

  return (
    <div className="py-16 bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">How FirstSavvy Works</span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white mt-2">
          From first stars to lifelong financial clarity
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base">
          A seamless 5-step journey that brings your family money habits and personal financial management into one place.
        </p>
      </div>

      {/* Interactive Step Navigation Tabs with sliding pill */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
        {STEPS.map((s, idx) => {
          const StepIcon = s.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={s.step}
              onClick={() => handleStepChange(idx)}
              className="relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky group cursor-pointer"
            >
              {/* Animated Active Background Highlight */}
              {isActive && (
                <motion.div
                  layoutId="activeStepPill"
                  className="absolute inset-0 bg-brand-navy dark:bg-slate-900 border border-brand-sky/40 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Inactive Background */}
              {!isActive && (
                <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 group-hover:bg-slate-100 dark:group-hover:bg-slate-700/80 transition-colors" />
              )}

              <div className="relative z-10 flex items-center justify-between w-full mb-2.5">
                <span 
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-brand-sky text-white' 
                      : isPassed
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Step {s.step}
                </span>

                <StepIcon 
                  className={`w-4 h-4 transition-colors ${
                    isActive 
                      ? 'text-brand-sky' 
                      : isPassed
                      ? 'text-emerald-500'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`} 
                />
              </div>

              <div 
                className={`relative z-10 text-xs font-bold truncate transition-colors ${
                  isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Display with AnimatePresence */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/20 to-white dark:from-slate-800/90 dark:via-slate-850 dark:to-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        {/* Animated Step Progress Indicator Line */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-sky via-brand-blue to-emerald-500"
            initial={false}
            animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="p-6 sm:p-10 min-h-[220px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
            >
              {/* Step Icon with animated bounce */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${currentStep.accent} flex items-center justify-center shrink-0 shadow-xs`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 hover:scale-110" />
              </div>

              {/* Step Text Info */}
              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                    Step {currentStep.step} of 5
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-xs text-slate-500 font-medium">Ready in minutes</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
                  {currentStep.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {currentStep.description}
                </p>

                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{currentStep.detail}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-3 pt-2 md:pt-0">
                {activeStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                )}

                {activeStep < STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4 text-brand-sky" />
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    <span>Get Started Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
