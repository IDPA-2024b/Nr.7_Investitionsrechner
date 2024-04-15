import { Container, Flex, Heading, Text, Image } from '@chakra-ui/react'

interface LeaderShipProps {
    LeaderShipProps: {
        name: string;
        position: string;
        description: string;
        ImageSrc: string;
    }[]
}

export function LeaderShip({ LeaderShipProps }: LeaderShipProps) {
    return (
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
                    Meet Our LeaderShip
                </Heading>
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    gap={10}
                    mt={"50px"}
                >

                    {LeaderShipProps.map((leader, index) => (
                        <Flex
                            key={index}
                            mt={"20px"}
                            w={"210px"}
                            justifyContent={"center"}
                            direction={"column"}
                            alignItems={"center"}
                        >
                            <Image borderRadius={"10px"} src={leader.ImageSrc} alt={leader.name} />
                            <Heading
                                as="h3"
                                size="lg"
                                textAlign="center"
                            >
                                {leader.name}
                            </Heading>
                            <Text
                                textAlign="center"
                            >
                                {leader.position}
                            </Text>
                            <hr style={{ width: "50%", backgroundColor: "teal", height: "1px", border: "none"}} />
                            <Text
                                textAlign="center"
                                mt={"10px"}
                                fontSize={"sm"}
                            >
                                {leader.description}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Container>
        </>
    )
}