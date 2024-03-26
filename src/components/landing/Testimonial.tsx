import { Container, Text, VStack, Box, Avatar, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaQuoteRight } from 'react-icons/fa';
import './style.css';
export function Testimonial() {
    return (
        <Container maxW="2xl" p={5} position="relative">
            <VStack spacing={3} position="relative" zIndex={1}>
                <Icon
                    as={FaQuoteRight}
                    w={8}
                    h={8}
                    color={useColorModeValue('teal.400', 'teal.200')}
                    _hover={{ opacity: 0.9, transform: 'scale(1.1)', transition: 'transform 0.3s ease-in-out, color 0.3s ease' }}
                />
                <Text p={5} color={useColorModeValue('gray.600', 'gray.300')}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo cupiditate repellat unde voluptas, adipisci ex deleniti quisquam iusto voluptate nostrum. Dolore, impedit! Officia voluptates a obcaecati qui fuga consectetur similique in enim. Nisi laborum nulla recusandae odit possimus earum odio,
                </Text>
                <VStack alignItems="center">
                    <Avatar name="avatar"
                        _hover={{ animation: "spin 10s linear infinite" }}
                        src="https://media.licdn.com/dms/image/D4D03AQGt8kXSUqmhBg/profile-displayphoto-shrink_800_800/0/1693219459486?e=2147483647&v=beta&t=kxpWDcTBCz-I9cqbe6yX9QMCQtZNAVqJu8lf3zFh__8" size="lg" />
                    <Box textAlign="center">
                        <Text fontWeight="bold" fontSize="lg"
                            _hover={{ animation: "none" }}
                        >
                            Aakash  Sethi
                        </Text>
                        <Text fontSize="md" color="gray.500">
                            Songwriter at Funny.com
                        </Text>
                    </Box>
                </VStack>
            </VStack>
            <DottedBox />
        </Container>
    );
}

function DottedBox() {
    return (
        <Box position="absolute" top={0} left={0} height="full" maxW="700px" zIndex={0}>
            <Box>
                <svg
                    width="350"
                    height="250"
                    fill="none"
                >
                    <defs>
                        <pattern
                            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >

                            <rect x="0" y="0" width="4" height="4" fill="teal" opacity="0.2"></rect>
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
                </svg>
            </Box>
        </Box>
    );
}
