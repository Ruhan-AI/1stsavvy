import React from 'react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Terms & Conditions</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Terms of Use</h1>
        <div className="text-xs text-slate-500">Effective Date: August 21, 2026</div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing, or using FirstSavvy, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, do not use the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">2. Not a Bank / Financial Advice Disclaimer</h2>
          <p>
            FirstSavvy is an educational and personal financial organization tool. FirstSavvy is not a bank, broker-dealer, financial planner, investment advisor, or tax authority. All calculations, net worth trends, and budgeting estimates are for informational and educational purposes only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">3. User Responsibilities & Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials and PINs. You agree to notify us immediately of any unauthorized access to your household account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">4. Parental Supervision of Child Profiles</h2>
          <p>
            Parents and legal guardians are solely responsible for supervising their children's activities on FirstSavvy, setting appropriate task rewards, and approving redemptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">5. Termination</h2>
          <p>
            You may terminate your account at any time. We reserve the right to suspend or terminate accounts that violate our terms, attempt reverse engineering, or engage in abusive conduct.
          </p>
        </section>
      </div>
    </div>
  );
}
