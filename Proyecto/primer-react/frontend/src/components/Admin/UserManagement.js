import React, { useState, useEffect } from "react";
import { userService } from "../../api/services/user.service";
import { useAuth } from "../../api/hooks/useAuth";
import "./Admin.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { user: currentUser } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "user",
    active: true,
  });

  const [password, setPassword] = useState("");

  // Cargar usuarios
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers();
      if (response.ok) {
        setUsers(response.users);
      } else {
        setError("Error al cargar usuarios");
      }
    } catch (err) {
      setError(err.message || "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Seleccionar usuario para editar
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      active: user.active,
    });
    setIsEditing(true);
    setIsChangingPassword(false);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Actualizar usuario
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    try {
      const response = await userService.updateUser(selectedUser._id, formData);
      
      if (response.ok) {
        // Actualizar la lista de usuarios
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === selectedUser._id ? response.user : u
          )
        );
        setIsEditing(false);
        setSelectedUser(null);
      } else {
        setError(response.message || "Error al actualizar usuario");
      }
    } catch (err) {
      setError(err.message || "Error al actualizar usuario");
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!selectedUser || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    try {
      const response = await userService.changePassword(selectedUser._id, password);
      
      if (response.ok) {
        setIsChangingPassword(false);
        setPassword("");
        setError("");
      } else {
        setError(response.message || "Error al cambiar contraseña");
      }
    } catch (err) {
      setError(err.message || "Error al cambiar contraseña");
    }
  };

  // Eliminar usuario
  const handleDelete = async (userId) => {
    // No permitir eliminar el usuario actual
    if (userId === currentUser.id) {
      setError("No puedes eliminar tu propia cuenta");
      return;
    }
    
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }
    
    try {
      const response = await userService.deleteUser(userId);
      
      if (response.ok) {
        // Eliminar el usuario de la lista
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
        
        // Si el usuario eliminado es el seleccionado, limpiar la selección
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(null);
          setIsEditing(false);
        }
      } else {
        setError(response.message || "Error al eliminar usuario");
      }
    } catch (err) {
      setError(err.message || "Error al eliminar usuario");
    }
  };

  // Mostrar formulario de cambio de contraseña
  const showChangePasswordForm = () => {
    setIsChangingPassword(true);
    setIsEditing(false);
  };

  // Renderizar tabla de usuarios
  const renderUsersTable = () => {
    if (loading) {
      return <div className="loading">Cargando usuarios...</div>;
    }

    if (users.length === 0) {
      return <div className="no-data">No hay usuarios registrados</div>;
    }

    return (
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={user._id === currentUser.id ? "current-user" : ""}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`user-role ${user.role}`}>
                    {user.role === "admin" ? "Administrador" : "Usuario"}
                  </span>
                </td>
                <td>
                  <span className={`user-status ${user.active ? "active" : "inactive"}`}>
                    {user.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleSelectUser(user)}
                    title="Editar usuario"
                  >
                    <i className="fa fa-pencil"></i> Editar
                  </button>
                  {user._id !== currentUser.id && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                      title="Eliminar usuario"
                    >
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Renderizar formulario de edición
  const renderEditForm = () => {
    if (!selectedUser) return null;

    return (
      <div className="edit-form-container">
        <h3>Editar Usuario</h3>
        <form onSubmit={handleUpdate} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <label htmlFor="active">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              Usuario activo
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Guardar cambios
            </button>
            <button
              type="button"
              className="password-btn"
              onClick={showChangePasswordForm}
            >
              Cambiar contraseña
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Renderizar formulario de cambio de contraseña
  const renderPasswordForm = () => {
    if (!isChangingPassword || !selectedUser) return null;

    return (
      <div className="password-form-container">
        <h3>Cambiar contraseña para {selectedUser.name}</h3>
        <form onSubmit={handleChangePassword} className="password-form">
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
            />
            <small>La contraseña debe tener al menos 6 caracteres</small>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Cambiar contraseña
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Renderizar formulario para crear nuevo usuario
  const renderCreateUserForm = () => {
    // Esta función se puede implementar si se desea agregar la funcionalidad de crear usuarios
    // Por ahora, se deja como futuro desarrollo
  };

  return (
    <div className="user-management-container">
      <div className="section-header">
        <h2>Gestión de Usuarios</h2>
        <button className="add-user-btn">
          <i className="fa fa-plus"></i> Nuevo Usuario
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isEditing && renderEditForm()}
      {isChangingPassword && renderPasswordForm()}
      {renderUsersTable()}
        {renderCreateUserForm()}
    </div>
  );
};

export default UserManagement;