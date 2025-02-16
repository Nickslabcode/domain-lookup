export class ApiUtils {
  constructor(page) {
    this.page = page;
  }

  async swapApiRequestUrl(urlToSwap, newUrl) {
    await this.page.route(urlToSwap, async (route, request) => {
      const requestUrl = request.url();
      const apiEndpoint = requestUrl.substring(requestUrl.lastIndexOf('/'));

      await route.continue({
        url: newUrl + apiEndpoint,
      });
    });
  }

  async unroute(url) {
    await this.page.unroute(url);
  }
}
