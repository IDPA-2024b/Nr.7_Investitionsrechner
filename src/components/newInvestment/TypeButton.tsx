import { type ButtonProps, Button, VStack, Text } from "@chakra-ui/react";
import type { InvestmentType } from "../../types/investment";
import { InvestmentIcon } from "../InvestmentIcon";

interface NewInvestmentTypeButtonProps extends Omit<ButtonProps, "onClick"> {
  type: InvestmentType;
  onClick: (type: InvestmentType) => void;
  isSelected: boolean;
}

export function NewInvestmentTypeButton({
  type,
  onClick,
  isSelected,
  ...props
}: NewInvestmentTypeButtonProps) {
  return (
    <Button
      {...props}
      onClick={() => onClick(type)}
      bg={"white"}
      variant={"outline"}
      padding={4}
      height={"fit-content"}
      aspectRatio={"1 / 1"}
      _hover={{
        transform: "scale(1.05)",
        colorScheme: "teal",
        color: "teal.500",
        borderColor: "teal.500",
      }}
      {...(isSelected
        ? {
            borderColor: "teal.500",
            colorScheme: "teal",
            color: "teal.500",
          }
        : {})}
    >
      <VStack>
        <InvestmentIcon boxSize={{ base: "4rem", md: "7rem" }} type={type} />
        <Text textTransform={"capitalize"}>{type}</Text>
      </VStack>
    </Button>
  );
}
