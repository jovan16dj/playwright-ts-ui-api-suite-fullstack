import { test, expect } from '@playwright/test';
import { login } from './model';

function unique(prefix: string) {
  return `${prefix}-${Math.random().toString(36).substring(2,6)}`;
}

test.describe('Item CRUD e2e', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('create, edit & delete an item', async ({ page }) => {
  
    const name1 = unique('Test');
    await page.getByTestId('new-item-input').fill(name1);
    await page.getByTestId('add-btn').click();
    const item = page.getByRole('listitem', { name: name1 });
    await expect(item).toBeVisible();

    const name2 = unique('Upd');
    await item.getByTestId('edit-btn').click();
    await page.getByTestId('edit-input').fill(name2);
    await page.getByTestId('save-btn').click();
    const updated = page.getByRole('listitem', { name: name2 });
    await expect(updated).toBeVisible();

    await updated.getByTestId('delete-btn').click();
    await expect(page.getByRole('listitem', { name: name2 })).toHaveCount(0);
  });
});
