const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authController = require("../controllers/auth.controller");
const { isAuth } = require("../Middleware/auth.Middleware");

// Configuración de Multer para subir avatares
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif)"
      )
    );
  },
});

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuth, authController.getMe);
router.post(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = router;