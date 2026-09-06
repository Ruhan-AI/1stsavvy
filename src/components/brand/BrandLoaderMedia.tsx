'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Keep a real logo visible when autoplay is blocked or video decoding fails. */
export function BrandLoaderMedia({ loop = true, onEnded, onUnavailable, className = '' }: {
  loop?: boolean;
  onEnded?: () => void;
  onUnavailable?: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    // The short phone loader shows the complete crest without waiting for the film.
    const motion = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 639px)');
    const update = () => {
      setUseVideo(!motion.matches);
      if (motion.matches) onUnavailable?.();
    };
    update();
    motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, [onUnavailable]);

  useEffect(() => {
    if (!useVideo) return;
    let cancelled = false;
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play()?.catch(() => {
        if (!cancelled) {
          setPlaying(false);
          onUnavailable?.();
        }
      });
    }
    return () => { cancelled = true; video?.pause(); };
  }, [useVideo, onUnavailable]);

  return (
    <div className={`relative h-full w-full ${className}`} aria-hidden="true">
      <img src="/brand/logo-mark.png" alt="" className={`absolute inset-0 m-auto h-2/3 w-2/3 object-contain ${playing && useVideo ? 'invisible' : ''}`} />
      {useVideo && (
        <video ref={videoRef} autoPlay loop={loop} muted playsInline preload="auto"
          onPlaying={() => setPlaying(true)} onEnded={onEnded}
          onError={() => { setPlaying(false); onUnavailable?.(); }}
          className={`h-full w-full object-contain pointer-events-none select-none ${playing ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.92) contrast(1.25)', mixBlendMode: 'multiply' }}>
          <source src="/brand/loader.mp4" type="video/mp4" />
          <source src="/brand/loader.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}
