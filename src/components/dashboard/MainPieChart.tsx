import { PieChart } from "../charts/Pie";
import { TitleWithTooltip } from "../TitleWithTooltip";
import { Box, Flex } from "@chakra-ui/react";

interface MainDoughnutChartProps {
  TypeDiversity: {
    type: string;
    amount: number;
  }[];
}
export function MainPieChart({ TypeDiversity }: MainDoughnutChartProps) {
  const investments = TypeDiversity.map((item) => ({
    type: item.type,
    amount: item.amount,
  }));
  return (
    <>
      <TitleWithTooltip title={"Investment diversity"} tooltip="Wasd" />
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PieChart investments={investments} />
      </Flex>
    </>
  );
}
