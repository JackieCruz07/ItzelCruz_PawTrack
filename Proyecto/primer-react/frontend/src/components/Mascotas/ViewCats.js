import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewCats.css";

function ViewCats() {
  const [pacientes, setPacientes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Función para obtener los datos desde la API
  const fetchPets = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pets");
      const data = await response.json();
      setPacientes(data);
      // Opcional: Guardar en localStorage para persistencia
      localStorage.setItem("pacientes", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Dividir array en grupos de tres
  const groupCards = (array, size) => {
    const groups = [];
    for (let i = 0; i < array.length; i += size) {
      groups.push(array.slice(i, i + size));
    }
    return groups;
  };

  const groupedPacientes = useMemo(
    () => groupCards(pacientes, 3),
    [pacientes]
  );

  return (
    <div className="footer-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <b>Michi Pacientes</b>
        </h2>
        {pacientes.length === 0 ? (
          <p className="text-center">No hay pacientes disponibles.</p>
        ) : (
          groupedPacientes.map((group, groupIndex) => (
            <div className="row mb-4" key={groupIndex}>
              {group.map((paciente, index) => {
                const actualIndex = groupIndex * 3 + index;
                return (
                  <div className="col-md-4" key={paciente.id}>
                    <div
                      className={`card position-relative ${
                        expandedIndex === actualIndex ? "expanded" : ""
                      }`}
                    >
                      <img
                        src={
                          paciente.imagen
                            ? `http://localhost:4000${paciente.imagen}`
                            : "https://via.placeholder.com/150"
                        }
                        className="card-img-top"
                        alt={paciente.nombre}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{paciente.nombre}</h5>
                        <p className="card-text">
                          <strong>Dueño:</strong> {paciente.dueño}
                        </p>
                        <p className="card-text">
                          <strong>Edad:</strong> {paciente.edad}
                        </p>
                        <p className="card-text">
                          <strong>Especie:</strong> {paciente.especie}
                        </p>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-info w-100"
                          onClick={() => toggleExpand(actualIndex)}
                          aria-expanded={expandedIndex === actualIndex}
                        >
                          {expandedIndex === actualIndex ? "Cerrar" : "Ver más"}
                        </button>
                      </div>

                      {expandedIndex === actualIndex && (
                        <div
                          style={{ marginTop: "-15px" }}
                          className="border border-rounded z-3 m-0 p-4 card-details mt-3 position-absolute end-0 start-0 bg-white"
                        >
                          <p>
                            <strong>Raza:</strong> {paciente.raza}
                          </p>
                          <p>
                            <strong>Fecha de Nacimiento:</strong>{" "}
                            {paciente.fechaNacimiento}
                          </p>
                          <p>
                            <strong>Diagnósticos:</strong> {paciente.diagnosticos}
                          </p>
                          <p>
                            <strong>Tratamientos Previos:</strong>{" "}
                            {paciente.tratamientosPrevios}
                          </p>
                          <p>
                            <strong>Vacunas:</strong> {paciente.vacunas}
                          </p>
                          <p>
                            <strong>Alergias:</strong> {paciente.alergias}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewCats;