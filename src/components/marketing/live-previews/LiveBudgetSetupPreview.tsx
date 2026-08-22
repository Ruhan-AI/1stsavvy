'use client';

import React, { useState } from 'react';
import { PieChart, DollarSign, Calendar, TrendingDown, CheckCircle2, X } from 'lucide-react';

export function LiveBudgetSetupPreview() {
  const [spent, setSpent] = useState(845.20);
  const budgetLimit = 1200.00;
  const remaining = budgetLimit - spent;
  const percent = Math.round((spent / budgetLimit) * 100);

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#AACC96] flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5" /> Budget Setup & Tracking
        </div>
        <button type="button" className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Form & Visualizer matching app.firstsavvy.com */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Category & 50/30/20 Tag */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold text-[11px]">Budget Category</label>
            <span className="px-2 py-0.5 rounded bg-[#52A5CE]/15 text-[#52A5CE] text-[10px] font-bold">
              Needs (50% Rule)
            </span>
          </div>
          <input
            type="text"
            readOnly
            value="Groceries, Supermarket & Household Supplies"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none"
          />
        </div>

        {/* Planned, Actual, and Remaining Metrics Strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Planned</div>
            <div className="font-mono font-bold text-sm text-white mt-0.5">$1,200.00</div>
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

        {/* Live Progress Bar with Visual Feedback */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Monthly Budget Progress</span>
            <span className="font-bold text-[#52A5CE]">{percent}% Spent</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#AACC96] via-[#52A5CE] to-[#EFCE7B] transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>9 Days remaining in monthly cycle</span>
            <span className="text-[#AACC96] font-semibold">Under Budget Target</span>
          </div>
        </div>

        {/* Action Button from app.firstsavvy.com */}
        <div className="pt-1">
          <button
            type="button"
            className="w-full bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 sm:px-6 py-2.5 h-10 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Save Budget ($1,200.00 / month)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
