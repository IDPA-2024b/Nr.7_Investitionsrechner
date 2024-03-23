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


    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = "Total: " + InvestmentPercentageData.reduce((acc, item) => acc + item.percentage, 0) + ".-",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]



    return (

        <Doughnut
            type="doughnut"
            data={data}
            plugins={plugins}
        />
    );
}