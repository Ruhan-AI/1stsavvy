'use client';

import React from 'react';
import {
  CircleDollarSign,
  ClipboardList,
  PiggyBank,
  Calendar as CalendarIcon,
  CreditCard,
  Banknote,
  TrendingUp,
  Users,
  Cable,
  Lock,
  SlidersHorizontal,
  Bell,
  Plus,
  Search,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Utensils,
  CheckSquare,
  Pencil,
  RotateCw,
  RotateCcw,
  Trash2,
  Info,
  Clock,
  FileText,
  BookOpen,
  X,
} from 'lucide-react';

/**
 * The non-Dashboard pages of the interactive demo.
 *
 * Each view mirrors the corresponding page in `First Savvy - Web App/src/pages` — the same
 * tab sets, the same section headings, the same empty-state copy. Where the real product
 * ships a placeholder (Credit Score, Goals & Savings) this reproduces that placeholder
 * rather than inventing a screen the product does not have.
 */

type Props = { nav: string; onAction: (msg: string) => void };

/**
 * Colour a money string by its sign, the way the real app does
 * (`RecentTransactionsCard.jsx`: expense red, income green). Deriving it from the value
 * rather than a flag means a negative can never render black by mistake.
 */
export function amountClass(value: string) {
  const v = value.trim();
  if (v.startsWith('-')) return 'text-red-600';
  if (v.startsWith('+')) return 'text-emerald-600';
  return 'text-slate-900';
}

const card = 'bg-white rounded-xl border border-slate-200 shadow-2xs';
const chip =
  'inline-flex items-center justify-center shrink-0 min-h-[36px] px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer';
const field =
  'min-h-[36px] w-full min-w-0 rounded-lg border border-slate-300 px-2.5 text-base sm:text-xs text-slate-800 focus:border-[#52A5CE] focus:outline-none';
const ghostBtn =
  'inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer';
const smallBtn =
  'shrink-0 rounded border border-slate-300 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:bg-slate-100 cursor-pointer';

const money2 = (n: number) =>
  (n < 0 ? '-' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const redirectToSignup = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/signup';
  }
};

function PageHeader({
  icon: Icon,
  title,
  subtitle,
  action,
  onAction,
  secondary,
  onSecondary,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: string;
  onAction?: () => void;
  secondary?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#52A5CE]/10 text-[#52A5CE]">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="break-words text-xs text-slate-500 line-clamp-2">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {secondary && (
          <button type="button" onClick={redirectToSignup} className={ghostBtn}>
            <Pencil className="h-3.5 w-3.5 text-slate-700" />
            <span className="whitespace-nowrap">{secondary}</span>
          </button>
        )}
        {action && (
          <button
            type="button"
            onClick={redirectToSignup}
            className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-[#52A5CE] px-3 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#438fb6]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">{action}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/** The tab strip `PageTabs` draws on every tabbed page in the real app. */
function TabBar<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (t: T) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
      <div className="inline-flex min-w-max gap-1 rounded-lg border border-slate-200/60 bg-slate-100 p-0.5">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            aria-pressed={value === t}
            className={`${chip} ${value === t ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/** The month stepper `PageTabs` renders as its `dynamicTabConfig` arrows control. */
function MonthStepper({ label, onPrev, onNext }: { label: string; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200/80 bg-slate-50 px-1.5 py-0.5">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous month"
        className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-800"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="whitespace-nowrap px-1 text-xs font-semibold text-slate-700">{label}</span>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next month"
        className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-800"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Panel({
  title,
  action,
  onAction,
  children,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`${card} space-y-2 p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
        {action && (
          <button
            type="button"
            onClick={redirectToSignup}
            className="cursor-pointer text-[11px] font-semibold text-[#52A5CE] hover:underline"
          >
            {action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/** Section heading used inside a tab, matching the real pages' `<h4 … uppercase>`. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-700">{children}</h4>;
}

function Row({ title, meta, value }: { title: string; meta: string; value: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={redirectToSignup}
      className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-left transition-colors hover:bg-slate-100"
    >
      {/* §8: at 320px these cards are too narrow to truncate without losing the label,
          so the text wraps there and only truncates once there is room */}
      <span className="min-w-0 flex-1">
        <span className="block break-words text-[11px] font-semibold text-slate-800 line-clamp-2 group-hover:text-[#52A5CE] sm:truncate sm:line-clamp-none">
          {title}
        </span>
        <span className="block break-words text-[11px] text-slate-400 line-clamp-2 sm:truncate sm:line-clamp-none">
          {meta}
        </span>
      </span>
      <span className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${amountClass(value)}`}>
        {value}
      </span>
    </button>
  );
}

/** A plain (non-clickable) version of Row, for lists whose action lives in a button. */
function StaticRow({
  title,
  meta,
  value,
  children,
}: {
  title: string;
  meta?: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2">
      <span className="min-w-0 flex-1">
        <span className="block break-words text-[11px] font-semibold text-slate-800 line-clamp-2">{title}</span>
        {meta && <span className="block break-words text-[11px] text-slate-400 line-clamp-2">{meta}</span>}
      </span>
      {value && (
        <span className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${amountClass(value)}`}>
          {value}
        </span>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Placeholder pages — copy taken verbatim from the real pages so the
 * demo never promises more than the product ships.
 * ------------------------------------------------------------------ */

/** `src/pages/CreditScore.jsx` and `src/pages/EstatePlanning.jsx` share this shape. */
function NotifyPlaceholder({ icon: Icon, tint, body }: { icon: React.ElementType; tint: string; body: string }) {
  return (
    <div className={`${card} mx-auto max-w-md p-8 text-center`}>
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${tint}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">Coming Soon</h2>
      <p className="mx-auto mb-6 max-w-md text-sm text-slate-500">{body}</p>
      <button
        type="button"
        onClick={redirectToSignup}
        className="inline-flex min-h-[36px] cursor-pointer items-center gap-2 rounded-lg bg-[#52A5CE] px-4 text-xs font-bold text-white shadow-2xs hover:bg-[#438fb6]"
      >
        <Bell className="h-3.5 w-3.5" />
        Sign Up to Get Notified
      </button>
    </div>
  );
}

/** `src/pages/Goals.jsx` — a centred icon, the page name, and "Coming Soon". Nothing else. */
function GoalsPage() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-slate-200 p-6">
            <PiggyBank className="h-12 w-12 text-slate-400 sm:h-16 sm:w-16" />
          </div>
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-slate-800 sm:text-3xl">Goals &amp; Savings</h1>
        <p className="text-lg text-slate-500 sm:text-xl">Coming Soon</p>
        <button
          type="button"
          onClick={redirectToSignup}
          className="mt-4 inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-xl bg-[#52A5CE] px-5 text-sm font-bold text-white shadow-xs hover:bg-[#438fb6]"
        >
          Sign Up to Unlock
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Router
 * ------------------------------------------------------------------ */

export function DemoAppPage({ nav }: Props) {
  const onAction = redirectToSignup;
  switch (nav) {
    case 'Banking':
      return <BankingPage onAction={onAction} />;
    case 'Budgeting':
      return <BudgetingPage onAction={onAction} />;
    case 'Goals & Savings':
      return <GoalsPage />;
    case 'Calendar':
      return <CalendarPage onAction={onAction} />;
    case 'Credit Score':
      return (
        <NotifyPlaceholder
          icon={CreditCard}
          tint="bg-[#52A5CE]/20 text-[#52A5CE]"
          body="Credit Score tracking is currently under development. Sign up to get early access as soon as it launches."
        />
      );
    case 'Net Worth':
      return <NetWorthPage onAction={onAction} />;
    case 'Investments':
      return <InvestmentsPage onAction={onAction} />;
    case 'Contacts':
      return <ContactsPage onAction={onAction} />;
    case 'Integrations':
      return <IntegrationsPage onAction={onAction} />;
    case 'Password Vault':
      return <VaultPage onAction={onAction} />;
    case 'Profile Settings':
      return <SettingsPage onAction={onAction} />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ *
 * Banking — `src/pages/Banking.jsx`
 * Tabs: spending (default) · transactions · rules · recurring · accounts
 * ------------------------------------------------------------------ */

type Account = {
  id: string;
  code: string;
  name: string;
  cls: 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
  type: string;
  detail: string;
  owner: string;
  /** null where the account is not bank-linked, which the table prints as an em dash */
  savvy: number | null;
  bank: number;
  institution: string;
  last4: string;
  pending: number;
};
type Txn = { id: string; name: string; cat: string; when: string; amount: number; accountId: string; posted: boolean };
type Rule = { id: string; match: string; category: string; on: boolean };
type Recurring = { id: string; name: string; next: string; amount: number; paused: boolean };

const BANK_TABS = ['Spending', 'Transactions', 'Rules', 'Recurring', 'Accounts'] as const;
const ACCOUNT_SCOPES = ['All Accounts', 'Assets, Liabilities & Equity', 'Income & Expenses'] as const;
const REGISTER_TABS = ['Register', 'Audit History'] as const;
const MONTHS = ['May 2025', 'June 2025', 'July 2025', 'August 2025', 'September 2025'];

const CLASS_TINT: Record<string, string> = {
  Asset: '#52A5CE',
  Liability: '#e11d48',
  Equity: '#64748b',
  Expense: '#f59e0b',
  Income: '#10b981',
};

const CAT_COLOR: Record<string, string> = {
  Groceries: '#52A5CE',
  Housing: '#8b5cf6',
  Transportation: '#f59e0b',
  Entertainment: '#ec4899',
};

const AUDIT_TRAIL = [
  { ref: 'AU-0003', what: 'Bank balance refreshed from Plaid', when: 'Sep 4, 2026', who: 'System' },
  { ref: 'AU-0002', what: 'Account nickname changed to "Demo Checking"', when: 'Aug 31, 2026', who: 'Demo Admin' },
  { ref: 'AU-0001', what: 'Account linked through Plaid', when: 'Aug 31, 2026', who: 'Demo Admin' },
];

const SEED_ACCOUNTS: Account[] = [
  { id: 'a1', code: '1100', name: 'Demo Checking', cls: 'Asset', type: 'Bank Account', detail: 'Checking', owner: 'Both', savvy: 5000, bank: 5000, institution: 'Premier National Bank', last4: '1001', pending: 0 },
  { id: 'a2', code: '1200', name: 'Demo High-Yield Savings', cls: 'Asset', type: 'Bank Account', detail: 'Savings', owner: 'Both', savvy: 15000, bank: 15000, institution: 'Premier National Bank', last4: '2002', pending: 0 },
  { id: 'a3', code: '2100', name: 'Demo Rewards Credit Card', cls: 'Liability', type: 'Credit Card', detail: 'Credit Card', owner: 'Both', savvy: -1250, bank: -1250, institution: 'Premier National Bank', last4: '3003', pending: 0 },
  { id: 'a4', code: '3000', name: 'Opening Balance', cls: 'Equity', type: 'Equity', detail: 'Opening Balance', owner: 'Both', savvy: null, bank: 0, institution: '—', last4: '——', pending: 0 },
  { id: 'a5', code: '6100', name: 'Allowances', cls: 'Expense', type: 'Personal Expense', detail: 'Family & Lifestyle', owner: 'Both', savvy: null, bank: 0, institution: '—', last4: '——', pending: 0 },
];

function BankingPage({ onAction }: { onAction: (m: string) => void }) {
  const [tab, setTab] = React.useState<(typeof BANK_TABS)[number]>('Spending');
  const [monthIdx, setMonthIdx] = React.useState(MONTHS.length - 1);
  const [accounts, setAccounts] = React.useState<Account[]>(SEED_ACCOUNTS);
  const [txns, setTxns] = React.useState<Txn[]>([
    { id: 't1', name: 'Supermarket Groceries', cat: 'Groceries', when: 'Yesterday', amount: -125.5, accountId: 'a1', posted: false },
    { id: 't2', name: 'Monthly Salary Deposit', cat: 'Income', when: 'Aug 22', amount: 4500, accountId: 'a1', posted: true },
    { id: 't3', name: 'Home Mortgage Escrow', cat: 'Housing', when: 'Aug 18', amount: -1850, accountId: 'a1', posted: false },
    { id: 't4', name: 'Savings Interest Payment', cat: 'Income', when: 'Aug 31', amount: 15.00, accountId: 'a2', posted: true },
    { id: 't5', name: 'EV Charging Station', cat: 'Transportation', when: 'Aug 19', amount: -22.0, accountId: 'a3', posted: false },
    { id: 't6', name: 'Streaming Subscription', cat: 'Entertainment', when: 'Aug 15', amount: -14.99, accountId: 'a1', posted: true },
    { id: 't7', name: 'Local Farmers Market', cat: 'Groceries', when: 'Aug 12', amount: -65.0, accountId: 'a1', posted: true },
  ]);
  const [rules, setRules] = React.useState<Rule[]>([
    { id: 'r1', match: 'Description contains "Supermarket"', category: 'Groceries', on: true },
    { id: 'r2', match: 'Description contains "Charging"', category: 'Transportation', on: true },
    { id: 'r3', match: 'Amount > $1,500 and recurring', category: 'Housing', on: false },
  ]);
  const [recurring, setRecurring] = React.useState<Recurring[]>([
    { id: 'p1', name: 'Home Mortgage Escrow', next: 'Sep 18', amount: -1850, paused: false },
    { id: 'p2', name: 'Streaming Subscription', next: 'Sep 22', amount: -14.99, paused: false },
    { id: 'p3', name: 'Monthly Salary Deposit', next: 'Sep 30', amount: 4500, paused: false },
  ]);

  const [filterAccount, setFilterAccount] = React.useState<string | null>(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', type: 'Checking', balance: '' });

  const signed = (n: number) =>
    (n < 0 ? '-' : '+') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const [scope, setScope] = React.useState<(typeof ACCOUNT_SCOPES)[number]>('All Accounts');
  const [registerId, setRegisterId] = React.useState<string | null>(null);
  const [regTab, setRegTab] = React.useState<(typeof REGISTER_TABS)[number]>('Register');
  const [regQuery, setRegQuery] = React.useState('');

  const scopedAccounts = accounts.filter((a) =>
    scope === 'All Accounts'
      ? true
      : scope === 'Assets, Liabilities & Equity'
      ? ['Asset', 'Liability', 'Equity'].includes(a.cls)
      : ['Income', 'Expense'].includes(a.cls)
  );

  const register = accounts.find((a) => a.id === registerId) ?? null;

  /* The register opens on the account's own opening entry plus whatever the
     transaction list already holds for it, so the two views cannot disagree. */
  const registerRows = React.useMemo(() => {
    if (!register) return [];
    const q = regQuery.trim().toLowerCase();
    let balance = register.savvy ?? 0;
    const rows = [
      {
        date: 'Aug 31, 2026',
        ref: 'JE-0001',
        desc: 'Opening balance',
        cat: register.name,
        contact: '—',
        amount: balance,
        balance,
      },
    ];
    for (const t of txns.filter((x) => x.accountId === register.id)) {
      balance += t.amount;
      rows.push({ date: t.when, ref: 'JE-' + t.id.toUpperCase(), desc: t.name, cat: t.cat, contact: '—', amount: t.amount, balance });
    }
    return rows.filter((r) => !q || `${r.desc} ${r.cat} ${r.ref}`.toLowerCase().includes(q));
  }, [register, regQuery, txns]);

  const shown = filterAccount ? txns.filter((t) => t.accountId === filterAccount) : txns;

  /* Spending tab — the real page draws a chart plus a category donut over the same
     transactions the table below lists, so derive all three from one source. */
  const spending = React.useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of txns) if (t.amount < 0) out[t.cat] = (out[t.cat] ?? 0) + Math.abs(t.amount);
    const rows = Object.keys(out)
      .map((cat) => ({ cat, v: out[cat] }))
      .sort((a, b) => b.v - a.v);
    const sum = rows.reduce((s, r) => s + r.v, 0) || 1;
    const income = txns.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    return { rows, sum, income };
  }, [txns]);

  const addAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    const bal = Number(form.balance) || 0;
    setAccounts((prev) => [
      ...prev,
      {
        id: 'a' + Date.now(),
        code: String(1100 + prev.length * 100),
        name,
        cls: form.type === 'Credit Card' ? 'Liability' : 'Asset',
        type: form.type === 'Credit Card' ? 'Credit Card' : form.type === 'Brokerage' ? 'Investment' : 'Bank Account',
        detail: form.type,
        owner: 'Both',
        savvy: bal,
        bank: bal,
        institution: 'Manual',
        last4: '0000',
        pending: 0,
      },
    ]);
    setForm({ name: '', type: 'Checking', balance: '' });
    setAddOpen(false);
    onAction(`Added account "${name}"`);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={CircleDollarSign}
        title="Banking"
        subtitle="Spending, transactions, rules, recurring payments and accounts."
        action={addOpen ? 'Close' : tab === 'Accounts' ? 'Link Account' : 'Add Account'}
        onAction={redirectToSignup}
      />

      <div className="flex flex-wrap items-center gap-2">
        <TabBar tabs={BANK_TABS} value={tab} onChange={setTab} />
        {tab === 'Spending' && (
          <MonthStepper
            label={MONTHS[monthIdx]}
            onPrev={() => setMonthIdx((i) => Math.max(0, i - 1))}
            onNext={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
          />
        )}
      </div>

      {addOpen && (
        <form onSubmit={(e) => { e.preventDefault(); redirectToSignup(); }} className={`${card} grid grid-cols-1 gap-3 p-4 sm:grid-cols-4`}>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Account name</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Ally Online Savings"
              className={field}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Type</span>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={field}>
              {['Checking', 'Savings', 'Credit Card', 'Brokerage'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Balance</span>
            <div className="flex gap-2">
              <input
                value={form.balance}
                onChange={(e) => setForm({ ...form, balance: e.target.value })}
                inputMode="decimal"
                placeholder="0.00"
                className={field}
              />
              <button
                type="submit"
                className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg bg-[#52A5CE] px-3 text-xs font-bold text-white hover:bg-[#438fb6]"
              >
                Add
              </button>
            </div>
          </label>
        </form>
      )}

      {tab === 'Spending' && (
        <>
          <div className={`${card} p-4 sm:p-5`}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Spending · {MONTHS[monthIdx]}
                </p>
                <p className="mt-1 whitespace-nowrap text-2xl font-bold tabular-nums text-slate-900">
                  {money2(spending.sum)}
                </p>
              </div>
              <p className="whitespace-nowrap text-xs font-semibold text-emerald-600">{money2(spending.income)} in</p>
            </div>
            {/* the donut's job here is proportion, which a stacked bar does honestly at
                any width — a real donut needs a fixed square that 320px cannot give */}
            <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
              {spending.rows.map((r) => (
                <span
                  key={r.cat}
                  className="h-full"
                  style={{ width: `${(r.v / spending.sum) * 100}%`, backgroundColor: CAT_COLOR[r.cat] ?? '#94a3b8' }}
                  title={`${r.cat} ${money2(r.v)}`}
                />
              ))}
            </div>
          </div>

          <Panel title="Category Breakdown">
            {spending.rows.map((r) => (
              <div key={r.cat} className="rounded-lg bg-slate-50 px-2.5 py-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="flex min-w-0 flex-1 items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: CAT_COLOR[r.cat] ?? '#94a3b8' }}
                    />
                    <span className="min-w-0 break-words text-[11px] font-semibold text-slate-800 line-clamp-2">
                      {r.cat}
                    </span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums text-slate-900">
                    {money2(r.v)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(r.v / spending.sum) * 100}%`, backgroundColor: CAT_COLOR[r.cat] ?? '#94a3b8' }}
                    />
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums text-slate-500">
                    {Math.round((r.v / spending.sum) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </Panel>

          <Panel title="Transactions">
            {txns.map((t) => (
              <StaticRow key={t.id} title={t.name} meta={`${t.cat} • ${t.when}`} value={signed(t.amount)} />
            ))}
          </Panel>
        </>
      )}

      {tab === 'Transactions' && (
        <Panel
          title={filterAccount ? `Transactions · ${accounts.find((a) => a.id === filterAccount)?.name ?? ''}` : 'Transactions'}
          action={filterAccount ? 'Clear filter' : undefined}
          onAction={() => {
            setFilterAccount(null);
            onAction('Cleared the account filter');
          }}
        >
          {shown.map((t) => (
            <StaticRow key={t.id} title={t.name} meta={`${t.cat} • ${t.when}`} value={signed(t.amount)}>
              {t.posted ? (
                <span className="shrink-0 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  Posted
                </span>
              ) : (
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className={smallBtn}
                >
                  Post
                </button>
              )}
            </StaticRow>
          ))}
          {shown.length === 0 && (
            <p className="py-4 text-center text-xs text-slate-400">No transactions on this account.</p>
          )}
        </Panel>
      )}

      {tab === 'Rules' && (
        <Panel title="Categorisation Rules">
          {rules.map((r) => (
            <StaticRow key={r.id} title={r.match} meta={`Assigns to ${r.category}`}>
              <button
                type="button"
                onClick={redirectToSignup}
                className={`inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-full border px-3 text-[11px] font-bold ${
                  r.on ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}
              >
                {r.on ? 'Enabled' : 'Disabled'}
              </button>
            </StaticRow>
          ))}
        </Panel>
      )}

      {tab === 'Recurring' && (
        <Panel title="Recurring Payments">
          {recurring.map((p) => (
            <StaticRow key={p.id} title={p.name} meta={`Next ${p.next}`} value={signed(p.amount)}>
              <button
                type="button"
                onClick={redirectToSignup}
                className={smallBtn}
              >
                {p.paused ? 'Resume' : 'Pause'}
              </button>
            </StaticRow>
          ))}
        </Panel>
      )}

      {tab === 'Accounts' &&
        (register ? (
          /* Account register — what "View register" opens on a real account */
          <div className="space-y-4">
            <div className={`${card} space-y-3 p-4 sm:p-5`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{register.name}</h3>
                    <span className="shrink-0 whitespace-nowrap text-xs font-medium text-slate-400">#{register.code}</span>
                    {register.pending > 0 && (
                      <>
                        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                          <Info className="h-3 w-3" />
                          Needs review
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          <Clock className="h-3 w-3" />
                          {register.pending} pending
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 break-words text-[11px] text-slate-500">
                    Institution: <span className="font-semibold text-slate-700">{register.institution}</span>
                    {' · '}Acct: <span className="font-semibold text-slate-700">••••{register.last4}</span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" onClick={() => onAction(`Editing ${register.name}`)} className={ghostBtn}>
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="whitespace-nowrap">Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterId(null)}
                    aria-label="Close account register"
                    title="Close"
                    className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Savvy Balance</p>
                  <p className="mt-0.5 whitespace-nowrap text-2xl font-bold tabular-nums text-emerald-600">
                    {money2(register.savvy ?? 0)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-end gap-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Bank Balance</p>
                    <p className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-slate-900">
                      {money2(register.bank)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Difference</p>
                    <p className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-sm font-bold tabular-nums text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {money2(Math.abs(register.bank - (register.savvy ?? 0)))}
                    </p>
                  </div>
                </div>
              </div>

              {register.pending > 0 && (
                <p className="flex items-start gap-1.5 rounded-lg bg-amber-50/70 px-2.5 py-2 text-[11px] font-medium text-amber-800">
                  <Info className="mt-px h-3.5 w-3.5 shrink-0" />
                  {register.pending} pending transactions may explain the difference.
                </p>
              )}
            </div>

            <div className={`${card} space-y-3 p-4`}>
              <p className="text-sm font-bold text-slate-900">Account Register</p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <input
                    value={regQuery}
                    onChange={(e) => setRegQuery(e.target.value)}
                    placeholder="Search transactions..."
                    aria-label="Search transactions"
                    className="min-h-[36px] w-full min-w-0 bg-transparent text-base text-slate-800 focus:outline-none sm:text-xs"
                  />
                </div>
                <button type="button" onClick={() => onAction('Register filters opened')} className={ghostBtn}>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="whitespace-nowrap">Filters</span>
                </button>
              </div>

              <TabBar tabs={REGISTER_TABS} value={regTab} onChange={setRegTab} />

              {regTab === 'Register' ? (
                <>
                  {/* §8: seven columns cannot fit a phone, so the table scrolls in its own box */}
                  <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
                    <table className="w-full min-w-[700px] text-left">
                      <thead>
                        <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          {['Date', 'Reference', 'Description', 'Category', 'Contact'].map((h) => (
                            <th key={h} className="py-2 pr-3">
                              {h}
                            </th>
                          ))}
                          <th className="py-2 pr-3 text-right">Amount</th>
                          <th className="py-2 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {registerRows.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-6 text-center text-xs text-slate-400">
                              No entries match that search.
                            </td>
                          </tr>
                        ) : (
                          registerRows.map((r) => (
                            <tr key={r.ref} className="text-[11px] text-slate-700">
                              <td className="whitespace-nowrap py-2 pr-3 text-slate-500">{r.date}</td>
                              <td className="whitespace-nowrap py-2 pr-3 font-mono text-slate-400">{r.ref}</td>
                              <td className="py-2 pr-3 font-semibold text-slate-800">{r.desc}</td>
                              <td className="py-2 pr-3 text-slate-500">{r.cat}</td>
                              <td className="py-2 pr-3 text-slate-400">{r.contact}</td>
                              <td
                                className={`whitespace-nowrap py-2 pr-3 text-right font-bold tabular-nums ${amountClass(money2(r.amount))}`}
                              >
                                {money2(r.amount)}
                              </td>
                              <td className="whitespace-nowrap py-2 text-right font-bold tabular-nums text-slate-900">
                                {money2(r.balance)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <p className="text-[11px] text-slate-500">
                      Showing {registerRows.length === 0 ? 0 : 1}-{registerRows.length} of {registerRows.length}{' '}
                      transactions
                    </p>
                    <span className="flex items-center gap-1">
                      <span className={`${smallBtn} cursor-not-allowed opacity-50`}>Previous</span>
                      <span className="px-2 text-[11px] font-semibold text-slate-600">Page 1 of 1</span>
                      <span className={`${smallBtn} cursor-not-allowed opacity-50`}>Next</span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  {AUDIT_TRAIL.map((a) => (
                    <StaticRow key={a.ref} title={a.what} meta={`${a.ref} · ${a.when} · ${a.who}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`${card} space-y-3 p-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Accounts</p>

            <TabBar tabs={ACCOUNT_SCOPES} value={scope} onChange={setScope} />

            {/* §8: ten columns will never fit a phone — the table scrolls in its own box */}
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
              <table className="w-full min-w-[880px] text-left">
                <thead>
                  <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-2 pr-2">Icon</th>
                    <th className="py-2 pr-3">Account Name</th>
                    <th className="py-2 pr-3">Class</th>
                    <th className="py-2 pr-3">Type</th>
                    <th className="py-2 pr-3">Detail</th>
                    <th className="py-2 pr-3">Owner</th>
                    <th className="py-2 pr-3 text-right">Savvy Balance</th>
                    <th className="py-2 pr-3 text-right">Bank Balance</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2">Register / Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scopedAccounts.map((a) => (
                    <tr key={a.id} className="text-[11px] text-slate-700">
                      <td className="py-2 pr-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{ backgroundColor: CLASS_TINT[a.cls] ?? '#94a3b8' }}
                        >
                          {a.name.charAt(0)}
                        </span>
                      </td>
                      <td className="py-2 pr-3 font-semibold text-slate-900">{a.name}</td>
                      <td className="py-2 pr-3 text-slate-500">{a.cls}</td>
                      <td className="py-2 pr-3 text-slate-500">{a.type}</td>
                      <td className="py-2 pr-3 text-slate-500">{a.detail}</td>
                      <td className="py-2 pr-3 text-slate-500">{a.owner}</td>
                      <td
                        className={`whitespace-nowrap py-2 pr-3 text-right font-bold tabular-nums ${
                          a.savvy === null ? 'text-slate-400' : amountClass(String(a.savvy))
                        }`}
                      >
                        {a.savvy === null
                          ? '—'
                          : a.savvy.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td
                        className={`whitespace-nowrap py-2 pr-3 text-right font-bold tabular-nums ${amountClass(money2(a.bank))}`}
                      >
                        {money2(a.bank)}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="inline-flex whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          Active
                        </span>
                      </td>
                      <td className="py-2">
                        {a.savvy === null ? (
                          <button
                            type="button"
                            onClick={() => onAction(`Running the ${a.name} report`)}
                            className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-[#52A5CE] hover:underline"
                          >
                            <FileText className="h-3 w-3" />
                            Run report
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setRegisterId(a.id);
                              setRegQuery('');
                              setRegTab('Register');
                              onAction(`Opened the ${a.name} register`);
                            }}
                            className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-[#52A5CE] hover:underline"
                          >
                            <BookOpen className="h-3 w-3" />
                            View register
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Budgeting — `src/pages/Budgeting.jsx`
 * Tabs: overview (default) · modify_budget
 * ------------------------------------------------------------------ */

const BUDGET_TABS = ['Overview', 'Modify Budget'] as const;

function BudgetingPage({ onAction }: { onAction: (m: string) => void }) {
  const [created, setCreated] = React.useState(false);
  const [tab, setTab] = React.useState<(typeof BUDGET_TABS)[number]>('Overview');
  const [monthIdx, setMonthIdx] = React.useState(MONTHS.length - 1);
  const [cats, setCats] = React.useState([
    { id: 'c1', name: 'Groceries', spent: 640, budget: 800 },
    { id: 'c2', name: 'Housing', spent: 2450, budget: 2450 },
    { id: 'c3', name: 'Transportation', spent: 180, budget: 400 },
    { id: 'c4', name: 'Entertainment', spent: 210, budget: 150 },
  ]);

  const header = (
    <PageHeader
      icon={ClipboardList}
      title="Budgeting"
      subtitle="Track spending against category budgets."
      secondary="Category Manager"
      onSecondary={() => onAction('Opening the Category Manager')}
    />
  );

  if (!created) {
    return (
      <div className="space-y-4">
        {header}
        <div className={`${card} flex min-h-[320px] items-center justify-center bg-slate-50/30 p-6`}>
          <div className="max-w-xl text-center">
            <h2 className="mb-3 text-xl font-semibold text-slate-900 sm:text-2xl">No Budget Setup Yet</h2>
            <p className="mb-8 text-sm leading-relaxed text-slate-600">
              Start by creating your first budget item to begin tracking your finances.
            </p>
            <button
              type="button"
              onClick={redirectToSignup}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-[#52A5CE] px-5 text-sm font-bold text-white shadow-2xs hover:bg-[#438fb6]"
            >
              <Plus className="h-4 w-4" />
              Create Budget Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalSpent = cats.reduce((s, c) => s + c.spent, 0);
  const totalBudget = cats.reduce((s, c) => s + c.budget, 0) || 1;
  const totalPct = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="space-y-4">
      {header}
      <div className="flex flex-wrap items-center gap-2">
        <TabBar tabs={BUDGET_TABS} value={tab} onChange={setTab} />
        {tab === 'Overview' && (
          <MonthStepper
            label={MONTHS[monthIdx]}
            onPrev={() => setMonthIdx((i) => Math.max(0, i - 1))}
            onNext={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
          />
        )}
      </div>

      {tab === 'Overview' ? (
        <>
          {/* BudgetLinearBar — one bar for the whole month, above the per-category tracker */}
          <div className={`${card} p-4 sm:p-5`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {MONTHS[monthIdx]} · Expenses
              </p>
              <p className="whitespace-nowrap text-xs font-bold tabular-nums text-slate-900">
                {money2(totalSpent)} of {money2(totalBudget)}
              </p>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${totalPct > 100 ? 'bg-red-500' : 'bg-[#52A5CE]'}`}
                style={{ width: `${Math.min(100, totalPct)}%` }}
              />
            </div>
          </div>

          <Panel title="Budget Tracker">
            {cats.map((c) => {
              const pct = Math.round((c.spent / (c.budget || 1)) * 100);
              const over = pct > 100;
              return (
                <div key={c.id} className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-slate-800 line-clamp-2">
                      {c.name}
                    </span>
                    <span
                      className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${over ? 'text-red-600' : 'text-slate-900'}`}
                    >
                      {money2(c.spent)} / {money2(c.budget)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${over ? 'bg-red-500' : 'bg-[#52A5CE]'}`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <span
                      className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${over ? 'text-red-600' : 'text-slate-500'}`}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </Panel>
        </>
      ) : (
        <Panel
          title="Categories"
          action="Reset budget"
          onAction={() => {
            setCreated(false);
            onAction('Budget removed');
          }}
        >
          {cats.map((c) => (
            <StaticRow key={c.id} title={c.name} meta={`Limit ${money2(c.budget)}`}>
              <span className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  aria-label={`Lower ${c.name} budget by $100`}
                  onClick={redirectToSignup}
                  className={smallBtn}
                >
                  −$100
                </button>
                <button
                  type="button"
                  aria-label={`Raise ${c.name} budget by $100`}
                  onClick={redirectToSignup}
                  className={smallBtn}
                >
                  +$100
                </button>
              </span>
            </StaticRow>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Calendar — `src/pages/Calendar.jsx`
 * Month grid, then Meals → Events → Tasks in series for the chosen day.
 * ------------------------------------------------------------------ */

const MEAL_SLOTS = ['Breakfast', 'Lunch', 'Dinner'] as const;
const DISHES = ['Chicken Stir Fry', 'Spaghetti Bolognese', 'Pancakes & Fruit', 'Garden Salad', 'Turkey Wraps'];

function CalendarPage({ onAction }: { onAction: (m: string) => void }) {
  const [selected, setSelected] = React.useState(5);
  const [events, setEvents] = React.useState<Record<number, string[]>>({
    5: ['Soccer Practice · 4:30 PM'],
    6: ['School Book Fair'],
    12: ['Mortgage due'],
    18: ['Payday'],
  });
  const [meals, setMeals] = React.useState<Record<string, string>>({
    '5:Breakfast': 'Pancakes & Fruit',
    '5:Dinner': 'Chicken Stir Fry',
  });
  const [tasks, setTasks] = React.useState([
    { id: 'ct1', title: 'Tidy Bedroom & Make Bed', who: 'Leo', stars: 2, done: false },
    { id: 'ct2', title: 'Feed & Walk Pet Dog', who: 'Maya', stars: 3, done: false },
  ]);
  const [draft, setDraft] = React.useState('');

  const dayEvents = events[selected] || [];

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const v = draft.trim();
    if (!v) return;
    setEvents((prev) => ({ ...prev, [selected]: [...(prev[selected] || []), v] }));
    setDraft('');
    onAction(`Added "${v}" to Sep ${selected}`);
  };

  const planMeal = (slot: string) => {
    const key = `${selected}:${slot}`;
    const next = DISHES[(DISHES.indexOf(meals[key] ?? '') + 1) % DISHES.length];
    setMeals((prev) => ({ ...prev, [key]: next }));
    onAction(`${slot} planned: ${next}`);
  };

  const clearMeal = (slot: string) => {
    setMeals((prev) => {
      const next = { ...prev };
      delete next[`${selected}:${slot}`];
      return next;
    });
    onAction(`Cleared ${slot}`);
  };

  return (
    <div className="space-y-4">
      <PageHeader icon={CalendarIcon} title="Calendar" subtitle="Meals, events and tasks for every day of the month." />

      <div className={`${card} p-4`}>
        <div className="grid grid-cols-7 gap-1 pb-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 sm:gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d}>
              <span className="sm:hidden">{d.charAt(0)}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const list = events[day] || [];
            const isSel = day === selected;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(day)}
                aria-label={`September ${day}`}
                aria-pressed={isSel}
                className={`min-h-16 cursor-pointer rounded-lg border p-1 text-left transition-colors sm:min-h-20 sm:p-2 ${
                  isSel
                    ? 'border-[#52A5CE] bg-sky-50 ring-1 ring-[#52A5CE]/30'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs font-bold ${isSel ? 'text-[#52A5CE]' : 'text-slate-600'}`}>{day}</span>
                <span className="mt-1 flex flex-wrap gap-1">
                  {list.slice(0, 3).map((_, d) => (
                    <span key={d} className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#52A5CE]" />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meals → Events → Tasks, the same three sections the real Calendar page shows */}
      <div className={`${card} space-y-4 p-4`}>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">September {selected}</p>

        <div className="space-y-2">
          <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Utensils className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span>Meals</span>
            </span>
            <span className="text-[11px] font-medium text-[#52A5CE]">Plan</span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {MEAL_SLOTS.map((slot) => {
              const planned = meals[`${selected}:${slot}`];
              return (
                <div
                  key={slot}
                  className="flex items-center justify-between gap-1 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={redirectToSignup}
                    className="min-h-[36px] min-w-0 flex-1 cursor-pointer pr-1 text-left"
                  >
                    <span className="block text-xs font-semibold leading-tight text-slate-700">{slot}</span>
                    <span className="mt-0.5 block truncate text-[11px] font-normal italic text-slate-400">
                      {planned || 'Not planned'}
                    </span>
                  </button>
                  {planned && (
                    <button
                      type="button"
                      onClick={redirectToSignup}
                      aria-label={`Remove ${slot}`}
                      className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[11px] font-bold text-slate-400 shadow-xs hover:bg-red-500 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5 text-[#10b981]" />
              <span>Events</span>
            </span>
            {dayEvents.length > 0 && (
              <span className="rounded-full border border-slate-200/50 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {dayEvents.length}
              </span>
            )}
          </div>
          {dayEvents.length === 0 ? (
            <p className="px-1 py-1 text-[11px] font-normal italic text-slate-400">No events scheduled for this day</p>
          ) : (
            dayEvents.map((ev, i) => (
              <StaticRow key={ev + i} title={ev}>
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className={smallBtn}
                >
                  Remove
                </button>
              </StaticRow>
            ))
          )}
          <form onSubmit={(e) => { e.preventDefault(); redirectToSignup(); }} className="flex gap-2 pt-1">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add an event..."
              aria-label="Add an event"
              className={field}
            />
            <button
              type="submit"
              className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg bg-[#52A5CE] px-3 text-xs font-bold text-white hover:bg-[#438fb6]"
            >
              Add
            </button>
          </form>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <div className="flex select-none items-center justify-between rounded-xl bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckSquare className="h-3.5 w-3.5 text-[#0D9488]" />
              <span>Tasks</span>
            </span>
            <span className="whitespace-nowrap rounded-full border border-slate-200/50 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {tasks.filter((t) => !t.done).length} due
            </span>
          </div>
          {tasks.map((t) => (
            <StaticRow key={t.id} title={t.title} meta={`${t.who} · +${t.stars} ${t.stars === 1 ? 'star' : 'stars'}`}>
              {t.done ? (
                <span className="shrink-0 whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  Approved
                </span>
              ) : (
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className={smallBtn}
                >
                  Award
                </button>
              )}
            </StaticRow>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Net Worth — `src/pages/NetWorth.jsx`
 * ------------------------------------------------------------------ */

function NetWorthPage({ onAction }: { onAction: (m: string) => void }) {
  const groups = [
    {
      id: 'prop',
      name: 'Real Estate & Property',
      total: 550000,
      items: [{ n: 'Primary Residence (Demo Property)', v: 550000 }],
    },
    {
      id: 'inv',
      name: 'Investments & Retirement',
      total: 185000,
      items: [
        { n: 'Total Market Index Fund (VTSAX)', v: 110000 },
        { n: 'Employer 401(k) Plan', v: 55000 },
        { n: 'Roth IRA Account', v: 20000 },
      ],
    },
    {
      id: 'veh',
      name: 'Vehicles',
      total: 45000,
      items: [
        { n: '2023 Electric Crossover SUV', v: 30000 },
        { n: '2021 Family Sedan', v: 15000 },
      ],
    },
    {
      id: 'cash',
      name: 'Liquid Banking',
      total: 20000,
      items: [
        { n: 'Demo Checking (…1001)', v: 5000 },
        { n: 'Demo High-Yield Savings (…2002)', v: 15000 },
      ],
    },
    {
      id: 'debt',
      name: 'Loans & Liabilities',
      total: -321250,
      items: [
        { n: 'Home Mortgage (30-Yr Fixed)', v: -320000 },
        { n: 'Rewards Credit Card', v: -1250 },
      ],
    },
  ];
  const [open, setOpen] = React.useState<string | null>('prop');

  const assets = groups.filter((g) => g.total > 0).reduce((s, g) => s + g.total, 0);
  const liabilities = groups.filter((g) => g.total < 0).reduce((s, g) => s + Math.abs(g.total), 0);
  const net = assets - liabilities;
  const liquid = groups.find((g) => g.id === 'cash')?.total ?? 0;
  const debtRatio = Math.round((liabilities / assets) * 100);
  const thisMonth = 2380.4;

  const stat = (label: string, value: React.ReactNode, note: string) => (
    <div className={`${card} p-3`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-1">{value}</div>
      <p className="mt-0.5 text-[11px] font-medium text-slate-400">{note}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <PageHeader icon={Banknote} title="Net Worth" subtitle="Every asset and liability, in one balance sheet." />

      <div className={`${card} p-4 sm:p-5`}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Net Worth</p>
        <p className="mt-1 whitespace-nowrap text-2xl font-bold tabular-nums text-slate-900">{money2(net)}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stat(
          'This Month',
          <p className="whitespace-nowrap text-base font-bold text-[#10b981]">+{money2(thisMonth)}</p>,
          'net cashflow'
        )}
        {stat(
          'Debt-to-Assets',
          <p className="whitespace-nowrap text-xl font-bold text-slate-800">{debtRatio}%</p>,
          `${money2(liabilities)} of ${money2(assets)}`
        )}
        {stat(
          'Liquid Assets',
          <p className="whitespace-nowrap text-xl font-bold text-slate-800">{money2(liquid)}</p>,
          'cash & bank accounts'
        )}
      </div>

      <div className={`${card} grid grid-cols-1 divide-y divide-slate-100 p-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
        <div className="py-2 sm:px-3 sm:py-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Assets</p>
          <p className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-slate-900">{money2(assets)}</p>
        </div>
        <div className="py-2 sm:px-3 sm:py-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Liabilities</p>
          <p className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-red-600">-{money2(liabilities)}</p>
        </div>
        <div className="py-2 sm:px-3 sm:py-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Net Worth</p>
          <p className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-slate-900">{money2(net)}</p>
        </div>
      </div>

      <Panel title="Composition">
        {groups.map((g) => (
          <div key={g.id} className="rounded-lg bg-slate-50">
            <button
              type="button"
              onClick={() => {
                const next = open === g.id ? null : g.id;
                setOpen(next);
                onAction(next ? `Expanded ${g.name}` : `Collapsed ${g.name}`);
              }}
              aria-expanded={open === g.id}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-2.5 py-2 text-left"
            >
              <span className="min-w-0 flex-1 break-words text-[11px] font-semibold text-slate-800 line-clamp-2">
                {g.name}
              </span>
              <span
                className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${amountClass(money2(g.total))}`}
              >
                {money2(g.total)}
              </span>
            </button>
            {open === g.id && (
              <div className="space-y-1 border-t border-slate-200 px-2.5 py-2">
                {g.items.map((it) => (
                  <div key={it.n} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 flex-1 break-words text-[11px] text-slate-500 line-clamp-2">{it.n}</span>
                    <span
                      className={`shrink-0 whitespace-nowrap text-[11px] font-bold tabular-nums ${amountClass(money2(it.v))}`}
                    >
                      {money2(it.v)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Panel>

      <Panel title="Included in Net Worth">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 px-2.5 py-2">
            <h4 className="text-sm font-bold leading-tight text-slate-700">Business Accounts</h4>
            <p className="mt-1 text-[11px] font-medium text-slate-400">Coming soon</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-2.5 py-2">
            <h4 className="text-sm font-bold leading-tight text-slate-700">Children&apos;s Custodial Accounts</h4>
            <p className="mt-1 text-[11px] font-medium text-slate-400">Coming soon</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Investments — `src/pages/Investments.jsx`
 * Tabs: stocks (default) · crypto
 * ------------------------------------------------------------------ */

const INV_TABS = ['Stocks', 'Crypto'] as const;
type Holding = { id: string; name: string; institution: string; detail?: string; kind: 'brokerage' | 'retirement'; v: number };
type Wallet = { id: string; name: string; chain: string; v: number };

function InvestmentsPage({ onAction }: { onAction: (m: string) => void }) {
  const [tab, setTab] = React.useState<(typeof INV_TABS)[number]>('Stocks');
  const [holdings, setHoldings] = React.useState<Holding[]>([
    { id: 'h1', name: 'Total Market Index Fund', institution: 'Horizon Investments', detail: 'VFIAX · +8.4% YTD', kind: 'brokerage', v: 124500 },
    { id: 'h2', name: 'Employer 401(k) Plan', institution: 'Retirement Trust', detail: '401(k) · Employer match', kind: 'retirement', v: 62400 },
    { id: 'h3', name: 'Roth IRA Account', institution: 'Retirement Trust', detail: 'Roth IRA · Tax-free', kind: 'retirement', v: 23100 },
  ]);
  const [wallets, setWallets] = React.useState<Wallet[]>([
    { id: 'w1', name: 'Digital Asset Custody — BTC', chain: 'Bitcoin · 0.42 BTC', v: 26400 },
  ]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', v: '' });

  const brokerage = holdings.filter((h) => h.kind === 'brokerage');
  const retirement = holdings.filter((h) => h.kind === 'retirement');
  const stocksTotal = holdings.reduce((s, h) => s + h.v, 0);
  const cryptoTotal = wallets.reduce((s, w) => s + w.v, 0);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = form.name.trim();
    if (!n) return;
    if (tab === 'Stocks') {
      setHoldings((p) => [
        ...p,
        { id: 'h' + Date.now(), name: n, institution: 'Added today', kind: 'brokerage', v: Number(form.v) || 0 },
      ]);
      onAction(`Added account "${n}"`);
    } else {
      setWallets((p) => [...p, { id: 'w' + Date.now(), name: n, chain: 'Added today', v: Number(form.v) || 0 }]);
      onAction(`Added wallet "${n}"`);
    }
    setForm({ name: '', v: '' });
    setOpen(false);
  };

  const holdingRow = (h: Holding) => (
    <StaticRow key={h.id} title={h.name} meta={[h.detail, h.institution].filter(Boolean).join(' · ')} value={money2(h.v)}>
      <button
        type="button"
        onClick={redirectToSignup}
        className={smallBtn}
      >
        Remove
      </button>
    </StaticRow>
  );

  return (
    <div className="space-y-4">
      <PageHeader
        icon={TrendingUp}
        title="Investments"
        subtitle="Stocks, retirement accounts and crypto wallets."
        action={open ? 'Close' : tab === 'Stocks' ? 'Add Account' : 'Add Wallet'}
        onAction={() => setOpen((v) => !v)}
      />

      <TabBar
        tabs={INV_TABS}
        value={tab}
        onChange={(t) => {
          setTab(t);
          setOpen(false);
        }}
      />

      {open && (
        <form onSubmit={(e) => { e.preventDefault(); redirectToSignup(); }} className={`${card} flex flex-col gap-3 p-4 sm:flex-row`}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={tab === 'Stocks' ? 'Account name' : 'Wallet name'}
            aria-label={tab === 'Stocks' ? 'Account name' : 'Wallet name'}
            className={field}
          />
          <input
            value={form.v}
            onChange={(e) => setForm({ ...form, v: e.target.value })}
            inputMode="decimal"
            placeholder="Value"
            aria-label="Value"
            className={`${field} sm:w-32`}
          />
          <button
            type="submit"
            className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#52A5CE] px-3 text-xs font-bold text-white hover:bg-[#438fb6]"
          >
            Add
          </button>
        </form>
      )}

      {tab === 'Stocks' ? (
        holdings.length === 0 ? (
          <div className={`${card} p-8 text-center`}>
            <PiggyBank className="mx-auto mb-4 h-12 w-12 text-slate-400" />
            <p className="text-sm text-slate-600">No stocks or retirement accounts yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`${card} p-4`}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Stocks &amp; Retirement Accounts
              </p>
              <p className="mt-1 whitespace-nowrap text-xl font-bold tabular-nums text-slate-900">
                {money2(stocksTotal)}
              </p>
            </div>
            {brokerage.length > 0 && (
              <div className={`${card} space-y-2 p-4`}>
                <SectionTitle>Brokerage Accounts</SectionTitle>
                {brokerage.map(holdingRow)}
              </div>
            )}
            {retirement.length > 0 && (
              <div className={`${card} space-y-2 p-4`}>
                <SectionTitle>Retirement Accounts</SectionTitle>
                {retirement.map(holdingRow)}
              </div>
            )}
          </div>
        )
      ) : wallets.length === 0 ? (
        <div className={`${card} p-8 text-center`}>
          <PiggyBank className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <p className="text-sm text-slate-600">No crypto wallets yet</p>
        </div>
      ) : (
        <div className={`${card} space-y-2 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SectionTitle>Crypto Wallets</SectionTitle>
            <span className="whitespace-nowrap text-xs font-bold tabular-nums text-slate-900">{money2(cryptoTotal)}</span>
          </div>
          {wallets.map((w) => (
            <StaticRow key={w.id} title={w.name} meta={w.chain} value={money2(w.v)}>
              <button
                type="button"
                onClick={redirectToSignup}
                className={smallBtn}
              >
                Remove
              </button>
            </StaticRow>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Contacts — `src/pages/Contacts.jsx`
 * Search + an "All contacts / Household / General Contacts" dropdown, with
 * the results grouped under those two headings.
 * ------------------------------------------------------------------ */

const CONTACT_FILTERS = ['All contacts', 'Household', 'General Contacts'] as const;

function ContactsPage({ onAction }: { onAction: (m: string) => void }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState<(typeof CONTACT_FILTERS)[number]>('All contacts');
  const people = [
    { id: 'p1', name: 'Sarah Miller', email: 'sarah.miller@example.com', phone: '(555) 234-7788', status: 'Parent · Admin', group: 'Household' },
    { id: 'p2', name: 'Leo Miller', email: 'leo@example.com', phone: '—', status: 'Child · Age 10', group: 'Household' },
    { id: 'p3', name: 'Maya Miller', email: 'maya@example.com', phone: '—', status: 'Child · Age 6', group: 'Household' },
    { id: 'p4', name: 'Home Loan Servicing Hub', email: 'service@example.com', phone: '(800) 555-0199', status: 'Mortgage servicer', group: 'General Contacts' },
    { id: 'p5', name: 'Premier National Bank', email: 'support@example.com', phone: '(800) 555-0110', status: 'Banking provider', group: 'General Contacts' },
  ];

  const matches = people.filter(
    (p) => !q.trim() || `${p.name} ${p.email} ${p.status}`.toLowerCase().includes(q.trim().toLowerCase())
  );
  const household = matches.filter((p) => p.group === 'Household');
  const general = matches.filter((p) => p.group === 'General Contacts');

  const group = (title: string, list: typeof people) => (
    <div className={`${card} space-y-2 p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-950">{title}</span>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
          {list.length}
        </span>
      </div>
      {list.length === 0 ? (
        <p className="py-3 text-center text-xs text-slate-400">No contacts match that search.</p>
      ) : (
        list.map((p) => (
          <Row
            key={p.id}
            title={p.name}
            meta={`${p.email} · ${p.phone}`}
            value={p.status}
            onClick={() => onAction(`Opening ${p.name}`)}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <PageHeader
        icon={Users}
        title="Contacts"
        subtitle="Household members and general contacts."
        action="Add Contact"
        onAction={() => onAction('Opening the new contact form')}
      />

      <div className={`${card} flex flex-col gap-2 p-4 sm:flex-row sm:items-center`}>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search contacts..."
            aria-label="Search contacts"
            className="min-h-[36px] w-full min-w-0 bg-transparent text-base text-slate-800 focus:outline-none sm:text-xs"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              aria-label="Clear search"
              className="shrink-0 cursor-pointer text-[11px] font-semibold text-[#52A5CE]"
            >
              Clear
            </button>
          )}
        </div>
        <select
          value={filter}
          onChange={(e) => {
            const v = e.target.value as (typeof CONTACT_FILTERS)[number];
            setFilter(v);
            onAction(`Filtered by ${v}`);
          }}
          aria-label="Filter contacts"
          className={`${field} sm:w-44`}
        >
          {CONTACT_FILTERS.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {(filter === 'All contacts' || filter === 'Household') && group('Household', household)}
      {(filter === 'All contacts' || filter === 'General Contacts') && group('General Contacts', general)}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Integrations — the bank-connection list the app actually ships:
 * "Add Bank" opens Plaid Link, each institution card carries its own
 * Sync Now / Reconnect / Disconnect controls.
 * ------------------------------------------------------------------ */

type Bank = { id: string; name: string; initial: string; tint: string; accounts: number; synced: string; active: boolean };

function IntegrationsPage({ onAction }: { onAction: (m: string) => void }) {
  const [banks, setBanks] = React.useState<Bank[]>([
    { id: 'b1', name: 'Premier National Bank', initial: 'P', tint: '#3B82F6', accounts: 2, synced: '2 hours ago', active: true },
  ]);
  const [plaidOpen, setPlaidOpen] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const NEXT_BANKS = [
    { name: 'City Union Bank', initial: 'C', tint: '#0284C7' },
    { name: 'Metro Trust Bank', initial: 'M', tint: '#0D9488' },
    { name: 'Digital Direct Bank', initial: 'D', tint: '#7B2CBF' },
    { name: 'Pacific Horizon Bank', initial: 'P', tint: '#D97706' },
  ];

  const linkBank = () => {
    /* Disconnecting the seeded bank leaves banks.length at 0, and JS % keeps the
       sign of the dividend, so (0 - 1) % 3 is -1 — the extra + length % length
       folds that back into a valid 0..length-1 index. */
    const idx = ((banks.length - 1) % NEXT_BANKS.length + NEXT_BANKS.length) % NEXT_BANKS.length;
    const next = NEXT_BANKS[idx];
    setBanks((p) => [
      ...p,
      { id: 'b' + Date.now(), ...next, accounts: 2, synced: 'just now', active: true },
    ]);
    setPlaidOpen(false);
    setPhone('');
    onAction(`Linked ${next.name} through Plaid`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Integrations</h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Connect your banks to automatically import transactions and sync balances.
          </p>
        </div>
        <button
          type="button"
          onClick={redirectToSignup}
          className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-[#52A5CE] px-4 text-sm font-bold text-white shadow-2xs transition-colors hover:bg-[#438fb6]"
        >
          <Plus className="h-4 w-4" />
          <span className="whitespace-nowrap">{plaidOpen ? 'Cancel' : 'Add Bank'}</span>
        </button>
      </div>

      {/* Plaid Link — the same handoff the real Add Bank button opens */}
      {plaidOpen && (
        <div className={`${card} mx-auto max-w-md space-y-4 p-5 text-center`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Plaid</p>
          <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
            FirstSavvy uses Plaid to connect your account
          </h2>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-1">
            <span className="shrink-0 text-sm font-semibold text-slate-700">+1</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="Phone number"
              aria-label="Phone number"
              className="min-h-[44px] w-full min-w-0 bg-transparent text-base text-slate-800 focus:outline-none sm:text-sm"
            />
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Use your phone number to log in or sign up with Plaid to go faster next time.
          </p>
          <button
            type="button"
            onClick={redirectToSignup}
            className="min-h-[44px] w-full cursor-pointer rounded-xl bg-[#52A5CE] px-4 text-sm font-bold text-white hover:bg-[#438fb6]"
          >
            Continue
          </button>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Terms apply. By continuing, you agree to Plaid&apos;s Privacy Policy.
          </p>
        </div>
      )}

      {banks.length === 0 ? (
        <div className={`${card} p-8 text-center`}>
          <Cable className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <p className="text-sm font-medium text-slate-600">No banks connected</p>
          <p className="mt-1 text-xs text-slate-400">Add a bank to start importing transactions.</p>
        </div>
      ) : (
        banks.map((b) => (
          <div key={b.id} className={`${card} p-4`}>
            <button
              type="button"
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              aria-expanded={expanded === b.id}
              className="flex w-full cursor-pointer items-center gap-3 text-left"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
                style={{ backgroundColor: b.tint }}
              >
                {b.initial}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-slate-900">{b.name}</span>
                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                      b.active
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-slate-100 text-slate-500'
                    }`}
                  >
                    {b.active ? 'Active' : 'Disconnected'}
                  </span>
                </span>
                <span className="mt-0.5 block break-words text-xs text-slate-500">
                  {b.accounts} unique linked account{b.accounts === 1 ? '' : 's'} • Synced {b.synced}
                </span>
              </span>
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${expanded === b.id ? 'rotate-90' : ''}`}
              />
            </button>

            {expanded === b.id && (
              <div className="mt-3 space-y-1 border-t border-slate-100 pt-3">
                {['Premier Checking ••••4812', 'High-Yield Savings ••••9104'].slice(0, b.accounts).map((a) => (
                  <p key={a} className="text-xs text-slate-500">
                    {a}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
              <span className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className={ghostBtn}
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span className="whitespace-nowrap">Sync Now</span>
                </button>
                <button
                  type="button"
                  onClick={redirectToSignup}
                  className={ghostBtn}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="whitespace-nowrap">Reconnect</span>
                </button>
              </span>
              <button
                type="button"
                onClick={redirectToSignup}
                className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">Disconnect</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Password Vault — `src/pages/PasswordVault.jsx`
 * Tabs: All · Logins · Cards · Notes · Identity
 * ------------------------------------------------------------------ */

const VAULT_TABS = ['All', 'Logins', 'Cards', 'Notes', 'Identity'] as const;

function VaultPage({ onAction }: { onAction: (m: string) => void }) {
  const [tab, setTab] = React.useState<(typeof VAULT_TABS)[number]>('All');
  const [q, setQ] = React.useState('');
  const [shownId, setShownId] = React.useState<string | null>(null);
  const items = [
    { id: 'v1', name: 'Online Banking Portal', meta: 'Updated Aug 28', type: 'Logins', secret: 'DemoPass-01' },
    { id: 'v2', name: 'Retirement Benefits Portal', meta: 'Updated Aug 12', type: 'Logins', secret: 'DemoPass-02' },
    { id: 'v3', name: 'Platinum Rewards Card', meta: 'Expires 09/29', type: 'Cards', secret: '•••• •••• •••• 4242' },
    { id: 'v4', name: 'Home safe code', meta: 'Updated Jul 03', type: 'Notes', secret: '11-22-33' },
    { id: 'v5', name: 'Passport', meta: 'Expires 2031', type: 'Identity', secret: 'X0000000' },
  ];

  const shown = items.filter(
    (i) =>
      (tab === 'All' || i.type === tab) &&
      (!q.trim() || `${i.name} ${i.meta}`.toLowerCase().includes(q.trim().toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <PageHeader
        icon={Lock}
        title="Password Vault"
        subtitle="Encrypted logins, cards, notes and identity documents."
        action="Add Item"
        onAction={() => onAction('Opening the new vault item form')}
      />
      <div className={`${card} space-y-3 p-4`}>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search vault..."
            aria-label="Search vault"
            className="min-h-[36px] w-full min-w-0 bg-transparent text-base text-slate-800 focus:outline-none sm:text-xs"
          />
        </div>
        <TabBar tabs={VAULT_TABS} value={tab} onChange={setTab} />
        <div className="space-y-2">
          {shown.map((i) => (
            <StaticRow key={i.id} title={i.name} meta={`${i.type} · ${i.meta}`}>
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-slate-600">
                {shownId === i.id ? i.secret : '••••••••'}
              </span>
              <button
                type="button"
                onClick={redirectToSignup}
                className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-lg border border-slate-300 px-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
              >
                {shownId === i.id ? 'Hide' : 'Reveal'}
              </button>
            </StaticRow>
          ))}
          {shown.length === 0 && (
            <div className="py-6 text-center">
              <h3 className="text-sm font-medium text-slate-700">No items found</h3>
              <p className="mt-1 text-xs text-slate-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Profile Settings — `src/pages/ProfileSettings.jsx`
 * Tabs: periods (default) · household · protected
 * ------------------------------------------------------------------ */

const SETTINGS_TABS = ['Periods', 'Household', 'Protected'] as const;

function SettingsPage({ onAction }: { onAction: (m: string) => void }) {
  const [tab, setTab] = React.useState<(typeof SETTINGS_TABS)[number]>('Periods');
  const [household, setHousehold] = React.useState('The Miller Household');
  const [saved, setSaved] = React.useState(false);
  const [periods, setPeriods] = React.useState([
    { id: 'q3', name: 'Q3 2026', start: 'Jul 1, 2026', end: 'Sep 30, 2026', open: true },
    { id: 'q2', name: 'Q2 2026', start: 'Apr 1, 2026', end: 'Jun 30, 2026', open: false },
  ]);

  const addPeriod = () => {
    setPeriods((p) => [
      { id: 'p' + Date.now(), name: `Q4 2026`, start: 'Oct 1, 2026', end: 'Dec 31, 2026', open: true },
      ...p,
    ]);
    onAction('Created a new accounting period');
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onAction('Household settings saved');
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={SlidersHorizontal}
        title="Profile Settings"
        subtitle="Accounting periods, household and protected configuration."
      />
      <TabBar tabs={SETTINGS_TABS} value={tab} onChange={setTab} />

      {tab === 'Periods' && (
        <>
          <div className={`${card} space-y-3 p-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">Accounting Periods</h2>
              <button type="button" onClick={redirectToSignup} className={ghostBtn}>
                <Plus className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">New Period</span>
              </button>
            </div>

            {periods.length === 0 ? (
              <p className="py-4 text-center text-sm font-semibold text-slate-800">No accounting periods defined.</p>
            ) : (
              /* §8: a five-column table cannot fit 320px, so it scrolls inside its own box */
              <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
                <table className="w-full min-w-[520px] text-left">
                  <thead>
                    <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th className="py-2 pr-3">Period Name</th>
                      <th className="py-2 pr-3">Start Date</th>
                      <th className="py-2 pr-3">End Date</th>
                      <th className="py-2 pr-3">Status</th>
                      <th className="py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {periods.map((p) => (
                      <tr key={p.id} className="text-[11px] text-slate-700">
                        <td className="py-2 pr-3 font-semibold text-slate-800">{p.name}</td>
                        <td className="whitespace-nowrap py-2 pr-3 text-slate-500">{p.start}</td>
                        <td className="whitespace-nowrap py-2 pr-3 text-slate-500">{p.end}</td>
                        <td className="py-2 pr-3">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                              p.open
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-slate-200 bg-slate-100 text-slate-500'
                            }`}
                          >
                            {p.open ? 'Open' : 'Closed'}
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          <button
                            type="button"
                            onClick={redirectToSignup}
                            className={smallBtn}
                          >
                            {p.open ? 'Close' : 'Reopen'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className={`${card} flex gap-3 p-4`}>
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#52A5CE]" />
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900">How Period Locking Works</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Closing a period locks its transactions so balances cannot shift underneath a report you have already
                filed. Reopen a period to make corrections, then close it again.
              </p>
            </div>
          </div>
        </>
      )}

      {tab === 'Household' && (
        <>
          {saved && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Household settings successfully updated.
            </div>
          )}
          <div className={`${card} space-y-3 p-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">Household Activity</h2>
              <button type="button" onClick={redirectToSignup} className={ghostBtn}>
                <Users className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">Manage Household</span>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); redirectToSignup(); }} className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <label className="block min-w-0 flex-1">
                <span className="mb-1 block text-xs font-semibold text-slate-700">Household Name</span>
                <input value={household} onChange={(e) => setHousehold(e.target.value)} className={field} />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#52A5CE] px-3 text-xs font-bold text-white hover:bg-[#438fb6]"
              >
                Save
              </button>
            </form>
          </div>

          <div className={`${card} space-y-2 p-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-900">Members</span>
              <button type="button" onClick={redirectToSignup} className={ghostBtn}>
                <Plus className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">Add Co-Owner</span>
              </button>
            </div>
            <p className="text-[11px] font-semibold tracking-wider text-slate-400">CHILDREN</p>
            {[
              { n: 'Leo Miller', s: '42 stars' },
              { n: 'Maya Miller', s: '28 stars' },
            ].map((c) => (
              <Row
                key={c.n}
                title={c.n}
                meta="Click to open parental view"
                value={c.s}
                onClick={redirectToSignup}
              />
            ))}
          </div>
        </>
      )}

      {tab === 'Protected' && (
        <div className={`${card} space-y-3 p-4`}>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">Protected Configurations</h2>
          <p className="text-xs leading-relaxed text-slate-500">
            Chart of accounts and category structures are protected — changes prompt for confirmation so a rename cannot
            quietly re-map history.
          </p>
          <button
            type="button"
            onClick={redirectToSignup}
            className={ghostBtn}
          >
            Review settings
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
