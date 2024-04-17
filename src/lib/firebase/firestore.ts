import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { userCollection } from "../../configs/firebase";
import type {
	FirestoreInvestment,
	Investment,
	InvestmentForm,
} from "../../types/investment";

interface FirebaseInvestmentDoc
	extends Omit<Investment, "id" | "sale" | "historicalData"> {}

export function onInvestmentsChange(
	userId: string,
	onAddedCallback: (investment: FirestoreInvestment) => void,
	onModifiedCallback: (investment: FirestoreInvestment) => void,
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
				const data = changes.doc.data() as FirebaseInvestmentDoc;
				const id = changes.doc.id;
				// select the callback based on the type of change
				const callback =
					changes.type === "added" ? onAddedCallback : onModifiedCallback;
				callback({
					...data,
					id,
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

export async function updateInvestment(
	userId: string,
	investmentId: string,
	investment: Partial<InvestmentForm>,
): Promise<void> {
	try {
		await updateDoc(
			doc(userCollection, userId, "investments", investmentId),
			investment,
		);
	} catch (e) {
		throw new Error(`Could not update investment: ${e}`);
	}
}

export async function deleteInvestment(
	userId: string,
	investmentId: string,
): Promise<void> {
	try {
		await deleteDoc(doc(userCollection, userId, "investments", investmentId));
	} catch (e) {
		throw new Error(`Could not delete investment: ${e}`);
	}
}
