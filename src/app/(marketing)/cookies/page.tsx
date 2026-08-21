'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Save } from 'lucide-react';

export default function CookiePreferencesPage() {
  const [essential] = useState(true); // Always true and locked
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('firstsavvy_cookie_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalytics(parsed.analytics ?? false);
        setPreferences(parsed.preferences ?? true);
      }
    } catch (e) {}
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem(
        'firstsavvy_cookie_consent',
        JSON.stringify({
          essential: true,
          analytics,
          preferences,
          updatedAt: new Date().toISOString(),
        })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 space-y-12">
      <div className="space-y-3 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Privacy Controls</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Cookie Preferences</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Manage how cookies and local storage tokens are used on FirstSavvy. We only use essential session cookies by default.
        </p>
      </div>

      <div className="space-y-6">
        {/* Essential Cookies */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-brand-navy dark:text-white">Essential Cookies</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Always Active
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Required for secure adult and child login authentication, CSRF security tokens, and preserving active household state.
            </p>
          </div>
          <input
            type="checkbox"
            checked={essential}
            disabled
            className="w-5 h-5 rounded text-brand-sky opacity-75 cursor-not-allowed mt-1"
          />
        </div>

        {/* Functional & Preference Cookies */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="font-serif font-bold text-lg text-brand-navy dark:text-white">Preference Storage</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Remembers your selected household profile, dark/light theme, and currency display preferences across visits.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences}
            onChange={(e) => setPreferences(e.target.checked)}
            className="w-5 h-5 rounded text-brand-sky focus:ring-brand-sky cursor-pointer mt-1"
          />
        </div>

        {/* Analytics Cookies */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="font-serif font-bold text-lg text-brand-navy dark:text-white">Anonymous Telemetry & Error Logs</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Helps our engineers diagnose performance bottlenecks and catch bugs. Never includes financial account numbers or child PII.
            </p>
          </div>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="w-5 h-5 rounded text-brand-sky focus:ring-brand-sky cursor-pointer mt-1"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-500">
          {saved && <span className="text-emerald-600 font-bold">✓ Preferences successfully saved!</span>}
        </div>
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow transition-colors"
        >
          <Save className="w-4 h-4 text-brand-sky" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
}
