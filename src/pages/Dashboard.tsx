import { InvestmentChart } from "../components/InvestmentChart";
import LastInvestmentData from "../MockData/overalData.json"
import InvestmentPercentageData from "../MockData/InvestedPercent.json"
import { InvestmentPercent } from './../components/InvestmentPercent';
export function DashboardPage() {
  return (
    <div> 
      <p>Dashboard</p>
      <InvestmentChart InvestmentData={LastInvestmentData} />
      <InvestmentPercent InvestmentPercentageData={InvestmentPercentageData} />
    </div>
  );
}
