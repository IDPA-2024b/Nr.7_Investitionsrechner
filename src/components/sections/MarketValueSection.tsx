import { TitleWithTooltip } from "../TitleWithTooltip";
import { Section } from "./Section";
import { ImportantNumber } from "../ImportantNumber";
import { MarketValueChange } from "../MarketValueChange";
import { LineChart } from "../charts/Line";
import { Flex, Select, chakra, useBreakpointValue } from "@chakra-ui/react";
import { DateRange } from "../../types/chart";
import { useEffect, useRef, useState } from "react";
import type { Investment } from "../../types/investment";

interface MarketValueSectionProps {
  defaultDateRange: DateRange;
  investments: Investment[];
}

export function MarketValueSection({
  defaultDateRange,
  investments,
}: MarketValueSectionProps) {
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [firstValue, setFirstValue] = useState(0);
  const [lastValue, setLastValue] = useState(0);
  const [percentageGain, setPercentageGain] = useState(0);
  const [amountGain, setAmountGain] = useState(0);
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

  function dateRangeToBeforeDate(dateRange: DateRange) {
    const now = new Date();
    switch (dateRange) {
      case DateRange.Last7Days:
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      case DateRange.LastMonth:
        return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() - 1);
      case DateRange.LastYear:
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 1);
      case DateRange.All:
        return new Date(1970, 0, 1);
    }
  }
  function parseDateString(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function calculateAmountSpentInTimeRange(
    investments: Investment[],
    dateRange: DateRange
  ) {
    const now = new Date();
    const date = new Date();
    switch (dateRange) {
      case DateRange.Last7Days:
        date.setDate(now.getDate() - 7);
        break;
      case DateRange.LastMonth:
        date.setMonth(now.getMonth() - 1);
        break;
      case DateRange.LastYear:
        date.setFullYear(date.getFullYear() - 1);
        // date.setMonth(0);
        // date.setDate(1);
        break;
      case DateRange.All:
        date.setFullYear(1970);
        break;
    }
    let totalPaied = 0;
    const filteredInvestments = investments.filter((investment) => {
      const investmentDate = new Date(investment.purchase.date);
      if (investmentDate >= date) {
        totalPaied +=
          investment.purchase.pricePerUnit * investment.purchase.units;
      }
    });
    return totalPaied;
  }
  function calculateAmountSpentBeforeDate(investments: Investment[], oldestDate) {
    let totalPaied = 0;
    const filteredInvestments = investments.filter((investment) => {
      const investmentDate = new Date(investment.purchase.date);
      if (investmentDate <= oldestDate) {
        totalPaied +=
          investment.purchase.pricePerUnit * investment.purchase.units;
      }
    });
    return totalPaied;
  }

  function receiveData(data1: number, data2: number, oldestDate: Date) {
    console.log("-----------------------")
    const today = new Date();
    const lastyear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const dateBefore = dateRangeToBeforeDate(dateRange);
    const oldestDateParsed = parseDateString(oldestDate)

    console.log(oldestDateParsed, dateBefore) // TODO: work here
    let amountSpentBefore = 0;
    if (dateRange === DateRange.All) { // TODO: this needs to be changed but idk to what. need more testing
      amountSpentBefore = data1
      console.log("test")
    } else {
      amountSpentBefore = calculateAmountSpentBeforeDate(investments, dateBefore);
    }

    const totalSpent = calculateAmountSpentBeforeDate(investments, today);
    const profitBefore = data1 - amountSpentBefore;
    const profitNow = data2 - totalSpent;
    const totalProfit = profitNow - profitBefore;
    const startValue = data2 - totalProfit;
    const percentageChangeTMP = calculatePercentageChange(startValue, data2);

    console.log("oldestDate", oldestDate)
    console.log("amountSpentBefore", amountSpentBefore)
    console.log("totalSpent", totalSpent)
    console.log("data1", data1)
    console.log("data2", data2)
    console.log("profitBefore", profitBefore)
    console.log("profitNow", profitNow)
    console.log("totalProfit", totalProfit)
    console.log("startValue", startValue)
    console.log("percentageChangeTMP", percentageChangeTMP)
    console.log("dateBefore", dateRange)

    setPercentageGain(percentageChangeTMP);
    setAmountGain(totalProfit);
    setFirstValue(
      calculateAmountSpentInTimeRange(investments, dateRange as DateRange) ||
      data1
    );
    setLastValue(data2);
  }

  function sumTotalForMonth(dataSets) {
    const totalForMonth = {};


    // Calculate total price for each date
    dataSets.forEach((dataSet) => {
      dataSet.historicalData.forEach((dataPoint) => {
        const date = dataPoint.date;
        const value = dataPoint.pricePerUnit;

        if (!totalForMonth[date]) {
          totalForMonth[date] = 0;
        }

        totalForMonth[date] += value;
      });
    });

    const result = Object.entries(totalForMonth).map(([date, value]) => ({
      date,
      value: parseFloat(value.toFixed(2)), // Round to two decimal places
    }));

    return result;
  }
  function calculatePercentageChange(firstValue: number, lastValue: number) {
    if (firstValue === 0) {
      return 0;
    }

    const difference = lastValue - firstValue;

    // Calculate the percentage change
    const percentageChange = (difference / Math.abs(firstValue)) * 100;

    return percentageChange;
  }

  const processedDataSets = sumTotalForMonth(investments);
  // sort processedDataSets by date
  processedDataSets.sort((a, b) => new Date(a.date) - new Date(b.date));
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
          <ImportantNumber number={lastValue} />
          <MarketValueChange value={amountGain} percentage={percentageGain} />
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
          data={processedDataSets.map((v) => ({
            date: v.date,
            pricePerUnit: v.value,
          }))}
          dateRange={dateRange}
          receiveData={receiveData}
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
