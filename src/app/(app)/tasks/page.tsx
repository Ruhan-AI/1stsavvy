'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Star,
  Plus,
  Check,
  Sparkles,
  Calendar,
  User,
  Clock,
  Trash2
} from 'lucide-react';

export default function TasksPage() {
  const [chores, setChores] = useState([
    { id: '1', title: 'Tidy Bedroom & Make Bed', cadence: 'Daily', stars: 2, completed: true, child: 'Leo' },
    { id: '2', title: 'Feed & Walk Pet Dog', cadence: 'Morning', stars: 3, completed: false, child: 'Leo' },
    { id: '3', title: 'Daily Math & Reading Time', cadence: 'Weekdays', stars: 4, completed: false, child: 'Leo' },
    { id: '4', title: 'Put Away Toys & Craft Supplies', cadence: 'Daily', stars: 2, completed: true, child: 'Leo' },
    { id: '5', title: 'Empty Dishwasher & Sort Cutlery', cadence: 'Evening', stars: 3, completed: false, child: 'Leo' },
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCadence, setNewCadence] = useState('Daily');
  const [newStars, setNewStars] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleChore = (id: string) => {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setChores((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: newTitle.trim(),
        cadence: newCadence,
        stars: Number(newStars),
        completed: false,
        child: 'Leo',
      },
    ]);
    setNewTitle('');
    setModalOpen(false);
  };

  const filteredChores = chores.filter((c) => {
    if (filter === 'pending') return !c.completed;
    if (filter === 'completed') return c.completed;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Family Accountability & Rewards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Tasks & Chores Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Assign household chores, supervise completion, and award star incentives to kids.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 rounded-xl bg-[#00B4D8] hover:bg-[#0096C7] text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>Assign New Chore</span>
        </button>
      </div>

      {/* Filter Tabs & Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Total Active Chores</span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1.5">{chores.length}</div>
          <div className="text-xs text-slate-400 mt-1">Assigned across all children</div>
        </div>

        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Completed Today</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1.5">
            {chores.filter((c) => c.completed).length} / {chores.length}
          </div>
          <div className="text-xs text-emerald-400/80 mt-1">Stars already credited</div>
        </div>

        <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Leo&apos;s Star Target</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1.5">
            42 / 60 ★
          </div>
          <div className="text-xs text-cyan-400 mt-1">70% toward Gaming Console</div>
        </div>
      </div>

      {/* Chores Card */}
      <div className="bg-[#0C1826] border border-[#16273E] rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <h3 className="font-bold text-base text-white">Active Chore Roster</h3>
          </div>

          {/* §9: the three chips overflow a 320px viewport, so the row scrolls
              rather than pushing the page wide */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 max-w-full overflow-x-auto no-scrollbar">
          <div className="inline-flex min-w-max items-center gap-1 bg-[#08121E] p-1 rounded-xl border border-[#142338]">
            {(['all', 'pending', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`inline-flex items-center justify-center shrink-0 min-h-[36px] px-3 rounded-lg text-xs font-bold capitalize transition-colors ${
                  filter === f
                    ? 'bg-[#00B4D8] text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Chores list */}
        <div className="space-y-3 pt-2">
          {filteredChores.map((chore) => (
            <div
              key={chore.id}
              onClick={() => toggleChore(chore.id)}
              className={`p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                chore.completed
                  ? 'bg-[#081F1E]/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                  : 'bg-[#08121E] border-[#122238] text-slate-200 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                    chore.completed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/40'
                      : 'border-slate-600 bg-[#0C1826] hover:border-cyan-400'
                  }`}
                >
                  {chore.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="min-w-0">
                  <div
                    className={`font-bold text-sm line-clamp-2 xl:line-clamp-none xl:truncate ${
                      chore.completed ? 'text-emerald-300 line-through opacity-90' : 'text-white'
                    }`}
                  >
                    {chore.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{chore.cadence}</span>
                    <span>•</span>
                    <span>Assigned to {chore.child}</span>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 rounded-md bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold shrink-0">
                +{chore.stars}★
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
