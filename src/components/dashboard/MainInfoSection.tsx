import { Box, Flex, Text } from '@chakra-ui/react';
import { MainPieChart } from './MainPieChart';
import { TextWithTooltip } from '../TextWithTooltip';
import { Investment } from '../../types/investment';


interface MainInfoSectionProps {
    investments: Investment[]
}

export function MainInfoSection({ investments }: MainInfoSectionProps) {
    const lastValue = 3
    const investmentDiversity = [];

    for (const investment of investments) {
      const type = investment.type;
      const amount = investment.purchase.amount;
      const cost = investment.purchase.price;
      const total = amount * cost;
  
      const index = investmentDiversity.findIndex(item => item.type === type);
      if (index !== -1) {
        investmentDiversity[index].amount += total;
      } else {
        investmentDiversity.push({ type: type, amount: total });
      }
    }

    const investmentsWithSoldData = investments.filter(investment => investment.sale !== undefined);

    const onlySoldSpent = investmentsWithSoldData.reduce((total, investment) => {
        const purchasePrice = investment.purchase.price;
        const purchaseAmount = investment.purchase.amount;
        return total + (purchasePrice * purchaseAmount);
    }, 0);


    const totalGain = investmentsWithSoldData.reduce((total, investment) => {
        const salePrice = investment.sale.price;
        const saleAmount = investment.sale.amount;
        return total + (salePrice * saleAmount);
    }, 0);

    const profit = totalGain - onlySoldSpent;
    const top5Investments = [
        {
            name: 'Apple',
            amount: 50000000
        },
        {
            name: 'Tesla',
            amount: 40000000
        },
        {
            name: 'Amazon',
            amount: 30000000
        },
        {
            name: 'Google',
            amount: 20000000
        },
        {
            name: 'Facebook',
            amount: 10000000
        }
    ]


    return (
        <>
            <Flex
                justifyContent="center"
                gap={4}
                flexWrap="wrap"
                h={'100%'}
                w="100%"
            >
                <Flex
                    flexDir={"column"}
                    justifyContent={'space-between'}
                    gap={4}
                    w="calc(33.33% - 1.33rem)"
                    minW={'340px'}
                >

                    <Box
                        backgroundColor={'#fff'}
                        p={8}
                        borderRadius="30px"
                        outline={' 1px solid #e2e8f0'}
                        px={10}
                        h="calc(50% - 2rem)" // Set the height of the box to 50% minus the gap
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
                            ${totalGain.toLocaleString()}
                        </Text>
                    </Box>

                    <Box
                        backgroundColor={'#fff'}
                        p={8}
                        borderRadius="30px"
                        outline={' 1px solid #e2e8f0'}
                        px={10}
                        h="calc(50% - 2rem)"

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
                            ${profit.toLocaleString()}
                        </Text>
                    </Box>
                </Flex>
                <Box
                    backgroundColor={'#fff'}
                    p={8}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                    w="calc(33.33% - 1.33rem)" // Set the width of the box to 33.33% minus the gap
                    minW={'340px'}

                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                    >
                        <TextWithTooltip name="Top 5 investments" text='I still dont know my voci' />
                    </Text>
                    <Flex
                        flexDirection={'column'}
                        gap={4}
                        mt={4}
                        fontSize={'lg'}
                    >
                        {top5Investments.map((investment, index) => (
                            <Flex
                                key={index}
                                justifyContent={'space-between'}
                            >
                                <Text>{index + 1}. {investment.name}</Text>
                                <Text>${investment.amount.toLocaleString()}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>


                <Box
                    backgroundColor={'#fff'}
                    w={'calc(33.33% - 1.33rem)'}
                    p={8}
                    borderRadius="30px"
                    outline={' 1px solid #e2e8f0'}
                    px={10}
                    maxW={'340px'}
                    minW={'340px'}

                >


                    <MainPieChart TypeDiversity={investmentDiversity} />
                </Box>
            </Flex >
        </>
    )
}
