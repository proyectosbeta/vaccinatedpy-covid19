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
    843012,
    23373,
    101555,
    125104,
    225536,
    1701382,
    11931,
    495218,
];
const totalDosis1 = '3.527.111';

const dataDosis2 = [
    648242,
    21767,
    93539,
    120967,
    198710,
    1540073,
    6919,
    444371,
];
const totalDosis2 = '3.074.588';

const dataDosis3 = [
    305735,
    260,
    0,
    51,
    24406,
    450556,
    0,
    0,
];
const totalDosis3 = '781.008';

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