'use client';

import React, { useState } from 'react';
import { Gift, ImagePlus } from 'lucide-react';
import {
  AssignTo,
  CHILDREN,
  DialogFooter,
  DialogFrame,
  Field,
  IconAndColor,
  INPUT,
  Note,
  StarStepper,
} from './childDialogParts';

/**
 * Marketing stand-in for the app's New Goal dialog
 * (`src/components/children/GoalDialog.jsx`): Title, Description, Icon & Color, Star
 * Cost, Assign to, an optional image, then Cancel / Create Goal.
 *
 * It differs from New Task in exactly the ways the real dialog does — star cost instead
 * of stars, an image slot instead of a schedule, and a rule under the title.
 */

const LOOKS = [
  { name: 'Gift', color: '#EFCE7B' },
  { name: 'Bike', color: '#52A5CE' },
  { name: 'Gamepad', color: '#7B2CBF' },
  { name: 'Ticket', color: '#0F766E' },
];

export function LiveGoalCreationPreview() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [look, setLook] = useState(0);
  const [cost, setCost] = useState(10);
  const [selected, setSelected] = useState<string[]>([CHILDREN[0].id]);
  const [note, setNote] = useState<string | null>(null);

  const say = (message: string) => {
    setNote(message);
    window.setTimeout(() => setNote((current) => (current === message ? null : current)), 2800);
  };

  const create = () => {
    const who = selected.length
      ? CHILDREN.filter((c) => selected.includes(c.id)).map((c) => c.name).join(' and ')
      : 'nobody yet';
    say(`"${title.trim() || 'Extra screen time'}" — ${cost} stars for ${who}`);
  };

  return (
    <DialogFrame title="New Goal" rule onClose={() => say('Closed without creating a goal')}>
      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="e.g., Extra screen time"
          aria-label="Goal title"
          className={INPUT}
        />
      </Field>

      <Field label="Description" optional optionalLowercase>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Add details about this goal.."
          aria-label="Goal description"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </Field>

      <Field label="Icon & Color">
        <IconAndColor
          name={LOOKS[look].name}
          color={LOOKS[look].color}
          icon={Gift}
          onClick={() => setLook((i) => (i + 1) % LOOKS.length)}
        />
      </Field>

      <Field label="Star Cost">
        <StarStepper value={cost} onChange={setCost} />
      </Field>

      <Field label="Assign to">
        <AssignTo
          selected={selected}
          onToggle={(id) =>
            setSelected((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
          }
          onToggleAll={(all) => setSelected(all ? CHILDREN.map((c) => c.id) : [])}
        />
      </Field>

      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          Image <span className="font-normal text-slate-400">(optional)</span>
        </p>
        <p className="text-xs text-slate-400">Upload an image to replace the icon. Max 5MB.</p>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => say('The file picker opens here in the app')}
            className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-500 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <ImagePlus className="h-4 w-4" />
            <span className="text-[11px] font-medium">Upload</span>
          </button>
        </div>
      </div>

      <DialogFooter submitLabel="Create Goal" onCancel={() => say('Cancelled')} onSubmit={create} />

      <Note text={note} />
    </DialogFrame>
  );
}
