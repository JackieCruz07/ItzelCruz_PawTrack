const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "avatar-" + uniqueSuffix + ext);
  }
});

// Filtro para validar tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Tipo de archivo no soportado. Solo se permiten JPG, JPEG, PNG y GIF"),
      false
    );
  }
};

// Configurar middleware de multer
exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

/**
 * Subir avatar de usuario
 * Acceso: El propio usuario o admin
 */
exports.uploadAvatar = async (req, res) => {
  try {
    // Verificar si hay archivo
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se ha seleccionado ningún archivo"
      });
    }

    const userId = req.params.id;
    
    // Verificar permisos
    if (req.userId !== userId && req.userRole !== "admin") {
      // Eliminar archivo si no tiene permisos
      fs.unlinkSync(req.file.path);
      
      return res.status(403).json({
        success: false,
        message: "No tiene permisos para actualizar este avatar"
      });
    }

    // Buscar usuario
    const user = await User.findById(userId);
    if (!user) {
      // Eliminar archivo si no existe el usuario
      fs.unlinkSync(req.file.path);
      
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // Si ya existe un avatar, eliminar el anterior
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, "../", user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Actualizar referencia del avatar en el usuario
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar actualizado correctamente",
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Error al subir avatar:", error);
    
    // Si hubo un error y se subió un archivo, eliminarlo
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: "Error al subir avatar",
      error: error.message
    });
  }
};