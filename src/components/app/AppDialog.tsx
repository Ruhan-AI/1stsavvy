'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

/** Shared app sheet: stays reachable on short screens and above a phone keyboard. */
export function AppDialog({ title, onClose, className, children }: {
  title: string;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [viewport, setViewport] = useState<React.CSSProperties>();
  useEffect(() => {
    const visual = window.visualViewport;
    const measure = () => {
      const height = visual?.height ?? window.innerHeight;
      const top = visual?.offsetTop ?? 0;
      const width = visual?.width ?? window.innerWidth;
      const left = visual?.offsetLeft ?? 0;
      setViewport({
        '--dialog-width': `${width}px`,
        '--dialog-left': `${left}px`,
        '--dialog-center-x': `${left + width / 2}px`,
        '--dialog-height': `${height}px`,
        '--dialog-bottom': `${Math.max(0, window.innerHeight - height - top)}px`,
        '--dialog-center': `${top + height / 2}px`,
      } as React.CSSProperties);
    };
    measure();
    visual?.addEventListener('resize', measure);
    visual?.addEventListener('scroll', measure);
    window.addEventListener('resize', measure);
    return () => {
      visual?.removeEventListener('resize', measure);
      visual?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/70" />
        <Dialog.Content aria-describedby={undefined} style={viewport}
          className={twMerge(className,
            'fixed left-[var(--dialog-left,0px)] bottom-[var(--dialog-bottom,0px)] z-50 w-[var(--dialog-width,100%)] max-h-[calc(var(--dialog-height,100dvh)-1rem)] overflow-y-auto overscroll-contain outline-none max-sm:max-w-none max-sm:rounded-b-none max-sm:rounded-t-2xl max-sm:pb-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-auto sm:left-[var(--dialog-center-x,50%)] sm:top-[var(--dialog-center,50%)] sm:-translate-x-1/2 sm:-translate-y-1/2')}
          data-app-dialog>
          {children}
          <Dialog.Title className="sr-only top-0 left-0 !m-0">{title}</Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
