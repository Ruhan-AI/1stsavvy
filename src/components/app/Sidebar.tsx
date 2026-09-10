'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FirstSavvyLogoSidebar } from '@/components/brand/FirstSavvyBrandLogo';
import { useFirstSavvyStore } from '@/lib/store';
import {
  LayoutDashboard,
  Landmark,
  PieChart,
  Target,
  Calendar,
  TrendingUp,
  Briefcase,
  Users,
  CheckSquare,
  Lock,
  Settings,
  X,
  Sparkles,
  ChevronDown,
  Plus
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AppSidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, activeProfile, setActiveProfile } = useFirstSavvyStore();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) onCloseMobile?.(); };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [onCloseMobile]);

  // Lock body scroll + close on Escape while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCloseMobile) onCloseMobile();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, onCloseMobile]);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Banking', href: '/banking', icon: Landmark },
    { name: 'Budgeting', href: '/budgeting', icon: PieChart },
    { name: 'Goals & Savings', href: '/goals', icon: Target },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Net Worth', href: '/net-worth', icon: TrendingUp },
    { name: 'Investments', href: '/investments', icon: Briefcase },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Tasks & Chores', href: '/tasks', icon: CheckSquare, badge: '4★' },
    { name: 'Password Vault', href: '/password-vault', icon: Lock },
    { name: 'Profile Settings', href: '/settings', icon: Settings },
  ];

  const handleProfileSelect = (profileId: string) => {
    setActiveProfile(profileId);
    setProfileModalOpen(false);
    onCloseMobile?.();
    const profile = state.profiles.find((p) => p.id === profileId);
    if (profile?.isChild) {
      router.push(`/kid-view`);
    } else {
      router.push('/dashboard');
    }
  };

  const content = (
    <div className="h-full flex flex-col bg-[#08121E] text-slate-100 border-r border-[#142338] select-none">
      {/* Brand Header */}
      <div className="shrink-0 flex items-center justify-between px-5 pt-6 pb-4">
        <Link href="/dashboard" className="flex items-center gap-2 focus:outline-none">
          <FirstSavvyLogoSidebar className="h-12 sm:h-14 w-auto shrink-0" />
        </Link>
        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-1.5 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex min-h-11 lg:min-h-0 items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#00B4D8] text-[#060D17] font-bold shadow-md shadow-cyan-500/25'
                  : 'text-slate-300 hover:bg-[#112238] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#060D17]' : 'text-slate-400'}`} />
                <span className="truncate">{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-[#060D17]/20 text-[#060D17]'
                      : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Parent Account Box */}
      <div className="shrink-0 p-3">
        <div className="bg-[#0C1827] border border-[#1A2E47] rounded-2xl p-3.5 shadow-sm relative">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>PARENT ACCOUNT</span>
            <button
              onClick={() => setProfileModalOpen(!profileModalOpen)}
              className="min-h-11 lg:min-h-0 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-bold text-[11px]"
            >
              <span>SWITCH</span>
              <span>⇄</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-[#060D17] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
              P
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                Sarah (Admin)
              </div>
              <div className="text-[11px] font-semibold text-amber-400 truncate">
                All Accounts Active
              </div>
            </div>
          </div>

          {/* Profile Switcher Popover */}
          {profileModalOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 max-h-[50dvh] overflow-y-auto overscroll-contain bg-[#0C1929] border border-[#1E3452] rounded-xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Switch Household Profile
              </div>
              {state.profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProfileSelect(p.id)}
                  className={`w-full min-h-11 p-2 rounded-lg flex items-center justify-between text-left text-xs font-semibold transition-colors ${
                    p.id === activeProfile.id
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'hover:bg-[#15273F] text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div
                      className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.displayName.charAt(0)}
                    </div>
                    <span className="truncate">{p.displayName}</span>
                  </div>
                  {p.isChild && (
                    <span className="text-[11px] text-amber-400 font-bold">
                      ⭐ {p.starBalance}
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-1.5 border-t border-[#1A2E47]">
                <Link
                  href="/profiles"
                  onClick={() => { setProfileModalOpen(false); onCloseMobile?.(); }}
                  className="w-full min-h-11 p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:bg-cyan-950/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Manage Profiles</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[100dvh] sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-xs h-[100dvh] shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
