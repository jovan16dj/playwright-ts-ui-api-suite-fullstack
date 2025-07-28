import { test, expect } from '@playwright/test';
import { login } from './model';

function randomSuffix() {
  return Math.random().toString(36).substring(2, 6);
}

test('Delete item', async ({ page }) => {
  await login(page);

  const name = `Del-${randomSuffix()}`;
  await page.getByTestId('new-item-input').fill(name);
  await page.getByTestId('add-btn').click();

  const item = page.getByRole('listitem', { name, exact: true });
  await expect(item).toBeVisible();

  await item.getByTestId('delete-btn').click();

  await expect(
    page.getByRole('listitem', { name, exact: true })
  ).toHaveCount(0);
});
