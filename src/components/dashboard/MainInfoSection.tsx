import { Box, Flex } from '@chakra-ui/react';
import { MainDoughnutChart } from './MainDoughnutChart';

interface MainInfoSectionProps {
    LastInvestmentData: {
        date: string;
        value: number;
    }[],
    TypeDiversity: {
        type: string;
        amount: number;
    }[]
}
export function MainInfoSection({ LastInvestmentData, TypeDiversity }: MainInfoSectionProps) {

    return (
        <>
            <Flex
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                gap={4}
            >
                <Box
                    backgroundColor={'#fff'}
                    minW={'300px'}
                    minH={'300px'}
                    p={4}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                >

                </Box>
                <Box
                    backgroundColor={'#fff'}
                    minW={'300px'}
                    minH={'300px'}
                    p={4}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                >
                </Box>

                <Box
                    backgroundColor={'#fff'}
                    minW={'300px'}
                    minH={'300px'}
                    p={8}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                >
                    <MainDoughnutChart TypeDiversity={TypeDiversity} />
                </Box>
            </Flex>
        </>
    )
}