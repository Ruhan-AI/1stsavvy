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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-sky shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, transactions, contacts, tasks, goals..."
            className="flex-1 bg-transparent text-sm text-brand-navy dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {!query ? (
            <div className="text-center py-8 text-xs text-slate-400 space-y-2">
              <p>Type keywords or click any tag to search across your entire FirstSavvy household.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Checking', 'Groceries', 'Mortgage', 'Bike', 'Homework', 'Piano', 'Advisor'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-sky hover:text-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors font-medium"
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
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
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Landmark className="w-4 h-4 text-brand-sky" />
                        <div>
                          <div className="text-xs font-bold text-brand-navy dark:text-white">{acc.name}</div>
                          <div className="text-[11px] text-slate-500">{acc.institutionName} • {acc.accountNumberMasked}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
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
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="text-xs font-bold text-brand-navy dark:text-white">{tx.description}</div>
                          <div className="text-[11px] text-slate-500">{tx.categoryName} • {tx.date}</div>
                        </div>
                      </div>
                      <span className={`font-mono text-xs font-bold ${tx.amountCents > 0 ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
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
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                        <div>
                          <div className="text-xs font-bold text-brand-navy dark:text-white">{t.title}</div>
                          <div className="text-[11px] text-slate-500">{t.schedule} schedule</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-500">+{t.starValue} Stars</span>
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
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <div className="text-xs font-bold text-brand-navy dark:text-white">{g.title}</div>
                      </div>
                      <span className="text-xs font-bold text-brand-sky">View Goal →</span>
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
