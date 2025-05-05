const fs = require("fs");
const path = require("path");
const Pet = require("../models/pets.models");

// Función para agregar una nueva mascota
async function addPet(req, res) {
  try {
    const newPet = new Pet({
      nombre: req.body.nombre,
      dueño: req.body.dueño,
      especie: req.body.especie,
      raza: req.body.raza || "Desconocida",
      fechaNacimiento: req.body.fechaNacimiento || null,
      diagnosticos: req.body.diagnosticos || "",
      tratamientosPrevios: req.body.tratamientosPrevios || "",
      vacunas: req.body.vacunas || "",
      alergias: req.body.alergias || "",
      imagen: req.body.imagen || "",
      documentos: [],
    });

    const savedPet = await newPet.save();
    res.status(201).json({
      success: true,
      message: "Mascota añadida exitosamente",
      pet: savedPet,
    });
  } catch (error) {
    console.error("Error en addPet:", error);
    res.status(500).json({
      success: false,
      message: "Error al agregar la mascota",
      error: error.message,
    });
  }
}

async function getPetById(req, res) {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ success: false, message: "Mascota no encontrada" });
    }

    res.status(200).json({
      success: true,
      pet: pet
    });
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener mascota",
      error: error.message
    });
  }
}

// Función para obtener mascotas categorizadas por especie
async function getCategorized(req, res) {
  try {
    const pets = await Pet.find();
    const categorizedPets = {};

    pets.forEach((pet) => {
      if (!categorizedPets[pet.especie]) {
        categorizedPets[pet.especie] = [];
      }
      categorizedPets[pet.especie].push(pet);
    });

    Object.keys(categorizedPets).forEach((category) => {
      categorizedPets[category].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
    });

    res.json(categorizedPets);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener mascotas categorizadas",
      error: error.message,
    });
  }
}

// Función para obtener mascotas por especie o todas
async function getPets(req, res) {
  try {
    const { especie } = req.query;
    const query = especie ? { especie } : {};
    const pets = await Pet.find(query);
    res.json(pets);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener mascotas",
      error: error.message,
    });
  }
}

// Función para obtener una mascota por nombre
async function getPetByName(req, res) {
  try {
    const petName = req.params.petName;
    const pet = await Pet.findOne({ nombre: petName });

    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener mascota",
      error: error.message,
    });
  }
}

// Función para subir imágenes asociadas a mascotas
async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No se proporcionó imagen" });
    }

    const petId = req.params.petId;
    
    // Crear la ruta relativa para guardar en MongoDB
    const relativePath = `/uploads/img/${req.file.filename}`;

    const pet = await Pet.findByIdAndUpdate(
      petId,
      { imagen: relativePath },
      { new: true }
    );

    if (!pet) {
      // Si no se encuentra la mascota, eliminar el archivo subido
      fs.unlinkSync(path.join(__dirname, "..", "uploads", "img", req.file.filename));
      return res.status(404).json({ success: false, message: "Mascota no encontrada" });
    }

    res.json({
      success: true,
      message: "Imagen subida correctamente",
      imageUrl: relativePath,
      pet: pet,
    });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, "..", "uploads", "img", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    console.error("Error al subir imagen:", error);
    res.status(500).json({
      success: false,
      message: "Error al subir imagen",
      error: error.message,
    });
  }
}

// Función para obtener la imagen de una mascota
async function getPetImage(req, res) {
  try {
    const petName = req.params.petName;
    const pet = await Pet.findOne({ nombre: petName });

    if (!pet || !pet.imagen) {
      return res.status(404).json({
        success: false,
        message: "Imagen no encontrada",
      });
    }

    res.json({
      url: pet.imagen,
      name: pet.nombre,
      type: "image/jpeg", // Se podría determinar dinámicamente según la extensión
    });
  } catch (error) {
    console.error("Error al obtener imagen:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener imagen",
      error: error.message,
    });
  }
}

// Función para subir documentos asociados a mascotas
async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No se proporcionó documento" });
    }

    const petId = req.params.petId;
    // Crear la ruta relativa para guardar en MongoDB
    const relativePath = `/uploads/documents/${req.file.filename}`;

    const document = {
      url: relativePath,
      name: req.file.originalname,
      type: req.file.mimetype,
      createdAt: new Date(),
    };

    const pet = await Pet.findByIdAndUpdate(
      petId,
      { $push: { documentos: document } },
      { new: true }
    );

    if (!pet) {
      // Si no se encuentra la mascota, eliminar el archivo subido
      fs.unlinkSync(path.join(__dirname, "..", "uploads", "documents", req.file.filename));
      return res.status(404).json({ success: false, message: "Mascota no encontrada" });
    }

    res.json({
      success: true,
      message: "Documento subido correctamente",
      document: document,
      pet: pet,
    });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, "..", "uploads", "documents", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    console.error("Error al subir documento:", error);
    res.status(500).json({
      success: false,
      message: "Error al subir documento",
      error: error.message,
    });
  }
}

// Función para obtener documentos de una mascota
async function getPetDocuments(req, res) {
  try {
    const petName = req.params.petName;
    const pet = await Pet.findOne({ nombre: petName });

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Mascota no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      documents: pet.documentos || [],
    });
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener documentos",
      error: error.message,
    });
  }
}

// Función para eliminar una mascota
async function deletePet(req, res) {
  try {
    const petId = req.params.petId;

    // Verificar si la mascota existe
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Mascota no encontrada" });
    }

    // Eliminar la imagen si existe
    if (pet.imagen) {
      const imagePath = path.join(__dirname, "..", pet.imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Eliminar documentos si existen
    if (pet.documentos && pet.documentos.length > 0) {
      pet.documentos.forEach(doc => {
        const docPath = path.join(__dirname, "..", doc.url);
        if (fs.existsSync(docPath)) {
          fs.unlinkSync(docPath);
        }
      });
    }

    // Eliminar la mascota
    await Pet.findByIdAndDelete(petId);

    res.status(200).json({ success: true, message: "Mascota eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    res.status(500).json({ success: false, message: "Error al eliminar mascota", error: error.message });
  }
}

// Función para actualizar una mascota
async function updatePet(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Encuentra y actualiza la mascota
    const updatedPet = await Pet.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json({
      success: true,
      message: "Mascota actualizada con éxito",
      pet: updatedPet,
    });
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar la mascota",
      error: error.message,
    });
  }
}

// Función para eliminar un documento asociado a una mascota
async function deleteDocument(req, res) {
  try {
    const { petId, docId } = req.params;

    // Encuentra la mascota por ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    // Encuentra el documento en la lista de documentos
    const documentIndex = pet.documentos.findIndex((doc) => doc._id.toString() === docId);

    if (documentIndex === -1) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }

    // Elimina el archivo del sistema de archivos
    const documentPath = path.join(__dirname, "..", pet.documentos[documentIndex].url);
    if (fs.existsSync(documentPath)) {
      fs.unlinkSync(documentPath);
    }

    // Elimina el documento de la lista
    pet.documentos.splice(documentIndex, 1);
    await pet.save();

    res.status(200).json({
      success: true,
      message: "Documento eliminado con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar documento",
      error: error.message,
    });
  }
}

module.exports = {
  addPet,
  getPetById,
  getCategorized,
  getPets,
  getPetByName,
  uploadImage,
  getPetImage,
  uploadDocument,
  getPetDocuments,
  deletePet,
  updatePet,
  deleteDocument,
};