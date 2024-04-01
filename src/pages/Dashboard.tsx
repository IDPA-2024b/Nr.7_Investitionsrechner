
import { useEffect, useState } from "react";
import { MainScreen } from "../components/dashboard/MainScreen";
import InvestmentData from "../MockData/InvestmentData.json";
import StockData from "../MockData/StockData.json";
export function DashboardPage() {
  const [investments, setInvestments] = useState([]);
  const [eachDayInvestment, setEachDayInvestment] = useState([]);
  const investmentDiversity = [];

  for (const investment of InvestmentData) {
    const type = investment.type;
    const amount = investment.purchase.amount;
    const cost = investment.purchase.price;
    const total = amount * cost;

    const index = investmentDiversity.findIndex(item => item.type === type);
    if (index !== -1) {
      investmentDiversity[index].amount += total;
    } else {
      investmentDiversity.push({ type: type, amount: total });
    }
  }

  function processMultipleHistoricalData(dataSets) {
    const today = new Date();
    const processedDataSets = [];

    dataSets.forEach((dataSet, index) => {
      const processedDataSet = {
        ...dataSet,
        historicalData: []

      };
      dataSet.historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
      const firstDate = new Date(dataSet.purchase.date);
      const daysTillNow = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000)); // Calculate the number of days between the first date and today
      let lastKnownPrices = dataSet.purchase.price * dataSet.purchase.amount;
      for (let day = 0; day < daysTillNow; day++) {
        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + day);

        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const value = dataSet.historicalData.find(dataPoint => dataPoint.date === formattedDate)?.value;

        const processedDataPoint = {
          date: formattedDate,
          value: value !== undefined ? value : lastKnownPrices
        };

        processedDataSet.historicalData.push(processedDataPoint);

        // Update the last known price for the current date
        if (value !== undefined) {
          lastKnownPrices = value;
        }
      }
      processedDataSet.historicalData.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
      processedDataSets.push(processedDataSet);
    });

    processedDataSets.sort((a, b) => new Date(a.historicalData[0].date) - new Date(b.historicalData[0].date)); // Sort processedDataSets by the earliest date in historicalData



    return processedDataSets;
  }



  useEffect(() => {
    const updatedInvestments = InvestmentData.map(investment => {
      const purchaseDate = new Date(investment.purchase.date);
      let historicalData = [];

      if (typeof investment.historicalData === 'string') {
        historicalData = StockData[investment.historicalData].map(data => {
          const value = (data.value * investment.purchase.amount).toFixed(2);
          return { date: data.date, value: parseFloat(value) };
        });
      } else {
        historicalData = investment.historicalData.map(data => {
          return { date: data.date, value: data.value * investment.purchase.amount };
        });
      }

      // Filter out historical data entries before the purchase date
      historicalData = historicalData.filter(data => new Date(data.date) > purchaseDate);

      // Add the purchase date as the first entry in the historical data array
      historicalData.unshift({ date: investment.purchase.date, value: investment.purchase.amount * investment.purchase.price });

      return { ...investment, historicalData };
    });

    setInvestments(updatedInvestments);
  }, []);


  useEffect(() => {
    setEachDayInvestment(processMultipleHistoricalData(investments));
  }, [investments]);
  console.log(eachDayInvestment);
  return (
    <div>

      <MainScreen investmentDiversity={investmentDiversity} investments={eachDayInvestment} />

    </div>
  );
}
