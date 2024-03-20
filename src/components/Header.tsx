import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import {
  type NavigateOptions,
  type To,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import type { ILink } from "../types/link";
import { useAuth } from "../hooks/contexts";
import { AcountMenu } from "./AcountMenu";

interface HeaderProps {
  links: ILink[];
}

export function Header({ links }: HeaderProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleNavigate(path: To, options?: NavigateOptions) {
    onClose();
    navigate(path, options);
  }

  function displayUserActions() {
    if (user)
      return (
        <AcountMenu
          name={user.displayName ?? user.email}
          src={user.photoURL}
          logout={logout}
        />
      );

    return (
      <Button
        size={{ base: "sm", md: "md" }}
        colorScheme="teal"
        _hover={{ transform: "scale(1.05)" }}
        onClick={() =>
          handleNavigate("/login", { state: { from: location.pathname } })
        }
      >
        Login
      </Button>
    );
  }

  return (
    <chakra.header py="3" px="5" borderBottomWidth={1}>
      <Flex width={"100%"} justify={"space-between"} align={"center"}>
        <IconButton
          display={{ base: "initial", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          variant={"ghost"}
          _active={{
            outline: "none",
          }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
        />
        <Heading
          size="lg"
          _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
          onClick={() => handleNavigate("/")}
        >
          InView
        </Heading>
        <HStack gap={12} display={{ base: "none", md: "flex" }}>
          {links.map((link) => (
            <Button
              variant="ghost"
              _hover={{ bg: "transparent", transform: "scale(1.1)" }}
              _disabled={{
                fontWeight: "bold",
                bg: "transparent",
                transform: "scale(1.0)",
              }}
              isDisabled={location.pathname === link.href}
              key={link.name}
              onClick={() => handleNavigate(link.href)}
            >
              {link.name}
            </Button>
          ))}
        </HStack>
        {displayUserActions()}
      </Flex>
      <Flex
        direction="column"
        display={{ base: isOpen ? "flex" : "none", md: "none" }}
      >
        {links.map((link) => (
          <Button
            variant="ghost"
            _disabled={{
              fontWeight: "bold",
              bg: "transparent",
              transform: "scale(1.0)",
            }}
            isDisabled={location.pathname === link.href}
            _hover={{ bg: "transparent", transform: "scale(1.1)" }}
            key={link.name}
            onClick={() => handleNavigate(link.href)}
          >
            {link.name}
          </Button>
        ))}
      </Flex>
    </chakra.header>
  );
}
