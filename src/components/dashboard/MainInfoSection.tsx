import { Box, Flex, Text } from "@chakra-ui/react";
import { MainPieChart } from "./MainPieChart";
import { TitleWithTooltip } from "../TitleWithTooltip";
import type { Investment } from "../../types/investment";

interface MainInfoSectionProps {
  investments: Investment[];
}

export function MainInfoSection({ investments }: MainInfoSectionProps) {
  const lastValue = 3;
  const investmentDiversity = [];

  for (const investment of investments) {
    const type = investment.type;
    const amount = investment.purchase.units;
    const cost = investment.purchase.pricePerUnit;
    const total = amount * cost;

    const index = investmentDiversity.findIndex((item) => item.type === type);
    if (index !== -1) {
      investmentDiversity[index].amount += total;
    } else {
      investmentDiversity.push({ type: type, amount: total });
    }
  }

  const investmentsWithSoldData = investments.filter(
    (investment) => investment.sale !== undefined
  );
  const onlySoldSpent = investmentsWithSoldData.reduce((total, investment) => {
    const purchasePrice = investment.purchase.pricePerUnit;
    const purchaseAmount = investment.purchase.units;
    return total + purchasePrice * purchaseAmount;
  }, 0);

  const totalGain = investmentsWithSoldData.reduce((total, investment) => {
    const salePrice = investment.sale.pricePerUnit;
    const saleAmount = investment.sale.units;
    return total + salePrice * saleAmount;
  }, 0);

  const top5investmentWithHighestPurchasePrice = investments
    .sort(
      (a, b) =>
        b.purchase.pricePerUnit * b.purchase.units -
        a.purchase.pricePerUnit * a.purchase.units
    )
    .slice(0, 5);
  const top5InvestmentsWithHighestPurchasePrice =
    top5investmentWithHighestPurchasePrice.map((investment) => ({
      name: investment.name,
      amount: investment.purchase.pricePerUnit * investment.purchase.units,
      id: investment.id,
    }));
  const profit = totalGain - onlySoldSpent;

  return (
    <>
      <Flex justifyContent="center" gap={4} flexWrap="wrap" h={"100%"} w="100%">
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          gap={4}
          w="calc(33.33% - 1.33rem)"
          minW={"340px"}
        >
          <Box
            backgroundColor={"#fff"}
            p={8}
            borderRadius="30px"
            outline={" 1px solid #e2e8f0"}
            px={10}
            h="calc(50% - 2rem)" 
          >
              <TitleWithTooltip
                title="Profit"
                tooltip="I still dont know my voci"
              />
            <Text fontSize={"2rem"} fontWeight={"bold"}>
              ${totalGain.toLocaleString()}
            </Text>
          </Box>

          <Box
            backgroundColor={"#fff"}
            p={8}
            borderRadius="30px"
            outline={" 1px solid #e2e8f0"}
            px={10}
            h="calc(50% - 2rem)"
            minH={"150px"}
          >
              <TitleWithTooltip
                title="Revenue"
                tooltip="I still dont know my voci"
              />
            <Text fontSize={"2rem"} fontWeight={"bold"}>
              ${profit.toLocaleString()}
            </Text>
          </Box>
        </Flex>
        <Box
          backgroundColor={"#fff"}
          p={8}
          borderRadius="30px"
          outline={" 1px solid #e2e8f0"}
          px={10}
          w="calc(33.33% - 1.33rem)"
          minW={"340px"}
        >
            <TitleWithTooltip
              title="Top 5 investments"
              tooltip="I still dont know my voci"
            />
          <Flex flexDirection={"column"} gap={4} mt={4} fontSize={"lg"}>
            {top5InvestmentsWithHighestPurchasePrice.map(
              (investment, index) => (
                <Flex key={index} justifyContent={"space-between"}>
                  <Text>
                    {index + 1}. {investment.name}
                  </Text>
                  <Text>${investment.amount.toLocaleString()}</Text>
                </Flex>
              )
            )}
          </Flex>
        </Box>

        <Box
          backgroundColor={"#fff"}
          w={"calc(33.33% - 1.33rem)"}
          p={8}
          borderRadius="30px"
          outline={" 1px solid #e2e8f0"}
          px={10}
          maxW={"340px"}
          minW={"340px"}
        >
          <MainPieChart TypeDiversity={investmentDiversity} />
        </Box>
      </Flex>
    </>
  );
}
