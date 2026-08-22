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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-20 space-y-16 relative">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 max-w-5xl mx-auto h-[450px] pointer-events-none -z-0 opacity-20 dark:opacity-30 overflow-hidden">
        <CanvasErrorBoundary>
          <HeroConstellationCanvas />
        </CanvasErrorBoundary>
      </div>

      {/* 1. Header */}
      <div className="text-center space-y-3 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Get in Touch</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-navy dark:text-white">Contact First Savvy</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Have a question about our family tools, personal finance features, or security? Our team is here to help.
        </p>
      </div>

      {/* 2. Contact Info & Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Customer Support</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Need assistance with your account or task ledger?</div>
            <div className="text-xs font-semibold text-brand-sky pt-1">support@1stsavvy.com</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Privacy & Security</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">COPPA compliance, parental consent, or data deletion.</div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">privacy@1stsavvy.com</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Partnerships & Press</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Collaborate on financial literacy curriculum or media.</div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-1">partners@1stsavvy.com</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Thank you for reaching out!</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                We have received your message and will respond to <span className="font-semibold text-brand-sky">{email}</span> within 1 business day.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="text-xs font-bold text-brand-sky hover:underline pt-2 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Sarah Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="sarah@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support & Technical Help</option>
                  <option value="privacy">Privacy, COPPA & Data Requests</option>
                  <option value="partnerships">Partnerships & Financial Education</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="How can we help your family?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <div className="text-xs text-rose-600 font-medium">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-brand-sky" />
                <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Relevant Support FAQs Section */}
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

      {/* 4. High-Impact CTA Banner */}
      <ScrollReveal direction="scale">
        <div className="p-8 sm:p-14 rounded-3xl bg-brand-navy dark:bg-slate-900 border border-slate-800 text-white text-center space-y-5 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">
              Start Your Family Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white max-w-xl mx-auto leading-tight">
              <TextReveal text="Ready to experience calm, connected money management?" />
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Create your household workspace in under 2 minutes. Teach kids lifelong habits with stars and allowances, while tracking your family net worth in one unified place.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/family"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/15 transition-colors inline-flex items-center justify-center"
            >
              <span>Explore Family Experience</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
