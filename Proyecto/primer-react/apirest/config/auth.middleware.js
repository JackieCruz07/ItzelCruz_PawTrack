const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { ENV } = require('../utils/Constantes');
const ErrorResponse = require('../utils/ErrorResponse');

// Proteger rutas
exports.authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Acceso no autorizado', 401));
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return next(new ErrorResponse('Token inválido', 401));
  }
};

// Autorizar por roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`El rol ${req.user.role} no tiene acceso a esta ruta`, 403)
      );
    }
    next();
  };
};