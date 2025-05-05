import { useState, useEffect, useCallback } from "react";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Añadido el estado

  // Función para cargar los datos del usuario
  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      // Verificar si hay token
      if (authService.isAuthenticated()) {
        // Obtener datos del usuario desde localStorage
        const userData = authService.getUser();
        
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true); // Actualizar estado de autenticación
          
          // Actualizar datos del usuario desde el servidor
          try {
            const response = await authService.getMe();
            if (response.ok) {
              setUser(response.user);
            }
          } catch (err) {
            console.error("Error al actualizar datos del usuario:", err);
          }
        } else {
          // Si no hay datos en localStorage pero hay token, intentar obtenerlos
          try {
            const response = await authService.getMe();
            if (response.ok) {
              setUser(response.user);
              setIsAuthenticated(true); // Actualizar estado de autenticación
            } else {
              // Si no se puede obtener el usuario, cerrar sesión
              authService.logout();
              setUser(null);
              setIsAuthenticated(false); // Actualizar estado de autenticación
            }
          } catch (err) {
            console.error("Error al obtener datos del usuario:", err);
            // Si hay un error al obtener datos del servidor, cerramos sesión
            authService.logout();
            setUser(null);
            setIsAuthenticated(false); // Actualizar estado de autenticación
          }
        }
      } else {
        // No hay token, no hay usuario autenticado
        setUser(null);
        setIsAuthenticated(false); // Actualizar estado de autenticación
      }
    } catch (err) {
      console.error("Error en useAuth:", err);
      setError(err.message || "Error al cargar el usuario");
      setIsAuthenticated(false); // Actualizar estado de autenticación
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.ok) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      if (response.ok) {
        setUser(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message || "Error al registrarse");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false); // Actualizar estado de autenticación
  };

  // Cargar el usuario al montar el componente
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isAdmin: user?.role === "admin",
    loading,
    error,
    isAuthenticated, // Añadido al objeto retornado
    login,
    register,
    logout,
    loadUser,
  };
};