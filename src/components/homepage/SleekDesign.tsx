import { Flex, Box, Text } from '@chakra-ui/react';
import Spline from '@splinetool/react-spline';

interface SleekDesignProps {
    title: string;
    description: string;
    splineURL: string;
}

export function SleekDesign({ SleekDesignProps }: { SleekDesignProps: SleekDesignProps }) {

    return (
        <Flex justifyContent="space-between" alignItems="center" margin="auto"
            css={{
                '@media screen and (max-width: 1000px)': {
                    flexDirection: 'column',
                },
            }}
        >
            <Box width="50%">
                <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">{SleekDesignProps.title}</Text>
                <Text fontSize="lg">
                    {SleekDesignProps.description}
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
                <Spline scene={SleekDesignProps.splineURL} />
            </Box>
        </Flex>
    );
}
