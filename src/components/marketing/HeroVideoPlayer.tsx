'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Volume2, VolumeX, Sparkles, Play, Pause, Settings, Check, Info } from 'lucide-react';
import { BrandLoader } from '@/components/brand/BrandLoader';

const LiveAppDashboardPreview = dynamic(
  () => import('./live-previews/LiveAppDashboardPreview').then((module) => module.LiveAppDashboardPreview),
  { loading: () => <div role="status" className="flex h-full items-center justify-center p-4"><BrandLoader message="Opening your dashboard…" /></div> }
);

type VideoQuality = 'auto' | '1080p' | '720p' | '480p' | '360p';

const QUALITY_SOURCES: Record<'1080p' | '720p' | '480p' | '360p', string> = {
  '1080p': '/videos/first-savvy-explanation-1080p.mp4',
  '720p': '/videos/first-savvy-explanation-720p.mp4',
  '480p': '/videos/first-savvy-explanation-480p.mp4',
  '360p': '/videos/first-savvy-explanation-360p.mp4',
};

const QUALITY_LABELS: Record<VideoQuality, string> = {
  auto: 'Auto',
  '1080p': '1080p HD',
  '720p': '720p',
  '480p': '480p',
  '360p': '360p (Data Saver)',
};

export function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qualityMenuRef = useRef<HTMLDivElement | null>(null);

  const [viewMode, setViewMode] = useState<'video' | 'demo'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Quality settings (YouTube style adaptive)
  const [userQuality, setUserQuality] = useState<VideoQuality>('auto');
  const [resolvedQuality, setResolvedQuality] = useState<'1080p' | '720p' | '480p' | '360p' | null>(null);
  const [qualityMenuOpen, setQualityMenuOpen] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Resume playback states
  const savedVideoTimeRef = useRef<number>(0);
  const wasPlayingBeforeDemoRef = useRef<boolean>(false);
  const stallCountRef = useRef<number>(0);

  const showStatusToast = useCallback((msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast((curr) => (curr === msg ? null : curr)), 3500);
  }, []);

  /**
   * Network connection detection to pick best starting quality in Auto mode
   */
  const detectOptimalQuality = useCallback((): '1080p' | '720p' | '480p' | '360p' => {
    if (typeof window === 'undefined') return '1080p';

    const nav = navigator as Navigator & {
      connection?: {
        effectiveType?: string;
        downlink?: number;
        saveData?: boolean;
      };
    };

    const conn = nav.connection;
    if (conn) {
      if (conn.saveData) return '360p';
      if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return '360p';
      if (conn.effectiveType === '3g' || (conn.downlink && conn.downlink < 2.0)) return '480p';
      if (conn.downlink && conn.downlink < 5.0) return '720p';
    }

    if (window.innerWidth <= 640) {
      return '720p';
    }

    return '1080p';
  }, []);

  // Initial network check
  useEffect(() => {
    const optimal = detectOptimalQuality();
    setResolvedQuality(optimal);
  }, [detectOptimalQuality]);

  // Close quality dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(e.target as Node)) {
        setQualityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Monitor stall / buffering events to automatically step down resolution in Auto mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => {
      if (userQuality === 'auto') {
        stallCountRef.current += 1;
        // If buffered or stalled 2 times, step down to guarantee smooth playback
        if (stallCountRef.current >= 2) {
          setResolvedQuality((prev) => {
            if (prev === '1080p') {
              showStatusToast('Network slow • Auto switched to 720p for smooth playback');
              return '720p';
            }
            if (prev === '720p') {
              showStatusToast('Network slow • Auto switched to 480p for smooth playback');
              return '480p';
            }
            if (prev === '480p') {
              showStatusToast('Network slow • Auto switched to 360p data saver');
              return '360p';
            }
            return prev;
          });
          stallCountRef.current = 0;
        }
      }
    };

    video.addEventListener('waiting', handleWaiting);
    return () => {
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [userQuality, showStatusToast]);

  // Video event handlers for play / pause tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    const mql = window.matchMedia('(hover: none), (max-width: 768px)');
    const checkIsMobile = () => {
      setIsMobile(mql.matches);
    };

    checkIsMobile();

    let observer: IntersectionObserver | null = null;

    if (mql.matches) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && viewMode === 'video') {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
    }

    mql.addEventListener('change', checkIsMobile);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      mql.removeEventListener('change', checkIsMobile);
      if (observer) observer.disconnect();
    };
  }, [viewMode]);

  // Active video source based on user selection or auto-resolved quality
  const activeQuality = userQuality === 'auto' ? resolvedQuality : userQuality;
  const currentVideoSrc = activeQuality ? QUALITY_SOURCES[activeQuality] : undefined;

  /**
   * Change resolution seamlessly while keeping current time & play state
   */
  const handleQualityChange = (newQuality: VideoQuality) => {
    const video = videoRef.current;
    const currentTime = video ? video.currentTime : 0;
    const wasPlaying = video ? !video.paused : false;

    setUserQuality(newQuality);
    let targetRes: '1080p' | '720p' | '480p' | '360p' = '1080p';

    if (newQuality === 'auto') {
      targetRes = detectOptimalQuality();
      setResolvedQuality(targetRes);
      showStatusToast(`Auto quality: ${targetRes}`);
    } else {
      targetRes = newQuality;
      showStatusToast(`Quality: ${QUALITY_LABELS[newQuality]}`);
    }

    setQualityMenuOpen(false);

    if (video) {
      const nextSrc = QUALITY_SOURCES[targetRes];
      if (video.src !== new URL(nextSrc, window.location.href).href) {
        const handleLoadedData = () => {
          video.currentTime = currentTime;
          if (wasPlaying) {
            video.play().catch(() => {});
          }
          video.removeEventListener('loadeddata', handleLoadedData);
        };
        video.addEventListener('loadeddata', handleLoadedData);
      }
    }
  };

  const handleMouseEnter = () => {
    prewarmDemo();
    if (isMobile || viewMode === 'demo') return;
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile || viewMode === 'demo') return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleContainerClick = () => {
    if (viewMode === 'demo') return;
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Height & transition animation refs
  const videoPaneRef = useRef<HTMLDivElement | null>(null);
  const demoPaneRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [demoMounted, setDemoMounted] = useState(false);
  const prewarmDemo = () => setDemoMounted(true);

  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const beginSwitch = () => {
    if (switchTimer.current) clearTimeout(switchTimer.current);
    setIsSwitching(true);
    switchTimer.current = setTimeout(() => setIsSwitching(false), 820);
  };

  useEffect(() => () => { if (switchTimer.current) clearTimeout(switchTimer.current); }, []);

  useEffect(() => {
    videoPaneRef.current?.toggleAttribute('inert', viewMode !== 'video');
    demoPaneRef.current?.toggleAttribute('inert', viewMode !== 'demo');
    const el = viewMode === 'video' ? videoPaneRef.current : demoPaneRef.current;
    if (!el) return;
    const measure = () => setContentHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewMode, demoMounted]);

  /**
   * Switch to Demo: Save video playback timestamp and state so it can continue seamlessly later
   */
  const switchToDemo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (video) {
      savedVideoTimeRef.current = video.currentTime;
      wasPlayingBeforeDemoRef.current = !video.paused || isPlaying;
      video.pause();
      setIsPlaying(false);
    }
    beginSwitch();
    if (demoMounted) {
      setViewMode('demo');
      return;
    }
    setDemoMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setViewMode('demo')));
  };

  /**
   * Switch to Video: Restore exact saved timestamp and continue playback from where left off
   */
  const switchToVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    beginSwitch();
    setViewMode('video');

    const video = videoRef.current;
    if (video) {
      // Resume from exact timestamp where user left off
      if (savedVideoTimeRef.current > 0) {
        video.currentTime = savedVideoTimeRef.current;
        const mins = Math.floor(savedVideoTimeRef.current / 60);
        const secs = Math.floor(savedVideoTimeRef.current % 60);
        const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        showStatusToast(`▶ Resumed playback from ${timeStr}`);
      }

      // Resume playing if was playing or on desktop
      if (wasPlayingBeforeDemoRef.current || !isMobile) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className={`relative mx-auto w-full min-w-0 ${viewMode === 'demo' ? 'max-w-6xl xl:max-w-7xl' : 'max-w-5xl lg:max-w-6xl'} group select-none transition-[max-width] duration-700 ease-out motion-reduce:transition-none`}>
      {/* Dynamic Ambient Background Glow */}
      <div className={`absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-brand-sky/25 via-blue-600/20 to-teal-400/20 rounded-3xl -z-10 transition-opacity duration-500 ${isSwitching ? 'opacity-0' : 'blur-2xl opacity-75 group-hover:opacity-100'}`} />

      {/* Main Glass Mockup Container */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#101926] border border-slate-700/80 dark:border-slate-700/70 shadow-2xl transition-all duration-700 ease-out cursor-default"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Notification Toast */}
        {statusToast && (
          <div role="status" className="pointer-events-none absolute top-16 left-3 right-3 sm:left-auto sm:right-6 z-40 bg-slate-900/95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in duration-150">
            <Info className="w-3.5 h-3.5 text-[#52A5CE] shrink-0" />
            <span>{statusToast}</span>
          </div>
        )}

        {/* macOS Style Window Chrome Header */}
        <div className="relative z-20 flex flex-wrap lg:flex-nowrap items-center justify-center sm:justify-between gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3 bg-slate-900/95 border-b border-slate-800/90">
          {/* Left: Traffic Light Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90 shadow-xs ring-1 ring-rose-600/30 inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/90 shadow-xs ring-1 ring-amber-500/30 inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400/90 shadow-xs ring-1 ring-emerald-500/30 inline-block" />
            <span className="hidden xl:inline-block ml-3 text-[11px] font-medium text-slate-400 tracking-wide">
              {viewMode === 'demo' ? 'First Savvy • Real-Time Web App Sandbox' : 'First Savvy • Official Product Walkthrough'}
            </span>
          </div>

          {/* Center: Mode Switcher Tabs (Video Tour vs Interactive Live Demo) */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 shadow-inner">
            <button
              type="button"
              onClick={switchToVideo}
              aria-pressed={viewMode === 'video'}
              className={`inline-flex items-center justify-center gap-1.5 min-h-11 lg:min-h-[36px] px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                viewMode === 'video'
                  ? 'bg-[#52A5CE] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="sm:hidden">Video</span><span className="hidden sm:inline">Video Tour</span>
            </button>
            <button
              type="button"
              onClick={switchToDemo}
              aria-pressed={viewMode === 'demo'}
              className={`inline-flex items-center justify-center gap-1.5 min-h-11 lg:min-h-[36px] px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                viewMode === 'demo'
                  ? 'bg-[#52A5CE] text-white shadow-xs ring-1 ring-white/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span className="sm:hidden">Demo</span><span className="hidden sm:inline">Interactive Demo</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wide bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
            </button>
          </div>

          {/* Right Header Controls (Audio + YouTube-style Quality Selector) */}
          <div className={`${viewMode === 'demo' ? 'hidden lg:flex' : 'flex flex-wrap sm:flex-nowrap w-full sm:w-auto justify-center'} items-center gap-2 sm:gap-2.5 shrink-0`}>
            {viewMode === 'video' ? (
              <>
                {/* Audio Toggle Pill */}
                <button
                  onClick={toggleMute}
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 min-h-11 lg:min-h-[36px] px-2.5 sm:px-3 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-xs active:scale-95"
                  title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Unmute Audio</span>
                      <span className="sm:hidden">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span className="hidden sm:inline text-emerald-300">Audio On</span>
                      <span className="sm:hidden text-emerald-300">On</span>
                    </>
                  )}
                </button>

                {/* YouTube-Style Quality Dropdown */}
                <div className={`relative ${qualityMenuOpen ? 'max-sm:w-full' : ''}`} ref={qualityMenuRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQualityMenuOpen(!qualityMenuOpen);
                    }}
                    aria-expanded={qualityMenuOpen}
                    className="inline-flex items-center justify-center gap-1.5 min-h-11 lg:min-h-[36px] px-2.5 sm:px-3 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-xs active:scale-95"
                    title="Change video quality (YouTube style)"
                  >
                    <Settings className={`w-3.5 h-3.5 text-slate-400 transition-transform ${qualityMenuOpen ? 'rotate-45 text-[#52A5CE]' : ''}`} />
                    <span className="font-bold text-[#52A5CE]">
                      {userQuality === 'auto' ? (resolvedQuality ? `Auto (${resolvedQuality})` : 'Auto') : userQuality}
                    </span>
                  </button>

                  {/* Quality Popup Menu */}
                  {qualityMenuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative mt-2 w-full sm:absolute sm:right-0 sm:top-full sm:w-52 max-h-[60dvh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in duration-150"
                    >
                      <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Quality</span>
                        <span className="text-[10px] text-slate-500 font-medium">Adaptive</span>
                      </div>

                      <div className="py-1 space-y-0.5">
                        {(['auto', '1080p', '720p', '480p', '360p'] as const).map((q) => {
                          const isSelected = userQuality === q;
                          return (
                            <button
                              key={q}
                              type="button"
                              onClick={() => handleQualityChange(q)}
                              className={`w-full min-h-11 lg:min-h-0 flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#52A5CE]/20 text-[#52A5CE]'
                                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#52A5CE]' : 'bg-transparent'}`} />
                                <span>
                                  {q === 'auto' ? 'Auto (Recommended)' : q === '1080p' ? '1080p HD' : q}
                                </span>
                              </div>
                              {q === 'auto' ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                                  {resolvedQuality}
                                </span>
                              ) : q === '1080p' ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                                  HD
                                </span>
                              ) : q === '360p' ? (
                                <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                  Saver
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Real App UX
                </span>
              </div>
            )}
          </div>
        </div>

        {/* View Content Area: Video Player or Interactive Realtime Web App */}
        <div
          className="relative w-full overflow-hidden transition-[height] duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0"
          style={contentHeight != null ? { height: contentHeight } : undefined}
        >
          {/* Both panes stay mounted once used and cross-fade in place */}
          <div
            ref={videoPaneRef}
            aria-hidden={viewMode !== 'video'}
            className={`w-full transition-opacity duration-300 motion-reduce:transition-none ${
              viewMode === 'video'
                ? 'relative opacity-100'
                : 'pointer-events-none absolute inset-x-0 top-0 opacity-0'
            }`}
          >
            <div onClick={handleContainerClick} className="relative flex w-full aspect-[1920/912] items-center justify-center overflow-hidden bg-[#101926]">
              <video
                ref={videoRef}
                src={currentVideoSrc}
                poster="/videos/first-savvy-explanation-poster.jpg"
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="block h-full w-full object-cover object-center"
              />
              <button type="button" aria-label={isPlaying ? 'Pause video' : 'Play video'} onClick={(event) => { event.stopPropagation(); handleContainerClick(); }} className="absolute bottom-2 left-2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white lg:hidden">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {demoMounted && (
            <div
              ref={demoPaneRef}
              aria-hidden={viewMode !== 'demo'}
              className={`w-full transition-opacity duration-300 motion-reduce:transition-none ${
                viewMode === 'demo'
                  ? 'relative opacity-100'
                  : 'pointer-events-none absolute inset-x-0 top-0 opacity-0'
              }`}
            >
              <div data-demo-viewport data-lenis-prevent className="relative h-[min(540px,75svh)] min-h-[300px] w-full overflow-hidden overscroll-contain bg-[#f8fafc] lg:h-[660px] lg:overflow-y-auto">
                <LiveAppDashboardPreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
