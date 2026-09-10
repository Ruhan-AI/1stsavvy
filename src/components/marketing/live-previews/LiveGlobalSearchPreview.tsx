'use client';

import React from 'react';
import {
  ArrowRight,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

/**
 * Static mock preview of the Global Search interface.
 * Rendered like a clean, picture-perfect UI mockup:
 * - No scrolling or overflow bars
 * - Sized to fit comfortably in its container
 * - Completely static (no click/typing animations or interactive states)
 */
export function LiveGlobalSearchPreview() {
  const accounts = [
    {
      id: 'acc-1',
      title: 'Primary Checking Account',
      subtitle: 'asset - bank - Primary household spend',
    },
    {
      id: 'acc-2',
      title: 'High Yield Savings',
      subtitle: 'asset - bank - Emergency 6-month buffer',
    },
  ];

  const transactions = [
    {
      id: 'tx-1',
      title: 'Fresh Market — Household Staples',
      subtitle: '$164.50 - debit - Platinum Rewards Card',
    },
    {
      id: 'tx-2',
      title: 'Corporate Payroll — Direct Deposit',
      subtitle: '+$4,750.00 - credit - Primary Checking Account',
    },
  ];

  return (
    <div
      data-mock-preview
      aria-hidden="true"
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left font-sans shadow-xl select-none pointer-events-none cursor-default dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Search</h3>
      </div>

      {/* Query + Filters row */}
      <div className="border-b border-slate-200 p-3.5 space-y-3 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <div className="flex h-10 w-full items-center rounded-md border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            Checking
          </div>
        </div>

        <div className="grid grid-cols-[1fr_7.5rem] gap-3">
          {/* Types */}
          <div className="min-w-0">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Types
            </div>
            <div className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <span className="flex min-w-0 items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                <span className="truncate">All</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
            </div>
          </div>

          {/* Limit */}
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Limit
            </div>
            <div className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <span className="truncate">5 per type</span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Static Search Results — fitted to the container with no scrollbar */}
      <div className="p-3.5 space-y-3.5 overflow-hidden">
        {/* Accounts Group */}
        <div>
          <div className="mb-1.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-[#52A5CE]" />
              <span>Accounts</span>
            </div>
            <span className="text-xs font-semibold text-slate-400">{accounts.length}</span>
          </div>

          <div className="space-y-1">
            {accounts.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-transparent bg-slate-50/70 px-3 py-2 text-left dark:bg-slate-800/60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sky-50 text-[#52A5CE] dark:bg-slate-800 dark:text-sky-400">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Group */}
        <div>
          <div className="mb-1.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>Transactions</span>
            </div>
            <span className="text-xs font-semibold text-slate-400">{transactions.length}</span>
          </div>

          <div className="space-y-1">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-transparent bg-slate-50/70 px-3 py-2 text-left dark:bg-slate-800/60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
