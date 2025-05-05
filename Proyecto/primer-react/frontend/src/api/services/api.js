import axios from "axios";
import { ENV } from "../utils/Constantes";
import { authService } from "./auth.service";

const api = axios.create({
  baseURL: ENV.BASE_API
});

// Interceptor para añadir token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Error en la petición";
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;