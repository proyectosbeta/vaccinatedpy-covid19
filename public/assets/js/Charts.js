const labels = [
    "AstraZeneca",
    "CoronaVac",
    "Covaxin",
    "Hayat Vax",
    "Moderna",
    "Pfizer",
    "Sinopharm",
    "Sputnik V",
];

const colors = [
    "#FFDC00",
    "#0074D9",
    "#2ECC40",
    "#FF851B",
    "#7FDBFF",
    "#EA899A",
    "#39CCCC",
    "#D3C1DD",
];

const dataDosis1 = [
    860170,
    202857,
    101797,
    125254,
    226887,
    1736103,
    12073,
    495641,
];
const totalDosis1 = '3.760.782';

const dataDosis2 = [
    684609,
    21916,
    93664,
    121567,
    201616,
    1585003,
    7721,
    453124,
];
const totalDosis2 = '3.169.220';

const dataDosis3 = [
    363648,
    328,
    0,
    130,
    25954,
    624647,
    0,
    0,
];
const totalDosis3 = '1.014.707';

class ChartVacunas {
    constructor(ctx, title, data) {
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    borderWidth         : 0,
                    data                : data,
                    backgroundColor     : colors,
                }]
            },
            plugins: [
                ChartDataLabels,
            ],
            options: {
                animation: {
                    animateScale: true,
                },
                rotation           : Math.PI * 1, 
                responsive         : true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text   : title,
                    },
                    datalabels: {
                        display: true,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size  : 7,
                        },
                        formatter: (value, ctx) => {
                            let label = ctx.chart.data.labels[ctx.dataIndex] ;
                            let sum     = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;

                            dataArr.map(data => {
                                sum += data;
                            });

                            let percentage = (value * 100 / sum).toFixed(2)+"%";

                            return `${percentage}`;
                        },
                    },
                    legend: {
                        display : true,
                        position: 'right',
                        labels: {
                            boxWidth : 20,
                        },
                    },
                },
            },
        });
    }
}

const onloadCharts = () => {
    displatChartDosis1y2();
};

const displatChartDosis1y2 = () => {
    Chart.defaults.scale.ticks.beginAtZero = true;

    const ctxDosis1 = document.getElementById('chartDosis1').getContext('2d');
    const titleDosis1 = `Dosis 1 (${totalDosis1})`;
    const chartDosis1 = new ChartVacunas(ctxDosis1, titleDosis1, dataDosis1);

    const ctxDosis2 = document.getElementById('chartDosis2').getContext('2d');
    const titleDosis2 = `Dosis 2 (${totalDosis2})`;
    const chartDosis2 = new ChartVacunas(ctxDosis2, titleDosis2, dataDosis2);

    const ctxDosis3 = document.getElementById('chartDosis3').getContext('2d');
    const titleDosis3 = `Dosis refuerzo (${totalDosis3})`;
    const chartDosis3 = new ChartVacunas(ctxDosis3, titleDosis3, dataDosis3);
};