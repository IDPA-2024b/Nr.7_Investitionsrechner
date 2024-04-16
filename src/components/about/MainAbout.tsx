import LogoIcon from '../../assets/InViewLogoIcon.svg';
import {
    chakra,
    Stack,
    Text,
    Box,
    Flex,
    Image,
} from "@chakra-ui/react";

export function MainAbout() {

    return (
        <>
            <Box
                backgroundColor={"#86E7DB"}
            >

                <Stack
                    direction="column"
                    spacing={6}
                    justifyContent="center"
                    maxW={{ base: '90vw', md: 'container.lg' }}
                    mx="auto"
                    pt={"100px"}
                >
                    <chakra.h1
                        fontSize="7xl"
                        lineHeight={1}
                        fontWeight="bold"
                        textAlign="center"
                    >
                        We are <chakra.span color="teal.600">InView</chakra.span>
                    </chakra.h1>
                    <Text
                        fontSize="1.2rem"
                        lineHeight="1.375"
                        fontWeight="400"
                        textAlign="center"
                        color="smalltext.base"
                    >
                        Providing you with the best tools to help you manage your investment portfolio.
                    </Text>
                    <Flex
                        justifyContent="space-between"
                        alignItems={{ base: 'center', md: 'start' }}
                        gap={10}
                        mt={10}
                        flexDir={{ base: 'column', md: 'row' }}

                    >
                        <Image src={LogoIcon} alt="InView Logo" maxW={"400px"} />
                        <Stack
                            spacing={4}
                        >

                            <Text
                                fontSize="1.2rem"
                                lineHeight="1.375"
                                fontWeight="400"
                                textAlign="center"
                                color="smalltext.base"
                            >
                                Our goal is it to improve and help you during your investing journey
                            </Text>
                            <Text
                                fontSize="1.2rem"
                                lineHeight="1.375"
                                fontWeight="400"
                                textAlign="center"
                                color="smalltext.base"
                            >
                                We believe that everyone should have access to the best tools to help them make informed decisions about their investments.
                            </Text>

                            <Text
                                fontSize="1.2rem"
                                lineHeight="1.375"
                                fontWeight="400"
                                textAlign="center"
                                color="smalltext.base"
                            >
                                A third part but idk
                            </Text>
                        </Stack>

                    </Flex>
                </Stack>

            </Box>
            <Box
                width={"100vw"}
                zIndex={-1}
                position={"absolute"}
                left={0}
                right={0}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <title>{/*TODO: Add a title to the svg*/}</title>
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="#81E6D9" />
                            <stop offset="100%" stopColor="#E6FFFA" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#gradient)"
                        fillOpacity="1"
                        d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,64C840,85,960,139,1080,154.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    />
                </svg>
            </Box>


        </>
    )
}

