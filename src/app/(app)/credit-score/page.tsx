'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from 'lucide-react';

export default function CreditScorePage() {
  const { activeProfile } = useFirstSavvyStore();
  const [score, setScore] = useState(764);

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Credit Health</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Provider Beta Contract
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Credit Score & Bureau Insights
          </h1>
        </div>
      </div>

      {/* Compliance / Privacy Callout */}
      <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-brand-sky/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
        <div className="font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-sky" />
          <span>Individualized Bureau Privacy Contract</span>
        </div>
        <p className="leading-relaxed">
          Credit scores are calculated individually for <strong>{activeProfile.displayName}</strong>. Credit reports are never merged into household or child profiles and require soft-pull bureau token authorization.
        </p>
      </div>

      {/* Score Gauge Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">VantageScore 3.0 (Equifax / TransUnion)</div>
          <div className="text-5xl sm:text-6xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
            {score}
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Excellent Rating</span>
          </div>
        </div>

        {/* Meter bar */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-500 rounded-full" style={{ width: '85%' }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>300 (Poor)</span>
            <span>670 (Good)</span>
            <span>850 (Exceptional)</span>
          </div>
        </div>

        {/* Score Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <div className="text-slate-500 font-medium">Payment History</div>
            <div className="font-bold text-emerald-600">100% On-Time</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <div className="text-slate-500 font-medium">Credit Utilization</div>
            <div className="font-bold text-emerald-600">8% (Under 30% goal)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <div className="text-slate-500 font-medium">Average Credit Age</div>
            <div className="font-bold text-brand-navy dark:text-white">8 Years, 4 Mos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
