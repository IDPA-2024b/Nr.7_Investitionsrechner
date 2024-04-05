import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";

interface RevenueSectionProps {
  value: number;
}

export function RevenueSection({ value }: RevenueSectionProps) {
  return (
    <Section>
      <TitleWithTooltip
        title="Revenue"
        tooltip="The total revenue you've made from your investments"
      />
      <ImportantNumber number={value} />
    </Section>
  );
}
