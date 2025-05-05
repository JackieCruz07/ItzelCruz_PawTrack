const mongoose = require("mongoose");
const app = require("./App");
const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  IP_SERVER,
} = require("./constantes");

const port = process.env.PORT || 4000;

// Configuración de Mongoose
const uri = `mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`;
mongoose.set("strictQuery", false);

// Conexión a MongoDB
mongoose.connect(uri, {
/*     useNewUrlParser: true,
    useUnifiedTopology: true, */
  })
  .then(() => console.log(`Conectado a MongoDB exitosamente en el puerto: ${DB_PORT}`))
  .catch((err) => console.error("Error al conectar a MongoDB:", err.message))
  
// Arrancar el servidor Express
app.listen(port, () => {
  const currentTime = new Date().toLocaleString();
  console.log("***************");
  console.log("****API REST***");
  console.log("***************");
  console.log(`Servidor ejecutándose en http://127.0.0.1:${port}/api`);
  console.log(`Hora de inicio: ${currentTime}`);
});

module.exports = app
