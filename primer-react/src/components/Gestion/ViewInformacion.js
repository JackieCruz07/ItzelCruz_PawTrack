import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewInformacion.css";
import Header from "../Header";
import Footer from "../Footer";

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function ViewInformacion({ setPacientes, pacientes }) {
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    edad: "",
    diagnosticos: "",
    tratamientosPrevios: "",
    vacunas: "",
    alergias: "",
    imagen: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fechaNacimiento") {
      const edad = calcularEdad(value);
      setNuevoPaciente({ ...nuevoPaciente, [name]: value, edad });
    } else {
      setNuevoPaciente({ ...nuevoPaciente, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoPaciente({ ...nuevoPaciente, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPatient = () => {
    setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]);
    setNuevoPaciente({
      nombre: "",
      especie: "",
      raza: "",
      fechaNacimiento: "",
      edad: "",
      diagnosticos: "",
      tratamientosPrevios: "",
      vacunas: "",
      alergias: "",
      imagen: "",
    });
  };

  const handleEditPatient = (index) => {
    const paciente = pacientes[index];
    setNuevoPaciente({
      ...paciente,
      imagen: paciente.imagen, // Mantener la imagen existente
    });
  };

  const handleUpdatePatient = (index) => {
    const pacientesActualizados = pacientes.map((paciente, i) =>
      i === index ? nuevoPaciente : paciente
    );
    setPacientes(pacientesActualizados);
    setNuevoPaciente({
      nombre: "",
      especie: "",
      raza: "",
      fechaNacimiento: "",
      edad: "",
      diagnosticos: "",
      tratamientosPrevios: "",
      vacunas: "",
      alergias: "",
      imagen: "",
    });
  };

  const handleDeletePatient = (index) => {
    const pacientesActualizados = pacientes.filter((_, i) => i !== index);
    setPacientes(pacientesActualizados);
  };

  return (
    <div className="footer-container">
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Gestión de Pacientes</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Fecha de Nacimiento</th>
              <th>Diagnósticos</th>
              <th>Tratamientos Previos</th>
              <th>Vacunas</th>
              <th>Alergias</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr key={index}>
                <td>{paciente.nombre}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.especie}</td>
                <td>{paciente.raza}</td>
                <td>{paciente.fechaNacimiento}</td>
                <td>{paciente.diagnosticos}</td>
                <td>{paciente.tratamientosPrevios}</td>
                <td>{paciente.vacunas}</td>
                <td>{paciente.alergias}</td>
                <td>
                  {paciente.imagen && (
                    <img
                      src={paciente.imagen}
                      alt="Paciente"
                      className="img-thumbnail"
                      width="50"
                      height="50"
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEditPatient(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => handleUpdatePatient(index)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePatient(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-5">Añadir/Editar Paciente</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            name="nombre"
            value={nuevoPaciente.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="edad"
            value={nuevoPaciente.edad}
            onChange={handleInputChange}
            placeholder="Edad"
            readOnly
          />
          <input
            type="text"
            className="form-control mb-2"
            name="especie"
            value={nuevoPaciente.especie}
            onChange={handleInputChange}
            placeholder="Especie"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="raza"
            value={nuevoPaciente.raza}
            onChange={handleInputChange}
            placeholder="Raza"
          />
          <input
            type="date"
            className="form-control mb-2"
            name="fechaNacimiento"
            value={nuevoPaciente.fechaNacimiento}
            onChange={handleInputChange}
          />
          <textarea
            className="form-control mb-2"
            name="diagnosticos"
            value={nuevoPaciente.diagnosticos}
            onChange={handleInputChange}
            placeholder="Diagnósticos"
          ></textarea>
          <textarea
            className="form-control mb-2"
            name="tratamientosPrevios"
            value={nuevoPaciente.tratamientosPrevios}
            onChange={handleInputChange}
            placeholder="Tratamientos Previos"
          ></textarea>
          <textarea
            className="form-control mb-2"
            name="vacunas"
            value={nuevoPaciente.vacunas}
            onChange={handleInputChange}
            placeholder="Vacunas"
          ></textarea>
          <textarea
            className="form-control mb-2"
            name="alergias"
            value={nuevoPaciente.alergias}
            onChange={handleInputChange}
            placeholder="Alergias"
          ></textarea>
          <input
            type="file"
            className="form-control mb-2"
            onChange={handleImageChange}
          />
          <button className="btn btn-primary" onClick={handleAddPatient}>
            Añadir Paciente
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewInformacion;
