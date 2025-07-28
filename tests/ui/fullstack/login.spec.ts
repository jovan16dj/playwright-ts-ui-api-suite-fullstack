import { test, expect } from '@playwright/test';
import { login } from './model';

test.describe('Login functionality', () => {
  test('Valid login', async ({ page }) => {
    await login(page);
  });

  test('Invalid login shows an alert', async ({ page }) => {
  
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Invalid credentials');
      await dialog.accept();
    });

    await page.goto('/');
    await page.getByPlaceholder('Username').fill('wrong');
    await page.getByPlaceholder('Password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();
  });
});
