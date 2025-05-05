import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ViewSearch() {
  const location = useLocation();
  const pacientes = location.state?.pacientes || [];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="footer-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <b>Resultados de Búsqueda</b>
        </h2>
        {pacientes.length === 0 ? (
          <p className="text-center">No se encontraron resultados.</p>
        ) : (
          <div className="row">
            {pacientes.map((paciente, index) => (
              <div className="col-md-4 mb-4" key={paciente.id}>
                <div
                  className={`card position-relative ${
                    expandedIndex === index ? "expanded" : ""
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
                      onClick={() => toggleExpand(index)}
                      aria-expanded={expandedIndex === index}
                    >
                      {expandedIndex === index ? "Cerrar" : "Ver más"}
                    </button>
                  </div>

                  {expandedIndex === index && (
                    <div
                      style={{ marginTop: "-15px" }}
                      className="border border-rounded z-3 m-0 p-4 card-details mt-3 position-absolute end-0 start-0 bg-white"
                    >
                      <p>
                        <strong>Raza:</strong> {paciente.raza}
                      </p>
                      <p>
                        <strong>Fecha de Nacimiento:</strong>{" "}
                        {paciente.fechaNacimiento || "No especificada"}
                      </p>
                      <p>
                        <strong>Diagnósticos:</strong>{" "}
                        {paciente.diagnosticos || "Sin diagnósticos"}
                      </p>
                      <p>
                        <strong>Tratamientos Previos:</strong>{" "}
                        {paciente.tratamientosPrevios || "Sin tratamientos previos"}
                      </p>
                      <p>
                        <strong>Vacunas:</strong>{" "}
                        {paciente.vacunas || "No especificadas"}
                      </p>
                      <p>
                        <strong>Alergias:</strong>{" "}
                        {paciente.alergias || "No especificadas"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSearch;
