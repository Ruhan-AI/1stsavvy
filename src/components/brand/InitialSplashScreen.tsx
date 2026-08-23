'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * InitialSplashScreen — Full-screen brand loader on first visit.
 *
 * - Light mode #F9F7F8 background (matching homepage).
 * - Full original video animation (animated crest + brand).
 * - Sleek progress bar right beneath.
 */
export function InitialSplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredExit = useRef(false);
  const mountTime = useRef(0);

  const triggerExit = useCallback(() => {
    if (hasTriggeredExit.current) return;
    hasTriggeredExit.current = true;

    setFadeOut(true);

    setTimeout(() => {
      setVisible(false);
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('fs-splash-shown', '1');
        }
      } catch {
        // sessionStorage not available
      }
    }, 700);
  }, []);

  useEffect(() => {
    setMounted(true);
    mountTime.current = Date.now();

    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('fs-splash-shown') === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // proceed to show
    }

    // Minimum display time (4.5s)
    const minTimer = setTimeout(() => {
      if (videoRef.current?.ended) {
        triggerExit();
      }
    }, 4500);

    // Maximum display time fallback
    const maxTimer = setTimeout(() => {
      triggerExit();
    }, 6000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [triggerExit]);

  const handleVideoEnded = useCallback(() => {
    const elapsed = Date.now() - mountTime.current;
    if (elapsed >= 4200) {
      triggerExit();
    }
  }, [triggerExit]);

  // Prevent SSR / hydration mismatch
  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] min-h-[100dvh] overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        fadeOut
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#F9F7F8',
      }}
      aria-label="Loading First Savvy"
      role="progressbar"
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(102,175,211,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex max-w-full flex-col items-center justify-center">
        {/* Full Brand Loader Video */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 max-w-full flex items-center justify-center overflow-hidden">
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
              alt="First Savvy"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain animate-pulse"
            />
          </video>
        </div>

        {/* Sleek Progress bar placed closely right below the video */}
        <div className="w-32 sm:w-36 lg:w-44 max-w-full h-[2.5px] rounded-full overflow-hidden bg-slate-200/80 -mt-2">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #66AFD3, #1D2D42)',
              animation: 'splash-progress 5.0s ease-out forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
}
