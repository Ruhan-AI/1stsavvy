/**
 * WebGL Support & Context Availability Detector
 * Safely determines if the current browser environment can initialize THREE.WebGLRenderer.
 */

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
