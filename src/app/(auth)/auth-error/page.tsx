import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Logo size="lg" href="/" />
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
          Authentication Error
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          We encountered an issue verifying your login credentials or authentication provider token. Please try again.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-semibold inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
