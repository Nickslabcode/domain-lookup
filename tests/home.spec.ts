import { test, expect } from '@playwright/test';
import { HomeView } from './view-objects/HomeView';
import { DomainUtils } from './utils/DomainUtils';

let homeView: HomeView;

test.beforeEach(async ({ page }) => {
  const submitButton = page.getByRole('button', { name: 'Accio!' });
  const searchForm = page.getByPlaceholder('Type a valid domain...');

  homeView = new HomeView(page, submitButton, searchForm);

  await homeView.navigateToHome();
});

test.describe('Home view', () => {
  test('checks title', async ({ page }) => {
    await expect(page).toHaveTitle('DomainLookup');
  });

  test('checks URL', async ({ page }) => {
    await expect(page).toHaveURL('https://domain-lookup.nikola-nenovski.info/');
  });
});

test.describe('checks search form validations', () => {
  test('search form should be visible', async () => {
    await expect(homeView.searchForm).toBeVisible();
  });

  test('submit button should be disabled', async () => {
    await expect(homeView.submitButton).toBeDisabled();
  });

  // TODO check validation for incorrect domain names after adding a proper validation message
  // test('submit button should be disabled for invalid domain names', async () => {
  //   await homeView.searchForm.fill('test');
  //   await expect(homeView.submitButton).toBeDisabled();
  // });

  test('search form should accept valid domains with special characters', async ({
    page,
  }) => {
    const domain = 'хамали.bg';
    const encodedDomain = DomainUtils.punyEncode(domain);

    await homeView.submitDomain(domain);

    await expect(page).toHaveURL(
      `https://domain-lookup.nikola-nenovski.info/results?domain=${encodedDomain}`
    );
  });
});
