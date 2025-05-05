const mongoose = require("mongoose");

const DocumentoSchema = new mongoose.Schema({
  url: { type: String},
  name: { type: String},
  type: { type: String},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PetSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true
  },
  dueño: {
    type: String,
    trim: true
  },
  especie: {
    type: String,
    enum: ["Perro", "Gato", "Exotico"]
  },
  raza: {
    type: String,
    default: "Desconocida"
  },
  fechaNacimiento: {
    type: Date,
    default: null
  },
  edad: String,
  diagnosticos: {
    type: String,
    default: ""
  },
  tratamientosPrevios: {
    type: String,
    default: ""
  },
  vacunas: {
    type: String,
    default: ""
  },
  alergias: {
    type: String,
    default: ""
  },
  imagen: {
    type: String,
    default: ""
  },
  documentos: {
    type: [DocumentoSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
