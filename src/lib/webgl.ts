/**
 * WebGL Support & Context Availability Detector
 * Safely determines if the current browser environment can initialize THREE.WebGLRenderer.
 *
 * Also holds the shared sizing helpers required by docs/responsive-system.md §12, so
 * every canvas in components/3d tracks its container the same way.
 */

/** §12: below 640px cap the pixel ratio at 1.5 rather than 2 to keep fill cost down. */
export function responsivePixelRatio(width: number): number {
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  return Math.min(dpr, width < 640 ? 1.5 : 2);
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

    return Boolean(gl && gl instanceof WebGLRenderingContext);
  } catch {
    return false;
  }
}
