import React, { useState } from "react";
import { Container, Nav, Button, Card, ButtonGroup } from "react-bootstrap";
import { AppointmentsList } from "../../components/ListAppointments";
import "./Appointments.scss";

export const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Formatea la fecha a YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.getFullYear() + '-' + 
           String(d.getMonth() + 1).padStart(2, '0') + '-' + 
           String(d.getDate()).padStart(2, '0');
  };

  // Para filtrar próximas citas desde hoy en adelante
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Funciones para cambiar el día en el calendario
  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <Container className="appointments-container py-4">
      <h1 className="page-title">Gestión de Citas</h1>
      
      <Nav variant="tabs" className="nav-tabs">
        <Nav.Item >
          <Nav.Link 
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          >
            <i className="bi bi-calendar-check"></i>
            Próximas Citas
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          >
            <i className="bi bi-calendar-date"></i>
            Calendario
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            <i className="bi bi-calendar3"></i>
            Todas las Citas
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "upcoming" && (
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="h6 mb-4">Próximas Citas</h2>
            <AppointmentsList 
              initialFilters={{ 
                estado: "Programada,Confirmada",
                desdeHoy: true // Nuevo filtro personalizado
              }} 
            />
          </Card.Body>
        </Card>
      )}

      {activeTab === "calendar" && (
        <div className="calendar-card">
          <div className="calendar-header d-flex justify-content-between align-items-center">
            <div className="date-display" style={{ fontSize: "1rem" }}>
              {selectedDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={prevDay}>
                <i className="bi bi-chevron-left"></i>
              </Button>
              <Button className="btn-today" onClick={goToday}>
                Hoy
              </Button>
              <Button variant="outline-secondary" onClick={nextDay}>
                <i className="bi bi-chevron-right"></i>
              </Button>
            </ButtonGroup>
          </div>
          <div className="appointments-list">
            <AppointmentsList 
              initialFilters={{ 
                fecha: formatDate(selectedDate)
              }} 
            />
          </div>
        </div>
      )}

      {activeTab === "all" && (
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="h6 mb-4">Todas las Citas</h2>
            <AppointmentsList />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};