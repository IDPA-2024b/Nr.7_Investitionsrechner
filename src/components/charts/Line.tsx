import { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PriceRecord } from '../../types/investment';
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

// TODO: Add more date ranges
// TODO: Extract date range logic to a separate file
export enum DateRange {
  Last7Days = 'last7days',
  LastMonth = 'lastMonth',
  LastYear = 'lastYear',
  All = 'all',
}

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Investment Value',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
};

interface LineChartProps {
  data: PriceRecord[];
  dateRange?: DateRange;
  maxDataPoints?: number;
}

export function LineChart({ data: rawData, dateRange = DateRange.Last7Days, maxDataPoints = 300 }: LineChartProps) {
  const [aggregatedData, setAggregatedData] = useState<PriceRecord[]>([]);

  useEffect(() => {
    setAggregatedData(aggregateData(rawData, dateRange, maxDataPoints));
  }, [dateRange, rawData, maxDataPoints]);

  const labels: string[] = useMemo(() => aggregatedData.map((d) => d.date), [aggregatedData]);
  const data = useMemo(() => ({
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: aggregatedData.map((d) => d.pricePerUnit),
        borderColor: 'rgb(53, 162, 235)', // TODO: replace with theme specific color
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 1,
      },
    ],
  }), [aggregatedData, labels])


  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

// TODO: Extract date range logic to a separate file
function dateRangeToStartDate(dateRange?: DateRange): Date {
  let startDate: Date;
  switch (dateRange) {
    case DateRange.Last7Days:
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;
    case DateRange.LastMonth:
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(1);
      break;
    case DateRange.LastYear:
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setMonth(0);
      startDate.setDate(1);
      break;
    case DateRange.All:
      startDate = new Date(0);
      break;
    default:
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
  }
  return startDate;
}

function aggregateData(data: PriceRecord[], range: DateRange, maxDataPoints: number): PriceRecord[] {
  const startDate = dateRangeToStartDate(range);

  const filteredData = data.filter((item) => new Date(item.date) >= startDate);
  const aggregatedData = averageValueByDay(filteredData, maxDataPoints);
  return aggregatedData;
}

function averageValueByDay(data: PriceRecord[], maxDataPoints: number): PriceRecord[] {
  const priceRecordsPerDate = data.reduce((acc: Record<string, PriceRecord[]>, item: PriceRecord) => {
    const date = new Date(item.date);
    const dayMonthYear = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (!acc[dayMonthYear]) {
      acc[dayMonthYear] = [item]
    } else {
      acc[dayMonthYear].push(item);
    }

    return acc;
  }, {});

  const averagedValueByDay = Object.entries(priceRecordsPerDate).map(([date, priceRecords]) => {
    const totalValue = priceRecords.reduce((acc, item) => acc + item.pricePerUnit, 0);
    const averageValue = totalValue / priceRecords.length;

    return {
      date,
      pricePerUnit: averageValue,
    };
  });

  // ensure that the number of data points is less than or equal to maxDataPoints
  const nthDataPoint = Math.ceil(averagedValueByDay.length / maxDataPoints);
  return averagedValueByDay.filter((_, index) => index % nthDataPoint === 0);
}