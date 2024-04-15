export interface Investment {
	id: string;
	name: string;
	symbol: string;
	type: string;
	purchase: Transaction;
	sale?: Transaction;
	historicalData: PriceRecord[];
	unsubscribe: () => void; // used to unsubscribe from the listener
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

// used in the form to create a new investment or update an existing one
export interface InvestmentForm
	extends Omit<Investment, "id" | "historicalData" | "unsubscribe"> {}

export interface FirestoreInvestment
	extends Omit<Investment, "historicalData" | "unsubscribe"> {}
