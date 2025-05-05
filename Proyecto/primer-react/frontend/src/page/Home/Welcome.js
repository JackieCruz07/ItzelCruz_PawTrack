import React from "react";
import { Link } from "react-router-dom";
import './Welcome.css';

export function Welcome() {
  return (
    <div className="page-container">
      <ul className="shadow-button-set">
        <li><button><Link className="boton" to='Home'>Home</Link></button></li>
        <li><button><Link className="boton" to='Pacientes'>Pacientes</Link></button></li>
        <li><button><Link className="boton" to='About'>Acerca de</Link></button></li>
      </ul>
    </div>
  );
}

