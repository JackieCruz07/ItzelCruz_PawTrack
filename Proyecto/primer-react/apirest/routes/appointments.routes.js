const express = require("express");
const appointmentsController = require("../controllers/appointments.controller");

const api = express.Router();

// Rutas CRUD básicas
api.post("/appointments", appointmentsController.createAppointment); 
api.get("/appointments", appointmentsController.getAppointments);
api.get("/appointments/:id", appointmentsController.getAppointmentById);
api.patch("/appointments/:id", appointmentsController.updateAppointment);
api.delete("/appointments/:id", appointmentsController.deleteAppointment);

// Rutas adicionales
api.patch("/appointments/:id/status", appointmentsController.changeAppointmentStatus);
api.get("/pets/:petId/appointments", appointmentsController.getAppointmentsByPet);

module.exports = api;