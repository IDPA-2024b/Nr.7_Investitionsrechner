import { useMemo } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2';
import { Text,  } from '@chakra-ui/react';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

interface DoughnutChartProps {
    investments: {
        type: string,
        amount: number
    }[]
}

export function PieChart({ investments }: DoughnutChartProps) {

    const data = useMemo(() => ({
        labels: investments.map(item => item.type),
        datasets: [{
            data: investments.map(item => item.amount),
            backgroundColor: [
                // TODO: replace with theme specific colors
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 10
        }]
    }), [investments])
    const option = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Investment diversity'
            }
        }
    }), [])



    return (
        <>
        
            <Pie
                data={data}
                options={option}
            />
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                textAlign={'center'}
            >
                Total: ${investments.reduce((acc, item) => acc + item.amount, 0).toLocaleString()}
            </Text>
        </>
    );
}