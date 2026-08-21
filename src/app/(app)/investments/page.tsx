'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney } from '@/lib/utils/format';
import { 
  Briefcase, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Clock,
  Layers,
  Coins,
  Building
} from 'lucide-react';

export default function InvestmentsPage() {
  const { state } = useFirstSavvyStore();
  const [filterAsset, setFilterAsset] = useState<string>('all');

  const totalPortfolioCents = state.holdings.reduce((sum, h) => sum + h.currentValueCents, 0);
  const totalCostBasisCents = state.holdings.reduce((sum, h) => sum + h.costBasisCents, 0);
  const totalGainCents = totalPortfolioCents - totalCostBasisCents;
  const totalGainPct = totalCostBasisCents > 0 ? Math.round((totalGainCents / totalCostBasisCents) * 100) : 0;

  const filteredHoldings = state.holdings.filter((h) => {
    if (filterAsset === 'all') return true;
    return h.assetClass === filterAsset;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Portfolio & Growth</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Investment Portfolio & Holdings
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5 text-brand-sky" />
            <span>Prices as of Market Close • Vanguard IRA</span>
          </div>
        </div>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Portfolio Value</div>
          <div className="text-2xl font-bold text-brand-navy dark:text-white">
            {formatMoney(totalPortfolioCents)}
          </div>
          <div className="text-xs text-slate-400">Across 3 holdings & accounts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Unrealized Gain</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            +{formatMoney(totalGainCents)}
          </div>
          <div className="text-xs text-emerald-600 font-medium">+{totalGainPct}% all-time return</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Cost Basis</div>
          <div className="text-2xl font-bold text-brand-navy dark:text-white">
            {formatMoney(totalCostBasisCents)}
          </div>
          <div className="text-xs text-slate-400">Net capital invested</div>
        </div>
      </div>

      {/* 3. Holdings Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Holdings & Positions</h2>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            {['all', 'etf', 'stock', 'bond', 'crypto'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterAsset(f)}
                className={`px-3 py-1 rounded-lg uppercase transition-colors ${
                  filterAsset === f
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-2">Asset</th>
                <th className="pb-3 px-2">Class</th>
                <th className="pb-3 px-2 text-right">Shares</th>
                <th className="pb-3 px-2 text-right">Current Price</th>
                <th className="pb-3 px-2 text-right">Market Value</th>
                <th className="pb-3 px-2 text-right">Total Gain/Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHoldings.map((h) => {
                const isGain = h.gainLossCents >= 0;
                return (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-bold text-brand-navy dark:text-white">{h.symbol}</div>
                      <div className="text-[11px] text-slate-500">{h.name}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px]">
                        {h.assetClass}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-mono">{h.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono">{formatMoney(h.currentPriceCents)}</td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-brand-navy dark:text-white">
                      {formatMoney(h.currentValueCents)}
                    </td>
                    <td className={`py-3 px-2 text-right font-mono font-bold ${isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isGain ? '+' : ''}{formatMoney(h.gainLossCents)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
