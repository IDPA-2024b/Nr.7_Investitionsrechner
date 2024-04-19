import { useEffect, useState } from "react";
import { MarketValueSection } from "../components/sections/MarketValueSection";
import {
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { DateRange } from "../types/chart";
import { ProfitSection } from "../components/sections/ProfitSection";
import { SingleInformationSection } from "../components/sections/SingleInformationSection";

import { useNavigate, useParams } from "react-router-dom";
import { SingleInfoWithSubtextSection } from "../components/sections/SingleInfoWithSubtextSection";
import { PopOverSell } from "../components/single/PopOverSell";
import { useInvestments } from "../hooks/contexts";
import { BackToDashboard } from "../components/BackToDashboard";
import type { Investment } from "../types/investment";
import { format } from "date-fns";
import { OptionsMenu } from "../components/single/OptionsMenu";

export function InvestmentPage() {
  const [pricePerUnit, setPricePerUnit] = useState("100");
  const [units, setUnits] = useState("10");
  const [saleDate, setSaleDate] = useState(new Date());
  const [holdingPeriod, setHoldingPeriod] = useState<number>(0);
  const [investment, setInvestment] = useState<Investment | null>(null);
  const { investments, update, remove } = useInvestments();
  const navigate = useNavigate();
  const params = useParams();
  const {
    isOpen: OptionsOpen,
    onClose: closeOptions,
    onOpen: openOptions,
  } = useDisclosure();

  useEffect(() => {
    const id = params.id;
    const investment = investments.find((item) => item.id === id);
    if (!investment) {
      navigate("/dashboard");
      return;
    }
    setInvestment(investment);
  }, [params, investments, navigate]);

  // update holding period
  useEffect(() => {
    if (!investment) return;
    const purchaseDate = new Date(investment.purchase.date);
    const saleDate = investment.sale
      ? new Date(investment.sale.date)
      : new Date();

    const holdingPeriod = calculateDaysBetweenDates(purchaseDate, saleDate);
    setHoldingPeriod(holdingPeriod);
  }, [investment]);

  // update state in sell popover
  useEffect(() => {
    if (!investment) return;
    setUnits(investment.purchase.units.toString());
    setPricePerUnit(investment.purchase.pricePerUnit.toString());
  }, [investment]);

  function calculateDaysBetweenDates(a: Date, b: Date): number {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    const diffInMs = Math.abs(utc2 - utc1);

    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  function formatHoldingPeriod(days: number): string {
    if (days === 1) {
      return `${days} day`;
    }
    if (days < 7) {
      return `${days} days`;
    }
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks !== 1 ? "s" : ""}`;
    }
    if (days < 365 * 3) {
      const months = Math.floor(days / 30);
      return `${months} month${months !== 1 ? "s" : ""}`;
    }
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  function calculateProfit() {
    if (!investment?.sale) return 0;
    const purchasePrice = investment.purchase.pricePerUnit;
    const salePrice = investment.sale.pricePerUnit;
    const units = investment.purchase.units;
    return (salePrice - purchasePrice) * units;
  }

  function calculateROI() {
    if (!investment?.sale) return 0;
    const profit = calculateProfit();
    const purchasePrice = investment.purchase.pricePerUnit;
    const units = investment.purchase.units;
    return (profit / (purchasePrice * units)) * 100;
  }

  function calculateTotalInvestment() {
    if (!investment) return 0;
    return investment.purchase.pricePerUnit * investment.purchase.units;
  }

  async function handleSell() {
    if (!investment) return;
    await update(investment.id, {
      sale: {
        pricePerUnit: Number.parseFloat(pricePerUnit),
        units: Number.parseFloat(units),
        date: format(saleDate, "MM-dd-yyyy"),
      },
    });
  }

  function displayTotalUnits() {
    if (!investment) return "0";
    const { units } = investment.purchase;
    return `${units} Unit${units !== 1 ? "s" : ""}`;
  }

  return (
    <Container maxWidth={"5xl"}>
      <VStack align={"start"} gap={8} width={"100%"}>
        <BackToDashboard />
        <Flex
          justify={"space-between"}
          width={"100%"}
          gap="20"
          align={"baseline"}
        >
          <VStack align={"left"} overflow={"hidden"} spacing={"0"}>
            <HStack align={"baseline"} gap={2}>
              <Heading
                maxWidth={"100%"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                size={"lg"}
              >
                {investment?.name ?? "Investment"}
              </Heading>
              <Text fontSize={"md"} color={"grey"}>
                {investment?.symbol}
              </Text>
            </HStack>
            <Text fontWeight={"600"}>{displayTotalUnits()}</Text>
          </VStack>
          {/* Actions */}
          <HStack>
            {(investment?.sale && (
              <>
                <Button colorScheme="teal" isDisabled>
                  Sell
                </Button>
              </>
            )) || (
              <PopOverSell
                pricePerUnit={pricePerUnit}
                units={units}
                saleDate={saleDate}
                setPricePerUnit={setPricePerUnit}
                setUnits={setUnits}
                setSaleDate={setSaleDate}
                onSell={handleSell}
              />
            )}
            <OptionsMenu
              onOpen={openOptions}
              isOpen={OptionsOpen}
              onClose={closeOptions}
              onDelete={() => remove(investment?.id ?? "")}
              onUpdate={() => {}}
            />
          </HStack>
        </Flex>
        <MarketValueSection
          defaultDateRange={DateRange.All}
          investments={investment ? [investment] : []}
        />
        <Flex
          gap={"inherit"}
          width={"100%"}
          direction={{ base: "column", lg: "row" }}
        >
          {/* Investment Section */}
          <SingleInfoWithSubtextSection
            title="Investment"
            tooltip="idk"
            value={calculateTotalInvestment()}
            singleUnitCost={investment?.purchase.pricePerUnit ?? 0}
          />

          {/* Profit Section */}
          <ProfitSection value={calculateProfit()} roi={calculateROI()} />
          {/* Holding Period Section */}
          <SingleInformationSection
            value={formatHoldingPeriod(holdingPeriod)}
            title="Holding Period"
            tooltip="This is how long you had that investment for"
            type="string"
          />
        </Flex>
      </VStack>
    </Container>
  );
}
