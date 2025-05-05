const mongoose = require("mongoose");
const Pet = require("../models/pets.models");
const DatosPet = require("./DatosPet");
const { DB_NAME, DB_PORT, IP_SERVER } = require("../constantes");

// Configura la conexión a MongoDB
const uri = `mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`;
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar:", err));

// Función para guardar los datos
const savePets = async () => {
  try {
    // Combinar todas las mascotas en un solo array
    const allPets = [...DatosPet.Gato, ...DatosPet.Perro, ...DatosPet.Exotico];

    // Validar y limpiar datos antes de insertar
    const validPets = allPets.map((pet) => {
      // Asegurarse de que los documentos tengan la estructura correcta
      pet.documentos = pet.documentos.map((doc) => ({
        url: doc.url,
        name: doc.name || "Documento sin nombre",
        type: doc.type || "application/octet-stream",
      }));
      return pet;
    });

    // Insertar en MongoDB
    await Pet.insertMany(validPets);
    console.log("Datos guardados exitosamente en MongoDB");
  } catch (error) {
    console.error("Error al guardar datos:", error);
  } finally {
    // Cerrar conexión
    mongoose.connection.close();
  }
};

savePets();
