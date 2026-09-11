'use client';

import React, { useState } from 'react';
import {
  Activity,
  Check,
  CheckCircle2,
  Gift,
  Star,
  Trophy,
} from 'lucide-react';

type KidTab = 'Tasks' | 'Goals' | 'Activity';
type ActivityType = 'Stars Awarded' | 'Task Approved' | 'Reward Claimed';

interface FamilyDemoChildViewProps {
  starBalance: number;
  onCompleteTask: (task: { title: string; stars: number }) => void;
  onCashIn: () => void;
  onSignup: () => void;
  onSwitchToParent: () => void;
}

const TABS = [
  { label: 'Tasks' as const, Icon: Trophy },
  { label: 'Goals' as const, Icon: Gift },
  { label: 'Activity' as const, Icon: Activity },
];

const TASKS = [
  { title: 'Gardening', stars: 5, description: '' },
  { title: 'Help mother with Laundry', stars: 5, description: '' },
  { title: 'Brush Your teeth', stars: 5, description: 'Brush your teeth daily' },
];

const GOALS = [
  {
    title: 'Preparation for Tug of war',
    stars: 8,
    claimedDate: '8/19/2026',
    description: 'Make sure to do strength training daily',
  },
  {
    title: 'Do gym daily',
    stars: 10,
    claimedDate: '8/19/2026',
    description: '45 min hybrid training',
  },
];

// Realistic dummy activity data matching Screenshot 5
const ACTIVITY: { when: string; event: string; type: ActivityType; delta: number }[] = [
  { when: 'Sep 8, 2026 · 2:40 PM', event: 'Trip Award: Theme Park Day', type: 'Stars Awarded', delta: 10 },
  { when: 'Sep 7, 2026 · 5:20 PM', event: 'Brush Your teeth', type: 'Task Approved', delta: 5 },
  { when: 'Sep 3, 2026 · 8:15 AM', event: 'Clean bedroom & organize desk', type: 'Task Approved', delta: 5 },
  { when: 'Aug 31, 2026 · 1:26 PM', event: 'Gardening', type: 'Task Approved', delta: 5 },
  { when: 'Aug 28, 2026 · 11:11 AM', event: 'Help mother with Laundry', type: 'Task Approved', delta: 5 },
  { when: 'Aug 24, 2026 · 3:50 PM', event: 'Trip Award: Family Camping', type: 'Stars Awarded', delta: 5 },
  { when: 'Aug 19, 2026 · 3:38 PM', event: 'Do gym daily', type: 'Reward Claimed', delta: -10 },
  { when: 'Aug 19, 2026 · 3:33 PM', event: 'Preparation for Tug of war', type: 'Reward Claimed', delta: -8 },
  { when: 'Aug 19, 2026 · 2:10 PM', event: 'Brush Your teeth', type: 'Task Approved', delta: 5 },
];

const ACTIVITY_STYLES: Record<ActivityType, string> = {
  'Stars Awarded': 'border-slate-200 bg-white text-slate-700',
  'Task Approved': 'border-emerald-200 bg-emerald-100 text-emerald-700',
  'Reward Claimed': 'border-blue-200 bg-blue-100 text-blue-700',
};

export function FamilyDemoChildView({
  starBalance,
  onCompleteTask,
  onCashIn,
  onSignup,
  onSwitchToParent,
}: FamilyDemoChildViewProps) {
  const [kidTab, setKidTab] = useState<KidTab>('Tasks');

  let runningBalance = starBalance;
  const activityRows = ACTIVITY.map((entry) => {
    const row = { ...entry, balance: runningBalance };
    runningBalance -= entry.delta;
    return row;
  });

  return (
    <section
      aria-label="Leo Miller's kid space"
      className="w-full min-w-0 bg-[#f4f8fb] text-[#17324f] p-1 sm:p-3.5 flex flex-col justify-between"
    >
      <div>
        {/* Center Profile Row: Avatar, Greeting & Star Balance Badge */}
        <div className="mx-auto max-w-[560px] flex items-center justify-between gap-2 sm:gap-3 mb-3.5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#5a6b82] text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs">
              LM
            </div>
            <div className="min-w-0">
              <h2 className="break-words text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                Hi, Leo Miller!
              </h2>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                Ready to earn some stars?
              </p>
            </div>
          </div>

          {/* Star Balance Pill Button (Clicking opens Cash In Stars Modal) */}
          <button
            type="button"
            onClick={onCashIn}
            aria-label={`Cash in stars, ${starBalance} stars available`}
            title="Click to Cash In Stars"
            className="relative flex shrink-0 items-center justify-center min-h-[44px] min-w-[56px] sm:min-w-[80px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#d97706] hover:to-[#c2410c] text-white shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums">
              {starBalance}
            </span>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#9a3412] border-2 border-white shadow-2xs">
              <Gift className="h-2.5 w-2.5 text-white" />
            </span>
          </button>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="mx-auto max-w-[560px] mb-3">
          <div
            role="group"
            aria-label="Kid space sections"
            className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs"
          >
            {TABS.map(({ label, Icon }) => {
              const isActive = kidTab === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setKidTab(label)}
                  className={`inline-flex min-w-0 min-h-11 lg:min-h-8 items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3b82f6] text-white shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="mx-auto max-w-[560px]">
          {/* 1. TASKS TAB */}
          {kidTab === 'Tasks' && (
            <div aria-label="Tasks List" className="space-y-2">
              {TASKS.map((task) => (
                <button
                  key={task.title}
                  type="button"
                  onClick={() => onCompleteTask({ title: task.title, stars: task.stars })}
                  className="flex min-h-16 w-full items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl border-2 border-[#52a5ce] bg-white text-left shadow-2xs hover:shadow-xs hover:border-[#3d91b7] hover:bg-sky-50/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#52a5ce] text-white shadow-2xs group-hover:scale-105 transition-transform">
                      <Star className="h-4 w-4 fill-white text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="break-words text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    <Star className="h-3 w-3 text-slate-400" />
                    <span>{task.stars}</span>
                  </div>
                </button>
              ))}

              {/* Awarded / Completed Task (Clicking redirects to /signup) */}
              <button
                type="button"
                onClick={onSignup}
                className="flex min-h-16 w-full items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl border border-slate-200 bg-white text-left shadow-2xs hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-300 text-white">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="break-words text-xs sm:text-[13px] font-semibold text-slate-600 leading-snug">
                      Clean bedroom & organize desk
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Star className="h-2.5 w-2.5 text-slate-400" />
                      <span>5 stars</span>
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  Awarded
                </span>
              </button>
            </div>
          )}

          {/* 2. GOALS TAB */}
          {kidTab === 'Goals' && (
            <div aria-label="Goals List" className="space-y-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.title}
                  type="button"
                  onClick={onSignup}
                  className="flex w-full items-start justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl border-2 border-emerald-300 bg-[#effbf4] text-left shadow-2xs hover:shadow-xs hover:bg-[#e4f8ec] transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fde68a] text-amber-800 shadow-2xs mt-0.5 group-hover:scale-105 transition-transform">
                      <Gift className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="break-words text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                        {goal.title}
                      </div>
                      <div className="mt-1 flex flex-col items-start gap-1">
                        <span className="inline-flex flex-wrap items-center gap-1 rounded-full border border-emerald-300 bg-emerald-100/70 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                          <Check className="h-2.5 w-2.5 shrink-0" /> Claimed {goal.claimedDate}
                        </span>
                        {goal.description && (
                          <span className="text-[11px] leading-relaxed text-slate-500">
                            {goal.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-500 mt-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{goal.stars}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 3. ACTIVITY TAB */}
          {kidTab === 'Activity' && (
            <div aria-label="Activity Log">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Activity Log</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
                <div data-lenis-prevent className="overflow-x-auto overscroll-x-contain" tabIndex={0} role="region" aria-label="Activity history, scroll horizontally to see all columns">
                  <table className="w-full min-w-[560px] text-left text-[11px]">
                    <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th scope="col" className="px-2.5 py-1.5 whitespace-nowrap">Date &amp; Time</th>
                        <th scope="col" className="px-2 py-1.5">Event</th>
                        <th scope="col" className="px-2 py-1.5">Type</th>
                        <th scope="col" className="px-2 py-1.5 text-right">Stars</th>
                        <th scope="col" className="px-2.5 py-1.5 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activityRows.map((row, index) => {
                        const Icon =
                          row.type === 'Task Approved'
                            ? CheckCircle2
                            : row.type === 'Reward Claimed'
                            ? Gift
                            : Star;
                        return (
                          <tr
                            key={`${row.when}-${index}`}
                            onClick={onSignup}
                            className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          >
                            <td className="whitespace-nowrap px-2.5 py-2.5 text-slate-500 text-[11px]">{row.when}</td>
                            <td className="px-2 py-1.5 font-semibold text-slate-800">
                              <span className="flex items-center gap-1.5">
                                <Icon
                                  className={`h-3 w-3 shrink-0 ${
                                    row.type === 'Task Approved'
                                      ? 'text-emerald-500'
                                      : row.type === 'Reward Claimed'
                                      ? 'text-blue-500'
                                      : 'text-amber-500'
                                  }`}
                                />
                                <span className="min-w-[130px] max-w-[190px] break-words">{row.event}</span>
                              </span>
                            </td>
                            <td className="px-2 py-1.5">
                              <span
                                className={`inline-block min-w-[70px] rounded-lg border px-1.5 py-0.5 text-[11px] font-medium leading-tight ${ACTIVITY_STYLES[row.type]}`}
                              >
                                {row.type}
                              </span>
                            </td>
                            <td
                              className={`whitespace-nowrap px-2 py-1.5 text-right font-bold tabular-nums ${
                                row.delta < 0 ? 'text-rose-500' : 'text-emerald-600'
                              }`}
                            >
                              {row.delta > 0 ? `+${row.delta}` : row.delta}
                            </td>
                            <td className="whitespace-nowrap px-2.5 py-1.5 text-right font-bold tabular-nums text-slate-700">
                              <span className="inline-flex items-center justify-end gap-1">
                                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-500" />
                                {row.balance}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
