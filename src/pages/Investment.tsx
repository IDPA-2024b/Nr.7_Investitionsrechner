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
import { set } from "firebase/database";
import { useLocation, useParams } from "react-router-dom";
import { SingleInfoWithSubtextSection } from "../components/sections/SingleInfoWithSubtextSection";
export function InvestmentPage() {
  const [investments, setInvestments] = useState([]);
  const [holdingPeriod, setHoldingPeriod] = useState("10 Weeks");
  const [eachDayInvestment, setEachDayInvestment] = useState([]);
  const [investment, setInvestment] = useState([]);
  const idArray = useParams();
  const id: String = idArray.id;
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

      // Filter out historical data entries before the purchase date
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
    const singleInvestment = [updatedInvestments.find((item) => item.id === id)];
    console.log(singleInvestment);

    setInvestment(singleInvestment);
  }, []);
  useEffect(() => {
    const purchaseDate = new Date(investment[0]?.purchase.date);
    console.log("purchaseDate", purchaseDate);
    if (investment[0]?.sale !== undefined) {
      const saleDate = new Date(investment[0]?.sale.date);
      const holdingPeriod = calculateDaysBetweenDates(purchaseDate, saleDate);
      setHoldingPeriod(formatHoldingPeriod(holdingPeriod));
    } else {
      const holdingPeriod = calculateDaysBetweenDates(purchaseDate, new Date());
      console.log(holdingPeriod);
      console.log(formatHoldingPeriod(holdingPeriod));
    }

    setEachDayInvestment(processMultipleHistoricalData(investment));
  }, [investment]);

  // adding each day betwenn an start date and today for each investment with date and price
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
            pricePerUnit !== undefined ? pricePerUnit : lastKnownPrices,
        };

        processedDataSet.historicalData.push(processedDataPoint);

        // Update the last known price for the current date
        if (pricePerUnit !== undefined) {
          lastKnownPrices = pricePerUnit;
        }
      }
      processedDataSet.historicalData.sort(
        (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) => new Date(a.date) - new Date(b.date)
      ); // Sort by date
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
    ); // Sort processedDataSets by the earliest date in historicalData

    return processedDataSets;
  }

  function calculateDaysBetweenDates(date1: Date, date2: Date): number {
    // Convert both dates to UTC
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(utc2 - utc1);

    // Convert the difference from milliseconds to days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  function formatHoldingPeriod(days: number): string {
    if (days === 1) {
      return `${days} day`;
    } else if (days < 7) {
      return `${days} days`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    } else if (days < 365 * 3) {
      const months = Math.floor(days / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(days / 365);
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
  }
  const totalCost = investment[0]?.purchase.pricePerUnit * investment[0]?.purchase.units;
  const singleUnitCost = Number(investment[0]?.purchase.pricePerUnit); // hehe viel spass mit types 
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
          {/* Information about the investment */}
          <SingleInformationSection value={holdingPeriod} title="Holding Period" tooltip="This is how long you had that investment for" type="string" />

          {/* Display only when investment has a sale data */}
          {investment[0]?.sale && (
            <>
              <ProfitSection value={12312} roi={-0.5} />
              <SingleInfoWithSubtextSection title="Investment" tooltip="idk" value={totalCost} singleUnitCost={singleUnitCost} />
            </>
          )}

          <Flex gap={"inherit"} direction={{ base: "column", lg: "row" }}>
          </Flex>
        </Flex>

      </VStack>
    </Container>
  );
}
