'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Calendar, 
  Target, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronRight,
  Landmark,
  PiggyBank
} from 'lucide-react';

export function LiveHeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState<'all' | 'family' | 'finance'>('all');
  const [completedTasks, setCompletedTasks] = useState<number[]>([0]);

  const toggleTask = (idx: number) => {
    setCompletedTasks(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full select-none text-left">
      {/* Decorative ambient radial glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-brand-sky/25 via-brand-navy/20 to-amber-400/20 rounded-3xl blur-2xl opacity-70 -z-10" />

      {/* Main Browser Frame */}
      <div className="relative rounded-2xl sm:rounded-[1.4rem] bg-slate-900 border border-slate-700/70 shadow-2xl overflow-hidden">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
              app.firstsavvy.com/dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Household Demo</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-bold">
              The Miller Family
            </span>
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="p-4 sm:p-6 lg:p-7 bg-slate-950/95 space-y-6">
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Total Net Worth</span>
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +3.2%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-sans">
                $437,407.70
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Assets: <span className="text-slate-300 font-medium">$926,450</span> • Debts: <span className="text-rose-400 font-medium">-$489,042</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>August Spending</span>
                <span className="text-brand-sky text-xs font-semibold">
                  50/30/20 Target
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-sans">
                $4,124.90
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                <span className="text-emerald-400 font-semibold">$2,450.00</span> safe to spend this month
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Family Star Points</span>
                <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  ★ Active Ledger
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1.5 font-sans flex items-center gap-2">
                45 <span className="text-lg font-normal text-amber-200/60">/ 60 Stars</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Emma (Age 9) • <span className="text-brand-sky">75% toward Nintendo Switch</span>
              </div>
            </div>
          </div>

          {/* Dual Workspace Split: Personal Finance & Family Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Recent Activity Feed (7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-sky" />
                  <span className="text-sm font-bold text-white">Recent Household Activity</span>
                </div>
                <span className="text-xs font-semibold text-brand-sky hover:underline cursor-pointer">
                  View Banking →
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Acme Corp Bi-Weekly Salary', cat: 'Income', amount: '+$4,750.00', positive: true, date: 'Today • Plaid' },
                  { name: 'Whole Foods Market', cat: 'Groceries', amount: '-$164.50', positive: false, date: 'Yesterday • Card 4921' },
                  { name: 'Rocket Mortgage Escrow', cat: 'Housing', amount: '-$2,450.00', positive: false, date: 'Aug 18 • Automated' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.cat} • {item.date}</div>
                    </div>
                    <div className={`font-mono font-bold text-sm ${item.positive ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Family Task Ledger (5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-white">Emma's Task Ledger</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  Supervised
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { title: 'Tidy Bedroom & Make Bed', stars: 2, sub: 'Daily Routine' },
                  { title: 'Feed & Walk Family Pet', stars: 3, sub: 'Daily Morning' },
                  { title: 'Daily Math & Reading Time', stars: 4, sub: 'Weekdays' },
                ].map((task, idx) => {
                  const isDone = completedTasks.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTask(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-400'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-xs transition-colors ${
                          isDone ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600'
                        }`}>
                          {isDone && '✓'}
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : ''}`}>
                            {task.title}
                          </div>
                          <div className="text-[10px] text-slate-500">{task.sub}</div>
                        </div>
                      </div>

                      <span className="font-bold text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        +{task.stars}★
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Goal Card (Bottom Right Overlay) */}
      <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-5 w-[60%] sm:w-[42%] max-w-sm hidden xs:block z-20">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-brand-sky/40 shadow-2xl shadow-black/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-sky flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Milestone Goal
            </span>
            <span className="text-xs font-bold text-amber-400">45 / 60 Stars</span>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-sm text-white flex items-center justify-between">
              <span>Nintendo Switch OLED</span>
              <span className="text-xs font-normal text-slate-400">75%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-sky w-[75%]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
            <span>Target: 15 Stars left</span>
            <span className="text-emerald-400 font-semibold">On Track for Sept 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
