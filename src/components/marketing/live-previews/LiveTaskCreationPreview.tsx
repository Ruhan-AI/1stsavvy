'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, Calendar, User, Sparkles, X, ShieldCheck } from 'lucide-react';

export function LiveTaskCreationPreview() {
  const [stars, setStars] = useState(4);
  const [schedule, setSchedule] = useState('Weekdays');
  const [child, setChild] = useState('Emma (Age 9)');
  const [requireApproval, setRequireApproval] = useState(true);

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Modal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
          Create Task & Assign Chore
        </div>
        <button type="button" className="text-slate-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Form Fields matching app.firstsavvy.com */}
      <div className="p-5 bg-slate-950/95 space-y-4 text-xs">
        {/* Task Title Field */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Task Title & Details</label>
          <input
            type="text"
            readOnly
            value="Daily Math Practice & Reading Chapter"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none"
          />
        </div>

        {/* Star Value Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-slate-400 font-semibold text-[11px]">Reward Stars Allocation</label>
            <span className="text-[#EFCE7B] font-bold text-xs">+{stars} Stars on completion</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setStars(val)}
                className={`py-2 rounded-lg font-bold text-center transition-all ${
                  stars === val
                    ? 'bg-[#EFCE7B] text-slate-950 shadow-md ring-2 ring-[#EFCE7B]/60'
                    : 'bg-slate-900 text-[#EFCE7B]/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                +{val} ★
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Selector */}
        <div className="space-y-1.5">
          <label className="block text-slate-400 font-semibold text-[11px]">Recurring Rhythm</label>
          <div className="grid grid-cols-4 gap-2">
            {['Daily', 'Weekdays', 'Weekends', 'Custom'].map((sch) => (
              <button
                key={sch}
                type="button"
                onClick={() => setSchedule(sch)}
                className={`py-1.5 rounded-lg text-[11px] font-semibold text-center transition-all ${
                  schedule === sch
                    ? 'bg-[#52A5CE] text-white shadow-sm'
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
            {[
              { name: 'Emma (Age 9)', avatar: 'E', color: 'bg-[#EFCE7B] text-slate-950' },
              { name: 'Lucas (Age 12)', avatar: 'L', color: 'bg-[#52A5CE] text-white' }
            ].map((ch) => (
              <button
                key={ch.name}
                type="button"
                onClick={() => setChild(ch.name)}
                className={`py-2 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-between border transition-all ${
                  child === ch.name
                    ? 'bg-slate-900 border-[#52A5CE] text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${ch.color} flex items-center justify-center font-bold text-[10px]`}>
                    {ch.avatar}
                  </div>
                  <span>{ch.name}</span>
                </div>
                {child === ch.name && <span className="w-2 h-2 rounded-full bg-[#52A5CE]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Approval Toggle */}
        <div 
          onClick={() => setRequireApproval(!requireApproval)}
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#AACC96]" />
            <span className="text-[11px] text-slate-300">Require Parent Approval to Award Stars</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${requireApproval ? 'bg-[#52A5CE]' : 'bg-slate-800'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${requireApproval ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>

        {/* Exact button style from app.firstsavvy.com bundle */}
        <div className="pt-2">
          <button
            type="button"
            className="w-full bg-[#52A5CE] hover:bg-[#4392be] text-white text-xs font-semibold px-4 sm:px-6 py-2.5 h-10 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EFCE7B]" />
            <span>Create Task (+{stars} Stars)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
