import { Box } from "@chakra-ui/react";
import React from "react";
import "./style.css";
const Spinner = () => {
  return (
    <Box
      as="span"
      display="inline-block"
      animation="spin 120s linear infinite"
      className="spinner"
    >
        wasd
    </Box>
  );
};

export default Spinner;
