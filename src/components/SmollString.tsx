import { Text } from "@chakra-ui/react";

interface SmollPricePerUnitProps {
  number: number;
}

// TODO: consider other name
export function SmollPricePerUnit({ number }: SmollPricePerUnitProps) {
  return (
    <Text color={"grey"} fontSize={{ base: "0.9rem", md: "0.9rem" }} mt={"-20px"} /* it is beautiful pls no change ty*/>
      ${number.toLocaleString()} per Unit
    </Text>
  );
}
