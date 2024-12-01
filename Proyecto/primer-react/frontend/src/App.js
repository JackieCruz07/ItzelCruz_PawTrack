import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Rutas from "./routes/Rutas";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [pets, setPets] = useState([]);

   // Guardar pacientes en localStorage cada vez que cambien
   useEffect(() => {
    if (pets && pets.length > 0) {
      localStorage.setItem("pacientes", JSON.stringify(pets)); // Guarda los pacientes en localStorage
    }
  }, [pets]);

  return (
    <Router>
      <Header />
      <div className="footer-container">
        <div className="container-fluid">
          <Rutas pets={pets} setPets={setPets} />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
