import { test, expect } from '@playwright/test';
import { HomeView } from './view-objects/HomeView';
import { DomainUtils } from './utils/DomainUtils';
import {
  E2E_WORKER_URL,
  HOME_TITLE,
  HOME_URL,
  WORKER_URL_WILDCARD,
} from './constants';
import { ApiUtils } from './utils/ApiUtils';

let homeView: HomeView;

test.beforeEach(async ({ page }) => {
  homeView = new HomeView(page);
  await homeView.navigateToHome();
});

test.describe('Home view', () => {
  test('checks title', async ({ page }) => {
    await expect(page).toHaveTitle(HOME_TITLE);
  });

  test('checks URL', async ({ page }) => {
    await expect(page).toHaveURL(HOME_URL);
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
    const apiUtils = new ApiUtils(page);
    await apiUtils.swapApiRequestUrl(WORKER_URL_WILDCARD, E2E_WORKER_URL);

    const domain = 'хамали.bg';
    const encodedDomain = DomainUtils.punyEncode(domain);

    await homeView.submitDomain(domain);

    await expect(page).toHaveURL(`${HOME_URL}/results?domain=${encodedDomain}`);

    await page.unroute(WORKER_URL_WILDCARD);
  });

  test('search form should accept URLs containing valid domain names', async ({
    page,
  }) => {
    const apiUtils = new ApiUtils(page);
    await apiUtils.swapApiRequestUrl(WORKER_URL_WILDCARD, E2E_WORKER_URL);

    const url = 'https://playwright.dev/search?q=assertions';
    const extractedDomain = DomainUtils.extractFromUrl(url);

    await homeView.submitDomain(url);

    await expect(page).toHaveURL(
      `${HOME_URL}/results?domain=${extractedDomain}`
    );

    await page.unroute(WORKER_URL_WILDCARD);
  });
});
