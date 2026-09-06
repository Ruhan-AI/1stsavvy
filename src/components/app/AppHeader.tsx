'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useFirstSavvyStore } from '@/lib/store';
import { NotificationsPopover } from './NotificationsPopover';
import { GlobalSearch } from '../search/GlobalSearch';
import {
  Menu,
  Search,
  Share2,
  Star,
  User,
  Sparkles
} from 'lucide-react';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AppHeader({ onOpenMobileMenu }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, activeProfile, setActiveProfile } = useFirstSavvyStore();
  const [searchOpen, setSearchOpen] = useState(false);

  const isKidView = pathname.startsWith('/kid-view') || activeProfile.isChild;

  const switchToParentView = () => {
    const parentProfile = state.profiles.find((p) => !p.isChild);
    if (parentProfile) {
      setActiveProfile(parentProfile.id);
    }
    router.push('/dashboard');
  };

  const switchToEmmaView = () => {
    const childProfile = state.profiles.find((p) => p.isChild) || state.profiles[0];
    if (childProfile) {
      setActiveProfile(childProfile.id);
    }
    router.push('/kid-view');
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-[#060D17]/95 backdrop-blur-md border-b border-[#142338] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 select-none">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Icon-only below sm — a fixed w-48 here was pushing the header to 440px on
              every app route; it grows into a real field from sm up. */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search household"
            className="inline-flex items-center justify-center sm:justify-between gap-2 min-h-[44px] min-w-[44px] shrink-0 sm:w-56 lg:w-72 sm:px-3.5 rounded-xl border border-[#172A42] bg-[#0A1626] text-xs text-slate-400 hover:border-cyan-500/50 hover:text-slate-200 transition-all"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="hidden sm:inline truncate">Search household, chores...</span>
            </div>
            <kbd className="hidden lg:inline-block shrink-0 px-1.5 py-0.5 rounded bg-[#112338] text-[10px] font-mono text-slate-400 border border-[#1C3352]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: View Switcher (Parent View vs Child View Emma) & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-[#091524] p-1 rounded-full border border-[#172C46]">
            {/* Parent View Button */}
            {/* Labels shorten on small screens: the full pair is ~380px, which alone
                overflowed a 320px viewport. Full wording returns from lg. */}
            <button
              onClick={switchToParentView}
              className={`inline-flex items-center justify-center min-h-[36px] px-3 sm:px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                !isKidView
                  ? 'bg-[#00B4D8] text-[#060D17] shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="lg:hidden">Parent</span>
              <span className="hidden lg:inline">Parent View (Full Finance)</span>
            </button>

            {/* Child View Button */}
            <button
              onClick={switchToEmmaView}
              className={`inline-flex items-center justify-center min-h-[36px] px-3 sm:px-4 rounded-full text-xs font-bold gap-1.5 whitespace-nowrap transition-all ${
                isKidView
                  ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 shrink-0 ${isKidView ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
              <span className="lg:hidden">Child</span>
              <span className="hidden lg:inline">Child View (Emma)</span>
            </button>
          </div>

          {/* User Profile Avatar Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#16273E]">
            <div className="w-7 h-7 rounded-full bg-cyan-500 text-[#060D17] text-xs font-extrabold flex items-center justify-center shrink-0">
              P
            </div>
            <span className="text-xs font-bold text-slate-200 hidden md:inline">
              Sarah (Parent)
            </span>
          </div>

          {/* Notifications */}
          <NotificationsPopover />
        </div>
      </header>

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
