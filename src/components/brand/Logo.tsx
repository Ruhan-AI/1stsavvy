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
  // Dimensions map
  const dimensions = {
    sm: { mark: 36, text: 'text-xl', sub: 'text-[9px] tracking-[0.24em]' },
    md: { mark: 46, text: 'text-2xl sm:text-[1.65rem]', sub: 'text-[10px] tracking-[0.28em]' },
    lg: { mark: 58, text: 'text-3xl', sub: 'text-xs tracking-[0.32em]' },
    xl: { mark: 78, text: 'text-4xl sm:text-5xl', sub: 'text-sm tracking-[0.36em]' },
  }[size];

  // Optional full stacked brand lockup
  if (variant === 'stacked') {
    return (
      <div className={`inline-block ${className}`}>
        <img
          src="/brand/logo-light.jpg"
          alt="First Savvy - Stars to Legacy"
          className="dark:hidden rounded-xl max-w-full h-auto shadow-xs"
          style={{ width: dimensions.mark * 3 }}
        />
        <img
          src="/brand/logo-dark.jpg"
          alt="First Savvy - Stars to Legacy"
          className="hidden dark:block rounded-xl max-w-full h-auto shadow-xs"
          style={{ width: dimensions.mark * 3 }}
        />
      </div>
    );
  }

  const content = (
    <div className={`inline-flex items-center gap-3 transition-opacity hover:opacity-95 group ${className}`}>
      {/* Precision Circular Lion & F/S Monogram Crest Asset */}
      <div 
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: dimensions.mark, height: dimensions.mark }}
      >
        <img 
          src="/brand/logo-mark.png" 
          alt="First Savvy Crest"
          className="w-full h-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Typography Wordmark & Tagline */}
      {variant !== 'mark' && (
        <div className="flex flex-col select-none justify-center">
          <span 
            className={`font-serif font-bold leading-none tracking-tight ${dimensions.text} ${
              variant === 'dark' ? 'text-white' : 'text-brand-navy dark:text-white'
            }`}
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", Georgia, serif)' }}
          >
            First Savvy
          </span>
          {showTagline && (
            <span 
              className={`font-sans font-bold uppercase mt-1.5 ${dimensions.sub} ${
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
      <Link href={href} className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg p-0.5" aria-label="First Savvy Home">
        {content}
      </Link>
    );
  }

  return content;
}
