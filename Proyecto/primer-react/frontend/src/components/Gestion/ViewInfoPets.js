import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ViewInfoPets.css";

function ViewInfoPets({
  petType,
  title,
  apiEndpoint = "http://localhost:4000/api/pets",
}) {
  // eslint-disable-next-line no-unused-vars
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

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

  // Función para obtener los datos desde la API
  // Función memorizada para obtener los datos desde la API
  const fetchPets = useCallback(async () => {
    try {
      const response = await fetch(`${apiEndpoint}?especie=${petType}`);
      const data = await response.json();

      console.log("Datos recibidos de la API:", data);

      if (Array.isArray(data)) {
        setPets(data);
        setFilteredPets(data);
      } else {
        console.error('La respuesta no es un arreglo válido:', data);
      }

      
    } catch (error) {
      console.error(`Error fetching ${petType} pets:`, error);
    }
  }, [apiEndpoint, petType]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const abrirModal = () => setShowModal(true);

  const cerrarModal = () => {
    setShowModal(false);
    setEditingPet(null);
    resetFormValues();
  };

  const resetFormValues = () => {
    setValues({
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
  };

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

  const obtenerImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imagen", file);

      const imageUrl = URL.createObjectURL(file);
      setValues((prev) => ({ ...prev, imagen: imageUrl }));

      subirImagen(formData);
    }
  };

  const subirImagen = async (formData) => {
    try {
      const response = await fetch(`${apiEndpoint}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setValues((prev) => ({
          ...prev,
          imagen: data.file ? `/uploads/${data.file.filename}` : prev.imagen,
        }));
      } else {
        console.error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al procesar la subida de imagen:", error);
    }
  };

  const guardarInformacion = async () => {
    try {
      const endpoint = editingPet
        ? `${apiEndpoint}/${editingPet.id}`
        : apiEndpoint;

      const method = editingPet ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          id: editingPet ? editingPet.id : undefined,
        }),
      });

      if (response.ok) {
        fetchPets();
        cerrarModal();
      } else {
        console.error("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  };

  const editarPet = (pet) => {
    setEditingPet(pet);
    setValues({
      nombre: pet.nombre,
      dueño: pet.dueño,
      especie: pet.especie,
      raza: pet.raza,
      fechaNacimiento: pet.fechaNacimiento,
      edad: pet.edad,
      diagnosticos: pet.diagnosticos,
      tratamientosPrevios: pet.tratamientosPrevios,
      vacunas: pet.vacunas,
      alergias: pet.alergias,
      imagen: pet.imagen,
    });
    abrirModal();
  };

  const eliminarPet = async (petId) => {
    try {
      const response = await fetch(`${apiEndpoint}/${petId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPets();
      } else {
        console.error("Error al eliminar la mascota");
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };
  return (
    <>
      <div className="footer-container">
        <h1 className="Titulo">{title}</h1>
        <div className="row">
          <div className="mb-3">
            <Button className="btn btn-info w-100" onClick={abrirModal}>
              Agregar {petType === "cats" ? "Micho" : petType === "dogs" ? "Perrito" : "Exótico"}...
            </Button>
          </div>
          <Modal show={showModal} onHide={cerrarModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingPet ? "Editar Paciente" : "Agregar Paciente"}
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
                    placeholder={`Nombre del ${petType}`}
                    name="nombre"
                    onChange={obtenerValues}
                    value={values.nombre}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dueñoInput" className="form-label">
                    Dueño
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dueñoInput"
                    placeholder="Nombre del dueño"
                    name="dueño"
                    onChange={obtenerValues}
                    value={values.dueño}
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
                    placeholder={`Especie (${petType})`}
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
                    placeholder={`Raza del ${petType}`}
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
                    Imagen del {petType}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imagenInput"
                    name="imagen"
                    onChange={obtenerImagen}
                  />
                </div>

                {values.imagen && (
                  <div className="mb-3">
                    <label className="form-label">
                      Previsualización de Imagen
                    </label>
                    <img
                      src={`http://localhost:4000${values.imagen}`}
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
                {editingPet ? "Guardar Cambios" : "Guardar"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dueño</th>
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
            { Array.isArray(filteredPets) && filteredPets.length === 0 ? (
              <tr>
                <td colSpan="14">No hay mascotas disponibles.</td>
              </tr>
            ) : (
              filteredPets.map((pet, index) => (
                <tr key={pet.id}>
                  <td>{index + 1}</td>
                  <td>{pet.nombre}</td>
                  <td>{pet.dueño}</td>
                  <td>{pet.especie}</td>
                  <td>{pet.raza}</td>
                  <td>{pet.fechaNacimiento}</td>
                  <td>{pet.edad}</td>
                  <td>{pet.diagnosticos}</td>
                  <td>{pet.tratamientosPrevios}</td>
                  <td>{pet.vacunas}</td>
                  <td>{pet.alergias}</td>
                  <td>
                    {pet.imagen && (
                      <img
                        src={`http://localhost:4000${pet.imagen}`}
                        alt={pet.nombre}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>
                    <Button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => editarPet(pet)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminarPet(pet.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewInfoPets;
