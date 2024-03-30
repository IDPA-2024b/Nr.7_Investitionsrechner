import { Box, Flex, Text } from '@chakra-ui/react';
import { MainDoughnutChart } from './MainDoughnutChart';
import { TextWithTooltip } from '../TextWithTooltip';

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
    const firstValue = LastInvestmentData[0].value.toFixed(2);
    const lastValue = LastInvestmentData[LastInvestmentData.length - 1].value.toFixed(2);
    const percentageGain = parseFloat(((lastValue - firstValue) / firstValue * 100).toFixed(2));
    const amountGain = parseFloat((lastValue - firstValue).toFixed(2));


    return (
        <>
            <Flex
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                gap={4}

                h={'100%'}
                w="100%" // Set the width of the outer Flex to 100%
            >
                <Flex
                    flexDir={"column"}
                    justifyContent={'space-between'}
                    gap={1}
                    w="calc(33.33% - 1.33rem)" // Set the width of the inner Flex to 33.33% minus the gap
                >

                    <Box
                        backgroundColor={'#fff'}
                        minW={'300px'}
                        p={8}
                        borderRadius="30px"
                        outline={' 1px solid #e2e8f0'}
                        px={10}
                        h="calc(50% - 1rem)" // Set the height of the box to 50% minus the gap
                        minH={'150px'}
                    >
                        <Text
                            fontSize={'xl'}
                            fontWeight={'bold'}

                        >
                            <TextWithTooltip name="Profit" text='I still dont know my voci' />
                        </Text>
                        <Text
                            fontSize={'2rem'}
                            fontWeight={'bold'}
                        >
                            ${amountGain}
                        </Text>
                    </Box>

                    <Box
                        backgroundColor={'#fff'}
                        minW={'300px'}
                        p={8}
                        borderRadius="30px"
                        outline={' 1px solid #e2e8f0'}
                        px={10}

                        minH={'150px'}
                    >

                        <Text
                            fontSize={'xl'}
                            fontWeight={'bold'}

                        >
                            <TextWithTooltip name="Revenue" text='I still dont know my voci' />
                        </Text>
                        <Text
                            fontSize={'2rem'}
                            fontWeight={'bold'}
                        >
                            ${lastValue}
                        </Text>
                    </Box>
                </Flex>
                <Box
                    backgroundColor={'#fff'}
                    minW={'300px'}
                    minH={'300px'}
                    p={8}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                    w="calc(33.33% - 1.33rem)" // Set the width of the box to 33.33% minus the gap
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
