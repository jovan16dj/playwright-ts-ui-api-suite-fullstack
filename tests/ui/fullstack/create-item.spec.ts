import { test, expect } from '@playwright/test';
import { login } from './model';

function randomSuffix() {
  return Math.random().toString(36).substring(2, 6);
}

test('Create item', async ({ page }) => {
  await login(page);

  const name = `Test-${randomSuffix()}`;
  await page.getByTestId('new-item-input').fill(name);
  await page.getByTestId('add-btn').click();

  // because each <li> has aria-label={name}, this matches exactly
  const created = page.getByRole('listitem', { name, exact: true });
  await expect(created).toBeVisible();
});
