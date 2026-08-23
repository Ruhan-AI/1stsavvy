'use client';

import React, { useState } from 'react';
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
    <div data-mock-preview className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#AACC96] flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5" /> 50/30/20 Budgeting Workspace
        </div>
        <button type="button" className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Form & Visualizer */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Category Selector Pills */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-semibold text-[11px]">Select Budget Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(['groceries', 'housing', 'entertainment', 'savings'] as const).map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => {
                  setSelectedCat(catKey);
                  setBudgetLimit(categoryData[catKey].defaultLimit);
                }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                  selectedCat === catKey
                    ? 'bg-[#52A5CE] text-white shadow-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {catKey}
              </button>
            ))}
          </div>
        </div>

        {/* Category Title & 50/30/20 Tag */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-bold text-white text-xs">{current.name}</div>
            <div className="text-[11px] text-slate-400">{current.rule}</div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#52A5CE]/15 text-[#52A5CE] text-[11px] font-bold">
            Target Active
          </span>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Planned Limit</div>
            <div className="font-mono font-bold text-sm text-white mt-0.5">${budgetLimit.toFixed(2)}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Actual Spent</div>
            <div className="font-mono font-bold text-sm text-[#52A5CE] mt-0.5">${spent.toFixed(2)}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Remaining</div>
            <div className="font-mono font-bold text-sm text-[#AACC96] mt-0.5">${remaining.toFixed(2)}</div>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Adjust Monthly Limit:</span>
            <span className="font-mono font-bold text-white">${budgetLimit}</span>
          </div>
          <input
            type="range"
            min="500"
            max="4000"
            step="50"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#52A5CE]"
          />
        </div>

        {/* Live Progress Bar with Visual Feedback */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Monthly Budget Usage</span>
            <span className="font-bold text-[#52A5CE]">{percent}% Spent</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#AACC96] via-[#52A5CE] to-[#EFCE7B] transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>9 Days left in cycle</span>
            <span className="text-[#AACC96] font-semibold">
              {percent < 90 ? '✓ Under Budget Target' : '⚠️ Near Limit'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          {isSaved ? (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold flex items-center justify-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Budget of ${budgetLimit.toFixed(2)} Saved for {current.name.split(' ')[0]}!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 sm:px-6 py-2.5 h-10 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Save Budget (${budgetLimit.toFixed(2)} / month)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
