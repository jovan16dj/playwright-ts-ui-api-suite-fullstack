import { test, expect } from '@playwright/test';
import { login } from './model';

function randomSuffix() {
  return Math.random().toString(36).substring(2, 6);
}

test('Edit item', async ({ page }) => {
  await login(page);

  const original = `Orig-${randomSuffix()}`;
  const updated  = `Upd-${randomSuffix()}`;

  await page.getByTestId('new-item-input').fill(original);
  await page.getByTestId('add-btn').click();

  const item = page.getByRole('listitem', { name: original, exact: true });
  await expect(item).toBeVisible();

  await item.getByTestId('edit-btn').click();

  await page.getByTestId('edit-input').fill(updated);
  await page.getByTestId('save-btn').click();

  const edited = page.getByRole('listitem', { name: updated, exact: true });
  await expect(edited).toBeVisible();
});
