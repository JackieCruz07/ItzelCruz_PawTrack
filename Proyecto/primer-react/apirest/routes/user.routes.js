const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../Middleware/auth.Middleware");

// Rutas de usuario (solo accesibles para administradores)
router.get("/users", isAuth, isAdmin, userController.getAllUsers);
router.get("/users/:id", isAuth, isAdmin, userController.getUserById);
router.put("/users/:id", isAuth, isAdmin, userController.updateUser);
router.delete("/users/:id", isAuth, isAdmin, userController.deleteUser);
router.put("/users/:id/password", isAuth, isAdmin, userController.changePassword);

module.exports = router;