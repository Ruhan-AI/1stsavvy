'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, Minus, MousePointer2, Plus, Star } from 'lucide-react';

export const CHILDREN = [
  { id: 'c1', name: 'Maya Miller', initials: 'MM', color: '#52A5CE' },
  { id: 'c2', name: 'Leo Miller', initials: 'LM', color: '#52A5CE' },
];

export const LABEL = 'text-xs font-semibold uppercase tracking-wider text-slate-500';
export const BOX = 'w-full rounded-xl border border-slate-200 bg-white';
export const INPUT =
  'min-h-[44px] w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-base sm:text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white';

export function Field({
  label,
  optional = false,
  optionalLowercase = false,
  children,
}: {
  label: string;
  optional?: boolean;
  optionalLowercase?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <p className={LABEL}>
        {label}
        {optional && (
          <span className="ml-1 font-normal normal-case text-slate-400">
            (optional)
          </span>
        )}
      </p>
      {children}
    </div>
  );
}

/** Dialog shell with guaranteed matching heights and aligned headers */
export function DialogFrame({
  title,
  onClose,
  footer,
  children,
}: {
  title: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mock-preview
      className="relative flex h-full w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 text-left font-sans shadow-xl sm:p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <div className="mb-4 flex min-w-0 items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="-mr-1 -mt-1 flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="space-y-3.5">{children}</div>
      </div>

      {footer && <div className="mt-5">{footer}</div>}
    </div>
  );
}

export function IconAndColor({
  name,
  color,
  icon: Icon,
  onClick,
}: {
  name: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BOX} flex min-w-0 cursor-pointer items-center justify-between gap-2 p-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-2xs"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex min-w-0 flex-col justify-center break-words text-left">
          <span className="text-xs font-semibold text-slate-800 dark:text-white">{name}</span>
          <span className="text-[11px] font-medium text-slate-400">Click to change</span>
        </span>
      </span>
      <span
        className="h-3.5 w-3.5 shrink-0 rounded-full border border-slate-100 shadow-inner"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

export function StarStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const btn =
    'flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800';
  return (
    <div className="flex min-w-0 items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label="Decrease" className={btn}>
        <Minus className="h-4 w-4 text-slate-500" />
      </button>
      <div className="flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900">
        <Star className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
        <span className="text-center text-sm font-semibold tabular-nums text-slate-800 dark:text-white">{value}</span>
      </div>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase" className={btn}>
        <Plus className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
}

export function ScheduleSelect({
  value,
  onChange,
  options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'one_time', label: 'One time' },
    { value: 'always_available', label: 'Always available' },
  ],
}: {
  value: string;
  onChange: (v: string) => void;
  options?: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Schedule"
        className="min-h-[44px] w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-10 text-base font-semibold text-slate-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
        <ChevronDown className="h-4 w-4" />
      </span>
    </div>
  );
}

export function AssignTo({
  selected,
  onToggle,
  onToggleAll,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onToggleAll: (all: boolean) => void;
}) {
  const allChecked = selected.length === CHILDREN.length;
  const box =
    'h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-[#52A5CE]';

  return (
    <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900">
      <label className="flex min-h-[44px] min-w-0 cursor-pointer select-none items-center gap-2.5">
        <input type="checkbox" checked={allChecked} onChange={(e) => onToggleAll(e.target.checked)} className={box} />
        <span className="text-xs font-bold text-slate-800 dark:text-white">All Children</span>
      </label>

      <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

      {CHILDREN.map((c) => (
        <label
          key={c.id}
          className="flex min-h-[44px] min-w-0 cursor-pointer select-none items-center gap-2.5 rounded-lg p-0.5 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
        >
          <input type="checkbox" checked={selected.includes(c.id)} onChange={() => onToggle(c.id)} className={box} />
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold uppercase text-white shadow-xs"
            style={{ backgroundColor: c.color }}
          >
            {c.initials}
          </span>
          <span className="min-w-0 break-words text-xs font-semibold text-slate-800 dark:text-white">{c.name}</span>
        </label>
      ))}
    </div>
  );
}

/** Crisp SaaS cursor arrow (MousePointer2) pointing directly on the button surface and tapping once */
function OneShotClickIndicator({
  onSimulatedClick,
  onComplete,
}: {
  onSimulatedClick?: (clicking: boolean) => void;
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<'enter' | 'click' | 'fade' | 'gone'>('enter');

  useEffect(() => {
    // 1. Enter: cursor glides smoothly directly onto the button face (0 -> 750ms)
    const t1 = setTimeout(() => {
      setPhase('click');
      onSimulatedClick?.(true); // Button visibly presses down
    }, 750);

    // Release button press
    const tRelease = setTimeout(() => {
      onSimulatedClick?.(false);
    }, 1050);

    // 2. Fade out after click (750ms -> 2000ms)
    const t2 = setTimeout(() => {
      setPhase('fade');
    }, 2000);

    // 3. Complete and unmount (2600ms)
    const t3 = setTimeout(() => {
      setPhase('gone');
      onComplete?.();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(tRelease);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onSimulatedClick, onComplete]);

  if (phase === 'gone') return null;

  const isClick = phase === 'click';
  const isFade = phase === 'fade';

  return (
    <div
      className={`pointer-events-none absolute right-4 top-1.5 z-30 transition-all duration-500 ease-out ${
        isFade
          ? 'opacity-0 translate-y-2'
          : phase === 'enter'
          ? 'opacity-80 translate-x-3 translate-y-3'
          : 'opacity-100 translate-x-0 translate-y-0'
      }`}
    >
      {/* Expanding soft blue ripple centered precisely at the tip of the arrow (NO static dot) */}
      {isClick && (
        <span className="absolute left-[4px] top-[4.6px] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/60 animate-ping" />
      )}

      {/* Modern crisp SaaS cursor arrow with click tap animation */}
      <div
        className={`transition-transform duration-150 ease-in-out ${
          isClick ? 'scale-90 translate-y-0.5' : 'scale-100'
        }`}
      >
        <MousePointer2
          className="h-6 w-6 fill-white text-slate-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] select-none"
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}

export function DialogFooter({
  submitLabel,
  onCancel,
  onSubmit,
  showClickGuide = false,
  onGuideComplete,
}: {
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  showClickGuide?: boolean;
  onGuideComplete?: () => void;
}) {
  const [isSimulatedClicking, setIsSimulatedClicking] = useState(false);

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch justify-end gap-2.5 border-t border-slate-100 pt-3.5 sm:flex-row sm:items-center dark:border-slate-800">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 shadow-xs transition-colors hover:bg-slate-50 sm:w-auto sm:px-5 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Cancel
      </button>

      <div className="relative inline-flex w-full min-w-0 sm:w-auto">
        <button
          type="button"
          onClick={onSubmit}
          className={`relative inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#52A5CE] px-4 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#4194bd] active:scale-95 sm:w-auto sm:px-6 ${
            isSimulatedClicking ? 'scale-95 bg-[#3a86ad] shadow-inner' : 'hover:scale-105'
          }`}
        >
          <span>{submitLabel}</span>
        </button>

        {showClickGuide && (
          <OneShotClickIndicator
            onSimulatedClick={setIsSimulatedClicking}
            onComplete={onGuideComplete}
          />
        )}
      </div>
    </div>
  );
}
