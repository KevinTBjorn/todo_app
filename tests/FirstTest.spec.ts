import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:1234/');
  await page.getByText('label').click();
  await page.getByPlaceholder('Add a task').click();
  await page.getByPlaceholder('Add a task').fill('hello');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('Add a task').click();
  await page.getByPlaceholder('Add a task').fill('tag');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button').nth(1).click();
});
