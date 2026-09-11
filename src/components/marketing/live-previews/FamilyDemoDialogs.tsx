'use client';

import React, { useId, useRef, useState } from 'react';
import { MapPin, Minus, Plus, ShoppingBag, Sparkles, Star, X } from 'lucide-react';

interface FamilyDemoDialogsProps {
  task: { title: string; stars: number } | null;
  cashInOpen: boolean;
  starBalance: number;
  onClose: () => void;
  onSignup: () => void;
}

const fieldClassName =
  'min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#52a5ce] focus:ring-2 focus:ring-[#52a5ce]/15 transition-all';
const focusClassName =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52a5ce] focus-visible:ring-offset-2';

function CashInForm({
  starBalance,
  onClose,
  onSignup,
}: Pick<FamilyDemoDialogsProps, 'starBalance' | 'onClose' | 'onSignup'>) {
  const fieldId = useId();
  const [stars, setStars] = useState(1);
  const maximum = Math.max(1, Math.floor(starBalance));
  const changeStars = (value: number) =>
    setStars(Math.min(maximum, Math.max(1, Math.floor(value) || 1)));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSignup();
      }}
    >
      <div className="space-y-4 p-4 sm:p-6">
        {/* Regular Stars Balance Banner */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-300/80 bg-amber-50/90 px-4 py-3 text-xs font-semibold text-amber-900">
          <span>Regular stars</span>
          <span className="flex items-center gap-1 font-bold text-amber-900">
            <Star aria-hidden="true" className="h-4 w-4 fill-amber-500 text-amber-500" />
            {starBalance.toLocaleString('en-US')}
          </span>
        </div>

        {/* What are they getting? */}
        <div>
          <label htmlFor={`${fieldId}-item`} className="mb-1.5 block text-xs font-semibold text-slate-700">
            What are they getting? <span className="text-rose-500">*</span>
          </label>
          <input
            id={`${fieldId}-item`}
            name="item"
            required
            placeholder="e.g. LEGO set"
            className={fieldClassName}
          />
        </div>

        {/* Where? (optional) */}
        <div>
          <label htmlFor={`${fieldId}-where`} className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-700">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
            Where? (optional)
          </label>
          <input
            id={`${fieldId}-where`}
            name="where"
            placeholder="e.g. Target, movie theater"
            className={fieldClassName}
          />
        </div>

        {/* Stepper: Stars to cash in */}
        <div className="pt-1">
          <label htmlFor={`${fieldId}-stars`} className="mb-2 block text-xs font-semibold text-slate-700 text-center sm:text-left">
            Stars to cash in
          </label>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Use one fewer star"
              disabled={stars <= 1}
              onClick={() => changeStars(stars - 1)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${focusClassName}`}
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </button>
            <div className="flex h-11 min-w-0 w-28 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-slate-800 bg-white">
              <Star aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                id={`${fieldId}-stars`}
                name="stars"
                type="number"
                min={1}
                max={maximum}
                value={stars}
                onChange={(event) => changeStars(event.target.valueAsNumber)}
                className="min-h-11 min-w-0 w-12 appearance-none bg-transparent text-center text-base sm:text-sm font-bold outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <button
              type="button"
              aria-label="Use one more star"
              disabled={stars >= maximum}
              onClick={() => changeStars(stars + 1)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${focusClassName}`}
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          {/* Remaining Stars Box */}
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            <span>Regular stars remaining</span>
            <output htmlFor={`${fieldId}-stars`} className="flex items-center gap-1 font-bold text-slate-800">
              <Star aria-hidden="true" className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              {Math.max(0, starBalance - stars).toLocaleString('en-US')}
            </output>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col-reverse items-stretch justify-end gap-2 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className={`min-h-11 rounded-xl px-4 py-2.5 text-sm sm:text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ${focusClassName}`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ff6582] hover:bg-[#e84f6d] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${focusClassName}`}
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4 shrink-0 text-white" />
          Request {stars} {stars === 1 ? 'Star' : 'Stars'}
        </button>
      </div>
    </form>
  );
}

export function FamilyDemoDialogs({
  task,
  cashInOpen,
  starBalance,
  onClose,
  onSignup,
}: FamilyDemoDialogsProps) {
  const open = Boolean(task) || cashInOpen;
  const notesId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const shell = panelRef.current?.closest<HTMLElement>('[data-demo-shell]');
    const bounds = shell?.getBoundingClientRect();
    if (window.innerWidth < 1024 && bounds && (bounds.top < 80 || bounds.bottom > window.innerHeight)) {
      shell?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
    }
    const focusable = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex="0"]'
    ) ?? []);
    focusable()[0]?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== 'Tab') return;
      const controls = focusable();
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex min-h-0 items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={task ? 'Complete Task' : 'Cash In Stars'}
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className={`relative w-full min-w-0 max-h-full overflow-y-auto overscroll-contain rounded-2xl bg-white font-sans text-slate-800 shadow-2xl outline-none border border-slate-100 animate-in zoom-in-95 duration-200 ${
          task ? 'max-w-[430px]' : 'max-w-[390px]'
        }`}
      >
        {task ? (
          <>
            {/* Top Banner Matching Screenshot 2 */}
            <div className="flex items-center gap-2.5 bg-[#52a5ce] px-4 py-3.5 text-white rounded-t-2xl">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                <Star aria-hidden="true" className="h-4 w-4 fill-white text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 block">
                  COMPLETE TASK
                </span>
                <p className="mt-0.5 break-words text-sm sm:text-base font-bold leading-tight text-white">
                  {task.title}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white">
                <Star aria-hidden="true" className="h-3 w-3 fill-white text-white" />
                {task.stars}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Complete Task"
                className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${focusClassName}`}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <form
              key={task.title}
              onSubmit={(event) => {
                event.preventDefault();
                onSignup();
              }}
            >
              <div className="p-4 sm:p-5">
                <label htmlFor={notesId} className="sr-only">
                  Any notes for your parent? (optional)
                </label>
                <textarea
                  id={notesId}
                  name="notes"
                  rows={3}
                  placeholder="Any notes for your parent? (optional)"
                  className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] focus:bg-white p-3 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#52a5ce] focus:ring-2 focus:ring-[#52a5ce]/20 min-h-[90px] resize-none transition-all shadow-2xs"
                />
              </div>

              <div className="flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:px-5">
                <button
                  type="button"
                  onClick={onClose}
                  className={`min-h-11 rounded-lg px-3 py-1.5 text-sm sm:text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ${focusClassName}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#52a5ce] hover:bg-[#4194bd] px-4 py-2 text-xs font-bold text-white shadow-2xs transition-all cursor-pointer ${focusClassName}`}
                >
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-white" />
                  Submit for Approval
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Header Matching Screenshot 3 */}
            <div className="flex items-start gap-3 border-b border-slate-100 p-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 border border-rose-100 text-[#ff6582]">
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Cash In Stars
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Use stars for something being purchased right now.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Cash In Stars"
                className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ${focusClassName}`}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <CashInForm starBalance={starBalance} onClose={onClose} onSignup={onSignup} />
          </>
        )}
      </div>
    </div>
  );
}
