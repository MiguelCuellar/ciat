let airQualityGauge, lineChart;

// Función para cambiar el tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    // Guardar preferencia del usuario
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    // Actualizar los gráficos
    updateChartsTheme();
}

function updateChartsTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const backgroundColor = isDarkTheme ? '#333' : '#fff';
    const textColor = isDarkTheme ? '#fff' : '#333';

    // Actualizar colores del gráfico de línea
    if (lineChart) {
        lineChart.options.scales.x.grid.color = isDarkTheme ? '#444' : '#ddd';
        lineChart.options.scales.y.grid.color = isDarkTheme ? '#444' : '#ddd';
        lineChart.options.scales.x.ticks.color = textColor;
        lineChart.options.scales.y.ticks.color = textColor;
        lineChart.update();
    }

    // Actualizar colores del medidor
    if (airQualityGauge) {
        airQualityGauge.data.datasets[0].backgroundColor[1] = isDarkTheme ? '#444' : '#e5e7eb';
        airQualityGauge.update();
    }
}

function initCharts() {
    // Inicializar el gráfico de calidad del aire
    airQualityGauge = new Chart(document.getElementById('airQualityGauge'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 500],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });

    // Inicializar el gráfico de línea
    lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Valor',
                data: [],
                borderColor: '#22c55e',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#ddd'
                    },
                    ticks: {
                        color: '#333'
                    }
                },
                x: {
                    grid: {
                        color: '#ddd'
                    },
                    ticks: {
                        color: '#333'
                    }
                }
            }
        }
    });
}

function updateDashboard() {
    fetch('get_data.php')
        .then(response => response.json())
        .then(data => {
            // Actualizar calidad del aire
            const airQuality = data.airQuality;
            const airQualityPercentage = (airQuality / 500 * 100).toFixed(1);
            airQualityGauge.data.datasets[0].data[0] = airQuality;
            airQualityGauge.data.datasets[0].data[1] = 500 - airQuality;
            airQualityGauge.update();
            document.getElementById('airQualityPercentage').textContent = `${airQualityPercentage}%`;

            // Actualizar temperatura y humedad
            document.getElementById('temperatureC').textContent = data.temperature.celsius;
            document.getElementById('temperatureF').textContent = data.temperature.fahrenheit;
            document.getElementById('humidity').textContent = data.humidity;

            // Actualizar gráfico de línea
            lineChart.data.labels = data.lineData.map(item => item.elemento);
            lineChart.data.datasets[0].data = data.lineData.map(item => item.valor);
            lineChart.update();

            // Actualizar medidor de gas
            document.getElementById('co2Value').textContent = data.gasMonitor.co2;
            document.getElementById('gasTemp').textContent = `${data.gasMonitor.temperatura}°C`;
            document.getElementById('gasHumidity').textContent = `${data.gasMonitor.humedad}%`;
        })
        .catch(error => console.error('Error:', error));
}

// Inicializar los gráficos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        updateChartsTheme();
    }
    initCharts();
    updateDashboard();
    // Actualizar el dashboard cada 5 minutos
    setInterval(updateDashboard, 2000);
});

