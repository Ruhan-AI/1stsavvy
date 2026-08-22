'use client';

import React, { useState } from 'react';
import { Search, CreditCard, Landmark, Users, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';

export function LiveGlobalSearchPreview() {
  const [searchTerm, setSearchTerm] = useState('Whole Foods');

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden select-none text-left font-sans">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF6F3C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFCE7B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#AACC96]" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52A5CE] animate-pulse" />
          <span>Global Search — Accounts, Transactions & Family</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">⌘K</div>
      </div>

      {/* Interactive Search Bar */}
      <div className="p-4 sm:p-5 bg-slate-950/95 space-y-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#52A5CE]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accounts, merchants, categories, or family members..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#52A5CE] transition-colors font-sans"
          />
        </div>

        {/* Results Stream */}
        <div className="space-y-3">
          {/* Section: Transactions */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#52A5CE]" /> Matching Transactions (2)
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#52A5CE]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#52A5CE]/10 text-[#52A5CE] flex items-center justify-center font-bold text-xs">
                    WF
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Whole Foods Market — Columbus Circle</div>
                    <div className="text-[10px] text-slate-400">Groceries • Card ...4921 • Yesterday</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-sm text-slate-200">-$164.50</div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#52A5CE]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#52A5CE]/10 text-[#52A5CE] flex items-center justify-center font-bold text-xs">
                    WF
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Whole Foods Market — Weekly Groceries</div>
                    <div className="text-[10px] text-slate-400">Groceries • Card ...4921 • Aug 11</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-sm text-slate-200">-$142.10</div>
              </div>
            </div>
          </div>

          {/* Section: Accounts & Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Landmark className="w-3 h-3 text-[#AACC96]" /> Connected Account
              </div>
              <div className="text-xs font-bold text-white">Primary Family Checking (...4921)</div>
              <div className="text-[11px] text-slate-400">$18,450.20 Available</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#EFCE7B]" /> Family Profile
              </div>
              <div className="text-xs font-bold text-white">Emma Miller (Child Profile)</div>
              <div className="text-[11px] text-[#EFCE7B] font-medium">★ 45 Stars Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
