import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0F172A] via-[#0B131B] to-[#070B10] text-slate-300 pt-16 pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-gradient-to-r from-[#52A5CE]/10 via-[#AACC96]/10 to-[#EFCE7B]/10 blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" href="/" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              From stars to legacy. First Savvy brings family financial education and personal finance management into one connected experience.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#52A5CE]">
              <ShieldCheck className="w-4 h-4 text-[#AACC96]" />
              <span className="text-slate-400">Bank-level 256-bit encryption & COPPA child privacy architecture.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Product</div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/family" className="hover:text-[#52A5CE] transition-colors">
                  Family Experience
                </Link>
              </li>
              <li>
                <Link href="/personal-finance" className="hover:text-[#52A5CE] transition-colors">
                  Personal Finance
                </Link>
              </li>
              <li>
                <Link href="/updates" className="inline-flex items-center gap-1 hover:text-[#52A5CE] transition-colors">
                  <span>Feature Updates</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#52A5CE]/20 text-[#52A5CE] font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#52A5CE] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-[#52A5CE] transition-colors">
                  About First Savvy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#52A5CE] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#52A5CE] transition-colors">
                  Adult Sign In
                </Link>
              </li>
              <li>
                <Link href="/kid-login" className="hover:text-[#52A5CE] transition-colors">
                  Kid Space Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Privacy & Legal</div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-[#52A5CE] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/children-privacy" className="hover:text-[#52A5CE] transition-colors">
                  Children's Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#52A5CE] transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/beta-terms" className="hover:text-[#52A5CE] transition-colors">
                  Beta Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#52A5CE] transition-colors">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} First Savvy, Inc. All rights reserved. First Savvy is a financial management platform, not a bank.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/children-privacy" className="hover:text-slate-300 transition-colors">COPPA</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
