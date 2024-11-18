import React, { useState, useEffect } from "react";
import { Informacion } from "../../bd/Datos";
import { Button, Modal } from "react-bootstrap";

function ViewCalificaciones() {
  const [info, setInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [values, setValues] = useState({
    matricula: '',
    nombre: "",
    apellidos: '',
    curp: ''
  });

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setValues({ matricula: '', nombre: "", apellidos: '', curp: '' });
  };

  const obtenerValues = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const guardarInformacion = () => {
    if (editingIndex !== null) {
      Informacion[editingIndex] = values;
      console.log(`Estudiante editado en índice ${editingIndex}`);
    } else {
      Informacion.push(values);
      console.log("Estudiante agregado");
    }

    mostrarInfo();
    cerrarModal();
  };

  const mostrarInfo = () => {
    setInfo([...Informacion]);
  };

  const eliminarInfo = (index) => {
    Informacion.splice(index, 1);
    console.log("Estudiante eliminado en índice", index);
    mostrarInfo();
  };

  const editarInfo = (index) => {
    setEditingIndex(index);
    setValues(Informacion[index]);
    abrirModal();
  };

  useEffect(() => {
    mostrarInfo();
  }, []);

  return (
    <>
      <div className="row">
        <Button variant="primary" onClick={abrirModal}>
          Agregar estudiante...
        </Button>

        <Modal show={showModal} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editingIndex !== null ? "Editar Estudiante" : "Agregar Estudiante"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="matriculaInput" className="form-label">
                  Matrícula
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="matriculaInput"
                  placeholder="Ingresa la matrícula"
                  name="matricula"
                  onChange={obtenerValues}
                  value={values.matricula}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nombreInput" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreInput"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  onChange={obtenerValues}
                  value={values.nombre}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="apellidosInput" className="form-label">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidosInput"
                  placeholder="Ingresa los apellidos"
                  name="apellidos"
                  onChange={obtenerValues}
                  value={values.apellidos}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="curpInput" className="form-label">
                  Curp
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="curpInput"
                  placeholder="Ingresa la curp"
                  name="curp"
                  onChange={obtenerValues}
                  value={values.curp}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={guardarInformacion}>
              {editingIndex !== null ? "Guardar Cambios" : "Guardar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Matrícula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Curp</th>
            <th scope="col">Modificar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {info.map((values, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{values.matricula}</td>
              <td>{values.nombre}</td>
              <td>{values.apellidos}</td>
              <td>{values.curp}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => editarInfo(index)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarInfo(index)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewCalificaciones;
