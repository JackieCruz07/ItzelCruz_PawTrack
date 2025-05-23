import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./HomePets.css";
import PetsImage1 from "../../components/img/cats/cats.jpg";
import PetsImage2 from "../../components/img/cats/cats1.jpg";
import PetsImage3 from "../../components/img/cats/cats2.jpg";

function Home() {
  return (
    <div className="footer-container">
      <div className="home-container">
        <header className="header">
          <h1>
            <b>Conoce Tus Michi Pacientes</b>
          </h1>
        </header>
        <br></br>

        <section className="carousel-section">
          <Carousel style={{position: 'absolute', top: '27%', width: '100%'}}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={PetsImage1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>
                  <b>Hecha Un Vistazo</b>
                </h3>
                <p>
                  <b>Facíl acceso a sus datos y su mejor fotografía</b>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={PetsImage2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>
                  <b>Hecha Un Vistazo</b>
                </h3>
                <p>
                  <b>Facíl acceso a sus datos y su mejor fotografía</b>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={PetsImage3}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>
                  <b>Hecha Un Vistazo</b>
                </h3>
                <p>
                  <b>Facíl acceso a sus datos y su mejor fotografía</b>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>
        <br></br>
        <br></br>
        <section className="buttons-section" style={{textAlign: 'center',  position: 'absolute', top: '95%', width: '100%'}}>
          <button className="button-55">
            <Link to="../ViewCats">
              <b>Ver Mascotas</b>
            </Link>
          </button>
          <button className="button-55">
            <Link to="../Pets">
              <b>Gestionar Michis</b>
            </Link>
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
