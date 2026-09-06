'use client';

import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Shield, 
  Tag, 
  Plus, 
  X, 
  Sparkles,
  CreditCard,
  Landmark,
  ArrowUpRight,
  ArrowDownLeft,
  SlidersHorizontal,
  FileText,
  Check
} from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  cat: string;
  type: 'Deposit' | 'Expense' | 'Transfer';
  amount: string;
  status: 'posted' | 'pending';
  date: string;
  account: string;
  catColor: string;
}

export function LiveTransactionsTablePreview() {
  const [filter, setFilter] = useState<'all' | 'posted' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modal form states
  const [newMerchant, setNewMerchant] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Groceries');
  const [newType, setNewType] = useState<'Expense' | 'Income' | 'Transfer'>('Expense');
  const [newAccount, setNewAccount] = useState('Chase Checking ...4921');

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', type: 'Deposit', amount: '+$4,750.00', status: 'posted', date: 'Aug 22, 2026', account: 'Chase Checking ...4921', catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' },
    { id: '2', name: 'Whole Foods Market — Columbus', cat: 'Groceries', type: 'Expense', amount: '-$164.50', status: 'posted', date: 'Aug 21, 2026', account: 'Sapphire Preferred ...8812', catColor: 'bg-sky-50 text-[#52A5CE] border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800' },
    { id: '3', name: 'Rocket Mortgage Escrow', cat: 'Housing', type: 'Expense', amount: '-$2,450.00', status: 'posted', date: 'Aug 18, 2026', account: 'Chase Checking ...4921', catColor: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800' },
    { id: '4', name: 'Emma Star Allowance Payout', cat: 'Family & Chores', type: 'Transfer', amount: '-$25.00', status: 'pending', date: 'Aug 22, 2026', account: 'First Savvy Star Ledger', catColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800' },
    { id: '5', name: 'Vanguard S&P 500 Auto-Invest', cat: 'Investments', type: 'Transfer', amount: '-$500.00', status: 'pending', date: 'Aug 24, 2026', account: 'Vanguard Brokerage ...1092', catColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800' },
  ]);

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Income':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
      case 'Groceries':
        return 'bg-sky-50 text-[#52A5CE] border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800';
      case 'Housing':
        return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800';
      case 'Family & Chores':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
      case 'Investments':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const handleOpenAddModal = () => {
    setNewMerchant('Trader Joe\'s');
    setNewAmount('78.50');
    setNewCategory('Groceries');
    setNewType('Expense');
    setNewAccount('Chase Checking ...4921');
    setShowAddModal(true);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchant.trim() || !newAmount) return;

    const parsedAmt = parseFloat(newAmount);
    if (isNaN(parsedAmt) || parsedAmt <= 0) return;

    const formattedAmount = newType === 'Income'
      ? `+$${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `-$${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const newTx: Transaction = {
      id: String(Date.now()),
      name: newMerchant.trim(),
      cat: newCategory,
      type: newType === 'Income' ? 'Deposit' : newType === 'Transfer' ? 'Transfer' : 'Expense',
      amount: formattedAmount,
      status: 'pending',
      date: 'Today',
      account: newAccount,
      catColor: getCategoryColor(newCategory)
    };

    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
    setNewMerchant('');
    setNewAmount('');

    setSuccessToast(`✓ Added "${newTx.name}" (${newTx.amount}) to pending transactions!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const postedCount = transactions.filter(t => t.status === 'posted').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  return (
    <div data-mock-preview className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden select-none text-left font-sans flex flex-col transition-all duration-300 min-h-[460px]">
      {/* Toast Notification */}
      {successToast && (
        <div className="absolute top-14 right-4 z-40 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-white shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Recent Transactions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Plaid Synchronized
          </span>
        </div>
      </div>

      {/* Controls Bar: Tabs, Search, Add Button */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          {/* Status Tabs (Segmented Control matching Web App) */}
          <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700 shrink-0">
            {(['all', 'posted', 'pending'] as const).map((f) => {
              const count = f === 'all' ? transactions.length : f === 'posted' ? postedCount : pendingCount;
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {f} ({count})
                </button>
              );
            })}
          </div>

          {/* Search + Add Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#52A5CE] focus:bg-white dark:focus:bg-slate-900"
              />
            </div>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#52A5CE] hover:bg-[#438fb6] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
              title="Add a new transaction"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Txn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Description &amp; Merchant</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4">Source Account</th>
              <th className="py-2.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No matching transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTxn(t)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
                    {t.date}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white group-hover:text-[#52A5CE] transition-colors">
                    {t.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${t.catColor}`}>
                      {t.cat}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {t.account}
                  </td>
                  <td className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                    t.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {t.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Transaction Detail Drawer / Banner */}
      {selectedTxn && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-sky-50/80 dark:bg-sky-950/40 flex items-center justify-between text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 break-words line-clamp-2 xl:line-clamp-none xl:truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#52A5CE] shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">
              Selected: <strong className="text-slate-900 dark:text-white">{selectedTxn.name}</strong> • {selectedTxn.account}
            </span>
            <span className={`font-bold ml-1 ${selectedTxn.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
              ({selectedTxn.amount})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTxn(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-semibold shrink-0 ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Authentic TransactionDialog Modal Overlay */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#52A5CE]/10 flex items-center justify-center text-[#52A5CE]">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Add Transaction</h4>
                  <p className="text-[11px] text-slate-500">Record a new expense or deposit</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddTransaction} className="p-4 sm:p-5 space-y-3.5 text-xs">
              {/* Type Switcher */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Type</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  {(['Expense', 'Income', 'Transfer'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        newType === t
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Merchant Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Merchant / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trader Joe's, Target, Apple"
                  value={newMerchant}
                  onChange={(e) => setNewMerchant(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#52A5CE] focus:ring-1 focus:ring-[#52A5CE]"
                />
              </div>

              {/* Amount & Category */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-full h-9 pl-7 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#52A5CE] focus:ring-1 focus:ring-[#52A5CE]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#52A5CE]"
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Housing">Housing</option>
                    <option value="Family & Chores">Family &amp; Chores</option>
                    <option value="Investments">Investments</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
              </div>

              {/* Source Account */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Source Account</label>
                <select
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#52A5CE]"
                >
                  <option value="Chase Checking ...4921">Chase Checking (...4921)</option>
                  <option value="Sapphire Preferred ...8812">Sapphire Preferred (...8812)</option>
                  <option value="Chase High Yield Savings (...9021)">Chase Savings (...9021)</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#52A5CE] hover:bg-[#438fb6] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Summary */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2 bg-slate-50/70 dark:bg-slate-900/80 text-[11px] text-slate-400">
        <span>Showing {filtered.length} of {transactions.length} records</span>
        <span className="font-semibold text-slate-600 dark:text-slate-300">Net: +$1,668.40</span>
      </div>
    </div>
  );
}
