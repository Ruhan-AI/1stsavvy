'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney } from '@/lib/utils/format';
import {
  Search,
  X,
  Wallet,
  Landmark,
  Users,
  CheckCircle2,
  Target,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const { state } = useFirstSavvyStore();
  const [query, setQuery] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by caller
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while the command sheet is open (spec §10)
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search accounts
  const matchingAccounts = q
    ? state.accounts.filter((a) => a.name.toLowerCase().includes(q) || a.institutionName.toLowerCase().includes(q))
    : [];

  // Search transactions
  const matchingTransactions = q
    ? state.transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.categoryName?.toLowerCase().includes(q) ||
          t.merchantName?.toLowerCase().includes(q)
      )
    : [];

  // Search contacts
  const matchingContacts = q
    ? state.contacts.filter((c) => c.name.toLowerCase().includes(q) || c.relationship.toLowerCase().includes(q))
    : [];

  // Search tasks
  const matchingTasks = q
    ? state.tasks.filter((t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q))
    : [];

  // Search goals
  const matchingGoals = q
    ? state.goals.filter((g) => g.title.toLowerCase().includes(q))
    : [];

  const totalMatches =
    matchingAccounts.length +
    matchingTransactions.length +
    matchingContacts.length +
    matchingTasks.length +
    matchingGoals.length;

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-start justify-center p-0 sm:px-4 sm:pt-20 animate-in fade-in duration-150">
      <div
        className="w-full sm:max-w-2xl max-h-[85dvh] bg-white dark:bg-[#1E293B] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Search household"
      >
        {/* Search Input Bar */}
        <div className="shrink-0 p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 sm:gap-3">
          <Search className="w-5 h-5 text-brand-sky shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, transactions, contacts, tasks, goals..."
            className="flex-1 min-w-0 min-h-[44px] bg-transparent text-base sm:text-sm text-brand-navy dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block shrink-0 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-4">
          {!query ? (
            <div className="text-center py-8 text-xs sm:text-sm text-slate-400 space-y-2">
              <p>Type keywords or click any tag to search across your entire First Savvy household.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Checking', 'Groceries', 'Mortgage', 'Bike', 'Homework', 'Piano', 'Advisor'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setQuery(chip)}
                    className="inline-flex items-center justify-center min-h-[36px] px-3 rounded-lg bg-slate-100 hover:bg-brand-sky hover:text-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors font-medium whitespace-nowrap"
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-10 text-xs sm:text-sm text-slate-500 break-words">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Accounts */}
              {matchingAccounts.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Accounts</div>
                  {matchingAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleNavigate('/banking')}
                      className="w-full min-h-[44px] p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between gap-2 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Landmark className="w-4 h-4 shrink-0 text-brand-sky" />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white line-clamp-2 xl:line-clamp-none xl:truncate">{acc.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 xl:line-clamp-none xl:truncate">{acc.institutionName} • {acc.accountNumberMasked}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0 whitespace-nowrap tabular-nums">
                        {formatMoney(acc.balanceCents, acc.currency)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Transactions */}
              {matchingTransactions.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Transactions</div>
                  {matchingTransactions.slice(0, 5).map((tx) => (
                    <button
                      key={tx.id}
                      onClick={() => handleNavigate('/banking')}
                      className="w-full min-h-[44px] p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between gap-2 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Wallet className="w-4 h-4 shrink-0 text-emerald-600" />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white line-clamp-2 xl:line-clamp-none xl:truncate">{tx.description}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 xl:line-clamp-none xl:truncate">{tx.categoryName} • {tx.date}</div>
                        </div>
                      </div>
                      <span className={`font-mono text-xs font-bold shrink-0 whitespace-nowrap tabular-nums ${tx.amountCents > 0 ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
                        {formatMoney(tx.amountCents, 'USD', true)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Tasks */}
              {matchingTasks.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Tasks & Chores</div>
                  {matchingTasks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleNavigate('/profiles')}
                      className="w-full min-h-[44px] p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between gap-2 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-sky" />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white line-clamp-2 xl:line-clamp-none xl:truncate">{t.title}</div>
                          <div className="text-[11px] text-slate-500 truncate">{t.schedule} schedule</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-500 shrink-0 whitespace-nowrap tabular-nums">+{t.starValue} Stars</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Goals */}
              {matchingGoals.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Goals & Savings</div>
                  {matchingGoals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleNavigate('/goals')}
                      className="w-full min-h-[44px] p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between gap-2 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Target className="w-4 h-4 shrink-0 text-emerald-600" />
                        <div className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white min-w-0 line-clamp-2 xl:line-clamp-none xl:truncate">{g.title}</div>
                      </div>
                      <span className="text-xs font-bold text-brand-sky shrink-0 whitespace-nowrap">View Goal →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
