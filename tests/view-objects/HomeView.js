export class HomeView {
  constructor(page, submitButton, searchForm) {
    this.page = page;
    this.searchForm = searchForm;
    this.submitButton = submitButton;
  }

  async navigateToHome() {
    await this.page.goto('https://domain-lookup.nikola-nenovski.info/');
  }

  async submitDomain(domain) {
    await this.searchForm.fill(domain);
    await this.submitButton.click();
  }
}
