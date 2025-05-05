import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//import { imagenes } from "../../assets";
import "./Pets.scss";
import {
  Button,
  Form,
  Row,
  Col,
  Tab,
  Tabs,
  Spinner,
  Alert,
  Image,
  ProgressBar,
} from "react-bootstrap";
import { initialValues, validationSchema } from "./Pets.form";
import { ListPets } from "../ListPets";
import { PetsService } from "../../api";
import { useState, useEffect, useCallback } from "react";
import { ENV } from "../../utils/Constantes";

const petsService = new PetsService();

export function Pets() {
  // eslint-disable-next-line no-unused-vars
  const [showDocsModal, setShowDocsModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentPetId, setCurrentPetId] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refreshList, setRefreshList] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

  // Limpiar mensajes de error/éxito después de 5 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Resetear formulario cuando se cambia entre crear y editar
  useEffect(() => {
    if (editPet) {
      // Cargar datos del pet para editar
      formik.setValues({
        _id: editPet._id,
        nombre: editPet.nombre || "",
        dueño: editPet.dueño || "",
        especie: editPet.especie || "",
        raza: editPet.raza || "",
        fechaNacimiento: editPet.fechaNacimiento ? editPet.fechaNacimiento.split("T")[0] : "",
        diagnosticos: editPet.diagnosticos || "",
        tratamientosPrevios: editPet.tratamientosPrevios || "",
        vacunas: editPet.vacunas || "",
        alergias: editPet.alergias || "",
        // No se establecen los archivos porque deben ser seleccionados nuevamente
      });
      
      // Mostrar la imagen existente como preview si hay una
      if (editPet.imagen) {
        setImagePreview(buildImageUrl(editPet.imagen));
      } else {
        setImagePreview(null);
      }
      
      // Limpiar documentos seleccionados
      setDocumentFiles([]);
    } else {
      formik.resetForm();
      setImagePreview(null);
      setDocumentFiles([]);
    }
  }, [editPet]);

  const buildImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${ENV.BASE_API}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setIsLoading(true);
        setUploadProgress(0);
        setError(null);
        
        if (editPet) {
          await handleUpdatePet(formValue);
        } else {
          await handleCreatePet(formValue);
        }
      } catch (error) {
        console.error("Error en submit:", error);
        setError(error.message || "Error al procesar el formulario");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Función para crear una nueva mascota
  const handleCreatePet = async (formValue) => {
    try {
      setUploadProgress(10);
      
      // Preparar los datos con los archivos
      const petData = {
        ...formValue,
        imagenFile: formik.values.imagenFile,
        documentos: documentFiles
      };
      
      // Crear la mascota con todos los archivos
      const response = await petsService.createPet(petData);
      setUploadProgress(100);
      
      if (!response || !response.pet) {
        throw new Error("No se pudo crear la mascota");
      }
      
      // Limpiar el formulario y mostrar mensaje de éxito
      setSuccess("¡Mascota creada correctamente!");
      formik.resetForm();
      setImagePreview(null);
      setDocumentFiles([]);
      setRefreshList((prev) => prev + 1);
      setActiveTab("list");
    } catch (error) {
      console.error("Error al crear mascota:", error);
      setError(error.response?.data?.message || "Error al crear la mascota");
    }
  };

  // Función para actualizar una mascota existente
  const handleUpdatePet = async (formValue) => {
    try {
      setUploadProgress(10);
      
      const updateData = {
        ...formValue,
        imagenFile: formik.values.imagenFile,
        documentos: documentFiles
      };
      
      await petsService.updatePet(formValue._id, updateData);
      setUploadProgress(100);
      
      setSuccess("Mascota actualizada correctamente");
      setRefreshList((prev) => prev + 1);
      setEditPet(null);
      formik.resetForm();
      setImagePreview(null);
      setDocumentFiles([]);
      setActiveTab("list");
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      setError(error.response?.data?.message || "Error al actualizar la mascota");
    }
  };

  // Configuración para dropzone de imagen
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false,
    onDrop: useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Guardar el archivo en formik
        formik.setFieldValue("imagenFile", file);
        
        // Crear preview de la imagen
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }, [])
  });

  // Configuración para dropzone de documentos
  const { getRootProps: getDocsRootProps, getInputProps: getDocsInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true,
    onDrop: useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Guardar los archivos en el estado
        setDocumentFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      }
    }, [])
  });

  // Eliminar un documento seleccionado
  const handleRemoveDocument = (indexToRemove) => {
    setDocumentFiles((prevFiles) => 
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // Cancelar la edición
  const handleCancelEdit = () => {
    setEditPet(null);
    formik.resetForm();
    setImagePreview(null);
    setDocumentFiles([]);
  };

  // Manejar la edición de una mascota
  const handleEditPet = (pet) => {
    setEditPet(pet);
    setActiveTab("info");
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        justify
      >
        <Tab eventKey="info" title="Información de Mascota">
          <div className="pet-form-container p-4 border rounded">
            <h2>{editPet ? "Editar Mascota" : "Nueva Mascota"}</h2>
            
            {/* Mensajes de éxito y error */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            {/* Barra de progreso de subida */}
            {isLoading && (
              <ProgressBar 
                now={uploadProgress} 
                label={`${uploadProgress}%`} 
                variant="info" 
                className="mb-3" 
              />
            )}

            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre de la mascota"
                      name="nombre"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dueño *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del dueño"
                      name="dueño"
                      value={formik.values.dueño}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.dueño}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.dueño}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Especie *</Form.Label>
                    <Form.Select
                      name="especie"
                      value={formik.values.especie}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.especie}
                    >
                      <option value="">Selecciona una especie</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Exotico">Exotico</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.especie}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Raza</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Raza"
                      name="raza"
                      value={formik.values.raza}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="fechaNacimiento"
                      value={formik.values.fechaNacimiento}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Diagnósticos</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Diagnósticos"
                      name="diagnosticos"
                      value={formik.values.diagnosticos}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tratamientos Previos</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Tratamientos previos"
                      name="tratamientosPrevios"
                      value={formik.values.tratamientosPrevios}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vacunas</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Vacunas"
                      name="vacunas"
                      value={formik.values.vacunas}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Alergias</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Alergias"
                      name="alergias"
                      value={formik.values.alergias}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Sección para subir imagen */}
              <Form.Group className="mb-4">
                <Form.Label>Imagen de la mascota</Form.Label>
                <div 
                  {...getImageRootProps()} 
                  className="dropzone-container p-3 border rounded text-center"
                  style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                >
                  <input {...getImageInputProps()} />
                  {imagePreview ? (
                    <div className="text-center">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-thumbnail mb-2" 
                        style={{ maxHeight: '200px' }} 
                      />
                      <p className="mb-0">Haga clic o arrastre para cambiar la imagen</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <i className="bi bi-cloud-arrow-up display-4"></i>
                      <p className="mb-0">Haga clic o arrastre una imagen aquí</p>
                    </div>
                  )}
                </div>
              </Form.Group>

              {/* Sección para subir documentos */}
              <Form.Group className="mb-4">
                <Form.Label>Documentos de la mascota</Form.Label>
                <div 
                  {...getDocsRootProps()} 
                  className="dropzone-container p-3 border rounded text-center"
                  style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                >
                  <input {...getDocsInputProps()} />
                  <div className="text-center">
                    <i className="bi bi-file-earmark-arrow-up display-4"></i>
                    <p className="mb-0">Haga clic o arrastre documentos aquí</p>
                    <small className="text-muted">(PDF, Word, imágenes)</small>
                  </div>
                </div>
              </Form.Group>

              {/* Lista de documentos seleccionados */}
              {documentFiles.length > 0 && (
                <div className="selected-files mb-4">
                  <h5>Documentos seleccionados:</h5>
                  <ul className="list-group">
                    {documentFiles.map((file, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <i className={file.type.includes('pdf') ? 'bi bi-file-earmark-pdf' : 
                                        file.type.includes('word') ? 'bi bi-file-earmark-word' : 
                                        file.type.includes('image') ? 'bi bi-file-earmark-image' : 
                                        'bi bi-file-earmark'}></i>
                          {file.name} <small className="text-muted">({(file.size / 1024).toFixed(2)} KB)</small>
                        </div>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleRemoveDocument(index)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                {editPet ? (
                  <>
                    <Button 
                      variant="secondary" 
                      type="button" 
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Actualizando...
                        </>
                      ) : (
                        "Actualizar Mascota"
                      )}
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="ms-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar Mascota"
                    )}
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Tab>

        <Tab eventKey="list" title="Lista de Mascotas">
          <div className="pet-list-container">
            <ListPets 
              key={refreshList} 
              onEditPet={handleEditPet} 
              isReadOnly={false} 
            />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}