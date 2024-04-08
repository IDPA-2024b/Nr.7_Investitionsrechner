import { Flex, Tag, Text } from "@chakra-ui/react";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";

interface ProfitSectionProps {
  value: number;
  roi: number;
}

export function ProfitSection({ value, roi }: ProfitSectionProps) {
  return (
    <Section>
      <TitleWithTooltip
        title="Profit"
        tooltip="The total profit you've made from your investments"
      />
      <Flex justify={"space-between"} align={"baseline"}>
        <ImportantNumber number={value} />
        <Tag rounded={"full"} colorScheme={roi > 0 ? "green" : "red"}>
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
