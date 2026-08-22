'use client';

import React from 'react';
import { LiveHeroDashboardPreview } from './live-previews/LiveHeroDashboardPreview';

export function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full">
      <LiveHeroDashboardPreview />
    </div>
  );
}
