// Configuración de la base de datos
const DB_USER = process.env.DB_USER || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_NAME = process.env.DB_NAME || "pets";
const DB_PORT = process.env.DB_PORT || "27017";
const IP_SERVER = process.env.IP_SERVER || "localhost";

// Configuración general de la aplicación
const MONGO_URI = process.env.MONGO_URI || 
  `mongodb://${DB_USER}:${DB_PASSWORD}@${IP_SERVER}:${DB_PORT}/${DB_NAME}?authSource=admin`;

module.exports = {
  // Configuración de MongoDB
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  IP_SERVER,
  MONGO_URI,
  
  // Configuración del servidor
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  BASE_API: process.env.BASE_API || '/api',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Configuración de autenticación
  JWT_SECRET: process.env.JWT_SECRET || 'secret123',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30
};