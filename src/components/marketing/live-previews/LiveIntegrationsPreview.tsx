'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export function LiveIntegrationsPreview() {
  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] text-left font-sans shadow-xl select-none dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">Integrations</h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Connect your banks to automatically import transactions and sync balances.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex min-h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-[#52A5CE] px-4 py-2 text-sm font-bold text-white shadow-2xs transition-all hover:bg-[#438fb6] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Add Bank</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white py-12 px-6 text-center shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
          <p className="text-base font-bold text-slate-800 dark:text-white">No banks connected</p>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm dark:text-slate-400">
            Add a bank to start importing transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
