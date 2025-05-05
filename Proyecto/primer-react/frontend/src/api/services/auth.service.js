import axios from "axios";
import { ENV } from "../utils/Constantes";

// Clave para almacenar el token en localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authService = {
  // Registro de usuario
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${ENV.BASE_API}${ENV.API_ROUTES.AUTH.REGISTER}`,
        userData
      );
      
      if (response.data.ok) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Error en registro:", error);
      const errorMessage = error.response?.data?.message || "Error al registrar usuario";
      throw new Error(errorMessage);
    }
  },

  // Login de usuario
  login: async (credentials) => {
    try {
      const response = await axios.post(
        `${ENV.BASE_API}${ENV.API_ROUTES.AUTH.LOGIN}`,
        credentials
      );
      
      if (response.data.ok) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Obtener el token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Verificar si hay un usuario autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Obtener datos del usuario
  getUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obtener información del usuario desde el servidor
  getMe: async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const response = await axios.get(`${ENV.BASE_API}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Actualizar los datos del usuario en localStorage
      if (response.data.ok) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
      throw error.response?.data || { message: "Error al obtener datos del usuario" };
    }
  },

  // Actualizar avatar
  updateAvatar: async (file) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      
      const formData = new FormData();
      formData.append("avatar", file);
      
      const response = await axios.post(
        `${ENV.BASE_API}/auth/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Actualizar el avatar en los datos del usuario
      if (response.data.ok) {
        const user = JSON.parse(localStorage.getItem(USER_KEY));
        user.avatar = response.data.avatar;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Error al actualizar avatar:", error);
      throw error.response?.data || { message: "Error al actualizar avatar" };
    }
  },
};