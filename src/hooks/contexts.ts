import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { InvestmentsContext } from "../contexts/investments";

export const useAuth = () => useContext(AuthContext);

export const useInvestments = () => useContext(InvestmentsContext);
