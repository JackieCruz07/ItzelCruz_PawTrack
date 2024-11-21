const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

let DatosPet = require('./bd/DatosPet');

const app = express();
const port = 4000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.get("/mensaje", (req, res) => {
    res.send("Servidor ejecutado");
});

// Endpoint para obtener datos de mascotas
app.get('/api/pets', (req, res) => {
    res.json(DatosPet); // Responde con los datos
  });

/* app.post("/api/pacientes", (req, res) => {
    try {
        DatosPet = req.body;
        res.json(DatosPet);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error actualizando los pacientes");
    }
}); */

app.get("/filtro", (req, res) => {
  //const {nombre,apellidos}=req.body;
    const filtro = DatosPet.filter(datos => {
        return datos.nombre.includes("G");
    });
    res.send(filtro);
});

app.listen(port, () => {
    console.log(`Servidor ejecutado en el puerto ${port}`);
});
