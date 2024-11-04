import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "../components/inicio/Welcome";
import Home from "../components/inicio/Home";
import About from "../components/inicio/About";
import Catalog from "../components/inicio/Catalog";
import ViewMascotas from "../components/Mascotas/ViewMascotas";
import ViewInformacion from '../components/Gestion/ViewInformacion';

import ViewCalificaciones from '../components/Calificaciones/ViewCalificaciones';



function Rutas({ pacientes, setPacientes }) {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/About" element={<About />} />
      <Route path="/ViewMascotas" element={<ViewMascotas pacientes={pacientes} />} />
      <Route path="/ViewInformacion" element={<ViewInformacion setPacientes={setPacientes} pacientes={pacientes} />} />

      <Route path='/Calificaciones' element={<ViewCalificaciones/>}/>

    </Routes>
  );
}

export default Rutas;
