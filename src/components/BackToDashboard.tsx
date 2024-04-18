import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <HStack cursor={"pointer"} onClick={() => navigate("/dashboard")}>
      <ArrowBackIcon boxSize={6} />
      <Text fontWeight={"medium"}>Back to Dashboard</Text>
    </HStack>
  );
}
