export interface Lookup {
	symbol: string;
	name: string;
}

const BASE_URL = "https://finnhub.io/api/v1";

interface FinnubResponse {
	count: number;
	result: {
		symbol: string;
		description: string;
	}[];
}

async function fetchFinnub(path: string): Promise<Lookup[]> {
	try {
		const response = await fetch(
			`${BASE_URL}/${path}&token=${import.meta.env.VITE_FINNUB_API_KEY}`,
		);
		const data = (await response.json()) as FinnubResponse;
		if (data.count === 0) {
			return [];
		}
		return data.result.map((item) => ({
			symbol: item.symbol,
			name: item.description,
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function lookupStocks(query: string): Promise<Lookup[]> {
	return fetchFinnub(`search?q=${query}`);
}
