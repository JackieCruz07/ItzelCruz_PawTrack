const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/mensaje", (req, res) => {
  res.send("Servidor corriendo");
});

app.post("/Guardar", (req, res) => {
  try {
    const { nombre } = req.body;
    console.log(nombre);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log("Servidor ejecutado en el puerto 3001");
});
