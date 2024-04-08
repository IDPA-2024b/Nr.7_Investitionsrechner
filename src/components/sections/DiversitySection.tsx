import { useEffect, useMemo, useRef, useState } from "react";
import type { Investment } from "../../types/investment";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { PieChart } from "../charts/Pie";
import { Section } from "./Section";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { ImportantNumber } from "../ImportantNumber";
import type { InvestmentTypeRecord } from "../../types/chart";

interface DiversitySectionProps {
  investments: Investment[];
}

export function DiversitySection({ investments }: DiversitySectionProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(0);
  // TODO: find best ratio for the chart
  const ratio =
    useBreakpointValue(
      {
        base: 0.5,
        md: 0.3,
        lg: 0.5,
      },
      { ssr: false }
    ) ?? 1;

  useEffect(() => {
    const event = () => {
      if (chartRef.current) {
        setChartHeight(chartRef.current.clientWidth * ratio);
      }
    };
    window.addEventListener("resize", event);
    event();

    return () => window.removeEventListener("resize", event);
  }, [ratio]);

  const data = useMemo(
    () => investmentsToTypeAmount(investments),
    [investments]
  );

  const total = useMemo(
    () => data.reduce((acc, item) => acc + item.value, 0),
    [data]
  );

  return (
    <Section>
      <TitleWithTooltip
        title="Investment Diversity"
        tooltip="The diversity of your investments"
      />
      <Flex width={"100%"} align={"center"} justify={"center"} ref={chartRef}>
        <PieChart height={`${chartHeight}px`} investments={data} />
      </Flex>
      <Flex justify={"center"}>
        <ImportantNumber number={total} />
      </Flex>
    </Section>
  );
}

function investmentsToTypeAmount(
  investments: Investment[]
): InvestmentTypeRecord[] {
  const typeValueMap = investments.reduce(
    (result: Record<string, number>, investment: Investment) => {
      const type = investment.type;
      const value =
        investment.purchase.pricePerUnit * investment.purchase.units;
      result[type] = (result[type] || 0) + value;
      return result;
    },
    {} as Record<string, number>
  );

  return Object.entries(typeValueMap).map(([type, value]) => ({
    type,
    value,
  }));
}
