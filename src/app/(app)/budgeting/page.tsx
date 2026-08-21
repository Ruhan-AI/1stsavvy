'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney, calculateBudgetSummary } from '@/lib/utils/format';
import { 
  PieChart, 
  Plus, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers, 
  Check, 
  Sparkles,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function BudgetingPage() {
  const { state } = useFirstSavvyStore();
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Derive budget items from categories & transactions
  const budgetItems = state.categories.map((cat) => {
    const plannedCents = cat.budgetAmountCents || 0;
    const actualCents = state.transactions
      .filter((t) => t.categoryId === cat.id && t.status !== 'excluded')
      .reduce((sum, t) => sum + Math.abs(t.amountCents), 0);

    return {
      categoryId: cat.id,
      categoryName: cat.name,
      categoryIcon: cat.icon,
      categoryColor: cat.color,
      type: cat.type,
      plannedCents,
      actualCents,
    };
  });

  const summary = calculateBudgetSummary(budgetItems);

  const handleCopyPreviousMonth = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const expenseItems = budgetItems.filter((i) => i.type === 'expense');
  const incomeItems = budgetItems.filter((i) => i.type === 'income');

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Cash Flow & Planning</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Monthly Household Budgets
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyPreviousMonth}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy July Budget</span>
          </button>

          <button
            onClick={() => setCategoryModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Category Manager</span>
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Previous month targets copied to August successfully!</span>
        </div>
      )}

      {/* 2. Monthly Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Planned Spending</div>
          <div className="text-2xl font-bold text-brand-navy dark:text-white">
            {formatMoney(summary.totalPlannedExpense)}
          </div>
          <div className="text-xs text-slate-400">Total expected expenses</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Actual Spending (MTD)</div>
          <div className="text-2xl font-bold text-brand-sky">
            {formatMoney(summary.totalActualExpense)}
          </div>
          <div className="text-xs text-slate-400">
            {summary.expensePercentage}% of budget utilized
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Remaining to Spend</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatMoney(summary.remainingExpense)}
          </div>
          <div className="text-xs text-emerald-600 font-medium">Safe to spend this month</div>
        </div>
      </div>

      {/* 3. Expense Budget Items List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Expense Categories</h2>
          <span className="text-xs text-slate-500">{expenseItems.length} active categories</span>
        </div>

        <div className="space-y-4">
          {expenseItems.map((item) => {
            const pct = item.plannedCents > 0 ? Math.min(100, Math.round((item.actualCents / item.plannedCents) * 100)) : 0;
            const remaining = Math.max(0, item.plannedCents - item.actualCents);
            const isOver = item.actualCents > item.plannedCents && item.plannedCents > 0;

            return (
              <div key={item.categoryId} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: item.categoryColor }}
                    />
                    <span className="font-bold text-xs text-brand-navy dark:text-white">{item.categoryName}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-brand-navy dark:text-white">
                      {formatMoney(item.actualCents)}
                    </span>
                    <span className="text-xs text-slate-400"> of {formatMoney(item.plannedCents)}</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isOver ? 'bg-rose-500' : 'bg-brand-sky'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>{pct}% utilized</span>
                  <span>{isOver ? <strong className="text-rose-600">Over budget</strong> : `${formatMoney(remaining)} left`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Income Categories */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Expected Income Streams</h2>
          <span className="text-xs text-slate-500">{incomeItems.length} active streams</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {incomeItems.map((inc) => (
            <div key={inc.categoryId} className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 text-xs space-y-1">
              <div className="font-bold text-brand-navy dark:text-white">{inc.categoryName}</div>
              <div className="text-lg font-mono font-bold text-emerald-600">
                {formatMoney(inc.plannedCents)}
              </div>
              <div className="text-[10px] text-slate-500">Actual received: {formatMoney(inc.actualCents)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
