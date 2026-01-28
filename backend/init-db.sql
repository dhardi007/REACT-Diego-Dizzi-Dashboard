-- Inicialización de la base de datos para autenticación
-- Ejecutar: docker exec -i <postgres-container> psql -U postgres -d dashboard_db < init-db.sql

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice en email para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insertar usuario admin por defecto (password: admin123)
-- Hash generado con bcrypt rounds=10: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (name, email, password, role)
VALUES (
  'Admin',
  'admin@dashboard.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Nota: Cambiar la contraseña del admin después del primer login
-- El hash real se generará cuando ejecutemos el backend por primera vez
