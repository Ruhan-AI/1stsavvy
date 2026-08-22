'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { 
  Star, 
  Sparkles, 
  Smile, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function KidLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('leo');
  const [pin, setPin] = useState('1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !pin) {
      setError('Please enter your username and 4-digit PIN.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Direct child to the supervised Kid View
      router.push('/kid-view');
    }, 600);
  };

  const handleQuickChild = (user: string) => {
    setUsername(user);
    setPin('1234');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-[#F9F7F8] to-amber-50/30 dark:from-[#15202B] dark:to-[#1E293B] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" href="/" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>Kid Space Login</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
          Ready to earn some stars?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Enter your username and 4-digit secret PIN to open your tasks and goals!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1E293B] py-8 px-6 sm:px-10 shadow-xl rounded-3xl border-2 border-brand-sky/30 dark:border-brand-sky/20 space-y-6">
          {/* Quick profile switch for demo */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Demo Profile</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickChild('leo')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  username === 'leo'
                    ? 'bg-sky-50 border-brand-sky text-brand-navy dark:bg-sky-950/60 dark:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-brand-sky text-white flex items-center justify-center text-[10px]">
                  L
                </div>
                <span>Leo (Age 10)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickChild('maya')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  username === 'maya'
                    ? 'bg-sky-50 border-brand-sky text-brand-navy dark:bg-sky-950/60 dark:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-brand-softBlue text-brand-navy flex items-center justify-center text-[10px]">
                  M
                </div>
                <span>Maya (Age 7)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Your Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. leo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-200">4-Digit PIN</label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  placeholder="••••"
                  className="w-full tracking-[0.5em] text-center font-mono text-lg py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 text-center">Default demo PIN is 1234</p>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Opening Kid Space...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Open My Kid Space</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Child Help Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-brand-navy dark:text-white">
              <HelpCircle className="w-4 h-4 text-brand-sky" />
              <span>Forgot your PIN?</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Ask your mom or dad! Parents can easily reset your PIN from their First Savvy dashboard.
            </p>
          </div>

          {/* First Login Privacy Summary */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(!showPrivacyModal)}
              className="text-xs text-slate-500 hover:text-brand-sky flex items-center justify-center gap-1 mx-auto"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>How we keep your info safe (Kid Privacy)</span>
            </button>

            {showPrivacyModal && (
              <div className="mt-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-left text-xs text-slate-700 dark:text-slate-300 space-y-1 animate-in fade-in duration-200">
                <div className="font-bold text-brand-navy dark:text-white">Your Privacy at First Savvy:</div>
                <div>• We only show your own chores, stars, and goals.</div>
                <div>• You cannot see adult bank balances or bills.</div>
                <div>• We never share your name or show ads to kids.</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Are you a parent?{' '}
          <Link href="/login" className="font-bold text-brand-navy dark:text-white hover:underline">
            Switch to Adult Login
          </Link>
        </div>
      </div>
    </div>
  );
}
