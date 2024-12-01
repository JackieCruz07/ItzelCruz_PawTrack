import React from "react";
import { Link } from "react-router-dom";
import "./Pacientes.css";
import Gatos from "../img/cats.jpg";
import Perros from "../img/dogs.jpg";
import Exoticos from "../img/exotic.jpg";

function Menu() {
  return (
    <div>
      <div className="footer-container">
        <h1
          style={{
            fontSize: "xx-large",
            fontWeight: "bold",
            textAlign: "center",
            paddingTop: "30px",
          }}
        >
          ¿Qué Pacientes Te Interesan Ver?
        </h1>
        <div class="wrap">
          <div class="box">
            <div class="box-top">
              <img class="box-image" src={Perros} alt="Perros" />
              <div class="title-flex">
                <h3 class="box-title">Perros</h3>
                <p class="user-follow-info">Caninos</p>
              </div>
              <p class="description">De todas las razas</p>
            </div>
            <Link className="button" to="/HomeDogs">
              Ver más...
            </Link>
          </div>
          <div class="box">
            <div class="box-top">
              <img class="box-image" src={Gatos} alt="Gatos" />
              <div class="title-flex">
                <h3 class="box-title">Gatos</h3>
                <p class="user-follow-info">Felinos</p>
              </div>
              <p class="description">Gatitos de todos los colores.</p>
            </div>
            <Link className="button" to="/HomeCats">
              Ver más...
            </Link>
          </div>
          <div class="box">
            <div class="box-top">
              <img class="box-image" src={Exoticos} alt="Exóticos" />
              <div class="title-flex">
                <h3 class="box-title">Exóticos</h3>
                <p class="user-follow-info">Diferentes Especies</p>
              </div>
              <p class="description">Desde loros hasta iguanas...</p>
            </div>
            <Link className="button" to="/HomeExotics">
              Ver más...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Menu;
