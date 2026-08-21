'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
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
  ShieldCheck, 
  Layers, 
  Lock, 
  Share2, 
  Settings, 
  ChevronDown, 
  Plus, 
  Sparkles, 
  Star,
  FileText,
  CreditCard,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AppSidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, activeProfile, setActiveProfile } = useFirstSavvyStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Banking', href: '/banking', icon: Landmark },
    { name: 'Budgeting', href: '/budgeting', icon: PieChart },
    { name: 'Goals & Savings', href: '/goals', icon: Target },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Net Worth', href: '/net-worth', icon: TrendingUp },
    { name: 'Investments', href: '/investments', icon: Briefcase },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Profiles & Household', href: '/profiles', icon: ShieldCheck },
  ];

  const secondaryNav = [
    { name: 'Credit Score', href: '/credit-score', icon: CreditCard, badge: 'Coming Soon' },
    { name: 'Estate Planning', href: '/estate-planning', icon: FileText, badge: 'Coming Soon' },
    { name: 'Integrations', href: '/integrations', icon: Layers },
    { name: 'Password Vault', href: '/password-vault', icon: Lock, badge: 'Roadmap' },
    { name: 'Referral & Affiliate', href: '/referral', icon: Share2 },
    { name: 'Profile Settings', href: '/settings', icon: Settings },
  ];

  const handleProfileSelect = (profileId: string) => {
    setActiveProfile(profileId);
    setProfileDropdownOpen(false);
    const profile = state.profiles.find((p) => p.id === profileId);
    if (profile?.isChild) {
      router.push(`/profiles/${profileId}`);
    }
  };

  const content = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#1E293B] border-r border-slate-200 dark:border-slate-800 p-4 select-none">
      <div className="space-y-6">
        {/* Logo & Mobile Close */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Logo size="md" href="/dashboard" />
          {mobileOpen && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Profile Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky"
            aria-expanded={profileDropdownOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                style={{ backgroundColor: activeProfile.avatarColor }}
              >
                {activeProfile.displayName.charAt(0)}
              </div>
              <div className="text-left truncate">
                <div className="text-xs font-bold text-brand-navy dark:text-white truncate">
                  {activeProfile.displayName}
                </div>
                <div className="text-[10px] text-slate-500 capitalize truncate">
                  {activeProfile.relationship} Profile
                </div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180 text-brand-sky' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#222F3E] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Household Members
              </div>
              {state.profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProfileSelect(p.id)}
                  className={`w-full p-2 rounded-lg flex items-center justify-between text-left text-xs font-semibold transition-colors ${
                    p.id === activeProfile.id
                      ? 'bg-brand-sky/10 text-brand-sky'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.displayName.charAt(0)}
                    </div>
                    <span>{p.displayName}</span>
                  </div>
                  {p.isChild && (
                    <span className="text-[10px] text-amber-500 font-bold">
                      ⭐ {p.starBalance}
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/profiles"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className="w-full p-2 rounded-lg flex items-center gap-2 text-xs font-bold text-brand-sky hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manage / Add Profile</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Finance & Family
          </div>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-navy text-white shadow-sm dark:bg-brand-sky dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-navy dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-sky dark:text-slate-900' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Secondary / Roadmap Nav */}
        <nav className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Modules & Tools
          </div>
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-navy text-white dark:bg-brand-sky dark:text-slate-900'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-navy dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Kid Space Quick Switcher */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <Link
          href="/kid-view"
          onClick={onCloseMobile}
          className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-sky-50 dark:from-amber-950/40 dark:to-sky-950/40 border border-amber-300/40 dark:border-amber-700/40 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>Supervised Kid View</span>
          </div>
          <span className="text-[10px] font-bold text-brand-sky">Preview →</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
