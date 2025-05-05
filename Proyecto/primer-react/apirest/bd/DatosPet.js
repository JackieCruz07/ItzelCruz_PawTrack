const path = require("path");

let DatosPet = {
  // Cats
  Gato: [
    {
      nombre: "Polo",
      dueño: "Jackie",
      especie: "Gato",
      raza: "Criollo",
      fechaNacimiento: "2022-04-01",
      edad: "2 años",
      diagnosticos: "Alergia estacional",
      tratamientosPrevios: "Antihistamínicos",
      vacunas: "Vacunado contra panleucopenia, herpesvirus y calicivirus.",
      alergias: "Polvo y polen",
      imagen: `/uploads/img/Polo.jpg`,
      documentos: [
        {
          url: `/uploads/documents/polo_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
    {
      nombre: "Galileo",
      dueño: "Jose",
      especie: "Gato",
      raza: "Criollo",
      fechaNacimiento: "2021-04-01",
      edad: "3 años",
      diagnosticos: "Estomatitis",
      tratamientosPrevios: "Limpieza dental y tratamiento con antibióticos.",
      vacunas: "Completas",
      alergias: "Ninguna conocida",
      imagen: `/uploads/img/Galileo.jpg`,
      documentos: [
        {
          url: `/uploads/documents/gali_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
    {
      nombre: "Felix",
      dueño: "Jose",
      especie: "Gato",
      raza: "Criollo",
      fechaNacimiento: "2022-04-01",
      edad: "2 años",
      diagnosticos: "Giardiasis",
      tratamientosPrevios: "Desparasitante",
      vacunas: "Vacunado contra panleucopenia y rabia",
      alergias: "Ninguna conocida",
      imagen: `/uploads/img/Felix.jpg`,
      documentos: [
        {
          url: `/uploads/documents/felix_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
    {
      nombre: "Buñuelo",
      dueño: "Yuceli",
      especie: "Gato",
      raza: "Criollo",
      fechaNacimiento: "2023-04-01",
      edad: "1 años",
      diagnosticos: "Obesidad leve",
      tratamientosPrevios: "Dieta controlada y aumento de actividad física",
      vacunas: "Completas",
      alergias: "Ninguna conocida",
      imagen: `/uploads/img/Buñuelo.jpg`,
      documentos: [
        {
          url: `/uploads/documents/Buñu_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
  ],
  // Dogs
  Perro: [
    {
      nombre: "Max",
      dueño: "Victor",
      especie: "Perro",
      raza: "Labrador",
      fechaNacimiento: "2020-06-15",
      edad: "4 años",
      diagnosticos: "Ninguno",
      tratamientosPrevios: "Vacuna anual",
      vacunas: "Completas",
      alergias: "Ninguna conocida",
      imagen: `/uploads/img/Max.jpg`,
      documentos: [
        {
          url: `/uploads/documents/max_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
    {
      nombre: "Luna",
      dueño: "Yuceli",
      especie: "Perro",
      raza: "Pastor Aleman",
      fechaNacimiento: "2021-03-10",
      edad: "3 años",
      diagnosticos: "Ninguno",
      tratamientosPrevios: "Desparasitación",
      vacunas: "Completas",
      alergias: "Sensible a ciertos alimentos",
      imagen: `/uploads/img/Luna.jpg`,
      documentos: [
        {
          url: `/uploads/documents/Luna_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
  ],
  // Exotic Pets
  Exotico: [
    {
      nombre: "Rex",
      dueño: "Luis",
      especie: "Exotico",
      raza: "Huron",
      fechaNacimiento: "2022-01-20",
      edad: "2 años",
      diagnosticos: "Ninguno",
      tratamientosPrevios: "Chequeo anual",
      vacunas: "Aplicadas",
      alergias: "Ninguna conocida",
      imagen: `/uploads/img/Rex.jpg`,
      documentos: [
        {
          url: `/uploads/documents/rex_historial.pdf`,
          name: "Historial Médico",
          type: "application/pdf",
        },
      ],
    },
  ],
};

module.exports = DatosPet;
