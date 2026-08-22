'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Globe, 
  DollarSign, 
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Personal Info & Credentials
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Miller');
  const [email, setEmail] = useState('sarah.miller@example.com');
  const [password, setPassword] = useState('FirstSavvy2026!');
  const [confirmPassword, setConfirmPassword] = useState('FirstSavvy2026!');

  // Step 2: Email Verification
  const [verificationCode, setVerificationCode] = useState('849201');

  // Step 3: Household Config
  const [householdName, setHouseholdName] = useState('The Miller Family');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/New_York');

  // Step 4: Legal Consents
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [agreeBeta, setAgreeBeta] = useState(true);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strength = getPasswordStrength();

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (strength < 2) {
      setError('Please choose a stronger password.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length < 4) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!householdName) {
      setError('Please provide a name for your household.');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleCompleteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms || !agreePrivacy || !agreeBeta) {
      setError('Please review and accept the Terms of Use, Privacy Policy, and Beta Terms.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Save household state and redirect to dashboard
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F8] dark:bg-[#1A232E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" href="/" />
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white">
          Create your Household
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Step {step} of 4: {step === 1 ? 'Your Account' : step === 2 ? 'Verify Email' : step === 3 ? 'Household Setup' : 'Legal & Privacy'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-sky h-full transition-all duration-300 rounded-full" 
            style={{ width: `${(step / 4) * 100}%` }} 
          />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1E293B] py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: ACCOUNT CREDENTIALS */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
                {/* Strength Meter */}
                <div className="grid grid-cols-4 gap-1 pt-1">
                  <div className={`h-1 rounded-full ${strength >= 1 ? 'bg-amber-400' : 'bg-slate-200'}`} />
                  <div className={`h-1 rounded-full ${strength >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                  <div className={`h-1 rounded-full ${strength >= 3 ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                  <div className={`h-1 rounded-full ${strength >= 4 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow"
              >
                <span>Continue to Verification</span>
                <ArrowRight className="w-4 h-4 text-brand-sky" />
              </button>
            </form>
          )}

          {/* STEP 2: EMAIL VERIFICATION */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-brand-sky flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Verify your email</h3>
                <p className="text-xs text-slate-500">
                  We sent a 6-digit verification code to <span className="font-semibold text-brand-sky">{email}</span>.
                </p>
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  placeholder="849201"
                  className="w-48 mx-auto text-center tracking-[0.5em] text-xl font-mono py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              <div className="text-[11px] text-slate-400">
                Sandbox Mode: Default code pre-filled for testing.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow"
                >
                  <span>Verify Email</span>
                  <ArrowRight className="w-4 h-4 text-brand-sky" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: HOUSEHOLD CONFIGURATION */}
          {step === 3 && (
            <form onSubmit={handleStep3} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Household Name</label>
                <input
                  type="text"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  required
                  placeholder="The Miller Family"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">You can invite your partner or add children once created.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Primary Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  >
                    <option value="America/New_York">Eastern (EST)</option>
                    <option value="America/Chicago">Central (CST)</option>
                    <option value="America/Denver">Mountain (MST)</option>
                    <option value="America/Los_Angeles">Pacific (PST)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow"
                >
                  <span>Continue to Legal</span>
                  <ArrowRight className="w-4 h-4 text-brand-sky" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: LEGAL CONSENTS & FINISH */}
          {step === 4 && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div className="text-xs text-slate-500">
                Please review and accept our platform terms before entering your workspace:
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-sky focus:ring-brand-sky cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-700 dark:text-slate-300 leading-tight select-none">
                    I agree to the <Link href="/terms" target="_blank" className="text-brand-sky underline font-semibold">Terms of Use</Link> and understand First Savvy is not a bank.
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-sky focus:ring-brand-sky cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-xs text-slate-700 dark:text-slate-300 leading-tight select-none">
                    I have reviewed the <Link href="/privacy" target="_blank" className="text-brand-sky underline font-semibold">Privacy Policy</Link> and <Link href="/children-privacy" target="_blank" className="text-brand-sky underline font-semibold">Children's Privacy Notice</Link>.
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="beta"
                    checked={agreeBeta}
                    onChange={(e) => setAgreeBeta(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-sky focus:ring-brand-sky cursor-pointer"
                  />
                  <label htmlFor="beta" className="text-xs text-slate-700 dark:text-slate-300 leading-tight select-none">
                    I accept the <Link href="/beta-terms" target="_blank" className="text-brand-sky underline font-semibold">Beta Terms</Link> for early access testing.
                  </label>
                </div>

                <div className="flex items-start gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-sky focus:ring-brand-sky cursor-pointer"
                  />
                  <label htmlFor="marketing" className="text-xs text-slate-500 leading-tight select-none">
                    (Optional) Send me product updates, financial education articles, and tips.
                  </label>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Creating Workspace...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Setup & Enter</span>
                      <ArrowRight className="w-4 h-4 text-emerald-200" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Social Auth Separator */}
          {step === 1 && (
            <div className="pt-2 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-brand-sky hover:underline">
                Sign in here
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
