import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InitialSplashScreen } from '@/components/brand/InitialSplashScreen';

let phone = true;

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
  document.body.style.overflow = '';
  phone = true;
  vi.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: phone && query.includes('max-width'), media: query,
    onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

describe('brand splash on mobile', () => {
  it('shows the complete logo without a video and releases scrolling promptly', async () => {
    const { container } = render(<InitialSplashScreen />);
    expect(container.querySelector('img')).toBeVisible();
    expect(container.querySelector('video')).toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('does not trap visitors when autoplay is rejected', async () => {
    phone = false;
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new DOMException('Blocked', 'NotAllowedError'));
    const { container } = render(<InitialSplashScreen />);
    await act(async () => {});
    expect(container.querySelector('img')).toBeVisible();
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('exits after the desktop video ends instead of looping indefinitely', async () => {
    phone = false;
    const { container } = render(<InitialSplashScreen />);
    const video = container.querySelector('video')!;
    expect(video.loop).toBe(false);
    fireEvent.ended(video);
    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('skips repeat visits and cleans up the scroll lock on unmount', () => {
    sessionStorage.setItem('fs-splash-shown', '1');
    const { unmount } = render(<InitialSplashScreen />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
