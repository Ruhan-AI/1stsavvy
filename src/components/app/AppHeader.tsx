'use client';

import React, { useState } from 'react';
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

  const handleReset = () => {
    resetToDemoData();
    setResetConfirm(false);
    router.push('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side: Mobile Menu Button & Search Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-400 hover:border-brand-sky hover:text-slate-600 dark:hover:text-slate-200 transition-all sm:w-64"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="truncate">Search household...</span>
            <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset Demo Data Button */}
          <button
            onClick={() => setResetConfirm(true)}
            title="Reset sandbox to fictional demo data"
            className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-brand-sky px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Referral Button */}
          <Link
            href="/referral"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-brand-navy dark:text-slate-200 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-brand-sky transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-sky" />
            <span>Refer Family</span>
          </Link>

          {/* Notifications Popover */}
          <NotificationsPopover />

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Active Profile Chip */}
          <Link
            href="/profiles"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
              style={{ backgroundColor: activeProfile.avatarColor }}
            >
              {activeProfile.displayName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-brand-navy dark:text-white hidden md:inline">
              {activeProfile.displayName}
            </span>
          </Link>
        </div>
      </header>

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-sky-50 text-brand-sky flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Reset Demo Data?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              This will restore all default fictional accounts, 3 months of transactions, tasks, star ledger, and Miller family profiles.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="w-1/2 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="w-1/2 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
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
