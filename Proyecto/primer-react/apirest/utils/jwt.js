const jwt = require("jsonwebtoken");

// Clave secreta para JWT - en producción usa variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || "tuClaveSecreta12345";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d"; // 7 días por defecto

/**
 * Genera un token JWT para el usuario
 * @param {Object} user - Objeto con la información del usuario
 * @returns {String} Token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};

/**
 * Verifica y decodifica un token JWT
 * @param {String} token - Token JWT a verificar
 * @returns {Object|null} Payload decodificado o null si es inválido
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  JWT_SECRET,
};