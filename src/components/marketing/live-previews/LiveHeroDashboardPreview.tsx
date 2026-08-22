'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Calendar, 
  Target, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronRight,
  Landmark,
  PiggyBank,
  LayoutDashboard,
  CreditCard,
  PieChart,
  ListTodo,
  Lock,
  Contact2,
  Settings,
  Bell,
  Search,
  User,
  Plus
} from 'lucide-react';

export function LiveHeroDashboardPreview() {
  const [activeNav, setActiveNav] = useState<'dashboard' | 'tasks' | 'banking' | 'goals'>('dashboard');
  const [completedTasks, setCompletedTasks] = useState<number[]>([0]);

  const toggleTask = (idx: number) => {
    setCompletedTasks(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'banking', label: 'Banking', icon: Landmark },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'tasks', label: 'Tasks & Chores', icon: ListTodo, badge: '4★' },
    { id: 'net-worth', label: 'Net Worth', icon: TrendingUp },
    { id: 'vault', label: 'Vault', icon: Lock },
    { id: 'contacts', label: 'Contacts', icon: Contact2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full select-none text-left font-sans">
      {/* Ambient Radial Lighting */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#52A5CE]/20 via-[#25533F]/15 to-[#EFCE7B]/15 rounded-3xl blur-2xl opacity-60 -z-10" />

      {/* Main Browser Frame */}
      <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF6F3C]" />
            <span className="w-3 h-3 rounded-full bg-[#EFCE7B]" />
            <span className="w-3 h-3 rounded-full bg-[#AACC96]" />
            <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
              https://app.firstsavvy.com/dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#52A5CE]/10 border border-[#52A5CE]/30 text-[#52A5CE] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52A5CE] animate-pulse" />
              <span>Live Portal View</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-full bg-[#52A5CE] text-white flex items-center justify-center font-bold text-[10px]">
                M
              </div>
              <span className="font-semibold hidden sm:inline">Miller Family</span>
            </div>
          </div>
        </div>

        {/* WebApp Workspace Split: Real Sidebar + Main View */}
        <div className="flex bg-slate-950/95 min-h-[480px]">
          {/* Real App Sidebar */}
          <aside className="w-48 bg-slate-900/90 border-r border-slate-800/80 p-3 hidden md:flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              {/* App Brand Header */}
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#52A5CE] flex items-center justify-center text-white font-serif font-bold text-xs shadow-sm">
                  FS
                </div>
                <div className="font-serif font-bold text-sm text-white">First Savvy</div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveNav(item.id as any)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#52A5CE] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-white text-slate-950' : 'bg-[#EFCE7B]/20 text-[#EFCE7B]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Child Profile Switcher */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                <span>Active Profile</span>
                <span className="text-[#AACC96] text-[10px]">PIN OK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EFCE7B] text-slate-950 flex items-center justify-center font-bold text-xs">
                  E
                </div>
                <div>
                  <div className="font-bold text-xs text-white">Emma Miller</div>
                  <div className="text-[10px] text-amber-400">★ 45 Stars (Level 2)</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <main className="flex-1 p-4 sm:p-6 space-y-5 overflow-hidden">
            {/* Top Workspace Header with Search & Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-800/80">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Household Financial Hub</h2>
                <p className="text-xs text-slate-400">Overview of active accounts, monthly cash flow, and children's chore ledger.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Chore</span>
                </button>
              </div>
            </div>

            {/* Top 3 Stat Cards Matching Real App Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>True Net Worth</span>
                  <span className="flex items-center gap-1 text-[#AACC96] text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" /> +3.2%
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white mt-1 font-sans">
                  $437,407.70
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Assets: <span className="text-slate-300 font-medium">$926,450</span> • Debts: <span className="text-rose-400 font-medium">-$489,042</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>August Budgets</span>
                  <span className="text-[#52A5CE] text-xs font-semibold">
                    50/30/20 Rule
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white mt-1 font-sans">
                  $4,124.90
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <span className="text-[#AACC96] font-semibold">$2,450.00</span> remaining limit
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Emma's Stars Balance</span>
                  <span className="text-[#EFCE7B] text-xs font-bold">
                    ★ Level 2
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-[#EFCE7B] mt-1 font-sans flex items-center gap-1.5">
                  45 <span className="text-sm font-normal text-amber-200/60">/ 60 Stars Target</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <span className="text-[#52A5CE]">75% toward Nintendo Switch Goal</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Real Transactions Feed + Real Chores Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Connected Transactions (7 cols) */}
              <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#52A5CE]" />
                    <span className="text-xs font-bold text-white">Recent Transactions</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer">
                    Plaid Sync Active
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'Acme Corp Salary Deposit', cat: 'Income', amount: '+$4,750.00', positive: true, date: 'Today • Chase Checking' },
                    { name: 'Whole Foods Market', cat: 'Groceries', amount: '-$164.50', positive: false, date: 'Yesterday • Sapphire Card' },
                    { name: 'Rocket Mortgage Payment', cat: 'Housing', amount: '-$2,450.00', positive: false, date: 'Aug 18 • Automated' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
                      <div>
                        <div className="font-semibold text-slate-200">{item.name}</div>
                        <div className="text-[10px] text-slate-500">{item.cat} • {item.date}</div>
                      </div>
                      <div className={`font-mono font-bold text-xs ${item.positive ? 'text-[#AACC96]' : 'text-slate-200'}`}>
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Live Interactive Chore Ledger (5 cols) */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#EFCE7B] fill-[#EFCE7B]" />
                    <span className="text-xs font-bold text-white">Emma's Active Chores</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#EFCE7B] bg-[#EFCE7B]/10 px-2 py-0.5 rounded">
                    Parent Supervised
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'Tidy Bedroom & Make Bed', stars: 2, schedule: 'Daily' },
                    { title: 'Feed & Walk Pet Dog', stars: 3, schedule: 'Morning' },
                    { title: 'Daily Math & Reading Time', stars: 4, schedule: 'Weekdays' },
                  ].map((task, idx) => {
                    const isDone = completedTasks.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                          isDone
                            ? 'bg-[#25533F]/30 border-[#AACC96]/40 text-slate-400'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-xs transition-colors ${
                            isDone ? 'bg-[#AACC96] text-slate-950 font-bold' : 'border border-slate-600'
                          }`}>
                            {isDone && '✓'}
                          </div>
                          <div>
                            <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : ''}`}>
                              {task.title}
                            </div>
                            <div className="text-[10px] text-slate-500">{task.schedule}</div>
                          </div>
                        </div>

                        <span className="font-bold text-[11px] text-[#EFCE7B] bg-[#EFCE7B]/10 px-2 py-0.5 rounded">
                          +{task.stars}★
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Goal Card Overlay */}
      <div className="absolute -bottom-6 -right-2 sm:-bottom-7 sm:-right-4 w-[55%] sm:w-[40%] max-w-sm hidden xs:block z-20">
        <div className="p-4 rounded-2xl bg-slate-900 border border-[#52A5CE]/50 shadow-2xl shadow-black/90 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52A5CE] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#EFCE7B]" /> Reward Goal Milestone
            </span>
            <span className="text-xs font-bold text-[#EFCE7B]">45 / 60 Stars</span>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-xs text-white flex items-center justify-between">
              <span>Nintendo Switch OLED</span>
              <span className="text-[11px] font-normal text-slate-400">75%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#EFCE7B] to-[#52A5CE] w-[75%]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>15 Stars left</span>
            <span className="text-[#AACC96] font-semibold">Goal Target: Sept 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
