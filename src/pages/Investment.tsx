import { useEffect, useState } from "react";
import InvestmentData from "../MockData/InvestmentData.json";
import StockData from "../MockData/StockData.json";
import { MarketValueSection } from "../components/sections/MarketValueSection";
import { Container, Flex, Heading, VStack, Text, HStack, Box, Popover, Button } from "@chakra-ui/react";
import { DateRange } from "../types/chart";
import { ProfitSection } from "../components/sections/ProfitSection";
import { SingleInformationSection } from "../components/sections/SingleInformationSection";

import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SingleInfoWithSubtextSection } from "../components/sections/SingleInfoWithSubtextSection";
import { KebabIcon } from "../components/KebabIcon";
import { PopOverSell } from "../components/sections/PopOverSell";
export function InvestmentPage() {
  const [pricePerUnit, setPricePerUnit] = useState("100");
  const [units, setUnits] = useState("10");
  const [saleDate, setSaleDate] = useState("01.03.2023");
  const [holdingPeriod, setHoldingPeriod] = useState("10 Weeks");
  const [eachDayInvestment, setEachDayInvestment] = useState([]);
  const [investment, setInvestment] = useState([]);
  const navigate = useNavigate();
  const idArray = useParams();
  const id: String = idArray.id;

  // TODO:  this will be mosty gone after the backend is connected
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
    const singleInvestment = [updatedInvestments.find((item) => item.id === id)];

    setInvestment(singleInvestment);
  }, [id]); // TODO: this is maybe not the best way to do it, but it works for now

  useEffect(() => {
    const purchaseDate = new Date(investment[0]?.purchase.date);
    if (investment[0]?.sale !== undefined) {
      const saleDate = new Date(investment[0]?.sale.date);
      const holdingPeriod = calculateDaysBetweenDates(purchaseDate, saleDate);
      setHoldingPeriod(formatHoldingPeriod(holdingPeriod));
    } else {
      const holdingPeriod = calculateDaysBetweenDates(purchaseDate, new Date());
      setHoldingPeriod(formatHoldingPeriod(holdingPeriod));
    }

    setEachDayInvestment(processMultipleHistoricalData(investment));
  }, [investment]);

  // TODO: Remove this function after backend is connected and context is made
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

  function calculateDaysBetweenDates(date1: Date, date2: Date): number {
  
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const diffInMs = Math.abs(utc2 - utc1);

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
  function profitCalculation() {
    const purchasePrice = investment[0]?.purchase.pricePerUnit;
    const salePrice = investment[0]?.sale.pricePerUnit;
    const units = investment[0]?.purchase.units;
    const profit = (salePrice - purchasePrice) * units;
    const roi = (profit / (purchasePrice * units)) * 100;
    return { profit, roi };
  }


  // bro mach das clean ich han kb uf das

  const totalCost = investment[0]?.purchase.pricePerUnit * investment[0]?.purchase.units;
  const singleUnitCost = Number(investment[0]?.purchase.pricePerUnit); // hehe viel spass mit types 

  const totalUnits = investment[0]?.purchase.units.toLocaleString();
    const investmentName = investment[0]?.name;
  const investmentSymbol = investment[0]?.symbol;
  let profit = 0;
  let roi = 0;
  if (investment[0]?.sale) {
    profit = profitCalculation().profit;
    roi = profitCalculation().roi;
  }
  useEffect(() => {
    setUnits(investment[0]?.purchase.units);
    setPricePerUnit(investment[0]?.purchase.pricePerUnit);
    setSaleDate(investment[0]?.purchase?.date);

  }, [investment]);

  // TODO: this is just a placeholder function for now. I hope you will have fun @Le0nRoch
  const handleSell = () => {
    console.log("Price Per Unit:", pricePerUnit);
    console.log("Units:", units);
    console.log("Sale Date:", saleDate);
    
  };


  return (
    <Container maxWidth={"5xl"}>

      <VStack align={"start"} gap={8}>

        <HStack cursor={"pointer"} onClick={() => navigate("/dashboard")}>

          <ArrowBackIcon boxSize={6} />
          <Text fontWeight={"600"}>Back to Dashboard</Text>
        </HStack>
        <Flex
          justify={"space-between"}
          width={"100%"}
        >

          <Box>
            <Flex gap={5} alignItems="baseline" /*TODO: i am too stoopid to make text below and not at the top */>
              <Heading size={"lg"}>{investmentName}</Heading>
              <Text fontSize={"sm"} color={"grey"}>{investmentSymbol}</Text>
            </Flex>
            <Text fontWeight={"600"}>{totalUnits}  Unit{totalUnits !== "1" ? "s" : ""}</Text>
          </Box>
          <Flex
            alignItems={"center"}
            gap={1}
          >
            {investment[0]?.sale && (
              <>
              <Button colorScheme="teal" isDisabled>Sell</Button>
              </>
            ) || (
                <PopOverSell
                  pricePerUnit={pricePerUnit}
                  units={units}
                  saleDate={saleDate}
                  setPricePerUnit={setPricePerUnit}
                  setUnits={setUnits}
                  setSaleDate={setSaleDate}
                  onSell={handleSell}
                />
              )
            }
            <Box>
              <KebabIcon
                cursor="pointer"
                w={6}
                h={6}
                color=""
                // TODO: add functionality
                onClick={() => alert(`I dont fucking know what to do here leo pls helt`)}
              />
            </Box>

          </Flex>

        </Flex>
        <MarketValueSection
          defaultDateRange={DateRange.All}
          investments={eachDayInvestment}
        />
        <Flex
          gap={"inherit"}
          width={"100%"}
          direction={{ base: "column", lg: "row" }}
        >
          <SingleInfoWithSubtextSection title="Investment" tooltip="idk" value={totalCost} singleUnitCost={singleUnitCost} />

          {investment[0]?.sale && (
            <>
              <ProfitSection value={profit} roi={roi} />
            </>
          )}
          <SingleInformationSection value={holdingPeriod} title="Holding Period" tooltip="This is how long you had that investment for" type="string" />


        </Flex>

      </VStack>
    </Container>
  );
}
