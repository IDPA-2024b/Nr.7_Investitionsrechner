import { DateRange, LineChart } from "../components/charts/Line"
import LastInvestmentData from "../MockData/overalData.json"
import InvestmentPercentageData from "../MockData/InvestedPercent.json"
import { DoughnutChart } from '../components/charts/Doughnut';
import { Select } from "@chakra-ui/react";
import { useState } from "react";
export function DashboardPage() {
  const [dateRange, setDateRange] = useState('last7days');
  return (
    <div>
      <p>Dashboard</p>
      <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
        <option value={DateRange.Last7Days}>Last 7 days</option>
        <option value='lastMonth'>Last Month</option>
        <option value='lastYear'>Last Year</option>
        <option value='all'>All Time</option>
      </Select>
      <LineChart data={LastInvestmentData.map((v) => ({
        date: v.date,
        pricePerUnit: v.value
      }))}
        dateRange={dateRange as DateRange}
      />
      <DoughnutChart investments={InvestmentPercentageData} />
    </div>
  );
}
