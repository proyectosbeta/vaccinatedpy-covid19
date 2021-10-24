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
    "#B10DC9",
    "#39CCCC",
    "#85144b",
];

const dataDosis1 = [
    590942,
    20672,
    101470,
    124555,
    199216,
    1344232,
    2979,
    485911,
];
const totalDosis1 = '2.869.977';

const dataDosis2 = [
    397807,
    17282,
    92857,
    119091,
    176583,
    1115528,
    1427,
    161605,
];
const totalDosis2 = '2.082.180';

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
                        backgroundColor: '#000',
                        borderRadius: 3,
                        font: {
                            size: 7,
                        },
                        formatter: (value, ctx) => {
                            let label = ctx.chart.data.labels[ctx.dataIndex] ;
                            let sum     = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;

                            dataArr.map(data => {
                                sum += data;
                            });

                            let percentage = (value * 100 / sum).toFixed(2)+"%";

                            return `${label} (${percentage})`;
                        },
                        color: '#fff',
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
};