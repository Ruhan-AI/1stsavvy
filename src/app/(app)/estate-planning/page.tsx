'use client';

import React from 'react';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FileText, Shield, Sparkles, AlertCircle, Lock, BookOpen } from 'lucide-react';

export default function EstatePlanningPage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Generational Wealth</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Roadmap Module (Coming Soon)
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
          Estate & Legacy Planning
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          From your first stars to protecting what you build and leave behind.
        </p>
      </div>

      {/* Legal Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <strong>Legal Disclaimer:</strong> First Savvy provides software organization tools and does not provide legal advice, attorney representation, or estate execution services. All legal documents require qualified legal review.
        </div>
      </div>

      {/* Future Estate Planning Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-brand-sky flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Will & Trust Coordination</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Organize digital records of existing trusts, wills, health directives, and attorney contact points.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Beneficiary Designation Audit</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verify that your retirement accounts, life insurance policies, and savings match your intended heirs.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-navy-50 dark:bg-slate-800 text-brand-navy dark:text-brand-softBlue flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Legacy Letters & Family Values</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Write personal financial wisdom notes and life lessons to be passed down alongside tangible assets.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Digital Asset Vault</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Secure inventory of digital accounts, photos, and instructions for designated family executors.
          </p>
        </div>
      </div>

      {/* Waitlist Box */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4 max-w-xl mx-auto">
        <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">
          Join the Estate Planning Beta Waitlist
        </h3>
        <p className="text-xs text-slate-500">
          Be the first to test our generational wealth transfer and document organization features.
        </p>
        <div className="pt-2">
          <WaitlistForm category="estate_planning" buttonText="Notify Me on Launch" />
        </div>
      </div>
    </div>
  );
}
