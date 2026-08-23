'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, Users, Gift } from 'lucide-react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'MILLER-SAVVY-2026';
  const referralLink = `https://1stsavvy.com/signup?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Community & Growth</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white mt-1">
          Refer a Family & Affiliate Program
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Share First Savvy with friends and earn priority early access rewards for your household.
        </p>
      </div>

      {/* Referral Link Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-softBlue">Your Unique Household Link</div>
          <h2 className="text-2xl font-serif font-bold">Invite friends & relatives to First Savvy</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
            When a family signs up using your link, they will bypass the early access waitlist automatically.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="min-h-[44px] flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-base sm:text-xs text-white font-mono focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="min-h-[44px] px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Referral Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats and Affiliate Module Coming Soon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-sky" />
            <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Referred Families</h3>
          </div>
          <div className="text-3xl font-bold text-brand-navy dark:text-white">0</div>
          <p className="text-xs text-slate-500">No referred households yet. Share your code to get started!</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-white">Affiliate Partner Program</h3>
            </div>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              Coming Soon
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            We are preparing a verified educational affiliate program for parent bloggers, financial coaches, and teachers.
          </p>
        </div>
      </div>
    </div>
  );
}
