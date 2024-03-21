import { InvestmentChart } from "../components/InvestmentChart";
import InvestmentData from "../last_year_data.json";
export function DashboardPage() {
  return (
    <div>
      <p>Dashboard</p>
      <InvestmentChart InvestmentData={InvestmentData}/>
    </div>
  );
}
