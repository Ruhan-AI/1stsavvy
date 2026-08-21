import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="bg-[#2B3A4E] text-slate-300 pt-16 pb-12 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-700/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" href="/" />
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              From stars to legacy. FirstSavvy brings family financial education and personal finance management into one connected experience.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-brand-softBlue">
              <ShieldCheck className="w-4 h-4 text-brand-sky" />
              <span>Bank-level 256-bit encryption & COPPA child privacy architecture.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Product</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/family" className="hover:text-brand-sky transition-colors">
                  Family Experience
                </Link>
              </li>
              <li>
                <Link href="/personal-finance" className="hover:text-brand-sky transition-colors">
                  Personal Finance
                </Link>
              </li>
              <li>
                <Link href="/updates" className="inline-flex items-center gap-1 hover:text-brand-sky transition-colors">
                  <span>Feature Updates</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-sky/20 text-brand-sky font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-sky transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-sky transition-colors">
                  About FirstSavvy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-sky transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand-sky transition-colors">
                  Adult Sign In
                </Link>
              </li>
              <li>
                <Link href="/kid-login" className="hover:text-brand-sky transition-colors">
                  Kid Space Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Privacy & Legal</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-brand-sky transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/children-privacy" className="hover:text-brand-sky transition-colors">
                  Children's Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-sky transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/beta-terms" className="hover:text-brand-sky transition-colors">
                  Beta Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-brand-sky transition-colors">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} FirstSavvy, Inc. All rights reserved. FirstSavvy is a financial management platform, not a bank.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms</Link>
            <Link href="/children-privacy" className="hover:text-slate-200 transition-colors">COPPA</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
