const labels = [
    "AstraZeneca",
    "CoronaVac",
    "Covaxin",
    "Hayat Vax",
    "Moderna",
    "Pfizer",
    "Sinopharm",
    "Sputnik V",
    "Pfizer Pediatrica",
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
    "#A3D139",
];

const dataDosis1 = [
    870627,
    232771,
    101810,
    125356,
    227213,
    1761199,
    12244,
    496145,
    52695,
];
const totalDosis1 = '3.880.060';

const dataDosis2 = [
    709346,
    124805,
    93800,
    121703,
    202264,
    1628405,
    8339,
    455075,
    180,
];
const totalDosis2 = '3.343.917';

const dataDosis3 = [
    408170,
    360,
    0,
    178,
    58403,
    819688,
    4,
    0,
    0,
];
const totalDosis3 = '1.286.799';

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