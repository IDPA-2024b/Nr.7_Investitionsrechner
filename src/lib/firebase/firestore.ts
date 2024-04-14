import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { userCollection } from "../../configs/firebase";
import type {
	FirestoreInvestment,
	Investment,
	InvestmentForm,
} from "../../types/investment";

export function onInvestmentsChange(
	userId: string,
	onAddedCallback: (investment: Investment) => void,
	onModifiedCallback: (investment: Investment) => void,
	onDeleteCallback: (investmentId: string) => void,
): () => void {
	const unsubscribe = onSnapshot(
		collection(userCollection, userId, "investments"),
		(snapshot) => {
			for (const changes of snapshot.docChanges()) {
				if (changes.type === "removed") {
					onDeleteCallback(changes.doc.id);
					continue;
				}
				// get the data and id from the document
				const data = changes.doc.data() as FirestoreInvestment;
				const id = changes.doc.id;
				// select the callback based on the type of change
				const callback =
					changes.type === "added" ? onAddedCallback : onModifiedCallback;
				callback({
					...data,
					id,
					historicalData: [],
				});
			}
		},
	);
	return unsubscribe;
}

export async function createInvestment(
	userId: string,
	investment: InvestmentForm,
): Promise<string> {
	try {
		const location = collection(userCollection, userId, "investments");
		const docRef = await addDoc(location, investment);
		return docRef.id;
	} catch (e) {
		throw new Error(`Could not create investment: ${e}`);
	}
}
