import { Flex, HStack, IconButton, chakra } from "@chakra-ui/react";
import { HamburgerIcon } from "../HambourgerIcon";
import { Logo } from "../Logo";
import { AcountMenu } from "../AcountMenu";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  isOpen: boolean;
}

export function DashboardHeader({
  onMenuClick = () => {},
  isOpen,
}: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <chakra.header py="3" px="5" bg={"white"}>
      <Flex width={"100%"} justify={"space-between"} align={"center"}>
        <HStack gap={10}>
          <IconButton
            aria-label={isOpen ? "Close menu" : "Open menu"}
            icon={<HamburgerIcon boxSize={"10"} />}
            variant="ghost"
            _hover={{
              bg: "transparent",
              transform: "scale(1.1)",
            }}
            onClick={onMenuClick}
          />
          <Logo onClick={() => navigate("/dashboard")} />
        </HStack>
        <AcountMenu />
      </Flex>
    </chakra.header>
  );
}
