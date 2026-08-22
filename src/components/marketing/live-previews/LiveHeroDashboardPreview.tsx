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
  Plus,
  Car,
  Home,
  Check,
  X,
  FileText,
  Shield,
  Key
} from 'lucide-react';

export function LiveHeroDashboardPreview() {
  const [activeNav, setActiveNav] = useState<
    'dashboard' | 'banking' | 'transactions' | 'budgets' | 'goals' | 'tasks' | 'net-worth' | 'vault' | 'contacts' | 'settings'
  >('dashboard');
  const [completedTasks, setCompletedTasks] = useState<number[]>([0]);
  const [activeChild, setActiveChild] = useState<'emma' | 'lucas'>('emma');
  const [transFilter, setTransFilter] = useState<'all' | 'posted' | 'pending'>('all');
  const [transSearch, setTransSearch] = useState('');
  const [showChoreModal, setShowChoreModal] = useState(false);
  const [newChoreStars, setNewChoreStars] = useState(3);
  const [newChoreTitle, setNewChoreTitle] = useState('Homework & Reading Practice');

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

  const transactionsList = [
    { id: '1', name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', amount: '+$4,750.00', status: 'posted', date: 'Aug 22, 2026', account: 'Chase Checking ...4921', color: 'bg-[#25533F]/30 text-[#AACC96] border-[#AACC96]/30' },
    { id: '2', name: 'Whole Foods Market — Columbus', cat: 'Groceries', amount: '-$164.50', status: 'posted', date: 'Aug 21, 2026', account: 'Sapphire Preferred ...8812', color: 'bg-[#52A5CE]/20 text-[#52A5CE] border-[#52A5CE]/30' },
    { id: '3', name: 'Rocket Mortgage Escrow', cat: 'Housing', amount: '-$2,450.00', status: 'posted', date: 'Aug 18, 2026', account: 'Chase Checking ...4921', color: 'bg-[#EF6F3C]/20 text-[#EF6F3C] border-[#EF6F3C]/30' },
    { id: '4', name: 'Emma Star Allowance Payout', cat: 'Family & Chores', amount: '-$25.00', status: 'pending', date: 'Aug 22, 2026', account: 'First Savvy Star Ledger', color: 'bg-[#EFCE7B]/20 text-[#EFCE7B] border-[#EFCE7B]/30' },
    { id: '5', name: 'Vanguard S&P 500 Auto-Invest', cat: 'Investments', amount: '-$500.00', status: 'pending', date: 'Aug 24, 2026', account: 'Vanguard Brokerage ...1092', color: 'bg-[#D3B6D3]/20 text-[#D3B6D3] border-[#D3B6D3]/30' },
  ];

  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full select-none text-left font-sans">
      {/* Ambient Lighting */}
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
              https://app.firstsavvy.com/{activeNav}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#52A5CE]/10 border border-[#52A5CE]/30 text-[#52A5CE] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52A5CE] animate-pulse" />
              <span>Interactive App Preview</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-full bg-[#52A5CE] text-white flex items-center justify-center font-bold text-[10px]">
                M
              </div>
              <span className="font-semibold hidden sm:inline">Miller Family</span>
            </div>
          </div>
        </div>

        {/* WebApp Workspace Split: Real Sidebar + Dynamic Main View */}
        <div className="flex bg-slate-950/95 min-h-[500px]">
          {/* Real App Sidebar with Exact Brand Logo */}
          <aside className="w-48 bg-slate-900/90 border-r border-slate-800/80 p-3 hidden md:flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              {/* Exact Brand Logo Asset Lockup */}
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <img 
                  src="/brand/logo-mark.png" 
                  alt="First Savvy Logo" 
                  className="w-7 h-7 object-contain drop-shadow-xs"
                />
                <div className="font-serif font-bold text-sm text-white tracking-tight">
                  First <span className="text-white">Savvy</span>
                </div>
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
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            <div 
              onClick={() => setActiveChild(activeChild === 'emma' ? 'lucas' : 'emma')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 cursor-pointer hover:border-[#52A5CE]/40 transition-colors"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                <span>Active Profile</span>
                <span className="text-[#AACC96] text-[10px]">Switch ⇄</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  activeChild === 'emma' ? 'bg-[#EFCE7B] text-slate-950' : 'bg-[#52A5CE] text-white'
                }`}>
                  {activeChild === 'emma' ? 'E' : 'L'}
                </div>
                <div>
                  <div className="font-bold text-xs text-white">
                    {activeChild === 'emma' ? 'Emma Miller' : 'Lucas Miller'}
                  </div>
                  <div className="text-[10px] text-amber-400">
                    {activeChild === 'emma' ? '★ 45 Stars (Age 9)' : '★ 80 Stars (Age 12)'}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Dynamic Content Area based on Active Sidebar Tab */}
          <main className="flex-1 p-4 sm:p-6 space-y-5 overflow-hidden">
            {/* Top Workspace Header with Search & Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-800/80">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight capitalize">
                  {activeNav === 'dashboard' && 'Household Financial Hub'}
                  {activeNav === 'banking' && 'Connected Bank Accounts'}
                  {activeNav === 'transactions' && 'All Household Transactions'}
                  {activeNav === 'budgets' && 'Monthly Budgeting & Limits'}
                  {activeNav === 'goals' && 'Family Savings & Reward Goals'}
                  {activeNav === 'tasks' && 'Family Chores & Task Ledger'}
                  {activeNav === 'net-worth' && 'Household True Net Worth'}
                  {activeNav === 'vault' && 'Encrypted Family Vault'}
                  {activeNav === 'contacts' && 'Household Professional Contacts'}
                  {activeNav === 'settings' && 'Family Workspace Settings'}
                </h2>
                <p className="text-xs text-slate-400">
                  {activeNav === 'dashboard' && 'Overview of active accounts, monthly cash flow, and children\'s chore ledger.'}
                  {activeNav === 'banking' && 'Plaid 256-bit encrypted institution sync and manual cash accounts.'}
                  {activeNav === 'transactions' && 'Search, filter, and categorize everyday income and spending activity.'}
                  {activeNav === 'budgets' && '50/30/20 category breakdown with live planned vs. actual progress.'}
                  {activeNav === 'goals' && 'Track progress toward milestone rewards, gadgets, and family experiences.'}
                  {activeNav === 'tasks' && 'Assign supervised chores and homework with star weights.'}
                  {activeNav === 'net-worth' && 'Complete balance sheet of liquid cash, real estate, vehicles, and debts.'}
                  {activeNav === 'vault' && 'Secure repository for insurance policies, estate deeds, and credentials.'}
                  {activeNav === 'contacts' && 'Financial advisors, estate attorneys, CPAs, and family contacts.'}
                  {activeNav === 'settings' && 'COPPA child privacy controls, PIN authentication, and preferences.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowChoreModal(true)}
                  className="bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Chore</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DASHBOARD */}
            {activeNav === 'dashboard' && (
              <div className="space-y-4">
                {/* Top 3 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div 
                    onClick={() => setActiveNav('net-worth')}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm cursor-pointer hover:border-[#52A5CE]/40 transition-colors"
                  >
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

                  <div 
                    onClick={() => setActiveNav('budgets')}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm cursor-pointer hover:border-[#52A5CE]/40 transition-colors"
                  >
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

                  <div 
                    onClick={() => setActiveNav('tasks')}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm cursor-pointer hover:border-[#EFCE7B]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                      <span>{activeChild === 'emma' ? "Emma's Stars" : "Lucas's Stars"}</span>
                      <span className="text-[#EFCE7B] text-xs font-bold">
                        ★ Level 2
                      </span>
                    </div>
                    <div className="text-2xl font-extrabold text-[#EFCE7B] mt-1 font-sans flex items-center gap-1.5">
                      {activeChild === 'emma' ? '45' : '80'} <span className="text-sm font-normal text-amber-200/60">/ 60 Stars Target</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      <span className="text-[#52A5CE]">75% toward Nintendo Switch Goal</span>
                    </div>
                  </div>
                </div>

                {/* Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Recent Transactions (7 cols) */}
                  <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#52A5CE]" />
                        <span className="text-xs font-bold text-white">Recent Transactions</span>
                      </div>
                      <span 
                        onClick={() => setActiveNav('transactions')}
                        className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                      >
                        View All (5) →
                      </span>
                    </div>

                    <div className="space-y-2">
                      {transactionsList.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
                          <div>
                            <div className="font-semibold text-slate-200">{item.name}</div>
                            <div className="text-[10px] text-slate-500">{item.cat} • {item.date}</div>
                          </div>
                          <div className={`font-mono font-bold text-xs ${item.amount.startsWith('+') ? 'text-[#AACC96]' : 'text-slate-200'}`}>
                            {item.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Active Chores (5 cols) */}
                  <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#EFCE7B] fill-[#EFCE7B]" />
                        <span className="text-xs font-bold text-white">
                          {activeChild === 'emma' ? "Emma's Active Chores" : "Lucas's Active Chores"}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#EFCE7B] bg-[#EFCE7B]/10 px-2 py-0.5 rounded">
                        Supervised
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
              </div>
            )}

            {/* TAB 2: BANKING */}
            {activeNav === 'banking' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-[#52A5CE]/40">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Chase Total Checking (...4921)</span>
                      <span className="text-[#AACC96] font-semibold text-[10px]">Plaid Active</span>
                    </div>
                    <div className="text-2xl font-bold text-white mt-1.5 font-mono">$18,450.20</div>
                    <div className="text-[11px] text-slate-500 mt-1">Primary household spend account</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Chase High Yield Savings (...9021)</span>
                      <span className="text-[#AACC96] font-semibold text-[10px]">4.85% APY</span>
                    </div>
                    <div className="text-2xl font-bold text-white mt-1.5 font-mono">$14,000.00</div>
                    <div className="text-[11px] text-slate-500 mt-1">Emergency 6-month buffer</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Chase Sapphire Preferred (...8812)</span>
                      <span className="text-[#EF6F3C] font-semibold text-[10px]">Due Sept 15</span>
                    </div>
                    <div className="text-2xl font-bold text-rose-400 mt-1.5 font-mono">-$1,240.50</div>
                    <div className="text-[11px] text-slate-500 mt-1">Auto-pay enabled</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#52A5CE]/10 text-[#52A5CE]">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Connect Additional Bank or Credit Union</div>
                      <div className="text-xs text-slate-400">Plaid Link connects over 12,000 North American financial institutions.</div>
                    </div>
                  </div>
                  <button type="button" className="bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 py-2 rounded-xl">
                    + Link Bank
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: TRANSACTIONS */}
            {activeNav === 'transactions' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    {(['all', 'posted', 'pending'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setTransFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                          transFilter === f ? 'bg-[#52A5CE] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {f} ({f === 'all' ? transactionsList.length : transactionsList.filter(t => t.status === f).length})
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-60">
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={transSearch}
                      onChange={(e) => setTransSearch(e.target.value)}
                      placeholder="Filter transactions..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-3.5">Date</th>
                        <th className="py-3 px-3.5">Merchant / Description</th>
                        <th className="py-3 px-3.5">Category</th>
                        <th className="py-3 px-3.5">Account</th>
                        <th className="py-3 px-3.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                      {transactionsList
                        .filter(t => (transFilter === 'all' || t.status === transFilter) && t.name.toLowerCase().includes(transSearch.toLowerCase()))
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3 px-3.5 font-mono text-slate-400 whitespace-nowrap text-[11px]">{item.date}</td>
                            <td className="py-3 px-3.5 font-semibold text-slate-200">{item.name}</td>
                            <td className="py-3 px-3.5">
                              <span className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold ${item.color}`}>
                                {item.cat}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-slate-400 text-[11px] truncate max-w-[140px]">{item.account}</td>
                            <td className={`py-3 px-3.5 text-right font-mono font-bold text-sm ${item.amount.startsWith('+') ? 'text-[#AACC96]' : 'text-slate-200'}`}>
                              {item.amount}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: BUDGETS */}
            {activeNav === 'budgets' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Planned</div>
                    <div className="font-mono font-bold text-base text-white mt-1">$6,500.00</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Actual Spent</div>
                    <div className="font-mono font-bold text-base text-[#52A5CE] mt-1">$4,124.90</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Remaining Buffer</div>
                    <div className="font-mono font-bold text-base text-[#AACC96] mt-1">$2,375.10</div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Groceries & Food', spent: '$845.20', limit: '$1,200.00', pct: 70, tag: 'Needs (50%)' },
                    { name: 'Housing & Utilities', spent: '$2,450.00', limit: '$2,600.00', pct: 94, tag: 'Needs (50%)' },
                    { name: 'Family Entertainment & Outings', spent: '$420.00', limit: '$800.00', pct: 52, tag: 'Wants (30%)' },
                    { name: 'Emergency & Savings Allocation', spent: '$409.70', limit: '$1,900.00', pct: 21, tag: 'Savings (20%)' },
                  ].map((b, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{b.name}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-400">{b.tag}</span>
                        </div>
                        <span className="text-slate-300 font-mono text-[11px]">{b.spent} / {b.limit}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#AACC96] to-[#52A5CE]" style={{ width: `${b.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: GOALS */}
            {activeNav === 'goals' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-slate-900 border border-[#52A5CE]/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Nintendo Switch OLED</span>
                      <span className="text-xs font-bold text-[#EFCE7B]">45 / 60 Stars</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#EFCE7B] to-[#52A5CE] w-[75%]" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Emma (Age 9) • 15 Stars left</span>
                      <span className="text-[#AACC96] font-semibold">75% Complete</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Mountain Bike & Helmet</span>
                      <span className="text-xs font-bold text-[#AACC96]">80 / 80 Stars</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-[#AACC96] w-[100%]" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Lucas (Age 12) • 100% Achieved</span>
                      <span className="px-2 py-0.5 rounded bg-[#25533F] text-[#AACC96] font-bold text-[10px]">
                        Ready to Redeem!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: TASKS & CHORES */}
            {activeNav === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#EFCE7B] fill-[#EFCE7B]" />
                    <span className="font-bold text-xs text-white">Emma's Chore & Reward Ledger (Level 2)</span>
                  </div>
                  <span className="text-xs font-bold text-[#EFCE7B] font-mono">45 Stars Active</span>
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'Tidy Bedroom & Make Bed', stars: 2, schedule: 'Daily Routine', desc: 'Bed made, floor cleared' },
                    { title: 'Feed & Walk Pet Dog', stars: 3, schedule: 'Morning & Evening', desc: 'Fresh water, food bowl filled' },
                    { title: 'Daily Math & Reading Practice', stars: 4, schedule: 'Weekdays', desc: '30 mins reading + math sheet' },
                    { title: 'Help Wash Family Car', stars: 5, schedule: 'Weekend Bonus', desc: 'Soap, rinse, and dry' },
                  ].map((task, idx) => {
                    const isDone = completedTasks.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isDone
                            ? 'bg-[#25533F]/30 border-[#AACC96]/40 text-slate-400'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                            isDone ? 'bg-[#AACC96] text-slate-950 font-bold' : 'border border-slate-600'
                          }`}>
                            {isDone && '✓'}
                          </div>
                          <div>
                            <div className={`font-semibold text-xs ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>
                              {task.title}
                            </div>
                            <div className="text-[11px] text-slate-400">{task.desc} • <span className="text-slate-500">{task.schedule}</span></div>
                          </div>
                        </div>

                        <span className="font-bold text-xs text-[#EFCE7B] bg-[#EFCE7B]/10 px-2.5 py-1 rounded-lg">
                          +{task.stars}★
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: NET WORTH */}
            {activeNav === 'net-worth' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-400">Total True Net Worth</div>
                    <div className="text-2xl font-extrabold text-[#AACC96] mt-0.5">$437,407.70</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-slate-300">Total Assets: <span className="text-emerald-400 font-bold">$926,450.00</span></div>
                    <div className="text-slate-300">Total Debts: <span className="text-rose-400 font-bold">-$489,042.30</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Primary Residence (Home)', val: '$620,000.00', type: 'Real Estate' },
                    { name: 'Vanguard 401(k) & Roth IRA', val: '$210,000.00', type: 'Investments' },
                    { name: '2023 Tesla Model Y & CR-V', val: '$64,000.00', type: 'Vehicles' },
                    { name: '30-Year Fixed Mortgage', val: '-$465,042.30', type: 'Liabilities' },
                  ].map((a, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{a.name}</div>
                        <div className="text-[10px] text-slate-400">{a.type}</div>
                      </div>
                      <div className={`font-mono font-bold ${a.val.startsWith('-') ? 'text-rose-400' : 'text-slate-200'}`}>{a.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: VAULT */}
            {activeNav === 'vault' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#AACC96]" />
                    <span className="font-bold text-white">AES-256 Bit Encrypted Storage</span>
                  </div>
                  <span className="text-[11px] text-[#52A5CE]">Zero-Knowledge Key</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Homeowners & Auto Insurance Policy', cat: 'Insurance', items: '2 PDFs' },
                    { name: 'Family Living Trust & Estate Will', cat: 'Legal & Estate', items: '4 Documents' },
                    { name: 'Household Password Vault', cat: 'Credentials', items: '18 Logins' },
                    { name: 'Emergency Medical Directives', cat: 'Health', items: '3 Profiles' },
                  ].map((v, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="font-bold text-xs text-white">{v.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{v.cat}</span>
                        <span className="text-[#52A5CE]">{v.items}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: CONTACTS */}
            {activeNav === 'contacts' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Robert Vance, CFP®', role: 'Financial Advisor', firm: 'Vance Wealth Management', phone: '(555) 234-8901' },
                    { name: 'Sarah Jenkins, Esq.', role: 'Estate Attorney', firm: 'Jenkins & Associates', phone: '(555) 789-1234' },
                    { name: 'David Lee, CPA', role: 'Certified Public Accountant', firm: 'Lee Tax Advisory', phone: '(555) 456-7890' },
                    { name: 'Dr. Emily Carter', role: 'Family Pediatrician', firm: 'Northside Medical Group', phone: '(555) 987-6543' },
                  ].map((c, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="font-bold text-xs text-white">{c.name}</div>
                      <div className="text-[10px] text-[#52A5CE] font-semibold">{c.role} • {c.firm}</div>
                      <div className="text-[10px] text-slate-400">{c.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 10: SETTINGS */}
            {activeNav === 'settings' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Household Name</span>
                    <span className="text-slate-300 font-mono">The Miller Family</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">COPPA Child Protection Mode</span>
                    <span className="text-[#AACC96] font-semibold">Strict Compliant (Active)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">Parent Access PIN</span>
                    <span className="text-slate-300 font-mono">•••• (Protected)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Primary Currency</span>
                    <span className="text-slate-300">USD ($)</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Interactive Chore Modal (Opens on + Assign Chore) */}
      {showChoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EFCE7B]" />
                <span>Assign New Family Chore</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowChoreModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Chore Description</label>
                <input
                  type="text"
                  value={newChoreTitle}
                  onChange={(e) => setNewChoreTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Star Reward</label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewChoreStars(s)}
                      className={`py-1.5 rounded-lg font-bold text-center ${
                        newChoreStars === s
                          ? 'bg-[#EFCE7B] text-slate-950'
                          : 'bg-slate-950 text-[#EFCE7B] border border-slate-800'
                      }`}
                    >
                      +{s}★
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowChoreModal(false)}
                  className="flex-1 py-2 rounded-xl bg-[#52A5CE] hover:bg-[#4392be] text-white font-bold text-xs transition-colors"
                >
                  Save Chore (+{newChoreStars}★)
                </button>
                <button
                  type="button"
                  onClick={() => setShowChoreModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
