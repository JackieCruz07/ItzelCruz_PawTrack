import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewPets.css";

function ViewPets({
  petType,
  title,
  apiEndpoint = "http://localhost:4000/api/pets",
}) {
  const [pets, setPets] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Función para obtener los datos desde MongoDB
  const fetchPets = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/categorized`); // Solicitud con axios
      const data = response.data;

      if (data && typeof data === "object") {
        const petsByType = data[petType] || []; // Filtra por especie traducida
        setPets(petsByType);
        console.log("Datos recibidos de la API:", petsByType);
      } else {
        console.error("La API no devolvió un objeto válido:", data);
        setPets([]);
      }
    } catch (error) {
      console.error(`Error al obtener mascotas para ${petType}:`, error);
      setPets([]);
    }
  }, [apiEndpoint, petType]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // Dividir array en grupos de tres
  const groupCards = (array, size) => {
    return array.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(array.slice(i, i + size));
      return acc;
    }, []);
  };

  const groupedPets = useMemo(() => groupCards(pets, 3), [pets]);

  return (
    <div className="footer-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          <b>{title}</b>
        </h2>
        {pets.length === 0 ? (
          <p className="text-center">No hay pacientes disponibles.</p>
        ) : (
          groupedPets.map((group, groupIndex) => (
            <div className="row mb-4" key={groupIndex}>
              {group.map((paciente, index) => {
                const actualIndex = groupIndex * 3 + index;
                return (
                  <div className="col-md-4" key={paciente._id}>
                    <div
                      className={`card position-relative ${
                        expandedIndex === actualIndex ? "expanded" : ""
                      }`}
                    >
                      <img
                        src={
                          paciente.imagen
                            ? `http://localhost:4000/${paciente.imagen}`
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

export default ViewPets;
