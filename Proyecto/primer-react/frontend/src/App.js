import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { authService } from "./api/services/auth.service";
import AuthInterceptor from "./api/interceptors/auth.interceptor";
import PrivateRoute from "./routes/ProtectedRoute";
import "./App.css";
import Rutas from "./routes/Rutas";
import { Header } from './components/inicio/Menu/Header';
import { Footer } from './page/Footer/Footer';
import LoginPage from "./page/Auth/Login";
import RegisterPage from "./page/Auth/Register";
import UserManagementPage from "./components/Admin/UserManagement";

function App() {
  // Configurar interceptor de axios
  useEffect(() => {
    AuthInterceptor.setupInterceptors(authService);
  }, []);
  
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="footer-container">
          <div className="container-fluid">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute requireAdmin={true}>
                    <UserManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Rutas />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;