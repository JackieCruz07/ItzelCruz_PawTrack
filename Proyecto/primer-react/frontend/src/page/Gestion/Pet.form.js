// PetForm.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function PetForm({ show, handleClose, apiEndpoint, fetchPets, petType }) {
  const [values, setValues] = useState({
    nombre: "",
    dueño: "",
    especie: petType,
    raza: "",
    fechaNacimiento: "",
    edad: "",
    diagnosticos: "",
    tratamientosPrevios: "",
    vacunas: "",
    alergias: "",
    imagen: "",
  });

  const obtenerValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "fechaNacimiento") {
      calcularEdad(value);
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    setValues((prev) => ({ ...prev, edad: `${edad} años` }));
  };

  const guardarInformacion = async () => {
    try {
      const response = await axios.post(apiEndpoint, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        console.log("Mascota añadida correctamente", response.data);
        fetchPets();
        handleClose();
      }
    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="nombreInput" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" onChange={obtenerValues} value={values.nombre} />
          </div>
          <div className="mb-3">
            <label htmlFor="dueñoInput" className="form-label">Dueño</label>
            <input type="text" className="form-control" name="dueño" onChange={obtenerValues} value={values.dueño} />
          </div>
          <div className="mb-3">
            <label htmlFor="razaInput" className="form-label">Raza</label>
            <input type="text" className="form-control" name="raza" onChange={obtenerValues} value={values.raza} />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaNacimientoInput" className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control" name="fechaNacimiento" onChange={obtenerValues} value={values.fechaNacimiento} />
          </div>
          <div className="mb-3">
            <label htmlFor="edadInput" className="form-label">Edad</label>
            <input type="text" className="form-control" name="edad" value={values.edad} readOnly />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={guardarInformacion}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PetForm;
