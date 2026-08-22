import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ChildrenPrivacyNoticePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">COPPA Compliance</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Children's Privacy Notice</h1>
        <div className="text-xs text-slate-500">Effective Date: August 21, 2026 • Policy Version 1.0</div>
      </div>

      <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-brand-sky/20 flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-brand-sky shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-serif font-bold text-base text-brand-navy dark:text-white">Our Family Privacy Commitment</div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            First Savvy is built around the principle that children should learn healthy money habits in a safe, ad-free, and private environment. We never sell child data, we never serve behavioral ads, and we strictly enforce parental consent controls.
          </div>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">1. Verifiable Parental Consent Required</h2>
          <p>
            In compliance with the Children’s Online Privacy Protection Act (COPPA), child profiles (for individuals under 13 years of age) can only be created by an authenticated parent or legal guardian.
          </p>
          <p>
            Before creating a child profile, the parent must review this notice and check an explicit parental consent confirmation. We record an immutable audit entry including the consenting parent account, policy version, and timestamp.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">2. What Information We Collect About Children</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Profile Information:</strong> Child's first or display name, selected avatar icon and color, and optional date of birth (used strictly for age-appropriate task scheduling).</li>
            <li><strong>Child Credentials:</strong> A simple username and a 4-digit PIN. <em>Technical note:</em> PINs are cryptographically hashed on the server with strong one-way hashing algorithms. PINs are never stored in raw plaintext and cannot be viewed by First Savvy staff. Parents can reset their child's PIN at any time.</li>
            <li><strong>Activity & Progress Data:</strong> Completed tasks, star ledger entries, reward redemption requests, and savings goal progress.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">3. Strict Separation from Adult Financial Data</h2>
          <p>
            Child profiles operate in an isolated sandbox space. Children logged in with their username and PIN CANNOT view:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Adult bank accounts, credit card balances, or transactions</li>
            <li>Household budgets or net worth calculations</li>
            <li>Private notes, legal documents, or password vaults</li>
            <li>Contact details of other household members or financial advisors</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">4. Parental Rights & Controls</h2>
          <p>
            Parents and legal guardians have total authority over their child's profile and may exercise these rights directly within the application:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Review:</strong> View all tasks, star ledger entries, and goals associated with the child.</li>
            <li><strong>Export:</strong> Download a full archive of the child's records in JSON format.</li>
            <li><strong>Revoke Consent & Delete:</strong> Permanently wipe or anonymize the child's data at any time from the Child Profile Settings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">5. Contact Our Privacy Team</h2>
          <p>
            For questions or requests regarding your child's data, please contact our dedicated Privacy Team at <a href="mailto:coppa@1stsavvy.com" className="text-brand-sky font-semibold underline">coppa@1stsavvy.com</a> or <a href="mailto:privacy@1stsavvy.com" className="text-brand-sky font-semibold underline">privacy@1stsavvy.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
