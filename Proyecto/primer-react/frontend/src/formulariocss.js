import React from "react";

function FormularioCss() {
    return (
      <form>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" placeholder="Escribe el nombre" />
        <label for="apellidos">Apellidos:</label>
        <input type="text" name="apellidos" placeholder="Escribe los apellido"/>
      </form>
    );
  }

export default FormularioCss