import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Star, 
  Shield, 
  Wallet,
  Calendar,
  Layers
} from 'lucide-react';

export function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full">
      {/* Decorative ambient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-sky/30 via-brand-navy/20 to-brand-softBlue/30 rounded-3xl blur-2xl opacity-70 -z-10" />

      {/* Main Container */}
      <div className="relative rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/90 dark:border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Mock App Window Bar */}
        <div className="bg-slate-100/90 dark:bg-[#15202B] px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-600 dark:text-slate-400 hidden sm:inline">
              app.firstsavvy.com/dashboard
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Demo Sync
            </span>
            <span className="bg-brand-sky/10 text-brand-sky px-2 py-0.5 rounded text-[10px] font-bold uppercase">
              The Miller Family
            </span>
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-slate-900/30">
          {/* Left / Main: Adult Financial Hub (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#243346] border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Net Worth</div>
                <div className="text-2xl font-bold text-brand-navy dark:text-white mt-1">$437,407.70</div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+3.2% this month</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#243346] border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">August Spending</div>
                <div className="text-2xl font-bold text-brand-navy dark:text-white mt-1">$4,124.90</div>
                <div className="text-xs text-slate-500 mt-1">
                  <span className="text-brand-sky font-semibold">$2,450.00</span> budget left
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#243346] border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Connected Accounts</div>
                <div className="text-2xl font-bold text-brand-navy dark:text-white mt-1">7 Active</div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span>Plaid & Manual</span>
                </div>
              </div>
            </div>

            {/* Financial Activity & Category Breakdown Preview */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#243346] border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-sky" />
                  <span className="text-sm font-bold text-brand-navy dark:text-white">Recent Household Activity</span>
                </div>
                <span className="text-xs font-semibold text-brand-sky">View Banking →</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', amount: '+$4,750.00', positive: true, date: 'Today' },
                  { name: 'Whole Foods Market', cat: 'Groceries', amount: '-$164.50', positive: false, date: 'Yesterday' },
                  { name: 'Rocket Mortgage Escrow', cat: 'Housing', amount: '-$2,450.00', positive: false, date: 'Aug 18' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.cat} • {item.date}</div>
                    </div>
                    <div className={`font-mono font-bold ${item.positive ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Family Hub Preview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Child Profile Widget */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-sky flex items-center justify-center font-bold text-white text-sm">
                    L
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">Leo's Kid Space</div>
                    <div className="text-[11px] text-brand-softBlue">Supervised Learning</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>42 Stars</span>
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-2 relative z-10">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-softBlue">Today's Responsibilities</div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded bg-white/10 text-xs backdrop-blur-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Feed & Walk Dog</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">+3 ⭐</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-white/10 text-xs backdrop-blur-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/40" />
                      <span>Math Homework</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">+4 ⭐</span>
                  </div>
                </div>
              </div>

              {/* Savings Goal Bar */}
              <div className="pt-2 border-t border-white/15 relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-200">Goal: Mountain Bike</span>
                  <span className="font-bold text-amber-300">42 / 80 ⭐</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full" style={{ width: '52%' }} />
                </div>
              </div>
            </div>

            {/* Parent Visibility Callout */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#243346] border border-slate-200/80 dark:border-slate-700 shadow-sm text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-brand-navy dark:text-slate-100">
                <Shield className="w-4 h-4 text-brand-sky" />
                <span>Separate Access. Same Family.</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Kids see their tasks and goals. Adult banking, transactions, and net worth remain strictly protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
