import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/contexts";
import type {
  Investment,
  InvestmentForm,
} from "../types/investment";
import {
  createInvestment,
  deleteInvestment,
  onInvestmentsChange,
  updateInvestment,
} from "../lib/firebase/firestore";

// TODO: function for getting the historical data for an investment
// TODO: function to wait for the historical data to be loaded
interface InvestmentsContextData {
  investments: Investment[];
  create: (investment: InvestmentForm) => Promise<void>;
  update(id: string, update: Partial<InvestmentForm>): Promise<void>;
  remove: (investmentId: string) => Promise<void>;
}

export const InvestmentsContext = createContext<InvestmentsContextData>({
  investments: [],
  create: async () => {},
  update: async () => {},
  remove: async () => {},
});

// TODO: ensure that the user is authenticated
export function InvestmentsProvider({ children }: PropsWithChildren<object>) {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = onInvestmentsChange(
      user.uid,
      (investment) => {
        setInvestments((prevInvestments) => [
          ...prevInvestments,
          { ...investment, historicalData: [] },
        ]);
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
  }, [user]);

  async function create(investment: InvestmentForm): Promise<void> {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    await createInvestment(user.uid, investment);
  }

  async function update(
    id: string,
    update: Partial<InvestmentForm>
  ): Promise<void> {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    await updateInvestment(user.uid, id, update);
  }

  async function remove(investmentId: string): Promise<void> {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    await deleteInvestment(user.uid, investmentId);
  }

  return (
    <InvestmentsContext.Provider
      value={{
        investments: investments,
        create: create,
        update: update,
        remove: remove,
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
}
