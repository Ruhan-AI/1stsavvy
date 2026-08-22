'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  items?: FAQItem[];
  className?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'How does First Savvy help kids learn about money?',
    answer:
      'First Savvy uses an immutable star ledger where kids earn stars by completing supervised chores and homework. Stars can be redeemed for parent-approved rewards, saved toward long-term goals, or converted into scheduled allowances.',
  },
  {
    question: 'Is First Savvy compliant with children’s online privacy laws (COPPA)?',
    answer:
      'Yes, First Savvy is strictly compliant with the Children’s Online Privacy Protection Act (COPPA). We isolate child spaces, require verifiable parental consent, and never allow third-party tracking, behavioral advertising, or data sharing on child accounts.',
  },
  {
    question: 'How do personal finance accounts connect to First Savvy?',
    answer:
      'We provide secure read-only bank synchronization powered by Plaid with 256-bit encryption. You can also manually add and track cash, vehicles, real estate, and customized debt accounts.',
  },
  {
    question: 'Can kids see my bank balances or household net worth?',
    answer:
      'No. Child profiles are completely segregated with custom PIN or password controls. Kids only see their personal tasks, earned stars, and assigned goals.',
  },
  {
    question: 'Can I export my household financial data at any time?',
    answer:
      'Yes. You maintain full ownership of your data and can export an encrypted JSON backup of your entire household workspace anytime from Settings.',
  },
];

export function FAQAccordion({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about how First Savvy works for your family and personal finances.',
  eyebrow = 'Got Questions?',
  items = DEFAULT_FAQS,
  className = '',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`max-w-4xl mx-auto py-6 ${className}`}>
      {/* Accordion Items */}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-[#1E293B] border-brand-sky/40 shadow-sm ring-1 ring-brand-sky/20'
                  : 'bg-white/70 dark:bg-[#1E293B]/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-sky/10 text-brand-sky text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span className="font-bold text-sm sm:text-base text-brand-navy dark:text-white">
                    {item.question}
                  </span>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-sky' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
