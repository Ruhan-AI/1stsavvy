'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Circle,
  CircleCheck,
  CircleDollarSign,
  ClipboardList,
  Contact,
  FileText,
  Loader2,
  Lock,
  PiggyBank,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

/**
 * Marketing stand-in for the app's GlobalSearchDialog.
 *
 * Mirrors `src/components/common/GlobalSearchDialog.jsx` in the web app: the same eight
 * result types, the same Types/Limit controls, the same debounce and minimum query
 * length, the same row and empty-state shapes. The one real difference is the data — the
 * dialog calls `firstsavvy.search.search()`, this filters a seeded list in memory, so the
 * shape of what comes back is modelled on what globalSearch.service.js returns.
 */

const SEARCH_GROUPS = {
  accounts: { label: 'Accounts', icon: CircleDollarSign },
  transactions: { label: 'Transactions', icon: FileText },
  contacts: { label: 'Contacts', icon: Contact },
  budgets: { label: 'Budgets', icon: ClipboardList },
  goals: { label: 'Goals', icon: PiggyBank },
  journal_entries: { label: 'Journal Entries', icon: BookOpen },
  transaction_rules: { label: 'Rules', icon: SlidersHorizontal },
  vault_items: { label: 'Vault', icon: Lock },
} as const;

type SearchType = keyof typeof SEARCH_GROUPS;

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;
const LIMIT_OPTIONS = [3, 5, 10, 20];
const SEARCH_TYPES = Object.entries(SEARCH_GROUPS) as [SearchType, (typeof SEARCH_GROUPS)[SearchType]][];
const ALL_SEARCH_TYPES = SEARCH_TYPES.map(([type]) => type);

interface SearchItem {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
}

/**
 * Subtitles follow the server's own formatting: parts joined with ' - ', money through
 * Intl currency, dates as ISO day strings.
 */
const SEARCH_DATABASE: SearchItem[] = [
  // accounts — `class - account_type - account_detail`
  { id: 'acc-1', type: 'accounts', title: 'Chase Total Checking', subtitle: 'asset - bank - Primary household spend' },
  { id: 'acc-2', type: 'accounts', title: 'Chase High Yield Savings', subtitle: 'asset - bank - Emergency 6-month buffer' },
  { id: 'acc-3', type: 'accounts', title: 'Chase Sapphire Preferred', subtitle: 'liability - credit_card - Everyday household card' },
  { id: 'acc-4', type: 'accounts', title: 'Fidelity Brokerage', subtitle: 'asset - investment - Taxable growth' },
  { id: 'acc-5', type: 'accounts', title: 'Ally Vacation Savings', subtitle: 'asset - bank - Summer trip set-aside' },

  // transactions — `amount - transaction_type - account`
  { id: 'tx-1', type: 'transactions', title: 'Whole Foods Market — Columbus Circle', subtitle: '$164.50 - debit - Chase Sapphire Preferred' },
  { id: 'tx-2', type: 'transactions', title: 'Whole Foods Market — Weekly Groceries', subtitle: '$142.10 - debit - Chase Sapphire Preferred' },
  { id: 'tx-3', type: 'transactions', title: 'Acme Corp — Bi-Weekly Payroll', subtitle: '$4,750.00 - credit - Chase Total Checking' },
  { id: 'tx-4', type: 'transactions', title: 'Rocket Mortgage — Escrow Auto-Debit', subtitle: '$2,450.00 - debit - Chase Total Checking' },
  { id: 'tx-5', type: 'transactions', title: 'Emma Star Allowance Payout', subtitle: '$25.00 - debit - Chase Total Checking' },
  { id: 'tx-6', type: 'transactions', title: 'Tesla Supercharger — Ohio Station', subtitle: '$18.20 - debit - Chase Sapphire Preferred' },
  { id: 'tx-7', type: 'transactions', title: 'Salary Deposit — August', subtitle: '$4,750.00 - credit - Chase Total Checking' },

  // contacts — `contact_type - email - group_name`
  { id: 'con-1', type: 'contacts', title: 'Emma Miller', subtitle: 'child - emma@millerfamily.com - Household' },
  { id: 'con-2', type: 'contacts', title: 'Liam Miller', subtitle: 'child - liam@millerfamily.com - Household' },
  { id: 'con-3', type: 'contacts', title: 'Sarah Miller', subtitle: 'adult - sarah@millerfamily.com - Household' },

  // budgets — `amount - cadence`
  { id: 'bud-1', type: 'budgets', title: 'Groceries', subtitle: '$650.00 - monthly' },
  { id: 'bud-2', type: 'budgets', title: 'Transportation', subtitle: '$240.00 - monthly' },
  { id: 'bud-3', type: 'budgets', title: 'Kids Activities', subtitle: '$180.00 - monthly' },

  // goals — `saved of target - target_date`
  { id: 'goal-1', type: 'goals', title: 'Family Summer Trip Fund', subtitle: '$2,800.00 of $3,500.00 - 2026-06-01' },
  { id: 'goal-2', type: 'goals', title: 'Nintendo Switch OLED Bundle', subtitle: '$135.00 of $180.00 - 2026-01-15' },
  { id: 'goal-3', type: 'goals', title: 'Emergency Fund Top-Up', subtitle: '$14,000.00 of $20,000.00 - 2026-12-31' },

  // journal_entries — `#entry_number - status - entry_date`
  { id: 'je-1', type: 'journal_entries', title: 'Opening balance — Chase Total Checking', subtitle: '#JE-1004 - posted - 2026-01-02' },
  { id: 'je-2', type: 'journal_entries', title: 'Allowance accrual — August', subtitle: '#JE-1188 - posted - 2026-08-31' },

  // transaction_rules — the rule's match pattern
  { id: 'rule-1', type: 'transaction_rules', title: 'Whole Foods to Groceries', subtitle: "description contains 'WHOLEFDS'" },
  { id: 'rule-2', type: 'transaction_rules', title: 'Chase autopay to Transfer', subtitle: "description contains 'AUTOPAY CHASE'" },

  // vault_items — `category - url`
  { id: 'vault-1', type: 'vault_items', title: 'Chase Online Banking', subtitle: 'Banking - chase.com' },
  { id: 'vault-2', type: 'vault_items', title: 'Fidelity NetBenefits', subtitle: 'Investments - fidelity.com' },
];

/** The query the preview types out on its own so the card is never sitting empty. */
const DEMO_QUERY = 'Chase';

export function LiveGlobalSearchPreview() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [limitPerType, setLimitPerType] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState<SearchType[]>([...ALL_SEARCH_TYPES]);
  const [typesOpen, setTypesOpen] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const typesRef = useRef<HTMLDivElement | null>(null);
  const limitRef = useRef<HTMLDivElement | null>(null);

  const trimmedQuery = query.trim();
  const hasSearchableQuery = trimmedQuery.length >= MIN_QUERY_LENGTH;
  const allTypesSelected = selectedTypes.length === ALL_SEARCH_TYPES.length;
  const selectedTypeLabels = selectedTypes.map((type) => SEARCH_GROUPS[type].label);
  const typeSummary = allTypesSelected
    ? 'All'
    : selectedTypeLabels.length <= 4
      ? selectedTypeLabels.join(', ')
      : `${selectedTypeLabels.slice(0, 4).join(', ')} + ${selectedTypeLabels.length - 4} more`;

  // Type the demo query in a character at a time, and get out of the way the moment a
  // visitor touches anything.
  useEffect(() => {
    if (touched) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setQuery(DEMO_QUERY.slice(0, i));
      if (i >= DEMO_QUERY.length) window.clearInterval(id);
    }, 130);
    return () => window.clearInterval(id);
  }, [touched]);

  // Same debounce the dialog uses before it would hit the API.
  useEffect(() => {
    if (!hasSearchableQuery) {
      setDebouncedQuery('');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const id = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
      setIsLoading(false);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [hasSearchableQuery, trimmedQuery]);

  useEffect(() => {
    if (!typesOpen && !limitOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (typesRef.current && !typesRef.current.contains(target)) setTypesOpen(false);
      if (limitRef.current && !limitRef.current.contains(target)) setLimitOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTypesOpen(false);
        setLimitOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [typesOpen, limitOpen]);

  /** Stands in for the service response: per-type totals, then `limitPerType` items. */
  const groups = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();

    return SEARCH_TYPES.filter(([type]) => selectedTypes.includes(type))
      .map(([type, meta]) => {
        const matches = SEARCH_DATABASE.filter(
          (item) =>
            item.type === type &&
            (item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
        );
        return { type, meta, total: matches.length, items: matches.slice(0, limitPerType) };
      })
      .filter((group) => group.items.length > 0);
  }, [debouncedQuery, limitPerType, selectedTypes]);

  const totalMatches = groups.reduce((sum, group) => sum + group.total, 0);

  const markTouched = () => setTouched(true);

  const toggleSearchType = (type: SearchType) => {
    markTouched();
    setSelectedTypes((current) => {
      if (current.includes(type)) {
        return current.length === 1 ? current : current.filter((t) => t !== type);
      }
      return ALL_SEARCH_TYPES.filter((t) => current.includes(t) || t === type);
    });
  };

  const selectAllTypes = () => {
    markTouched();
    setSelectedTypes([...ALL_SEARCH_TYPES]);
  };

  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left font-sans shadow-xl select-none dark:border-slate-800 dark:bg-slate-900"
    >
      {/* DialogHeader */}
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Search</h3>
      </div>

      {/* Query + the Types and Limit controls */}
      <div className="border-b border-slate-200 p-3 dark:border-slate-800">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              markTouched();
              setQuery(e.target.value);
            }}
            onFocus={markTouched}
            placeholder="Search accounts, transactions, contacts..."
            aria-label="Search"
            className="h-11 w-full rounded-md border border-slate-200 bg-white pl-9 pr-9 text-base text-slate-800 shadow-2xs placeholder:text-slate-400 focus:border-[#52A5CE] focus:outline-none focus:ring-1 focus:ring-[#52A5CE] sm:h-10 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
          )}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_7rem]">
          {/* Types — multi-select */}
          <div className="min-w-0" ref={typesRef}>
            <div className="mb-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Types</div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  markTouched();
                  setTypesOpen((v) => !v);
                  setLimitOpen(false);
                }}
                aria-haspopup="menu"
                aria-expanded={typesOpen}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#52A5CE] sm:h-9 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="truncate">{typeSummary}</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </button>

              {typesOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-30 mt-1 w-64 max-w-[calc(100vw-3rem)] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={selectAllTypes}
                    className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    <span>Select all</span>
                    {allTypesSelected ? (
                      <CircleCheck className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />

                  {SEARCH_TYPES.map(([type, meta]) => {
                    const Icon = meta.icon;
                    const checked = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={checked}
                        onClick={() => toggleSearchType(type)}
                        className="relative flex w-full cursor-pointer items-center rounded-sm py-2 pl-8 pr-2 text-left text-sm text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {checked && <CircleCheck className="h-3.5 w-3.5 text-[#52A5CE]" />}
                        </span>
                        <Icon className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
                        <span className="truncate">{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Limit per type */}
          <div ref={limitRef}>
            <div className="mb-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Limit</div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  markTouched();
                  setLimitOpen((v) => !v);
                  setTypesOpen(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={limitOpen}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#52A5CE] sm:h-9 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <span className="truncate">{limitPerType} per type</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </button>

              {limitOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full z-30 mt-1 w-36 overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                >
                  {LIMIT_OPTIONS.map((limit) => (
                    <button
                      key={limit}
                      type="button"
                      role="option"
                      aria-selected={limit === limitPerType}
                      onClick={() => {
                        markTouched();
                        setLimitPerType(limit);
                        setLimitOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
                        limit === limitPerType
                          ? 'font-semibold text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {limit} per type
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results — the dialog's ScrollArea */}
      <div className="max-h-[340px] overflow-y-auto overscroll-contain sm:max-h-[420px]">
        <div className="p-3">
          {!hasSearchableQuery && (
            <SearchState icon={Search} title="Start a search" description="Results appear as you type." />
          )}

          {hasSearchableQuery && !isLoading && totalMatches === 0 && (
            <SearchState
              icon={Search}
              title="No results found"
              description={`No matches for "${trimmedQuery}".`}
            />
          )}

          {groups.map((group) => {
            const Icon = group.meta.icon;
            return (
              <div key={group.type} className="mb-4 last:mb-0">
                <div className="mb-2 flex items-center justify-between gap-2 px-1">
                  <div className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{group.meta.label}</span>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">{group.total}</span>
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={`${group.type}-${item.id}`}
                      type="button"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 break-words text-sm font-medium text-slate-900 xl:truncate dark:text-white">
                          {item.title}
                        </p>
                        <p className="line-clamp-2 break-words text-xs text-slate-500 xl:truncate dark:text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </button>
                  ))}
                </div>

                {group.total > group.items.length && (
                  <p className="mt-2 px-3 text-xs text-slate-400">
                    {group.total - group.items.length} more matches
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SearchState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
