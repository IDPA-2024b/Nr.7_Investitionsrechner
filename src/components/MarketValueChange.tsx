import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import { type ReactElement, useEffect, useState } from "react";

interface MarketValueChangeProps {
  value: number;
  percentage: number;
}

type MarketTrend = "up" | "down" | "same";

const trendSymbolMap: Record<MarketTrend, string> = {
  up: "+",
  down: "-",
  same: "",
};

const trendIconMap: Record<MarketTrend, () => ReactElement> = {
  up: () => <TriangleUpIcon />,
  down: () => <TriangleDownIcon color="red.500" />,
  same: () => <></>,
};

const trendColorMap: Record<MarketTrend, string> = {
  up: "green.500",
  down: "red.500",
  same: "initial",
};

function prettify(number: number) {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

export function MarketValueChange({
  value,
  percentage,
}: MarketValueChangeProps) {
  const [difference, setDifference] = useState<MarketTrend>("same");

  useEffect(() => {
    if (percentage > 0) {
      setDifference("up");
    } else if (percentage < 0) {
      setDifference("down");
    } else {
      setDifference("same");
    }
  }, [percentage]);

  return (
    <HStack color={trendColorMap[difference]}>
      <Text>{`${trendSymbolMap[difference]} \$${prettify(value)}`}</Text>
      <Text>{`(${prettify(percentage)}%)`}</Text>
      {trendIconMap[difference]()}
    </HStack>
  );
}
