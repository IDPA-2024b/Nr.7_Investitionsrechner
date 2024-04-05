import { Flex, Tag, Text } from "@chakra-ui/react";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";

interface ProfitSectionProps {
  value: number;
  percentage: number;
}

export function ProfitSection({ value, percentage }: ProfitSectionProps) {
  return (
    <Section>
      <TitleWithTooltip
        title="Profit"
        tooltip="The total profit you've made from your investments"
      />
      <Flex justify={"space-between"} align={"baseline"}>
        <ImportantNumber number={value} />
        <Tag rounded={"full"} colorScheme={percentage > 0 ? "green" : "red"}>
          <Text>
            {percentage.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            %
          </Text>
        </Tag>
      </Flex>
    </Section>
  );
}
