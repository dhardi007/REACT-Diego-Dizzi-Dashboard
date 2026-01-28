# Guía: Cambiar entre Registro Admin-Only y Registro Público

## Configuración Actual: SOLO ADMIN

Actualmente, **solo los administradores** pueden crear nuevos usuarios. Esto significa que:
- Un usuario debe estar autenticado como admin para acceder a `/register`
- El endpoint `POST /api/auth/register` requiere un token JWT válido con rol `admin`
- Los usuarios normales NO pueden auto-registrarse

## Cómo Cambiar a Registro Público (Cualquiera puede registrarse)

Si quieres permitir que **cualquier persona** pueda registrarse sin necesidad de ser admin, sigue estos pasos:

### 1. Modificar el Backend (`backend/routes/auth.js`)

**Ubicación**: Líneas 24-30

**ANTES (Solo Admin)**:
```javascript
router.post(
  '/register',
  authMiddleware,      // ← ELIMINAR ESTA LÍNEA
  adminMiddleware,     // ← ELIMINAR ESTA LÍNEA
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    // ... validaciones
  ],
  async (req, res) => {
    // ... código
  }
);
```

**DESPUÉS (Registro Público)**:
```javascript
router.post(
  '/register',
  // authMiddleware y adminMiddleware ELIMINADOS
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    // ELIMINAR validación de 'role' para evitar que usuarios se asignen admin
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // IMPORTANTE: Forzar role='user' para evitar escalación de privilegios
      const { name, email, password } = req.body;
      const role = 'user'; // ← SIEMPRE 'user', no permitir que el usuario lo elija

      // ... resto del código (verificar email, hash password, insertar)
    } catch (error) {
      // ... manejo de errores
    }
  }
);
```

### 2. Modificar el Frontend

#### A. Actualizar `AuthContext.jsx` (líneas 88-117)

**ANTES (Solo Admin)**:
```javascript
const register = async (name, email, password) => {
  setError(null);
  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ← ELIMINAR ESTA LÍNEA
      },
      body: JSON.stringify({ name, email, password }),
    });
    // ... resto
  }
};
```

**DESPUÉS (Registro Público)**:
```javascript
const register = async (name, email, password) => {
  setError(null);
  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization header ELIMINADO
      },
      body: JSON.stringify({ name, email, password }),
    });
    // ... resto
  }
};
```

#### B. Actualizar Rutas en `App.jsx`

**ANTES (Solo Admin)**:
```javascript
<Route path="/login" element={<Login />} />
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  {/* ... otras rutas */}
  <Route path="register" element={<Register />} /> {/* ← Dentro de rutas protegidas */}
</Route>
```

**DESPUÉS (Registro Público)**:
```javascript
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} /> {/* ← FUERA de rutas protegidas */}
<Route
  path="/"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  {/* ... otras rutas del dashboard */}
</Route>
```

#### C. Actualizar `Login.jsx` (añadir link a registro)

Añadir al final del formulario:
```javascript
{/* Footer */}
<div className="mt-6 text-center">
  <p className="text-white/70 text-sm">
    ¿No tienes cuenta?{' '}
    <Link to="/register" className="font-semibold text-white underline">
      Regístrate aquí
    </Link>
  </p>
</div>
```

#### D. Actualizar `Register.jsx`

Cambiar el texto descriptivo:
```javascript
<p className="text-white/80">Crea tu cuenta para acceder al dashboard</p>
```

Y añadir link de vuelta al login:
```javascript
<div className="mt-6 text-center">
  <p className="text-white/80 text-sm">
    ¿Ya tienes cuenta?{' '}
    <Link to="/login" className="text-white underline">
      Inicia sesión
    </Link>
  </p>
</div>
```

## Resumen de Cambios

| Aspecto | Solo Admin (Actual) | Registro Público |
|---------|---------------------|------------------|
| **Backend Middleware** | `authMiddleware` + `adminMiddleware` | Sin middlewares |
| **Frontend Auth Header** | Requiere token JWT | Sin token |
| **Ruta `/register`** | Dentro de `ProtectedRoute` | Pública (fuera de protección) |
| **Rol asignado** | Admin puede elegir | Siempre `'user'` |
| **Acceso** | Solo admins logueados | Cualquier persona |

## Seguridad Importante

⚠️ **Si habilitas registro público**, asegúrate de:

1. **Forzar `role='user'`** en el backend (nunca confiar en el cliente)
2. **Implementar rate limiting** para evitar spam de registros
3. **Añadir CAPTCHA** si es necesario
4. **Validar emails** con confirmación por correo (opcional pero recomendado)
5. **Implementar políticas de contraseñas fuertes**

## Usuario Admin por Defecto

Para crear el primer usuario admin, ejecuta:

```bash
# 1. Generar hash de contraseña
cd backend
node scripts/generate-admin-hash.js

# 2. Copiar el hash generado

# 3. Ejecutar SQL en PostgreSQL
docker compose exec db psql -U postgres -d dashboard_db

# 4. Insertar admin (reemplaza <HASH> con el hash generado)
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@dashboard.com', '<HASH>', 'admin');
```

O ejecuta directamente el script de inicialización:
```bash
docker compose exec db psql -U postgres -d dashboard_db < backend/init-db.sql
```

**Credenciales por defecto**:
- Email: `admin@dashboard.com`
- Password: `admin123` (¡cámbiala en producción!)
