'use client';

import React from 'react';
import { HeroVideoPlayer } from './HeroVideoPlayer';

export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-5xl lg:max-w-6xl">
      <HeroVideoPlayer />
    </div>
  );
}
