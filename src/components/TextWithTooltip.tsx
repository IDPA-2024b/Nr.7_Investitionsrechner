import React from 'react'
import { Text, IconButton, Tooltip, HStack } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface TextWithTooltipProps {
    name: string;
    text: string;
}
export function TextWithTooltip({ name, text }: TextWithTooltipProps) {
    return (
        <>
            <HStack>

                <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                >
                    {name}
                </Text>
                <Tooltip
                    hasArrow
                    label={text}
                    fontSize='sm'
                >
                    <InfoOutlineIcon />
                </Tooltip>
            </HStack>
        </>
    )
}