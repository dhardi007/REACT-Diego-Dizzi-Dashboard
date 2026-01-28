const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación JWT
 * Verifica que el token sea válido y añade el usuario al request
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No autorizado. Token no proporcionado.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir usuario al request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(500).json({ error: 'Error en autenticación' });
  }
};

/**
 * Middleware para verificar rol de admin
 * Debe usarse después de authMiddleware
 */
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado. Se requiere rol de administrador.'
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
