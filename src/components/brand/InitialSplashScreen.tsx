'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * InitialSplashScreen — Full-screen brand loader on first visit.
 *
 * Light mode #F9F7F8 background (matching homepage).
 * Video black background is converted to transparent white via invert + hue-rotate + multiply blend,
 * rendering the logo in crisp, deep FirstSavvy brand navy/blue without any black rectangle.
 */
export function InitialSplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredExit = useRef(false);
  const mountTime = useRef(Date.now());

  const triggerExit = useCallback(() => {
    if (hasTriggeredExit.current) return;
    hasTriggeredExit.current = true;

    setFadeOut(true);

    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('fs-splash-shown', '1');
      } catch {
        // sessionStorage not available
      }
    }, 700);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('fs-splash-shown') === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // proceed to show
    }

    // Minimum display time
    const minTimer = setTimeout(() => {
      if (videoRef.current?.ended) {
        triggerExit();
      }
    }, 3800);

    // Maximum display time fallback
    const maxTimer = setTimeout(() => {
      triggerExit();
    }, 5500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [triggerExit]);

  const handleVideoEnded = useCallback(() => {
    const elapsed = Date.now() - mountTime.current;
    if (elapsed >= 3500) {
      triggerExit();
    }
  }, [triggerExit]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-out ${
        fadeOut
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#F9F7F8',
      }}
      aria-label="Loading FirstSavvy"
      role="progressbar"
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(102,175,211,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* Brand Loader Video — Centered, well-sized, clean white blend */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain pointer-events-none select-none"
            style={{
              filter: 'invert(1) hue-rotate(180deg) brightness(0.92) contrast(1.25)',
              mixBlendMode: 'multiply',
            }}
          >
            <source src="/brand/loader.webm" type="video/webm" />
            <source src="/brand/loader.mp4" type="video/mp4" />
            <img
              src="/brand/logo-mark.png"
              alt="FirstSavvy"
              className="w-24 h-24 object-contain animate-pulse"
            />
          </video>
        </div>

        {/* Brand tagline */}
        <div className="text-center space-y-1.5 select-none -mt-4">
          <p
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.32em] text-[#1D2D42]"
          >
            FirstSavvy
          </p>
          <p
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#66AFD3]"
          >
            From Stars to Legacy
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-44 sm:w-56 h-[3px] rounded-full overflow-hidden bg-slate-200/80 mt-1">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #66AFD3, #1D2D42)',
              animation: 'splash-progress 4.8s ease-out forwards',
            }}
          />
        </div>
      </div>

      {/* Inline keyframes for progress bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes splash-progress {
          0% { width: 0%; }
          45% { width: 60%; }
          80% { width: 88%; }
          95% { width: 97%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
