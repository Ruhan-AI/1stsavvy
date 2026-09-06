'use client';

import React, { useState, useMemo } from 'react';
import { DemoAppPage, amountClass } from './DemoAppPages';
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
  ChevronRight,
  Plus,
  X,
  Sparkles,
  Utensils,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Bell,
  CheckSquare
} from 'lucide-react';

type TaskStatus = 'open' | 'pending' | 'approved';
type TaskStatusFilter = 'all' | 'active' | 'completed' | 'pending';
type MealCourse = 'Entree' | 'Side' | 'Versatile';

interface DemoTask {
  id: string;
  title: string;
  description?: string;
  childId: string;
  schedule: string;
  stars: number;
  status: TaskStatus;
}

interface DemoEvent {
  id: string;
  day: number;
  title: string;
  color: string;
  allDay: boolean;
}

/** The household this Dashboard is scoped to — the member row FamilyConnectionsCard draws. */
const HOUSEHOLD = [
  { id: 'part', name: 'Part', initials: 'PS', color: '#52A5CE' },
  { id: 'jr', name: 'Simon Jr', initials: 'SJ', color: '#10b981' },
];

const MEAL_OPTIONS: Record<MealCourse, string[]> = {
  Entree: ['Chicken Stir Fry', 'Spaghetti Bolognese', 'Baked Salmon'],
  Side: ['Garden Salad', 'Roast Potatoes', 'Steamed Broccoli'],
  Versatile: ['Pancakes & Fruit', 'Veggie Omelette', 'Turkey Wraps'],
};

/** Repeated "+ Add" clicks add distinct events instead of duplicating one placeholder. */
const NEW_EVENT_IDEAS = [
  { title: 'Swimming Lesson · 5:00 PM', color: '#52A5CE', allDay: false },
  { title: 'Library Books Due', color: '#f59e0b', allDay: true },
  { title: 'Grandparents Visiting', color: '#8b5cf6', allDay: false },
];

/** Fixed date so the server and the client render the same calendar label. */
const DEMO_TODAY = Date.UTC(2025, 8, 5);
const DAY_MS = 86_400_000;

interface TransactionItem {
  id: string;
  name: string;
  date: string;
  account: string;
  amount: string;
  category: string;
  posted: boolean;
}

type ChartTab = 'networth' | 'spending' | 'flow' | 'cash';
type Timeframe = 'MTD' | '30D' | '3M' | '6M' | 'YTD' | '1Y' | 'All';

/**
 * Twelve trailing months per metric, ending on the figure the header shows. The chart is
 * drawn from this rather than hand-placed, so the axis, the headline and the trend always
 * agree — a hand-drawn version ends up with two different Y scales on the same picture.
 */
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

/** How many trailing months each timeframe shows. */
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

/**
 * Compact axis tick. Precision follows the axis *range*, not the magnitude: over a
 * three-month window the values barely move, and rounding to the nearest $1k would
 * print the same label on all four gridlines.
 */
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
  { id: 'b3', name: 'Family & Child Allowance', spent: 210, budget: 200 },
];

export function LiveAppDashboardPreview() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('Simon John');

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  /* Each toast owns the dismiss timer. Without clearing the previous one, an older
     timer fires 3.5s after ITS toast and wipes whatever is on screen at that moment,
     so a quick run of actions loses its last message early. */
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3500);
  };
  React.useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  /* ---------- Task Manager — components/dashboard/DashboardTaskManager.jsx ---------- */
  const [tasks, setTasks] = useState<DemoTask[]>([
    {
      id: 'k1',
      title: 'Tidy Bedroom & Make Bed',
      description: 'Clothes away, bed made and floor clear before school.',
      childId: 'part',
      schedule: 'Daily',
      stars: 2,
      status: 'open',
    },
    {
      id: 'k2',
      title: 'Feed & Walk Pet Dog',
      description: 'Morning feed plus a 15 minute walk around the block.',
      childId: 'jr',
      schedule: 'Daily',
      stars: 3,
      status: 'pending',
    },
    {
      id: 'k3',
      title: 'Math & Reading Practice',
      description: '20 minutes of each, weekdays only.',
      childId: 'jr',
      schedule: 'Weekly',
      stars: 4,
      status: 'approved',
    },
    {
      id: 'k4',
      title: 'Set the Dinner Table',
      childId: 'part',
      schedule: 'Always Available',
      stars: 1,
      status: 'open',
    },
  ]);

  /* Star balances tie the two cards together the way the real app does: approving a task
     pays stars out, redeeming a goal spends them. */
  const [starBalances, setStarBalances] = useState<Record<string, number>>({ part: 45, jr: 20 });

  /* ---------- Goals — components/dashboard/DashboardGoalsCard.jsx ---------- */

  /* ---------- Calendar card ---------- */
  const [calDayOffset, setCalDayOffset] = useState(0);
  const [expandedMember, setExpandedMember] = useState<string | null>('part');
  const [activePlanningMeal, setActivePlanningMeal] = useState<string | null>(null);
  const [mealCourseTab, setMealCourseTab] = useState<MealCourse>('Entree');
  const [meals, setMeals] = useState<Record<string, string>>({
    '0:Breakfast': 'Pancakes & Fruit',
    '0:Dinner': 'Chicken Stir Fry',
  });
  const [events, setEvents] = useState<DemoEvent[]>([
    { id: 'e1', day: 0, title: 'Soccer Practice · 4:30 PM', color: '#10b981', allDay: false },
    { id: 'e2', day: 1, title: 'School Book Fair', color: '#f59e0b', allDay: true },
  ]);

  /* ---------- Derived ---------- */

  const calendarTaskGroups = HOUSEHOLD.map((member) => {
    const list = tasks.filter((t) => t.childId === member.id);
    return { member, list, completed: list.filter((t) => t.status === 'approved').length };
  }).filter((g) => g.list.length > 0);

  const calDate = new Date(DEMO_TODAY + calDayOffset * DAY_MS);
  const calLabel = calDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
  const calShortLabel = calDate.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC',
  });

  const activeEvents = events.filter((e) => e.day === calDayOffset);

  /* ---------- Handlers ---------- */
  const awardStars = (childId: string, delta: number) =>
    setStarBalances((prev) => ({ ...prev, [childId]: Math.max(0, (prev[childId] ?? 0) + delta) }));

  const handleToggleTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === 'pending') return;
    const next: TaskStatus = task.status === 'approved' ? 'open' : 'approved';
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));
    awardStars(task.childId, next === 'approved' ? task.stars : -task.stars);
    showToast(
      next === 'approved'
        ? `⭐ ${task.stars} stars awarded for "${task.title}"`
        : `Reopened "${task.title}" · ${task.stars} stars returned`
    );
  };

  const handleApproveTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'approved' } : t)));
    awardStars(task.childId, task.stars);
    const member = HOUSEHOLD.find((m) => m.id === task.childId);
    showToast(`⭐ Approved — ${member?.name ?? 'Child'} earned ${task.stars} stars`);
  };

  const handlePlanMeal = (slot: string, dish: string) => {
    setMeals((prev) => ({ ...prev, [`${calDayOffset}:${slot}`]: dish }));
    setActivePlanningMeal(null);
    showToast(`✓ ${slot} planned: ${dish}`);
  };

  const handleClearMeal = (slot: string) => {
    setMeals((prev) => {
      const next = { ...prev };
      delete next[`${calDayOffset}:${slot}`];
      return next;
    });
    showToast(`Cleared ${slot}`);
  };

  const handleAddEvent = () => {
    const idea = NEW_EVENT_IDEAS[events.length % NEW_EVENT_IDEAS.length];
    setEvents((prev) => [...prev, { id: `e${Date.now()}`, day: calDayOffset, ...idea }]);
    showToast(`✓ Added event "${idea.title}"`);
  };

  /* ---------- Net Worth chart ---------- */
  const [chartTab, setChartTab] = useState<ChartTab>('networth');
  const [timeframe, setTimeframe] = useState<Timeframe>('YTD');

  /** Everything the chart shows is derived from the active metric + timeframe. */
  const chart = useMemo(() => {
    const full = SERIES[chartTab];
    const count = Math.min(TIMEFRAME_POINTS[timeframe], full.length);
    const values = full.slice(full.length - count);
    const labels = MONTH_LABELS.slice(MONTH_LABELS.length - count);

    const latest = values[values.length - 1];
    const first = values[0];
    const deltaPct = first === 0 ? 0 : ((latest - first) / Math.abs(first)) * 100;

    // pad the range so the line never sits on the frame; anchor to 0 when values cross it
    const hi = Math.max(...values);
    const min = Math.min(...values, ...(values.some((v) => v < 0) ? [0] : []));
    const span = hi - min || Math.abs(hi) || 1;
    const padTop = min + span * 1.12;
    const padBottom = min - span * 0.06;
    const range = padTop - padBottom || 1;

    const W = 600;
    const H = 200;
    const L = 8; // Y labels are rendered as HTML beside the plot, not inside the SVG
    const R = 16;
    const T = 22;
    const B = 26;

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
    // for spending, a rise is the unwelcome direction
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
      floor: y(padBottom),
      stroke: good ? '#10b981' : '#e11d48',
    };
  }, [chartTab, timeframe]);

  /* ---------- Recent transactions ---------- */
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    { id: 't1', name: 'Netflix Subscription', date: 'Sep 2', account: 'Chase Checking', amount: '-$15.49', category: 'Category', posted: false },
    { id: 't2', name: 'Shell Gas Station', date: 'Sep 1', account: 'Chase Checking', amount: '-$52.10', category: 'Category', posted: false },
    { id: 't3', name: 'Acme Corp Payroll', date: 'Aug 31', account: 'Chase Checking', amount: '+$3,200.00', category: 'Category', posted: false },
    { id: 't4', name: 'Interest Payment', date: 'Aug 31', account: 'Chase Savings', amount: '+$14.76', category: 'Category', posted: false },
    { id: 't5', name: 'Whole Foods Market', date: 'Aug 30', account: 'Chase Checking', amount: '-$87.43', category: 'Category', posted: false },
  ]);

  const handlePostTransaction = (id: string, name: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, posted: true } : t)));
    showToast(`✓ Posted transaction: ${name}`);
  };

  const handleSelectCategory = (id: string, newCat: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, category: newCat } : t)));
    setOpenCategoryDropdown(null);
    showToast(`Category updated to "${newCat}"`);
  };

  /* ---------- Top utilized budgets ---------- */
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [hasCustomBudget, setHasCustomBudget] = useState(false);

  const handleRemoveEvent = (id: string, title: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast(`Removed event "${title}"`);
  };

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
    <div
      data-demo-shell
      className="relative w-full bg-[#f8fafc] text-slate-800 font-sans select-none flex flex-col md:flex-row min-h-[720px] overflow-hidden text-left border-t border-slate-200"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in duration-150">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Referral Dialog Modal */}
      {referralModalOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Share2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Invite Family & Friends</h4>
              </div>
              <button
                type="button"
                onClick={() => setReferralModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Give your friends 1 free month of First Savvy. You'll also receive $10 toward your family savings account for every active referral!
            </p>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value="https://app.firstsavvy.com/r/simon-lab-928"
                className="text-xs font-mono bg-transparent flex-1 text-slate-700 outline-none"
              />
              <button
                type="button"
                onClick={() => showToast('✓ Copied referral link to clipboard!')}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 cursor-pointer"
                title="Copy link"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setReferralModalOpen(false);
                showToast('✓ Referral invite sent!');
              }}
              className="w-full py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Share Referral Link
            </button>
          </div>
        </div>
      )}

      {/* Set Up Budget Modal */}
      {budgetModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#52A5CE]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Set Up Monthly Budget</h4>
              </div>
              <button
                type="button"
                onClick={() => setBudgetModalOpen(false)}
                aria-label="Close"
                className="shrink-0 cursor-pointer text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              AI automatically recommended limits based on your past spending history:
            </p>
            <div className="space-y-2 text-xs">
              {BUDGET_ROWS.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2"
                >
                  <span className="min-w-0 flex-1 break-words font-semibold text-slate-700">{b.name}</span>
                  <span className="shrink-0 whitespace-nowrap font-bold text-[#2c4a6b]">{money(b.budget)} / mo</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBudgetModalOpen(false)}
                className="min-h-[36px] cursor-pointer rounded-lg px-3 text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasCustomBudget(true);
                  setBudgetModalOpen(false);
                  showToast('✓ Monthly budget created successfully!');
                }}
                className="min-h-[36px] cursor-pointer rounded-lg bg-[#52A5CE] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#438fb6]"
              >
                Activate Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. LEFT SIDEBAR (Exact deep navy #2c4a6b from First Savvy Web App Layout.jsx) */}
      <aside
        className={`shrink-0 transition-all duration-300 flex flex-col border-r border-slate-700/40 text-white select-none ${
          sidebarCollapsed ? 'w-16' : 'w-48'
        }`}
        style={{ backgroundColor: '#2c4a6b' }}
      >
        {/* Logo Header — the brand mark from components/brand/FirstSavvyBrandLogo.tsx,
            full wordmark when open and the emblem alone when collapsed, as Layout.jsx does.
            Collapsed, the emblem IS the expand control: the previous version kept the
            wordmark mounted at 56px wide, which pushed the toggle outside the sidebar
            where the content area covered it, so the panel could not be reopened. */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-1 border-b border-slate-700/50 px-2">
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
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActiveNav(item.name);
                  showToast(`Selected ${item.name}`);
                }}
                className={`flex items-center w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1e3550] text-white shadow-xs font-semibold'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center px-1.5' : 'justify-start'}`}
                title={item.name}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${sidebarCollapsed ? 'mr-0' : 'mr-2.5'}`} />
                <span className={`truncate text-left text-[11px] ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f8fafc]">
        {/* Top Header Bar */}
        <header className="bg-white px-5 py-2.5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-normal">Welcome,</span>
            <span className="text-xs font-semibold text-slate-900">Simon Lab</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Referral Button */}
            <button
              type="button"
              onClick={() => setReferralModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[#0F766E] hover:bg-[#115E59] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>Referral</span>
            </button>

            {/* Search */}
            <button
              type="button"
              onClick={() => showToast('Search transactions, accounts, and tasks')}
              className="p-1 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => showToast('3 unread notifications')}
              className="relative p-1 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>

            {/* SL Avatar */}
            <div
              onClick={() => showToast('Profile • Simon Lab')}
              className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[11px] font-bold text-slate-700 cursor-pointer hover:ring-2 hover:ring-[#52A5CE]/50 transition-all"
            >
              SL
            </div>
          </div>
        </header>

        {/* Profile Tabs Bar (e.g. Simon John ✕ +) with prominent horizontal border line */}
        <div className="bg-white px-5 pt-2 border-b-2 border-slate-200 flex items-center gap-1 shrink-0 relative">
          <div className="flex items-center gap-2 px-4 py-1 bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl text-xs font-semibold text-slate-900 shadow-2xs -mb-[2px] pb-[calc(0.25rem+2px)]">
            <span>{activeProfileTab}</span>
            <button
              type="button"
              onClick={() => showToast('Closed tab')}
              className="text-slate-400 hover:text-slate-700 text-[10px] cursor-pointer"
            >
              ✕
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveProfileTab(activeProfileTab === 'Simon John' ? 'Emma (Child)' : 'Simon John');
              showToast(`Switched profile tab to ${activeProfileTab === 'Simon John' ? 'Emma' : 'Simon John'}`);
            }}
            className="p-1 text-slate-500 hover:text-slate-700 cursor-pointer"
            title="Add tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* History bar — back / forward / refresh, the row the app puts under the
            profile tabs. */}
        <div className="flex shrink-0 items-center gap-1 border-b border-slate-200 bg-white px-3 py-1">
          {([
            { icon: ArrowLeft, label: 'Back', msg: 'Went back' },
            { icon: ArrowRight, label: 'Forward', msg: 'Went forward' },
            { icon: RotateCw, label: 'Refresh', msg: 'Refreshed this view' },
          ] as const).map(({ icon: Icon, label, msg }) => (
            <button
              key={label}
              type="button"
              onClick={() => showToast(msg)}
              title={label}
              aria-label={label}
              className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Content area. Every sidebar item renders its own page — before this the nav
            only moved the highlight and left the Dashboard on screen. */}
        <div className="p-4 sm:p-5 flex-1">
          {activeNav !== 'Dashboard' ? (
            <DemoAppPage nav={activeNav} onAction={showToast} />
          ) : (
          /* Dashboard body, laid out as the app's own dashboard: a wide left column
             carrying the net-worth chart over Recent Transactions / Top Utilized Budgets
             and then Goals / Task Manager, with Credit Score, Household and Calendar
             stacked in a fixed rail on the right. */
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* ============ LEFT COLUMN ============ */}
            <div data-dash-main className="flex-1 min-w-0 w-full space-y-4">
              {/* TOP: Net Worth chart */}
              <div data-dash-chart className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  {/* §9: the four metric labels are wider than a 320px viewport, so the
                      row scrolls instead of pushing the card past the shell edge */}
                  <div className="max-w-full overflow-x-auto no-scrollbar">
                    <div className="inline-flex min-w-max items-center gap-1 rounded-lg border border-slate-200/60 bg-slate-100 p-0.5">
                      {(Object.keys(TAB_LABELS) as ChartTab[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setChartTab(t)}
                          aria-pressed={chartTab === t}
                          className={`inline-flex min-h-[36px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-md px-3 text-xs font-medium transition-all ${
                            chartTab === t ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {TAB_LABELS[t]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`Opening ${TAB_LABELS[chartTab]} details`)}
                    className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-lg px-2 text-xs font-semibold text-[#52A5CE] hover:bg-sky-50 hover:text-[#388bb4]"
                  >
                    View details →
                  </button>
                </div>

                {/* Balance & trend */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="whitespace-nowrap text-xl font-bold tabular-nums text-slate-900 sm:text-2xl">
                    {money(chart.latest)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold ${
                      chart.good ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {chart.rising ? '↑' : '↓'} {chart.deltaPct >= 0 ? '+' : ''}
                    {chart.deltaPct.toFixed(1)}% from last month
                  </span>
                </div>

                {/* The SVG carries only geometry: it is stretched with
                    preserveAspectRatio="none", which would distort any text inside it,
                    so both axes are HTML positioned around the plot. */}
                <div className="mt-3 flex gap-2">
                  <div className="relative w-11 shrink-0 sm:w-14">
                    {chart.ticks.map((t) => (
                      <span
                        key={t.v}
                        className="absolute right-0 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium tabular-nums text-slate-400"
                        style={{ top: `${(t.y / chart.H) * 100}%` }}
                      >
                        {compact(t.v, chart.range)}
                      </span>
                    ))}
                    <div className="h-40 sm:h-48" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <svg
                      viewBox={`0 0 ${chart.W} ${chart.H}`}
                      preserveAspectRatio="none"
                      className="h-40 w-full sm:h-48"
                      role="img"
                      aria-label={`${TAB_LABELS[chartTab]} over ${timeframe}`}
                    >
                      <defs>
                        <linearGradient id="demoChartFill" x1="0" y1="0" x2="0" y2="1">
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
                      <path d={chart.area} fill="url(#demoChartFill)" />
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

                    {/* X labels share the data window, so they cannot drift out of step */}
                    <div className="mt-1 flex justify-between">
                      {chart.labels.map((l) => (
                        <span key={l} className="text-[10px] font-medium text-slate-400">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeframe pills */}
                <div className="-mx-4 mt-3 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
                  <div className="inline-flex min-w-max items-center gap-1">
                    {TIMEFRAMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeframe(t)}
                        aria-pressed={timeframe === t}
                        className={`inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-full px-3 text-xs font-semibold transition-colors ${
                          timeframe === t ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Recent Transactions · Top Utilized Budgets */}
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
                  <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Recent Transactions
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveNav('Banking')}
                      className="cursor-pointer text-xs font-semibold text-[#52A5CE] hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {transactions.map((t) => (
                      <div key={t.id} className="rounded-lg px-1.5 py-1.5 hover:bg-slate-50">
                        {/* Line 1 — description takes the row; the amount never wraps */}
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-slate-800 line-clamp-2">
                            {t.name}
                          </span>
                          <span className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${amountClass(t.amount)}`}>
                            {t.amount}
                          </span>
                        </div>
                        {/* Line 2 — the meta gets the full row; sharing it with the two
                            controls squeezed the date to "Sep …" in this column */}
                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {t.date} · {t.account}
                        </p>
                        {/* Line 3 — category and post, right-aligned */}
                        <div className="mt-1 flex flex-wrap items-center justify-end gap-1.5">
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() => setOpenCategoryDropdown(openCategoryDropdown === t.id ? null : t.id)}
                              aria-expanded={openCategoryDropdown === t.id}
                              className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded border border-slate-300 px-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                            >
                              <span className="max-w-[74px] truncate">{t.category}</span>
                              <ChevronDown className="h-3 w-3 shrink-0" />
                            </button>
                            {openCategoryDropdown === t.id && (
                              <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                                {['Groceries', 'Housing', 'Transportation', 'Entertainment', 'Income'].map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => handleSelectCategory(t.id, c)}
                                    className="block min-h-[36px] w-full cursor-pointer px-3 text-left text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {t.posted ? (
                            <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              Posted
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePostTransaction(t.id, t.name)}
                              className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded bg-[#52A5CE] px-2.5 text-[10px] font-bold text-white hover:bg-[#438fb6]"
                            >
                              Post
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
                  <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Top Utilized Budgets
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveNav('Budgeting')}
                      className="cursor-pointer text-xs font-semibold text-[#52A5CE] hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  {hasCustomBudget ? (
                    <div className="space-y-3">
                      {BUDGET_ROWS.map((b) => {
                        const pct = Math.round((b.spent / b.budget) * 100);
                        const over = pct > 100;
                        return (
                          <div key={b.id}>
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-slate-800 line-clamp-2">
                                {b.name}
                              </span>
                              <span
                                className={`shrink-0 whitespace-nowrap text-[10px] font-bold tabular-nums ${over ? 'text-red-600' : 'text-slate-500'}`}
                              >
                                {money(b.spent)} / {money(b.budget)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${over ? 'bg-red-500' : 'bg-[#52A5CE]'}`}
                                  style={{ width: `${Math.min(100, pct)}%` }}
                                />
                              </div>
                              <span
                                className={`shrink-0 whitespace-nowrap text-[10px] font-bold tabular-nums ${over ? 'text-red-600' : 'text-slate-500'}`}
                              >
                                {pct}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => {
                          setHasCustomBudget(false);
                          showToast('Budget removed');
                        }}
                        className="cursor-pointer text-[11px] font-semibold text-slate-500 hover:underline"
                      >
                        Reset budget
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#52A5CE]">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">No Budget Yet</h4>
                      <p className="mx-auto mt-1 max-w-[220px] text-xs text-slate-500">
                        Create a budget from your spending history
                      </p>
                      <button
                        type="button"
                        onClick={() => setBudgetModalOpen(true)}
                        className="mt-4 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#52A5CE] px-4 text-sm font-bold text-white shadow-2xs hover:bg-[#438fb6]"
                      >
                        <Sparkles className="h-4 w-4" />
                        Set Up Budget
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* ============ RIGHT RAIL ============ */}
            <div data-dash-rail className="w-full lg:w-[330px] xl:w-[340px] shrink-0 space-y-4">
              {/* Card 1: Credit Score */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Credit Score
                </span>
                <div className="flex flex-col items-center justify-center space-y-2 py-3 text-center">
                  <div className="flex h-16 w-full items-center justify-center rounded-2xl bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-[#52A5CE]">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-slate-900">Coming Soon</h4>
                  <p className="max-w-[210px] text-xs leading-relaxed text-slate-500">
                    Credit score monitoring via API integration is on the way
                  </p>
                </div>
              </div>
              {/* 2. Household — components/dashboard/FamilyConnectionsCard.jsx */}
              <div className="space-y-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">HOUSEHOLD</span>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {HOUSEHOLD.length} members
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Opening all household profiles')}
                    className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg px-2 text-xs font-semibold text-[#52A5CE] hover:bg-sky-50 hover:text-[#388bb4]"
                  >
                    View all →
                  </button>
                </div>

                <div className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 py-1 no-scrollbar sm:-mx-5 sm:px-5">
                  {HOUSEHOLD.map((m) => {
                    const pending = tasks.filter((t) => t.childId === m.id && t.status === 'pending').length;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => showToast(`Opening ${m.name}'s parental view · ${starBalances[m.id]} stars`)}
                        title={`${m.name} — ${starBalances[m.id]} Stars (Click to open parental view)`}
                        className="group flex shrink-0 cursor-pointer flex-col items-center gap-1.5 transition-transform active:scale-95"
                      >
                        <div className="relative">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 text-sm font-bold text-white transition-all group-hover:border-[#52A5CE] group-hover:shadow-md"
                            style={{ backgroundColor: m.color }}
                          >
                            {m.initials}
                          </div>
                          {pending > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-amber-500 shadow-xs">
                              <Bell className="h-2.5 w-2.5 text-white" />
                            </span>
                          )}
                        </div>
                        <span className="max-w-[68px] truncate text-center text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-[#52A5CE]">
                          {m.name}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => showToast('Opening the add family member form')}
                    title="Add Family Member"
                    aria-label="Add family member"
                    className="group flex shrink-0 cursor-pointer flex-col items-center gap-1.5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-slate-200 text-slate-400 transition-all group-hover:border-[#52A5CE] group-hover:bg-sky-50/50 group-hover:text-[#52A5CE]">
                      <span className="text-xl font-light leading-none">+</span>
                    </div>
                    <span className="mt-1 text-[11px] font-semibold text-slate-400 transition-colors group-hover:text-[#52A5CE]">
                      Add
                    </span>
                  </button>
                </div>
              </div>
              {/* 3. Calendar — Meals → Events → Tasks, in series, as Dashboard.jsx renders it */}
              <div className="flex min-h-[360px] flex-col justify-start space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                {/* Header: title · date switcher · view all.
                    Breakpoints track the CARD's width, not the viewport's. From lg this
                    card lives in the 5-of-12 column, which the shell caps at ~390px no
                    matter how wide the window gets — too narrow for one row — so it
                    stacks from lg upward and only sits on one row at sm–md, where the
                    column is still full width. */}
                <div className="flex flex-col gap-2.5 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
                  <div className="flex w-full items-center justify-between sm:w-auto lg:w-full">
                    <div className="flex shrink-0 items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5 text-[#52A5CE]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">CALENDAR</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveNav('Calendar')}
                      className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg px-2 text-xs font-semibold text-[#52A5CE] hover:bg-sky-50 hover:text-[#388bb4] sm:hidden lg:inline-flex"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="flex w-full items-center justify-between gap-1 whitespace-nowrap rounded-xl border border-slate-200/80 bg-slate-50 px-2 py-1 sm:w-auto sm:shrink-0 sm:justify-center sm:gap-2 lg:w-full">
                    <button
                      type="button"
                      onClick={() => { setCalDayOffset((d) => d - 1); setActivePlanningMeal(null); }}
                      title="Previous Day"
                      aria-label="Previous day"
                      className="inline-flex min-h-[36px] min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-slate-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap px-1.5">
                      {/* "Friday, Sep 5, 2025" does not fit a 320px card next to both
                          chevrons and the Today pill, so the narrowest size gets the
                          short form the rest of this card already uses. */}
                      <span className="whitespace-nowrap text-xs font-semibold text-slate-700 sm:hidden">{calShortLabel}</span>
                      <span className="hidden whitespace-nowrap text-xs font-semibold text-slate-700 sm:inline">{calLabel}</span>
                      {calDayOffset === 0 && (
                        <span className="whitespace-nowrap rounded-full bg-[#52A5CE]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#52A5CE]">
                          Today
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setCalDayOffset((d) => d + 1); setActivePlanningMeal(null); }}
                      title="Next Day"
                      aria-label="Next day"
                      className="inline-flex min-h-[36px] min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-slate-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveNav('Calendar')}
                    className="hidden min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg px-2 text-xs font-semibold text-[#52A5CE] hover:bg-sky-50 hover:text-[#388bb4] sm:inline-flex lg:hidden"
                  >
                    View all →
                  </button>
                </div>

                {activePlanningMeal ? (
                  /* Inline meal planner */
                  <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-slate-50/30 p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {activePlanningMeal.toUpperCase()} · {calShortLabel.toUpperCase()}
                        </p>
                        <h3 className="mt-0.5 text-sm font-semibold leading-tight text-slate-800">Plan this meal</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActivePlanningMeal(null)}
                        title="Close"
                        aria-label="Close meal planner"
                        className="inline-flex min-h-[36px] min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="-mx-3.5 overflow-x-auto px-3.5 no-scrollbar">
                      <div className="inline-flex min-w-max rounded-lg border border-slate-200/60 bg-slate-100 p-0.5">
                        {(['Entree', 'Side', 'Versatile'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setMealCourseTab(t)}
                            className={`inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-md px-3 text-xs font-semibold transition-all ${
                              mealCourseTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {MEAL_OPTIONS[mealCourseTab].map((dish) => (
                        <button
                          key={dish}
                          type="button"
                          onClick={() => handlePlanMeal(activePlanningMeal, dish)}
                          className="flex min-h-[36px] w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-left shadow-2xs transition hover:border-[#52A5CE] hover:bg-sky-50/40"
                        >
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">{dish}</span>
                          <span className="shrink-0 text-[10px] font-semibold text-[#52A5CE]">Add →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* 1. Meals */}
                    <div className="space-y-2">
                      <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <Utensils className="h-3.5 w-3.5 text-[#f59e0b]" />
                          <span>Meals</span>
                        </span>
                        <span className="text-[10px] font-medium text-[#52A5CE]">Plan</span>
                      </div>

                      {/* Same card-width story as the header above: three across only
                          at sm–md, where this card still spans the full width and the
                          dish names are readable. */}
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
                        {(['Breakfast', 'Lunch', 'Dinner'] as const).map((slot) => {
                          const planned = meals[`${calDayOffset}:${slot}`];
                          return (
                            <div
                              key={slot}
                              className="group relative flex items-center justify-between gap-1 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-left shadow-2xs transition hover:border-slate-300 hover:bg-slate-50/50"
                            >
                              <button
                                type="button"
                                onClick={() => { setActivePlanningMeal(slot); setMealCourseTab('Entree'); }}
                                className="min-h-[36px] min-w-0 flex-1 cursor-pointer pr-1 text-left"
                              >
                                <span className="block text-xs font-semibold leading-tight text-slate-700">{slot}</span>
                                <span className="mt-0.5 block truncate text-[10px] font-normal italic text-slate-400">
                                  {planned || 'Not planned'}
                                </span>
                              </button>
                              <span className="flex shrink-0 items-center gap-1">
                                {planned && (
                                  <button
                                    type="button"
                                    onClick={() => handleClearMeal(slot)}
                                    title={`Remove ${slot}`}
                                    aria-label={`Remove ${slot}`}
                                    className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400 shadow-xs transition hover:bg-red-500 hover:text-white"
                                  >
                                    ✕
                                  </button>
                                )}
                                <span className="whitespace-nowrap text-[10px] font-medium text-[#52A5CE] group-hover:underline">
                                  Plan →
                                </span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Events */}
                    <div className="space-y-2 border-t border-slate-100 pt-2">
                      <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3.5 w-3.5 text-[#10b981]" />
                          <span>Events</span>
                        </span>
                        {activeEvents.length > 0 ? (
                          <span className="rounded-full border border-slate-200/50 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
                            {activeEvents.length}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAddEvent}
                            aria-label="Add event"
                            className="cursor-pointer text-[10px] font-medium text-[#10b981] hover:underline"
                          >
                            + Add
                          </button>
                        )}
                      </div>

                      <div className="py-0.5">
                        {activeEvents.length === 0 ? (
                          <button
                            type="button"
                            onClick={handleAddEvent}
                            className="min-h-[36px] w-full cursor-pointer px-1 py-2 text-left text-[11px] font-normal italic text-slate-400 transition hover:text-slate-600"
                          >
                            No events scheduled for this day
                          </button>
                        ) : (
                          <div className="space-y-1.5">
                            {activeEvents.map((ev) => (
                              <div
                                key={ev.id}
                                className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white p-2 shadow-2xs transition hover:bg-slate-50"
                              >
                                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: ev.color }} />
                                <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-700">{ev.title}</span>
                                {ev.allDay && (
                                  <span className="shrink-0 whitespace-nowrap rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-600">
                                    All day
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveEvent(ev.id, ev.title)}
                                  title="Remove event"
                                  aria-label={`Remove ${ev.title}`}
                                  className="inline-flex min-h-[36px] min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3. Tasks — components/dashboard/CalendarTasksList.jsx */}
                    <div className="space-y-2 border-t border-slate-100 pt-2">
                      <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <CheckSquare className="h-3.5 w-3.5 text-[#0D9488]" />
                          <span>Tasks</span>
                        </span>
                        {tasks.length > 0 && (
                          <span className="whitespace-nowrap rounded-full border border-slate-200/50 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
                            {tasks.length} due
                          </span>
                        )}
                      </div>

                      {calendarTaskGroups.length === 0 ? (
                        <p className="px-1 py-1 text-[11px] font-normal italic text-slate-400">
                          No tasks scheduled for this day
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {calendarTaskGroups.map(({ member, list, completed }) => {
                            const open = expandedMember === member.id;
                            return (
                              <div
                                key={member.id}
                                className={`overflow-hidden rounded-xl border bg-white shadow-2xs transition-all ${
                                  open ? 'border-teal-200' : 'border-slate-200/80'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => setExpandedMember(open ? null : member.id)}
                                  aria-expanded={open}
                                  className="flex min-h-[44px] w-full cursor-pointer select-none items-center justify-between gap-2 p-2.5 text-left transition hover:bg-slate-50/50"
                                >
                                  <span className="flex min-w-0 items-center gap-2.5">
                                    <span
                                      className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full text-[10px] font-semibold text-white shadow-2xs"
                                      style={{ backgroundColor: member.color }}
                                    >
                                      {member.initials}
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block truncate text-xs font-semibold leading-tight text-slate-800">
                                        {member.name}
                                      </span>
                                      <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-emerald-600">
                                        {completed}/{list.length} completed
                                      </span>
                                    </span>
                                  </span>
                                  {open ? (
                                    <ChevronUp className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                  ) : (
                                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                  )}
                                </button>

                                {open && (
                                  <div className="divide-y divide-slate-100 border-t border-slate-100 bg-slate-50/30">
                                    {list.map((task) => (
                                      <div
                                        key={task.id}
                                        className="flex items-center justify-between gap-2.5 bg-white p-2.5 transition hover:bg-slate-50/50"
                                      >
                                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                                          <span className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-lg border border-teal-100 bg-teal-50">
                                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                          </span>
                                          <span className="min-w-0 flex-1">
                                            <span
                                              className={`block truncate text-xs font-medium leading-none ${
                                                task.status === 'approved' ? 'text-slate-400 line-through' : 'text-slate-700'
                                              }`}
                                            >
                                              {task.title}
                                            </span>
                                            <span className="mt-1 block select-none whitespace-nowrap text-[10px] font-semibold text-amber-600">
                                              +{task.stars} {task.stars === 1 ? 'star' : 'stars'}
                                            </span>
                                          </span>
                                        </div>

                                        <div className="shrink-0">
                                          {task.status === 'approved' ? (
                                            <span className="select-none whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                              Approved
                                            </span>
                                          ) : task.status === 'pending' ? (
                                            <button
                                              type="button"
                                              onClick={() => handleApproveTask(task.id)}
                                              className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg border border-amber-200 bg-amber-50 px-2 text-[10px] font-bold text-amber-600 transition hover:bg-amber-100"
                                            >
                                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                              <span>Award</span>
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() => handleToggleTask(task.id)}
                                              className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-bold text-slate-500 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                            >
                                              <Check className="h-3 w-3" />
                                              <span>Mark done</span>
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
