'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Landmark, 
  Users, 
  Star, 
  TrendingUp, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: 'Create your Household',
    description: 'Set up your household workspace, preferred currency, and timezone in under 2 minutes.',
    icon: Home,
    color: '#324154',
    detail: 'Unified umbrella for your entire family, supporting multiple profiles with custom access permissions.',
  },
  {
    step: 2,
    title: 'Connect or Add Accounts',
    description: 'Link bank accounts securely with Plaid sandbox or add manual assets, vehicles, property, and loans.',
    icon: Landmark,
    color: '#4FA3CD',
    detail: 'Supports checking, savings, credit cards, retirement IRAs, mortgages, and real estate valuation.',
  },
  {
    step: 3,
    title: 'Add Family & Child Profiles',
    description: 'Create individual profiles for your partner and supervised spaces for your kids with parental consent.',
    icon: Users,
    color: '#0F766E',
    detail: 'Kids get a simple 4-digit PIN to access their tasks and goals. Adult finances stay 100% private.',
  },
  {
    step: 4,
    title: 'Assign Tasks & Star Goals',
    description: 'Set everyday chores and responsibilities. Kids earn stars toward tangible rewards and savings goals.',
    icon: Star,
    color: '#B45309',
    detail: 'Immutable star ledger ensures transparent earning, saving, and parent approval before rewards are redeemed.',
  },
  {
    step: 5,
    title: 'Track the Bigger Picture',
    description: 'Follow your net worth, monitor monthly budget utilization, and look ahead with the financial calendar.',
    icon: TrendingUp,
    color: '#66AFD3',
    detail: 'From early allowance habits to building generational legacy — your financial tools evolve with you.',
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="py-16 bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">How FirstSavvy Works</span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white mt-2">
          From first stars to lifelong financial clarity
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base">
          A seamless 5-step journey that brings your family money habits and personal financial management into one place.
        </p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-8">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-sky/30'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isActive ? 'bg-brand-sky text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  Step {s.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-sky' : 'text-slate-400'}`} />
              </div>
              <div className="text-xs font-bold truncate">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Display */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 dark:from-slate-800/80 dark:to-slate-900/80 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-sky/20 flex items-center justify-center text-brand-sky shrink-0">
          {React.createElement(STEPS[activeStep].icon, { className: 'w-8 h-8 sm:w-10 sm:h-10' })}
        </div>
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">Step {STEPS[activeStep].step} of 5</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs text-slate-500 font-medium">Ready in minutes</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
            {STEPS[activeStep].title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {STEPS[activeStep].description}
          </p>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{STEPS[activeStep].detail}</span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {activeStep < STEPS.length - 1 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href="/signup"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
