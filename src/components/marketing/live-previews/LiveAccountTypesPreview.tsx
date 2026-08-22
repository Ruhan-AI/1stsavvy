'use client';

import React, { useState } from 'react';
import { Landmark, Car, Home, TrendingUp, CreditCard, Layers, Plus } from 'lucide-react';

export function LiveAccountTypesPreview() {
  const [selected, setSelected] = useState<string>('banking');

  const categories = [
    { id: 'banking', name: 'Liquid Banking', icon: Landmark, balance: '$32,450.00', desc: 'Checking, Savings, Cash', color: 'text-[#52A5CE]', border: 'border-[#52A5CE]/40' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, balance: '$64,000.00', desc: '2023 Tesla Model Y, 2021 CR-V', color: 'text-[#D3B6D3]', border: 'border-[#D3B6D3]/40' },
    { id: 'property', name: 'Real Estate & Property', icon: Home, balance: '$620,000.00', desc: 'Primary Home & Rental Unit', color: 'text-[#AACC96]', border: 'border-[#AACC96]/40' },
    { id: 'investments', name: 'Investments & 401(k)', icon: TrendingUp, balance: '$210,000.00', desc: 'Vanguard, Roth IRA, ETFs', color: 'text-[#EFCE7B]', border: 'border-[#EFCE7B]/40' },
    { id: 'debt', name: 'Loans & Liabilities', icon: CreditCard, balance: '-$489,042.30', desc: 'Fixed Mortgage, Auto Debt', color: 'text-[#EF6F3C]', border: 'border-[#EF6F3C]/40' },
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
        <span className="text-[11px] font-semibold text-slate-300">Unified Balance Sheet</span>
      </div>

      {/* Grid of Asset Categories */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSel = selected === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSel
                    ? `bg-slate-900 ${cat.border} shadow-md`
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{cat.name}</div>
                      <div className="text-[10px] text-slate-400">{cat.desc}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">Class Balance</span>
                  <span className={`font-mono font-bold ${cat.balance.startsWith('-') ? 'text-[#EF6F3C]' : 'text-slate-200'}`}>
                    {cat.balance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculated Net Worth Summary Footer */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total True Net Worth</div>
            <div className="text-[11px] text-slate-500">5 Categories • Plaid & Manual Assets</div>
          </div>
          <div className="text-right">
            <div className="font-mono font-extrabold text-base text-[#AACC96]">$437,407.70</div>
            <div className="text-[10px] text-[#AACC96] font-semibold">+3.2% This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
