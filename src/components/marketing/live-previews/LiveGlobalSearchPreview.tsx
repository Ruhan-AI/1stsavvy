'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CreditCard, 
  Landmark, 
  Users, 
  Target, 
  X, 
  Sparkles,
  Check
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'transaction' | 'account' | 'profile' | 'goal';
  title: string;
  subtitle: string;
  detail: string;
  category: string;
  amount?: string;
  isPositive?: boolean;
}

const ALL_SEARCH_DATABASE: SearchResultItem[] = [
  // Transactions
  {
    id: 't-1',
    type: 'transaction',
    title: 'Whole Foods Market — Columbus Circle',
    subtitle: 'Groceries • Chase ...8812 • Yesterday',
    detail: 'Plaid Linked',
    category: 'Groceries',
    amount: '-$164.50',
    isPositive: false
  },
  {
    id: 't-2',
    type: 'transaction',
    title: 'Whole Foods Market — Weekly Groceries',
    subtitle: 'Groceries • Chase ...8812 • Aug 11',
    detail: 'Plaid Linked',
    category: 'Groceries',
    amount: '-$142.10',
    isPositive: false
  },
  {
    id: 't-3',
    type: 'transaction',
    title: 'Acme Corp Bi-Weekly Direct Deposit',
    subtitle: 'Income • Checking ...4921 • Aug 22',
    detail: 'Payroll Automated',
    category: 'Income',
    amount: '+$4,750.00',
    isPositive: true
  },
  {
    id: 't-4',
    type: 'transaction',
    title: 'Rocket Mortgage Escrow Auto-Debit',
    subtitle: 'Housing • Checking ...4921 • Aug 18',
    detail: 'Monthly Household',
    category: 'Housing',
    amount: '-$2,450.00',
    isPositive: false
  },
  {
    id: 't-5',
    type: 'transaction',
    title: 'Emma Star Allowance Payout',
    subtitle: 'Family & Chores • Ledger • Aug 22',
    detail: 'Weekly Reward',
    category: 'Family',
    amount: '-$25.00',
    isPositive: false
  },
  {
    id: 't-6',
    type: 'transaction',
    title: 'Tesla Supercharger — Ohio Station',
    subtitle: 'Transportation • Card ...8812 • Aug 19',
    detail: 'EV Charging',
    category: 'Transportation',
    amount: '-$18.20',
    isPositive: false
  },

  // Accounts
  {
    id: 'a-1',
    type: 'account',
    title: 'Chase Total Checking (...4921)',
    subtitle: 'Primary Household Spend Account',
    detail: 'Plaid Active',
    category: 'Banking',
    amount: '$18,450.20',
    isPositive: true
  },
  {
    id: 'a-2',
    type: 'account',
    title: 'Chase High Yield Savings (...9021)',
    subtitle: 'Emergency 6-Month Buffer (4.85% APY)',
    detail: 'Savings',
    category: 'Banking',
    amount: '$14,000.00',
    isPositive: true
  },
  {
    id: 'a-3',
    type: 'account',
    title: 'Chase Sapphire Preferred (...8812)',
    subtitle: 'Everyday Household Credit Card',
    detail: 'Auto-Pay Sept 15',
    category: 'Credit Card',
    amount: '-$1,240.50',
    isPositive: false
  },

  // Profiles & Goals
  {
    id: 'p-1',
    type: 'profile',
    title: 'Emma Miller (Child Profile)',
    subtitle: 'Age 9 • Level 2 Star Explorer',
    detail: 'Supervised',
    category: 'Family',
    amount: '★ 45 Stars',
    isPositive: true
  },
  {
    id: 'g-1',
    type: 'goal',
    title: 'Nintendo Switch OLED Bundle',
    subtitle: 'Emma\'s Big Goal • 15 Stars left',
    detail: 'Milestone Goal',
    category: 'Goal',
    amount: '45/60 ★ (75%)',
    isPositive: true
  }
];

export function LiveGlobalSearchPreview() {
  const [searchTerm, setSearchTerm] = useState('Chase');
  const [typeFilter, setTypeFilter] = useState<'all' | 'transaction' | 'account' | 'profile' | 'goal'>('all');
  const [selectedResult, setSelectedResult] = useState<SearchResultItem | null>(null);

  // Dynamic search logic
  const filteredResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ALL_SEARCH_DATABASE.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesQuery = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.amount && item.amount.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [searchTerm, typeFilter]);

  const transactions = filteredResults.filter(r => r.type === 'transaction');
  const otherResults = filteredResults.filter(r => r.type !== 'transaction');

  const presetQueries = ['Chase', 'Whole Foods', 'Emma', 'Salary', 'Tesla'];

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans max-h-[480px] flex flex-col">
      {/* Compact Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52A5CE] animate-pulse" />
          <span>Global Search (⌘K)</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">First Savvy</div>
      </div>

      {/* Main Content Area with Compact Layout */}
      <div className="p-3.5 sm:p-4 bg-slate-950/95 space-y-2.5 overflow-y-auto flex-1 custom-scrollbar">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-[#52A5CE]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accounts, transactions, family..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#52A5CE] transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-slate-500 font-bold uppercase text-[9px]">Quick:</span>
            {presetQueries.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => setSearchTerm(query)}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  searchTerm === query
                    ? 'bg-[#52A5CE] text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {query}
              </button>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-md border border-slate-800">
            {(['all', 'transaction', 'account', 'profile'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-1.5 py-0.5 rounded capitalize font-semibold transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-[#52A5CE] text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'all' ? 'All' : t === 'transaction' ? 'Txns' : t === 'account' ? 'Accounts' : 'Family'}
              </button>
            ))}
          </div>
        </div>

        {/* Results Stream */}
        {filteredResults.length === 0 ? (
          <div className="py-6 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
            No matching records found for &ldquo;{searchTerm}&rdquo;
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Matching Transactions (Max 2 displayed for compact height) */}
            {transactions.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-[#52A5CE]" /> Transactions ({transactions.length})
                  </span>
                  <span className="text-[9px] text-slate-500">Plaid Sync</span>
                </div>
                <div className="space-y-1">
                  {transactions.slice(0, 2).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedResult(item)}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#52A5CE]/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded bg-[#52A5CE]/10 text-[#52A5CE] flex items-center justify-center font-bold text-[10px] shrink-0 group-hover:bg-[#52A5CE] group-hover:text-white transition-colors">
                          {item.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-white group-hover:text-[#52A5CE] transition-colors truncate">{item.title}</div>
                          <div className="text-[9px] text-slate-400 truncate">{item.subtitle}</div>
                        </div>
                      </div>
                      <div className={`font-mono font-bold text-xs whitespace-nowrap ml-2 ${item.isPositive ? 'text-[#AACC96]' : 'text-slate-200'}`}>
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Matching Accounts / Profiles (Max 2 displayed) */}
            {otherResults.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-[#AACC96]" /> Accounts & Profiles ({otherResults.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {otherResults.slice(0, 2).map((acc) => (
                    <div 
                      key={acc.id}
                      onClick={() => setSelectedResult(acc)}
                      className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#AACC96]/50 transition-all cursor-pointer"
                    >
                      <div className="text-xs font-bold text-white truncate">{acc.title}</div>
                      <div className="text-[9px] text-slate-400 truncate">{acc.subtitle}</div>
                      <div className="text-[10px] font-mono text-[#AACC96] font-bold mt-0.5">{acc.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Selected Banner */}
        {selectedResult && (
          <div className="p-2 rounded-lg bg-slate-900 border border-[#52A5CE]/50 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#EFCE7B] shrink-0" />
              <span className="text-slate-300 truncate">
                Selected: <strong className="text-white">{selectedResult.title}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedResult(null)}
              className="text-slate-400 hover:text-white text-[10px] font-semibold shrink-0 ml-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
