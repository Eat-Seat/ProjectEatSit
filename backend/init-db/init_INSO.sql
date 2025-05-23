-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('cliente', 'restaurante')),
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  telefono VARCHAR(20)
);

-- Crear tabla de restaurantes
CREATE TABLE restaurantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES usuarios(id),
  capacidad INTEGER
);

-- Crear tabla de reservas
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  restaurante_id INTEGER NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  personas INTEGER NOT NULL CHECK (personas > 0),
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  user_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL
);
