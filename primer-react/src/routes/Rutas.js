import React from 'react';
import {Routes,Route} from "react-router-dom";
//Rutas absolutas
import Welcome from '../components/inicio/Welcome'
import Home from '../components/inicio/Home';
import About from '../components/inicio/About';
import Catalog from '../components/inicio/Catalog'

function Rutas() {
  return (
    <Routes>
         <Route path='/' element={<Welcome/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Catalog' element={<Catalog/>}/>
        <Route path='/About' element={<About/>}/>

  
      </Routes>
  )
}
export default Rutas