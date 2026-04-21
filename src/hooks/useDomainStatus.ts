import { useQuery } from '@tanstack/react-query';

async function fetchDomainStatus(domain: string): Promise<number> {
	const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}`, {
		headers: { accept: 'application/dns-json' }
	});
	if (!response.ok) {
		throw new Error(`DNS query failed: ${response.status}`);
	}
	const result = await response.json();
	return parseInt(result.Status);
}

export function useDomainStatus(domain: string) {
	return useQuery({
		queryKey: ['domainStatus', domain],
		queryFn: () => fetchDomainStatus(domain)
	});
}