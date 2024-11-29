

// Gráfico de calidad del aire
const airQualityGauge = new Chart(document.getElementById('airQualityGauge'), {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10, 90],
            backgroundColor: ['#22c55e', '#e5e7eb'],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation: 270,
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
        },
        layout: {
            padding: {
                top: -120,
                bottom: -120
            }
        }
    }
});

// Gráfico de línea
// const lineChart = new Chart(document.getElementById('lineChart'), {
//     type: 'line',
//     data: {
//         labels: ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'],
//         datasets: [{
//             label: 'Valor',
//             data: [20, 25, 22, 35, 35],
//             borderColor: '#22c55e',
//             tension: 0.1
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });