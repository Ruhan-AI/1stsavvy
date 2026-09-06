'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BarChart2,
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  MoreVertical,
  Pencil,
  PowerOff,
  TrendingUp,
} from 'lucide-react';

/**
 * Marketing stand-in for Banking → Accounts.
 *
 * Mirrors `src/components/banking/AccountsTable.jsx` in the web app: the same ACCOUNTS
 * eyebrow, the same three scope buttons with their blue-outlined active state, and the
 * same ten columns down to the right-aligned balances, the Active/Inactive pill, and
 * View register / Run report in the last column.
 *
 * Accounts with no Savvy balance of their own — equity and expense accounts — show an
 * em dash and offer a report rather than a register, which is what the real table does.
 */

type AccountClass = 'Asset' | 'Liability' | 'Equity' | 'Expense' | 'Income';

interface Account {
  id: string;
  name: string;
  cls: AccountClass;
  type: string;
  detail: string;
  owner: string;
  /** null for accounts First Savvy does not keep its own running balance for. */
  savvy: number | null;
  bank: number;
  /** Drives the Status pill. The app keeps inactive rows listed rather than hiding them. */
  active: boolean;
}

const SCOPES = ['All Accounts', 'Assets, Liabilities & Equity', 'Income & Expenses'] as const;
type Scope = (typeof SCOPES)[number];

/** Row-icon tint by account class, matching the app's own colour coding. */
const CLASS_TINT: Record<AccountClass, string> = {
  Asset: '#52A5CE',
  Liability: '#e11d48',
  Equity: '#64748b',
  Expense: '#f59e0b',
  Income: '#10b981',
};

const ACCOUNTS: Account[] = [
  { id: 'a1', name: 'Chase Checking', cls: 'Asset', type: 'Bank Account', detail: 'Checking', owner: 'Both', savvy: 5184, bank: 12787.24, active: true },
  { id: 'a2', name: 'Chase Savings', cls: 'Asset', type: 'Bank Account', detail: 'Checking', owner: 'Both', savvy: 11800, bank: 12841, active: true },
  { id: 'a3', name: 'Citi Credit Card', cls: 'Liability', type: 'Credit Card', detail: 'Credit Card', owner: 'Both', savvy: -2740.21, bank: -2607.35, active: true },
  { id: 'a4', name: 'Opening Balance', cls: 'Equity', type: 'Equity', detail: 'Opening Balance', owner: 'Both', savvy: null, bank: 0, active: true },
  { id: 'a5', name: 'Allowances', cls: 'Expense', type: 'Personal Expense', detail: 'Family & Lifestyle', owner: 'Both', savvy: null, bank: 0, active: true },
];

/** The app prints a leading minus outside the dollar sign: -$2,607.35. */
const money = (n: number) => {
  const abs = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${n < 0 ? '-' : ''}$${abs}`;
};

const plain = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Same rule as `amountClass` in the interactive demo: anything negative reads red, so a
 * debt never renders in the same colour as a balance. Kept local rather than imported so
 * this preview does not drag the whole demo-app module into pages that only show a table.
 */
const signClass = (n: number, positive: string) => (n < 0 ? 'text-red-600 dark:text-red-400' : positive);

const SORTABLE = ['Account Name', 'Class', 'Type', 'Detail', 'Owner', 'Savvy Balance', 'Bank Balance'];

const MENU_WIDTH = 176;
const MENU_HEIGHT = 108;

function SortGlyph() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="ml-1 h-2.5 w-2.5 shrink-0 text-slate-400">
      <path d="M4 4.5 6 2l2 2.5M4 7.5 6 10l2-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LiveAccountsLedgerPreview() {
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS);
  const [scope, setScope] = useState<Scope>('All Accounts');
  const [note, setNote] = useState<string | null>(null);
  /** Where to draw the row menu, in viewport coordinates. */
  const [menu, setMenu] = useState<{ id: string; top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const rows = useMemo(() => {
    if (scope === 'Assets, Liabilities & Equity') {
      return accounts.filter((a) => a.cls === 'Asset' || a.cls === 'Liability' || a.cls === 'Equity');
    }
    if (scope === 'Income & Expenses') {
      return accounts.filter((a) => a.cls === 'Income' || a.cls === 'Expense');
    }
    return accounts;
  }, [scope, accounts]);

  const say = (message: string) => {
    setMenu(null);
    setNote(message);
    window.setTimeout(() => setNote((current) => (current === message ? null : current)), 2600);
  };

  /** The app's own toggle: Mark Inactive / Mark Active, flipping the row's status in place. */
  const toggleStatus = (a: Account) => {
    setAccounts((current) => current.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)));
    say(`${a.name} is now ${a.active ? 'Inactive' : 'Active'}`);
  };

  /** Anchor the menu under the button, flipping above it when the viewport runs out. */
  const openMenuFor = useCallback((id: string, button: HTMLElement) => {
    const r = button.getBoundingClientRect();
    const roomBelow = window.innerHeight - r.bottom;
    setMenu({
      id,
      top: roomBelow < MENU_HEIGHT + 8 ? Math.max(8, r.top - MENU_HEIGHT - 4) : r.bottom + 4,
      left: Math.max(8, Math.min(r.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
    });
  }, []);

  // Viewport coordinates go stale the moment anything scrolls or resizes, so close the
  // menu rather than trying to follow the button around.
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [menu]);

  const menuAccount = menu ? accounts.find((a) => a.id === menu.id) ?? null : null;

  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left font-sans shadow-xl select-none dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="border-b border-slate-100 p-3.5 sm:p-4 dark:border-slate-800">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Accounts</p>

        {/* §9 chip scroller: three long labels will not fit a phone */}
        <div className="-mx-3.5 overflow-x-auto px-3.5 no-scrollbar sm:mx-0 sm:px-0">
          <div className="inline-flex min-w-max items-center gap-2.5">
            {SCOPES.map((s) => {
              const isActive = scope === s;
              const Icon = s === 'Assets, Liabilities & Equity' ? BarChart2 : s === 'Income & Expenses' ? TrendingUp : null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:px-4 ${
                    isActive
                      ? 'border-2 border-blue-500 bg-white text-blue-600 shadow-2xs dark:bg-slate-900'
                      : 'border border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`} />}
                  <span>{s}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* §8: ten columns never fit a phone — the table scrolls inside its own box */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60">
            <tr className="h-9 text-xs">
              <th className="w-12 px-4 py-2 font-semibold text-slate-600 dark:text-slate-300">Icon</th>
              {SORTABLE.map((label) => {
                const right = label === 'Savvy Balance' || label === 'Bank Balance';
                return (
                  <th
                    key={label}
                    className={`select-none whitespace-nowrap px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 ${right ? 'text-right' : ''}`}
                  >
                    <span className={`flex items-center ${right ? 'justify-end' : ''}`}>
                      {label}
                      <SortGlyph />
                    </span>
                  </th>
                );
              })}
              <th className="px-4 py-2 text-center font-semibold text-slate-600 dark:text-slate-300">Status</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-slate-600 dark:text-slate-300">Register / Report</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((a) => (
              <tr
                key={a.id}
                className="h-9 border-b border-slate-100 transition-colors hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-1">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: CLASS_TINT[a.cls] }}
                  >
                    {a.name.charAt(0)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-xs font-medium text-slate-900 dark:text-white">{a.name}</td>
                <td className="whitespace-nowrap px-4 py-1 text-xs text-slate-600 dark:text-slate-400">{a.cls}</td>
                <td className="whitespace-nowrap px-4 py-1 text-xs text-slate-600 dark:text-slate-400">{a.type}</td>
                <td className="whitespace-nowrap px-4 py-1 text-xs text-slate-600 dark:text-slate-400">{a.detail}</td>
                <td className="whitespace-nowrap px-4 py-1 text-xs text-slate-600 dark:text-slate-400">{a.owner}</td>
                <td
                  className={`whitespace-nowrap px-4 py-1 text-right text-xs font-semibold ${
                    a.savvy === null ? '' : signClass(a.savvy, 'text-slate-900 dark:text-white')
                  }`}
                >
                  {a.savvy === null ? <span className="text-slate-400">—</span> : plain(a.savvy)}
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-1 text-right text-xs font-semibold ${signClass(
                    a.bank,
                    'text-slate-700 dark:text-slate-200'
                  )}`}
                >
                  {money(a.bank)}
                </td>
                <td className="px-4 py-1 text-center">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      a.active
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {a.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-1">
                  <span className="flex items-center justify-between gap-2">
                    {a.savvy === null ? (
                      <button
                        type="button"
                        onClick={() => say(`Running the ${a.name} report`)}
                        className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[#52A5CE] hover:underline"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Run report
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => say(`Opened the ${a.name} register`)}
                        className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[#52A5CE] hover:underline"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        View register
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => (menu?.id === a.id ? setMenu(null) : openMenuFor(a.id, e.currentTarget))}
                      aria-label={`Actions for ${a.name}`}
                      aria-expanded={menu?.id === a.id}
                      aria-haspopup="menu"
                      className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The menu lives in a portal: inside the table it would be cropped by the card's
          own `overflow-hidden` and by the table's horizontal scroller. */}
      {menu &&
        menuAccount &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: 'fixed', top: menu.top, left: menu.left, width: MENU_WIDTH }}
            className="z-[100] flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => say(`Opened ${menuAccount.name}`)}
              className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-xs text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Eye className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
              View
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => say(`Editing ${menuAccount.name}`)}
              className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-xs text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Pencil className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
              Edit
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => toggleStatus(menuAccount)}
              className={`flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
                menuAccount.active ? 'text-slate-700 dark:text-slate-200' : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {menuAccount.active ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4 shrink-0 text-amber-600" />
                  Mark Inactive
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-emerald-600" />
                  Mark Active
                </>
              )}
            </button>
          </div>,
          document.body
        )}

      {note && (
        <div
          role="status"
          className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
        >
          {note}
        </div>
      )}
    </div>
  );
}
