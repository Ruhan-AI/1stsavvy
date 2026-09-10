'use client';

import React, { useState, useMemo, useRef } from 'react';
import { amountClass } from './DemoAppPages';
import { FamilyDemoChildView } from './FamilyDemoChildView';
import { FamilyDemoDialogs } from './FamilyDemoDialogs';
import { FirstSavvyLogoSidebar, FirstSavvyIcon } from '@/components/brand/FirstSavvyBrandLogo';
import {
  LayoutDashboard,
  CircleDollarSign,
  ClipboardList,
  PiggyBank,
  Calendar as CalendarIcon,
  CreditCard,
  Banknote,
  TrendingUp,
  Users,
  Share2,
  Cable,
  Lock,
  SlidersHorizontal,
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ChevronLeft,
  Plus,
  X,
  Check,
  Star,
  Bell,
  Menu,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

type TaskStatus = 'open' | 'pending' | 'approved';
type ChartTab = 'networth' | 'spending' | 'flow' | 'cash';
type Timeframe = 'MTD' | '30D' | '3M' | '6M' | 'YTD' | '1Y' | 'All';

interface DemoTask {
  id: string;
  title: string;
  childId: string;
  schedule: string;
  stars: number;
  status: TaskStatus;
}

interface TransactionItem {
  id: string;
  name: string;
  date: string;
  account: string;
  amount: string;
  category: string;
  posted: boolean;
}

const HOUSEHOLD = [
  { id: 'leo', name: 'Leo', initials: 'LM', color: '#52A5CE' },
  { id: 'maya', name: 'Maya', initials: 'MM', color: '#10b981' },
];

const MONTH_LABELS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

const SERIES: Record<ChartTab, number[]> = {
  networth: [51200, 52050, 52980, 53640, 54510, 55260, 56180, 56890, 57610, 58230, 58990, 59070.72],
  spending: [3180, 3620, 4150, 2980, 3240, 3510, 3390, 3720, 3460, 3280, 3510, 3420.5],
  flow: [2450, 1980, -420, 3120, 2870, 2540, 3310, 2760, 3050, 3480, 3920, 4150],
  cash: [14200, 14980, 13640, 15320, 15870, 16240, 16910, 17280, 17640, 17980, 18210, 18420.15],
};

const TAB_LABELS: Record<ChartTab, string> = {
  networth: 'Net Worth',
  spending: 'Spending',
  flow: 'Money In/Out',
  cash: 'Cash Balance',
};

const TIMEFRAMES: Timeframe[] = ['MTD', '30D', '3M', '6M', 'YTD', '1Y', 'All'];

const TIMEFRAME_POINTS: Record<Timeframe, number> = {
  MTD: 2,
  '30D': 2,
  '3M': 3,
  '6M': 6,
  YTD: 9,
  '1Y': 12,
  All: 12,
};

const money = (n: number) =>
  (n < 0 ? '-' : '') +
  '$' +
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const compact = (n: number, range = Math.abs(n)) => {
  const a = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  const dp = (unit: number) => {
    const step = range / 3 / unit;
    return step >= 10 ? 0 : step >= 1 ? 1 : 2;
  };
  if (a >= 1_000_000) return `${sign}$${(a / 1_000_000).toFixed(dp(1_000_000))}M`;
  if (a >= 1_000) return `${sign}$${(a / 1_000).toFixed(dp(1_000))}k`;
  return `${sign}$${Math.round(a)}`;
};

const BUDGET_ROWS = [
  { id: 'b1', name: 'Groceries & Dining', spent: 640, budget: 850 },
  { id: 'b2', name: 'Housing & Utilities', spent: 2450, budget: 2450 },
  { id: 'b3', name: 'Family & Allowance', spent: 210, budget: 200 },
];

export function LiveHeroDashboardPreview() {
  const [accountMode, setAccountMode] = useState<'parent' | 'child'>('child');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Chores & Star Balances
  const starBalances: Record<string, number> = { leo: 42, maya: 28 };
  const tasks: DemoTask[] = [
    { id: 'k1', title: 'Gardening', childId: 'leo', schedule: 'Daily', stars: 5, status: 'open' },
    { id: 'k2', title: 'Help mother with Laundry', childId: 'leo', schedule: 'Weekly', stars: 5, status: 'open' },
    { id: 'k3', title: 'Brush Your Teeth', childId: 'leo', schedule: 'Daily', stars: 5, status: 'open' },
    { id: 'k4', title: 'Tidy Bedroom & Make Bed', childId: 'leo', schedule: 'Daily', stars: 5, status: 'approved' },
    { id: 'k5', title: 'Water Garden Plants', childId: 'maya', schedule: 'Daily', stars: 2, status: 'open' },
  ];

  const [completeTask, setCompleteTask] = useState<{ title: string; stars: number } | null>(null);
  const [cashInOpen, setCashInOpen] = useState(false);

  const redirectToSignup = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/signup';
    }
  };

  const switchAccountMode = (mode: 'parent' | 'child') => {
    setAccountMode(mode);
    setMobileNavOpen(false);
    setCompleteTask(null);
    setCashInOpen(false);
    contentRef.current?.scrollTo({ top: 0 });
  };

  const toggleAccountMode = () => switchAccountMode(accountMode === 'parent' ? 'child' : 'parent');

  // Net Worth Chart state
  const [chartTab] = useState<ChartTab>('networth');
  const [timeframe] = useState<Timeframe>('YTD');

  const chart = useMemo(() => {
    const full = SERIES[chartTab];
    const count = Math.min(TIMEFRAME_POINTS[timeframe], full.length);
    const values = full.slice(full.length - count);
    const labels = MONTH_LABELS.slice(MONTH_LABELS.length - count);

    const latest = values[values.length - 1];
    const first = values[0];
    const deltaPct = first === 0 ? 0 : ((latest - first) / Math.abs(first)) * 100;

    const hi = Math.max(...values);
    const min = Math.min(...values, ...(values.some((v) => v < 0) ? [0] : []));
    const span = hi - min || Math.abs(hi) || 1;
    const padTop = min + span * 1.1;
    const padBottom = min - span * 0.05;
    const range = padTop - padBottom || 1;

    const W = 600;
    const H = 180;
    const L = 8;
    const R = 16;
    const T = 18;
    const B = 22;

    const x = (i: number) => (values.length === 1 ? L : L + ((W - L - R) * i) / (values.length - 1));
    const y = (v: number) => T + (H - T - B) * (1 - (v - padBottom) / range);

    const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    const area =
      `M ${x(0).toFixed(1)} ${y(padBottom).toFixed(1)} ` +
      values.map((v, i) => `L ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ') +
      ` L ${x(values.length - 1).toFixed(1)} ${y(padBottom).toFixed(1)} Z`;

    const ticks = [0, 1, 2, 3].map((k) => {
      const v = padBottom + (range * k) / 3;
      return { v, y: y(v) };
    });

    const rising = latest >= first;
    const good = chartTab === 'spending' ? !rising : rising;

    return {
      values,
      labels,
      latest,
      deltaPct,
      rising,
      good,
      line,
      area,
      ticks,
      W,
      H,
      range,
      stroke: good ? '#10b981' : '#e11d48',
    };
  }, [chartTab, timeframe]);

  // Transactions list
  const transactions: TransactionItem[] = [
    { id: 't1', name: 'Digital Media Stream', date: 'Sep 2', account: 'Primary Checking', amount: '-$14.99', category: 'Entertainment', posted: true },
    { id: 't2', name: 'Salary Direct Deposit', date: 'Aug 31', account: 'Primary Checking', amount: '+$3,200.00', category: 'Income', posted: true },
    { id: 't3', name: 'Fresh Family Market', date: 'Aug 30', account: 'Primary Checking', amount: '-$82.40', category: 'Groceries', posted: false },
  ];

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Banking', icon: CircleDollarSign },
    { name: 'Budgeting', icon: ClipboardList },
    { name: 'Goals & Savings', icon: PiggyBank },
    { name: 'Calendar', icon: CalendarIcon },
    { name: 'Credit Score', icon: CreditCard },
    { name: 'Net Worth', icon: Banknote },
    { name: 'Investments', icon: TrendingUp },
    { name: 'Password Vault', icon: Lock },
    { name: 'Contacts', icon: Users },
    { name: 'Integrations', icon: Cable },
    { name: 'Profile Settings', icon: SlidersHorizontal },
  ];

  return (
    <div data-mock-preview role="region" aria-label="Interactive family dashboard demo" className="relative w-full select-none text-left font-sans transition-all duration-300">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-brand-sky/25 via-blue-600/20 to-teal-400/20 rounded-3xl -z-10 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Glass Mockup Container */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#101926] border border-slate-700/80 shadow-2xl transition-all duration-700 ease-out cursor-default flex flex-col">
        {/* In-Container Modal Popups */}
        <FamilyDemoDialogs
          task={completeTask}
          cashInOpen={cashInOpen}
          starBalance={starBalances.leo}
          onClose={() => { setCompleteTask(null); setCashInOpen(false); }}
          onSignup={redirectToSignup}
        />
        {/* macOS Style Window Chrome Header */}
        <div className="relative z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 px-3 sm:px-5 py-2.5 bg-slate-900/95 border-b border-slate-800/90">
          {/* Left: macOS Dots */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 shadow-xs ring-1 ring-rose-600/30 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-xs ring-1 ring-amber-500/30 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-xs ring-1 ring-emerald-500/30 inline-block" />
            <span className="hidden xl:inline-block ml-3 text-[11px] font-medium text-slate-400 tracking-wide">
              First Savvy • Official Product Walkthrough
            </span>
          </div>

          {/* Center: Switch Feature Tabs */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 shadow-inner">
            <button
              type="button"
              onClick={() => switchAccountMode('parent')}
              aria-pressed={accountMode === 'parent'}
              className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 min-h-[30px] px-2.5 sm:px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                accountMode === 'parent'
                  ? 'bg-[#52A5CE] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              {/* 320px cannot fit both full labels plus the KID badge — shorten here, not at sm. */}
              <span className="sm:hidden">Parent</span>
              <span className="hidden sm:inline">Parent View</span>
            </button>
            <button
              type="button"
              onClick={() => switchAccountMode('child')}
              aria-pressed={accountMode === 'child'}
              className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 min-h-[30px] px-2.5 sm:px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                accountMode === 'child'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${accountMode === 'child' ? 'fill-slate-950 text-slate-950' : 'text-amber-300 animate-pulse'}`} />
              <span className="sm:hidden">Child</span>
              <span className="hidden sm:inline">Child View (Leo)</span>
              {/* High contrast KID badge */}
              <span
                className={`hidden sm:inline text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-extrabold transition-colors ${
                  accountMode === 'child'
                    ? 'bg-slate-950 text-amber-300 border border-slate-900 shadow-2xs'
                    : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                }`}
              >
                KID
              </span>
            </button>
          </div>

          {/* Right spacer to balance macOS dots on left */}
          <div className="hidden sm:block w-16" />
        </div>

        {/* WebApp Workspace Split: Exact Homepage Hero Web App Shell */}
        <div className="relative flex h-[540px] sm:h-[570px] w-full overflow-hidden border-t border-slate-200 bg-[#f8fafc] text-left font-sans text-slate-800">
          {/* 1. LEFT SIDEBAR (Exact deep navy #2c4a6b from First Savvy Web App Layout.jsx & LiveAppDashboardPreview) */}
          {mobileNavOpen && (
            <button
              type="button"
              aria-label="Close demo navigation"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 z-30 bg-slate-900/50 lg:hidden"
            />
          )}
          <aside
            id="demo-navigation"
            aria-label="Demo navigation"
            className={`${mobileNavOpen ? 'absolute inset-y-0 left-0 z-40 flex' : 'hidden'} max-w-[88%] w-64 lg:relative lg:z-auto lg:flex shrink-0 h-full transition-[width] duration-300 flex-col border-r border-slate-700/40 text-white select-none ${
              sidebarCollapsed ? 'lg:w-16' : 'lg:w-48'
            }`}
            style={{ backgroundColor: '#2c4a6b' }}
          >
            {/* Logo Header — exact match to homepage hero LiveAppDashboardPreview.tsx */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-700/50 px-3 lg:hidden">
              <FirstSavvyLogoSidebar className="h-12 w-auto" />
              <button
                type="button"
                aria-label="Close demo menu"
                onClick={() => {
                  setMobileNavOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-700/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden lg:flex h-16 shrink-0 items-center justify-between gap-1 border-b border-slate-700/50 px-2">
              {sidebarCollapsed ? (
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(false)}
                  className="mx-auto flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-slate-700/50"
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                  aria-expanded={false}
                >
                  <FirstSavvyIcon className="h-7 w-7" />
                </button>
              ) : (
                <>
                  <span className="flex min-w-0 flex-1 items-center justify-center pr-1">
                    <FirstSavvyLogoSidebar className="h-12 w-auto max-w-full" />
                  </span>
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(true)}
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
                    title="Collapse sidebar"
                    aria-label="Collapse sidebar"
                    aria-expanded
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 min-h-0 py-3 px-2 space-y-0.5 overflow-y-auto">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === 'Dashboard';
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={redirectToSignup}
                    className={`flex items-center w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1e3550] text-white shadow-xs font-semibold'
                        : accountMode === 'child' ? 'text-slate-400/40 hover:bg-slate-700/50 hover:text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    } ${sidebarCollapsed ? 'justify-center px-1.5' : 'justify-start'}`}
                    title={item.name}
                  >
                    <Icon className={`w-4 h-4 lg:w-3.5 lg:h-3.5 shrink-0 mr-2.5 ${sidebarCollapsed ? 'mr-0' : ''}`} />
                    <span className={`truncate text-left text-xs ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Keep the account switch available at the foot of the sidebar. */}
            <div className="p-2 border-t border-slate-700/50">
              <button
                type="button"
                onClick={toggleAccountMode}
                className={`w-full text-left rounded-xl bg-[#1e3550] hover:bg-[#182c44] border border-slate-600/50 transition-all cursor-pointer group ${sidebarCollapsed ? 'p-1.5' : 'p-2.5'}`}
                title="Click to switch between Parent and Child view"
                aria-label={`Switch to ${accountMode === 'parent' ? 'Child' : 'Parent'} View`}
              >
                <div className={`${sidebarCollapsed ? 'lg:hidden' : ''} flex items-center justify-between text-[10px] font-bold text-sky-200 uppercase tracking-wider mb-1`}>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${accountMode === 'parent' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                    {accountMode === 'parent' ? 'PARENT ACCOUNT' : 'KID SPACE'}
                  </span>
                  <span className="text-white text-[10px] font-bold group-hover:text-sky-300">SWITCH ⇄</span>
                </div>
                <div className={`flex items-center gap-2 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${accountMode === 'parent' ? 'bg-[#52A5CE] text-white' : 'bg-amber-400 text-slate-950'}`}>
                    {accountMode === 'parent' ? 'SM' : 'LM'}
                  </div>
                  <div className={`min-w-0 flex-1 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                    <div className="text-xs font-bold text-white truncate">
                      {accountMode === 'parent' ? 'Sarah Miller (Admin)' : 'Leo Miller (Kid)'}
                    </div>
                    <div className="text-[10px] text-sky-200 truncate">
                      {accountMode === 'parent' ? 'All Accounts Active' : `⭐ ${starBalances.leo} Stars Balance`}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </aside>

          {/* 2. MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col h-full min-h-0 min-w-0 bg-[#f8fafc] overflow-hidden">
            {/* Top Header Bar */}
            <header className="bg-white px-3 sm:px-5 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-1 shrink-0">
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <button
                  ref={menuButtonRef}
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open demo navigation"
                  aria-expanded={mobileNavOpen}
                  aria-controls="demo-navigation"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>
                {/* 320px has no room for the greeting alongside the name and the actions. */}
                <span className="hidden sm:inline shrink-0 text-xs text-slate-500 font-normal">Welcome,</span>
                <span className="truncate text-xs font-semibold text-slate-900">
                  Sarah Miller
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {/* Referral Button */}
                <button
                  type="button"
                  onClick={redirectToSignup}
                  aria-label="Referral"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#0F766E] hover:bg-[#115E59] text-white shadow-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">Referral</span>
                </button>

                {/* Search */}
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className="inline-flex items-center justify-center p-1 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Notifications */}
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className="relative inline-flex items-center justify-center p-1 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                </button>

                {/* Avatar */}
                <button
                  type="button"
                  onClick={redirectToSignup}
                  aria-label="Profile settings"
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold cursor-pointer transition-all ${
                    accountMode === 'parent' ? 'bg-[#52A5CE] text-white' : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  {accountMode === 'parent' ? 'SM' : 'LM'}
                </button>
              </div>
            </header>

            {/* Open family profiles also switch the preview locally. */}
            <div className="relative flex shrink-0 items-center gap-1 border-b-2 border-slate-200 bg-white px-3 pt-2 sm:px-5">
              {(['parent', 'child'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => switchAccountMode(mode)}
                  aria-pressed={accountMode === mode}
                  className={`-mb-[2px] inline-flex min-w-0 items-center gap-2 rounded-t-xl border-x-2 border-t-2 px-2.5 py-1.5 text-[11px] sm:px-3 sm:text-xs ${accountMode === mode ? 'border-slate-300 bg-[#f4f9fd] font-semibold text-slate-900' : 'border-transparent bg-slate-100 text-slate-500'}`}
                >
                  <span className="truncate">{mode === 'parent' ? 'Sarah Miller' : 'Leo Miller'}</span>
                  <X aria-hidden="true" className="h-3 w-3 shrink-0" />
                </button>
              ))}
              <button
                type="button"
                onClick={redirectToSignup}
                className="shrink-0 cursor-pointer p-1 text-slate-500 hover:text-slate-700"
                aria-label="Add profile"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* History Bar */}
            <div className="flex shrink-0 items-center gap-1 border-b border-slate-200 bg-white px-3 py-1">
              {[
                { icon: ArrowLeft, label: 'Back', action: redirectToSignup },
                { icon: ArrowRight, label: 'Forward', action: redirectToSignup },
                { icon: RotateCw, label: 'Refresh', action: redirectToSignup },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  title={label}
                  className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>

            {/* Scrollable Content Area */}
            <div ref={contentRef} className={`p-2 sm:p-3 flex-1 min-h-0 min-w-0 overflow-y-auto overscroll-contain ${accountMode === 'child' ? 'bg-[#f4f8fb]' : ''}`}>
              {accountMode === 'child' ? (
                <FamilyDemoChildView
                  starBalance={starBalances.leo}
                  onCompleteTask={setCompleteTask}
                  onCashIn={() => setCashInOpen(true)}
                  onSignup={redirectToSignup}
                  onSwitchToParent={() => switchAccountMode('parent')}
                />
              ) : (
                /* PARENT VIEW MODE: Exact Homepage Dashboard with Concise Details */
                <div className="flex flex-col lg:flex-row gap-3.5 items-start">
                  {/* ============ LEFT COLUMN ============ */}
                  <div className="flex-1 min-w-0 w-full space-y-3.5">
                    {/* Top: Net Worth Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 sm:p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200/60 bg-slate-100 p-0.5">
                          {(Object.keys(TAB_LABELS) as ChartTab[]).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={redirectToSignup}
                              className={`inline-flex min-h-[28px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-md px-2.5 text-[11px] font-medium transition-all ${
                                chartTab === t ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              {TAB_LABELS[t]}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={redirectToSignup}
                          className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                        >
                          View details →
                        </button>
                      </div>

                      {/* Balance & Trend */}
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xl font-bold tabular-nums text-slate-900 sm:text-2xl">
                          {money(chart.latest)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            chart.good ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {chart.rising ? '↑' : '↓'} {chart.deltaPct >= 0 ? '+' : ''}
                          {chart.deltaPct.toFixed(1)}% trailing
                        </span>
                      </div>

                      {/* SVG Chart Plot */}
                      <div className="mt-2 flex gap-2">
                        <div className="relative w-10 shrink-0">
                          {chart.ticks.map((t) => (
                            <span
                              key={t.v}
                              className="absolute right-0 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium tabular-nums text-slate-400"
                              style={{ top: `${(t.y / chart.H) * 100}%` }}
                            >
                              {compact(t.v, chart.range)}
                            </span>
                          ))}
                          <div className="h-28 sm:h-36" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <svg
                            viewBox={`0 0 ${chart.W} ${chart.H}`}
                            preserveAspectRatio="none"
                            className="h-28 w-full sm:h-36"
                            role="img"
                            aria-label={`${TAB_LABELS[chartTab]} over ${timeframe}`}
                          >
                            <defs>
                              <linearGradient id="heroDemoChartFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chart.stroke} stopOpacity="0.22" />
                                <stop offset="100%" stopColor={chart.stroke} stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {chart.ticks.map((t) => (
                              <line
                                key={t.v}
                                x1="0"
                                x2={chart.W}
                                y1={t.y}
                                y2={t.y}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                vectorEffect="non-scaling-stroke"
                              />
                            ))}
                            <path d={chart.area} fill="url(#heroDemoChartFill)" />
                            <path
                              d={chart.line}
                              fill="none"
                              stroke={chart.stroke}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>

                          <div className="mt-0.5 flex justify-between">
                            {chart.labels.map((l) => (
                              <span key={l} className="text-[10px] font-medium text-slate-400">
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Timeframe Pills */}
                      <div className="mt-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
                        {TIMEFRAMES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={redirectToSignup}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                              timeframe === t ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Recent Transactions + Top Budgets */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {/* Recent Transactions */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Recent Transactions
                          </span>
                          <button
                            type="button"
                            onClick={redirectToSignup}
                            className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                          >
                            View all
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {transactions.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={redirectToSignup}
                              className="w-full p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate">{t.name}</div>
                                <div className="text-[10px] text-slate-400">{t.date} • {t.category}</div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className={`text-xs font-bold ${amountClass(t.amount)}`}>{t.amount}</div>
                                <span className={`text-[11px] font-bold px-1 rounded ${t.posted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {t.posted ? 'Posted' : 'Pending'}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Top Utilized Budgets */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Top Utilized Budgets
                          </span>
                          <button
                            type="button"
                            onClick={redirectToSignup}
                            className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                          >
                            View all
                          </button>
                        </div>

                        <div className="space-y-2 pt-0.5">
                          {BUDGET_ROWS.map((b) => {
                            const pct = Math.round((b.spent / b.budget) * 100);
                            return (
                              <div key={b.id} className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="font-semibold text-slate-800 truncate">{b.name}</span>
                                  <span className="text-slate-500 tabular-nums">
                                    {money(b.spent)} / {money(b.budget)}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${pct > 100 ? 'bg-rose-500' : 'bg-[#52A5CE]'}`}
                                    style={{ width: `${Math.min(100, pct)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ============ RIGHT RAIL ============ */}
                  <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-3.5">
                    {/* Household Card */}
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">HOUSEHOLD</span>
                          <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">
                            2 kids
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => switchAccountMode('child')}
                          className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                        >
                          Leo Space →
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        {HOUSEHOLD.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              if (m.id === 'leo') switchAccountMode('child');
                              else redirectToSignup();
                            }}
                            className="group flex flex-col items-center gap-1 transition-transform cursor-pointer"
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white border-2 border-slate-200 group-hover:border-[#52A5CE] transition-all"
                              style={{ backgroundColor: m.color }}
                            >
                              {m.initials}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#52A5CE]">
                              {m.name} ({starBalances[m.id]}★)
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chores & Tasks Summary Card */}
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          <CheckSquare className="w-3.5 h-3.5 text-[#52A5CE]" />
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            ACTIVE CHORES
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => switchAccountMode('child')}
                          className="text-[11px] font-semibold text-[#52A5CE] hover:underline cursor-pointer"
                        >
                          View kid space →
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {tasks.slice(0, 3).map((t) => {
                          const isDone = t.status === 'approved';
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={redirectToSignup}
                              className={`w-full p-2 text-left rounded-lg border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                isDone ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div
                                  className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                                    isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span className={`text-xs truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                                  {t.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-amber-600 shrink-0">+{t.stars}★</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
