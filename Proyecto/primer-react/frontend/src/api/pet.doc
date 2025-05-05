import { ENV } from "../utils/Constantes";
import axios from "axios";

export class PetsService {
  baseApi = ENV.BASE_API;

  // Método para obtener todas las mascotas
  async getPets(species = null) {
    try {
      const url = species
        ? `${this.baseApi}${ENV.API_ROUTES.PETS}?especie=${species}`
        : `${this.baseApi}${ENV.API_ROUTES.PETS}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error en getPets:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para obtener mascota por ID
  async getPetById(petId) {
    try {
      const response = await axios.get(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error en getPetById:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Método para crear una nueva mascota
  async createPet(petData) {
    try {
      // Separar los archivos de los datos de la mascota
      const { imagenFile, documentos, ...dataToSend } = petData;
  
      // Preparar datos para enviar al servidor
      const formattedData = {
        ...dataToSend,
        fechaNacimiento: dataToSend.fechaNacimiento || null,
        diagnosticos: dataToSend.diagnosticos || "",
        tratamientosPrevios: dataToSend.tratamientosPrevios || "",
        vacunas: dataToSend.vacunas || "",
        alergias: dataToSend.alergias || "",
      };
  
      // Crear la mascota primero sin archivos
      const response = await axios.post(
        `${this.baseApi}${ENV.API_ROUTES.PETS}`,
        formattedData
      );
  
      // Obtener el id de la mascota recién creada
      const newPetId = response.data?.pet?._id;
  
      if (!newPetId) {
        throw new Error("No se pudo obtener la información de la mascota creada");
      }
  
      // Subir la imagen si existe
      if (imagenFile) {
        try {
          await this.uploadPetImage(newPetId, imagenFile);
        } catch (imgError) {
          console.error("Error al subir la imagen:", imgError);
        }
      }
  
      // Subir los documentos si existen
      if (documentos && documentos.length > 0) {
        for (const doc of documentos) {
          try {
            await this.addPetDocument(newPetId, doc);
          } catch (docError) {
            console.error("Error al subir documento:", docError);
          }
        }
      }
  
      // Obtener la mascota actualizada con todos los archivos
      const updatedPet = await this.getPetById(newPetId);
      return { pet: updatedPet.pet };
    } catch (error) {
      console.error("Error en createPet:", error.message);
      throw error;
    }
  }

  // Método para subir imagen de mascota
  async uploadPetImage(petId, imageFile) {
    try {
      if (!imageFile) {
        throw new Error("No se proporcionó archivo de imagen");
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/upload/image/${petId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al subir imagen:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para subir documentos de mascota
  async addPetDocument(petId, file) {
    try {
      if (!file) {
        throw new Error("No se proporcionó un archivo para subir");
      }

      const formData = new FormData();
      formData.append("document", file);

      const response = await axios.post(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/upload/document/${petId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error en addPetDocument:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para actualizar mascota
  async updatePet(petId, petData) {
    try {
      const { imagenFile, documentos, imagen, ...dataToUpdate } = petData;
      
      // Mantener la URL de la imagen existente si no hay nueva imagen
      if (!imagenFile && imagen) {
        dataToUpdate.imagen = imagen;
      }

      // Actualizar datos básicos
      const response = await axios.patch(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}`,
        dataToUpdate
      );
      
      let updatedPet = response.data?.pet;
      
      if (!updatedPet) {
        throw new Error("Error al actualizar datos de la mascota");
      }
      
      // Subir nueva imagen si existe
      if (imagenFile) {
        try {
          const imageResponse = await this.uploadPetImage(petId, imagenFile);
          updatedPet.imagen = imageResponse.imageUrl; // Actualizar con la nueva URL
        } catch (imgError) {
          console.error("Error al actualizar imagen:", imgError);
        }
      }
      
      // Subir nuevos documentos
      if (documentos?.length > 0) {
        for (const doc of documentos) {
          try {
            await this.addPetDocument(petId, doc);
            // La mascota actualizada ya tendrá los documentos al obtenerla nuevamente
          } catch (docError) {
            console.error("Error al subir documento:", docError);
          }
        }
      }

      // Obtener la mascota actualizada para tener todos los documentos actualizados
      const refreshedPet = await this.getPetById(petId);
      return refreshedPet.pet;
    } catch (error) {
      console.error("Error en updatePet:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para eliminar un documento de una mascota
  async deletePetDocument(petId, documentId) {
    try {
      const response = await axios.delete(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}/documents/${documentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar documento:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para eliminar una mascota
  async deletePet(petId) {
    try {
      const response = await axios.delete(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error en deletePet:", error.response?.data || error.message);
      throw error;
    }
  }

  // Método para obtener todos los documentos de una mascota
  async getPetDocuments(petId) {
    try {
      const response = await axios.get(
        `${this.baseApi}${ENV.API_ROUTES.PETS}/${petId}/documents`
      );
      return response.data.documents || [];
    } catch (error) {
      console.error("Error al obtener documentos:", error.response?.data || error.message);
      throw error;
    }
  }
}