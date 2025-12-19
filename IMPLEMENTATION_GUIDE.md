# 🚀 React Dashboard FullStack (Dockerized)

Este proyecto ha sido modernizado a una arquitectura de microservicios utilizando Docker.

## 📂 Estructura del Proyecto

*   **`frontend/`**: Aplicación React (Puerto 3000).
*   **`backend/`**: API Express + Node.js (Puerto 5000).
*   **`docker-compose.yml`**: Orquestación de contenedores (Frontend, Backend, Base de Datos).
*   **PostgreSQL**: Base de datos persistente (Puerto 5432).

## 🛠️ Cómo Iniciar la Aplicación

### Prerrequisitos
1.  Tener **Docker Desktop** instalado y **CORRIENDO** (Debes ver el icono de la ballena verde/blanco en la barra de tareas).

### Pasos
1.  Abre una terminal en la carpeta del proyecto.
2.  Ejecuta el siguiente comando para construir y levantar todo:
    ```bash
    docker-compose up --build
    ```
3.  Espera a que termine. Verás logs de "Connected to database" y "webpack compiled successfully".

## 🌍 Acceso

*   **Frontend (Dashboard):** [http://localhost:3000](http://localhost:3000)
*   **Backend (API):** [http://localhost:5000](http://localhost:5000)
*   **Base de Datos:** Accesible externamente en `localhost:5432` (Usuario: `postgres`, Password: `password`, DB: `dashboard_db`).

## 🐛 Solución de Problemas Comunes

*   **Error: `error during connect... system cannot find the file specified`**:
    *   Significa que Docker Desktop no está abierto. Ábrelo y espera unos segundos.
*   **El frontend no carga**:
    *   Asegúrate de que el contenedor haya terminado de compilar (puede tardar la primera vez).
*   **Error de conexión a la BD**:
    *   El backend espera unos segundos a que la BD esté lista, pero si falla, reinicia el contenedor con `docker-compose restart backend`.
