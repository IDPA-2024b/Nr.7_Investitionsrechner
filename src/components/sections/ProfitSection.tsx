import { Flex, Tag, Text } from "@chakra-ui/react";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";
import { useEffect, useState } from "react";

interface ProfitSectionProps {
  value: number;
  roi: number;
}

export function ProfitSection({ value, roi }: ProfitSectionProps) {
  const [color, setColor] = useState("gray");

  function getROIColor(roi: number) {
    if (roi > 0) {
      return "green";
    }
    if (roi < 0) {
      return "red";
    }

    return "gray";
  }
  useEffect(() => {
    setColor(getROIColor(roi));
  }, [roi]);

  return (
    <Section>
      <TitleWithTooltip
        title="Profit"
        tooltip="The total profit you've made from your investments"
      />
      <Flex justify={"space-between"} align={"baseline"}>
        <ImportantNumber number={value} />
        <Tag rounded={"full"} colorScheme={color}>
          <Text>
            {roi.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            %
          </Text>
        </Tag>
      </Flex>
    </Section>
  );
}
