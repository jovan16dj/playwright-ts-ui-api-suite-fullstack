import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  // assert the dashboard heading is visible
  await expect(
    page.getByRole('heading', { level: 2, name: 'Item List' })
  ).toBeVisible();
}
