export interface Investment {
	id: string;
	name: string;
	symbol: string;
	type: string;
	purchase: Transaction;
	sale?: Transaction;
	historicalData: PriceRecord[];
}

export interface Transaction {
	pricePerUnit: number;
	date: string;
	units: number;
}

export interface PriceRecord {
	date: string;
	pricePerUnit: number;
}

export interface InvestmentForm {
	name: string;
	symbol: string;
	type: string;
	purchase: Transaction;
}

export interface FirestoreInvestment {
	name: string;
	symbol: string;
	type: string;
	purchase: Transaction;
	sale?: Transaction;
}
