'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFirstSavvyStore } from '@/lib/store';
import {
  Bell,
  CheckCheck,
  Sparkles,
  Wallet,
  AlertCircle,
  Calendar,
  ShieldCheck,
  X
} from 'lucide-react';

export function NotificationsPopover() {
  const router = useRouter();
  const { state, markNotificationRead, markAllNotificationsRead } = useFirstSavvyStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'task' | 'bill' | 'budget'>('all');

  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = state.notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markNotificationRead(id);
    if (actionUrl) {
      setIsOpen(false);
      router.push(actionUrl);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-sky text-white text-[11px] font-bold flex items-center justify-center tabular-nums animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown — right-anchored, never wider than the viewport */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm max-h-[70dvh] overflow-y-auto overscroll-contain bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-[#1E293B] p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-serif font-bold text-base sm:text-lg text-brand-navy dark:text-white truncate">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[11px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-sky/10 text-brand-sky shrink-0 whitespace-nowrap tabular-nums">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="inline-flex items-center justify-center gap-1 min-h-[44px] px-2 rounded-lg text-[11px] sm:text-xs text-brand-sky hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                >
                  <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Mark all read</span>
                  <span className="sm:hidden">All read</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close notifications"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills — scroll horizontally rather than wrap at 320px */}
          <div className="bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
            <div className="inline-flex min-w-max items-center gap-1 p-2 text-xs">
              {(['all', 'task', 'bill', 'budget'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`shrink-0 inline-flex items-center justify-center min-h-[36px] px-3 rounded-lg font-bold capitalize transition-colors ${
                    filter === cat
                      ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs sm:text-sm text-slate-400">
                No notifications in this category.
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n.id, n.actionUrl)}
                  className={`min-h-[44px] p-3 sm:p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors flex items-start gap-3 ${
                    !n.isRead ? 'bg-sky-50/40 dark:bg-sky-950/20' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center shrink-0 mt-0.5">
                    {n.category === 'task' ? (
                      <Sparkles className="w-4 h-4" />
                    ) : n.category === 'bill' ? (
                      <Calendar className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Wallet className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white min-w-0 line-clamp-2 xl:line-clamp-none xl:truncate">
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 mt-1.5 rounded-full bg-brand-sky shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
