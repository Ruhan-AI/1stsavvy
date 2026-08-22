'use client';

import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, CheckCircle2, Shield, Tag, Download, Plus } from 'lucide-react';

export function LiveTransactionsTablePreview() {
  const [filter, setFilter] = useState<'all' | 'posted' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    { id: '1', name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', type: 'Deposit', amount: '+$4,750.00', status: 'posted', date: 'Aug 22, 2026', account: 'Chase Checking ...4921', catColor: 'bg-[#25533F]/30 text-[#AACC96] border-[#AACC96]/30' },
    { id: '2', name: 'Whole Foods Market — Columbus', cat: 'Groceries', type: 'Expense', amount: '-$164.50', status: 'posted', date: 'Aug 21, 2026', account: 'Sapphire Preferred ...8812', catColor: 'bg-[#52A5CE]/20 text-[#52A5CE] border-[#52A5CE]/30' },
    { id: '3', name: 'Rocket Mortgage Escrow', cat: 'Housing', type: 'Expense', amount: '-$2,450.00', status: 'posted', date: 'Aug 18, 2026', account: 'Chase Checking ...4921', catColor: 'bg-[#EF6F3C]/20 text-[#EF6F3C] border-[#EF6F3C]/30' },
    { id: '4', name: 'Emma Star Allowance Payout', cat: 'Family & Chores', type: 'Transfer', amount: '-$25.00', status: 'pending', date: 'Aug 22, 2026', account: 'First Savvy Star Ledger', catColor: 'bg-[#EFCE7B]/20 text-[#EFCE7B] border-[#EFCE7B]/30' },
    { id: '5', name: 'Vanguard S&P 500 Auto-Invest', cat: 'Investments', type: 'Transfer', amount: '-$500.00', status: 'pending', date: 'Aug 24, 2026', account: 'Vanguard Brokerage ...1092', catColor: 'bg-[#D3B6D3]/20 text-[#D3B6D3] border-[#D3B6D3]/30' },
  ];

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Browser Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
            https://app.firstsavvy.com/transactions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#AACC96] bg-[#25533F]/30 px-2.5 py-0.5 rounded border border-[#AACC96]/30">
            ✓ Plaid Synchronized
          </span>
        </div>
      </div>

      {/* Workspace Bar matching app.firstsavvy.com */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['all', 'posted', 'pending'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  filter === f
                    ? 'bg-[#52A5CE] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f} ({f === 'all' ? transactions.length : transactions.filter(t => t.status === f).length})
              </button>
            ))}
          </div>

          {/* Search and Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-52">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52A5CE]"
              />
            </div>
            <button
              type="button"
              className="bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3.5">Date</th>
                <th className="py-3 px-3.5">Description & Merchant</th>
                <th className="py-3 px-3.5 hidden md:table-cell">Category</th>
                <th className="py-3 px-3.5 hidden sm:table-cell">Source Account</th>
                <th className="py-3 px-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-3.5 font-mono text-slate-400 whitespace-nowrap text-[11px]">{item.date}</td>
                  <td className="py-3.5 px-3.5">
                    <div className="font-semibold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 sm:hidden">
                      <span>{item.cat}</span> • <span>{item.account}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5 hidden md:table-cell">
                    <span className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold ${item.catColor}`}>
                      {item.cat}
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 hidden sm:table-cell text-slate-400 text-[11px] truncate max-w-[160px]">
                    {item.account}
                  </td>
                  <td className={`py-3.5 px-3.5 text-right font-mono font-bold text-sm whitespace-nowrap ${
                    item.amount.startsWith('+') ? 'text-[#AACC96]' : 'text-slate-200'
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
