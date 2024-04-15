import { TitleWithTooltip } from "../TitleWithTooltip";
import { ImportantNumber } from "../ImportantNumber";
import { Section } from "./Section";
import { ImportantString } from "../ImportantString";

interface SingleInformationSectionProps {
  value: any;
  title: string,
  tooltip: string,
  type: string
}

export function SingleInformationSection({ value, title, tooltip, type }: SingleInformationSectionProps) {

  return (
    <Section>
      <TitleWithTooltip
        title={title}
        tooltip={tooltip}
      />

      {type === 'number' ? (
        <ImportantNumber number={value} />
      ) : (
        <ImportantString text={value} />
      )}
    </Section>
  );
}
