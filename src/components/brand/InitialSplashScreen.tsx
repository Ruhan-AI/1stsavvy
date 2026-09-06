'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrandLoaderMedia } from './BrandLoaderMedia';

export function InitialSplashScreen() {
  // Server-rendered content stays usable while the phone downloads JavaScript.
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const exitStarted = useRef(false);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>();
  const fallbackTimer = useRef<ReturnType<typeof setTimeout>>();

  const triggerExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    try { sessionStorage.setItem('fs-splash-shown', '1'); } catch { /* Private browsing. */ }
    setFadeOut(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fadeTimer.current = setTimeout(() => setVisible(false), reduceMotion ? 0 : 300);
  }, []);

  const handleUnavailable = useCallback(() => {
    clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(triggerExit, 700);
  }, [triggerExit]);

  useEffect(() => {
    exitStarted.current = false;
    try {
      if (sessionStorage.getItem('fs-splash-shown') === '1') {
        setVisible(false);
        return;
      }
    } catch { /* The time limit also works without storage. */ }

    setVisible(true);

    // Media events are not guaranteed on mobile, so loading always has a time limit.
    const mobile = window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches;
    const timeout = setTimeout(triggerExit, mobile ? 2000 : 6000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(fadeTimer.current);
      clearTimeout(fallbackTimer.current);
    };
  }, [triggerExit]);

  useEffect(() => {
    if (!visible || fadeOut) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [visible, fadeOut]);

  if (!visible) return null;

  return (
    <div data-brand-splash role="progressbar" aria-label="Loading First Savvy"
      className={`fixed inset-0 z-[9999] flex h-[100dvh] w-full touch-none items-center justify-center overflow-hidden bg-[#F9F7F8] px-4 transition-opacity duration-300 motion-reduce:transition-none sm:px-6 lg:px-8 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(102,175,211,0.14) 0%, transparent 70%)' }} />
      <div className="relative flex max-w-full flex-col items-center justify-center">
        <div className="h-48 w-48 max-h-[55dvh] max-w-full sm:h-64 sm:w-64 lg:h-80 lg:w-80">
          <BrandLoaderMedia loop={false} onEnded={triggerExit} onUnavailable={handleUnavailable} />
        </div>
        <div className="-mt-2 h-[3px] w-32 max-w-full overflow-hidden rounded-full bg-slate-200/80 sm:w-36 lg:w-44">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-sky to-brand-navy animate-[splash-progress_2s_ease-out_forwards] lg:animate-[splash-progress_5s_ease-out_forwards] motion-reduce:animate-none motion-reduce:w-full" />
        </div>
      </div>
    </div>
  );
}
