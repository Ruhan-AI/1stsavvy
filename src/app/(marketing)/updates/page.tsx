import React from 'react';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Roadmap & Changelog</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
          What we're building next at FirstSavvy
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Follow our latest feature releases and join early access lists for upcoming family, personal finance, and estate capabilities.
        </p>
      </div>

      {/* Waitlist Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl space-y-4 text-center max-w-2xl mx-auto">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-sky mx-auto">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-serif font-bold">Be the first to test new features</h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          Get notified when new parent tools, allowance integrations, and business modules enter beta testing.
        </p>
        <div className="pt-2">
          <WaitlistForm category="feature_updates" buttonText="Join Early Access" />
        </div>
      </div>

      {/* Roadmap List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Product Roadmap Status</h2>
        <div className="space-y-4">
          {roadmapItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">{item.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
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
