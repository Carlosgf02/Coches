-- Crear la base de datos
CREATE DATABASE coches_db;
USE coches_db;

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    pais VARCHAR(100),  -- Cadena de texto
    fundacion YEAR,  -- Fecha
    activo BOOLEAN DEFAULT TRUE,  -- Booleano
    logo VARCHAR(255),  -- Cadena de texto
    valor_mercado DECIMAL(15,2) -- Real (millones de dólares)
);

-- Crear la tabla de Modelos
CREATE TABLE modelos (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,  -- Entero
    nombre VARCHAR(100) NOT NULL,  -- Cadena de texto
    tipo VARCHAR(50),  -- Cadena de texto
    precio DECIMAL(10,2),  -- Real
    fecha_lanzamiento DATE,  -- Fecha
    disponible BOOLEAN DEFAULT TRUE,  -- Booleano
    potencia_hp INT,  -- Entero
    consumo_litros FLOAT,  -- Real
    id_marca INT,  -- Entero (FK)
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca) ON DELETE CASCADE
);

-- Insertar modelos para Toyota
INSERT INTO modelos (nombre, tipo, precio, fecha_lanzamiento, disponible, potencia_hp, consumo_litros, id_marca) VALUES
('Corolla', 'Sedán', 22000.00, '2022-03-15', TRUE, 139, 6.5, 1),
('RAV4', 'SUV', 28000.00, '2023-06-10', TRUE, 203, 7.1, 1);

-- Insertar modelos para Ford
INSERT INTO modelos (nombre, tipo, precio, fecha_lanzamiento, disponible, potencia_hp, consumo_litros, id_marca) VALUES
('Mustang', 'Deportivo', 55000.00, '2021-09-20', TRUE, 450, 10.2, 2),
('F-150', 'Pickup', 40000.00, '2022-11-05', TRUE, 400, 9.5, 2);

-- Insertar modelos para BMW
INSERT INTO modelos (nombre, tipo, precio, fecha_lanzamiento, disponible, potencia_hp, consumo_litros, id_marca) VALUES
('Serie 3', 'Sedán', 45000.00, '2023-02-25', TRUE, 255, 7.8, 3),
('X5', 'SUV', 65000.00, '2022-08-14', TRUE, 335, 8.9, 3);

-- Insertar modelos para Ferrari
INSERT INTO modelos (nombre, tipo, precio, fecha_lanzamiento, disponible, potencia_hp, consumo_litros, id_marca) VALUES
('488 Spider', 'Deportivo', 280000.00, '2020-06-30', TRUE, 661, 14.2, 4),
('SF90 Stradale', 'Híbrido', 500000.00, '2021-10-05', TRUE, 986, 10.5, 4);

-- Insertar modelos para Hyundai
INSERT INTO modelos (nombre, tipo, precio, fecha_lanzamiento, disponible, potencia_hp, consumo_litros, id_marca) VALUES
('Tucson', 'SUV', 27000.00, '2023-05-12', TRUE, 187, 7.4, 5),
('Elantra', 'Sedán', 21000.00, '2022-04-08', TRUE, 147, 6.2, 5);

