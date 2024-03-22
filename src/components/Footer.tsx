import {
  Flex,
  VStack,
  Heading,
  Button,
  Divider,
  type IconButtonProps,
  IconButton,
  Text,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ILink } from "../types/link";
import { FaGithub } from "react-icons/fa";
import { chakra } from "@chakra-ui/react";

interface FooterProps {
  links: ILink[];
}

export function Footer({ links }: FooterProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <chakra.footer>
      <Flex
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        width={"100%"}
        paddingX={{ base: 2, md: 5 }}
        paddingY={{ base: 2, md: 3 }}
        overflow={"hidden"}
      >
        <VStack width={"100%"} spacing={2}>
          <Heading
            size={"lg"}
            cursor={"pointer"}
            _hover={{
              transform: "scale(1.05)",
            }}
            onClick={() => navigate("/")}
          >
            InView
          </Heading>
          <Flex direction={"row"} wrap={"wrap"} justify={"center"} width="100%">
            {links.map((link) => (
              <Button
                key={link.name}
                variant={"ghost"}
                isDisabled={location.pathname === link.href}
                _hover={{
                  transform: "scale(1.1)",
                }}
                _disabled={{
                  fontWeight: "bold",
                  bg: "transparent",
                  transform: "scale(1.0)",
                }}
                onClick={() => navigate(link.href)}
              >
                {link.name}
              </Button>
            ))}
          </Flex>
          <Divider borderColor={"gray.500"} />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Text
              fontWeight={"medium"}
              marginBottom={{ base: 2, md: 0 }}
            >{`© ${new Date().getFullYear()} Bit Busters. All rights reserved.`}</Text>
            <Flex width={"50%"} justify={{ base: "center", md: "end" }}>
              <LinkButton
                url="https://github.com/IDPA-2024/Nr.7_Investitionsrechner"
                aria-label="github"
                icon={<FaGithub />}
              />
            </Flex>
          </Flex>
        </VStack>
      </Flex>
    </chakra.footer>
  );
}

interface LinkButtonProps extends IconButtonProps {
  url: string;
}

function LinkButton({
  children,
  url,
  icon,
  "aria-label": ariaLabel,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <IconButton
      _hover={{
        transform: "scale(1.2)",
      }}
      onClick={() => window.open(url)}
      icon={icon}
      bg={"gray.100"}
      rounded={"full"}
      aria-label={ariaLabel}
    >
      {children}
    </IconButton>
  );
}
