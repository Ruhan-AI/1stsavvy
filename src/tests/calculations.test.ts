import { describe, it, expect } from 'vitest';
import { calculateNetWorth, calculateBudgetSummary } from '../lib/utils/format';

describe('Financial Calculations', () => {
  it('calculates Net Worth as Total Assets minus Total Liabilities', () => {
    const mockAccounts = [
      { balanceCents: 1000000, accountClass: 'asset' as const, includeInNetWorth: true }, // $10k checking
      { balanceCents: 5000000, accountClass: 'asset' as const, includeInNetWorth: true }, // $50k savings
      { balanceCents: -2000000, accountClass: 'liability' as const, includeInNetWorth: true }, // -$20k loan
      { balanceCents: 500000, accountClass: 'asset' as const, includeInNetWorth: false }, // excluded
    ];

    const result = calculateNetWorth(mockAccounts);
    expect(result.totalAssetsCents).toBe(6000000); // $60,000
    expect(result.totalLiabilitiesCents).toBe(2000000); // $20,000
    expect(result.netWorthCents).toBe(4000000); // $40,000
  });

  it('calculates budget planned, actual, remaining, and utilization percentage', () => {
    const mockBudgetItems = [
      { plannedCents: 200000, actualCents: 150000, type: 'expense' as const },
      { plannedCents: 100000, actualCents: 120000, type: 'expense' as const },
      { plannedCents: 500000, actualCents: 500000, type: 'income' as const },
    ];

    const summary = calculateBudgetSummary(mockBudgetItems);
    expect(summary.totalPlannedExpense).toBe(300000);
    expect(summary.totalActualExpense).toBe(270000);
    expect(summary.remainingExpense).toBe(30000);
    expect(summary.expensePercentage).toBe(90);
    expect(summary.netPlanned).toBe(200000);
    expect(summary.netActual).toBe(230000);
  });
});
