interface Env {
	SSL_API_KEY: string;
}

export const fetchSslData = async (request: Request, env: Partial<Env>): Promise<Response> => {
	const { searchParams } = new URL(request.url);
	const domain = searchParams.get('domain');

	if (!domain) {
		return new Response('Domain query parameter is required', { status: 400 });
	}

	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'Content-Type',
	};

	try {
		const response = await fetch(`https://api.certspotter.com/v1/issuances?domain=${domain}&expand=dns_names&expand=issuer`, {
			headers: {
				apikey: env.SSL_API_KEY!,
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);

			return new Response(JSON.stringify(data), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } });
		} else {
			return new Response('There was a problem fetching the data. Please try again later.', { status: response.status });
		}
	} catch (error) {
		console.error('There was an error fetching the data: ', error);
		return new Response('Internal server error. Please try again later.', { status: 500 });
	}
};
