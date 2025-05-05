import axios from "axios";

const AuthInterceptor = {
  setupInterceptors: (authService) => {
    // Interceptor de solicitud
    axios.interceptors.request.use(
      (config) => {
        // Verificar si hay token
        const token = authService.getToken();
        
        // Si hay token, agregarlo al header de autorización
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de respuesta
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Si el error es 401 (no autorizado), cerrar sesión
        if (error.response && error.response.status === 401) {
          // Verificar si no es una ruta de autenticación
          const isAuthUrl = error.config.url.includes("/auth/login") || 
                          error.config.url.includes("/auth/register");
          
          // Si no es una ruta de auth y recibimos 401, cerrar sesión
          if (!isAuthUrl) {
            authService.logout();
            // Opcional: redirigir a la página de login
            window.location.href = "/";
          }
        }
        
        return Promise.reject(error);
      }
    );
  },
};

export default AuthInterceptor;