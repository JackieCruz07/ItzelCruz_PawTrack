const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constantes");

// Generar JWT
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Validaciones
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios"
      });
    }

    // Verificar formato de email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: "Formato de correo electrónico inválido"
      });
    }

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        message: "El correo electrónico ya está registrado"
      });
    }

    // Crear nuevo usuario
    const user = new User({
      name,
      lastName,
      email,
      password,
      role: "user"
    });

    await user.save();

    // Generar token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      ok: false,
      message: error.code === 11000 
        ? "El correo electrónico ya está registrado" 
        : "Error al registrar usuario",
      error: error.message
    });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email y seleccionar también la contraseña
    const user = await User.findOne({ email }).select("+password");

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    // Verificar si el usuario está activo
    if (!user.active) {
      return res.status(401).json({
        ok: false,
        message: "Usuario desactivado",
      });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      ok: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

// Obtener información del usuario autenticado
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener información del usuario",
      error: error.message,
    });
  }
};

// Actualizar avatar del usuario
exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const avatar = req.file ? req.file.filename : null;

    if (!avatar) {
      return res.status(400).json({
        ok: false,
        message: "No se ha proporcionado una imagen",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Avatar actualizado correctamente",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error al actualizar avatar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar avatar",
      error: error.message,
    });
  }
};