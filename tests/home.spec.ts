import { test, expect } from '@playwright/test';

test.describe('Home view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://domain-lookup.nikola-nenovski.info/');
  });

  test('checks title', async ({ page }) => {
    await expect(page).toHaveTitle('DomainLookup');
  });


  // TODO Separate the validations in a suite with individual tests for each validation
  test('checks search form validations', async ({ page }) => {
    const searchForm = page.getByPlaceholder('Type a valid domain...');
    const submitButton = page.getByRole('button', { name: 'Accio!' });
    
    // Search form input should be visible
    await expect(searchForm).toBeVisible();

    // Submit button should be disabled
    await expect(submitButton).toBeDisabled();

    // Submit button should be disabled for invalid domain names
    await searchForm.fill('test');
    await expect(submitButton).toBeDisabled();
  });

  // TODO Add tests for the footer
});
