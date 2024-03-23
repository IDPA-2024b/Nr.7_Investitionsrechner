import { useMemo } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Plugin,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
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

export function DoughnutChart({ investments }: DoughnutChartProps) {

    const data = useMemo(() => ({
        labels: investments.map(item => item.type),
        datasets: [{
            label: 'doughnut chart',
            data: investments.map(item => item.amount),
            backgroundColor: [
                // TODO: replace with theme specific colors
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 30
        }]
    }), [investments])


    const plugins: Plugin<"doughnut">[] = useMemo(() => [{
        id: 'total', // don't ask why? I don't know!
        beforeDraw: function (chart) {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif"; // TODO: replace with theme specific font
            ctx.textBaseline = "top";
            const text = "Total: " + investments.reduce((acc, item) => acc + item.amount, 0) + ".-"; // TODO: replace with better text
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }], [investments])


    return (

        <Doughnut
            data={data}
            plugins={plugins}
        />
    );
}