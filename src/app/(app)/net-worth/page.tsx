'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney, calculateNetWorth } from '@/lib/utils/format';
import { 
  TrendingUp, 
  Scale, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PiggyBank, 
  Landmark, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function NetWorthPage() {
  const { state } = useFirstSavvyStore();
  const [viewScope, setViewScope] = useState<'household' | 'individual'>('household');

  const relevantAccounts = viewScope === 'household'
    ? state.accounts
    : state.accounts.filter((a) => a.ownerProfileId === state.activeProfileId);

  const { totalAssetsCents, totalLiabilitiesCents, netWorthCents } = calculateNetWorth(relevantAccounts);

  const liquidAssetsCents = relevantAccounts
    .filter((a) => a.accountType === 'banking' || a.accountType === 'savings')
    .reduce((acc, a) => acc + a.balanceCents, 0);

  const debtRatio = totalAssetsCents > 0
    ? Math.round((totalLiabilitiesCents / totalAssetsCents) * 100)
    : 0;

  const chartData = state.netWorthHistory.map((item) => ({
    name: item.date.slice(5),
    netWorth: item.netWorthCents / 100,
    assets: item.totalAssetsCents / 100,
    liabilities: item.totalLiabilitiesCents / 100,
  }));

  const pieData = [
    { name: 'Real Estate Property', value: 540000, color: '#324154' },
    { name: 'Retirement & Investments', value: 128500, color: '#4FA3CD' },
    { name: 'Cash & Savings', value: 42650, color: '#0F766E' },
    { name: 'Vehicles', value: 38500, color: '#64748B' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Scope Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Total Wealth Position</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Net Worth & Asset Allocation
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewScope('household')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewScope === 'household' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              Household Total
            </button>
            <button
              onClick={() => setViewScope('individual')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewScope === 'individual' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              My Accounts Only
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Net Worth</div>
          <div className="text-2xl font-bold text-brand-navy dark:text-white">
            {formatMoney(netWorthCents)}
          </div>
          <div className="text-xs text-emerald-600 font-medium">+3.2% vs previous month</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Assets</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatMoney(totalAssetsCents)}
          </div>
          <div className="text-xs text-slate-400">Property, cash, and investments</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Total Liabilities</div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {formatMoney(totalLiabilitiesCents)}
          </div>
          <div className="text-xs text-slate-400">Mortgage & credit card balances</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Debt-to-Assets Ratio</div>
          <div className="text-2xl font-bold text-brand-navy dark:text-white">
            {debtRatio}%
          </div>
          <div className="text-xs text-emerald-600 font-medium">Healthy leverage profile</div>
        </div>
      </div>

      {/* 3. Historical Graph & Asset Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">6-Month Net Worth Progression</h3>
            <span className="text-xs text-slate-400 font-mono">2026 Snapshots</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Net Worth']}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="netWorth" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#nwGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composition Chart (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Asset Composition</h3>
            <p className="text-xs text-slate-500">Distribution across asset classes.</p>
          </div>

          <div className="space-y-3">
            {pieData.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono text-slate-500">${(item.value).toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.value / 749650) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 text-[11px] text-slate-600 dark:text-slate-400">
            ℹ️ Custodial accounts for Leo and Maya are marked separately and included in household snapshots.
          </div>
        </div>
      </div>
    </div>
  );
}
