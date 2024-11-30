<?php
header('Content-Type: application/json');

$host = 'localhost';
$db   = 'ciat';
$user = 'root';
$pass = '';
$port = "3306";

$link = mysqli_connect($host, $user, $pass, $db, $port);

if (!$link) {
    echo json_encode(['error' => 'Connection failed: ' . mysqli_connect_error()]);
    exit;
}

try {
    $num1 = rand(1, 6);

    // Obtener datos de calidad del aire
    $result = mysqli_query($link, "SELECT valor FROM calidad_aire WHERE id = '$num1'");
    $airQuality = mysqli_fetch_assoc($result)['valor'];

    // Obtener datos de temperatura y humedad
    $result = mysqli_query($link, "SELECT temperatura_c, temperatura_f, humedad FROM clima WHERE id = '$num1'");
    $climate = mysqli_fetch_assoc($result);

    // Obtener datos para el gráfico de línea
    $result = mysqli_query($link, "SELECT elemento, valor FROM grafico_linea ORDER BY fecha DESC LIMIT 5");
    $lineData = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $lineData[] = $row;
    }

    // Obtener datos del medidor de gas
    $result = mysqli_query($link, "SELECT co2, temperatura, humedad FROM medidor_gas WHERE id = '$num1'");
    $gasMonitor = mysqli_fetch_assoc($result);

    $data = [
        'airQuality' => $airQuality,
        'temperature' => [
            'celsius' => $climate['temperatura_c'],
            'fahrenheit' => $climate['temperatura_f']
        ],
        'humidity' => $climate['humedad'],
        'lineData' => $lineData,
        'gasMonitor' => $gasMonitor,
        'numeroconsulta' => $num1
    ];

    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    mysqli_close($link);
}