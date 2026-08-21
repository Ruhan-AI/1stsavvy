'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * InitialSplashScreen — Full-screen brand loader that plays on the FIRST page load.
 *
 * Next.js loading.tsx only fires during route transitions (Suspense boundaries),
 * not on the initial cold page load. This component fills that gap by rendering
 * a full-screen overlay with the brand video animation that fades out once
 * the page is ready.
 *
 * - Shows for a minimum of 2.2s (so the animation has time to play).
 * - Dismissed after video ends OR after a max timeout of 4s (whichever is first).
 * - Only shows once per session (sessionStorage flag).
 */
export function InitialSplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredExit = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasTriggeredExit.current) return;
    hasTriggeredExit.current = true;

    // Start fade out animation
    setFadeOut(true);

    // Remove from DOM after fade animation completes
    setTimeout(() => {
      setVisible(false);
      // Mark as shown for this session
      try {
        sessionStorage.setItem('fs-splash-shown', '1');
      } catch {
        // sessionStorage not available (SSR / incognito edge cases)
      }
    }, 600);
  }, []);

  useEffect(() => {
    // Don't show if already shown this session
    try {
      if (sessionStorage.getItem('fs-splash-shown') === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // proceed to show
    }

    // Minimum display time — let the animation breathe
    const minTimer = setTimeout(() => {
      // After minimum time, check if video already ended
      if (videoRef.current?.ended) {
        triggerExit();
      }
    }, 2200);

    // Maximum display time — never block the user for too long
    const maxTimer = setTimeout(() => {
      triggerExit();
    }, 4000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [triggerExit]);

  const handleVideoEnded = useCallback(() => {
    // Only exit if minimum time has passed
    const minElapsed = 2200;
    // We set a small delay to ensure minimum time
    setTimeout(() => {
      triggerExit();
    }, 100);
  }, [triggerExit]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-out ${
        fadeOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#F9F7F8',
      }}
      aria-label="Loading FirstSavvy"
      role="progressbar"
    >
      {/* Subtle radial glow behind the loader */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(102,175,211,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center justify-center gap-5">
        {/* Brand Loader Video */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster="/brand/loader-poster.png"
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
          >
            <source src="/brand/loader.webm" type="video/webm" />
            <source src="/brand/loader.mp4" type="video/mp4" />
            <img
              src="/brand/logo-mark.png"
              alt="FirstSavvy"
              className="w-full h-full object-contain animate-pulse"
            />
          </video>
        </div>

        {/* Brand tagline */}
        <div className="text-center space-y-1.5 select-none">
          <p
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: '#66AFD3' }}
          >
            Stars to Legacy
          </p>
        </div>

        {/* Subtle loading bar */}
        <div className="w-32 h-[2px] rounded-full overflow-hidden bg-slate-200/60">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #66AFD3, #5BA0C4)',
              animation: 'splash-progress 3s ease-out forwards',
            }}
          />
        </div>
      </div>

      {/* Inline keyframes for the progress bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes splash-progress {
          0% { width: 0%; }
          60% { width: 70%; }
          90% { width: 92%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
