'use client';

import React from 'react';
import { ChevronDown, Minus, Plus, Star } from 'lucide-react';

/**
 * The pieces shared by the New Task and New Goal dialogs.
 *
 * Both come from `src/components/children/{TaskDialog,GoalDialog}.jsx` in the web app and
 * are nearly the same form, so the field chrome lives here — that also keeps them
 * identical on the marketing page, where they sit side by side.
 *
 * Sizes follow docs/responsive-system.md §5 rather than the app's: controls are 44px on a
 * phone and drop to the app's 40px/36px from sm, and no label goes under 11px.
 */

export const CHILDREN = [
  { id: 'c1', name: 'SimonJr', initials: 'S', color: '#52A5CE' },
  { id: 'c2', name: 'Symonds Lab', initials: 'SL', color: '#52A5CE' },
];

export const LABEL = 'text-xs font-semibold uppercase tracking-wider text-slate-500';
export const BOX = 'w-full rounded-xl border border-slate-200 bg-white';
/** §5 + iOS: 44px and 16px text on a phone, the app's 40px/14px from sm. */
export const INPUT =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none sm:h-10 sm:text-sm';

export function Field({
  label,
  optional = false,
  /** New Goal prints "(optional)" in lower case where New Task inherits the uppercase. */
  optionalLowercase = false,
  children,
}: {
  label: string;
  optional?: boolean;
  optionalLowercase?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className={LABEL}>
        {label}
        {optional && (
          <span className={`ml-0.5 font-normal text-slate-400 ${optionalLowercase ? 'normal-case' : ''}`}>
            (optional)
          </span>
        )}
      </p>
      {children}
    </div>
  );
}

/** The dialog shell — rendered as a standing card, not an overlay, so it can sit in a grid. */
export function DialogFrame({
  title,
  rule = false,
  onClose,
  children,
}: {
  title: string;
  /** GoalDialog draws a rule under its title; TaskDialog does not. */
  rule?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mock-preview
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left font-sans shadow-xl select-none sm:p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`flex items-start justify-between gap-3 pb-2 ${rule ? 'mb-3 border-b border-slate-100 dark:border-slate-800' : ''}`}>
        <h3 className="text-base font-bold text-slate-800 dark:text-white">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">{children}</div>
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
      className={`${BOX} flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800`}
    >
      <span className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex flex-col justify-center text-left">
          <span className="text-sm font-semibold text-slate-800 dark:text-white">{name}</span>
          <span className="text-[11px] font-medium text-slate-400">Click to change</span>
        </span>
      </span>
      <span
        className="h-4 w-4 shrink-0 rounded-full border border-slate-100 shadow-inner"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

export function StarStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const btn =
    'flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800';
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label="Decrease" className={btn}>
        <Minus className="h-4 w-4 text-slate-500" />
      </button>
      <div className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 sm:h-10 dark:border-slate-700 dark:bg-slate-900">
        <Star className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
        <span className="text-center text-sm font-semibold tabular-nums text-slate-800 dark:text-white">{value}</span>
      </div>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase" className={btn}>
        <Plus className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
}

export function ScheduleSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Schedule"
        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-10 text-base font-semibold text-slate-700 focus:outline-none sm:h-10 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <option value="one_time">One time</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="always_available">Always available</option>
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
    'h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-[#52A5CE]';

  return (
    <div className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <label className="flex min-h-[44px] cursor-pointer select-none items-center gap-3 sm:min-h-0">
        <input type="checkbox" checked={allChecked} onChange={(e) => onToggleAll(e.target.checked)} className={box} />
        <span className="text-xs font-bold text-slate-800 dark:text-white">All Children</span>
      </label>

      <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

      {CHILDREN.map((c) => (
        <label
          key={c.id}
          className="flex min-h-[44px] cursor-pointer select-none items-center gap-3 rounded-lg p-1 transition-colors hover:bg-slate-50/50 sm:min-h-0 dark:hover:bg-slate-800/50"
        >
          <input type="checkbox" checked={selected.includes(c.id)} onChange={() => onToggle(c.id)} className={box} />
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold uppercase text-white"
            style={{ backgroundColor: c.color }}
          >
            {c.initials}
          </span>
          <span className="text-xs font-semibold text-slate-800 dark:text-white">{c.name}</span>
        </label>
      ))}
    </div>
  );
}

export function DialogFooter({
  submitLabel,
  onCancel,
  onSubmit,
}: {
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-end gap-2.5 border-t border-slate-100 pt-3 dark:border-slate-800">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 sm:h-9 sm:min-h-0 sm:flex-initial sm:px-6 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#52A5CE] px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#438fb6] sm:h-9 sm:min-h-0 sm:flex-initial sm:px-6"
      >
        {submitLabel}
      </button>
    </div>
  );
}

/** One-line confirmation strip, so a click in the preview visibly does something. */
export function Note({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <div
      role="status"
      className="-mx-5 -mb-5 mt-4 border-t border-slate-100 bg-slate-50 px-5 py-2 text-xs text-slate-600 sm:-mx-6 sm:-mb-6 sm:px-6 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
    >
      {text}
    </div>
  );
}
