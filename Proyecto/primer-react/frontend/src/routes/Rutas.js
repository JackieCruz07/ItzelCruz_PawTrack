import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Welcome } from "../page/Home";
import Home from "../components/inicio/Home";
import { AppointmentsPage } from "../page/Appointments/Appointments";
import About from "../components/inicio/About";
import Pacientes from "../components/inicio/MenuPacientes/Pacientes";

import ViewInfoCats from "../page/Gestion/ViewInfoCats";
import ViewInfoDogs from "../page/Gestion/ViewInfoDogs";
import ViewInfoExotics from "../page/Gestion/ViewInfoExotics";
import HomeCats from "../page/HomePets/HomeCats";
import HomeDogs from "../page/HomePets/HomeDogs";
import HomeExotics from "../page/HomePets/HomeExotics";
import ViewSearch from "../components/inicio/Menu/ViewSearch";
import { Pets } from "../components/Formulario";
import { ListPets } from "../components/ListPets";

import { DogsPage } from "../page/Pets/Dogs";
import { CatsPage } from "../page/Pets/Cats";
import { ExoticPetsPage } from "../page/Pets/Exotics";

import LoginPage from "../page/Auth/Login";
import RegisterPage from "../page/Auth/Register";
import ProfilePage from "../page/Auth/Profile";
//import UserManagementPage from "../page/Auth/UserManagement";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../api/hooks/useAuth";

function Rutas({ pets, setPets }) {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/Home" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/Home" replace /> : <RegisterPage />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Welcome /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Pets"
        element={
          <ProtectedRoute>
            <Pets setPets={setPets} pets={pets} ListPets={ListPets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewSearch"
        element={
          <ProtectedRoute>
            <ViewSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Citas"
        element={
          <ProtectedRoute>
            <AppointmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Pacientes"
        element={
          <ProtectedRoute>
            <Pacientes />
          </ProtectedRoute>
        }
      />
      <Route path="/About" element={<About />} />
      <Route
        path="/HomeCats"
        element={
          <ProtectedRoute>
            <HomeCats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/HomeDogs"
        element={
          <ProtectedRoute>
            <HomeDogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/HomeExotics"
        element={
          <ProtectedRoute>
            <HomeExotics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewDogs"
        element={
          <ProtectedRoute>
            <DogsPage pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewCats"
        element={
          <ProtectedRoute>
            <CatsPage pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewExotics"
        element={
          <ProtectedRoute>
            <ExoticPetsPage pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewInfoCats"
        element={
          <ProtectedRoute>
            <ViewInfoCats setPets={setPets} pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewInfoDogs"
        element={
          <ProtectedRoute>
            <ViewInfoDogs setPets={setPets} pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewInfoExotics"
        element={
          <ProtectedRoute>
            <ViewInfoExotics setPets={setPets} pets={pets} />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/Home" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default Rutas;
