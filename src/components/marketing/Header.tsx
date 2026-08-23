'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../brand/Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Product', href: '/#how-it-works' },
    { name: 'Family', href: '/family' },
    { name: 'Personal Finance', href: '/personal-finance' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Close the drawer whenever the route changes (§10).
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open (§10).
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#F9F7F8]/90 dark:bg-[#1A232E]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-3 min-w-0">
        {/* Brand Logo */}
        <div className="min-w-0 shrink">
          <Logo size="sm" href="/" />
        </div>

        {/* Desktop Navigation - Direct Clean Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`inline-flex items-center min-h-[44px] lg:min-h-0 lg:py-1 whitespace-nowrap text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-brand-sky dark:text-brand-sky'
                    : 'text-brand-navy dark:text-slate-200 hover:text-brand-sky dark:hover:text-brand-sky'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center min-h-[44px] lg:min-h-0 lg:py-2 px-3 whitespace-nowrap text-sm font-semibold text-brand-navy dark:text-slate-200 hover:text-brand-sky transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-semibold whitespace-nowrap shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4 shrink-0 text-brand-sky" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 rounded-xl text-brand-navy dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="marketing-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          id="marketing-mobile-menu"
          className="lg:hidden bg-white dark:bg-[#1A232E] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 shadow-xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center min-h-[44px] lg:min-h-0 lg:py-1 px-3 text-sm font-semibold text-brand-navy dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-brand-navy dark:text-white"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg bg-brand-navy text-white text-sm font-semibold shadow"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
