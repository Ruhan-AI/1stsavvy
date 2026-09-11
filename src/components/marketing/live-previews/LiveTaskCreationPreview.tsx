'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import {
  AssignTo,
  CHILDREN,
  DialogFooter,
  DialogFrame,
  Field,
  IconAndColor,
  INPUT,
  ScheduleSelect,
  StarStepper,
} from './childDialogParts';

const LOOKS = [
  { name: 'Star', color: '#52A5CE' },
  { name: 'Book', color: '#7B2CBF' },
  { name: 'Home', color: '#0F766E' },
  { name: 'Sparkles', color: '#f59e0b' },
];

export function LiveTaskCreationPreview() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [look, setLook] = useState(0);
  const [stars, setStars] = useState(1);
  const [schedule, setSchedule] = useState('daily');
  const [selected, setSelected] = useState<string[]>([CHILDREN[0].id]);
  const [showClickGuide, setShowClickGuide] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Auto-fill animation on scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const targetTitle = 'Clean bedroom & desk';
          const targetDesc = 'Make bed, put away toys, and vacuum the floor.';

          // Animate title typing
          let tIndex = 0;
          const titleInterval = setInterval(() => {
            if (tIndex <= targetTitle.length) {
              setTitle(targetTitle.slice(0, tIndex));
              tIndex++;
            } else {
              clearInterval(titleInterval);

              // Animate description typing
              let dIndex = 0;
              const descInterval = setInterval(() => {
                if (dIndex <= targetDesc.length) {
                  setDescription(targetDesc.slice(0, dIndex));
                  dIndex++;
                } else {
                  clearInterval(descInterval);
                  // Animate stars up to 5
                  setStars(5);
                  // Select both children
                  setSelected(CHILDREN.map((c) => c.id));
                  // Activate one-shot click animation guide on button
                  setTimeout(() => {
                    setShowClickGuide(true);
                  }, 400);
                }
              }, 20);
            }
          }, 30);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleRedirect = () => {
    router.push('/signup');
  };

  return (
    <div ref={containerRef} className="h-full w-full min-w-0">
      <DialogFrame
        title="New Task"
        onClose={handleRedirect}
        footer={
          <DialogFooter
            submitLabel="Create Task"
            showClickGuide={showClickGuide}
            onGuideComplete={() => setShowClickGuide(false)}
            onCancel={handleRedirect}
            onSubmit={handleRedirect}
          />
        }
      >
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
            rows={2}
            placeholder="Add details about the task..."
            aria-label="Task description"
            className="min-h-[88px] w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-base text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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

        <Field label="Reward Stars">
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
      </DialogFrame>
    </div>
  );
}
