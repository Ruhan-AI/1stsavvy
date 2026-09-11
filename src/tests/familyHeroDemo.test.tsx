import React, { useState } from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FamilyDemoChildView } from '@/components/marketing/live-previews/FamilyDemoChildView';
import { FamilyDemoDialogs } from '@/components/marketing/live-previews/FamilyDemoDialogs';
import { LiveHeroDashboardPreview } from '@/components/marketing/live-previews/LiveHeroDashboardPreview';

function ChildDemo({ onSignup }: { onSignup: () => void }) {
  const [task, setTask] = useState<{ title: string; stars: number } | null>(null);
  const [cashInOpen, setCashInOpen] = useState(false);
  return (
    <>
      <FamilyDemoChildView
        starBalance={42}
        onCompleteTask={setTask}
        onCashIn={() => setCashInOpen(true)}
        onSignup={onSignup}
        onSwitchToParent={() => {}}
      />
      <FamilyDemoDialogs
        task={task}
        cashInOpen={cashInOpen}
        starBalance={42}
        onClose={() => { setTask(null); setCashInOpen(false); }}
        onSignup={onSignup}
      />
    </>
  );
}

// Keep the shared browser API implementations from setup.ts between cases.
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('family hero child demo', () => {
  it('lets visitors explore tasks, claimed goals and the activity log while keeping their 42-star preview', () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);

    expect(screen.getByRole('button', { name: 'Tasks', pressed: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Gardening/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Goals' }));
    expect(screen.getByRole('button', { name: 'Goals', pressed: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Preparation for Tug of war/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Do gym daily/ })).toBeInTheDocument();
    expect(screen.getAllByText(/Claimed 8\/19\/2026/)).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'Activity' }));
    expect(screen.getByRole('heading', { name: 'Activity Log' })).toBeInTheDocument();
    const table = within(screen.getByRole('table'));
    expect(table.getAllByRole('columnheader').map((column) => column.textContent)).toEqual(['Date & Time', 'Event', 'Type', 'Stars', 'Balance']);
    expect(table.getAllByText('Task Approved').length).toBeGreaterThan(0);
    expect(table.getAllByText('Reward Claimed')).toHaveLength(2);
    const newest = within(table.getAllByRole('row')[1]).getAllByRole('cell');
    expect(newest[3]).toHaveTextContent('+10');
    expect(newest[4]).toHaveTextContent('42');

    fireEvent.click(screen.getByRole('button', { name: 'Tasks' }));
    expect(screen.getByRole('button', { name: /Brush Your teeth/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cash in stars, 42 stars available' })).toHaveTextContent('42');
    expect(onSignup).not.toHaveBeenCalled();
  });

  it('opens the selected Complete Task dialog before sending its submit action to signup', () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);
    fireEvent.click(screen.getByRole('button', { name: /Gardening/ }));
    const dialog = within(screen.getByRole('dialog', { name: 'Complete Task' }));
    expect(dialog.getByText('Gardening')).toBeVisible();
    expect(dialog.getByText('5')).toBeVisible();
    expect(onSignup).not.toHaveBeenCalled();

    fireEvent.change(dialog.getByRole('textbox', { name: /Any notes for your parent/ }), { target: { value: 'I watered the flowers.' } });
    fireEvent.click(dialog.getByRole('button', { name: 'Submit for Approval' }));
    expect(onSignup).toHaveBeenCalledOnce();
  });

  it('requires a purchase description, bounds cash-in stars to the balance and sends a valid request to signup', () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cash in stars, 42 stars available' }));
    const dialog = within(screen.getByRole('dialog', { name: 'Cash In Stars' }));
    const stars = dialog.getByRole('spinbutton', { name: 'Stars to cash in' });
    const item = dialog.getByRole('textbox', { name: /What are they getting/ });

    expect(stars).toHaveValue(1);
    expect(dialog.getByRole('button', { name: 'Use one fewer star' })).toBeDisabled();
    expect(dialog.getByRole('status')).toHaveTextContent(/^41$/);
    fireEvent.click(dialog.getByRole('button', { name: 'Request 1 Star' }));
    expect(item).toBeInvalid();
    expect(onSignup).not.toHaveBeenCalled();

    fireEvent.click(dialog.getByRole('button', { name: 'Use one more star' }));
    expect(stars).toHaveValue(2);
    expect(dialog.getByRole('status')).toHaveTextContent(/^40$/);
    fireEvent.change(stars, { target: { value: '1000' } });
    expect(stars).toHaveValue(42);
    expect(dialog.getByRole('button', { name: 'Use one more star' })).toBeDisabled();
    expect(dialog.getByRole('status')).toHaveTextContent(/^0$/);
    fireEvent.change(stars, { target: { value: '0' } });
    expect(stars).toHaveValue(1);
    expect(dialog.getByRole('button', { name: 'Use one fewer star' })).toBeDisabled();

    fireEvent.change(item, { target: { value: 'LEGO set' } });
    fireEvent.change(stars, { target: { value: '7' } });
    expect(dialog.getByRole('status')).toHaveTextContent(/^35$/);
    expect(onSignup).not.toHaveBeenCalled();
    fireEvent.click(dialog.getByRole('button', { name: 'Request 7 Stars' }));
    expect(onSignup).toHaveBeenCalledOnce();
  });

  it('cancels task completion, restores focus and clears the draft without signing up', async () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);
    const opener = screen.getByRole('button', { name: /Help mother with Laundry/ });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.change(screen.getByRole('textbox', { name: /Any notes for your parent/ }), { target: { value: 'Draft note' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(opener).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveAttribute('data-scroll-locked');

    fireEvent.click(opener);
    expect(screen.getByRole('textbox', { name: /Any notes for your parent/ })).toHaveValue('');
    expect(onSignup).not.toHaveBeenCalled();
  });

  it('dismisses cash-in with Escape, restores focus and resets its form when reopened', async () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);
    const opener = screen.getByRole('button', { name: 'Cash in stars, 42 stars available' });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.change(screen.getByRole('textbox', { name: /What are they getting/ }), { target: { value: 'Movie tickets' } });
    fireEvent.click(screen.getByRole('button', { name: 'Use one more star' }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    await waitFor(() => expect(opener).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(opener);
    expect(screen.getByRole('textbox', { name: /What are they getting/ })).toHaveValue('');
    expect(screen.getByRole('spinbutton', { name: 'Stars to cash in' })).toHaveValue(1);
    expect(screen.getByRole('status')).toHaveTextContent(/^41$/);
    expect(onSignup).not.toHaveBeenCalled();
  });

  it('sends awarded tasks and goal actions straight to signup', () => {
    const onSignup = vi.fn();
    render(<ChildDemo onSignup={onSignup} />);
    fireEvent.click(screen.getByRole('button', { name: /Clean bedroom & organize desk/ }));
    expect(onSignup).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Goals' }));
    fireEvent.click(screen.getByRole('button', { name: /Preparation for Tug of war/ }));
    fireEvent.click(screen.getByRole('button', { name: /Do gym daily/ }));
    expect(onSignup).toHaveBeenCalledTimes(3);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the real hero sidebar switch and top toggle controls working', () => {
    render(<LiveHeroDashboardPreview />);
    const content = screen.getByRole('region', { name: "Leo Miller's kid space" }).parentElement!;
    Object.defineProperty(content, 'scrollTo', { value: vi.fn(), configurable: true });
    expect(screen.getByRole('heading', { name: 'Hi, Leo Miller!' })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to Parent View' }));
    expect(screen.queryByRole('heading', { name: 'Hi, Leo Miller!' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Switch to Child View' })).toHaveTextContent('Sarah Miller (Admin)');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to Child View' }));
    expect(screen.getByRole('heading', { name: 'Hi, Leo Miller!' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Switch to Parent View' })).toHaveTextContent(/Stars Balance/);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to Parent View' }));
    expect(screen.getByRole('button', { name: 'Switch to Child View' })).toBeInTheDocument();
  });
});
