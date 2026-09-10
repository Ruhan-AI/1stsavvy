import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = 'light',
  size = 'sm',
  href = '/',
  className = '',
  showTagline = true,
}: LogoProps) {
  const dimensions = {
    sm: {
      mark: 'w-9 h-9 sm:w-10 sm:h-10',
      text: 'text-xl sm:text-[22px]',
      // §4: 9px is below the legibility floor. 10px is allowed here only because the
      // tagline is uppercase; tighter tracking keeps it on one line at this size.
      sub: 'text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em]',
      taglineMargin: 'mt-1.5 sm:mt-1.5',
    },
    md: {
      mark: 'w-11 h-11 sm:w-12 sm:h-12',
      text: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.25em]',
      taglineMargin: 'mt-1.5 sm:mt-2',
    },
    lg: {
      mark: 'w-14 h-14 sm:w-16 sm:h-16',
      text: 'text-3xl sm:text-4xl',
      sub: 'text-[11px] sm:text-xs tracking-[0.26em]',
      taglineMargin: 'mt-2 sm:mt-2.5',
    },
    xl: {
      mark: 'w-16 h-16 sm:w-20 sm:h-20',
      text: 'text-4xl sm:text-5xl',
      sub: 'text-xs sm:text-sm tracking-[0.28em]',
      taglineMargin: 'mt-2.5 sm:mt-3',
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 max-w-full transition-opacity hover:opacity-95 group ${className}`}>
      {/* Circular Lion Crest Mark */}
      <div className={`relative shrink-0 flex items-center justify-center ${dimensions.mark}`}>
        <img
          src="/brand/logo-mark.png"
          alt="First Savvy Crest"
          className="w-full h-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Typography Wordmark & Tagline: First Savvy + STARS TO LEGACY */}
      {variant !== 'mark' && (
        <div className="flex min-w-0 flex-col select-none justify-center">
          {/* whitespace-nowrap: a brand name must never break across lines. Without it
              the header lockup wrapped to "First / Savvy" at 768px and grew to 83px,
              overflowing the 64px header. */}
          <span
            className={`font-serif font-bold leading-none tracking-normal whitespace-nowrap ${dimensions.text} ${
              variant === 'dark' ? 'text-white' : 'text-[#1D2D42] dark:text-white'
            }`}
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", Georgia, serif)' }}
          >
            First Savvy
          </span>
          {showTagline && (
            <span
              className={`font-sans font-bold uppercase whitespace-nowrap leading-none ${dimensions.taglineMargin} ${dimensions.sub} text-[#2FA4E7] dark:text-[#38BDF8]`}
            >
              STARS TO LEGACY
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="min-h-[44px] group inline-flex items-center max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg p-0.5"
        aria-label="First Savvy Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
