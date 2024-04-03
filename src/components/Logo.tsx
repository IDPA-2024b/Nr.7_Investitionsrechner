import { Heading } from "@chakra-ui/react";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick = () => {} }: LogoProps) {
  return (
    <Heading
      size="lg"
      _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
      onClick={onClick}
    >
      InView
    </Heading>
  );
}
