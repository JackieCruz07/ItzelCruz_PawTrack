const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const app = express();
const port = 4000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ic_071205',
  database: 'datospet'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Configuraciones de middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS flexible
const corsOptions = {
  origin: '*', // solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware de logging para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Endpoint de prueba
app.get('/mensaje', (req, res) => {
  res.send('Servidor ejecutado correctamente');
});

// Endpoint para obtener todas las mascotas de una especie específica
app.get('/api/pets', (req, res) => {
  const { especie } = req.query;
  let query;

  if (especie === 'dogs') {
    query = 'SELECT * FROM dogs';
  } else if (especie === 'cats') {
    query = 'SELECT * FROM cats';
  } else if (especie === 'exotics') {
    query = 'SELECT * FROM exotics';
  } else {
    return res.status(400).json({ message: 'Especie no válida' });
  }

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener mascotas', error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para agregar una nueva mascota
app.post('/api/pets', (req, res) => {
  const { nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen } = req.body;
  const id = uuidv4();
  let query;
  const values = [id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen];

  if (especie === 'dogs') {
    query = 'INSERT INTO dogs (id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  } else if (especie === 'cats') {
    query = 'INSERT INTO cats (id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  } else if (especie === 'exotics') {
    query = 'INSERT INTO exotics (id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  } else {
    return res.status(400).json({ message: 'Especie no válida' });
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al agregar mascota', error: err.message });
    }
    res.status(201).json({ id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen });
  });
});

// Endpoint para actualizar una mascota existente
app.put('/api/pets/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen } = req.body;
  let query;
  const values = [nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen, id];

  if (especie === 'dogs') {
    query = 'UPDATE dogs SET nombre = ?, dueño = ?, especie = ?, raza = ?, fechaNacimiento = ?, edad = ?, diagnosticos = ?, tratamientosPrevios = ?, vacunas = ?, alergias = ?, imagen = ? WHERE id = ?';
  } else if (especie === 'cats') {
    query = 'UPDATE cats SET nombre = ?, dueño = ?, especie = ?, raza = ?, fechaNacimiento = ?, edad = ?, diagnosticos = ?, tratamientosPrevios = ?, vacunas = ?, alergias = ?, imagen = ? WHERE id = ?';
  } else if (especie === 'exotics') {
    query = 'UPDATE exotics SET nombre = ?, dueño = ?, especie = ?, raza = ?, fechaNacimiento = ?, edad = ?, diagnosticos = ?, tratamientosPrevios = ?, vacunas = ?, alergias = ?, imagen = ? WHERE id = ?';
  } else {
    return res.status(400).json({ message: 'Especie no válida' });
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar mascota', error: err.message });
    }
    res.json({ id, nombre, dueño, especie, raza, fechaNacimiento, edad, diagnosticos, tratamientosPrevios, vacunas, alergias, imagen });
  });
});

// Endpoint para eliminar una mascota
app.delete('/api/pets/:id', (req, res) => {
  const { id } = req.params;
  const { especie } = req.body;
  let query;

  if (especie === 'dogs') {
    query = 'DELETE FROM dogs WHERE id = ?';
  } else if (especie === 'cats') {
    query = 'DELETE FROM cats WHERE id = ?';
  } else if (especie === 'exotics') {
    query = 'DELETE FROM exotics WHERE id = ?';
  } else {
    return res.status(400).json({ message: 'Especie no válida' });
  }

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar mascota', error: err.message });
    }
    res.status(200).json({ message: 'Mascota eliminada con éxito' });
  });
});

// Configurar carpeta estática con control de caché
app.use(
  '/uploads',
  express.static('uploads', {
    etag: false,
    maxAge: '0',
  })
);

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
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
      path: req.file.path,
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutado en el puerto ${port}`);
});

module.exports = app;
