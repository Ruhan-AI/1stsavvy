'use client';

import React, { useState } from 'react';
import { Target, Star, Gift, Sparkles, Heart } from 'lucide-react';

export function LiveGoalCreationPreview() {
  const [targetStars, setTargetStars] = useState(60);
  const currentStars = 45;
  const progress = Math.round((currentStars / targetStars) * 100);

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left">
      {/* Modal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Reward & Goal Builder
        </div>
        <span className="text-xs text-slate-400">Milestone</span>
      </div>

      {/* Interactive Form Content */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Goal Title */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Goal / Reward Milestone Title</label>
          <input
            type="text"
            readOnly
            value="Nintendo Switch OLED — Mario Edition"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none"
          />
        </div>

        {/* Target Stars Slider / Picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold text-[11px]">Required Star Points</label>
            <span className="font-bold text-amber-400 font-mono text-sm">{targetStars} Stars</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[30, 45, 60, 100].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTargetStars(val)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  targetStars === val
                    ? 'bg-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-400'
                    : 'bg-slate-900 text-amber-400/80 border border-slate-800'
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
            <span className="font-semibold text-slate-300">Emma's Current Progress</span>
            <span className="font-bold text-amber-400">{currentStars} / {targetStars} Stars ({progress}%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-sky transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{Math.max(targetStars - currentStars, 0)} Stars to unlock</span>
            <span className="text-emerald-400 font-medium">Auto-Redeem Enabled</span>
          </div>
        </div>

        {/* Reward Category Badges */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Reward Category</label>
          <div className="flex flex-wrap gap-2">
            {['🎮 Electronics', '🎟️ Theme Park Pass', '📚 Book Set', '💵 Cash Allowance'].map((cat, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border ${
                  idx === 0
                    ? 'bg-brand-sky/10 border-brand-sky/40 text-brand-sky font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center shadow-md">
            Save Goal & Activate Milestone Tracking
          </div>
        </div>
      </div>
    </div>
  );
}
