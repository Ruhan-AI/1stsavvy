'use client';

import React, { useState } from 'react';
import { ChevronRight, Plus, RotateCcw, RotateCw, Trash2 } from 'lucide-react';

/**
 * Marketing stand-in for the app's Integrations page.
 *
 * Mirrors `src/pages/Integrations.jsx`: the Integrations heading and its one-line
 * explanation, Add Bank opening the connect panel, and one card per linked institution
 * carrying its own Sync Now / Reconnect / Disconnect controls.
 *
 * Nothing here talks to a bank — Add Bank links a canned institution so the card can be
 * seen filling up, and every control reports what it did in the strip at the bottom.
 */

interface Bank {
  id: string;
  name: string;
  initial: string;
  tint: string;
  accounts: number;
  synced: string;
  active: boolean;
}

const SEED: Bank[] = [
  { id: 'b1', name: 'Mercury', initial: 'M', tint: '#52A5CE', accounts: 1, synced: '7 days ago', active: true },
];

/** What Add Bank links next, in order, so repeat clicks stay believable. */
const NEXT_BANKS = [
  { name: 'Chase', initial: 'C', tint: '#117ACA' },
  { name: 'Ally Bank', initial: 'A', tint: '#7B2CBF' },
  { name: 'Fidelity', initial: 'F', tint: '#0F766E' },
];

/**
 * US national format as you type: (555) 123-4567. Digits only, capped at ten, and the
 * punctuation is rebuilt from scratch on every keystroke so backspacing never strands a
 * bracket or a dash.
 */
const formatUsPhone = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const ghostBtn =
  'inline-flex min-h-[36px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';

export function LiveIntegrationsPreview() {
  const [banks, setBanks] = useState<Bank[]>(SEED);
  const [connectOpen, setConnectOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const say = (message: string) => {
    setNote(message);
    window.setTimeout(() => setNote((current) => (current === message ? null : current)), 2600);
  };

  const linkBank = () => {
    const next = NEXT_BANKS[(banks.length - 1) % NEXT_BANKS.length];
    setBanks((current) => [
      ...current,
      { id: 'b' + Date.now(), ...next, accounts: 2, synced: 'just now', active: true },
    ]);
    setConnectOpen(false);
    setPhone('');
    say(`Linked ${next.name}`);
  };

  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] text-left font-sans shadow-xl select-none dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="space-y-4 p-4 sm:p-5">
        {/* Add Bank stays on the heading's row from sm up, the way the app shows it; on a
            phone there is no room for both, so it drops beneath. */}
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">Integrations</h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Connect your banks to automatically import transactions and sync balances.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConnectOpen((v) => !v)}
            aria-expanded={connectOpen}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-[#52A5CE] px-4 text-sm font-bold text-white shadow-2xs transition-colors hover:bg-[#438fb6]"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">{connectOpen ? 'Cancel' : 'Add Bank'}</span>
          </button>
        </div>

        {/* The handoff the real Add Bank button opens */}
        {connectOpen && (
          <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-2xs dark:border-slate-700 dark:bg-slate-800">
            <h4 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl dark:text-white">
              Connect your bank account
            </h4>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-1 dark:border-slate-600">
              <span className="shrink-0 text-sm font-semibold text-slate-700 dark:text-slate-200">+1</span>
              <input
                value={phone}
                onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={14}
                placeholder="(555) 123-4567"
                aria-label="Phone number"
                className="h-11 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:h-10 sm:text-sm dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={linkBank}
              className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#52A5CE] px-4 text-sm font-bold text-white transition-colors hover:bg-[#438fb6]"
            >
              Continue
            </button>
            <p className="text-[11px] leading-relaxed text-slate-400">
              By selecting Continue you agree to the End User Privacy Policy.
            </p>
          </div>
        )}

        {banks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No banks connected</p>
            <p className="mt-1 text-xs text-slate-400">Add a bank to start importing transactions.</p>
          </div>
        ) : (
          banks.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-700 dark:bg-slate-800"
            >
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
                    <span className="text-base font-bold text-slate-900 dark:text-white">{b.name}</span>
                    <span
                      /* §5: 11px is the floor on mobile, so this badge does not shrink to 10 */
                      className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                        b.active
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {b.active ? 'Active' : 'Disconnected'}
                    </span>
                  </span>
                  <span className="mt-0.5 block break-words text-xs text-slate-500 dark:text-slate-400">
                    {b.accounts} unique linked account{b.accounts === 1 ? '' : 's'} • Synced {b.synced}
                  </span>
                </span>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${expanded === b.id ? 'rotate-90' : ''}`}
                />
              </button>

              {expanded === b.id && (
                <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-700">
                  {['Checking ••••1234', 'Savings ••••9021'].slice(0, b.accounts).map((a) => (
                    <p key={a} className="text-xs text-slate-500 dark:text-slate-400">
                      {a}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
                <span className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBanks((p) => p.map((x) => (x.id === b.id ? { ...x, synced: 'just now', active: true } : x)));
                      say(`Synced ${b.name}`);
                    }}
                    className={ghostBtn}
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span className="whitespace-nowrap">Sync Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBanks((p) => p.map((x) => (x.id === b.id ? { ...x, active: true, synced: 'just now' } : x)));
                      say(`Reconnected ${b.name}`);
                    }}
                    className={ghostBtn}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="whitespace-nowrap">Reconnect</span>
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setBanks((p) => p.filter((x) => x.id !== b.id));
                    say(`Disconnected ${b.name}`);
                  }}
                  className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="whitespace-nowrap">Disconnect</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {note && (
        <div
          role="status"
          className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
        >
          {note}
        </div>
      )}
    </div>
  );
}
