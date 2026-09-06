import React from 'react';

/**
 * The soft wash behind a page hero.
 *
 * This is what HeroConstellationCanvas rendered whenever WebGL was unavailable. The
 * constellation itself was taken off the heroes: its gl.POINTS nodes draw as hard-edged
 * squares, and the scene's additive blending was built for a dark backdrop, so on the
 * light hero it read as scattered colour over the headline rather than as a glow.
 *
 * `className` sets the box. It defaults to filling the positioned parent; pass a ladder
 * like `inset-x-0 top-0 mx-auto h-[280px] max-w-5xl` for a hero that wants a band rather
 * than the whole section.
 */
export function HeroGlow({ className = 'inset-0' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute h-[600px] w-[600px] max-w-full rounded-full bg-radial from-brand-sky/10 via-brand-amber/5 to-transparent" />
    </div>
  );
}
