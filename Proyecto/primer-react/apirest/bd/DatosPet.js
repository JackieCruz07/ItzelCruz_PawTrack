const { v4: uuidv4 } = require('uuid');

let DatosPet = [
    {
        id: uuidv4(),
        nombre: 'Polo',
        dueño: 'Jackie',
        especie: 'Gato',
        raza: 'Criollo',
        fechaNacimiento: '01/04/2022',
        edad: '2 años',
        diagnosticos: 'Gripa',
        tratamientosPrevios: 'Ninguno',
        vacunas: 'Ninguna',
        alergias: 'Ninguna',
        imagen: '/uploads/cat3.jpg'
    },
    {
        id: uuidv4(),
        nombre: 'Galileo',
        dueño: 'Jose',
        especie: 'Gato',
        raza: 'Criollo',
        fechaNacimiento: '01/04/2021',
        edad: '3 años',
        diagnosticos: 'Gripa',
        tratamientosPrevios: 'Ninguno',
        vacunas: 'Ninguna',
        alergias: 'Ninguna',
        imagen: '/uploads/cat12.jpg'
    },
    {
        id: uuidv4(),
        nombre: 'Felix',
        dueño: 'Jose',
        especie: 'Gato',
        raza: 'Criollo',
        fechaNacimiento: '01/04/2022',
        edad: '1 años',
        diagnosticos: 'Gripa',
        tratamientosPrevios: 'Ninguno',
        vacunas: 'Ninguna',
        alergias: 'Ninguna',
        imagen: '/uploads/cat4.jpg'
    },
    {
        id: uuidv4(),
        nombre: 'Buñuelo',
        dueño: 'Jackie',
        especie: 'Gato',
        raza: 'Criollo',
        fechaNacimiento: '01/04/2022',
        edad: '1 años',
        diagnosticos: 'Gripa',
        tratamientosPrevios: 'Ninguno',
        vacunas: 'Ninguna',
        alergias: 'Ninguna',
        imagen: '/uploads/cat6.jpg'
    }
];

module.exports = DatosPet;