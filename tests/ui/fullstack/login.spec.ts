import { test, expect } from '@playwright/test';
import { login } from './model';

test.describe('Login functionality', () => {
  test('Valid login', async ({ page }) => {
    await login(page);
  });

  test('Invalid login shows an alert', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('wrong');
    await page.getByPlaceholder('Password').fill('wrong');
    
    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      page.getByRole('button', { name: 'Login' }).click()
    ]);
    expect(dialog.message()).toBe('Invalid credentials');
    await dialog.accept();
  });
});
