'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('sarah.miller@example.com');
  const [password, setPassword] = useState('FirstSavvy2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Successful auth simulation -> redirect to dashboard
      router.push('/dashboard');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" href="/" />
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Sign in to manage your household finances and family goals.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1E293B] py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Quick Demo Pre-fill Banner */}
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-brand-sky/20 text-xs text-brand-navy dark:text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
              <span>Demo Account Loaded</span>
            </span>
            <span className="font-mono text-[11px] text-brand-sky">The Miller Family</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="min-h-[44px] w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Password</label>
                <Link href="/forgot-password" className="inline-flex min-h-[44px] items-center text-xs font-semibold text-brand-sky hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="min-h-[44px] w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex min-w-[44px] items-center justify-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
              className="min-h-[44px] w-full py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-sky" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Adult</span>
                  <ArrowRight className="w-4 h-4 text-brand-sky" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#1E293B] px-3 text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google Auth Sandbox Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="min-h-[44px] w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-bold text-brand-navy dark:text-white inline-flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Kid Space Switcher */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/kid-login"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline p-1"
            >
              <span>Are you a kid? Go to Kid Space Login (PIN) →</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have a household yet?{' '}
          <Link href="/signup" className="inline-flex items-center min-h-[44px] font-bold text-brand-sky hover:underline">
            Create your account for free
          </Link>
        </div>
      </div>
    </div>
  );
}
