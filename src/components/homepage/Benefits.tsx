import { SVGProps } from 'react';
import {
    Container,
    Box,
    chakra,
    Text,
    SimpleGrid,
    Flex,
    Link,
    useColorModeValue
} from '@chakra-ui/react';

interface Benefit {
    heading: string;
    content: string;
    icon: SVGProps<SVGElement>;
}
// from Template kart cuz our didnt have a good styling and i am to lazy to style it


export function Benefits({ benefits }: { benefits: Benefit[] }) {
    return (
            <Flex
                flexWrap={"wrap"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={10}
                my={20}
            >
                {benefits.map((feature, index) => (
                    <Box
                        key={index}
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        p={6}
                        rounded="lg"
                        textAlign="center"
                        pos="relative"
                        maxW={"300px"}
                    >
                        <Flex
                            p={3}
                            w="max-content"
                            color="white"
                            bgGradient="linear(to-br, #339999, #00cccc)"
                            rounded="md"
                            marginInline="auto"
                            pos="absolute"
                            left={0}
                            right={0}
                            top="-1.5rem"
                            boxShadow="lg"
                        >
                            {feature.icon}
                        </Flex>
                        <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                            {feature.heading}
                        </chakra.h3>
                        <Text fontSize="md" mt={4}>
                            {feature.content}
                        </Text>
                    </Box>
                ))}
            </Flex>

    );
};

