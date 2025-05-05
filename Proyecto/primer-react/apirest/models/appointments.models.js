const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  motivo: {
    type: String,
    required: true,
    trim: true
  },
  notas: {
    type: String,
    default: "",
    trim: true
  },
  estado: {
    type: String,
    enum: ["Programada", "Confirmada", "Cancelada", "Completada"],
    default: "Programada"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar la fecha de modificación
AppointmentSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;