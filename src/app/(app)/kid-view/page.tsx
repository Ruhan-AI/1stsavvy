'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFirstSavvyStore } from '@/lib/store';
import { Interactive3DStarBadge } from '@/components/3d/Interactive3DStarBadge';
import { Confetti } from '@/components/ui/Confetti';
import { playChime } from '@/lib/utils/sound';
import { HoverCard3D, FadeIn } from '@/components/animations/MotionWrappers';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  Target, 
  Smile, 
  ArrowLeft, 
  HelpCircle, 
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function KidViewPage() {
  const { state, completeTask, requestRedemption } = useFirstSavvyStore();
  const [activeChildId, setActiveChildId] = useState('prof-leo');
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const [successToast, setSuccessToast] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const currentChild = state.profiles.find((p) => p.id === activeChildId) || state.profiles.find((p) => p.isChild) || state.profiles[0];
  const childTasks = state.tasks.filter((t) => t.assignedProfileIds.includes(currentChild.id));
  const childGoals = state.goals.filter((g) => g.profileId === currentChild.id);
  const childRewards = state.rewards.filter((r) => r.assignedChildIds.includes(currentChild.id));
  const childLedger = state.starLedger.filter((l) => l.childProfileId === currentChild.id);

  const handleMarkDone = (taskId: string, title: string) => {
    completeTask(taskId, currentChild.id);
    setDoneTasks((prev) => [...prev, taskId]);
    setShowConfetti(true);
    playChime('star');
    setSuccessToast(`Awesome job! You finished "${title}" and earned stars! 🌟`);
    setTimeout(() => setSuccessToast(''), 4500);
  };

  const handleRedeem = (rewardId: string, title: string) => {
    requestRedemption(rewardId, currentChild.id);
    setShowConfetti(true);
    playChime('pop');
    setSuccessToast(`Redemption requested for "${title}"! Mom & Dad notified. 🎁`);
    setTimeout(() => setSuccessToast(''), 4500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* 1. Parent Preview Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-navyDark text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold">Parent Preview Mode:</span>
          <span className="text-slate-300">You are currently previewing the Kid Space experience.</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch child profile */}
          <select
            value={activeChildId}
            onChange={(e) => setActiveChildId(e.target.value)}
            className="bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none"
          >
            {state.profiles.filter((p) => p.isChild).map((c) => (
              <option key={c.id} value={c.id} className="text-brand-navy">
                Preview {c.displayName}
              </option>
            ))}
          </select>

          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-xs font-bold inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Parent View</span>
          </Link>
        </div>
      </div>

      {/* Celebratory Particle Confetti */}
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 2. Kid Hero Greeting Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-sky via-brand-blue to-brand-navy text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Smile className="w-3.5 h-3.5" />
            <span>Hello, {currentChild.displayName}!</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            Ready to earn some stars today?
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-md">
            Complete your everyday tasks, collect stars, and work toward your goals!
          </p>
        </div>

        {/* Star Badge */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 text-center shadow-lg shrink-0 relative z-10 flex flex-col items-center">
          <Interactive3DStarBadge size={130} />
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mt-1">My Star Balance</div>
          <div className="text-3xl sm:text-4xl font-bold font-serif text-amber-300 flex items-center justify-center gap-2 mt-0.5">
            <span>{currentChild.starBalance} Stars</span>
          </div>
          <div className="text-[10px] text-white/80 mt-1">Click & drag star to spin! ⭐</div>
        </div>
      </div>

      {/* 3. My Tasks Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-sky" />
            <h2 className="font-serif font-bold text-xl text-brand-navy dark:text-white">Today's Tasks</h2>
          </div>
          <span className="text-xs text-slate-500">{childTasks.length} assigned</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {childTasks.map((task) => {
            const isDone = doneTasks.includes(task.id);
            return (
              <HoverCard3D key={task.id} glowColor="rgba(245, 158, 11, 0.2)">
                <div
                  className={`p-5 rounded-2xl border transition-all h-full flex flex-col justify-between space-y-4 ${
                    isDone
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300 opacity-80'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700/60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-sm text-brand-navy dark:text-white leading-tight">
                        {task.title}
                      </h3>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-lg shadow-2xs">
                        +{task.starValue} ⭐
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleMarkDone(task.id, task.title)}
                    disabled={isDone}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                      isDone
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-brand-navy hover:bg-brand-navyDark hover:scale-[1.02] active:scale-[0.98] text-white shadow-md'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Completed!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-brand-sky" />
                        <span>I Did This! (Mark as Done)</span>
                      </>
                    )}
                  </button>
                </div>
              </HoverCard3D>
            );
          })}
        </div>
      </div>

      {/* 4. My Goals & Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals Progress */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">My Goals</h3>
            </div>
            <span className="text-xs text-brand-sky font-bold">Saving Up!</span>
          </div>

          <div className="space-y-4">
            {childGoals.map((g) => {
              const pct = Math.min(100, Math.round(((g.currentStars || 0) / (g.targetStars || 1)) * 100));
              return (
                <div key={g.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-navy dark:text-white">{g.title}</span>
                    <span className="font-bold text-amber-500">{g.currentStars} / {g.targetStars} ⭐ ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rewards Catalog */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-brand-sky" />
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Unlock Rewards</h3>
            </div>
            <span className="text-xs text-slate-500">Pick a prize</span>
          </div>

          <div className="space-y-3">
            {childRewards.map((rew) => {
              const canAfford = currentChild.starBalance >= rew.starCost;
              return (
                <div key={rew.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-brand-navy dark:text-white">{rew.title}</div>
                    <div className="text-slate-500 text-[11px]">{rew.description}</div>
                  </div>

                  <button
                    onClick={() => handleRedeem(rew.id, rew.title)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700'
                    }`}
                  >
                    Redeem ({rew.starCost} ⭐)
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
