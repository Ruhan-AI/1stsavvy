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
  const sizeStyles = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    fullscreen: 'w-32 h-32 sm:w-40 sm:h-40',
  }[size];

  const loaderElement = (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
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
      <div className="text-center space-y-0.5 select-none animate-fade-in">
        <span 
          className="font-serif font-bold text-lg text-brand-navy dark:text-white tracking-tight"
          style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", Georgia, serif)' }}
        >
          First Savvy
        </span>
        {message && (
          <p className="text-xs font-semibold text-brand-navy dark:text-slate-200 tracking-wide">
            {message}
          </p>
        )}
        {showTagline && (
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-sky">
            Stars to Legacy
          </p>
        )}
      </div>
    </div>
  );

  if (size === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F7F8]/80 dark:bg-[#1A232E]/85 backdrop-blur-md transition-all">
        {loaderElement}
      </div>
    );
  }

  return loaderElement;
}
