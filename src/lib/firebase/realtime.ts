import {
	onValue,
	child,
	ref,
	get,
	query,
	limitToLast,
	set,
} from "firebase/database";
import { realtimeDB } from "../../configs/firebase";
import type { PriceRecord } from "../../types/investment";

const dataRef = ref(realtimeDB, "data");
const investmentsRef = ref(realtimeDB, "investments");

export function onHistoricalDataChanged(
	ticker: string,
	callback: (data: PriceRecord[]) => void,
): () => void {
	const unsubscribe = onValue(child(dataRef, ticker), (snapshot) => {
		if (!snapshot.exists()) {
			return;
		}
		const raw = snapshot.val() as Record<string, number>;

		const data: PriceRecord[] = Object.entries(raw).map(
			([date, pricePerUnit]) => ({
				date,
				pricePerUnit,
			}),
		);
		callback(data);
	});

	return unsubscribe;
}

async function getNextInvestmentId(): Promise<string> {
	try {
		const snapshot = await get(query(investmentsRef, limitToLast(1)));
		if (!snapshot.exists()) {
			return "0";
		}

		const current = Object.keys(snapshot.val())[0];

		return (Number.parseInt(current) + 1).toString();
	} catch (e) {
		throw new Error(`Could not get the next investment id: ${e}`);
	}
}

export async function addInvestmentDataBackendListener(ticker: string) {
	try {
		const id = await getNextInvestmentId();
		await set(child(investmentsRef, id.toString()), ticker);
	} catch (e) {
		throw new Error(`Could not add investment: ${e}`);
	}
}
