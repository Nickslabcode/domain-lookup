export class HomeView {
  constructor(page) {
    this.page = page;
    this.submitButton = page.getByRole('button', { name: 'Accio!' });
    this.searchForm = page.getByPlaceholder('Type a valid domain...');
  }

  async navigateToHome() {
    await this.page.goto('https://domain-lookup.nikola-nenovski.com/');
  }

  async submitDomain(domain) {
    await this.searchForm.fill(domain);
    await this.submitButton.click();
  }
}
