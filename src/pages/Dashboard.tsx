
import { useEffect, useState } from "react";
import { MainScreen } from "../components/dashboard/MainScreen";
import InvestmentData from "../MockData/InvestmentData.json";
import StockData from "../MockData/StockData.json";
export function DashboardPage() {
  const [investments, setInvestments] = useState([]);
  const [eachDayInvestment, setEachDayInvestment] = useState([]);



  function processMultipleHistoricalData(dataSets) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = `${today.getFullYear()}-${(yesterday.getMonth() + 1).toString().padStart(2, '0')}-${yesterday.getDate().toString().padStart(2, '0')}`;

    const processedDataSets = [];

    dataSets.forEach((dataSet, index) => {
      const processedDataSet = {
        ...dataSet,
        historicalData: []

      };
      dataSet.historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
      const firstDate = new Date(dataSet.purchase.date);
      const daysTillNow = Math.abs(Math.floor((today - firstDate) / (24 * 60 * 60 * 1000)));

      let lastKnownPrices = dataSet.purchase.price * dataSet.purchase.units;
      for (let day = 0; day < daysTillNow; day++) {
        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + day);

        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        
        const value = dataSet.historicalData.find(dataPoint => {
          const dataPointDate = new Date(dataPoint.date);
          const formattedDataPointDate = `${dataPointDate.getFullYear()}-${(dataPointDate.getMonth() + 1).toString().padStart(2, '0')}-${dataPointDate.getDate().toString().padStart(2, '0')}`;
          return formattedDataPointDate === formattedDate;
        })?.value;

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
      if(processedDataSet.historicalData[processedDataSet.historicalData.length - 1].date !== formattedYesterday){
        processedDataSet.historicalData.push({date: formattedYesterday, value: processedDataSet.historicalData[processedDataSet.historicalData.length - 1].value});        
      }
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
          const value = (data.value * investment.purchase.units).toFixed(2);
          return { date: data.date, value: parseFloat(value) };
        });
      } else {
        historicalData = investment.historicalData.map(data => {
          return { date: data.date, value: data.value * investment.purchase.units };
        });
      }

      // Filter out historical data entries before the purchase date
      historicalData = historicalData.filter(data => new Date(data.date) > purchaseDate);
      historicalData.unshift({ date: investment.purchase.date, value: investment.purchase.units * investment.purchase.price });  
      
      return { ...investment, historicalData };
    });

    setInvestments(updatedInvestments);
  }, []);


  useEffect(() => {
    setEachDayInvestment(processMultipleHistoricalData(investments));
  }, [investments]);

  return (
    <div>

      <MainScreen investments={eachDayInvestment} />

    </div>
  );
}
