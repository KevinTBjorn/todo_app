import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:1234/');
  await page.getByPlaceholder('Add a task').click();
  await page.getByPlaceholder('Add a task').fill('test');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('Add a task').click();
  await page.getByPlaceholder('Add a task').fill('test 2');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button').nth(2).click();
  await page.getByRole('button').nth(1).click();
});
