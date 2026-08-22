import React from 'react';
import Link from 'next/link';

export default function BetaTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Early Access</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Beta Testing Terms</h1>
        <div className="text-xs text-slate-500">Effective Date: August 21, 2026</div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">1. Beta Program Scope</h2>
          <p>
            First Savvy is currently operating an early access beta program to refine and optimize the user experience with real families. Features labeled "Beta" or "Early Access" are provided for testing and evaluation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">2. Feedback & Iteration</h2>
          <p>
            Participants are encouraged to provide feedback, report unexpected issues, and suggest improvements. Any feedback, ideas, or suggestions provided become the property of First Savvy without obligation for compensation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">3. As-Is Availability</h2>
          <p>
            While we strive for high uptime and data integrity, beta features may be modified, updated, or temporarily unavailable during maintenance and upgrades.
          </p>
        </section>
      </div>
    </div>
  );
}
