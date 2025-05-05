import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { PetsService } from "../../../api/pet";
import { ENV } from "../../../utils/Constantes";
import "./PetsCard.scss";

const petsService = new PetsService();

export function PetCards({ species = null, maxPerRow = 3 }) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPets();
  }, [species]);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await petsService.getPets(species);
      if (Array.isArray(response)) {
        setPets(response);
      } else {
        console.error("Respuesta inesperada:", response);
        setError("Formato de datos inesperado");
      }
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
      setError("Error al cargar las mascotas");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Desconocida";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "Desconocida";
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age > 0 ? `${age} años` : "Menos de 1 año";
  };

  const buildImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Si la URL ya es absoluta, devuélvela tal cual
    if (imagePath.startsWith("http")) return imagePath;

    // Construir la URL correcta para acceder a la imagen
    return `${ENV.BASE_API.replace('/api', '')}${imagePath}`;
  };

  // Determinar el tamaño de la columna basado en maxPerRow
  const colSize = 12 / maxPerRow;

  return (
    <Container fluid>
      {error && <Alert variant="danger">{error}</Alert>}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p>Cargando mascotas...</p>
        </div>
      ) : pets.length === 0 ? (
        <Alert variant="info">
          {species 
            ? `No hay mascotas de tipo ${species} registradas` 
            : "No hay mascotas registradas"}
        </Alert>
      ) : (
        <Row className="g-4">
          {pets.map((pet) => (
            <Col key={pet._id} xs={12} md={6} lg={colSize} className="mb-4">
              <Card className="h-100 pet-card">
                <div className="pet-image-container">
                  {pet.imagen ? (
                    <Card.Img 
                      variant="top" 
                      src={buildImageUrl(pet.imagen)} 
                      alt={`Foto de ${pet.nombre}`}
                      className="pet-image"
                    />
                  ) : (
                    <div className="no-image-placeholder d-flex align-items-center justify-content-center">
                      <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                    </div>
                  )}
                  <Badge 
                    bg="info" 
                    className="species-badge"
                    pill
                  >
                    {pet.especie}
                  </Badge>
                </div>
                <Card.Body>
                  <Card.Title>{pet.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Dueño: {pet.dueño}
                  </Card.Subtitle>
                  
                  <div className="pet-details">
                    <p><strong>Raza:</strong> {pet.raza || "Desconocida"}</p>
                    <p>
                      <strong>Edad:</strong> {calculateAge(pet.fechaNacimiento)}
                      <br />
                      <small className="text-muted">
                        Nacimiento: {formatDate(pet.fechaNacimiento)}
                      </small>
                    </p>
                    
                    {pet.diagnosticos && (
                      <div className="mt-2">
                        <p className="mb-1"><strong>Diagnósticos:</strong></p>
                        <p className="text-secondary small">{pet.diagnosticos}</p>
                      </div>
                    )}
                    
                    {pet.tratamientosPrevios && (
                      <div className="mt-2">
                        <p className="mb-1"><strong>Tratamientos:</strong></p>
                        <p className="text-secondary small">{pet.tratamientosPrevios}</p>
                      </div>
                    )}

                    {pet.documentos && pet.documentos.length > 0 && (
                      <div className="mt-2">
                        <p className="mb-1"><strong>Documentos:</strong></p>
                        <Badge bg="secondary">
                          {pet.documentos.length} {pet.documentos.length === 1 ? "Documento" : "Documentos"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="bi bi-calendar3"></i> Última actualización: {formatDate(pet.updatedAt || pet.createdAt)}
                    </small>
                    {pet.vacunas && (
                      <Badge bg="success" pill>
                        <i className="bi bi-shield-check me-1"></i>
                        Vacunado
                      </Badge>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}