import { useState, useEffect, useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { PriceRecord } from "../../types/investment";
import { type StyleProps, chakra } from "@chakra-ui/react";
import { DateRange } from "../../types/chart";
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

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Investment Value",
    },
  },
  
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "nearest",
    intersect: true,
  },
};

interface LineChartProps {
  data: PriceRecord[];
  dateRange?: DateRange;
  maxDataPoints?: number;
  receiveData?: (data1: number, data2: number) => void;
}

export function LineChart({
  data: rawData,
  dateRange = DateRange.Last7Days,
  maxDataPoints = 300,
  receiveData,
  ...styles
}: LineChartProps & StyleProps) {
  const chartRef = useRef(null);
  const [aggregatedData, setAggregatedData] = useState<PriceRecord[]>([]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current as ChartJS<"line">;
    chart.resize();
  }, [styles]);

  useEffect(() => {
    setAggregatedData(aggregateData(rawData, dateRange, maxDataPoints));
  }, [dateRange, rawData, maxDataPoints]);

  // TODO: sometimes the receiveData function is not called
  useEffect(() => {
    if (receiveData) {
      receiveData(
        Number.parseFloat(aggregatedData[0]?.pricePerUnit.toFixed(2)) || 0,
        Number.parseFloat(
          aggregatedData[aggregatedData.length - 1]?.pricePerUnit.toFixed(2)
        ) || 0,
        aggregatedData[0]?.date || "",
      );
    }
  }, [aggregatedData]);
  const labels: string[] = useMemo(
    () => aggregatedData.map((d) => d.date),
    [aggregatedData]
  );
  const data = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          fill: true,
          tension: 0.4,
          label: "Value",
          data: aggregatedData.map((d) =>
            Number.parseFloat(d.pricePerUnit.toFixed(2))
          ),
          borderColor: "rgb(123, 162, 235)", // TODO: replace with theme specific color
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          pointRadius: 1,
        },
      ],
    }),
    [aggregatedData, labels]
  );

  return (
    <chakra.div {...styles}>
      <Line ref={chartRef} options={options} data={data} />
    </chakra.div>
  );
}

// TODO: Extract date range logic to a separate file
function dateRangeToStartDate(dateRange?: DateRange): Date {
  let startDate: Date;
  switch (dateRange) {
    case DateRange.Last7Days:
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 1, 0, 0); 
      break;
    case DateRange.LastMonth:
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 1, 0, 0); 
      break;
    case DateRange.LastYear:
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 1, 0, 0); 
      break;
    case DateRange.All:
      startDate = new Date(0);
      startDate.setHours(0, 1, 0, 0); 
      break;
    default:
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 1, 0, 0); 
  }
  return startDate;
}

function aggregateData(
  data: PriceRecord[],
  range: DateRange,
  maxDataPoints: number
): PriceRecord[] {
  const startDate = dateRangeToStartDate(range);
  const filteredData = data.filter((item) => new Date(item.date) >= startDate);
  const aggregatedData = averageValueByDay(filteredData, maxDataPoints);


  return aggregatedData;
}

function averageValueByDay(
  data: PriceRecord[],
  maxDataPoints: number
): PriceRecord[] {
  const priceRecordsPerDate = data.reduce(
    (acc: Record<string, PriceRecord[]>, item: PriceRecord) => {
      const date = new Date(item.date);
      const dayMonthYear = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (!acc[dayMonthYear]) {
        acc[dayMonthYear] = [item];
      } else {
        acc[dayMonthYear].push(item);
      }

      return acc;
    },
    {}
  );

  const averagedValueByDay = Object.entries(priceRecordsPerDate).map(
    ([date, priceRecords]) => {
      const totalValue = priceRecords.reduce(
        (acc, item) => acc + item.pricePerUnit,
        0
      );
      const averageValue = totalValue / priceRecords.length;
      return {
        date,
        pricePerUnit: averageValue,
      };
    }
  );

  // ensure that the number of data points is less than or equal to maxDataPoints
  const nthDataPoint = Math.ceil(averagedValueByDay.length / maxDataPoints);
  return averagedValueByDay.filter((_, index) => index % nthDataPoint === 0);
}

// TODO: @DaniDevOfficial what is the purpose of this function?
function getCurrentValue(data: PriceRecord[]): number {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentRecord = data.find((item) => item.date === currentDate);
  return currentRecord ? currentRecord.pricePerUnit : 33;
}
