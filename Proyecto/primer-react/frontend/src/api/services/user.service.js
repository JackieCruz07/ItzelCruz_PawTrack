import axios from "axios";
import { ENV } from "../utils/Constantes";
import { authService } from "./auth.service";

export const userService = {
  // Obtener todos los usuarios (admin)
  getAllUsers: async () => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.get(`${ENV.BASE_API}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error.response?.data || { message: "Error al obtener usuarios" };
    }
  },

  // Obtener un usuario por ID (admin)
  getUserById: async (userId) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.get(`${ENV.BASE_API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error.response?.data || { message: "Error al obtener usuario" };
    }
  },

  // Actualizar un usuario (admin)
  updateUser: async (userId, userData) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.put(
        `${ENV.BASE_API}/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error.response?.data || { message: "Error al actualizar usuario" };
    }
  },

  // Eliminar un usuario (admin)
  deleteUser: async (userId) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.delete(`${ENV.BASE_API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error.response?.data || { message: "Error al eliminar usuario" };
    }
  },

  // Cambiar contraseña de un usuario (admin)
  changePassword: async (userId, password) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.put(
        `${ENV.BASE_API}/users/${userId}/password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      throw error.response?.data || { message: "Error al cambiar contraseña" };
    }
  },
};