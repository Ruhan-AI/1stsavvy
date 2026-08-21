'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney } from '@/lib/utils/format';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Sparkles, 
  Wallet, 
  Utensils, 
  Clock, 
  CheckCircle2, 
  X,
  Filter
} from 'lucide-react';

export default function CalendarPage() {
  const { state } = useFirstSavvyStore();
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 21)); // August 2026
  const [filterType, setFilterType] = useState<string>('all');
  const [eventModalOpen, setEventModalOpen] = useState(false);

  // Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<'bill' | 'income' | 'household_event' | 'meal'>('household_event');
  const [eventDate, setEventDate] = useState('2026-08-25');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');

  const filteredEvents = state.calendarEvents.filter((ev) => {
    if (filterType === 'all') return true;
    return ev.eventType === filterType;
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = 31; // August
  const firstDayIndex = 6; // Saturday

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Looking Forward</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Financial Calendar & Schedule
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'month' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'day' ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              Day View
            </button>
          </div>

          <button
            onClick={() => setEventModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Add Event / Bill</span>
          </button>
        </div>
      </div>

      {/* 2. Month Navigation & Filter Pills */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-bold text-lg text-brand-navy dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="text-xs font-bold text-brand-sky hover:underline ml-2">
            Today
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto w-full sm:w-auto">
          {['all', 'bill', 'income', 'household_event', 'meal'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-colors ${
                filterType === f
                  ? 'bg-brand-navy text-white shadow-xs dark:bg-brand-sky dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {f === 'household_event' ? 'Events' : f === 'all' ? 'All Items' : f}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Calendar Grid (Month View) */}
      {viewMode === 'month' ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 pt-3">
            {/* Blank leading slots */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-24 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-900/20" />
            ))}

            {/* Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `2026-08-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
              const dayEvents = filteredEvents.filter((e) => e.date === dateStr);
              const isToday = dayNum === 21;

              return (
                <div
                  key={dayNum}
                  className={`min-h-24 p-2 rounded-xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-sky-50/60 dark:bg-sky-950/40 border-brand-sky'
                      : 'bg-white dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${isToday ? 'text-brand-sky' : 'text-slate-700 dark:text-slate-300'}`}>
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold text-brand-sky uppercase">Today</span>
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {dayEvents.map((ev, i) => (
                      <div
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold truncate text-white shadow-xs"
                        style={{ backgroundColor: ev.color || '#4FA3CD' }}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Day View */
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-serif font-bold text-xl text-brand-navy dark:text-white">
              Friday, August 21, 2026 (Today)
            </h2>
          </div>

          <div className="space-y-3">
            {filteredEvents
              .filter((e) => e.date === '2026-08-21')
              .map((ev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: ev.color || '#4FA3CD' }}
                    >
                      {ev.eventType === 'meal' ? <Utensils className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-brand-navy dark:text-white">{ev.title}</div>
                      <div className="text-slate-500 capitalize">{ev.eventType} • {ev.startTime || 'All day'}</div>
                    </div>
                  </div>

                  {ev.amountCents && (
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {formatMoney(ev.amountCents)}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Add Calendar Event / Bill</h3>
              <button onClick={() => setEventModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setEventModalOpen(false); }} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                  placeholder="e.g. Electric Utility Due or Soccer Practice"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="bill">Bill Payment</option>
                    <option value="income">Payday / Income</option>
                    <option value="household_event">Family Event</option>
                    <option value="meal">Meal Plan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Save to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
