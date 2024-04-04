import { Tooltip, Flex, Heading } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface TitleWithTooltipProps {
  title: string;
  tooltip: string;
}

// TODO: Change font style when correct font is available
// TODO: Change Tooltip style
export function TitleWithTooltip({ title, tooltip }: TitleWithTooltipProps) {
  return (
    <>
      <Flex align={"center"} gap={2}>
        <Heading fontWeight="bold" fontSize={"x-large"}>
          {title}
        </Heading>
        <Tooltip hasArrow label={tooltip} fontSize="sm">
          <InfoOutlineIcon boxSize={"4"} />
        </Tooltip>
      </Flex>
    </>
  );
}
