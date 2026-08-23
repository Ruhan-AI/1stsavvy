'use client';

import React from 'react';

interface BrandLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
  showTagline?: boolean;
  message?: string;
}

export function BrandLoader({
  size = 'md',
  className = '',
  showTagline = false,
  message,
}: BrandLoaderProps) {
  // Responsive size ladder — mirrors the Logo crest ladder (docs/responsive-system.md §4).
  const sizeStyles = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28',
    lg: 'w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44',
    fullscreen: 'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40',
  }[size];

  const loaderElement = (
    <div className={`flex max-w-full flex-col items-center justify-center gap-2 ${className}`}>
      {/* Optimized Video Animation Container - focused on crest */}
      <div className={`relative ${sizeStyles} flex items-center justify-center overflow-hidden rounded-2xl`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/brand/loader-poster.png"
          className="w-full h-full object-contain pointer-events-none drop-shadow-sm select-none scale-[1.9] -translate-y-4"
          style={{
            filter: 'invert(1) hue-rotate(180deg) brightness(0.92) contrast(1.25)',
            mixBlendMode: 'multiply',
          }}
        >
          <source src="/brand/loader.webm" type="video/webm" />
          <source src="/brand/loader.mp4" type="video/mp4" />
          {/* Fallback image if video is not supported */}
          <img
            src="/brand/logo-mark.png"
            alt="First Savvy Loading..."
            className="w-full h-full object-contain animate-pulse"
          />
        </video>
      </div>

      {/* Brand Title with Space */}
      <div className="max-w-full text-center space-y-0.5 select-none animate-in fade-in duration-500">
        <span
          className="font-serif font-bold text-base sm:text-lg text-brand-navy dark:text-white tracking-normal"
          style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", Georgia, serif)' }}
        >
          First&nbsp;Savvy
        </span>
        {message && (
          <p className="text-xs sm:text-sm font-semibold text-brand-navy dark:text-slate-200 tracking-wide text-balance">
            {message}
          </p>
        )}
        {showTagline && (
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-brand-sky">
            Stars to Legacy
          </p>
        )}
      </div>
    </div>
  );

  if (size === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#F9F7F8]/80 dark:bg-[#1A232E]/85 backdrop-blur-md transition-all">
        {loaderElement}
      </div>
    );
  }

  return loaderElement;
}
