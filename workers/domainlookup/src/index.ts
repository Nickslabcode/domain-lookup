import { fetchDnsData } from './handlers/dnsHandler';
import { fetchSslData } from './handlers/sslHandler';
import { fetchWhoisData } from './handlers/whoisHandler';
import { wpCheck } from './handlers/wpCheckHandler';

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const method = request.method;

		if (method !== 'GET' && method !== 'HEAD') {
			return new Response('Method not allowed.', { status: 405 });
		}

		switch (path) {
			case '/whois':
				return fetchWhoisData(request, env);
			case '/ssl':
				return fetchSslData(request, env);
			case '/dns':
				return fetchDnsData(request);
			case '/wp-check':
				return wpCheck(request);
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
};
