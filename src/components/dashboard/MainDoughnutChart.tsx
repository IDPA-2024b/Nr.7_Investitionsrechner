import React from 'react'
import { DoughnutChart } from '../charts/Doughnut'
import { TextWithTooltip } from '../TextWithTooltip';
import { Box } from '@chakra-ui/react';

interface MainDoughnutChartProps {
    TypeDiversity: {
        type: string;
        amount: number;
    }[]
}
export function MainDoughnutChart({ TypeDiversity }: MainDoughnutChartProps) {

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
            <DoughnutChart investments={investments} />
        </>
    )
}