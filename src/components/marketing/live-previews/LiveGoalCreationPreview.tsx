'use client';

import React, { useState } from 'react';
import { Target, Star, Gift, Sparkles, X, Check } from 'lucide-react';

export function LiveGoalCreationPreview() {
  const [goalTitle, setGoalTitle] = useState('Nintendo Switch OLED — Mario Edition');
  const [targetStars, setTargetStars] = useState(60);
  const [category, setCategory] = useState('Electronics');
  const [isCreated, setIsCreated] = useState(false);
  const currentStars = 45;
  const progress = Math.round((currentStars / targetStars) * 100);

  const handleCreate = () => {
    setIsCreated(true);
    setTimeout(() => setIsCreated(false), 4000);
  };

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Modal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#EFCE7B] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Reward & Goal Builder
        </div>
        <button type="button" className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Form Content */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Goal Title */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Goal / Reward Title</label>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-[#52A5CE]"
          />
        </div>

        {/* Target Stars Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold text-[11px]">Target Star Points</label>
            <span className="font-bold text-[#EFCE7B] font-mono text-sm">{targetStars} Stars</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[30, 45, 60, 100].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTargetStars(val)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  targetStars === val
                    ? 'bg-[#EFCE7B] text-slate-950 shadow-sm ring-1 ring-[#EFCE7B]'
                    : 'bg-slate-900 text-[#EFCE7B]/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {val} Stars
              </button>
            ))}
          </div>
        </div>

        {/* Live Milestone Progress Visualizer */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Emma's Goal Progress</span>
            <span className="font-bold text-[#EFCE7B]">{currentStars} / {targetStars} Stars ({progress}%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#EFCE7B] via-[#52A5CE] to-[#AACC96] transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{Math.max(targetStars - currentStars, 0)} Stars remaining to unlock</span>
            <span className="text-[#AACC96] font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Auto-Redeem Ready
            </span>
          </div>
        </div>

        {/* Reward Category Badges */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Reward Category</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '🎮 Electronics', id: 'Electronics' },
              { label: '🎟️ Family Outing', id: 'Family Outing' },
              { label: '📚 Book Set', id: 'Books' },
              { label: '💵 Allowance Payout', id: 'Allowance' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`py-1.5 px-2.5 rounded-lg text-[11px] font-medium border text-left transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-[#52A5CE]/15 border-[#52A5CE] text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          {isCreated ? (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold flex items-center justify-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Goal &ldquo;{goalTitle}&rdquo; Created with {targetStars} Stars Target!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 sm:px-6 py-2.5 h-10 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Create Goal ({targetStars} Stars Target)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
