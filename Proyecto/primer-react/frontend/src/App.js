import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Rutas from "./routes/Rutas";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [pacientes, setPacientes] = useState([]);

   // Guardar pacientes en localStorage cada vez que cambien
   useEffect(() => {
    if (pacientes && pacientes.length > 0) {
      localStorage.setItem("pacientes", JSON.stringify(pacientes)); // Guarda los pacientes en localStorage
    }
  }, [pacientes]);

  return (
    <Router>
      <Header />
      <div className="footer-container">
        <div className="container-fluid">
          <Rutas pacientes={pacientes} setPacientes={setPacientes} />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
