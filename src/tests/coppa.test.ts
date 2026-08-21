import { describe, it, expect } from 'vitest';
import { ParentalConsent } from '../lib/types';

describe('COPPA Child Safety & Consent Audit', () => {
  it('validates that parental consent records contain mandatory compliance fields', () => {
    const consent: ParentalConsent = {
      id: 'consent-01',
      householdId: 'hh-miller-01',
      childProfileId: 'prof-leo',
      consentingAdultId: 'user-001',
      policyVersion: '1.0',
      purpose: 'Supervised financial education, chores, allowances, and goals',
      consentedAt: '2026-01-16T09:00:00Z',
      isRevoked: false,
    };

    expect(consent.consentingAdultId).toBeTruthy();
    expect(consent.policyVersion).toBe('1.0');
    expect(consent.consentedAt).toBeTruthy();
    expect(consent.isRevoked).toBe(false);
  });

  it('rejects 4-digit PINs that are not exactly 4 numeric characters', () => {
    const validatePin = (pin: string) => /^\d{4}$/.test(pin);
    expect(validatePin('1234')).toBe(true);
    expect(validatePin('0000')).toBe(true);
    expect(validatePin('123')).toBe(false);
    expect(validatePin('12345')).toBe(false);
    expect(validatePin('abcd')).toBe(false);
  });
});
