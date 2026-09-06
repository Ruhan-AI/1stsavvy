/**
 * WebGL Support & Context Availability Detector
 * Safely determines if the current browser environment can initialize THREE.WebGLRenderer.
 *
 * Also holds the shared sizing helpers required by docs/responsive-system.md §12, so
 * every canvas in components/3d tracks its container the same way.
 */

/**
 * §12: below 640px cap the pixel ratio at 1.5 rather than 2 to keep fill cost down.
 *
 * `max` lowers the ceiling further. Purely decorative canvases should pass 1.5: at
 * device ratio 2 they would otherwise rasterise four times their CSS area, which is a
 * lot of fill for a soft background nobody looks straight at.
 */
export function responsivePixelRatio(width: number, max = 2): number {
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  return Math.min(dpr, width < 640 ? Math.min(1.5, max) : max);
}

/** §12: scale particle/node counts to roughly half below 640px. */
export function responsiveCount(count: number, width: number): number {
  return width < 640 ? Math.max(1, Math.round(count * 0.5)) : count;
}

/**
 * §12: a canvas sized once at mount is a bug. Watch the container with a ResizeObserver
 * (falling back to a window resize listener) and fire `onResize` with its current box.
 * Calls back once immediately. Returns a cleanup function.
 */
export function observeContainerSize(
  container: HTMLElement,
  onResize: (width: number, height: number) => void
): () => void {
  const emit = () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || Math.round(w * 0.6);
    if (w > 0 && h > 0) onResize(w, h);
  };

  emit();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(emit);
    ro.observe(container);
    return () => ro.disconnect();
  }

  window.addEventListener('resize', emit);
  return () => window.removeEventListener('resize', emit);
}

/**
 * §12: a render loop that never stops is what makes WebGL expensive on a marketing page.
 * An off-screen canvas still rendering sixty times a second competes for frames with the
 * part of the page the reader is actually looking at. Run `onFrame` only while
 * `container` is on screen and the tab is in the foreground.
 *
 * `elapsed` accumulates only while the loop is running, so a scene driven by absolute
 * time resumes where it paused instead of jumping forward by the length of the pause.
 * `delta` is clamped so the first frame back never lands as one huge step.
 *
 * Returns a cleanup function.
 */
export function createVisibleRenderLoop(
  container: HTMLElement,
  onFrame: (elapsed: number, delta: number) => void,
  options: { fps?: number } = {}
): () => void {
  // Ambient scenes pass fps: 30 — half the draw calls, and drifting decoration at 30fps
  // is not tellable from 60. Leave it unset for anything the reader drives directly.
  const minGap = options.fps ? 1000 / options.fps - 1 : 0;

  let frameId = 0;
  let running = false;
  let onScreen = false;
  let elapsed = 0;
  let lastTs = 0;
  let lastDrawn = 0;

  const frame = (ts: number) => {
    frameId = requestAnimationFrame(frame);
    if (minGap && ts - lastDrawn < minGap) return;
    lastDrawn = ts;
    const delta = lastTs === 0 ? 0 : Math.min((ts - lastTs) / 1000, 0.1);
    lastTs = ts;
    elapsed += delta;
    onFrame(elapsed, delta);
  };

  const start = () => {
    if (running) return;
    running = true;
    lastTs = 0;
    lastDrawn = 0;
    frameId = requestAnimationFrame(frame);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frameId);
  };

  const sync = () => {
    if (onScreen && document.visibilityState !== 'hidden') start();
    else stop();
  };

  let observer: IntersectionObserver | null = null;

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      // spin up slightly before it scrolls into view so its first visible frame is
      // already in motion rather than a static pose
      { rootMargin: '200px' }
    );
    observer.observe(container);
  } else {
    onScreen = true;
    sync();
  }

  document.addEventListener('visibilitychange', sync);

  return () => {
    stop();
    observer?.disconnect();
    document.removeEventListener('visibilitychange', sync);
  };
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  // Respect user preference for reduced motion or low-power mode
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
  } catch {
    // ignore
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (!gl) return false;

    // Do not test this with `instanceof WebGLRenderingContext`: getContext('webgl2')
    // returns a WebGL2RenderingContext, which is a separate interface rather than a
    // subclass, so that check reports "no WebGL" on every current browser.
    //
    // Drop the probe context straight away — browsers cap how many can be live at once
    // and the real canvases need those slots.
    const lose = (gl as WebGLRenderingContext).getExtension?.('WEBGL_lose_context') as
      | { loseContext: () => void }
      | null;
    lose?.loseContext();

    return true;
  } catch {
    return false;
  }
}
