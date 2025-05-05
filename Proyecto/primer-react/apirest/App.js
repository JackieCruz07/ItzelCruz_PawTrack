const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const petsRoutes = require("./routes/pets.routes");
const appointmentsRoutes = require("./routes/appointments.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
//const avatarRoutes = require("./routes/avatar.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde otros orígenes
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para registrar las solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

// IMPORTANTE: Asegurar que las carpetas de uploads existan
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

createDirIfNotExists(path.join(__dirname, "uploads/img"));
createDirIfNotExists(path.join(__dirname, "uploads/documents"));
createDirIfNotExists(path.join(__dirname, "uploads/avatars"));

// Configurar carpetas estáticas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Usar las rutas definidas en petsRoutes
app.use("/api", petsRoutes);
app.use("/api", appointmentsRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//app.use("/api/avatars", avatarRoutes);

// Rutas directas para acceder a los archivos estáticos
app.get("/uploads/img/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", "img", fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Imagen no encontrada" });
  }
});

app.get("/uploads/avatars/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", "avatars", fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Avatar no encontrado" });
  }
});

app.get("/uploads/documents/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", "documents", fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Documento no encontrado" });
  }
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada"
  });
});

module.exports = app;