'use client';

import React from 'react';

type AccountClass = 'Asset' | 'Liability' | 'Equity' | 'Expense' | 'Income';

interface Account {
  id: string;
  name: string;
  cls: AccountClass;
  type: string;
  detail: string;
  owner: string;
  savvy: number | null;
  bank: number;
  active: boolean;
}

const CLASS_TINT: Record<AccountClass, string> = {
  Asset: '#52A5CE',
  Liability: '#e11d48',
  Equity: '#64748b',
  Expense: '#f59e0b',
  Income: '#10b981',
};

const ACCOUNTS: Account[] = [
  { id: 'a1', name: 'Primary Checking', cls: 'Asset', type: 'Bank Account', detail: 'Checking', owner: 'Joint', savvy: 5184.00, bank: 5184.00, active: true },
  { id: 'a2', name: 'High-Yield Savings', cls: 'Asset', type: 'Bank Account', detail: 'Savings', owner: 'Joint', savvy: 11800.00, bank: 11800.00, active: true },
  { id: 'a3', name: 'Preferred Credit Card', cls: 'Liability', type: 'Credit Card', detail: 'Credit Card', owner: 'Joint', savvy: -2740.21, bank: -2740.21, active: true },
  { id: 'a4', name: 'Opening Balance', cls: 'Equity', type: 'Equity', detail: 'Opening Balance', owner: 'Joint', savvy: null, bank: 0, active: true },
  { id: 'a5', name: 'Household Allowances', cls: 'Expense', type: 'Personal Expense', detail: 'Family & Lifestyle', owner: 'Joint', savvy: null, bank: 0, active: true },
];

const money = (n: number) => {
  const abs = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${n < 0 ? '-' : ''}$${abs}`;
};

const plain = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const signClass = (n: number, positive: string) => (n < 0 ? 'text-red-600 dark:text-red-400' : positive);

const SORTABLE = ['Account Name', 'Class', 'Type', 'Detail', 'Owner', 'Savvy Balance', 'Bank Balance'];

function SortGlyph() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="ml-1 h-2.5 w-2.5 shrink-0 text-slate-400">
      <path d="M4 4.5 6 2l2 2.5M4 7.5 6 10l2-2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LiveAccountsLedgerPreview() {
  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left font-sans shadow-xl select-none pointer-events-none dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header without scope buttons */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-3.5 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Accounts</p>
        </div>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Overview</span>
      </div>

      {/* Table without Register / Report & 3 dots */}
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[840px] border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800/60">
            <tr className="h-9 text-xs">
              <th className="w-12 px-4 py-2 font-semibold text-slate-600 dark:text-slate-300">Icon</th>
              {SORTABLE.map((label) => {
                const right = label === 'Savvy Balance' || label === 'Bank Balance';
                return (
                  <th
                    key={label}
                    className={`whitespace-nowrap px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 ${right ? 'text-right' : ''}`}
                  >
                    <span className={`flex items-center ${right ? 'justify-end' : ''}`}>
                      {label}
                      <SortGlyph />
                    </span>
                  </th>
                );
              })}
              <th className="px-4 py-2 text-center font-semibold text-slate-600 dark:text-slate-300">Status</th>
            </tr>
          </thead>

          <tbody>
            {ACCOUNTS.map((a) => (
              <tr
                key={a.id}
                className="h-10 border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-4 py-1.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs"
                    style={{ backgroundColor: CLASS_TINT[a.cls] }}
                  >
                    {a.name.charAt(0)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-1.5 text-xs font-semibold text-slate-900 dark:text-white">{a.name}</td>
                <td className="whitespace-nowrap px-4 py-1.5 text-xs text-slate-600 dark:text-slate-400">{a.cls}</td>
                <td className="whitespace-nowrap px-4 py-1.5 text-xs text-slate-600 dark:text-slate-400">{a.type}</td>
                <td className="whitespace-nowrap px-4 py-1.5 text-xs text-slate-600 dark:text-slate-400">{a.detail}</td>
                <td className="whitespace-nowrap px-4 py-1.5 text-xs text-slate-600 dark:text-slate-400">{a.owner}</td>
                <td
                  className={`whitespace-nowrap px-4 py-1.5 text-right text-xs font-semibold ${
                    a.savvy === null ? '' : signClass(a.savvy, 'text-slate-900 dark:text-white')
                  }`}
                >
                  {a.savvy === null ? <span className="text-slate-400">—</span> : plain(a.savvy)}
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-1.5 text-right text-xs font-semibold ${signClass(
                    a.bank,
                    'text-slate-700 dark:text-slate-200'
                  )}`}
                >
                  {money(a.bank)}
                </td>
                <td className="px-4 py-1.5 text-center">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compact responsive card list for screens narrower than xl */}
      <ul className="grid gap-3 p-3.5 sm:grid-cols-2 xl:hidden">
        {ACCOUNTS.map((a) => (
          <li
            key={a.id}
            className="space-y-2.5 rounded-xl border border-slate-200 p-3.5 dark:border-slate-700"
          >
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-xs"
                style={{ backgroundColor: CLASS_TINT[a.cls] }}
              >
                {a.name.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{a.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                  {a.cls} · {a.type} · {a.detail}
                </span>
              </span>
              <span
                className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  a.active
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {a.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <div className="min-w-0">
                <dt className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Savvy Balance</dt>
                <dd
                  className={`truncate text-sm font-semibold tabular-nums ${
                    a.savvy === null ? 'text-slate-400' : signClass(a.savvy, 'text-slate-900 dark:text-white')
                  }`}
                >
                  {a.savvy === null ? '—' : plain(a.savvy)}
                </dd>
              </div>
              <div className="min-w-0 text-right">
                <dt className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Bank Balance</dt>
                <dd
                  className={`truncate text-sm font-semibold tabular-nums ${signClass(
                    a.bank,
                    'text-slate-700 dark:text-slate-200'
                  )}`}
                >
                  {money(a.bank)}
                </dd>
              </div>
            </dl>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Owner: {a.owner}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
