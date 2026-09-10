'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PieChart, DollarSign, Calendar, TrendingDown, CheckCircle2, X, Check } from 'lucide-react';

export function LiveBudgetSetupPreview() {
  const [selectedCat, setSelectedCat] = useState<'groceries' | 'housing' | 'entertainment' | 'savings'>('groceries');
  const [budgetLimit, setBudgetLimit] = useState(1200);
  const [isSaved, setIsSaved] = useState(false);

  const categoryData = {
    groceries: { name: 'Groceries & Household Goods', spent: 845.20, rule: 'Needs (50%)', defaultLimit: 1200 },
    housing: { name: 'Housing, Utilities & Internet', spent: 2450.00, rule: 'Needs (50%)', defaultLimit: 2600 },
    entertainment: { name: 'Family Outings & Fun', spent: 420.00, rule: 'Wants (30%)', defaultLimit: 800 },
    savings: { name: 'Emergency & College 529', spent: 409.70, rule: 'Savings (20%)', defaultLimit: 1900 },
  };

  const current = categoryData[selectedCat];
  const spent = current.spent;
  const remaining = Math.max(budgetLimit - spent, 0);
  const percent = Math.min(Math.round((spent / budgetLimit) * 100), 100);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div
      data-mock-preview
      className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden select-none text-left font-sans flex flex-col transition-all duration-300"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
            <PieChart className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            50/30/20 Budgeting Workspace
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">First Savvy Budgets</span>
      </div>

      {/* Interactive Form & Visualizer */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 space-y-3.5 text-xs">
        {/* Category Selector Pills */}
        <div className="space-y-1.5">
          <label className="text-slate-500 dark:text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
            Select Budget Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(['groceries', 'housing', 'entertainment', 'savings'] as const).map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => {
                  setSelectedCat(catKey);
                  setBudgetLimit(categoryData[catKey].defaultLimit);
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedCat === catKey
                    ? 'bg-[#52A5CE] text-white shadow-xs font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {catKey}
              </button>
            ))}
          </div>
        </div>

        {/* Category Title & 50/30/20 Tag */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{current.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{current.rule}</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-[#52A5CE] text-[11px] font-bold">
            Target Active
          </span>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Planned Limit</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
              ${budgetLimit.toFixed(2)}
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Actual Spent</div>
            <div className="font-bold text-sm text-[#52A5CE] mt-0.5">
              ${spent.toFixed(2)}
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Remaining</div>
            <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
              ${remaining.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Utilization: {percent}%</span>
            <span className="text-slate-400 font-medium">${remaining.toFixed(2)} safe buffer</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                percent > 90 ? 'bg-rose-500' : percent > 75 ? 'bg-amber-500' : 'bg-[#52A5CE]'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Save Target Action */}
        <Link
          href="/signup"
          className="w-full py-2.5 rounded-xl bg-[#52A5CE] hover:bg-[#438fb6] text-white font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          title="Sign up to save budget targets"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Budget Target (${budgetLimit.toFixed(2)})</span>
        </Link>

        {isSaved && (
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Category budget cap updated in real-time!
          </div>
        )}
      </div>
    </div>
  );
}
