'use client';

import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, CheckCircle2, Shield, Tag } from 'lucide-react';

export function LiveTransactionsTablePreview() {
  const [filter, setFilter] = useState<'all' | 'posted' | 'pending'>('all');

  const transactions = [
    { name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', type: 'Deposit', amount: '+$4,750.00', status: 'posted', date: 'Aug 22', account: 'Chase Checking ...4921' },
    { name: 'Whole Foods Market', cat: 'Groceries', type: 'Expense', amount: '-$164.50', status: 'posted', date: 'Aug 21', account: 'Chase Sapphire ...8812' },
    { name: 'Rocket Mortgage Escrow', cat: 'Housing', type: 'Expense', amount: '-$2,450.00', status: 'posted', date: 'Aug 18', account: 'Chase Checking ...4921' },
    { name: 'Emma Star Allowance Payout', cat: 'Family', type: 'Transfer', amount: '-$25.00', status: 'pending', date: 'Aug 22', account: 'Family Ledger' },
    { name: 'Vanguard S&P 500 Index Auto-Invest', cat: 'Investments', type: 'Transfer', amount: '-$500.00', status: 'pending', date: 'Aug 24', account: 'Vanguard Brokerage' },
  ];

  const filtered = transactions.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left">
      {/* Browser Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
            app.firstsavvy.com/banking
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
            Plaid 256-Bit Sync
          </span>
        </div>
      </div>

      {/* Table Filters Header */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['all', 'posted', 'pending'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                  filter === f
                    ? 'bg-brand-sky text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f} ({f === 'all' ? transactions.length : transactions.filter(t => t.status === f).length})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                readOnly
                value="Filter transactions..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5 text-brand-sky" /> Filters
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3.5">Date</th>
                <th className="py-2.5 px-3.5">Merchant / Description</th>
                <th className="py-2.5 px-3.5 hidden md:table-cell">Category</th>
                <th className="py-2.5 px-3.5 hidden sm:table-cell">Account</th>
                <th className="py-2.5 px-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3.5 font-mono text-slate-400 whitespace-nowrap">{item.date}</td>
                  <td className="py-3 px-3.5">
                    <div className="font-semibold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 sm:hidden">
                      <span>{item.cat}</span> • <span>{item.account}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium text-[11px]">
                      {item.cat}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 hidden sm:table-cell text-slate-400 text-[11px] truncate max-w-[140px]">
                    {item.account}
                  </td>
                  <td className={`py-3 px-3.5 text-right font-mono font-bold text-sm whitespace-nowrap ${
                    item.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
