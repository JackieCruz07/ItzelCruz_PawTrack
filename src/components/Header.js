import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="navbar-logo">
              <h1>Navbar</h1>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="menu-items">
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="Shopping">Comprar</Link>
              </li>
              <li>
                <Link to="/Catalog">Catalogo</Link>
              </li>
              <li>
                <Link to="Home">Contacto</Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
