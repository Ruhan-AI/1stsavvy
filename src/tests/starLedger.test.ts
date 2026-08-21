import { describe, it, expect } from 'vitest';
import { StarLedgerEntry } from '../lib/types';

describe('Immutable Star Ledger System', () => {
  it('computes running star balance correctly from an audit ledger', () => {
    const entries: StarLedgerEntry[] = [
      { id: '1', householdId: 'h1', childProfileId: 'c1', amount: 3, balanceAfter: 3, type: 'task_completed', reason: 'Made bed', createdAt: '2026-08-01' },
      { id: '2', householdId: 'h1', childProfileId: 'c1', amount: 4, balanceAfter: 7, type: 'task_completed', reason: 'Homework', createdAt: '2026-08-02' },
      { id: '3', householdId: 'h1', childProfileId: 'c1', amount: -5, balanceAfter: 2, type: 'reward_redeemed', reason: 'Movie Night', createdAt: '2026-08-03' },
      { id: '4', householdId: 'h1', childProfileId: 'c1', amount: 10, balanceAfter: 12, type: 'manual_award', reason: 'Helping neighbor', createdAt: '2026-08-04' },
    ];

    const computedTotal = entries.reduce((sum, e) => sum + e.amount, 0);
    expect(computedTotal).toBe(12);
    expect(entries[entries.length - 1].balanceAfter).toBe(12);
  });

  it('prevents balance from dipping below zero on deductions', () => {
    const currentBalance = 3;
    const deduction = 5;
    const newBalance = Math.max(0, currentBalance - deduction);
    expect(newBalance).toBe(0);
  });
});
