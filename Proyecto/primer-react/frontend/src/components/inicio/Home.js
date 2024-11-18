import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pets from "../img/pets.jpg";
//import './Home.css';

function Home() {
  return (
    <Container
      className="container rounded shadow"
      style={{
        padding: "25px",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
      }}
    >
      <div style={{ display: "flex", height: "80vh" }}>
        {/* Left side */}
        <div
          style={{
            flex: 1,
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "Left",
          }}
        >
          <h1
            style={{ textAlign: "Left", fontWeight: "bold", fontSize: "2em" }}
          >
            Bienvenido
          </h1>
          <h2 style={{ fontWeight: "bold", fontSize: "2em" }}>
            ¿Qué es PawTrack?
          </h2>
          <p style={{ textAlign: "justify" }}>
            Nuestra app web de gestión de mascotas está diseñada específicamente
            para veterinarias que buscan optimizar sus operaciones y mejorar la
            atención a sus pacientes más queridos. Con una interfaz amigable y
            funcionalidades de gestión avanzadas, te ayudamos a mantener el
            control y cuidado de las mascotas con facilidad.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="primary"
              style={{
                padding: "10px 20px",
                marginTop: "0px",
                backgroundColor: "#2980b9",
                border: "none",
              }}
            >
              <Link to="../Pacientes">
                <b>Ver Pacientes</b>
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            justifyItems: "center",
            paddingBottom: "80px",
          }}
        >
          <img
            src={Pets}
            alt="PawTrack"
            className="img-fluid rounded shadow"
            style={{ maxWidth: "80%", maxHeight: "80%", borderRadius: "15px" }}
          />
        </div>
      </div>
    </Container>
  );
}

export default Home;
