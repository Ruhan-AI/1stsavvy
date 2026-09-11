'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift } from 'lucide-react';
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
  { name: 'Gift', color: '#EFCE7B' },
  { name: 'Bike', color: '#52A5CE' },
  { name: 'Gamepad', color: '#7B2CBF' },
  { name: 'Ticket', color: '#0F766E' },
];

const TIMELINE_OPTIONS = [
  { value: 'milestone', label: 'Milestone Goal' },
  { value: 'end_of_month', label: 'By End of Month' },
  { value: 'summer_break', label: 'By Summer Break' },
  { value: 'holiday', label: 'Next Holiday' },
];

export function LiveGoalCreationPreview() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [look, setLook] = useState(0);
  const [cost, setCost] = useState(10);
  const [timeline, setTimeline] = useState('milestone');
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

          const targetTitle = 'Weekend Theme Park Trip';
          const targetDesc = 'Family celebration trip once milestone stars are reached!';

          // Animate title typing (slight delay after task)
          setTimeout(() => {
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
                    // Animate star cost up to 50
                    setCost(50);
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
          }, 150);
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
        title="New Goal"
        onClose={handleRedirect}
        footer={
          <DialogFooter
            submitLabel="Create Goal"
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
            placeholder="e.g., Extra screen time"
            aria-label="Goal title"
            className={INPUT}
          />
        </Field>

        <Field label="Description" optional optionalLowercase>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Add details about this goal.."
            aria-label="Goal description"
            className="min-h-[88px] w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-base text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-300 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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

        <Field label="Target Timeline">
          <ScheduleSelect value={timeline} onChange={setTimeline} options={TIMELINE_OPTIONS} />
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
