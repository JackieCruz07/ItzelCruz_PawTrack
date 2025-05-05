import * as Yup from "yup";

export const initialValues = () => ({
  mascotaId: "",
  fecha: "",
  hora: "",
  motivo: "",
  notas: "",
  estado: "Programada"
});

export const validationSchema = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Yup.object().shape({
    mascotaId: Yup.string()
      .required("Debe seleccionar una mascota"),
    
    fecha: Yup.date()
      .required("La fecha es obligatoria")
      .min(today, "La fecha no puede ser anterior a hoy")
      .typeError("Formato de fecha inválido"),
    
    hora: Yup.string()
      .required("La hora es obligatoria")
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Formato de hora inválido (HH:MM)"
      ),
    
    motivo: Yup.string()
      .required("El motivo es obligatorio")
      .min(3, "El motivo debe tener al menos 3 caracteres")
      .max(100, "El motivo no puede exceder los 100 caracteres"),
    
    notas: Yup.string()
      .max(500, "Las notas no pueden exceder los 500 caracteres"),
    
    estado: Yup.string()
      .oneOf(
        ["Programada", "Confirmada", "Cancelada", "Completada"],
        "Estado no válido"
      )
      .default("Programada")
  });
};