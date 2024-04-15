import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/contexts";
import type {
  FirestoreInvestment,
  Investment,
  InvestmentForm,
} from "../types/investment";
import {
  createInvestment,
  deleteInvestment,
  onInvestmentsChange,
  updateInvestment,
} from "../lib/firebase/firestore";
import {
  addInvestmentDataBackendListener,
  onHistoricalDataChanged,
} from "../lib/firebase/realtime";

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

  function onInvestmentAdded(investment: FirestoreInvestment) {
    // TODO: handle updates smarter because now its bullshit
    const unsubscribe = onHistoricalDataChanged(
      investment.symbol,
      (records) => {
        setInvestments((prevInvestments) =>
          prevInvestments.map((prevInvestment) =>
            prevInvestment.id === investment.id
              ? {
                  ...prevInvestment,
                  historicalData: records,
                }
              : prevInvestment
          )
        );
      }
    );

    setInvestments((prevInvestments) => [
      ...prevInvestments,
      { ...investment, historicalData: [], unsubscribe },
    ]);
  }

  function onInvestmentChanged(investment: FirestoreInvestment) {
    setInvestments((prevInvestments) =>
      prevInvestments.map((prevInvestment) =>
        prevInvestment.id === investment.id
          ? {
              ...prevInvestment,
              ...investment,
            }
          : prevInvestment
      )
    );
  }

  function onInvestmentRemoved(investmentId: string) {
    investments
      .find((investment) => investment.id === investmentId)
      ?.unsubscribe();

    setInvestments((prevInvestments) =>
      prevInvestments.filter(
        (prevInvestment) => prevInvestment.id !== investmentId
      )
    );
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = onInvestmentsChange(
      user.uid,
      onInvestmentAdded,
      onInvestmentChanged,
      onInvestmentRemoved
    );

    return () => {
      unsubscribe();
      for (const investment of investments) {
        investment.unsubscribe();
      }
    };
  }, [user]);

  async function create(investment: InvestmentForm): Promise<void> {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    const promises = [
      createInvestment(user.uid, investment),
      addInvestmentDataBackendListener(investment.symbol),
    ];

    await Promise.all(promises);
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
