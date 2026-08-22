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

  // Close lightbox on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const frameContent = (
    <div
      className={`group relative overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 transition-all duration-300 ${
        variant === 'browser'
          ? 'rounded-2xl sm:rounded-[1.35rem] shadow-2xl shadow-brand-navy/12 dark:shadow-black/50'
          : variant === 'floating'
          ? 'rounded-xl sm:rounded-2xl shadow-xl shadow-brand-navy/20 dark:shadow-black/60 border-brand-sky/30'
          : 'rounded-xl shadow-lg border-slate-200 dark:border-slate-800'
      } ${className}`}
    >
      {/* Browser Bar Header */}
      {variant === 'browser' && (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-950/80 dark:bg-slate-900/90 border-b border-slate-800/80 select-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {label && (
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-400 max-w-[280px] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />
              <span className="truncate">{label}</span>
            </div>
          )}
          <div className="w-10 text-right">
            {enableLightbox && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-[10px] uppercase font-bold text-slate-500 hover:text-brand-sky transition-colors focus:outline-none"
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
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/90 border-b border-slate-800 text-[10px] font-semibold text-brand-sky uppercase tracking-wider">
          <span>{label}</span>
        </div>
      )}

      {/* Screenshot Image Container */}
      <div
        className="relative w-full overflow-hidden bg-slate-950 cursor-pointer"
        style={{ aspectRatio }}
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
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />

        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {frameContent}
      {caption && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 text-center sm:text-left px-1">
          {caption}
        </p>
      )}

      {/* Fullscreen Accessible Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full pb-3 text-white">
              <span className="text-sm font-medium text-slate-300">{label || alt}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase transition-colors"
                aria-label="Close image preview"
              >
                ✕ Close (Esc)
              </button>
            </div>
            <div className="relative w-full h-[75vh] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
