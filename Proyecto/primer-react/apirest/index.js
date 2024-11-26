const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

let DatosPet = require('./bd/DatosPet.js');

const app = express();
const port = 4000;

// Configuraciones de middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS flexible
const corsOptions = {
    origin: "*", // solicitudes desde cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Middleware de logging para depuración
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Endpoint de prueba
app.get("/mensaje", (req, res) => {
    res.send("Servidor ejecutado correctamente");
});

// Endpoint para obtener datos de mascotas
app.get('/api/pets', (req, res) => {
    try {
        // Añadimos un ID a cada mascota si no lo tiene
        const petsWithId = DatosPet.map(pet => ({
            ...pet,
            id: pet.id || uuidv4()
        }));
        res.json(petsWithId);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mascotas", error: error.message });
    }
});

// Endpoint para agregar una nueva mascota
app.post('/api/pets', (req, res) => {
    try {
        const { nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen } = req.body;
        
        const newPet = { 
            id: uuidv4(), 
            nombre, 
            dueño, 
            especie, 
            raza, 
            fechaNacimiento, 
            edad, 
            diagnosticos, 
            tratamientosPrevios, 
            vacunas, 
            alergias, 
            imagen 
        };
        
        DatosPet.push(newPet);  
        res.status(201).json(newPet);
    } catch (error) {
        res.status(500).json({ message: "Error al crear mascota", error: error.message });
    }
});

// Endpoint para actualizar una mascota existente
app.put('/api/pets/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updatedPet = req.body;
    
        const petIndex = DatosPet.findIndex((pet) => pet.id === id);
        if (petIndex === -1) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
    
        DatosPet[petIndex] = { ...DatosPet[petIndex], ...updatedPet };
        res.json(DatosPet[petIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar mascota", error: error.message });
    }
});

// Endpoint para eliminar una mascota
app.delete('/api/pets/:id', (req, res) => {
    try {
        const { id } = req.params;
        const petIndex = DatosPet.findIndex((pet) => pet.id === id);
    
        if (petIndex === -1) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
    
        DatosPet.splice(petIndex, 1);
        res.status(200).json({ message: 'Mascota eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar mascota", error: error.message });
    }
});

// Configurar carpeta estática con control de caché
app.use('/uploads', express.static('uploads', {
    etag: false,
    maxAge: '0',
}));

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/api/pets/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }
    res.json({ 
        message: 'Imagen subida con éxito', 
        file: {
            filename: req.file.filename,
            path: req.file.path
        } 
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutado en el puerto ${port}`);
});

module.exports = app;