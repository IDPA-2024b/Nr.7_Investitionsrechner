import { Box } from "@chakra-ui/react";
import React from "react";
import "./style.css";
const Spinner = () => {
  return (
    <Box
      as="span"
      display="inline-block"
      animation="spin 120s linear infinite"
      zIndex={3}
      position="relative"
      w="50px" // Adjust width as needed
      h="50px" // Adjust height as needed
      bg="blue.400" // Adjust background color as needed
    >
        wasd
    </Box>
  );
};

export default Spinner;
