'use client';

import React, { useState } from 'react';
import { Landmark, Car, Home, TrendingUp, CreditCard, Plus, Check } from 'lucide-react';

export function LiveAccountTypesPreview() {
  const [selected, setSelected] = useState<string>('banking');

  const categories = [
    { 
      id: 'banking', 
      name: 'Liquid Banking', 
      icon: Landmark, 
      balance: '$32,450.20', 
      desc: 'Checking & Savings', 
      isDebt: false,
      items: [
        { name: 'Chase Total Checking (...4921)', val: '$18,450.20', status: 'Plaid Sync' },
        { name: 'Chase High Yield Savings (...9021)', val: '$14,000.00', status: '4.85% APY' }
      ]
    },
    { 
      id: 'vehicles', 
      name: 'Vehicles', 
      icon: Car, 
      balance: '$64,000.00', 
      desc: 'EV & Family SUVs', 
      isDebt: false,
      items: [
        { name: '2023 Tesla Model Y Long Range', val: '$42,000.00', status: 'KBB Valuation' },
        { name: '2021 Honda CR-V Touring', val: '$22,000.00', status: 'Owned' }
      ]
    },
    { 
      id: 'property', 
      name: 'Real Estate & Property', 
      icon: Home, 
      balance: '$620,000.00', 
      desc: 'Primary Residence', 
      isDebt: false,
      items: [
        { name: 'Single Family Residence (Columbus, OH)', val: '$620,000.00', status: 'Zillow Linked' }
      ]
    },
    { 
      id: 'investments', 
      name: 'Investments & 401(k)', 
      icon: TrendingUp, 
      balance: '$210,000.00', 
      desc: 'Vanguard & Roth IRAs', 
      isDebt: false,
      items: [
        { name: 'Vanguard 500 Index Fund (VFIAX)', val: '$124,500.00', status: '+8.4% YTD' },
        { name: 'Fidelity Traditional 401(k)', val: '$62,400.00', status: 'Employer Match' },
        { name: 'Backdoor Roth IRA', val: '$23,100.00', status: 'Tax-Free' }
      ]
    },
    { 
      id: 'debt', 
      name: 'Loans & Liabilities', 
      icon: CreditCard, 
      balance: '-$489,042.30', 
      desc: 'Fixed Mortgage & Debt', 
      isDebt: true,
      items: [
        { name: 'Rocket Mortgage (30-Yr Fixed @ 3.25%)', val: '-$465,042.30', status: 'Monthly Escrow' },
        { name: 'Chase Sapphire Credit Card', val: '-$1,240.50', status: 'Due Sept 15' }
      ]
    },
  ];

  const activeCategory = categories.find(c => c.id === selected) || categories[0];

  return (
    <div
      data-mock-preview
      className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden select-none text-left font-sans flex flex-col transition-all duration-300"
    >
      {/* Top Header Bar matching First Savvy Web App NetWorth */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
            <Landmark className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Unified Balance Sheet</span>
        </div>
        <span className="text-xs font-medium text-slate-400">First Savvy Net Worth</span>
      </div>

      {/* Grid of Asset & Liability Categories */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSel = selected === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isSel
                    ? 'border-[#52A5CE] ring-2 ring-[#52A5CE]/20 bg-sky-50/50 dark:bg-sky-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    cat.isDebt ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50' : 'bg-sky-50 text-[#52A5CE] dark:bg-sky-950/50'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                    {cat.name}
                  </span>
                </div>
                {/* §8: a currency amount is never wrapped or broken — the label above it
                    is what gives way when the cell is narrow */}
                <div className={`text-sm font-bold whitespace-nowrap tabular-nums ${
                  cat.isDebt ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {cat.balance}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Accounts Sub-panel */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#52A5CE]" />
              <span>{activeCategory.name} Accounts ({activeCategory.items.length})</span>
            </span>
            <span className={`font-bold ${activeCategory.isDebt ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
              {activeCategory.balance}
            </span>
          </div>

          <div className="space-y-1.5">
            {activeCategory.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-[#52A5CE]/50 transition-colors"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs">{item.name}</div>
                  <div className="text-[11px] text-slate-400">{item.status}</div>
                </div>
                <div className={`font-bold text-xs ${activeCategory.isDebt ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total True Net Worth Footer Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total True Net Worth
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
              Assets: $926,450 • Debts: -$489,042
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
              $437,407.70
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              +3.2% This Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
