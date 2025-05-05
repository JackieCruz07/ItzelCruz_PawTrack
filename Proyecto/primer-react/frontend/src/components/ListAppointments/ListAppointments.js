import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { AppointmentsService } from "../../api";
import { AppointmentCard } from "../../components/appointments/ItemAppointments";
import { AppointmentForm } from "../../components/Formulario";
import { PetsService } from "../../api";

export const AppointmentsList = ({ initialFilters }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [filters, setFilters] = useState({
    estado: "",
    fecha: "",
    mascotaId: ""
  });
  const [pets, setPets] = useState([]);

  const appointmentsService = new AppointmentsService();
  const petsService = new PetsService();

  // Cargar citas al montar el componente y cuando cambien los filtros
  useEffect(() => {
    loadAppointments();
    loadPets();
  }, [filters]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        setLoading(true);
        // Obtén todas las citas
        const response = await appointmentsService.getAppointments({});
        let data = response.appointments || [];
        let filtered = data;

        // Filtrar por estado
        if (initialFilters?.estado) {
          const estados = initialFilters.estado.split(",").map(e => e.trim());
          filtered = filtered.filter(app => estados.includes(app.estado));
        }

        // Filtrar por fecha desde hoy
        if (initialFilters?.desdeHoy) {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          filtered = filtered.filter(app => {
            const fecha = new Date(app.fecha);
            return fecha >= now;
          });
        }

        // Filtrar por fecha exacta (para el calendario)
        if (initialFilters?.fecha) {
          filtered = filtered.filter(app => {
            const fecha = new Date(app.fecha);
            const filtro = new Date(initialFilters.fecha);
            return (
              fecha.getFullYear() === filtro.getFullYear() &&
              fecha.getMonth() === filtro.getMonth() &&
              fecha.getDate() === filtro.getDate()
            );
          });
        }

        setAppointments(filtered);
        setError(null);
      } catch (error) {
        setError("Error al cargar las citas filtradas.");
      } finally {
        setLoading(false);
      }
    };

    if (initialFilters && Object.keys(initialFilters).length > 0) {
      fetchAndFilter();
    }
  }, [initialFilters]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentsService.getAppointments(filters);
      setAppointments(response.appointments || []);
      setError(null);
    } catch (error) {
      console.error("Error al cargar citas:", error);
      setError("Error al cargar las citas. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const loadPets = async () => {
    try {
      const data = await petsService.getPets();
      setPets(data || []);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  const handleCreateAppointment = async (appointmentData) => {
    try {
      await appointmentsService.createAppointment(appointmentData);
      setShowForm(false);
      setEditingAppointment(null);
      loadAppointments();
    } catch (error) {
      console.error("Error al crear cita:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleUpdateAppointment = async (appointmentId, appointmentData) => {
    try {
      await appointmentsService.updateAppointment(appointmentId, appointmentData);
      setShowForm(false);
      setEditingAppointment(null);
      loadAppointments();
    } catch (error) {
      console.error("Error al actualizar cita:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta cita?")) {
      try {
        await appointmentsService.deleteAppointment(appointmentId);
        loadAppointments();
      } catch (error) {
        console.error("Error al eliminar cita:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  const handleChangeStatus = async (appointmentId, newStatus) => {
    try {
      await appointmentsService.changeAppointmentStatus(appointmentId, newStatus);
      loadAppointments();
    } catch (error) {
      console.error("Error al cambiar estado de cita:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      estado: "",
      fecha: "",
      mascotaId: ""
    });
  };

  return (
    <Container className="appointment-list-container">
      <div className="header-section">
{/*         <h2 className="h3"style={{marginBottom: "15px", textAlign: "center"}}>Gestión de Citas</h2> */}
        <Button 
          className="btn-new-appointment"
          style={{width: "100%",  marginBottom: "15px",}}
          onClick={() => {
            setShowForm(!showForm);
            setEditingAppointment(null);
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showForm ? "Cancelar" : "Agendar nueva cita"}
        </Button>
      </div>

      {showForm && (
        <AppointmentForm 
          pets={pets}
          onSubmit={editingAppointment 
            ? (data) => handleUpdateAppointment(editingAppointment._id, data)
            : handleCreateAppointment
          }
          initialData={editingAppointment}
          onCancel={() => {
            setShowForm(false);
            setEditingAppointment(null);
          }}
        />
      )}

      <div className="filters-section" >
        <h3 className="filters-title" style={{marginTop: "15px", fontSize: "1rem"}}>
          <i className="bi bi-funnel"></i>
          Filtros de búsqueda
        </h3>
        
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estado"
                value={filters.estado}
                onChange={handleFilterChange}
              >
                <option value="">Todos los estados</option>
                <option value="Programada">Programada</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Completada">Completada</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={filters.fecha}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label>Mascota</Form.Label>
              <Form.Select
                name="mascotaId"
                value={filters.mascotaId}
                onChange={handleFilterChange}
              >
                <option value="">Todas las mascotas</option>
                {pets.map(pet => (
                  <option key={pet._id} value={pet._id}>
                    {pet.nombre} ({pet.especie})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end mt-3">
          <Button
            variant="light"
            className="btn-reset"
            onClick={resetFilters}
          >
            <i className="bi bi-x-circle me-2"></i>
            Limpiar filtros
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Spinner animation="border" />
          <p className="mt-3">Cargando citas...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-calendar-x"></i>
          <p>No hay citas disponibles</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={() => handleEdit(appointment)}
              onDelete={() => handleDeleteAppointment(appointment._id)}
              onChangeStatus={(status) => handleChangeStatus(appointment._id, status)}
            />
          ))}
        </div>
      )}
    </Container>
  );
};