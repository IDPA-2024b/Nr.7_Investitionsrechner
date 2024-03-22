import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);
export function InvestmentPercent({ InvestmentPercentageData }) {
    console.log(InvestmentPercentageData);
    const data = {
        labels: InvestmentPercentageData.map(item => item.type),
        datasets: [{
            label: 'My First Dataset',
            data: InvestmentPercentageData.map(item => item.percentage),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 30
        }]
    };

    const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);

    return (
        <div>
            <Doughnut data={data}  />
        </div>
    );
}