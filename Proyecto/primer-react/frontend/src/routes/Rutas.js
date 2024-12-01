import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "../components/inicio/Welcome";
import Home from "../components/inicio/Home";
import About from "../components/inicio/About";
import Pacientes from "../components/inicio/Pacientes";
import ViewCats from "../components/Mascotas/ViewCats";
import ViewDogs from "../components/Mascotas/ViewDogs";
import ViewExotics from "../components/Mascotas/ViewExotics";
import ViewInfoCats from '../components/Gestion/ViewInfoCats';
import ViewInfoDogs from "../components/Gestion/ViewInfoDogs";
import ViewInfoExotics from "../components/Gestion/ViewInfoExotics";
import HomeCats from "../components/HomePets/HomeCats"
import HomeDogs from "../components/HomePets/HomeDogs"
import HomeExotics from "../components/HomePets/HomeExotics"
import ViewSearch from "../components/ViewSearch"

function Rutas({ pets, setPets }) {
  return (
    <Routes> 
      <Route path="/ViewSearch" element={<ViewSearch />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Pacientes" element={<Pacientes />} />
      <Route path="/About" element={<About />} />
      <Route path="/HomeCats" element={<HomeCats/>} />
      <Route path="/HomeDogs" element={<HomeDogs/>} />
      <Route path="/HomeExotics" element={<HomeExotics/>} />
      <Route path="/ViewCats" element={<ViewCats pets={pets} />} />
      <Route path="/ViewDogs" element={<ViewDogs pets={pets} />} />
      <Route path="/ViewExotics" element={<ViewExotics pets={pets} />} />
      <Route path="/ViewInfoCats" element={<ViewInfoCats setPets={setPets} pets={pets} />} />
      <Route path="/ViewInfoDogs" element={<ViewInfoDogs setPets={setPets} pets={pets} />} />
      <Route path="/ViewInfoExotics" element={<ViewInfoExotics setPets={setPets} pets={setPets} />} />

    </Routes>
  );
}

export default Rutas;
