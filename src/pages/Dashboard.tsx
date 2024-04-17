import { useEffect, useState } from "react";
import InvestmentData from "../MockData/InvestmentData.json";
import StockData from "../MockData/StockData.json";
import { MarketValueSection } from "../components/sections/MarketValueSection";
import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import { DateRange } from "../types/chart";
import { ProfitSection } from "../components/sections/ProfitSection";
import { SingleInformationSection } from "../components/sections/SingleInformationSection";
import { TopInvestmentsSection } from "../components/sections/TopInvestmentsSection";
import { DiversitySection } from "../components/sections/DiversitySection";
export function DashboardPage() {
  const [investments, setInvestments] = useState([]);
  const [eachDayInvestment, setEachDayInvestment] = useState([]);

  useEffect(() => {
    const updatedInvestments = InvestmentData.map((investment) => {
      const purchaseDate = new Date(investment.purchase.date);
      let historicalData = [];

      if (typeof investment.historicalData === "string") {
        historicalData = StockData[investment.historicalData].map((data) => {
          const pricePerUnit = (
            data.pricePerUnit * investment.purchase.units
          ).toFixed(2);
          return { date: data.date, pricePerUnit: parseFloat(pricePerUnit) };
        });
      } else {
        historicalData = investment.historicalData.map((data) => {
          return {
            date: data.date,
            pricePerUnit: data.pricePerUnit * investment.purchase.units,
          };
        });
      }

      historicalData = historicalData.filter(
        (data) => new Date(data.date) > purchaseDate
      );
      historicalData.unshift({
        date: investment.purchase.date,
        pricePerUnit:
          investment.purchase.units * investment.purchase.pricePerUnit,
      });

      return { ...investment, historicalData };
    });

    setInvestments(updatedInvestments);
  }, []);

  function processMultipleHistoricalData(dataSets) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = `${today.getFullYear()}-${(
      yesterday.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${yesterday.getDate().toString().padStart(2, "0")}`;

    const processedDataSets = [];

    dataSets.forEach((dataSet, index) => {
      const totalPurchasePrice =  dataSet.purchase.pricePerUnit * dataSet.purchase.units;
      const processedDataSet = {
        ...dataSet,
        historicalData: [],
      };
      dataSet.historicalData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const firstDate = new Date(dataSet.purchase.date);
      const daysTillNow = Math.abs(
        Math.floor((today - firstDate) / (24 * 60 * 60 * 1000))
      );

      let lastKnownPrices =
        dataSet.purchase.pricePerUnit * dataSet.purchase.units;
      for (let day = 0; day < daysTillNow; day++) {
        const currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + day);

        const formattedDate = `${currentDate.getFullYear()}-${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const pricePerUnit = dataSet.historicalData.find((dataPoint) => {
          const dataPointDate = new Date(dataPoint.date);
          const formattedDataPointDate = `${dataPointDate.getFullYear()}-${(
            dataPointDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${dataPointDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          return formattedDataPointDate === formattedDate;
        })?.pricePerUnit;

        const processedDataPoint = {
          date: formattedDate,
          pricePerUnit:
            (pricePerUnit !== undefined ? pricePerUnit : lastKnownPrices) /* - totalPrice */,
        };

        processedDataSet.historicalData.push(processedDataPoint);

        if (pricePerUnit !== undefined) {
          lastKnownPrices = pricePerUnit;
        }
      }
      processedDataSet.historicalData.sort(
        (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) => new Date(a.date) - new Date(b.date)
      ); 
      if (
        processedDataSet.historicalData[
          processedDataSet.historicalData.length - 1
        ].date !== formattedYesterday
      ) {
        processedDataSet.historicalData.push({
          date: formattedYesterday,
          pricePerUnit:
            processedDataSet.historicalData[
              processedDataSet.historicalData.length - 1
            ].pricePerUnit,
        });
      }
      processedDataSets.push(processedDataSet);
    });

    processedDataSets.sort(
      (a, b) =>
        new Date(a.historicalData[0].date) - new Date(b.historicalData[0].date)
    ); 

    return processedDataSets;
  }

  const investmentsWithSoldData = investments.filter(
    (investment) => investment.sale !== undefined
  );
  const onlySoldSpent = investmentsWithSoldData.reduce((total, investment) => {
    const purchasePrice = investment.purchase.pricePerUnit;
    const purchaseAmount = investment.purchase.units;
    return total + purchasePrice * purchaseAmount;
  }, 0);

  const revenue = investmentsWithSoldData.reduce((total, investment) => {
    const salePrice = investment.sale.pricePerUnit;
    const saleAmount = investment.sale.units;
    return total + salePrice * saleAmount;
  }, 0);


  // TODO: Right calculation of roi
  const profit = revenue - onlySoldSpent;
  const roi = profit / onlySoldSpent * 100;
  useEffect(() => {
    setEachDayInvestment(processMultipleHistoricalData(investments));
  }, [investments]);

  return (
    <Container maxWidth={"5xl"}>
      {/* TODO: find best max width*/}
      <VStack align={"start"} gap={8}>
        <Heading size={"lg"}>Dashboard</Heading>
        <MarketValueSection
          defaultDateRange={DateRange.All}
          investments={eachDayInvestment}
        />
        <Flex
          gap={"inherit"}
          width={"100%"}
          direction={{ base: "column", lg: "row" }}
        >
          <Flex
            gap={"inherit"}
            width={"100%"}
            direction={{ base: "column", md: "row", lg: "column" }}
          >
            <ProfitSection value={profit} roi={roi} />
            <SingleInformationSection value={revenue} title={"Revenue"} tooltip="The total revenue you've made from your investments" type="number" />
          </Flex>
          <Flex gap={"inherit"} direction={{ base: "column", lg: "row" }}>
            <TopInvestmentsSection investments={investments.slice(0, 10)} />
            <DiversitySection investments={investments} />
          </Flex>
        </Flex>
      </VStack>
    </Container>
  );
}
