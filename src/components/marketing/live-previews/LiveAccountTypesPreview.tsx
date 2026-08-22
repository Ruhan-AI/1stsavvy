'use client';

import React, { useState } from 'react';
import { Landmark, Car, Home, TrendingUp, CreditCard, Layers, Plus } from 'lucide-react';

export function LiveAccountTypesPreview() {
  const [selected, setSelected] = useState<string>('banking');

  const categories = [
    { id: 'banking', name: 'Liquid Banking', icon: Landmark, balance: '$32,450.00', desc: 'Checking, Savings, Cash', color: 'text-brand-sky', border: 'border-brand-sky/40' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, balance: '$64,000.00', desc: '2023 Tesla Model Y, 2021 CR-V', color: 'text-indigo-400', border: 'border-indigo-400/40' },
    { id: 'property', name: 'Real Estate & Property', icon: Home, balance: '$620,000.00', desc: 'Primary Home & Rental Unit', color: 'text-emerald-400', border: 'border-emerald-400/40' },
    { id: 'investments', name: 'Investments & 401(k)', icon: TrendingUp, balance: '$210,000.00', desc: 'Vanguard, Roth IRA, ETFs', color: 'text-amber-400', border: 'border-amber-400/40' },
    { id: 'debt', name: 'Loans & Liabilities', icon: CreditCard, balance: '-$489,042.30', desc: 'Fixed Mortgage, Auto Debt', color: 'text-rose-400', border: 'border-rose-400/40' },
  ];

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
            app.firstsavvy.com/net-worth
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-300">Unified Asset Classes</span>
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
                  <span className="text-[10px] text-slate-500">Asset Value</span>
                  <span className={`font-mono font-bold ${cat.balance.startsWith('-') ? 'text-rose-400' : 'text-slate-200'}`}>
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
            <div className="text-[11px] text-slate-500">5 Categories • 9 Connected Accounts</div>
          </div>
          <div className="text-right">
            <div className="font-mono font-extrabold text-base text-emerald-400">$437,407.70</div>
            <div className="text-[10px] text-emerald-500 font-semibold">+3.2% This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
