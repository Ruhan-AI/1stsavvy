import { test, expect } from '@playwright/test';

test.describe('FirstSavvy Full Platform E2E Flows', () => {
  test('1. Marketing homepage loads with canonical copy and logo', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FirstSavvy/);
    await expect(page.locator('h1')).toContainText('Your family. Your money.');
    await expect(page.getByText('From stars to legacy.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get Started for Free' }).first()).toBeVisible();
  });

  test('2. Family and Personal Finance marketing pages load', async ({ page }) => {
    await page.goto('/family');
    await expect(page.locator('h1')).toContainText('Money habits start early.');

    await page.goto('/personal-finance');
    await expect(page.locator('h1')).toContainText('Your money tells a bigger story.');
  });

  test('3. Adult Login and Dashboard navigation', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign In as Adult' }).click();
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('Financial & Household Overview');
    await expect(page.getByText('The Miller Family')).toBeVisible();
  });

  test('4. Kid Login and Supervised Kid Space', async ({ page }) => {
    await page.goto('/kid-login');
    await page.getByRole('button', { name: 'Open My Kid Space' }).click();
    await page.waitForURL('**/kid-view');
    await expect(page.getByText('My Star Balance')).toBeVisible();
  });

  test('5. Banking and Accounts overview', async ({ page }) => {
    await page.goto('/banking');
    await expect(page.locator('h1')).toContainText('Financial Accounts & Activity');
    await expect(page.getByText('Premier Checking')).toBeVisible();
  });

  test('6. Budgeting planned vs actual', async ({ page }) => {
    await page.goto('/budgeting');
    await expect(page.locator('h1')).toContainText('Monthly Household Budgets');
    await expect(page.getByText('Mortgage & Rent')).toBeVisible();
  });

  test('7. Sidebar navigation routes change without blank states', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Net Worth' }).click();
    await page.waitForURL('**/net-worth');
    await expect(page.locator('h1')).toContainText('Net Worth & Asset Allocation');

    await page.getByRole('link', { name: 'Goals & Savings' }).click();
    await page.waitForURL('**/goals');
    await expect(page.locator('h1')).toContainText('Family Goals & Savings');
  });
});
