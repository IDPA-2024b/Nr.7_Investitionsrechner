import { Flex, Box, Text } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';

export function SleekDesign() {
    return (
        <Flex justifyContent="space-between" alignItems="center" margin="auto" 
            css={{
                '@media screen and (max-width: 1000px)': {
                    flexDirection: 'column',
                },
            }}
        >
            <Box width="50%">
                <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">About Sleek Design</Text>
                <Text fontSize="lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </Text>
            </Box>
            <Box
                css={{
                    '@media screen and (max-width: 1200px)': {
                        transform: 'scale(0.8)',
                    },
                    '@media screen and (max-width: 1100px)': {
                        transform: 'scale(0.6)',
                    },
                    '@media screen and (max-width: 400px)': {
                        transform: 'scale(0.5)',
                    },
                }}
            >
                <Spline scene="https://prod.spline.design/4ufZdjS0fOS9-ObS/scene.splinecode" />
            </Box>
        </Flex>
    );
}
