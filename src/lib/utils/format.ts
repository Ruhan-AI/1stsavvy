import { CurrencyCode } from '../types';

/**
 * Format integer cents into a localized currency string
 * e.g., 145250 cents -> "$1,452.50"
 */
export function formatMoney(cents: number, currency: CurrencyCode = 'USD', showSign = false): string {
  const isNegative = cents < 0;
  const absoluteAmount = Math.abs(cents) / 100;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatted = formatter.format(absoluteAmount);

  if (isNegative) {
    return `-${formatted}`;
  }
  if (showSign && cents > 0) {
    return `+${formatted}`;
  }
  return formatted;
}

/**
 * Compact currency format (e.g., $1.2M, $45.2K)
 */
export function formatCompactMoney(cents: number, currency: CurrencyCode = 'USD'): string {
  const absoluteAmount = Math.abs(cents) / 100;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  const formatted = formatter.format(absoluteAmount);
  return cents < 0 ? `-${formatted}` : formatted;
}

/**
 * Parse standard currency string (e.g. "1250.50" or "$1,250.50") into integer cents
 */
export function parseToCents(amountString: string): number {
  if (!amountString) return 0;
  const clean = amountString.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(clean);
  if (isNaN(parsed)) return 0;
  return Math.round(parsed * 100);
}

/**
 * Format date string (YYYY-MM-DD) into readable format
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return '';
  const date = new Date(dateString.includes('T') ? dateString : `${dateString}T12:00:00Z`);
  return date.toLocaleDateString('en-US', options || {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate net worth from a list of accounts
 */
export function calculateNetWorth(accounts: { balanceCents: number; accountClass: 'asset' | 'liability'; includeInNetWorth: boolean }[]): {
  totalAssetsCents: number;
  totalLiabilitiesCents: number;
  netWorthCents: number;
} {
  let totalAssetsCents = 0;
  let totalLiabilitiesCents = 0;

  for (const acc of accounts) {
    if (!acc.includeInNetWorth) continue;
    if (acc.accountClass === 'asset') {
      totalAssetsCents += acc.balanceCents;
    } else {
      totalLiabilitiesCents += Math.abs(acc.balanceCents);
    }
  }

  return {
    totalAssetsCents,
    totalLiabilitiesCents,
    netWorthCents: totalAssetsCents - totalLiabilitiesCents,
  };
}

/**
 * Calculate budget summary (Planned, Actual, Remaining, Percentage)
 */
export function calculateBudgetSummary(items: { plannedCents: number; actualCents: number; type: 'income' | 'expense' }[]) {
  let totalPlannedExpense = 0;
  let totalActualExpense = 0;
  let totalPlannedIncome = 0;
  let totalActualIncome = 0;

  for (const item of items) {
    if (item.type === 'expense') {
      totalPlannedExpense += item.plannedCents;
      totalActualExpense += item.actualCents;
    } else {
      totalPlannedIncome += item.plannedCents;
      totalActualIncome += item.actualCents;
    }
  }

  const remainingExpense = Math.max(0, totalPlannedExpense - totalActualExpense);
  const expensePercentage = totalPlannedExpense > 0 
    ? Math.min(100, Math.round((totalActualExpense / totalPlannedExpense) * 100)) 
    : 0;

  return {
    totalPlannedExpense,
    totalActualExpense,
    remainingExpense,
    expensePercentage,
    totalPlannedIncome,
    totalActualIncome,
    netPlanned: totalPlannedIncome - totalPlannedExpense,
    netActual: totalActualIncome - totalActualExpense,
  };
}

/**
 * Classnames utility (clsx + twMerge helper)
 */
export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  const result: string[] = [];
  for (const item of classes) {
    if (!item) continue;
    if (typeof item === 'string') {
      result.push(item);
    } else if (typeof item === 'object') {
      for (const [key, val] of Object.entries(item)) {
        if (val) result.push(key);
      }
    }
  }
  return result.join(' ');
}
