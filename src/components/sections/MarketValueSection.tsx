import { TitleWithTooltip } from "../TitleWithTooltip";
import { Section } from "./Section";
import { ImportantNumber } from "../ImportantNumber";
import { MarketValueChange } from "../MarketValueChange";
import { LineChart } from "../charts/Line";
import { Flex, Select, chakra, useBreakpointValue } from "@chakra-ui/react";
import { DateRange } from "../../types/chart";
import { useEffect, useRef, useState } from "react";

interface MarketValueSectionProps {
  defaultDateRange: DateRange;
}

export function MarketValueSection({
  defaultDateRange,
}: MarketValueSectionProps) {
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(0);
  // TODO: find best ratio for the chart
  const ratio =
    useBreakpointValue(
      {
        base: 1,
        md: 0.5,
        lg: 0.3,
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

  return (
    <Section>
      <Flex
        gap={{ base: "inherit" }}
        direction={{ base: "column", lg: "row" }}
        justify={{ lg: "space-between" }}
      >
        <Flex direction={"column"} gap={{ base: "inherit" }}>
          <TitleWithTooltip
            title="Current Market Value"
            tooltip="The total value of all your investments as of today"
          />
          <ImportantNumber number={123.4} />
          <MarketValueChange value={123.4} percentage={0.5} />
        </Flex>
        <DateRangeSelector
          defaultValue={defaultDateRange}
          onChange={setDateRange}
        />
      </Flex>
      <chakra.div ref={chartRef}>
        <LineChart
          width={"100%"}
          height={`${chartHeight}px`}
          data={[
            {
              date: "2021-01-01",
              pricePerUnit: 100,
            },
            {
              date: "2021-02-01",
              pricePerUnit: 200,
            },
            {
              date: "2021-03-01",
              pricePerUnit: 150,
            },
          ]}
          dateRange={dateRange}
        />
      </chakra.div>
    </Section>
  );
}

const prettyDateRangeMap: Record<DateRange, string> = {
  last7days: "Last 7 days",
  lastmonth: "Last month",
  lastyear: "Last year",
  all: "All",
};

interface DateRangeSelectorProps {
  onChange: (dateRange: DateRange) => void;
  defaultValue: DateRange;
}

function DateRangeSelector({ onChange, defaultValue }: DateRangeSelectorProps) {
  return (
    <Select
      fontWeight={"medium"}
      color={"teal.500"}
      width={{ base: "100%", lg: "auto" }}
      onChange={(e) => onChange(e.target.value as DateRange)}
      defaultValue={defaultValue}
      borderColor={"teal.500"}
      focusBorderColor="teal.500"
      _hover={{
        borderColor: "teal.300",
      }}
      _focus={{
        borderColor: "teal.500",
      }}
    >
      {Object.values(DateRange).map((dateRange) => (
        <chakra.option color={"black"} key={dateRange} value={dateRange}>
          {prettyDateRangeMap[dateRange]}
        </chakra.option>
      ))}
    </Select>
  );
}
