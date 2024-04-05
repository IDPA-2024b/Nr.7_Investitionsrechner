import { useEffect, useMemo, useState } from "react";
import type { Investment } from "../../types/investment";
import { Section } from "./Section";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { Flex, HStack, Text, Tooltip, chakra } from "@chakra-ui/react";

interface TopInvestmentsSectionProps {
  investments: Investment[];
}

export function TopInvestmentsSection({
  investments,
}: TopInvestmentsSectionProps) {
  const [topNInvestments, setTopNInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const topInvestments = getTopNInvestments(investments, 5);
    setTopNInvestments(topInvestments);
  }, [investments]);

  return (
    <Section>
      <TitleWithTooltip
        title="Top Investments"
        tooltip="The top investments with the highest purchase price"
      />
      <Flex direction={"column"} height={"100%"} justify={"space-around"}>
        {topNInvestments.map((investment, index) => (
          <InvestmentElement
            index={index}
            investment={investment}
            key={investment.id}
          />
        ))}
      </Flex>
    </Section>
  );
}

function getTopNInvestments(
  investments: Investment[],
  amount: number
): Investment[] {
  return investments
    .sort(
      (a, b) =>
        b.purchase.pricePerUnit * b.purchase.units -
        a.purchase.pricePerUnit * a.purchase.units
    )
    .slice(0, amount);
}

interface InvestmentElementProps {
  investment: Investment;
  index: number;
}

function InvestmentElement({ investment, index }: InvestmentElementProps) {
  const totalAmount = useMemo(() => {
    const total = investment.purchase.pricePerUnit * investment.purchase.units;
    return total.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  }, [investment]);

  return (
    <Flex key={investment.id} justify={"space-between"} align={"baseline"}>
      <HStack spacing={4} width={"50%"}>
        <chakra.span
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          fontWeight={"medium"}
        >
          {index + 1}.
        </chakra.span>
        <Tooltip hasArrow label={investment.name}>
          <chakra.span
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {investment.name}
          </chakra.span>
        </Tooltip>
      </HStack>
      <Flex justify={"flex-end"} width={"50%"}>
        <Tooltip hasArrow label={totalAmount}>
          <Text
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            width={"fit-content"}
            fontWeight={"medium"}
          >
            {totalAmount}
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
