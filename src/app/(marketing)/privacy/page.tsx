import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Legal & Compliance</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Privacy Policy</h1>
        <div className="text-xs text-slate-500">
          Last Updated: August 21, 2026 • Policy Version 1.0 (Effective)
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <strong>Important Notice:</strong> First Savvy takes family and child privacy seriously. We never sell your personal information or your children's data to third parties, data brokers, or advertisers.
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">1. Introduction</h2>
          <p>
            First Savvy, Inc. ("First Savvy", "we", "us", or "our") provides a family financial education and personal finance management platform. This Privacy Policy describes how we collect, use, process, and protect your personal information when you visit our website (<code>1stsavvy.com</code>) or use our application (<code>app.firstsavvy.com</code>).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Adult Account Information:</strong> Name, email address, password hash, timezone, currency preference, and household configuration.</li>
            <li><strong>Financial Data:</strong> Bank account balances, transaction history, categories, transaction rules, and manually entered asset/debt valuations. When using Plaid, account credentials remain strictly with Plaid and your financial institution.</li>
            <li><strong>Child Information:</strong> Supervised child profiles (display name, avatar, date of birth for age-appropriate task tiers, hashed PIN). Child data is only collected after verifiable parental consent.</li>
            <li><strong>Usage & Technical Data:</strong> Browser type, IP address, device telemetry, and error logs collected for security and service reliability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">3. Third-Party Service Providers</h2>
          <p>
            We partner with vetted, industry-leading infrastructure and service providers to operate First Savvy securely:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Hosting & Database:</strong> Supabase / Amazon Web Services (AWS) with Row Level Security (RLS) and AES-256 encryption at rest.</li>
            <li><strong>Financial Aggregation:</strong> Plaid Inc. (read-only tokenized account connectivity).</li>
            <li><strong>Transactional Email:</strong> Resend / Postmark (account verification and security alerts).</li>
            <li><strong>Error Monitoring:</strong> Sentry (crash reports with redacted PII and tokens).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">4. Children's Online Privacy (COPPA)</h2>
          <p>
            First Savvy complies with the Children’s Online Privacy Protection Act (COPPA). We do not permit children under 13 to create independent accounts. Child profiles are created strictly by an authenticated parent or legal guardian who provides explicit consent. For complete details, see our <Link href="/children-privacy" className="text-brand-sky font-semibold underline">Children's Privacy Notice</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">5. Your Rights: Access, Export & Deletion</h2>
          <p>
            You have full control over your data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Export:</strong> Download a full machine-readable JSON archive of your household data from Profile Settings.</li>
            <li><strong>Correction:</strong> Update account details, balances, categories, and child profiles at any time.</li>
            <li><strong>Deletion:</strong> Request permanent deletion or anonymization of child profiles or your entire household.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">6. Contact Our Privacy Officer</h2>
          <p>
            If you have questions about this policy or wish to exercise your privacy rights, contact us at <a href="mailto:privacy@1stsavvy.com" className="text-brand-sky underline font-semibold">privacy@1stsavvy.com</a> or visit our <Link href="/contact" className="text-brand-sky underline">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
