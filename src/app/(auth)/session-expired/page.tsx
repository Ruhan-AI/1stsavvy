import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Clock, ArrowRight } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size="lg" href="/" />
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
          <Clock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
          Session Expired
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          For your security and financial data protection, your session has timed out after a period of inactivity.
        </p>

        <div className="pt-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow"
          >
            <span>Sign In Again</span>
            <ArrowRight className="w-4 h-4 text-brand-sky" />
          </Link>
        </div>
      </div>
    </div>
  );
}
