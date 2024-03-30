import { Text, Tooltip, HStack, Icon } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface TextWithTooltipProps {
    name: string;
    text: string;
}
export function TextWithTooltip({ name, text }: TextWithTooltipProps) {
    return (
        <>
            <HStack>

                <Text>
                    {name}
                </Text>
                <Tooltip
                    hasArrow
                    label={text}
                    fontSize='sm'
                    
                >
                    <Icon
                        as={InfoOutlineIcon}
                        w={4}
                        h={4}
                    />
                </Tooltip>
            </HStack>
        </>
    )
}