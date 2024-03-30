import { PieChart } from '../charts/Pie'
import { TextWithTooltip } from '../TextWithTooltip';
import { Box, Flex } from '@chakra-ui/react';

interface MainDoughnutChartProps {
    TypeDiversity: {
        type: string;
        amount: number;
    }[]
}
export function MainPieChart({ TypeDiversity }: MainDoughnutChartProps) {

    const investments = TypeDiversity.map(item => ({ type: item.type, amount: item.amount }))
    return (
        <>
            <Box
                fontSize={'xl'}
                fontWeight={'bold'}
                mb={4}
            >
                <TextWithTooltip name={'Investment diversity'} text='Wasd' />
            </Box>
            <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
>
                <PieChart investments={investments} />
            </Flex>
        </>
    )
}