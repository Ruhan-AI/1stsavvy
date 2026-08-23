'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface WaitlistFormProps {
  category?: 'feature_updates' | 'family' | 'business' | 'estate_planning';
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function WaitlistForm({
  category = 'feature_updates',
  buttonText = 'Join the Waitlist',
  placeholder = 'Enter your email address',
  className = '',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Please consent to receive product and feature updates.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API delay and local storage persistence
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('firstsavvy_waitlist') || '[]');
        stored.push({
          email,
          category,
          consentGiven: true,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('firstsavvy_waitlist', JSON.stringify(stored));
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMessage('Failed to submit. Please try again.');
      }
    }, 600);
  };

  if (status === 'success') {
    return (
      <div className={`p-4 sm:p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-emerald-800 dark:text-emerald-200 animate-in fade-in duration-300 ${className}`}>
        <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="min-w-0 text-sm sm:text-base font-medium text-left leading-relaxed">
          You're on the list! We'll notify <span className="font-bold underline break-all">{email}</span> as soon as updates go live.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full min-w-0 space-y-3 ${className}`}>
      {/* §5 — stacked input + button on phones, inline from `sm`. */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder={placeholder}
            required
            className="w-full min-h-[44px] pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto min-h-[44px] px-4 sm:px-6 py-3 rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-200 shrink-0 disabled:opacity-70 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-sky" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 text-brand-sky" />
            </>
          )}
        </button>
      </div>

      {/* §5 — checkbox is `w-5 h-5` inside a label wrapper of at least 44px. */}
      <label
        htmlFor={`consent-${category}`}
        className="flex items-start gap-2.5 min-h-[44px] py-1.5 text-left cursor-pointer select-none"
      >
        <input
          type="checkbox"
          id={`consent-${category}`}
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-5 h-5 shrink-0 rounded border-slate-300 text-brand-sky focus:ring-brand-sky"
        />
        <span className="min-w-0 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-snug">
          I agree to receive occasional updates about First Savvy. We never sell your personal data. You can unsubscribe at any time.
        </span>
      </label>

      {status === 'error' && (
        <div className="flex items-start gap-1.5 text-xs sm:text-sm text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="min-w-0 break-words">{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
