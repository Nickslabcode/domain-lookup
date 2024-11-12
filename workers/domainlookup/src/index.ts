interface Env {
	SSL_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const domain = url.pathname.split('/')[1];

		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (!domain) {
			return new Response('Domain not provided', { status: 400 });
		}

		try {
			const response = await fetch(`https://api.certspotter.com/v1/issuances?domain=${domain}&expand=dns_names&expand=issuer`, {
				headers: {
					apikey: env.SSL_API_KEY,
				},
			});

			if (response.ok) {
				const data = await response.json();

				return new Response(JSON.stringify(data), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } });
			} else {
				return new Response('There was a problem fetching the data', { status: response.status });
			}
		} catch (error) {
			console.error(error);
			return new Response('An error occurred. Please try again later.', { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
