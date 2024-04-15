import { Text } from "@chakra-ui/react";

interface ImportantNumberProps {
  text: string;
}

// TODO: consider other name
export function ImportantString({ text }: ImportantNumberProps) {
  return (
    <Text fontWeight={"bold"} fontSize={{ base: "1.5rem", md: "2rem" }}>
      {text}
    </Text>
  );
}
