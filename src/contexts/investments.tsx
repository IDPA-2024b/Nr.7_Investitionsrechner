import { type PropsWithChildren, createContext } from "react";
import { useAuth } from "../hooks/contexts";
import type { Investment } from "../types/investment";

interface InvestmentsContextData {
  investments: Investment[];
}

export const InvestmentsContext = createContext<InvestmentsContextData>({});

export function InvestmentsProvider({ children }: PropsWithChildren<object>) {
  const { user } = useAuth();
  return (
    <InvestmentsContext.Provider
      value={{
        investments: [],
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
}
