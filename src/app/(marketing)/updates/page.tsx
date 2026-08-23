'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const HeroConstellationCanvas = dynamic(
  () => import('@/components/3d/HeroConstellationCanvas').then(mod => mod.HeroConstellationCanvas),
  { ssr: false }
);

export default function UpdatesPage() {
  const roadmapItems = [
    {
      title: 'Family Tasks & Star Ledger v1.0',
      status: 'Available Now',
      statusColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      description: 'Supervised child spaces, custom task scheduling, immutable star ledger, and reward redemptions.',
    },
    {
      title: 'Banking & Plaid Sandbox Connectivity',
      status: 'Available Now',
      statusColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      description: 'Connect test bank accounts, import transactions, categorize spending, and calculate net worth.',
    },
    {
      title: 'Business & Entrepreneurial Profiles',
      status: 'In Development',
      statusColor: 'bg-sky-50 text-brand-sky dark:bg-sky-950/60 dark:text-sky-300',
      description: 'Separate business accounts, invoicing, revenue tracking, and business entity segregation.',
    },
    {
      title: 'Estate & Legacy Planning Hub',
      status: 'Coming Soon',
      statusColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
      description: 'Document organization, beneficiary designations, digital asset vaults, and legal partner reviews.',
    },
    {
      title: 'Credit Score Bureau Integration',
      status: 'Coming Soon',
      statusColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      description: 'Secure per-user credit score monitoring with rating breakdown and change context.',
    },
  ];

  return (
    // §2 narrow marketing container + §3 marketing page rhythm.
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 sm:pb-20 space-y-12 sm:space-y-20 lg:space-y-24 relative">
      {/* 3D Background Canvas — decorative, pinned to the top band, never widens the page (§12). */}
      <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[260px] sm:h-[360px] lg:h-[450px] pointer-events-none -z-0 opacity-20 dark:opacity-30 overflow-hidden">
        <CanvasErrorBoundary>
          <HeroConstellationCanvas />
        </CanvasErrorBoundary>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 relative z-10">
        <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Roadmap & Changelog</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
          What we're building next at First Savvy
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Follow our latest feature releases and join early access lists for upcoming family, personal finance, and estate capabilities.
        </p>
      </div>

      {/* Waitlist Box */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl space-y-4 text-center max-w-2xl mx-auto relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-brand-sky mx-auto">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">Be the first to test new features</h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Get notified when new parent tools, allowance integrations, and business modules enter beta testing.
        </p>
        <div className="pt-2">
          <WaitlistForm />
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-6 sm:space-y-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">Active Roadmap</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {roadmapItems.map((item, i) => (
            <div
              key={i}
              className="min-w-0 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-brand-sky/40 transition-colors"
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="min-w-0 break-words text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white leading-snug">{item.title}</h3>
                  <span className={`shrink-0 whitespace-nowrap text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
