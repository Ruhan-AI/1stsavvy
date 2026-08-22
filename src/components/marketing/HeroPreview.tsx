'use client';

import React from 'react';
import Image from 'next/image';
import { ProductScreenshot } from './ProductScreenshot';

export function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-5xl lg:max-w-6xl w-full">
      {/* Decorative ambient radial glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-brand-sky/20 via-brand-navy/15 to-brand-amber/15 rounded-3xl blur-2xl opacity-70 -z-10" />

      {/* Main Browser Frame */}
      <div className="relative">
        <ProductScreenshot
          src="/images/app/dashboard-family.jpg"
          alt="First Savvy family tasks, goals, and daily planning workspace"
          label="Family tasks, goals, and daily planning in one place."
          variant="browser"
          priority={true}
          aspectRatio="16/9"
        />

        {/* Floating Secondary Card: Goal Creation */}
        <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-[55%] sm:w-[42%] max-w-sm hidden xs:block z-20 hover:scale-105 transition-transform duration-300">
          <ProductScreenshot
            src="/images/app/goal-creation.jpg"
            alt="First Savvy reward goal creation and star milestones"
            label="Goal & Reward Milestone"
            variant="floating"
            aspectRatio="4/3"
            enableLightbox={true}
          />
        </div>
      </div>
    </div>
  );
}
