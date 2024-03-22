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
  loginWithGoogle: () => Promise<User | undefined>;
  loginAnnonymously: () => Promise<User | undefined>;
  logout: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthContextData>({
  loginWithGoogle: async () => undefined,
  loginAnnonymously: async () => undefined,
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

  async function loginWithGoogle(): Promise<User | undefined> {
    try {
      return (await signInWithPopup(auth, googleProvider)).user;
    } catch (error: unknown) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER
      )
        return;
      toastError(error);
    }
  }

  async function loginAnnonymously(): Promise<User | undefined> {
    try {
      return (await signInAnonymously(auth)).user;
    } catch (error: unknown) {
      toastError(error);
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth);
      toast({
        status: "info",
        title: "Goodbye",
        description: "You have been logged out.",
      });
    } catch (error: unknown) {
      toastError(error);
    }
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
