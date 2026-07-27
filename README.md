# 📌 Dizzi Dashboard (Componentes de React)

<p align="center">
  <a href="https://react-dashboard-ten-delta.vercel.app/">
    <img src="https://img.shields.io/badge/LIVE-React_Dashboard-8A2BE2?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <a href="https://proyecto-app-mcsd.vercel.app/">
    <img src="https://img.shields.io/badge/MCSD-Manual_Conducción-00d9ff?style=for-the-badge&logo=vercel" alt="MCSD" />
  </a>
  <a href="https://fc-tic-service-github-6c-diego-05.vercel.app/">
    <img src="https://img.shields.io/badge/Tics_Service-Papelería-Center-7952B3?style=for-the-badge&logo=vercel" alt="Tics Service" />
  </a>
</p>

Hice uso de react-router-dom para enlazar proyectos.
https://youtu.be/AXzuRJhAu_s?si=V1xwPuRQEJBvMCWj

Para más detalles sobre la configuración, consulta el [README del react-router](https://github.com/remix-run/react-router#readme).

¡Hola! Esta es una aplicación desarrollada con React, un clon de la sección de testimonios, calculadora, contador, TO DO LIST, recreadas por mi, en un solo proyecto. Personalmente fue estresante crear esta aplicación, ya que no tenía una idea de cómo se podría estructurar el código y me resultaba difícil de seguir, pero ahí resolví. 🥷

Esta aplicación fue creada por [Estefania Cassingena Navone](https://twitter.com/EstefaniaCassN) para el curso [Aprende React Desde Cero](https://www.youtube.com/watch?v=6Jfk8ic3KVk) publicado en el canal de YouTube freeCodeCamp Español. Su estructura inicial fue creada con el comando `npx create-react-app`.

## 🚀 Deploy Options

| Plataforma | Config | Comando | Live |
|------------|--------|---------|------|
| **Vercel** | `vercel.json` | `vercel --prod` | [react-dashboard](https://react-dashboard-ten-delta.vercel.app/) |
| **Netlify** | `netlify.toml` | `netlify deploy --prod --dir=build` | — |
| **Docker** | `Dockerfile` + `nginx.conf` | `docker build -t dashboard . && docker run -p 80:80 dashboard` | — |

> **Migrado de CRA a Vite** — el build se ejecuta desde `frontend/` con `vite build`.

## Ejecutar la Aplicación

```bash
cd frontend
npm install
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`.

> El proyecto fue migrado de CRA a Vite. El `package.json` está en `frontend/`, no en la raíz.

## Build para Producción

```bash
cd frontend
npm run build
```

El build se genera en `frontend/build/`.

## Aprende React

Si deseas aprender React, te invitamos a tomar nuestro [curso gratuito de React (8 horas)](https://www.youtube.com/watch?v=6Jfk8ic3KVk) en el canal de YouTube de freeCodeCamp en Español.
