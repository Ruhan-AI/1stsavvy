'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductScreenshotProps {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  variant?: 'browser' | 'card' | 'floating';
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
  sizes?: string;
  enableLightbox?: boolean;
}

export function ProductScreenshot({
  src,
  alt,
  label,
  caption,
  variant = 'browser',
  priority = false,
  className = '',
  aspectRatio = '16/10',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px',
  enableLightbox = true,
}: ProductScreenshotProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close lightbox on Escape key + lock body scroll while the overlay is open (§10)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const frameContent = (
    <div
      className={`group relative w-full max-w-full min-w-0 overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 transition-all duration-300 ${
        variant === 'browser'
          ? 'rounded-2xl sm:rounded-[1.35rem] shadow-2xl shadow-brand-navy/12 dark:shadow-black/50'
          : variant === 'floating'
          ? 'rounded-xl sm:rounded-2xl shadow-xl shadow-brand-navy/20 dark:shadow-black/60 border-brand-sky/30'
          : 'rounded-xl shadow-lg border-slate-200 dark:border-slate-800'
      } ${className}`}
    >
      {/* Browser Bar Header */}
      {variant === 'browser' && (
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-950/80 dark:bg-slate-900/90 border-b border-slate-800/80 select-none">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {label && (
            <div className="flex items-center gap-1.5 min-w-0 max-w-[45%] sm:max-w-[280px] px-2.5 sm:px-3 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-400">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-sky animate-pulse" />
              <span className="min-w-0 truncate">{label}</span>
            </div>
          )}
          <div className="shrink-0 text-right">
            {enableLightbox && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center min-h-[40px] min-w-[44px] px-2 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500 hover:text-brand-sky transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                aria-label="Expand screenshot"
              >
                Zoom
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Card Header */}
      {variant === 'floating' && label && (
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-950/90 border-b border-slate-800 text-[10px] sm:text-[11px] font-semibold text-brand-sky uppercase tracking-wider">
          <span className="min-w-0 truncate">{label}</span>
        </div>
      )}

      {/* Screenshot Image Container */}
      <div
        className="relative w-full max-w-full overflow-hidden bg-slate-950 cursor-pointer aspect-[4/3] sm:aspect-[var(--ps-aspect)]"
        style={{ '--ps-aspect': aspectRatio } as React.CSSProperties}
        onClick={() => enableLightbox && setIsOpen(true)}
        role={enableLightbox ? 'button' : undefined}
        tabIndex={enableLightbox ? 0 : undefined}
        onKeyDown={(e) => {
          if (enableLightbox && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={`View full screenshot: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="w-full h-full max-w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />

        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full min-w-0">
      {frameContent}
      {caption && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2.5 text-center sm:text-left px-1 break-words">
          {caption}
        </p>
      )}

      {/* Fullscreen Accessible Lightbox — §10 bottom sheet on phones, centred from `sm`. */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/90 backdrop-blur-md p-0 sm:p-6 animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div
            className="relative w-full sm:max-w-6xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl bg-slate-950/60 sm:bg-transparent p-3 sm:p-0 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 w-full pb-3 text-white">
              <span className="min-w-0 truncate text-xs sm:text-sm font-medium text-slate-300">{label || alt}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="shrink-0 inline-flex items-center justify-center min-h-[44px] px-4 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                aria-label="Close image preview"
              >
                ✕ Close (Esc)
              </button>
            </div>
            <div className="relative w-full max-w-full h-[55dvh] sm:h-[70dvh] lg:h-[75dvh] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="w-full h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
