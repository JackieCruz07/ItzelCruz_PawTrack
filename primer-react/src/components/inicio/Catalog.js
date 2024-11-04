import React from 'react'
import {Link} from "react-router-dom";
import Header from '../Header'
//import './Catalogo.css'

function Menu() {
  return (
    <div>
      <Header/>
      Menu
      <li><Link to='Home'>Home</Link></li>
    </div>
  )
}
export default Menu