'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney, calculateNetWorth } from '@/lib/utils/format';
import {
  TrendingUp,
  CreditCard,
  Star,
  Plus,
  Check,
  CheckCircle2,
  Calendar as CalendarIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Gamepad2,
  X
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

  // State for interactive chores matching the screenshot
  const [chores, setChores] = useState([
    {
      id: 'chore-1',
      title: 'Tidy Bedroom & Make Bed',
      cadence: 'Daily',
      stars: 2,
      completed: true,
    },
    {
      id: 'chore-2',
      title: 'Feed & Walk Pet Dog',
      cadence: 'Morning',
      stars: 3,
      completed: false,
    },
    {
      id: 'chore-3',
      title: 'Daily Math & Reading Time',
      cadence: 'Weekdays',
      stars: 4,
      completed: false,
    },
  ]);

  // Star balance calculation
  const [starBalance, setStarBalance] = useState(45);
  const targetStars = 60;

  // Modal for + Assign Chore
  const [assignChoreModalOpen, setAssignChoreModalOpen] = useState(false);
  const [newChoreTitle, setNewChoreTitle] = useState('');
  const [newChoreCadence, setNewChoreCadence] = useState('Daily');
  const [newChoreStars, setNewChoreStars] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle chore completion
  const toggleChore = (choreId: string) => {
    setChores((prev) =>
      prev.map((c) => {
        if (c.id === choreId) {
          const nextCompleted = !c.completed;
          const delta = nextCompleted ? c.stars : -c.stars;
          setStarBalance((prevStars) => Math.max(0, prevStars + delta));

          // Trigger toast message
          setToastMessage(
            nextCompleted
              ? `⭐ Awesome! Emma earned +${c.stars} Stars for "${c.title}"!`
              : `Chore "${c.title}" marked pending.`
          );
          setTimeout(() => setToastMessage(null), 3500);

          return { ...c, completed: nextCompleted };
        }
        return c;
      })
    );
  };

  // Add new chore
  const handleAddChore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChoreTitle.trim()) return;

    const newChore = {
      id: `chore-${Date.now()}`,
      title: newChoreTitle.trim(),
      cadence: newChoreCadence,
      stars: Number(newChoreStars),
      completed: false,
    };

    setChores((prev) => [...prev, newChore]);
    setNewChoreTitle('');
    setAssignChoreModalOpen(false);

    setToastMessage(`✨ New chore "${newChore.title}" assigned to Emma with +${newChore.stars}★ reward!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Static Net Worth data matching the screenshot
  const netWorthValue = '$437,407.70';
  const assetsValue = '$926,450';
  const debtsValue = '-$489,042';

  // Static Budget data matching the screenshot
  const augustBudgetValue = '$4,124.90';
  const remainingBudgetValue = '$2,450.00';

  const chartData = [
    { name: 'Mar', netWorth: 390000 },
    { name: 'Apr', netWorth: 400000 },
    { name: 'May', netWorth: 413000 },
    { name: 'Jun', netWorth: 424000 },
    { name: 'Jul', netWorth: 433000 },
    { name: 'Aug', netWorth: 437407 },
  ];

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0C1929] border border-cyan-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Household Financial Hub (Parent Admin)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Full visibility into household balance sheet, Plaid accounts, and children&apos;s chores.
          </p>
        </div>

        <div>
          <button
            onClick={() => setAssignChoreModalOpen(true)}
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Assign Chore</span>
          </button>
        </div>
      </div>

      {/* 2. Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: True Net Worth */}
        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md hover:border-[#1E3A5F] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wide">True Net Worth</span>
            <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1">
              <span>↗ +3.2%</span>
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mt-2">
            {netWorthValue}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-2">
            Assets: <span className="text-slate-200 font-semibold">{assetsValue}</span> • Debts:{' '}
            <span className="text-rose-400 font-semibold">{debtsValue}</span>
          </div>
        </div>

        {/* Card 2: August Budgets */}
        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md hover:border-[#1E3A5F] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wide">August Budgets</span>
            <span className="text-xs font-bold text-[#38BDF8]">
              50/30/20 Rule
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mt-2">
            {augustBudgetValue}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-2">
            <span className="text-[#22C55E] font-semibold">{remainingBudgetValue}</span> remaining limit
          </div>
        </div>

        {/* Card 3: Emma's Stars Balance */}
        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md hover:border-[#1E3A5F] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 tracking-wide">Emma&apos;s Stars Balance</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>★ Supervised</span>
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mt-2">
            <span className="text-amber-400 font-black">{starBalance}</span>
            <span className="text-slate-300 font-normal text-2xl sm:text-3xl"> / {targetStars} Stars Target</span>
          </div>
          <div className="text-xs font-medium text-[#38BDF8] mt-2 flex items-center gap-1">
            <span>{Math.round((starBalance / targetStars) * 100)}% toward Nintendo Switch Goal</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Split Section: Recent Transactions (Left) + Emma's Active Chores (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Transactions (7 cols) */}
        <div className="lg:col-span-7 bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-base text-white">
                Recent Transactions
              </h3>
            </div>
            <Link
              href="/banking"
              className="inline-flex min-h-[44px] items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View Banking (5) →
            </Link>
          </div>

          {/* Transactions List matching screenshot */}
          <div className="space-y-2.5">
            {/* Row 1: Acme Corp Bi-Weekly Salary */}
            <div className="p-3.5 rounded-xl bg-[#08121E] border border-[#122238] flex items-center justify-between gap-3 hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="font-bold text-sm text-white">
                  Acme Corp Bi-Weekly Salary
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Income • Aug 22, 2026
                </div>
              </div>
              <div className="font-mono font-bold text-sm text-[#22C55E]">
                +$4,750.00
              </div>
            </div>

            {/* Row 2: Whole Foods Market */}
            <div className="p-3.5 rounded-xl bg-[#08121E] border border-[#122238] flex items-center justify-between gap-3 hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="font-bold text-sm text-white">
                  Whole Foods Market — Columbus
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Groceries • Aug 21, 2026
                </div>
              </div>
              <div className="font-mono font-bold text-sm text-slate-200">
                -$164.50
              </div>
            </div>

            {/* Row 3: Rocket Mortgage Escrow */}
            <div className="p-3.5 rounded-xl bg-[#08121E] border border-[#122238] flex items-center justify-between gap-3 hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="font-bold text-sm text-white">
                  Rocket Mortgage Escrow
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Housing • Aug 18, 2026
                </div>
              </div>
              <div className="font-mono font-bold text-sm text-slate-200">
                -$2,450.00
              </div>
            </div>

            {/* Row 4: Shell Oil Gas */}
            <div className="p-3.5 rounded-xl bg-[#08121E] border border-[#122238] flex items-center justify-between gap-3 hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="font-bold text-sm text-white">
                  Shell Oil — Fuel Station
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Vehicle & Gas • Aug 17, 2026
                </div>
              </div>
              <div className="font-mono font-bold text-sm text-slate-200">
                -$58.40
              </div>
            </div>

            {/* Row 5: Trattoria Bella */}
            <div className="p-3.5 rounded-xl bg-[#08121E] border border-[#122238] flex items-center justify-between gap-3 hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="font-bold text-sm text-white">
                  Trattoria Bella — Family Dinner
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Dining • Aug 16, 2026
                </div>
              </div>
              <div className="font-mono font-bold text-sm text-slate-200">
                -$86.20
              </div>
            </div>
          </div>
        </div>

        {/* Right: Emma's Active Chores (5 cols) */}
        <div className="lg:col-span-5 bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <h3 className="font-bold text-base text-white">
                Emma&apos;s Active Chores
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/25">
              PARENT SUPERVISED
            </span>
          </div>

          {/* Interactive Chores List */}
          <div className="space-y-3">
            {chores.map((chore) => (
              <div
                key={chore.id}
                onClick={() => toggleChore(chore.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  chore.completed
                    ? 'bg-[#081F1E]/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                    : 'bg-[#08121E] border-[#122238] text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                      chore.completed
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/40'
                        : 'border-slate-600 bg-[#0C1826] hover:border-cyan-400'
                    }`}
                  >
                    {chore.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <div
                      className={`font-bold text-sm line-clamp-2 xl:line-clamp-none xl:truncate ${
                        chore.completed ? 'text-emerald-300 line-through opacity-90' : 'text-white'
                      }`}
                    >
                      {chore.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {chore.cadence}
                    </div>
                  </div>
                </div>

                {/* Star Reward Badge */}
                <div className="px-2.5 py-1 rounded-md bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold shrink-0">
                  +{chore.stars}★
                </div>
              </div>
            ))}
          </div>

          {/* Bottom quick view for Emma's reward goal */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-cyan-950/30 border border-amber-500/30 flex items-center justify-between text-xs mt-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-300 font-medium">Goal: Nintendo Switch ({starBalance}/{targetStars}★)</span>
            </div>
            <Link
              href="/kid-view"
              className="font-bold text-cyan-400 hover:underline inline-flex min-h-[44px] items-center gap-1"
            >
              <span>Kid View</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Optional Net Worth Growth Trend Chart */}
      <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-white">
              Household Net Worth Trend
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated from Chase, Vanguard, and Rocket Mortgage.
            </p>
          </div>
          <Link
            href="/net-worth"
            className="inline-flex min-h-[44px] items-center text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            Full Analytics →
          </Link>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00B4D8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Net Worth']}
                contentStyle={{
                  backgroundColor: '#0A1524',
                  borderColor: '#1C324E',
                  borderRadius: '0.75rem',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="netWorth"
                stroke="#00B4D8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#netWorthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Assign Chore Modal Dialog */}
      {assignChoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0C1929] border border-[#1E3452] rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#16273E]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">Assign New Chore</h3>
              </div>
              <button
                onClick={() => setAssignChoreModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChore} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Chore Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Clean Study Desk, Water Plants"
                  value={newChoreTitle}
                  onChange={(e) => setNewChoreTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08121E] border border-[#172C46] text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={newChoreCadence}
                    onChange={(e) => setNewChoreCadence(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08121E] border border-[#172C46] text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Star Reward
                  </label>
                  <select
                    value={newChoreStars}
                    onChange={(e) => setNewChoreStars(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#08121E] border border-[#172C46] text-amber-400 font-bold text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value={1}>⭐ +1 Star</option>
                    <option value={2}>⭐⭐ +2 Stars</option>
                    <option value={3}>⭐⭐⭐ +3 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ +4 Stars</option>
                    <option value={5}>⭐⭐⭐⭐⭐ +5 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Assignee
                </label>
                <div className="p-3 rounded-xl bg-[#08121E] border border-[#172C46] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                      E
                    </div>
                    <span className="text-sm font-semibold text-white">Emma (Child)</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">Current Balance: {starBalance}★</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#16273E]">
                <button
                  type="button"
                  onClick={() => setAssignChoreModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/25 transition-all"
                >
                  Assign Chore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
