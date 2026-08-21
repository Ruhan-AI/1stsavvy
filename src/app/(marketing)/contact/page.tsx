'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Shield, HelpCircle, Building } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Get in Touch</span>
        <h1 className="text-4xl font-serif font-bold text-brand-navy dark:text-white">Contact FirstSavvy</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Have a question about our family tools, personal finance features, or security? Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-brand-sky flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Customer Support</div>
            <div className="text-xs text-slate-500">Need assistance with your account or setting up tasks?</div>
            <div className="text-xs font-semibold text-brand-sky">support@1stsavvy.com</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Privacy & Security</div>
            <div className="text-xs text-slate-500">COPPA compliance, parental consent, or data deletion inquiries.</div>
            <div className="text-xs font-semibold text-emerald-600">privacy@1stsavvy.com</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-navy-50 dark:bg-slate-800 text-brand-navy dark:text-brand-softBlue flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-brand-navy dark:text-white">Partnerships & Press</div>
            <div className="text-xs text-slate-500">Collaborate on financial literacy curriculum or media.</div>
            <div className="text-xs font-semibold text-brand-navy dark:text-slate-200">partners@1stsavvy.com</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Thank you for reaching out!</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                We have received your message and will respond to <span className="font-semibold text-brand-sky">{email}</span> within 1-2 business days.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="text-xs font-bold text-brand-sky hover:underline pt-2"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-navy dark:text-slate-200">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#222F3E] text-sm text-brand-navy dark:text-white focus:ring-2 focus:ring-brand-sky focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <div className="text-xs text-rose-600 font-medium">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow transition-colors"
              >
                <Send className="w-4 h-4 text-brand-sky" />
                <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
