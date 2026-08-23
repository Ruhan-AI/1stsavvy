'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney, formatDate } from '@/lib/utils/format';
import { 
  PLAID_SANDBOX_INSTITUTIONS, 
  PLAID_MOCK_ACCOUNTS 
} from '@/lib/plaid';
import { 
  Landmark, 
  Wallet, 
  Plus, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Repeat, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  EyeOff
} from 'lucide-react';

export default function BankingPage() {
  const { state, addAccount, addTransaction, updateTransaction } = useFirstSavvyStore();
  const [activeTab, setActiveTab] = useState<'spending' | 'transactions' | 'rules' | 'recurring' | 'accounts'>('accounts');

  // Plaid Link Sandbox Modal State
  const [plaidModalOpen, setPlaidModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState<string | null>(null);
  const [plaidConnecting, setPlaidConnecting] = useState(false);

  // Manual Account Modal State
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState<any>('banking');
  const [accountClass, setAccountClass] = useState<'asset' | 'liability'>('asset');
  const [institutionName, setInstitutionName] = useState('');
  const [balanceInput, setBalanceInput] = useState('');

  // Transaction Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState('');

  // Transaction Rule Builder State
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [ruleCondition, setRuleCondition] = useState('');
  const [ruleCategory, setRuleCategory] = useState(state.categories[0]?.id || '');

  // Handle Plaid Connect Simulation
  const handlePlaidConnect = (instId: string) => {
    setSelectedInst(instId);
    setPlaidConnecting(true);

    setTimeout(() => {
      const inst = PLAID_SANDBOX_INSTITUTIONS.find((i) => i.id === instId);
      const mockAccs = PLAID_MOCK_ACCOUNTS[instId] || [];

      mockAccs.forEach((m) => {
        addAccount({
          ownerProfileId: state.activeProfileId,
          name: `${inst?.name || 'Bank'} ${m.name}`,
          accountClass: m.type === 'credit' || m.type === 'loan' ? 'liability' : 'asset',
          accountType: m.type === 'depository' ? 'banking' : m.type === 'credit' ? 'credit_card' : 'investments',
          institutionName: inst?.name || 'Plaid Sandbox Bank',
          accountNumberMasked: `•••• ${m.mask}`,
          balanceCents: m.balanceCents,
          currency: 'USD',
          isManual: false,
          status: 'active',
          includeInNetWorth: true,
          lastSyncedAt: new Date().toISOString(),
        });
      });

      setPlaidConnecting(false);
      setPlaidModalOpen(false);
      setSelectedInst(null);
    }, 1000);
  };

  // Handle Manual Account Creation
  const handleCreateManualAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceParsed = Math.round((parseFloat(balanceInput) || 0) * 100);

    addAccount({
      ownerProfileId: state.activeProfileId,
      name: accountName,
      accountClass,
      accountType,
      institutionName: institutionName || 'Manual Vault',
      accountNumberMasked: '•••• MAN',
      balanceCents: accountClass === 'liability' ? -Math.abs(balanceParsed) : Math.abs(balanceParsed),
      currency: 'USD',
      isManual: true,
      status: 'active',
      includeInNetWorth: true,
    });

    setManualModalOpen(false);
    setAccountName('');
    setBalanceInput('');
    setInstitutionName('');
  };

  // Filtered Transactions
  const filteredTransactions = state.transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.merchantName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tx.categoryId === categoryFilter;
    const matchesAccount = accountFilter === 'all' || tx.accountId === accountFilter;
    return matchesSearch && matchesCategory && matchesAccount;
  });

  // Bulk categorise
  const handleBulkCategorize = () => {
    if (!bulkCategory || selectedTxIds.length === 0) return;
    const cat = state.categories.find((c) => c.id === bulkCategory);
    selectedTxIds.forEach((id) => {
      updateTransaction(id, {
        categoryId: bulkCategory,
        categoryName: cat?.name,
      });
    });
    setSelectedTxIds([]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Primary Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Banking & Accounts</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Financial Accounts & Activity
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaidModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 text-brand-sky" />
            <span>Connect Bank (Plaid)</span>
          </button>

          <button
            onClick={() => setManualModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Manual Asset</span>
          </button>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'accounts', label: 'Accounts Overview', count: state.accounts.length },
          { id: 'transactions', label: 'Transactions', count: state.transactions.length },
          { id: 'spending', label: 'Spending Trends' },
          { id: 'rules', label: 'Transaction Rules', count: state.rules.length },
          { id: 'recurring', label: 'Recurring & Bills', count: state.recurring.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-navy text-white shadow-xs dark:bg-brand-sky dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 2. SUBTAB: ACCOUNTS OVERVIEW */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.accounts.map((acc) => (
              <div
                key={acc.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-sm text-brand-navy dark:text-white">{acc.name}</div>
                    <div className="text-xs text-slate-500">{acc.institutionName} • {acc.accountNumberMasked}</div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${acc.isManual ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                    {acc.isManual ? 'Manual' : 'Plaid Synced'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Balance</span>
                  <span className="text-lg font-mono font-bold text-brand-navy dark:text-white">
                    {formatMoney(acc.balanceCents, acc.currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SUBTAB: TRANSACTIONS LIST & ADVANCED SEARCH */}
      {activeTab === 'transactions' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {/* Filter / Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions by merchant or note..."
                className="min-h-[44px] w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-xs text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-xs font-semibold text-brand-navy dark:text-white focus:outline-none"
              >
                <option value="all">All Categories</option>
                {state.categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <select
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
                className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-xs font-semibold text-brand-navy dark:text-white focus:outline-none"
              >
                <option value="all">All Accounts</option>
                {state.accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions Bar (if selected) */}
          {selectedTxIds.length > 0 && (
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-brand-sky/30 flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-brand-navy dark:text-slate-100">
                {selectedTxIds.length} transactions selected
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  className="min-h-[44px] px-2.5 py-1.5 rounded-lg border border-slate-300 text-base sm:text-xs bg-white text-brand-navy"
                >
                  <option value="">Choose category...</option>
                  {state.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleBulkCategorize}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-bold"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedTxIds([])}
                  className="min-h-[44px] p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Transactions Table */}
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-2 w-8">
                    <input
                      type="checkbox"
                      checked={selectedTxIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedTxIds(filteredTransactions.map((t) => t.id));
                        else setSelectedTxIds([]);
                      }}
                      className="rounded text-brand-sky"
                    />
                  </th>
                  <th className="pb-3 px-2">Date</th>
                  <th className="pb-3 px-2">Description</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-3 px-2">
                      <input
                        type="checkbox"
                        checked={selectedTxIds.includes(tx.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTxIds([...selectedTxIds, tx.id]);
                          else setSelectedTxIds(selectedTxIds.filter((id) => id !== tx.id));
                        }}
                        className="rounded text-brand-sky"
                      />
                    </td>
                    <td className="py-3 px-2 text-slate-500 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-2 font-bold text-brand-navy dark:text-white">
                      {tx.description}
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {tx.categoryName}
                      </span>
                    </td>
                    <td className={`py-3 px-2 text-right font-mono font-bold ${tx.amountCents > 0 ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
                      {formatMoney(tx.amountCents, 'USD', true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SUBTAB: SPENDING TRENDS */}
      {activeTab === 'spending' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Spending by Category</h3>
            <div className="space-y-3">
              {[
                { cat: 'Mortgage & Rent', amount: 285000, pct: 52, color: '#324154' },
                { cat: 'Groceries & Household', amount: 95000, pct: 17, color: '#0F766E' },
                { cat: 'Dining & Takeout', amount: 45000, pct: 8, color: '#4FA3CD' },
                { cat: 'Vehicle & Gas', amount: 42000, pct: 7, color: '#64748B' },
                { cat: 'Utilities & Internet', amount: 38000, pct: 7, color: '#B45309' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item.cat}</span>
                    <span className="font-mono text-slate-600">{formatMoney(item.amount)} ({item.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">3-Month Spending Comparison</h3>
            <p className="text-xs text-slate-500">Your average monthly household expenses are $4,280.00.</p>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200">
              ✓ August spending is currently <strong>$155.10 below</strong> your 3-month rolling average.
            </div>
          </div>
        </div>
      )}

      {/* 5. SUBTAB: TRANSACTION RULES */}
      {activeTab === 'rules' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Active Categorization Rules</h3>
              <p className="text-xs text-slate-500">Rules automatically organize recurring merchants as transactions import.</p>
            </div>
            <button
              onClick={() => setRuleModalOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold inline-flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Rule</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {state.rules.map((rule) => (
              <div key={rule.id} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-brand-navy dark:text-white">{rule.name}</div>
                  <div className="text-[11px] text-slate-500">
                    If merchant contains "{rule.descriptionCondition}" → categorize as {state.categories.find((c) => c.id === rule.targetCategoryId)?.name || 'Category'}
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SUBTAB: RECURRING BILLS */}
      {activeTab === 'recurring' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Detected & Recurring Items</h3>
              <p className="text-xs text-slate-500">Recurring bills and salary deposits linked with your financial calendar.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.recurring.map((rec) => (
              <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-brand-navy dark:text-white">{rec.name}</div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${rec.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {rec.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <span className="text-slate-500">Next: {rec.nextDate} ({rec.cadence})</span>
                  <span className="font-mono font-bold text-brand-navy dark:text-white">
                    {formatMoney(rec.expectedAmountCents)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLAID LINK SANDBOX MODAL */}
      {plaidModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Plaid Link (Sandbox)</h3>
              </div>
              <button onClick={() => setPlaidModalOpen(false)} className="min-h-[44px] text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Select a test institution to simulate read-only token exchange and account import without live credentials.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {PLAID_SANDBOX_INSTITUTIONS.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => handlePlaidConnect(inst.id)}
                  disabled={plaidConnecting}
                  className="min-h-[44px] w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs font-bold text-brand-navy dark:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-brand-sky" />
                    <span>{inst.name}</span>
                  </div>
                  {selectedInst === inst.id && plaidConnecting ? (
                    <span className="text-[11px] text-brand-sky animate-pulse">Connecting...</span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Connect →</span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Default Sandbox Credentials: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">user_good</code> / <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">pass_good</code>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ACCOUNT MODAL */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Add Manual Asset or Liability</h3>
              <button onClick={() => setManualModalOpen(false)} className="min-h-[44px] text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualAccount} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Account / Asset Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                  placeholder="e.g. 2024 Honda Pilot or Vacation Cabin"
                  className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Class</label>
                  <select
                    value={accountClass}
                    onChange={(e) => setAccountClass(e.target.value as any)}
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="asset">Asset (Positive value)</option>
                    <option value="liability">Liability (Debt / Loan)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Category Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as any)}
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="banking">Cash / Checking</option>
                    <option value="savings">Savings Account</option>
                    <option value="property">Real Estate Property</option>
                    <option value="vehicle">Vehicle Valuation</option>
                    <option value="investments">Investments</option>
                    <option value="loans_debts">Loan / Debt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Estimated Current Value ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={balanceInput}
                  onChange={(e) => setBalanceInput(e.target.value)}
                  required
                  placeholder="35000.00"
                  className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="min-h-[44px] w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] w-1/2 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
