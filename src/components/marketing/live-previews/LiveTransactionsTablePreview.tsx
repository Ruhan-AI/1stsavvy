'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  cat: string;
  type: 'Deposit' | 'Expense' | 'Transfer';
  amount: string;
  status: 'posted' | 'pending';
  date: string;
  account: string;
  catColor: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Monthly Salary Deposit', cat: 'Income', type: 'Deposit', amount: '+$4,750.00', status: 'posted', date: 'Aug 22, 2026', account: 'Primary Checking ...1001', catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' },
  { id: '2', name: 'Fresh Market — Downtown', cat: 'Groceries', type: 'Expense', amount: '-$164.50', status: 'posted', date: 'Aug 21, 2026', account: 'Rewards Card ...2002', catColor: 'bg-sky-50 text-[#52A5CE] border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800' },
  { id: '3', name: 'Home Mortgage Escrow', cat: 'Housing', type: 'Expense', amount: '-$1,850.00', status: 'posted', date: 'Aug 18, 2026', account: 'Primary Checking ...1001', catColor: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800' },
  { id: '4', name: 'Leo Star Allowance Payout', cat: 'Family & Chores', type: 'Transfer', amount: '-$25.00', status: 'pending', date: 'Aug 22, 2026', account: 'First Savvy Star Ledger', catColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800' },
  { id: '5', name: 'Index Fund Auto-Invest', cat: 'Investments', type: 'Transfer', amount: '-$500.00', status: 'pending', date: 'Aug 24, 2026', account: 'Investment Account ...3003', catColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800' },
];

export function LiveTransactionsTablePreview() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = TRANSACTIONS.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      data-mock-preview
      className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden select-none text-left font-sans flex flex-col transition-all duration-300"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Recent Transactions</span>
        </div>
      </div>

      {/* Controls Bar: Search, Add Button */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2.5">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#52A5CE] focus:bg-white dark:focus:bg-slate-900"
            />
          </div>

          {/* Add Button */}
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#52A5CE] hover:bg-[#438fb6] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            title="Sign up to add transactions"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Txn</span>
          </Link>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Description &amp; Merchant</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4">Source Account</th>
              <th className="py-2.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No matching transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-default group"
                >
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
                    {t.date}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${t.catColor}`}>
                      {t.cat}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {t.account}
                  </td>
                  <td className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                    t.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {t.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
