import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";
import { authService } from "../../api/services/auth.service";
import "./Profile.scss";

const Profile = () => {
  const { user, logout, loadUserProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("profile");

  // Cargar datos del usuario cuando el componente se monta
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
      });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setLoading(true);
      const response = await authService.updateProfile(profileData);

      if (response.success) {
        setMessage({
          text: "Perfil actualizado correctamente",
          type: "success",
        });
        // Recargar información del usuario
        await loadUserProfile();
      } else {
        setMessage({
          text: response.message || "Error al actualizar perfil",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "Error al actualizar perfil",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Validaciones
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        text: "Las contraseñas no coinciden",
        type: "error",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        text: "La nueva contraseña debe tener al menos 6 caracteres",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await authService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (response.success) {
        setMessage({
          text: "Contraseña actualizada correctamente",
          type: "success",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({
          text: response.message || "Error al cambiar contraseña",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "Error al cambiar contraseña",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar tipo de archivo y tamaño
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setMessage({
        text: "Solo se permiten imágenes JPG, JPEG o PNG",
        type: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB máximo
      setMessage({
        text: "La imagen no debe superar los 5MB",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await authService.uploadAvatar(file);

      if (response.success) {
        setMessage({
          text: "Avatar actualizado correctamente",
          type: "success",
        });
        // Recargar información del usuario
        await loadUserProfile();
      } else {
        setMessage({
          text: response.message || "Error al actualizar avatar",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "Error al actualizar avatar",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container" onClick={handleAvatarClick}>
            <img
              src={
                user.avatar && user.avatar !== "default-avatar.png"
                  ? `http://localhost:4000/uploads/avatars/${user.avatar}`
                  : "/img/default-avatar.png"
              }
              alt="Avatar"
              className="profile-avatar"
            />
            <div className="avatar-overlay">
              <span>Cambiar</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/jpeg,image/png,image/jpg"
              className="avatar-input"
            />
          </div>
          <div className="profile-info">
            <h2>
              {user.name} {user.lastname}
            </h2>
            <p className="profile-role">{user.role === "admin" ? "Administrador" : "Usuario"}</p>
          </div>
        </div>

        {message.text && (
          <div className={`profile-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Perfil
          </button>
          <button
            className={`tab-button ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Contraseña
          </button>
        </div>

        <div className="profile-content">
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={profileData.lastname}
                  onChange={handleProfileChange}
                  placeholder="Apellido"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="profile-button"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar Perfil"}
              </button>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña Actual</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu contraseña actual"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu nueva contraseña"
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirma tu nueva contraseña"
                  required
                  minLength="6"
                />
              </div>

              <button
                type="submit"
                className="profile-button"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Cambiar Contraseña"}
              </button>
            </form>
          )}

          {/* Botón de cierre de sesión */}
          <button
            onClick={handleLogout}
            className="profile-button logout-button"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;