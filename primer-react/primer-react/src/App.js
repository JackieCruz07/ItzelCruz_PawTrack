import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Rutas from './routes/Rutas';

function App() {
  const [pacientes, setPacientes] = useState([]);

  return (
    <Router>
      <div className="container-fluid">
        <Rutas pacientes={pacientes} setPacientes={setPacientes} />
      </div>
    </Router>
  );
}

export default App;
