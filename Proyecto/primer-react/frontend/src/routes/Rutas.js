import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "../components/inicio/Welcome";
import Home from "../components/inicio/Home";
import About from "../components/inicio/About";
import Pacientes from "../components/inicio/Pacientes";
import ViewCats from "../components/Mascotas/ViewCats";
import ViewInfoCats from '../components/Gestion/ViewInfoCats';
import HomeCats from "../components/inicio/HomeCats"


function Rutas({ pacientes, setPacientes }) {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Pacientes" element={<Pacientes />} />
      <Route path="/About" element={<About />} />
      <Route path="/ViewCats" element={<ViewCats pacientes={pacientes} />} />
      <Route path="/HomeCats" element={<HomeCats/>} />
      <Route path="/ViewInfoCats" element={<ViewInfoCats setPacientes={setPacientes} pacientes={pacientes} />} />

    </Routes>
  );
}

export default Rutas;
