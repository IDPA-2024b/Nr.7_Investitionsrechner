import {
  Container,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Link as NavLink } from "react-router-dom";

export function PrivacyPage() {
  return (
    <Container>
      <VStack gap={3} width={"100%"} alignItems={"start"}>
        <Heading width={"100%"} textAlign={"center"}>
          Privacy Policy
        </Heading>
        <Text as={"i"}>Last updated: 17th March 2024 </Text>
        <Text>
          Welcome to {" "}
          <chakra.span color={"teal"}>InView</chakra.span>! We appreciate
          your interest in our platform that allows users to track their
          investments. Please take a moment to review our Privacy Policy, which
          outlines how we collect, use, disclose, and protect your personal
          information.
        </Text>
        <OrderedList>
          <OTitle>Information We Collect:</OTitle>
          <UnorderedList>
            <UTitle>Personal Information:</UTitle>
            <Text>
              When you sign up for an account using Google authentication, we
              collect your name and email address associated with your Google
              account.
            </Text>
            <UTitle>Investment Data:</UTitle>
            <Text>
              We collect information about your investments, including the
              amount invested and the date of investment. This information is
              used to calculate your investment returns etc.
            </Text>
            <UTitle>Contact:</UTitle>
            <Text>
              We collect your contact information when using our Contact from.
            </Text>
          </UnorderedList>
          <OTitle>How We Use Your Information:</OTitle>
          <UnorderedList>
            <UTitle>To Provide Services:</UTitle>
            <Text>
              We use your information to enable the creation and management of
              your investments and enhance user
              experience.
            </Text>
          </UnorderedList>
          <OTitle>Sharing Your Information:</OTitle>
          <UnorderedList>
            <UTitle>Service Providers:</UTitle>
            <Text>
              We may share your information with trusted third-party service
              providers who assist us in operating our platform.
            </Text>
            <UTitle>Legal Compliance:</UTitle>
            <Text>
              We may disclose your information to comply with legal obligations,
              enforce our policies, or respond to legal requests.
            </Text>
          </UnorderedList>
          <OTitle>Security:</OTitle>
          <Text>
            We implement security measures to protect your personal information
            and strive to maintain the confidentiality and integrity of your
            data.
          </Text>
          <OTitle>Changes to this Privacy Policy:</OTitle>
          <Text>
            We may update this Privacy Policy to reflect changes in our
            practices. We will notify you of any material changes via email or
            through our platform.
          </Text>
          <OTitle>Contact Us:</OTitle>
          <Text>
            By using our platform, you agree to the terms outlined in this
            Privacy Policy. Thank you for choosing  {" "}
            <chakra.span color={"teal"}>InView</chakra.span>!
          </Text>
          <Text>
            You can contact us{" "}
            <Link color={"teal.500"} as={NavLink} to={"/contact"}>
              here
            </Link>
            .
          </Text>
        </OrderedList>
      </VStack>
    </Container>
  );
}

function OTitle({ children }: PropsWithChildren<object>) {
  return (
    <ListItem
      css={{
        "&::marker": {
          fontWeight: "bold",
          fontSize: "1.2em",
        },
      }}
    >
      <Heading size={"md"}>{children}</Heading>
    </ListItem>
  );
}

function UTitle({ children }: PropsWithChildren<object>) {
  return (
    <ListItem
      css={{
        "&::marker": {
          fontWeight: "bold",
          fontSize: "1.2em",
        },
      }}
    >
      <Heading size={"sm"}>{children}</Heading>
    </ListItem>
  );
}
