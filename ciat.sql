-- Active: 1729383433379@@127.0.0.1@3306@tienda_pc
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ciat;

-- Usar la base de datos
USE ciat;

-- Tabla para calidad del aire
CREATE TABLE IF NOT EXISTS calidad_aire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para clima (temperatura y humedad)
CREATE TABLE IF NOT EXISTS clima (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperatura_c DECIMAL(5,2) NOT NULL,
    temperatura_f DECIMAL(5,2) NOT NULL,
    humedad DECIMAL(5,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para datos del gráfico de línea
CREATE TABLE IF NOT EXISTS grafico_linea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    elemento VARCHAR(50) NOT NULL,
    valor INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para medidor de gas
CREATE TABLE IF NOT EXISTS medidor_gas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    co2 INT NOT NULL,
    temperatura DECIMAL(5,2) NOT NULL,
    humedad DECIMAL(5,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo en calidad_aire
INSERT INTO calidad_aire (valor) VALUES 
(350), (320), (380), (400), (360);

-- Insertar datos de ejemplo en clima
INSERT INTO clima (temperatura_c, temperatura_f, humedad) VALUES 
(28.5, 83.3, 65.0),
(29.0, 84.2, 63.5),
(27.8, 82.0, 68.0),
(28.2, 82.8, 66.5),
(29.5, 85.1, 62.0);

-- Insertar datos de ejemplo en grafico_linea
INSERT INTO grafico_linea (elemento, valor) VALUES 
('Elemento 1', 20),
('Elemento 2', 25),
('Elemento 3', 22),
('Elemento 4', 35),
('Elemento 5', 30);

-- Insertar datos de ejemplo en medidor_gas
INSERT INTO medidor_gas (co2, temperatura, humedad) VALUES 
(508, 19.4, 56.3),
(520, 20.1, 55.8),
(495, 19.8, 57.2),
(515, 20.3, 54.9),
(502, 19.6, 56.7);