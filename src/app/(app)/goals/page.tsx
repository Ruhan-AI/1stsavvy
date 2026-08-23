'use client';

import React, { useState } from 'react';
import { useFirstSavvyStore } from '@/lib/store';
import { formatMoney } from '@/lib/utils/format';
import { 
  Target, 
  Plus, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  Users, 
  X,
  Compass,
  Bike,
  Palette
} from 'lucide-react';

export default function GoalsPage() {
  const { state, addGoal, contributeToGoal } = useFirstSavvyStore();
  const [profileFilter, setProfileFilter] = useState('all');
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [contribModalGoal, setContribModalGoal] = useState<any>(null);
  const [contribAmount, setContribAmount] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalType, setGoalType] = useState<'reward_stars' | 'monetary_savings'>('reward_stars');
  const [targetStars, setTargetStars] = useState('50');
  const [targetAmount, setTargetAmount] = useState('1000');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [assignedProfileId, setAssignedProfileId] = useState(state.profiles[0]?.id || '');

  const filteredGoals = state.goals.filter((g) => {
    if (profileFilter === 'all') return true;
    return g.profileId === profileFilter;
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      profileId: assignedProfileId,
      title,
      description,
      goalType,
      icon: goalType === 'reward_stars' ? 'Star' : 'Target',
      color: goalType === 'reward_stars' ? '#B45309' : '#0F766E',
      targetStars: goalType === 'reward_stars' ? parseInt(targetStars) : undefined,
      currentStars: 0,
      targetAmountCents: goalType === 'monetary_savings' ? Math.round(parseFloat(targetAmount) * 100) : undefined,
      currentAmountCents: 0,
      deadline,
      status: 'active',
    });

    setGoalModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleAddContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contribModalGoal) return;
    const amountParsed = parseFloat(contribAmount) || 0;

    if (contribModalGoal.goalType === 'reward_stars') {
      contributeToGoal(contribModalGoal.id, undefined, Math.round(amountParsed));
    } else {
      contributeToGoal(contribModalGoal.id, Math.round(amountParsed * 100));
    }

    setContribModalGoal(null);
    setContribAmount('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Patience & Progress</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
            Family Goals & Savings
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={profileFilter}
            onChange={(e) => setProfileFilter(e.target.value)}
            className="min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs font-bold text-brand-navy dark:text-white"
          >
            <option value="all">All Family Profiles</option>
            {state.profiles.map((p) => (
              <option key={p.id} value={p.id}>{p.displayName}</option>
            ))}
          </select>

          <button
            onClick={() => setGoalModalOpen(true)}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-sky" />
            <span>Create New Goal</span>
          </button>
        </div>
      </div>

      {/* 2. Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal) => {
          const profile = state.profiles.find((p) => p.id === goal.profileId);
          const isStars = goal.goalType === 'reward_stars';
          const pct = isStars
            ? Math.min(100, Math.round(((goal.currentStars || 0) / (goal.targetStars || 1)) * 100))
            : Math.min(100, Math.round(((goal.currentAmountCents || 0) / (goal.targetAmountCents || 1)) * 100));

          return (
            <div
              key={goal.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: goal.color }}
                    >
                      {isStars ? <Star className="w-4 h-4 fill-white" /> : <Target className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-base text-brand-navy dark:text-white leading-tight">
                        {goal.title}
                      </div>
                      <div className="text-[11px] text-slate-500">{profile?.displayName || 'Family'}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isStars ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                    {isStars ? 'Star Reward Goal' : 'Monetary Savings'}
                  </span>
                </div>

                {goal.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {goal.description}
                  </p>
                )}

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">
                      {isStars ? `${goal.currentStars || 0} / ${goal.targetStars} Stars` : `${formatMoney(goal.currentAmountCents || 0)} of ${formatMoney(goal.targetAmountCents || 0)}`}
                    </span>
                    <span className="text-brand-sky">{pct}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {goal.deadline ? `Target: ${goal.deadline}` : 'Open deadline'}
                </span>
                <button
                  onClick={() => setContribModalGoal(goal)}
                  className="min-h-[44px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-sky hover:text-white font-bold text-brand-navy dark:text-slate-200 transition-colors"
                >
                  + Add Progress
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE GOAL MODAL */}
      {goalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Create New Goal</h3>
              <button onClick={() => setGoalModalOpen(false)} className="min-h-[44px] text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-brand-navy dark:text-slate-200">Goal Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. New Mountain Bike or Tahoe Cabin Fund"
                  className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Goal Type</label>
                  <select
                    value={goalType}
                    onChange={(e) => setGoalType(e.target.value as any)}
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    <option value="reward_stars">Star Reward (Child)</option>
                    <option value="monetary_savings">Monetary Savings ($)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Assign Profile</label>
                  <select
                    value={assignedProfileId}
                    onChange={(e) => setAssignedProfileId(e.target.value)}
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  >
                    {state.profiles.map((p) => (
                      <option key={p.id} value={p.id}>{p.displayName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {goalType === 'reward_stars' ? (
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Target Stars</label>
                  <input
                    type="number"
                    value={targetStars}
                    onChange={(e) => setTargetStars(e.target.value)}
                    required
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy dark:text-slate-200">Target Amount ($)</label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                    className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                  />
                </div>
              )}

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setGoalModalOpen(false)}
                  className="min-h-[44px] w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] w-1/2 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTRIBUTION MODAL */}
      {contribModalGoal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">
              Add Progress to {contribModalGoal.title}
            </h3>
            <form onSubmit={handleAddContribution} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  {contribModalGoal.goalType === 'reward_stars' ? 'Stars to Allocate' : 'Deposit Amount ($)'}
                </label>
                <input
                  type="number"
                  step={contribModalGoal.goalType === 'reward_stars' ? '1' : '0.01'}
                  value={contribAmount}
                  onChange={(e) => setContribAmount(e.target.value)}
                  required
                  placeholder={contribModalGoal.goalType === 'reward_stars' ? '5' : '150.00'}
                  className="min-h-[44px] text-base sm:text-sm w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setContribModalGoal(null)}
                  className="min-h-[44px] w-1/2 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] w-1/2 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold shadow"
                >
                  Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
