import React from "react";
import { Box } from "@chakra-ui/react";

export function KebabIcon(props) {
    return (
        <Box {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
            </svg>
        </Box>
    );
}
