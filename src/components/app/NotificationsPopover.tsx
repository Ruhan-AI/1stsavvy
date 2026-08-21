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
        className="relative p-2 rounded-xl text-slate-500 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-sky text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-sky/10 text-brand-sky">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-brand-sky hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1 p-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 text-xs">
            {(['all', 'task', 'bill', 'budget'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors ${
                  filter === cat
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No notifications in this category.
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n.id, n.actionUrl)}
                  className={`p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors flex items-start gap-3 ${
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
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-brand-navy dark:text-white truncate">
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-sky shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5">
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
