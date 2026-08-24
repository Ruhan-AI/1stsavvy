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
  size = 'md',
  href = '/',
  className = '',
  showTagline = true,
}: LogoProps) {
  /**
   * Responsive size ladders (docs/responsive-system.md §4).
   *
   * `mark` and `lockup` are Tailwind class ladders rather than fixed pixel values so
   * the crest shrinks on 320 px phones and grows back from `sm` up. `sub` uses the
   * spec's micro-badge ladder for the uppercase tagline; the old 9 px size is banned.
   */
  const dimensions = {
    sm: {
      mark: 'w-9 h-9 sm:w-10 sm:h-10',
      lockup: 'w-[96px] sm:w-[108px]',
      text: 'text-xl sm:text-2xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em]',
    },
    md: {
      mark: 'w-11 h-11 sm:w-[52px] sm:h-[52px]',
      lockup: 'w-[120px] sm:w-[138px]',
      text: 'text-2xl sm:text-3xl lg:text-[2rem]',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em]',
    },
    lg: {
      mark: 'w-14 h-14 sm:w-[66px] sm:h-[66px]',
      lockup: 'w-[144px] sm:w-[174px]',
      text: 'text-3xl sm:text-4xl',
      sub: 'text-[11px] sm:text-xs tracking-[0.22em] sm:tracking-[0.26em]',
    },
    xl: {
      mark: 'w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]',
      lockup: 'w-[180px] sm:w-[234px]',
      text: 'text-4xl sm:text-5xl lg:text-6xl',
      sub: 'text-xs sm:text-sm tracking-[0.26em] sm:tracking-[0.3em]',
    },
  }[size];

  // Optional full stacked brand lockup
  if (variant === 'stacked') {
    return (
      <div className={`inline-block max-w-full ${className}`}>
        <img
          src="/brand/logo-light.jpg"
          alt="First Savvy - Stars to Legacy"
          className={`dark:hidden rounded-xl max-w-full h-auto shadow-xs ${dimensions.lockup}`}
        />
        <img
          src="/brand/logo-dark.jpg"
          alt="First Savvy - Stars to Legacy"
          className={`hidden dark:block rounded-xl max-w-full h-auto shadow-xs ${dimensions.lockup}`}
        />
      </div>
    );
  }

  const content = (
    <div className={`inline-flex items-center gap-2 sm:gap-3 max-w-full transition-opacity hover:opacity-95 group ${className}`}>
      {/* Precision Circular Lion & F/S Monogram Crest Asset */}
      <div className={`relative shrink-0 flex items-center justify-center ${dimensions.mark}`}>
        <img
          src="/brand/logo-mark.png"
          alt="First Savvy Crest"
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Typography Wordmark & Tagline */}
      {variant !== 'mark' && (
        <div className="flex min-w-0 flex-col select-none justify-center">
          <span 
            className={`font-serif font-bold leading-none tracking-normal ${dimensions.text} ${
              variant === 'dark' ? 'text-white' : 'text-brand-navy dark:text-white'
            }`}
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", Georgia, serif)' }}
          >
            {/* The wordmark is the one place the name is set solid. Everywhere else in
                the product it is written "First Savvy", with the space. */}
            FirstSavvy
          </span>
          {showTagline && (
            <span 
              className={`font-sans font-bold uppercase mt-1 sm:mt-1.5 ${dimensions.sub} ${
                variant === 'dark' ? 'text-brand-sky' : 'text-brand-sky dark:text-brand-softBlue'
              }`}
            >
              Stars To Legacy
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="min-h-[44px] group inline-block max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg p-0.5" aria-label="First Savvy Home">
        {content}
      </Link>
    );
  }

  return content;
}
