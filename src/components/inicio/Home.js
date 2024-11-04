import React from 'react'
import {Link} from "react-router-dom";
import './Home.css'
import Header from '../Header';
import Footer from '../Footer';

function Home() {
  return (
  <div>
   <Header/>
   <button><Link className="boton" to='../ViewMascotas'>Ver Mascotas</Link></button>
   <button><Link className="boton" to='../ViewInformacion'>Gestionar</Link></button>
   <button><Link className="boton" to='/Calificaciones'>Calificaciones</Link></button>
   <Footer/>
  </div>
  );
}
export default Home;
