import { DnsType } from '../enums/DnsType.enum';

const fetchDnsByType = async (domain: string, type: DnsType) => {
	try {
		const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ${type} records`);
		}

		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error fetching ${type} records for ${domain}:`, error.message);
			return { type, error: error.message };
		} else {
			console.error(`Error fetching ${type} records for ${domain}:`, error);
			return { type, error: 'Unknown error' };
		}
	}
};

export const fetchDnsData = async (request: Request): Promise<Response> => {
	try {
		const { searchParams } = new URL(request.url);
		const domain = searchParams.get('domain');

		if (!domain) {
			throw new Response('Domain query parameter is required', { status: 400 });
		}

		const recordTypes = Object.values(DnsType);

		const results = await Promise.all(recordTypes.map((type: DnsType) => fetchDnsByType(domain, type)));

		const dnsRecords = recordTypes.reduce((acc, type, index) => {
			acc[type] = results[index];
			return acc;
		}, {} as Record<DnsType, unknown>);

		return new Response(JSON.stringify(dnsRecords), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error fetching DNS records', error);
		return new Response('Internal server error. Please try again later.', { status: 500 });
	}
};
