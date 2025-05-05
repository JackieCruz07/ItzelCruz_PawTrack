import * as Yup from "yup";

export const initialValues = () => ({
  nombre: "",
  dueño: "",
  especie: "",
  raza: "",
  fechaNacimiento: "",
  diagnosticos: "",
  tratamientosPrevios: "",
  vacunas: "",
  alergias: "",
  imagen: null,
  documentos: [{
    url: String,
    name: String,
    type: String,
    size: Number,
    uploadDate: Date
  }]
});

export const validationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    dueño: Yup.string().required("El dueño es obligatorio"),
    especie: Yup.string().required("La especie es obligatoria"),
    raza: Yup.string(),
    fechaNacimiento: Yup.date(),
    diagnosticos: Yup.string(),
    tratamientosPrevios: Yup.string(),
    vacunas: Yup.string(),
    alergias: Yup.string(),
  });