CREATE SCHEMA IF NOT EXISTS cakestore;

SET search_path to cakestore;

CREATE TABLE Logins (
    id_usuario SERIAL PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    rut VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
    trabaja_desde_fecha DATE NOT NULL
);

CREATE TABLE Clientes (
    rut VARCHAR(255) PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_de_nacimiento DATE NOT NULL
);

CREATE TABLE Registro_de_ventas (
    id_gestion SERIAL PRIMARY KEY,
    rut_comprador VARCHAR(255) NOT NULL,
    gestionado_por INT NOT NULL,
    monto INT NOT NULL,
    fecha_de_compra DATE NOT NULL,
    metodo_de_pago VARCHAR(255) NOT NULL,
	calificacion INT,
	comentarios VARCHAR(255),
    FOREIGN KEY(gestionado_por) REFERENCES Logins(id_usuario),
    FOREIGN KEY(rut_comprador) REFERENCES Clientes(rut)
);