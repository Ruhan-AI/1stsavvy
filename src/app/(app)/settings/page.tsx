'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { 
  Settings, 
  User, 
  Home, 
  Bell, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Check, 
  Save,
  RotateCcw
} from 'lucide-react';

export default function SettingsPage() {
  const { state, updateProfile, resetToDemoData } = useFirstSavvyStore();

  const [firstName, setFirstName] = useState(state.currentUser.firstName);
  const [lastName, setLastName] = useState(state.currentUser.lastName);
  const [email, setEmail] = useState(state.currentUser.email);
  const [householdName, setHouseholdName] = useState(state.currentHousehold.name);
  const [currency, setCurrency] = useState(state.currentHousehold.currency);
  const [timezone, setTimezone] = useState(state.currentHousehold.timezone);

  // Notification Toggles
  const [notifTasks, setNotifTasks] = useState(true);
  const [notifBills, setNotifBills] = useState(true);
  const [notifBudgets, setNotifBudgets] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `First_Savvy_Household_Export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Account & Preferences</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
          Household & Profile Settings
        </h1>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Household settings successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. Adult Personal Profile */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="w-4 h-4 text-brand-sky" />
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Personal Account</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-brand-navy dark:text-slate-200">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-brand-navy dark:text-slate-200">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-brand-navy dark:text-slate-200">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>
        </div>

        {/* 2. Household Environment */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Home className="w-4 h-4 text-brand-sky" />
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Household Configuration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-brand-navy dark:text-slate-200">Household Name</label>
              <input
                type="text"
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-brand-navy dark:text-slate-200">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="CAD">CAD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-brand-navy dark:text-slate-200">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
              >
                <option value="America/New_York">Eastern (EST)</option>
                <option value="America/Chicago">Central (CST)</option>
                <option value="America/Denver">Mountain (MST)</option>
                <option value="America/Los_Angeles">Pacific (PST)</option>
                <option value="Europe/London">London (GMT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Bell className="w-4 h-4 text-brand-sky" />
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Notification Alerts</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <span>Task completion & child approval requests</span>
              <input
                type="checkbox"
                checked={notifTasks}
                onChange={(e) => setNotifTasks(e.target.checked)}
                className="w-4 h-4 rounded text-brand-sky"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <span>Recurring bill due date reminders (3 days before)</span>
              <input
                type="checkbox"
                checked={notifBills}
                onChange={(e) => setNotifBills(e.target.checked)}
                className="w-4 h-4 rounded text-brand-sky"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <span>Budget threshold alerts (80%+ utilization)</span>
              <input
                type="checkbox"
                checked={notifBudgets}
                onChange={(e) => setNotifBudgets(e.target.checked)}
                className="w-4 h-4 rounded text-brand-sky"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4 text-brand-sky" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* 4. Data Export & Account Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Household Data & Exports</h3>
        <p className="text-xs text-slate-500">
          Download your complete household archive, including accounts, transactions, budgets, tasks, and immutable star ledger entries.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleExportAll}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center gap-2 hover:bg-slate-50"
          >
            <Download className="w-4 h-4 text-brand-sky" />
            <span>Export Complete Household (JSON)</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset sandbox to default Miller Family demo data?')) {
                resetToDemoData();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-800 inline-flex items-center gap-2 hover:bg-amber-100"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Sandbox</span>
          </button>
        </div>
      </div>
    </div>
  );
}
