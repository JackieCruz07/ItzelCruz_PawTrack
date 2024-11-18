import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewCats.css";

function ViewCats({ pacientes = [] }) {
  //La propiedad pacientes biene directametne desde App.js como propiedad en este componente desde el archivo Rutas.js
  const [expandedIndex, setExpandedIndex] = useState(null);

  React.useEffect(() => {
    console.log("Pacientes han sido actualizados", pacientes);
  }, [pacientes]);

  const toggleExpand = (index) => {
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    } else {
      setExpandedIndex(null);
    }
  };

  return (
    <div className="footer-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <b>Michi Pacientes</b>
        </h2>
        <div className="row">
          {pacientes.map((paciente, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className={`card h-100 ${expandedIndex === index ? "expanded" : ""}`}>
                <img
                  src={
                    paciente.imagen
                      ? paciente.imagen
                      : "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt="Paciente"
                />
                <div className="card-body">
                  <h5 className="card-title">{paciente.nombre}</h5>
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

                  {expandedIndex === index && (
                    <div className="card-details mt-3">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCats;
