import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function InvestmentChart({InvestmentData}) {
  const [selectedRange, setSelectedRange] = useState('last7days');
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    setAggregatedData(aggregateData(selectedRange));
  }, [selectedRange]);

  const aggregateData = (range) => {
    let startDate;
    switch (range) {
      case 'last7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        break;
      case 'lastmonth':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1);
        break;
      case 'lastyear':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setMonth(0);
        startDate.setDate(1);
        break;
      case 'all':
        startDate = new Date(0); // Start date of UNIX epoch
        break;
      default:
        break;
    }

    const filteredData = InvestmentData.filter((item) => new Date(item.date) >= startDate);
    const aggregatedData = aggregateDataByDay(filteredData);
    return aggregatedData;
  };

  const aggregateDataByDay = (data) => {
    const aggregatedData = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      const dayMonthYear = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (!aggregatedData[dayMonthYear]) {
        aggregatedData[dayMonthYear] = {
          date: dayMonthYear,
          value: item.value,
          count: 1,
        };
      } else {
        aggregatedData[dayMonthYear].value += item.value;
        aggregatedData[dayMonthYear].count++;
      }
    });
    
    return Object.values(aggregatedData).map((item) => ({
      date: item.date,
      value: item.value / item.count, // Calculate average value for the day
    }));
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = aggregatedData.map((d) => d.date);
  const data = {
    labels: labels,
    datasets: [
      {
          
        fill: true,
        label: 'Dataset 2',
        data: aggregatedData.map((d) => d.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 1,
      },
    ],
  };

  return (
    <div>
      <select value={selectedRange} onChange={handleRangeChange}>
        <option value="last7days">Last 7 Days</option>
        <option value="lastmonth">Last Month</option>
        <option value="lastyear">Last Year</option>
        <option value="all">All</option>
      </select>
      <Line options={options} data={data} />
    </div>
  );
}
