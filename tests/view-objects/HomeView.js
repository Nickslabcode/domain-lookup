export class HomeView {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.submitButton = page.getByRole('button', { name: 'Accio!' });
    this.searchForm = page.getByPlaceholder('Type a valid domain...');
  }

  /**
   * Navigates to the home page
   */
  async navigateToHome() {
    await this.page.goto('https://domain-lookup.nikola-nenovski.info/');
  }

  /**
   * Fills in the search form and submits the domain
   * @param {string} domain
   */
  async submitDomain(domain) {
    await this.searchForm.fill(domain);
    await this.submitButton.click();
  }

  /**
   * Toggles the history modal by pressing Escape
   */
  async toggleHistoryModal() {
    await this.page.locator('body').press('Escape');
  }

  /**
   * Injects history array into localStorage
   * @param {Array} data
   */
  async populateHistory(data) {
    await this.page.evaluate(json => {
      return window.localStorage.setItem('history', json);
    }, JSON.stringify(data));

    await this.page.reload();
  }
}
