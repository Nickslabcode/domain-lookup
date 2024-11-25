export const wpCheck = async (request: Request): Promise<Response> => {
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
		const response = await fetch(`https://${domain}/readme.html`, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.9',
				Referer: `https://${domain}/`,
				Connection: 'keep-alive',
			},
		});

		if (response.ok) {
			const data = await response.text();
			const answer = data.includes('wordpress');

			return new Response(JSON.stringify({ isInstalled: answer }), {
				status: 200,
				headers: { ...headers, 'Content-Type': 'application/json' },
			});
		} else {
			return new Response('There was a problem fetching the data. Please try again later.', { status: response.status });
		}
	} catch (error) {
		console.error('There was an error fetching the data: ', error);
		return new Response('Internal server error. Please try again later.', { status: 500 });
	}
};
