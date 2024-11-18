import React, { useState, useEffect, useCallback } from "react";
import { Informacion } from "../../bd/DatosMascotas";
import { Button, Modal } from "react-bootstrap";
import "./ViewInfoCats.css";

function ViewInfoCats({ setPacientes, pacientes }) {
  const [info, setInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [values, setValues] = useState({
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

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setValues({
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

  const obtenerValues = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

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

    setValues((prevValues) => ({ ...prevValues, edad: edad.toString() }));
  };

  const obtenerImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValues({ ...values, imagen: imageUrl });
    }
  };

  /*   const guardarInformacion = () => {
    if (editingIndex !== null) {
      Informacion[editingIndex] = values;
      console.log(`Paciente editado en índice ${editingIndex}`);
    } else {
      Informacion.push(values);
      console.log("Paciente agregado");
    }

    mostrarInfo();
    cerrarModal();
  }; */

  const guardarInformacion = () => {
    if (editingIndex !== null) {
      Informacion[editingIndex] = values;
    } else {
      Informacion.push(values);
    }
    console.log(Informacion); // Verifica el contenido de Informacion después de guardar
    mostrarInfo();
    cerrarModal();
  };

  /*   const mostrarInfo = useCallback(() => {
    setInfo([...Informacion]);
    //setPacientes es el actualizador global el cual esta declarado en App.js
    setPacientes([...Informacion]);
  }, [setPacientes]); */

  const mostrarInfo = useCallback(() => {
    console.log(Informacion); // Verifica que la información esté siendo actualizada
    setInfo([...Informacion]);
    setPacientes([...Informacion]); // Actualización global
  }, [setPacientes]);

  const eliminarInfo = (index) => {
    Informacion.splice(index, 1);
    console.log("Paciente eliminado en índice", index);
    mostrarInfo();
  };

  const editarInfo = (index) => {
    setEditingIndex(index);
    setValues(Informacion[index]);
    abrirModal();
  };

  useEffect(() => {
    mostrarInfo();
  }, [mostrarInfo]);

  /* useEffect(() => {
    setInfo(pacientes);
  }, [pacientes]);*/

  return (
    <>
      <br></br>
      <div className="footer-container">
        <h1 className="Titulo">Gestiona Tus Michi Pacientes</h1>
        <div className="row">
          <div style={{ width: "100%" }}>
            <Button
              type="button"
              className="btn btn-info w-100"
              onClick={abrirModal}
            >
              Agregar Micho...
            </Button>
          </div>

          <Modal show={showModal} onHide={cerrarModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingIndex !== null ? "Editar Paciente" : "Agregar Paciente"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="nombreInput" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreInput"
                    placeholder="Nombre de la mascota"
                    name="nombre"
                    onChange={obtenerValues}
                    value={values.nombre}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="especieInput" className="form-label">
                    Especie
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="especieInput"
                    placeholder="Especie (e.g., perro, gato)"
                    name="especie"
                    onChange={obtenerValues}
                    value={values.especie}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="razaInput" className="form-label">
                    Raza
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="razaInput"
                    placeholder="Raza de la mascota"
                    name="raza"
                    onChange={obtenerValues}
                    value={values.raza}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="fechaNacimientoInput" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimientoInput"
                    name="fechaNacimiento"
                    onChange={obtenerValues}
                    value={values.fechaNacimiento}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edadInput" className="form-label">
                    Edad
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edadInput"
                    placeholder="Edad en años"
                    name="edad"
                    value={values.edad}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="diagnosticosInput" className="form-label">
                    Diagnósticos
                  </label>
                  <textarea
                    className="form-control"
                    id="diagnosticosInput"
                    placeholder="Diagnósticos conocidos"
                    name="diagnosticos"
                    onChange={obtenerValues}
                    value={values.diagnosticos}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="tratamientosPreviosInput"
                    className="form-label"
                  >
                    Tratamientos Previos
                  </label>
                  <textarea
                    className="form-control"
                    id="tratamientosPreviosInput"
                    placeholder="Tratamientos previos"
                    name="tratamientosPrevios"
                    onChange={obtenerValues}
                    value={values.tratamientosPrevios}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="vacunasInput" className="form-label">
                    Vacunas
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vacunasInput"
                    placeholder="Vacunas aplicadas"
                    name="vacunas"
                    onChange={obtenerValues}
                    value={values.vacunas}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="alergiasInput" className="form-label">
                    Alergias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="alergiasInput"
                    placeholder="Alergias conocidas"
                    name="alergias"
                    onChange={obtenerValues}
                    value={values.alergias}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imagenInput" className="form-label">
                    Imagen de la Mascota
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imagenInput"
                    onChange={obtenerImagen}
                  />
                </div>

                {values.imagen && (
                  <div className="mb-3">
                    <label className="form-label">
                      Previsualización de Imagen
                    </label>
                    <img
                      src={values.imagen}
                      alt="Previsualización"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
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
              <th scope="col">Nombre</th>
              <th scope="col">Especie</th>
              <th scope="col">Raza</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Edad</th>
              <th scope="col">Diagnósticos</th>
              <th scope="col">Tratamientos Previos</th>
              <th scope="col">Vacunas</th>
              <th scope="col">Alergias</th>
              <th scope="col">Imagen</th>
              <th scope="col">Modificar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {info.map((paciente, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{paciente.nombre}</td>
                <td>{paciente.especie}</td>
                <td>{paciente.raza}</td>
                <td>{paciente.fechaNacimiento}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.diagnosticos}</td>
                <td>{paciente.tratamientosPrevios}</td>
                <td>{paciente.vacunas}</td>
                <td>{paciente.alergias}</td>
                <td>
                  {paciente.imagen && (
                    <img
                      src={paciente.imagen}
                      alt="Mascota"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <Button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editarInfo(index)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarInfo(index)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewInfoCats;
