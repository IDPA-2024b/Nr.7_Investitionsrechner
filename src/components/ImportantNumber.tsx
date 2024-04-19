import { Text } from "@chakra-ui/react";

interface ImportantNumberProps {
  number: number;
}

// TODO: consider other name
export function ImportantNumber({ number }: ImportantNumberProps) {
  return (
    <Text fontWeight={"bold"} fontSize={{ base: "1.5rem", md: "2rem" }}>
      ${number.toLocaleString()}
    </Text>
  );
}
