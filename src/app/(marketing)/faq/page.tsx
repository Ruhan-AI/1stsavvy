'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';
import { ArrowRight } from 'lucide-react';

const HeroConstellationCanvas = dynamic(
  () => import('@/components/3d/HeroConstellationCanvas').then(mod => mod.HeroConstellationCanvas),
  { ssr: false }
);

const FAQS = [
  {
    question: 'Is First Savvy a bank?',
    answer: 'No. First Savvy is a family financial education and personal finance management platform, not a bank. We do not hold depository deposits or move real customer money directly. All bank connectivity is handled securely through industry-standard aggregators like Plaid in sandbox/read-only mode.',
  },
  {
    question: 'How does Plaid integration work?',
    answer: 'We use Plaid Link to securely connect with over 12,000 financial institutions. Plaid retrieves read-only balances and transaction history. First Savvy never sees, handles, or stores your banking passwords or raw account credentials.',
  },
  {
    question: 'Can I use First Savvy manually without connecting bank accounts?',
    answer: 'Yes! First Savvy has comprehensive manual account support. You can track cash accounts, manual checking, savings, vehicles, property valuations, loans, and investment holdings with manually entered journals and transactions.',
  },
  {
    question: 'How do family permissions and child access work?',
    answer: 'Each household has an owner and designated adult admins. Parents create supervised child profiles with an age-appropriate 4-digit PIN. Kids can only view their assigned tasks, star ledger, and savings goals. Children CANNOT view adult banking balances, credit scores, transactions, notes, or net worth.',
  },
  {
    question: 'How do you protect children’s privacy (COPPA)?',
    answer: 'We comply strictly with the Children’s Online Privacy Protection Act (COPPA). Child profiles can only be created after explicit, recorded parental consent by an authenticated adult. We do not collect contact info from children without parent authorization, we never sell child data, and we do not serve ads.',
  },
  {
    question: 'How do stars, tasks, and reward goals work?',
    answer: 'Parents assign tasks with specific star values (e.g. 2 stars for making the bed, 4 stars for homework). When kids complete a task, stars are awarded to their immutable ledger. Kids can then request to redeem stars for custom parent-approved rewards or allocate stars toward long-term savings goals.',
  },
  {
    question: 'What age ranges is First Savvy designed for?',
    answer: 'First Savvy is designed to grow with your family: young kids (ages 4–9) thrive on star rewards and visual chores; older kids and teens (ages 10–17) transition to allowances, budgeting, and monetary savings goals; and adults use the full personal finance suite for net worth, budgeting, and investments.',
  },
  {
    question: 'How do data export and account deletion work?',
    answer: 'Parents retain full ownership of their data. From your Profile Settings, you can export all household data in JSON format at any time. When deleting a child profile, you can choose between a complete hard wipe or anonymization.',
  },
  {
    question: 'What roadmap features are coming next?',
    answer: 'We are actively developing Estate Planning tools (wills, trusts, legacy notes), Business & Entrepreneurial profile views, Credit Score monitoring, and secure password vaulting with dedicated end-to-end encryption.',
  },
];

export default function FAQPage() {
  return (
    // §3 — marketing page root rhythm.
    <div className="relative pt-2 sm:pt-4 pb-16 sm:pb-20 space-y-12 sm:space-y-20 lg:space-y-24">
      {/* 3D Background Canvas — decorative, pinned to the top band, never widens the page (§12). */}
      <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[260px] sm:h-[360px] lg:h-[450px] pointer-events-none -z-0 opacity-20 dark:opacity-30 overflow-hidden">
        <CanvasErrorBoundary>
          <HeroConstellationCanvas />
        </CanvasErrorBoundary>
      </div>

      {/* §2 — FAQ/prose container. */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about First Savvy's family experience, security, and personal finance tools."
          items={FAQS}
        />
      </section>

      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-brand-navy text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">Have a question not listed here?</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Our support team is always happy to help with questions about household setup, bank linking, or child security.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[44px] px-4 sm:px-6 py-3 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
