const Appointment = require("../models/appointments.models");
const Pet = require("../models/pets.models");

// Crear una nueva cita
async function createAppointment(req, res) {
  try {
    const { mascotaId, fecha, hora, motivo, notas } = req.body;

    // Verificar que la mascota existe
    const pet = await Pet.findById(mascotaId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Mascota no encontrada"
      });
    }

    // Crear la nueva cita
    const newAppointment = new Appointment({
      mascota: mascotaId,
      fecha,
      hora,
      motivo,
      notas: notas || "",
      estado: "Programada"
    });

    const savedAppointment = await newAppointment.save();

    // Poblar la información de la mascota en la respuesta
    const populatedAppointment = await Appointment.findById(savedAppointment._id)
      .populate("mascota");

    res.status(201).json({
      success: true,
      message: "Cita agendada exitosamente",
      appointment: populatedAppointment
    });
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({
      success: false,
      message: "Error al agendar la cita",
      error: error.message
    });
  }
}

// Obtener todas las citas
async function getAppointments(req, res) {
  try {
    const { estado, fecha, mascotaId } = req.query;
    
    // Construir el query basado en los filtros
    const query = {};
    
    if (estado) {
      query.estado = estado;
    }
    
    if (fecha) {
      // Formato esperado: YYYY-MM-DD
      const startDate = new Date(fecha);
      const endDate = new Date(fecha);
      endDate.setDate(endDate.getDate() + 1);
      
      query.fecha = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    if (mascotaId) {
      query.mascota = mascotaId;
    }
    
    const appointments = await Appointment.find(query)
      .populate("mascota")
      .sort({ fecha: 1, hora: 1 }); // Ordenar por fecha y hora
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las citas",
      error: error.message
    });
  }
}

// Obtener una cita por ID
async function getAppointmentById(req, res) {
  try {
    const appointmentId = req.params.id;
    
    const appointment = await Appointment.findById(appointmentId)
      .populate("mascota");
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada"
      });
    }
    
    res.status(200).json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error("Error al obtener cita por ID:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la cita",
      error: error.message
    });
  }
}

// Actualizar una cita
async function updateAppointment(req, res) {
  try {
    const appointmentId = req.params.id;
    const updates = req.body;
    
    // Si se está actualizando la mascota, verificar que existe
    if (updates.mascotaId) {
      const pet = await Pet.findById(updates.mascotaId);
      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Mascota no encontrada"
        });
      }
      // Actualizar el ID de mascota en el formato correcto para el modelo
      updates.mascota = updates.mascotaId;
      delete updates.mascotaId;
    }
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updates,
      { new: true }
    ).populate("mascota");
    
    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Cita actualizada exitosamente",
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar la cita",
      error: error.message
    });
  }
}

// Cambiar el estado de una cita
async function changeAppointmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    // Validar que el estado sea uno de los permitidos
    const estadosValidos = ["Programada", "Confirmada", "Cancelada", "Completada"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: "Estado inválido"
      });
    }
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    ).populate("mascota");
    
    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada"
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Cita ${estado.toLowerCase()} exitosamente`,
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error("Error al cambiar estado de cita:", error);
    res.status(500).json({
      success: false,
      message: "Error al cambiar el estado de la cita",
      error: error.message
    });
  }
}

// Eliminar una cita
async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    
    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Cita eliminada exitosamente"
    });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar la cita",
      error: error.message
    });
  }
}

// Obtener citas por mascota
async function getAppointmentsByPet(req, res) {
  try {
    const { petId } = req.params;
    
    // Verificar que la mascota existe
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Mascota no encontrada"
      });
    }
    
    const appointments = await Appointment.find({ mascota: petId })
      .populate("mascota")
      .sort({ fecha: 1, hora: 1 });
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error("Error al obtener citas por mascota:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las citas de la mascota",
      error: error.message
    });
  }
}

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  changeAppointmentStatus,
  deleteAppointment,
  getAppointmentsByPet
};