'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import {
  AssignTo,
  CHILDREN,
  DialogFooter,
  DialogFrame,
  Field,
  IconAndColor,
  INPUT,
  Note,
  ScheduleSelect,
  StarStepper,
} from './childDialogParts';

/**
 * Marketing stand-in for the app's New Task dialog
 * (`src/components/children/TaskDialog.jsx`): Title, Description, Icon & Color, Stars,
 * Schedule, Assign to, then Cancel / Create Task.
 *
 * Nothing is saved — Create Task just reports what it would have created.
 */

/** Cycled by the Icon & Color row, which opens a picker in the real dialog. */
const LOOKS = [
  { name: 'Star', color: '#52A5CE' },
  { name: 'Book', color: '#7B2CBF' },
  { name: 'Home', color: '#0F766E' },
  { name: 'Sparkles', color: '#f59e0b' },
];

export function LiveTaskCreationPreview() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [look, setLook] = useState(0);
  const [stars, setStars] = useState(1);
  const [schedule, setSchedule] = useState('daily');
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
    say(`"${title.trim() || 'Clean your room'}" — ${stars} star${stars === 1 ? '' : 's'} for ${who}`);
  };

  return (
    <DialogFrame title="New Task" onClose={() => say('Closed without creating a task')}>
      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="e.g., Clean your room"
          aria-label="Task title"
          className={INPUT}
        />
      </Field>

      <Field label="Description" optional>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Add details about the task..."
          aria-label="Task description"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </Field>

      <Field label="Icon & Color">
        <IconAndColor
          name={LOOKS[look].name}
          color={LOOKS[look].color}
          icon={Star}
          onClick={() => setLook((i) => (i + 1) % LOOKS.length)}
        />
      </Field>

      <Field label="Stars">
        <StarStepper value={stars} onChange={setStars} />
      </Field>

      <Field label="Schedule">
        <ScheduleSelect value={schedule} onChange={setSchedule} />
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

      <DialogFooter submitLabel="Create Task" onCancel={() => say('Cancelled')} onSubmit={create} />

      <Note text={note} />
    </DialogFrame>
  );
}
