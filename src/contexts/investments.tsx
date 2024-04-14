import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/contexts";
import type { Investment } from "../types/investment";
import { onInvestmentsChange } from "../lib/firebase/firestore";

interface InvestmentsContextData {
  investments: Investment[];
}

export const InvestmentsContext = createContext<InvestmentsContextData>({
  investments: [],
});

export function InvestmentsProvider({ children }: PropsWithChildren<object>) {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onInvestmentsChange(
        user.uid,
        (investment) => {
          setInvestments((prevInvestments) => [...prevInvestments, investment]);
        },
        (investment) => {
          setInvestments((prevInvestments) =>
            prevInvestments.map((prevInvestment) =>
              prevInvestment.id === investment.id
                ? {
                    ...investment,
                    historicalData: prevInvestment.historicalData,
                  }
                : prevInvestment
            )
          );
        },
        (investmentId) => {
          setInvestments((prevInvestments) =>
            prevInvestments.filter(
              (prevInvestment) => prevInvestment.id !== investmentId
            )
          );
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <InvestmentsContext.Provider
      value={{
        investments: investments,
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
}
