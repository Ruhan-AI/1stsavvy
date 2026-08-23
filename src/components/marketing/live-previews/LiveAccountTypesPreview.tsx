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
      color: 'text-[#52A5CE]', 
      border: 'border-[#52A5CE]/50',
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
      color: 'text-[#D3B6D3]', 
      border: 'border-[#D3B6D3]/50',
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
      color: 'text-[#AACC96]', 
      border: 'border-[#AACC96]/50',
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
      color: 'text-[#EFCE7B]', 
      border: 'border-[#EFCE7B]/50',
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
      color: 'text-[#EF6F3C]', 
      border: 'border-[#EF6F3C]/50',
      items: [
        { name: 'Rocket Mortgage (30-Yr Fixed @ 3.25%)', val: '-$465,042.30', status: 'Monthly Escrow' },
        { name: 'Chase Sapphire Credit Card', val: '-$1,240.50', status: 'Due Sept 15' }
      ]
    },
  ];

  const activeCategory = categories.find(c => c.id === selected) || categories[0];

  return (
    <div data-mock-preview className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <span className="text-[11px] font-semibold text-slate-300">Unified Balance Sheet</span>
      </div>

      {/* Grid of Asset Categories */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSel = selected === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSel
                    ? `bg-slate-900 ${cat.border} shadow-md`
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className={`shrink-0 p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${cat.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    {/* §8: the label may wrap to two lines on mobile rather than lose text */}
                    <div className="font-bold text-xs text-white break-words line-clamp-2">{cat.name}</div>
                    {/* §8: never truncate a currency amount */}
                    <div className={`font-mono font-bold text-[11px] whitespace-nowrap ${cat.balance.startsWith('-') ? 'text-[#EF6F3C]' : 'text-slate-200'}`}>
                      {cat.balance}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Sub-Accounts View */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className={activeCategory.color}>●</span> {activeCategory.name} Accounts ({activeCategory.items.length})
            </span>
            <span className="font-mono font-bold text-slate-200">{activeCategory.balance}</span>
          </div>

          <div className="space-y-1.5">
            {activeCategory.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 text-xs">
                <div>
                  <div className="font-semibold text-slate-200 text-[11px]">{it.name}</div>
                  <div className="text-[11px] text-slate-500">{it.status}</div>
                </div>
                <div className={`font-mono font-bold text-xs ${it.val.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {it.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculated Net Worth Summary Footer */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total True Net Worth</div>
            <div className="text-[11px] text-slate-500">Assets: $926,450 • Debts: -$489,042</div>
          </div>
          <div className="text-right">
            <div className="font-mono font-extrabold text-base text-[#AACC96]">$437,407.70</div>
            <div className="text-[11px] text-[#AACC96] font-semibold">+3.2% This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
