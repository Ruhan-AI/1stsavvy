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

    // Minimum display time (increased for better animation completion)
    const minTimer = setTimeout(() => {
      if (videoRef.current?.ended) {
        triggerExit();
      }
    }, 5500);

    // Maximum display time fallback
    const maxTimer = setTimeout(() => {
      triggerExit();
    }, 7000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [triggerExit]);

  const handleVideoEnded = useCallback(() => {
    const elapsed = Date.now() - mountTime.current;
    if (elapsed >= 5200) {
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

      <div className="relative flex flex-col items-center justify-center">
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

        {/* Progress bar placed closely right below the video */}
        <div className="w-36 sm:w-44 h-[2.5px] rounded-full overflow-hidden bg-slate-200/80 -mt-2">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #66AFD3, #1D2D42)',
              animation: 'splash-progress 6.2s ease-out forwards',
            }}
          />
        </div>
      </div>

      {/* Inline keyframes for progress bar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes splash-progress {
          0% { width: 0%; }
          35% { width: 45%; }
          70% { width: 80%; }
          92% { width: 95%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
}
