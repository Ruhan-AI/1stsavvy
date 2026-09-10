import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppDialog } from '@/components/app/AppDialog';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('app dialog on small screens', () => {
  it('escapes the page container, supports Escape, and releases its scroll lock', () => {
    const onClose = vi.fn();
    const { container, unmount } = render(
      <AppDialog title="Add contact" onClose={onClose}><input aria-label="Name" /></AppDialog>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Add contact' });
    expect(container).not.toContainElement(dialog);
    expect(document.body).toHaveAttribute('data-scroll-locked');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
    unmount();
    expect(document.body).not.toHaveAttribute('data-scroll-locked');
  });

  it('follows the visible viewport when the keyboard opens and removes its listeners', () => {
    const viewport = Object.assign(new EventTarget(), { height: 720, offsetTop: 0 });
    const remove = vi.spyOn(viewport, 'removeEventListener');
    vi.stubGlobal('visualViewport', viewport);
    vi.stubGlobal('innerHeight', 720);
    const { unmount } = render(
      <AppDialog title="New goal" onClose={() => {}}><input aria-label="Goal name" /></AppDialog>,
    );
    const dialog = screen.getByRole('dialog');
    act(() => {
      viewport.height = 300;
      viewport.offsetTop = 20;
      viewport.dispatchEvent(new Event('resize'));
    });
    expect(dialog.style.getPropertyValue('--dialog-height')).toBe('300px');
    expect(dialog.style.getPropertyValue('--dialog-bottom')).toBe('400px');
    expect(dialog.style.getPropertyValue('--dialog-center')).toBe('170px');
    unmount();
    expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
