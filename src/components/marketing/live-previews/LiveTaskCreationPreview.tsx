'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, Calendar, User, Sparkles } from 'lucide-react';

export function LiveTaskCreationPreview() {
  const [stars, setStars] = useState(4);
  const [schedule, setSchedule] = useState('Weekdays');
  const [child, setChild] = useState('Emma (Age 9)');

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left">
      {/* Modal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
          Create Family Responsibility
        </div>
        <span className="text-xs text-brand-sky font-bold">Step 1 of 2</span>
      </div>

      {/* Interactive Form Fields */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Task Title Field */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Task Title & Description</label>
          <input
            type="text"
            readOnly
            value="Daily Math Practice & Reading Chapter"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none"
          />
        </div>

        {/* Star Value Selector */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Star Value (Effort Weight)</label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setStars(val)}
                className={`py-2 rounded-lg font-bold text-center transition-all ${
                  stars === val
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-slate-900 text-amber-400/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                +{val} ★
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Selector */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Recurring Schedule</label>
          <div className="grid grid-cols-3 gap-2">
            {['Daily', 'Weekdays', 'Weekends'].map((sch) => (
              <button
                key={sch}
                type="button"
                onClick={() => setSchedule(sch)}
                className={`py-1.5 rounded-lg text-[11px] font-semibold text-center transition-all ${
                  schedule === sch
                    ? 'bg-brand-sky text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {sch}
              </button>
            ))}
          </div>
        </div>

        {/* Assignee Selector */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Assign to Child Profile</label>
          <div className="grid grid-cols-2 gap-2">
            {['Emma (Age 9)', 'Lucas (Age 12)'].map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChild(ch)}
                className={`py-2 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-between border transition-all ${
                  child === ch
                    ? 'bg-slate-900 border-brand-sky text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <span>{ch}</span>
                {child === ch && <span className="w-2 h-2 rounded-full bg-brand-sky" />}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-sky to-brand-blue text-white font-bold text-center shadow-md">
            Save Task & Allocate +{stars} Stars
          </div>
        </div>
      </div>
    </div>
  );
}
