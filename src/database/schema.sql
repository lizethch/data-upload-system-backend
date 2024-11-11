CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INTEGER CHECK (age > 0),
    role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    password VARCHAR(255) NULL
);

-- Crear índice para el email ya que es un campo único y probablemente se harán búsquedas por él
CREATE INDEX idx_users_email ON users (email);