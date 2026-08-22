'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney, formatCompactMoney, calculateNetWorth } from '@/lib/utils/format';
import { 
  FadeIn, 
  CountUp, 
  HoverCard3D, 
  TextReveal, 
  ScrollReveal 
} from '@/components/animations/MotionWrappers';
import { 
  TrendingUp, 
  Wallet, 
  PiggyBank, 
  Scale, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  Star, 
  Calendar as CalendarIcon, 
  Plus, 
  ShieldCheck, 
  ChevronRight, 
  Landmark, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function DashboardPage() {
  const { state, activeProfile } = useFirstSavvyStore();
  const [activeTab, setActiveTab] = useState<'net_worth' | 'spending' | 'in_out' | 'balance'>('net_worth');
  const [selectedPeriod, setSelectedPeriod] = useState<'MTD' | '30D' | '3M' | '6M' | 'YTD' | '1Y' | 'ALL'>('30D');

  const { totalAssetsCents, totalLiabilitiesCents, netWorthCents } = calculateNetWorth(state.accounts);

  // Month spending calculation
  const totalSpendingCents = state.transactions
    .filter((t) => t.amountCents < 0 && t.status !== 'excluded')
    .reduce((acc, t) => acc + Math.abs(t.amountCents), 0);

  // Month income calculation
  const totalIncomeCents = state.transactions
    .filter((t) => t.amountCents > 0 && t.status !== 'excluded')
    .reduce((acc, t) => acc + t.amountCents, 0);

  // Chart data from history
  const chartData = state.netWorthHistory.map((item) => ({
    name: item.date.slice(5), // MM-DD
    netWorth: item.netWorthCents / 100,
    assets: item.totalAssetsCents / 100,
    liabilities: item.totalLiabilitiesCents / 100,
  }));

  const upcomingBills = state.recurring.filter((r) => r.type === 'bill');
  const childProfiles = state.profiles.filter((p) => p.isChild);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-sky uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{state.currentHousehold.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            <TextReveal text="Financial & Household Overview" />
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/banking"
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Connect Account</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary Metric Cards & Period Selector */}
      <div className="space-y-4">
        {/* Metric Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Net Worth */}
          <button
            onClick={() => setActiveTab('net_worth')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
              activeTab === 'net_worth'
                ? 'bg-white dark:bg-[#1E293B] border-brand-sky shadow-md ring-2 ring-brand-sky/20'
                : 'bg-white/60 dark:bg-[#1E293B]/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#1E293B]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Net Worth</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-sans tabular-nums text-brand-navy dark:text-white mt-2">
              $<CountUp value={netWorthCents / 100} decimals={2} />
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>+3.2% vs last month</span>
            </div>
          </button>

          {/* Card 2: Spending */}
          <button
            onClick={() => setActiveTab('spending')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
              activeTab === 'spending'
                ? 'bg-white dark:bg-[#1E293B] border-brand-sky shadow-md ring-2 ring-brand-sky/20'
                : 'bg-white/60 dark:bg-[#1E293B]/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#1E293B]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>August Spending</span>
              <Wallet className="w-4 h-4 text-brand-sky" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-sans tabular-nums text-brand-navy dark:text-white mt-2">
              $<CountUp value={totalSpendingCents / 100} decimals={2} />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              <span className="font-semibold text-brand-sky">$2,450.00</span> budget left
            </div>
          </button>

          {/* Card 3: In and Out */}
          <button
            onClick={() => setActiveTab('in_out')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
              activeTab === 'in_out'
                ? 'bg-white dark:bg-[#1E293B] border-brand-sky shadow-md ring-2 ring-brand-sky/20'
                : 'bg-white/60 dark:bg-[#1E293B]/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#1E293B]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Cash In / Out</span>
              <Scale className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400 mt-2">
              +$<CountUp value={(totalIncomeCents - totalSpendingCents) / 100} decimals={2} />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              +{formatMoney(totalIncomeCents)} in / -{formatMoney(totalSpendingCents)} out
            </div>
          </button>

          {/* Card 4: Liquid Balance */}
          <button
            onClick={() => setActiveTab('balance')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
              activeTab === 'balance'
                ? 'bg-white dark:bg-[#1E293B] border-brand-sky shadow-md ring-2 ring-brand-sky/20'
                : 'bg-white/60 dark:bg-[#1E293B]/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#1E293B]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Cash & Liquid Assets</span>
              <PiggyBank className="w-4 h-4 text-brand-softBlue" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-sans tabular-nums text-brand-navy dark:text-white mt-2">
              $<CountUp
                value={
                  state.accounts
                    .filter((a) => a.accountType === 'banking' || a.accountType === 'savings')
                    .reduce((acc, a) => acc + a.balanceCents, 0) / 100
                }
                decimals={2}
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Checking + High-Yield Savings
            </div>
          </button>
        </div>

        {/* Interactive Chart Container */}
        <FadeIn delay={0.2}>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">
                  {activeTab === 'net_worth'
                    ? 'Net Worth Trend'
                    : activeTab === 'spending'
                    ? 'Monthly Spending History'
                    : activeTab === 'in_out'
                    ? 'Cash In vs Out Trend'
                    : 'Liquid Asset Balance'}
                </h3>
                <p className="text-xs text-slate-500">Historical performance across all verified accounts.</p>
              </div>

              {/* Period Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {(['MTD', '30D', '3M', '6M', 'YTD', '1Y', 'ALL'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedPeriod === period
                        ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="netWorthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FA3CD" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4FA3CD" stopOpacity={0.0} />
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
                  <Area
                    type="monotone"
                    dataKey="netWorth"
                    stroke="#4FA3CD"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#netWorthGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 3. Middle Section: Family Hub + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Family Profiles & Stars Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <FadeIn delay={0.3}>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-sky" />
                  <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
                    Family Responsibilities & Stars
                  </h3>
                </div>
                <Link href="/profiles" className="text-xs font-bold text-brand-sky hover:underline">
                  Manage Family →
                </Link>
              </div>

              {/* Child Profiles Carousel / Cards */}
              <div className="space-y-3">
                {childProfiles.map((child) => (
                  <Link
                    key={child.id}
                    href={`/profiles/${child.id}`}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50/60 dark:hover:bg-sky-950/40 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between transition-all group hover:scale-[1.02] duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: child.avatarColor }}
                      >
                        {child.displayName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-brand-navy dark:text-white group-hover:text-brand-sky transition-colors">
                          {child.displayName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {state.tasks.filter((t) => t.assignedProfileIds.includes(child.id)).length} active tasks
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{child.starBalance} Stars</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Link to Kid View Preview */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-sky-50 dark:from-amber-950/30 dark:to-sky-950/30 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Want to see what your kids see?</span>
                <Link href="/kid-view" className="font-bold text-amber-700 dark:text-amber-300 hover:underline">
                  Preview Kid Space →
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Upcoming Bills & Payday Snapshot */}
          <FadeIn delay={0.4}>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-brand-sky" />
                  <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
                    Upcoming Bills & Paydays
                  </h3>
                </div>
                <Link href="/calendar" className="text-xs font-bold text-brand-sky hover:underline">
                  Full Calendar →
                </Link>
              </div>

              <div className="space-y-2.5">
                {upcomingBills.slice(0, 3).map((bill) => (
                  <div key={bill.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">
                    <div>
                      <div className="font-bold text-brand-navy dark:text-white">{bill.name}</div>
                      <div className="text-[11px] text-slate-500">Due {bill.nextDate} • {bill.cadence}</div>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      -{formatMoney(bill.expectedAmountCents)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Recent Transactions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <FadeIn delay={0.35}>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-sky" />
                  <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
                    Recent Household Activity
                  </h3>
                </div>
                <Link href="/banking" className="text-xs font-bold text-brand-sky hover:underline">
                  View All Transactions →
                </Link>
              </div>

            {/* Transactions Feed */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {state.transactions.slice(0, 7).map((tx) => {
                const isIncome = tx.amountCents > 0;
                return (
                  <div key={tx.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isIncome ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                        {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-brand-navy dark:text-white truncate">
                          {tx.description}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {tx.categoryName} • {tx.date}
                        </div>
                      </div>
                    </div>

                    <div className={`font-mono font-bold shrink-0 ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {formatMoney(tx.amountCents, 'USD', true)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Utilization Snapshot */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
                Top Budget Categories
              </h3>
              <Link href="/budgeting" className="text-xs font-bold text-brand-sky hover:underline">
                Budget Manager →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Mortgage & Rent', spent: 245000, budget: 285000, pct: 86, color: '#324154' },
                { name: 'Groceries & Household', spent: 58850, budget: 95000, pct: 62, color: '#0F766E' },
                { name: 'Dining & Takeout', spent: 34500, budget: 45000, pct: 77, color: '#4FA3CD' },
              ].map((b, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{b.name}</span>
                    <span className="text-slate-500">
                      {formatMoney(b.spent)} of {formatMoney(b.budget)} ({b.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
    </div>
  );
}
