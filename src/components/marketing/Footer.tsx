import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { ShieldCheck } from 'lucide-react';

// §5 — nav & footer link touch target. Shared by every link in the column lists so
// the whole footer uses one target size, one hover treatment, one type ladder.
const footerLink =
  'inline-flex items-center min-h-[44px] lg:min-h-0 lg:py-1 hover:text-[#52A5CE] transition-colors';

// §5 — same ladder for the legal strip in the bottom bar (different hover colour only).
const legalLink =
  'inline-flex items-center min-h-[44px] lg:min-h-0 lg:py-1 hover:text-slate-300 transition-colors';

export function MarketingFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0F172A] via-[#0B131B] to-[#070B10] text-slate-300 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-gradient-to-r from-[#52A5CE]/10 via-[#AACC96]/10 to-[#EFCE7B]/10 blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* §6 — footer grid ladder: 1 → 2 → 5, brand column spans 2 at `sm` and `lg`. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-16 border-b border-slate-800">
          {/* Brand Col */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
            <Logo variant="dark" size="md" href="/" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              From stars to legacy. First Savvy brings family financial education and personal finance management into one connected experience.
            </p>
            <div className="pt-2 flex items-start gap-2 text-xs sm:text-sm text-[#52A5CE]">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#AACC96]" />
              <span className="text-slate-400">Bank-level 256-bit encryption &amp; COPPA child privacy architecture.</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="min-w-0 space-y-2 sm:space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Product</div>
            <ul className="space-y-1 lg:space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/family" className={footerLink}>
                  Family Experience
                </Link>
              </li>
              <li>
                <Link href="/personal-finance" className={footerLink}>
                  Personal Finance
                </Link>
              </li>
              <li>
                <Link href="/updates" className={`${footerLink} gap-1.5 flex-wrap`}>
                  <span>Feature Updates</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#52A5CE]/20 text-[#52A5CE] font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className={footerLink}>
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="min-w-0 space-y-2 sm:space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="space-y-1 lg:space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className={footerLink}>
                  About First Savvy
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLink}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className={footerLink}>
                  Adult Sign In
                </Link>
              </li>
              <li>
                <Link href="/kid-login" className={footerLink}>
                  Kid Space Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="min-w-0 space-y-2 sm:space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Privacy &amp; Legal</div>
            <ul className="space-y-1 lg:space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className={footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/children-privacy" className={footerLink}>
                  Children's Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/beta-terms" className={footerLink}>
                  Beta Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={footerLink}>
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — stacks at 320 px, single row from `sm` up (§6/§5). */}
        <div className="pt-6 sm:pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-500">
          <p className="min-w-0 text-center text-balance sm:text-left">
            © {new Date().getFullYear()} First Savvy, Inc. All rights reserved. First Savvy is a financial management platform, not a bank.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:shrink-0">
            <Link href="/privacy" className={legalLink}>Privacy</Link>
            <Link href="/terms" className={legalLink}>Terms</Link>
            <Link href="/children-privacy" className={legalLink}>COPPA</Link>
            <Link href="/contact" className={legalLink}>Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
