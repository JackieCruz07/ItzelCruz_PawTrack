const express = require("express");
const petsController = require("../controllers/pets.controller");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configuración de Multer para imágenes
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/img");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Usar el ID de la mascota en el nombre del archivo
    const petId = req.params.petId;
    const ext = path.extname(file.originalname);
    cb(null, `pet_${petId}_${Date.now()}${ext}`);
  }
});

// Configuración de Multer para documentos
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/documents");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Usar el ID de la mascota en el nombre del archivo
    const petId = req.params.petId;
    const ext = path.extname(file.originalname);
    cb(null, `doc_${petId}_${Date.now()}${ext}`);
  }
});

// Filtros de archivos
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

const documentFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten PDF, Word o imágenes'), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const api = express.Router();

// Rutas básicas para mascotas
api.get("/pets/categorized", petsController.getCategorized);
api.get("/pets", petsController.getPets);
api.get("/pets/:petId", petsController.getPetById);
api.post("/pets", petsController.addPet);
api.patch("/pets/:id", petsController.updatePet);
api.delete("/pets/:petId", petsController.deletePet);

// Rutas para la gestión de imágenes
api.post('/pets/upload/image/:petId', uploadImage.single("image"), petsController.uploadImage);
api.get('/pets/image/:petName', petsController.getPetImage);

// Rutas para la gestión de documentos
api.post("/pets/upload/document/:petId", uploadDocument.single("document"), petsController.uploadDocument);
api.get("/pets/:petName/documents", petsController.getPetDocuments);
api.delete("/pets/:petId/documents/:docId", petsController.deleteDocument);

module.exports = api;