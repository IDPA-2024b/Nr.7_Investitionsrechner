import { InvestmentChart } from "../components/InvestmentChart";
import LastInvestmentData from "../MockData/overalData.json"
export function DashboardPage() {
  return (
    <div>
      <p>Dashboard</p>
      <InvestmentChart InvestmentData={LastInvestmentData}/>
    </div>
  );
}
