'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CreditCard, 
  Landmark, 
  Users, 
  Target, 
  ListTodo, 
  TrendingUp, 
  X, 
  ArrowRight, 
  Check, 
  Sparkles,
  Car,
  Home
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
    subtitle: 'Groceries • Chase Sapphire ...8812 • Yesterday',
    detail: 'Processed Plaid Transaction',
    category: 'Groceries',
    amount: '-$164.50',
    isPositive: false
  },
  {
    id: 't-2',
    type: 'transaction',
    title: 'Whole Foods Market — Weekly Groceries',
    subtitle: 'Groceries • Chase Sapphire ...8812 • Aug 11',
    detail: 'Processed Plaid Transaction',
    category: 'Groceries',
    amount: '-$142.10',
    isPositive: false
  },
  {
    id: 't-3',
    type: 'transaction',
    title: 'Acme Corp Bi-Weekly Direct Deposit',
    subtitle: 'Income • Chase Checking ...4921 • Aug 22',
    detail: 'Payroll Automated Deposit',
    category: 'Income',
    amount: '+$4,750.00',
    isPositive: true
  },
  {
    id: 't-4',
    type: 'transaction',
    title: 'Rocket Mortgage Escrow Auto-Debit',
    subtitle: 'Housing • Chase Checking ...4921 • Aug 18',
    detail: 'Monthly Household Payment',
    category: 'Housing',
    amount: '-$2,450.00',
    isPositive: false
  },
  {
    id: 't-5',
    type: 'transaction',
    title: 'Emma Star Allowance Payout',
    subtitle: 'Family & Chores • Star Ledger • Aug 22',
    detail: 'Approved Weekly Reward',
    category: 'Family',
    amount: '-$25.00',
    isPositive: false
  },
  {
    id: 't-6',
    type: 'transaction',
    title: 'Tesla Supercharger — Ohio Station',
    subtitle: 'Transportation • Card ...8812 • Aug 19',
    detail: 'EV Charging Payment',
    category: 'Transportation',
    amount: '-$18.20',
    isPositive: false
  },
  {
    id: 't-7',
    type: 'transaction',
    title: 'Vanguard S&P 500 Index Auto-Invest',
    subtitle: 'Investments • Brokerage ...1092 • Aug 24',
    detail: 'Monthly Dollar Cost Averaging',
    category: 'Investments',
    amount: '-$500.00',
    isPositive: false
  },

  // Accounts
  {
    id: 'a-1',
    type: 'account',
    title: 'Chase Total Checking (...4921)',
    subtitle: 'Primary Household Spend Account',
    detail: 'Plaid 256-Bit Encrypted Link',
    category: 'Banking',
    amount: '$18,450.20 Available',
    isPositive: true
  },
  {
    id: 'a-2',
    type: 'account',
    title: 'Chase High Yield Savings (...9021)',
    subtitle: 'Emergency 6-Month Buffer (4.85% APY)',
    detail: 'Savings Account',
    category: 'Banking',
    amount: '$14,000.00 Balance',
    isPositive: true
  },
  {
    id: 'a-3',
    type: 'account',
    title: 'Chase Sapphire Preferred (...8812)',
    subtitle: 'Everyday Household Credit Card',
    detail: 'Due Sept 15 Auto-Pay',
    category: 'Credit Card',
    amount: '-$1,240.50 Due',
    isPositive: false
  },
  {
    id: 'a-4',
    type: 'account',
    title: 'Vanguard 500 Index Fund (VFIAX)',
    subtitle: 'Retirement & Brokerage Portfolio',
    detail: 'Market Investments',
    category: 'Investments',
    amount: '$124,500.00',
    isPositive: true
  },
  {
    id: 'a-5',
    type: 'account',
    title: '2023 Tesla Model Y Long Range',
    subtitle: 'Household Vehicle Asset',
    detail: 'Vehicle Valuation',
    category: 'Asset',
    amount: '$42,000.00 Equity',
    isPositive: true
  },

  // Profiles & Chores
  {
    id: 'p-1',
    type: 'profile',
    title: 'Emma Miller (Child Profile)',
    subtitle: 'Age 9 • Grade 4 • Level 2 Star Explorer',
    detail: 'Active Supervised Account',
    category: 'Family',
    amount: '★ 45 Stars Active',
    isPositive: true
  },
  {
    id: 'p-2',
    type: 'profile',
    title: 'Lucas Miller (Child Profile)',
    subtitle: 'Age 12 • Grade 7 • Level 3 Star Captain',
    detail: 'Active Supervised Account',
    category: 'Family',
    amount: '★ 80 Stars Active',
    isPositive: true
  },
  {
    id: 'p-3',
    type: 'profile',
    title: 'Sarah Miller (Parent Admin)',
    subtitle: 'Household Organizer • Full Permissions',
    detail: 'Master Parent Profile',
    category: 'Parent',
    amount: 'Admin Account',
    isPositive: true
  },

  // Goals
  {
    id: 'g-1',
    type: 'goal',
    title: 'Nintendo Switch OLED Bundle',
    subtitle: 'Emma\'s Big Goal • 15 Stars Remaining',
    detail: 'Milestone Goal',
    category: 'Goal',
    amount: '45 / 60 Stars (75%)',
    isPositive: true
  },
  {
    id: 'g-2',
    type: 'goal',
    title: 'Mountain Bike & Trail Helmet',
    subtitle: 'Lucas\'s Reward • 100% Achieved',
    detail: 'Ready to Redeem',
    category: 'Goal',
    amount: '80 / 80 Stars (100%)',
    isPositive: true
  }
];

export function LiveGlobalSearchPreview() {
  const [searchTerm, setSearchTerm] = useState('Whole Foods');
  const [typeFilter, setTypeFilter] = useState<'all' | 'transaction' | 'account' | 'profile' | 'goal'>('all');
  const [selectedResult, setSelectedResult] = useState<SearchResultItem | null>(null);

  // Dynamic real-time search and filter logic
  const filteredResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ALL_SEARCH_DATABASE.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesQuery = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q) ||
        (item.amount && item.amount.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [searchTerm, typeFilter]);

  const transactions = filteredResults.filter(r => r.type === 'transaction');
  const accounts = filteredResults.filter(r => r.type === 'account');
  const profiles = filteredResults.filter(r => r.type === 'profile');
  const goals = filteredResults.filter(r => r.type === 'goal');

  const presetQueries = [
    'Whole Foods',
    'Chase',
    'Emma',
    'Salary',
    'Tesla',
    'Switch'
  ];

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52A5CE] animate-pulse" />
          <span>Global Search — Accounts, Transactions & Family</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">⌘K</div>
      </div>

      {/* Interactive Search Bar & Filters */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-3.5">
        {/* Search Input with Live Reset */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#52A5CE]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accounts, merchants, categories, or family members..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#52A5CE] transition-colors font-sans"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips & Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Quick:</span>
            {presetQueries.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => setSearchTerm(query)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                  searchTerm === query
                    ? 'bg-[#52A5CE] text-white shadow-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {query}
              </button>
            ))}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            {(['all', 'transaction', 'account', 'profile', 'goal'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-2 py-0.5 rounded capitalize font-bold transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-[#52A5CE] text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'all' ? 'All' : t === 'transaction' ? 'Transactions' : t === 'account' ? 'Accounts' : t === 'profile' ? 'Family' : 'Goals'}
              </button>
            ))}
          </div>
        </div>

        {/* Results Stream */}
        {filteredResults.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-900/50 border border-slate-800 text-xs space-y-1">
            <div className="text-slate-300 font-bold">No results found for &ldquo;{searchTerm}&rdquo;</div>
            <div className="text-slate-500">Try searching for &quot;Whole Foods&quot;, &quot;Chase&quot;, &quot;Emma&quot;, or &quot;Salary&quot;.</div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* Section: Transactions */}
            {transactions.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#52A5CE]" /> Matching Transactions ({transactions.length})
                  </span>
                  <span className="text-[10px] text-slate-500">Plaid Connected</span>
                </div>
                <div className="space-y-1.5">
                  {transactions.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedResult(item)}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#52A5CE]/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#52A5CE]/10 text-[#52A5CE] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#52A5CE] group-hover:text-white transition-colors">
                          {item.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#52A5CE] transition-colors">{item.title}</div>
                          <div className="text-[10px] text-slate-400">{item.subtitle}</div>
                        </div>
                      </div>
                      <div className={`font-mono font-bold text-xs ${item.isPositive ? 'text-[#AACC96]' : 'text-slate-200'}`}>
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Accounts & Profiles Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Accounts */}
              {accounts.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-[#AACC96]" /> Connected Accounts ({accounts.length})
                  </div>
                  <div className="space-y-1.5">
                    {accounts.map((acc) => (
                      <div 
                        key={acc.id}
                        onClick={() => setSelectedResult(acc)}
                        className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#AACC96]/50 transition-all cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white">{acc.title}</div>
                        <div className="text-[10px] text-slate-400">{acc.subtitle}</div>
                        <div className="text-[11px] font-mono text-[#AACC96] font-bold mt-1">{acc.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profiles & Goals */}
              {(profiles.length > 0 || goals.length > 0) && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#EFCE7B]" /> Family & Goals ({profiles.length + goals.length})
                  </div>
                  <div className="space-y-1.5">
                    {profiles.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedResult(p)}
                        className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#EFCE7B]/50 transition-all cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white">{p.title}</div>
                        <div className="text-[10px] text-slate-400">{p.subtitle}</div>
                        <div className="text-[11px] text-[#EFCE7B] font-bold mt-1">{p.amount}</div>
                      </div>
                    ))}
                    {goals.map((g) => (
                      <div 
                        key={g.id}
                        onClick={() => setSelectedResult(g)}
                        className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#52A5CE]/50 transition-all cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white">{g.title}</div>
                        <div className="text-[10px] text-slate-400">{g.subtitle}</div>
                        <div className="text-[11px] text-[#52A5CE] font-bold mt-1">{g.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Click Selection Detail Banner */}
        {selectedResult && (
          <div className="p-3 rounded-xl bg-slate-900 border border-[#52A5CE]/50 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EFCE7B]" />
              <span className="text-slate-300">
                Selected: <strong className="text-white">{selectedResult.title}</strong> ({selectedResult.amount})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedResult(null)}
              className="text-slate-400 hover:text-white text-[11px] font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
