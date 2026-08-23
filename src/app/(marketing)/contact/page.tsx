'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Mail, Send, CheckCircle2, MessageSquare, Shield, HelpCircle, Building, ArrowRight, Sparkles, Clock, FileQuestion } from 'lucide-react';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { ScrollReveal, TextReveal, FadeIn } from '@/components/animations/MotionWrappers';
import { CanvasErrorBoundary } from '@/components/3d/CanvasErrorBoundary';

const HeroConstellationCanvas = dynamic(
  () => import('@/components/3d/HeroConstellationCanvas').then(mod => mod.HeroConstellationCanvas),
  { ssr: false }
);

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'support' | 'partnerships' | 'privacy' | 'general'>('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('firstsavvy_contact_submissions') || '[]');
        stored.push({
          name,
          email,
          category,
          message,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('firstsavvy_contact_submissions', JSON.stringify(stored));
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMessage('Failed to send message. Please try again.');
      }
    }, 600);
  };

  return (
    // §2 narrow marketing container + §3 marketing page rhythm.
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 sm:pb-20 space-y-12 sm:space-y-20 lg:space-y-24 relative">
      {/* 3D Background Canvas — decorative, pinned to the top band, never widens the page (§12). */}
      <div className="absolute inset-x-0 top-0 max-w-5xl mx-auto h-[260px] sm:h-[360px] lg:h-[450px] pointer-events-none -z-0 opacity-20 dark:opacity-30 overflow-hidden">
        <CanvasErrorBoundary>
          <HeroConstellationCanvas />
        </CanvasErrorBoundary>
      </div>

      {/* 1. Header */}
      <div className="text-center space-y-3 relative z-10">
        <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-navy dark:text-white leading-tight">Contact First Savvy</h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Have a question about our family tools, personal finance features, or security? Our team is here to help.
        </p>
      </div>

      {/* 2. Contact Info & Form Grid — §6 asymmetric split. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 relative z-10">
        {/* Contact Info Cards — 3-up strip on tablets, single stacked rail either side of it. */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">
          <div className="h-full min-w-0 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Customer Support</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">Need assistance with your account or task ledger?</div>
            <div className="text-xs sm:text-sm font-semibold text-brand-sky pt-1 break-words">support@1stsavvy.com</div>
          </div>

          <div className="h-full min-w-0 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Privacy & Security</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">COPPA compliance, parental consent, or data deletion.</div>
            <div className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 pt-1 break-words">privacy@1stsavvy.com</div>
          </div>

          <div className="h-full min-w-0 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Building className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-brand-navy dark:text-white">Partnerships & Press</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">Collaborate on financial literacy curriculum or media.</div>
            <div className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 pt-1 break-words">partners@1stsavvy.com</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 min-w-0 p-4 sm:p-6 lg:p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-8 sm:py-12 space-y-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white leading-tight">Thank you for reaching out!</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                We have received your message and will respond to <span className="font-semibold text-brand-sky break-all">{email}</span> within 1 business day.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm font-bold text-brand-sky hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* §6 — `sm:grid-cols-2` only for the genuinely paired name/email row. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 min-w-0">
                  <label htmlFor="contact-name" className="block text-xs sm:text-sm font-bold text-brand-navy dark:text-slate-200">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Sarah Miller"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <label htmlFor="contact-email" className="block text-xs sm:text-sm font-bold text-brand-navy dark:text-slate-200">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="sarah@example.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 min-w-0">
                <label htmlFor="contact-category" className="block text-xs sm:text-sm font-bold text-brand-navy dark:text-slate-200">Inquiry Category</label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support & Technical Help</option>
                  <option value="privacy">Privacy, COPPA & Data Requests</option>
                  <option value="partnerships">Partnerships & Financial Education</option>
                </select>
              </div>

              <div className="space-y-1.5 min-w-0">
                <label htmlFor="contact-message" className="block text-xs sm:text-sm font-bold text-brand-navy dark:text-slate-200">Your Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="How can we help your family?"
                  className="w-full min-h-[120px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-base sm:text-sm text-brand-navy dark:text-white resize-y focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <div className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 font-medium break-words">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full min-h-[44px] px-4 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
              >
                <Send className="w-4 h-4 shrink-0 text-brand-sky" />
                <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Relevant Support FAQs Section — §2 prose/FAQ measure inside the page gutter. */}
      <section className="relative z-10 max-w-3xl mx-auto">
        <FAQAccordion
        eyebrow="Help & Support FAQs"
        title="Frequently Asked Support Questions"
        subtitle="Quick answers to common questions about getting help, response times, and account management."
        items={[
          {
            question: 'How fast does First Savvy customer support respond?',
            answer:
              'Our support team typically responds to all inquiries within 1 business day (often within a few hours). Dedicated priority support is active for all onboarded household accounts.',
          },
          {
            question: 'How do I report a technical issue or request a feature?',
            answer:
              'You can use the form above by selecting "Customer Support & Technical Help" or email us directly at support@1stsavvy.com. We continuously incorporate user feedback into our monthly product roadmap.',
          },
          {
            question: 'How can I request permanent deletion of my household or child data?',
            answer:
              'In strict compliance with COPPA and privacy standards, you can request full data purge anytime. Select "Privacy, COPPA & Data Requests" above or email privacy@1stsavvy.com. All linked accounts, star ledgers, and profile histories are permanently erased.',
          },
          {
            question: 'Can schools, coaches, or organizations partner with First Savvy?',
            answer:
              'Yes! We partner with educational programs, homeschooling networks, and family advisors. Choose "Partnerships & Financial Education" in the inquiry form or reach out to partners@1stsavvy.com.',
          },
          ]}
        />
      </section>

      {/* 4. High-Impact CTA Banner */}
      <ScrollReveal direction="scale">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-brand-navy dark:bg-slate-900 border border-slate-800 text-white text-center space-y-5 shadow-2xl relative z-10 overflow-hidden">
          {/*
            Subtle Background Glow Accent.
            These orbs used to be `-top-24 -right-24 w-64 h-64`, i.e. 96px wider than
            their `overflow-hidden` parent on every viewport — the permanent `clip:`
            hit the audit reported for /contact at 320 through 1440. They are now
            anchored inside the panel box (same pattern as the homepage CTA), so
            nothing extends past the clipping edge while the blur still bleeds colour
            into the corners.
          */}
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-brand-sky">
              Start Your Family Journey
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white max-w-xl mx-auto leading-tight">
              <TextReveal text="Ready to experience calm, connected money management?" />
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Create your household workspace in under 2 minutes. Teach kids lifelong habits with stars and allowances, while tracking your family net worth in one unified place.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              href="/family"
              className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/15 transition-colors inline-flex items-center justify-center text-center"
            >
              <span>Explore Family Experience</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
