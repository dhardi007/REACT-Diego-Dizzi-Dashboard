#!/bin/bash

# Script para inicializar la base de datos del dashboard
# Ejecutar: ./setup-database.sh

echo "🚀 Inicializando base de datos del Dashboard..."

# Verificar que Docker esté corriendo
if ! docker compose ps | grep -q "Up"; then
    echo "⚠️  Docker Compose no está corriendo. Iniciando servicios..."
    docker compose up -d
    echo "⏳ Esperando a que los servicios estén listos..."
    sleep 10
fi

# Ejecutar script de inicialización
echo "📊 Creando tablas y usuario admin..."
docker compose exec -T db psql -U postgres -d dashboard_db < backend/init-db.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de datos inicializada correctamente!"
    echo ""
    echo "🔑 Credenciales de acceso:"
    echo "   Email: admin@dashboard.com"
    echo "   Password: admin123"
    echo ""
    echo "🌐 Accede al dashboard en: http://localhost:3000"
else
    echo "❌ Error al inicializar la base de datos"
    exit 1
fi
