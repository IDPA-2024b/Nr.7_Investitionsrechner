import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'


 interface Benefit {
    id: number;
    title: string;
    text: string;
    icon: string;
}

export function Benefits({ benefits }: { benefits: Benefit[] }) {
    return (
        <>
            <Flex
                flexWrap={"wrap"}
                gap={10}
                justifyContent="center"
                my={10}
            >
                {benefits.map((benefit) => (
                    <Box
                        key={benefit.id}
                        maxW={"300px"}
                        h="200px"
                        bg="teal.500"
                        borderRadius={10}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flex="1 0 150px"
                        transition={"transform 0.3s ease-out"}
                        _hover={{
                            transform: "scale(1.05)",
                        }}
                        boxShadow="0 0 0 1px rgba(0, 128, 128, 0.3)"
                        background="rgba(0, 128, 128, 0.1)"
                    >
                        <Flex
                            gap={3}
                            textAlign="center"
                            flexDir={"column"}
                            justifyContent="center"
                            alignItems="center"
                            maxW={"200px"}
                        >
                            <Icon name="benefit-icon" />
                            <Text fontWeight="bold">{benefit.title}</Text>
                            <Text>{benefit.text}</Text>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </>
    );
}
