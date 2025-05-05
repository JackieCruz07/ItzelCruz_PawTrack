import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Badge,
  Spinner,
  Alert,
  Modal,
  Card,
  ListGroup,
  Row,
  Col
} from "react-bootstrap";
import { PetsService } from "../../api";
import { ENV } from "../../utils/Constantes";
import "./ListPets.scss";

const petsService = new PetsService();

export function ListPets({ petId, onAddDocuments = () => {}, onEditPet = () => {}, isReadOnly = false }) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Si se proporciona un ID específico de mascota, solo obtener esa mascota
      if (petId) {
        const response = await petsService.getPetById(petId);
        if (response && response.pet) {
          setPets([response.pet]);
        } else {
          setError("No se pudo obtener la información de la mascota");
        }
      } else {
        // Obtener todas las mascotas
        const response = await petsService.getPets();
        if (Array.isArray(response)) {
          setPets(response);
        } else {
          console.error("Respuesta inesperada:", response);
          setError("Formato de datos inesperado");
        }
      }
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
      setError("Error al cargar las mascotas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [petId]);

  const handleDelete = async (petId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta mascota?")) return;

    try {
      setIsLoading(true);
      await petsService.deletePet(petId);
      setPets(pets.filter((pet) => pet?._id !== petId));
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      setError("Error al eliminar la mascota");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (petId, docId) => {
    if (!window.confirm("¿Estás seguro de eliminar este documento?")) return;

    try {
      setIsLoading(true);
      await petsService.deletePetDocument(petId, docId);
      // Actualizar el estado local con el documento eliminado
      setPets(pets.map(pet => {
        if (pet._id === petId) {
          return {
            ...pet,
            documentos: pet.documentos.filter(doc => doc._id !== docId)
          };
        }
        return pet;
      }));
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      setError("Error al eliminar el documento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDocuments = (pet) => {
    setSelectedPet(pet);
    setShowDocumentsModal(true);
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

    // CORREGIDO: Construir la URL correcta para acceder a la imagen
    // Eliminamos "api" de la ruta ya que el servidor sirve los archivos estáticos en /uploads/
    return `${ENV.BASE_API.replace('/api', '')}${imagePath}`;
  };

  const getDocumentIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return "bi bi-file-earmark-pdf";
    if (mimeType.includes('word')) return "bi bi-file-earmark-word";
    if (mimeType.includes('image')) return "bi bi-file-earmark-image";
    return "bi bi-file-earmark";
  };

  const buildDocumentUrl = (docPath) => {
    if (!docPath) return null;
    // CORREGIDO: Construir la URL correcta para acceder al documento
    // Eliminamos "api" de la ruta ya que el servidor sirve los archivos estáticos en /uploads/
    return `${ENV.BASE_API.replace('/api', '')}${docPath}`;
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p>Cargando mascotas...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dueño</th>
              <th>Especie/Raza</th>
              <th>Edad</th>
              <th>Diagnósticos</th>
              <th>Tratamientos</th>
              <th>Vacunas</th>
              <th>Alergias</th>
              <th>Imagen</th>
              <th>Documentos</th>
              {!isReadOnly && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet._id}>
                <td>{index + 1}</td>
                <td>
                  <strong>{pet.nombre}</strong>
                </td>
                <td>{pet.dueño}</td>
                <td>
                  <Badge bg="info" className="me-1">
                    {pet.especie}
                  </Badge>
                  <br />
                  {pet.raza}
                </td>
                <td>
                  {calculateAge(pet.fechaNacimiento)}
                  <br />
                  <small className="text-muted">
                    {formatDate(pet.fechaNacimiento)}
                  </small>
                </td>
                <td className="small-text">
                  {pet.diagnosticos || "Ninguno registrado"}
                </td>
                <td className="small-text">
                  {pet.tratamientosPrevios || "Ninguno registrado"}
                </td>
                <td className="small-text">
                  {pet.vacunas || "Ninguna registrada"}
                </td>
                <td className="small-text">
                  {pet.alergias || "Ninguna registrada"}
                </td>
                <td>
                  {pet.imagen ? (
                    <img
                      src={buildImageUrl(pet.imagen)}
                      alt={`Imagen de ${pet.nombre}`}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <div className="placeholder-image">
                      <i className="bi bi-image"></i>
                    </div>
                  )}
                </td>
                <td>
                  {pet.documentos && pet.documentos.length > 0 ? (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleViewDocuments(pet)}
                    >
                      {pet.documentos.length} {pet.documentos.length === 1 ? "Documento" : "Documentos"}
                    </Button>
                  ) : (
                    <span className="text-muted">Sin documentos</span>
                  )}
                </td>
                {!isReadOnly && (
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => onEditPet(pet)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(pet._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <i className="bi bi-trash-fill"></i>
                        )}
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal para ver documentos */}
      <Modal
        show={showDocumentsModal}
        onHide={() => setShowDocumentsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPet ? `Documentos de ${selectedPet.nombre}` : "Documentos"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPet && selectedPet.documentos && selectedPet.documentos.length > 0 ? (
            <Row>
              {selectedPet.documentos.map((doc, index) => (
                <Col md={6} key={doc._id || index} className="mb-3">
                  <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className={getDocumentIcon(doc.type)} style={{ fontSize: "1.2rem" }}></i>
                        <span className="ms-2">{doc.name}</span>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteDocument(selectedPet._id, doc._id)}
                        disabled={isLoading}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <small className="text-muted">Tipo: {doc.type}</small>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <small className="text-muted">
                          Fecha: {formatDate(doc.createdAt)}
                        </small>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a 
                          href={buildDocumentUrl(doc.url)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          Ver Documento
                        </a>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info">
              Esta mascota no tiene documentos asociados
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDocumentsModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}