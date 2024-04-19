import { chakra } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren<object>) {
  return (
    <chakra.section
      width={"100%"}
      rounded={"3xl"}
      bg={"white"}
      p={5}
      borderWidth={1}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      justifyContent={"space-between"}
    >
      {children}
    </chakra.section>
  );
}
 