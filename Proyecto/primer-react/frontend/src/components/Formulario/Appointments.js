import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { initialValues, validationSchema } from "./Appointments.form";

export const AppointmentForm = ({ pets, onSubmit, initialData, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setIsLoading(true);
        setError(null);
        await onSubmit(formValue);
        formik.resetForm();
      } catch (error) {
        console.error("Error en submit:", error);
        setError(error.message || "Error al procesar la cita");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Inicializar el formulario con datos si estamos editando
  useEffect(() => {
    if (initialData) {
      formik.setValues({
        mascotaId: initialData.mascota?._id || "",
        fecha: initialData.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : "",
        hora: initialData.hora || "",
        motivo: initialData.motivo || "",
        notas: initialData.notas || "",
        estado: initialData.estado || "Programada"
      });
    } else {
      // Si es una nueva cita, establecer la fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      formik.setFieldValue("fecha", today);
    }
  }, [initialData]);

  // Generar opciones de horas para el día
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 19; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      options.push(`${formattedHour}:00`);
      options.push(`${formattedHour}:30`);
    }
    return options;
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-xl font-bold mb-4">
        {initialData ? "Editar cita" : "Agendar nueva cita"}
      </h3>

      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mascota <span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="mascotaId"
            value={formik.values.mascotaId}
            onChange={formik.handleChange}
            isInvalid={formik.errors.mascotaId}
          >
            <option value="">-- Seleccione una mascota --</option>
            {pets.map(pet => (
              <option key={pet._id} value={pet._id}>
                {pet.nombre} ({pet.especie} - {pet.raza || "Sin raza"})
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.mascotaId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="date"
            name="fecha"
            value={formik.values.fecha}
            onChange={formik.handleChange}
            min={new Date().toISOString().split('T')[0]}
            isInvalid={formik.errors.fecha}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.fecha}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hora <span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="hora"
            value={formik.values.hora}
            onChange={formik.handleChange}
            isInvalid={formik.errors.hora}
          >
            <option value="">-- Seleccione una hora --</option>
            {generateTimeOptions().map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.hora}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Motivo <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="motivo"
            value={formik.values.motivo}
            onChange={formik.handleChange}
            placeholder="Ej: Vacunación, Control mensual, Emergencia..."
            isInvalid={formik.errors.motivo}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.motivo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notas adicionales</Form.Label>
          <Form.Control
            as="textarea"
            name="notas"
            value={formik.values.notas}
            onChange={formik.handleChange}
            placeholder="Cualquier información adicional sobre la cita..."
            rows="3"
            isInvalid={formik.errors.notas}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.notas}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {initialData ? "Actualizando..." : "Agendando..."}
              </>
            ) : (
              initialData ? "Actualizar cita" : "Agendar cita"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};