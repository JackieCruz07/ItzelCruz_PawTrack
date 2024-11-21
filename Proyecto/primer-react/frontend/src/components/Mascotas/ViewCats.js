import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewCats.css";

function ViewCats() {
  const { state } = useLocation();
  const pacientesFromState = useMemo(() => {
    // Si hay pacientes en el estado de navegación, usarlos; de lo contrario, usar localStorage
    return (
      state?.pacientes || JSON.parse(localStorage.getItem("pacientes")) || []
    );
  }, [state?.pacientes]);

  //La propiedad pacientes biene directametne desde App.js como propiedad en este componente desde el archivo Rutas.js
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    console.log("Pacientes han sido actualizados", pacientesFromState);
  }, [pacientesFromState]);

  const toggleExpand = (index) => {
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    } else {
      setExpandedIndex(null);
    }
  };

  // Dividir array en grupos de tres
  const groupCards = (array, size) => {
    const groups = [];
    for (let i = 0; i < array.length; i += size) {
      groups.push(array.slice(i, i + size));
    }
    return groups;
  };

  const groupedPacientes = useMemo(() => groupCards(pacientesFromState, 3), [pacientesFromState]);
  
  return (
    <div className="footer-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <b>Michi Pacientes</b>
        </h2>
        {groupedPacientes.map((group, groupIndex) => (
          <div className="row mb-4" key={groupIndex}>
            {group.map((paciente, index) => {
              const actualIndex = groupIndex * 3 + index; // Índice absoluto
              return (
                <div className="col-md-4" key={paciente.index || actualIndex}>
                  <div
                    className={`card position-relative ${
                      expandedIndex === actualIndex ? "expanded" : ""
                    }`}
                  >
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
                        onClick={() => toggleExpand(actualIndex)}
                        aria-expanded={expandedIndex === actualIndex}
                      >
                        {expandedIndex === actualIndex ? "Cerrar" : "Ver más"}
                      </button>
                    </div>

                      {/* {expandedIndex === actualIndex && ( */}
                        <div style={{marginTop: "-15px"}} className="border border-rounded z-3 m-0 p-4 card-details mt-3 position-absolute end-0 start-0 bg-white top-100">
                          <p>
                            <strong>Raza:</strong> {paciente.raza}
                          </p>
                          <p>
                            <strong>Fecha de Nacimiento:</strong>{" "}
                            {paciente.fechaNacimiento}
                          </p>
                          <p>
                            <strong>Diagnósticos:</strong>{" "}
                            {paciente.diagnosticos}
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
                      {/* )} */}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCats;
