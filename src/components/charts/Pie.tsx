import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { type StyleProps, chakra } from "@chakra-ui/react";
import type { InvestmentTypeRecord } from "../../types/chart";
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  investments: InvestmentTypeRecord[];
  chartHeight?: string;
}

export function PieChart({
  investments,
  chartHeight,
  ...styles
}: PieChartProps & StyleProps) {
  const data = useMemo(
    () => ({
      labels: investments.map((item) => item.type),
      datasets: [
        {
          data: investments.map((item) => item.value),
          backgroundColor: [
            // TODO: replace with theme specific colors
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 10,
        },
      ],
    }),
    [investments]
  );
  const option = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Investment diversity",
        },
      },
    }),
    []
  );

  return (
    <chakra.div {...styles}>
      <Pie data={data} options={option} />
    </chakra.div>
  );
}
