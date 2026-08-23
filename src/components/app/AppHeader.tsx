'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFirstSavvyStore } from '@/lib/store';
import { NotificationsPopover } from './NotificationsPopover';
import { GlobalSearch } from '../search/GlobalSearch';
import {
  Menu,
  Search,
  Share2,
  RotateCcw,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  Shield
} from 'lucide-react';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AppHeader({ onOpenMobileMenu }: AppHeaderProps) {
  const router = useRouter();
  const { state, activeProfile, resetToDemoData } = useFirstSavvyStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Lock body scroll while the reset sheet is open (spec §10)
  useEffect(() => {
    if (!resetConfirm) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [resetConfirm]);

  const handleReset = () => {
    resetToDemoData();
    setResetConfirm(false);
    router.push('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Side: Mobile Menu Button & Search Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 -ml-2 rounded-xl text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search — icon-only button below sm, full field from sm up */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search household"
            className="inline-flex items-center justify-center sm:justify-start gap-2 min-h-[44px] min-w-[44px] shrink-0 sm:w-56 lg:w-64 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-400 hover:border-brand-sky hover:text-slate-600 dark:hover:text-slate-200 transition-all"
          >
            <Search className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="hidden sm:inline truncate">Search household...</span>
            <kbd className="ml-auto hidden lg:inline-block shrink-0 px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-[11px] font-mono text-slate-400 border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
          {/* Reset Demo Data Button — lg and up so the tablet band stays clean */}
          <button
            onClick={() => setResetConfirm(true)}
            title="Reset sandbox to fictional demo data"
            className="hidden lg:inline-flex items-center justify-center gap-1 min-h-[44px] text-[11px] font-bold text-slate-400 hover:text-brand-sky px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>Reset Demo</span>
          </button>

          {/* Referral Button — lg and up */}
          <Link
            href="/referral"
            className="hidden lg:inline-flex items-center justify-center gap-1.5 min-h-[44px] text-xs font-bold text-brand-navy dark:text-slate-200 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-brand-sky transition-colors whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5 shrink-0 text-brand-sky" />
            <span>Refer Family</span>
          </Link>

          {/* Notifications Popover */}
          <NotificationsPopover />

          <div className="hidden sm:block h-6 w-px shrink-0 bg-slate-200 dark:bg-slate-700" />

          {/* Active Profile Chip */}
          <Link
            href="/profiles"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div
              className="w-7 h-7 shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center"
              style={{ backgroundColor: activeProfile.avatarColor }}
            >
              {activeProfile.displayName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-brand-navy dark:text-white hidden lg:inline max-w-[10rem] truncate">
              {activeProfile.displayName}
            </span>
          </Link>
        </div>
      </header>

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Reset Confirmation Modal — bottom sheet below sm, centred from sm (spec §10) */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div
            className="w-full sm:max-w-md max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-3 sm:space-y-4 text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Reset demo data"
          >
            <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-brand-navy dark:text-white">Reset Demo Data?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              This will restore all default fictional accounts, 3 months of transactions, tasks, star ledger, and Miller family profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="w-full sm:flex-1 inline-flex items-center justify-center min-h-[44px] px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:flex-1 inline-flex items-center justify-center min-h-[44px] px-4 rounded-xl bg-brand-navy text-white dark:bg-brand-sky dark:text-slate-900 text-xs font-bold shadow"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
