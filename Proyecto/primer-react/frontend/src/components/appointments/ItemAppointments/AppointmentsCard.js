import React from "react";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import "./AppointmentsCard.scss";

export const AppointmentCard = ({ appointment, onEdit, onDelete, onChangeStatus }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusVariant = () => {
    switch (appointment.estado) {
      case "Programada": return "warning";
      case "Confirmada": return "info";
      case "Cancelada": return "danger";
      case "Completada": return "success";
      default: return "secondary";
    }
  };

  return (
    <Card className="appointment-card h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <Badge bg={getStatusVariant()} className="status-badge">
              {appointment.estado}
            </Badge>
          </div>
          <small className="text-muted">
            {formatDate(appointment.fecha)} - {appointment.hora}
          </small>
        </div>

        <Card.Title className="mb-3">
          {appointment.mascota?.nombre || "Mascota no disponible"}
        </Card.Title>
        
        <Card.Subtitle className="mb-2 text-muted">
          <small>
            {appointment.mascota?.especie} - {appointment.mascota?.raza || "Raza no especificada"}
          </small>
        </Card.Subtitle>

        <div className="appointment-details">
          <p className="mb-2">
            <strong>Dueño:</strong> {appointment.mascota?.dueño || "No especificado"}
          </p>
          
          <p className="mb-2">
            <strong>Motivo:</strong><br />
            {appointment.motivo}
          </p>

          {appointment.notas && (
            <p className="mb-2">
              <strong>Notas:</strong><br />
              <small className="text-muted">{appointment.notas}</small>
            </p>
          )}
        </div>

        <Row className="mt-3 g-2">
          <Col xs={6}>
            <Button
              variant="outline-primary"
              size="sm"
              className="w-100"
              onClick={onEdit}
            >
              <i className="bi bi-pencil-fill me-1"></i> Editar
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant="outline-danger"
              size="sm"
              className="w-100"
              onClick={onDelete}
            >
              <i className="bi bi-trash-fill me-1"></i> Eliminar
            </Button>
          </Col>
        </Row>

        <Row className="mt-2 g-2">
          {appointment.estado !== "Confirmada" && appointment.estado !== "Cancelada" && (
            <Col xs={6}>
              <Button
                variant="success"
                size="sm"
                className="w-100"
                onClick={() => onChangeStatus("Confirmada")}
              >
                Confirmar
              </Button>
            </Col>
          )}
          
          {appointment.estado !== "Cancelada" && (
            <Col xs={6}>
              <Button
                variant="danger"
                size="sm"
                className="w-100"
                onClick={() => onChangeStatus("Cancelada")}
              >
                Cancelar
              </Button>
            </Col>
          )}
          
          {appointment.estado !== "Completada" && appointment.estado !== "Cancelada" && (
            <Col xs={6}>
              <Button
                variant="info"
                size="sm"
                className="w-100"
                onClick={() => onChangeStatus("Completada")}
              >
                Completar
              </Button>
            </Col>
          )}
          
          {appointment.estado !== "Programada" && appointment.estado === "Cancelada" && (
            <Col xs={6}>
              <Button
                variant="warning"
                size="sm"
                className="w-100"
                onClick={() => onChangeStatus("Programada")}
              >
                Reprogramar
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};