'use client';

import React, { useState } from 'react';
import { FirstSavvyIcon } from '@/components/brand/FirstSavvyBrandLogo';
import {
  LayoutDashboard,
  Landmark,
  PieChart,
  Target,
  Calendar,
  TrendingUp,
  Briefcase,
  Users,
  CheckSquare,
  Lock,
  Settings,
  CreditCard,
  Star,
  Sparkles,
  Check,
  Plus,
  X,
  Gamepad2,
  LockKeyhole
} from 'lucide-react';

export function LiveHeroDashboardPreview() {
  const [userRole, setUserRole] = useState<'parent' | 'child'>('parent');
  const [activeNav, setActiveNav] = useState<string>('dashboard');

  // Interactive Chores State matching the web app
  const [chores, setChores] = useState([
    { id: '1', title: 'Tidy Bedroom & Make Bed', cadence: 'Daily', stars: 2, completed: true },
    { id: '2', title: 'Feed & Walk Pet Dog', cadence: 'Morning', stars: 3, completed: false },
    { id: '3', title: 'Daily Math & Reading Time', cadence: 'Weekdays', stars: 4, completed: false },
  ]);

  const [starBalance, setStarBalance] = useState(45);
  const targetStars = 60;

  // Modal & Toast
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCadence, setNewCadence] = useState('Daily');
  const [newStars, setNewStars] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle chore checkbox
  const toggleChore = (choreId: string) => {
    setChores((prev) =>
      prev.map((c) => {
        if (c.id === choreId) {
          const nextCompleted = !c.completed;
          const delta = nextCompleted ? c.stars : -c.stars;
          setStarBalance((prevStars) => Math.max(0, prevStars + delta));

          setToastMessage(
            nextCompleted
              ? `⭐ Emma earned +${c.stars} Stars for "${c.title}"!`
              : `Chore "${c.title}" marked pending.`
          );
          setTimeout(() => setToastMessage(null), 3500);

          return { ...c, completed: nextCompleted };
        }
        return c;
      })
    );
  };

  // Add chore
  const handleAddChore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newChore = {
      id: String(Date.now()),
      title: newTitle.trim(),
      cadence: newCadence,
      stars: Number(newStars),
      completed: false,
    };

    setChores((prev) => [...prev, newChore]);
    setNewTitle('');
    setAssignModalOpen(false);

    setToastMessage(`✨ Assigned "${newChore.title}" to Emma with +${newChore.stars}★ reward!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'banking', name: 'Banking', icon: Landmark },
    { id: 'budgeting', name: 'Budgeting', icon: PieChart },
    { id: 'goals', name: 'Goals & Savings', icon: Target },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'net-worth', name: 'Net Worth', icon: TrendingUp },
    { id: 'investments', name: 'Investments', icon: Briefcase },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'tasks', name: 'Chores & Stars', icon: CheckSquare, badge: 'Emma: 45★' },
    { id: 'vault', name: 'Password Vault', icon: Lock },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div data-mock-preview className="relative w-full select-none text-left font-sans transition-all duration-300">
      {/* Main Browser Window Frame */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-14 right-6 z-50 bg-white dark:bg-slate-800 border border-[#52A5CE]/60 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 animate-in fade-in duration-150">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Top Browser Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
              <LayoutDashboard className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline">First Savvy App</span>
          </div>

          {/* Mode Switcher Toggle Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => {
                  setUserRole('parent');
                  setActiveNav('dashboard');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  userRole === 'parent'
                    ? 'bg-[#52A5CE] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                Parent View (Full Finance)
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserRole('child');
                  setActiveNav('tasks');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'child'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${userRole === 'child' ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
                <span>Child View (Emma)</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-[11px] ${
                userRole === 'parent' ? 'bg-[#52A5CE] text-white' : 'bg-amber-400 text-slate-950'
              }`}>
                {userRole === 'parent' ? 'P' : 'E'}
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {userRole === 'parent' ? 'Sarah (Parent)' : 'Emma (Child)'}
              </span>
            </div>
          </div>
        </div>

        {/* WebApp Workspace Split: Real Sidebar + Main View */}
        <div className="flex bg-slate-50 dark:bg-slate-950 min-h-[560px]">
          {/* Left Sidebar (Matching Web App #2c4a6b brand navy) */}
          <aside className="w-56 bg-[#2c4a6b] text-white p-3 hidden md:flex flex-col justify-between shrink-0 shadow-sm">
            <div className="space-y-4">
              {/* Brand Icon Lockup */}
              <div className="flex items-center gap-2 px-2 pt-1 pb-1">
                <FirstSavvyIcon className="h-7 w-7 text-white" />
                <span className="text-sm font-bold tracking-tight text-white">First Savvy</span>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveNav(item.id);
                        if (userRole === 'child' && item.id !== 'tasks' && item.id !== 'goals') {
                          setUserRole('parent');
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#52A5CE] text-white font-bold shadow-xs'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="break-words line-clamp-2">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Account Switcher */}
            <div
              onClick={() => {
                if (userRole === 'parent') {
                  setUserRole('child');
                  setActiveNav('tasks');
                } else {
                  setUserRole('parent');
                  setActiveNav('dashboard');
                }
              }}
              className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-3 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-sky-200 uppercase tracking-wider mb-1">
                <span>{userRole === 'parent' ? 'PARENT ACCOUNT' : 'KID SPACE'}</span>
                <span className="text-white text-[11px] font-bold">SWITCH ⇄</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  userRole === 'parent' ? 'bg-[#52A5CE] text-white' : 'bg-amber-400 text-slate-950'
                }`}>
                  {userRole === 'parent' ? 'P' : 'E'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                    {userRole === 'parent' ? 'Sarah (Admin)' : 'Emma Miller'}
                  </div>
                  <div className="text-[11px] text-sky-200 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                    {userRole === 'parent' ? 'All Accounts Active' : '⭐ 45 Stars (Target 60★)'}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Experience */}
          <main className="flex-1 p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[600px] bg-slate-50 dark:bg-slate-950">
            {/* CHILD VIEW MODE */}
            {userRole === 'child' ? (
              <div className="space-y-5">
                {/* Emma Greeting Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-sky-50 to-white dark:from-amber-950/30 dark:via-sky-950/30 dark:to-slate-900 border border-amber-200 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                      ⭐
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Welcome back, Emma!</h2>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        You have <span className="font-bold text-amber-600 dark:text-amber-400">{starBalance} Stars</span>. Complete chores to reach your Nintendo Switch!
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserRole('parent');
                      setActiveNav('dashboard');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#52A5CE] text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                  >
                    <LockKeyhole className="w-3.5 h-3.5" />
                    <span>Parent Admin Mode</span>
                  </button>
                </div>

                {/* Emma's Chores List */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">My Active Chores &amp; Tasks</h3>
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {chores.filter(c => c.completed).length}/{chores.length} Completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    {chores.map((chore) => (
                      <div
                        key={chore.id}
                        onClick={() => toggleChore(chore.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          chore.completed
                            ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-50/70 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                              chore.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {chore.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div className="min-w-0">
                            <div className={`font-semibold text-xs sm:text-sm break-words line-clamp-2 xl:line-clamp-none xl:truncate ${chore.completed ? 'line-through text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                              {chore.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{chore.cadence}</div>
                          </div>
                        </div>
                        <div className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 text-xs font-bold shrink-0">
                          +{chore.stars}★
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* PARENT DASHBOARD VIEW */
              <div className="space-y-4 sm:space-y-5">
                {/* 1. Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Household Financial Hub
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Full visibility into household balance sheet, Plaid accounts, and children&apos;s chores.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAssignModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#52A5CE] hover:bg-[#438fb6] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Assign Chore</span>
                  </button>
                </div>

                {/* 2. Top 3 Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Card 1: True Net Worth */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">True Net Worth</span>
                      <span className="text-[11px] font-bold text-emerald-600">↗ +3.2%</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight mt-1">
                      $437,407.70
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                      Assets: <span className="font-semibold text-slate-700 dark:text-slate-200">$926,450</span> • Debts:{' '}
                      <span className="font-semibold text-rose-600">-$489,042</span>
                    </div>
                  </div>

                  {/* Card 2: August Budgets */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">August Budgets</span>
                      <span className="text-[11px] font-bold text-[#52A5CE]">50/30/20 Rule</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight mt-1">
                      $4,124.90
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                      <span className="text-emerald-600 font-semibold">$2,450.00</span> remaining limit
                    </div>
                  </div>

                  {/* Card 3: Emma's Stars Balance */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Emma&apos;s Stars Balance</span>
                      <span className="text-[11px] font-bold text-amber-600">★ Supervised</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight mt-1">
                      <span className="text-amber-600">{starBalance}</span>
                      <span className="text-slate-400 font-normal text-sm sm:text-base"> / {targetStars} Stars</span>
                    </div>
                    <div className="text-[11px] font-medium text-[#52A5CE] mt-1 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
                      {Math.round((starBalance / targetStars) * 100)}% toward Nintendo Switch Goal
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Split Section: Recent Transactions + Emma's Active Chores */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Recent Transactions (7 cols) */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#52A5CE]" />
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Transactions</h3>
                      </div>
                      <span className="text-xs font-semibold text-[#52A5CE]">View Banking →</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">Acme Corp Bi-Weekly Salary</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Income • Aug 22, 2026</div>
                        </div>
                        <div className="font-bold text-xs text-emerald-600">+$4,750.00</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">Whole Foods Market — Columbus</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Groceries • Aug 21, 2026</div>
                        </div>
                        <div className="font-bold text-xs text-slate-900 dark:text-slate-100">-$164.50</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">Rocket Mortgage Escrow</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Housing • Aug 18, 2026</div>
                        </div>
                        <div className="font-bold text-xs text-slate-900 dark:text-slate-100">-$2,450.00</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Emma Chores */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Emma&apos;s Chores</h3>
                      </div>
                      <span className="text-xs font-semibold text-amber-600">
                        {chores.filter(c => c.completed).length}/{chores.length} Done
                      </span>
                    </div>

                    <div className="space-y-2">
                      {chores.map((chore) => (
                        <div
                          key={chore.id}
                          onClick={() => toggleChore(chore.id)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                            chore.completed
                              ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              chore.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {chore.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-xs break-words line-clamp-2 xl:line-clamp-none xl:truncate ${chore.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>
                              {chore.title}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-600 shrink-0">+{chore.stars}★</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
