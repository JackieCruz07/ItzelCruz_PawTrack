import { ENV } from "../utils/Constantes";
import axios from "axios";

export class AppointmentsService {
  baseApi = ENV.BASE_API;

  // Obtener todas las citas (con posibilidad de filtrar)
  async getAppointments(filters = {}) {
    try {
      let url = `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}`;
      
      // Agregar filtros a la URL como query params
      const queryParams = [];
      if (filters.estado) {
        const estados = Array.isArray(filters.estado) ? 
          filters.estado.join(',') : filters.estado;
        queryParams.push(`estado=${estados}`);
      }
      if (filters.fecha) {
        queryParams.push(`fecha=${filters.fecha}`);
      }
      if (filters.mascotaId) queryParams.push(`mascotaId=${filters.mascotaId}`);
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      console.log('URL de la petición:', url);
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error en getAppointments:", error.response?.data || error.message);
      throw error;
    }
  }

  // Obtener una cita por su ID
  async getAppointmentById(appointmentId) {
    try {
      const response = await axios.get(
        `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error en getAppointmentById:", error.response?.data || error.message);
      throw error;
    }
  }

  // Crear una nueva cita
  async createAppointment(appointmentData) {
    try {
      const response = await axios.post(
        `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}`,
        {
          mascotaId: appointmentData.mascotaId,
          fecha: appointmentData.fecha,
          hora: appointmentData.hora,
          motivo: appointmentData.motivo,
          notas: appointmentData.notas || ""
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error en createAppointment:", error.response?.data || error.message);
      throw error;
    }
  }

  // Actualizar una cita existente
  async updateAppointment(appointmentId, appointmentData) {
    try {
      const response = await axios.patch(
        `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}/${appointmentId}`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      console.error("Error en updateAppointment:", error.response?.data || error.message);
      throw error;
    }
  }

  // Cambiar el estado de una cita
  async changeAppointmentStatus(appointmentId, estado) {
    try {
      const response = await axios.patch(
        `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}/${appointmentId}/status`,
        { estado }
      );
      return response.data;
    } catch (error) {
      console.error("Error en changeAppointmentStatus:", error.response?.data || error.message);
      throw error;
    }
  }

  // Eliminar una cita
  async deleteAppointment(appointmentId) {
    try {
      const response = await axios.delete(
        `${this.baseApi}${ENV.API_ROUTES.APPOINTMENTS}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error en deleteAppointment:", error.response?.data || error.message);
      throw error;
    }
  }

  // Obtener citas de una mascota específica
  async getAppointmentsByPet(petId) {
    try {
      const response = await axios.get(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}/appointments`
      );
      return response.data;
    } catch (error) {
      console.error("Error en getAppointmentsByPet:", error.response?.data || error.message);
      throw error;
    }
  }
}