const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constantes");

// Middleware para verificar si el usuario está autenticado
exports.isAuth = (req, res, next) => {
  // Obtener el token del header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No se proporcionó token de autenticación",
    });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    
    // Guardar la información del usuario en el request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });
  }
};

// Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      ok: false,
      message: "Acceso denegado. Se requiere rol de administrador",
    });
  }
  
  next();
};