import {
  Flex,
  VStack,
  Heading,
  HStack,
  Button,
  Divider,
  ButtonGroup,
  type IconButtonProps,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import {
  useNavigate,
  useLocation,
  To,
  NavigateOptions,
} from "react-router-dom";
import { type ILink } from "../types/link";
import { FaGithub } from "react-icons/fa";

interface FooterProps {
  links: ILink[];
}

export function Footer({ links }: FooterProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigate(path: To, options?: NavigateOptions) {
    navigate(path, options);
  }

  return (
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
          onClick={() => handleNavigate("/")}
        >
          InView
        </Heading>
        <HStack
          justify={"center"}
          width="100%"
          spacing={{ base: 6, md: 12 }}
          overflowX={"auto"}
          overflowY={"hidden"}
        >
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
              onClick={() =>
                handleNavigate(link.href, {
                  state: { from: location.pathname },
                })
              }
            >
              {link.name}
            </Button>
          ))}
        </HStack>
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
          <ButtonGroup spacing={4}>
            <LinkButton
              url="https://github.com/IDPA-2024/Nr.7_Investitionsrechner"
              aria-label="github"
              icon={<FaGithub />}
            />
          </ButtonGroup>
        </Flex>
      </VStack>
    </Flex>
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
