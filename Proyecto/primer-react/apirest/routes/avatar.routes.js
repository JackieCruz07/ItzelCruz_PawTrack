const express = require("express");
const router = express.Router();
const avatarController = require("../controllers/avatar.controller");
const { protect } = require("../middleware/auth.middleware");

// Todas las rutas requieren autenticación
router.use(protect);

// Ruta para subir avatar
router.post("/:id", avatarController.upload.single("avatar"), avatarController.uploadAvatar);

module.exports = router;