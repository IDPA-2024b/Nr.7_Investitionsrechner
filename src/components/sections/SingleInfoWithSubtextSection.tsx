import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";
import { ImportantString } from "../ImportantString";
import { SmollPricePerUnit } from "../SmollString";

interface SingleInfoWithSubtextSectionProps {
  value: number;
  title: string,
  tooltip: string,
  singleUnitCost: number,
}

export function SingleInfoWithSubtextSection({ value, title, singleUnitCost, tooltip }: SingleInfoWithSubtextSectionProps) {

  return (
    <Section>
      <TitleWithTooltip
        title={title}
        tooltip={tooltip}
      />
  
        <ImportantNumber number={value} />
        <SmollPricePerUnit number={singleUnitCost} />
        
    </Section>
  );
}
