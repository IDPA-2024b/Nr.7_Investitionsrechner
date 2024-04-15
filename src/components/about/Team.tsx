import { Container, Heading, Flex, Image, Text, HStack, VStack } from '@chakra-ui/react';
import React from 'react'

interface TeamProps {
    TeamProps: {
        name: string;
        ImageSrc: string;
        description: string;
    }[]

}
export function Team({ TeamProps }: TeamProps) {

    return (
        <>

            <>
                <Container
                    maxW={{ base: '90vw', md: 'container.lg' }}
                    mt={"20vh"}
                >
                    <Heading
                        as="h2"
                        size="xl"
                        textAlign="center"

                    >
                        And Now Meet Our Team
                    </Heading>
                    <Flex
                        justifyContent="center"
                        direction="row"
                        flexWrap="wrap"
                        gap={10}
                        mt={"50px"}
                    >
                        {TeamProps.map((team, index) => (
                            <VStack
                                w={"150px"}
                            >
                                <Flex
                                    key={index}
                                    mt={"20px"}
                                    direction={"column"}
                                    alignItems={"center"}
                                >
                                    
                                    <Flex direction="column" alignItems="center">
                                        <Image borderRadius={"1000px"} w="100px" src={team.ImageSrc} alt={team.name}  w="100px" h={"100px"}/>
                                        <Text>{team.name}</Text>
                                    </Flex>
                                    <hr style={{ width: "50%", backgroundColor: "teal", height: "1px", border: "none" }} />
                                    <Text fontSize={"sm"} color={"gray.500"} textAlign="center">
                                        {team.description}
                                    </Text>
                                </Flex>

                            </VStack>
                        ))}
                    </Flex>

                </Container>
            </>
        </>
    )
}