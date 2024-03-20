import {
	AuthErrorCodes,
	type User,
	signInWithPopup,
	signOut,
	getAuth,
	signInAnonymously,
} from "firebase/auth";
import {
	type PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";
import { googleProvider } from "../configs/firebase";
import { FirebaseError } from "firebase/app";
import { useToast } from "@chakra-ui/react";

interface AuthContextData {
	loginWithGoogle: () => Promise<boolean>;
	loginAnnonymously: () => Promise<boolean>;
	logout: () => Promise<void>;
	user: User | null;
}

export const AuthContext = createContext<AuthContextData>({
	loginWithGoogle: async () => false,
	loginAnnonymously: async () => false,
	logout: async () => {},
	user: null,
});

export function AuthProvider({ children }: PropsWithChildren<object>) {
	const auth = getAuth();
	const [user, setUser] = useState<User | null>(null);
	const toast = useToast();

	function toastError(error: unknown) {
		if (!(error instanceof FirebaseError)) {
			toast({
				status: "error",
				title: "Unknown error",
				description: "An unknown error occurred. Please try again later.",
			});
		} else {
			toast({
				status: "error",
				title: "Error",
				description: error.message,
			});
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	});

	async function loginWithGoogle(): Promise<boolean> {
		try {
			await signInWithPopup(auth, googleProvider);
			return true;
		} catch (error: unknown) {
			if (
				error instanceof FirebaseError &&
				error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER
			)
				return false;
			toastError(error);
			return false;
		}
	}

	async function loginAnnonymously(): Promise<boolean> {
		try {
			await signInAnonymously(auth);
			return true;
		} catch (error: unknown) {
			toastError(error);
			return false;
		}
	}

	async function logout(): Promise<void> {
		await signOut(auth);
		// TODO: toast goodbye
	}

	return (
		<AuthContext.Provider
			value={{
				loginWithGoogle,
				loginAnnonymously,
				user,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
