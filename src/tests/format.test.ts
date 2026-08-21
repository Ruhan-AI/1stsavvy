import { describe, it, expect } from 'vitest';
import { formatMoney, formatCompactMoney, parseToCents } from '../lib/utils/format';

describe('Money Formatting & Cents Arithmetic', () => {
  it('formats positive integer cents into localized USD string', () => {
    expect(formatMoney(125000)).toBe('$1,250.00');
    expect(formatMoney(450)).toBe('$4.50');
    expect(formatMoney(99)).toBe('$0.99');
  });

  it('formats negative amounts with a leading minus sign', () => {
    expect(formatMoney(-245000)).toBe('-$2,450.00');
    expect(formatMoney(-50)).toBe('-$0.50');
  });

  it('supports explicit plus sign formatting', () => {
    expect(formatMoney(475000, 'USD', true)).toBe('+$4,750.00');
    expect(formatMoney(-15000, 'USD', true)).toBe('-$150.00');
  });

  it('formats compact currencies correctly', () => {
    expect(formatCompactMoney(43740770)).toBe('$437.4K');
    expect(formatCompactMoney(12850000)).toBe('$128.5K');
  });

  it('parses formatted currency strings safely to integer cents', () => {
    expect(parseToCents('$1,250.50')).toBe(125050);
    expect(parseToCents('45.00')).toBe(4500);
    expect(parseToCents('-$250.00')).toBe(-25000);
    expect(parseToCents('')).toBe(0);
  });
});
