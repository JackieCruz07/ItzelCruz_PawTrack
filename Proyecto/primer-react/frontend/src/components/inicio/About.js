import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AboutImage from "../img/pets1.jpg";

function About() {
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
            style={{ textAlign: "left", fontWeight: "bold", fontSize: "2em" }}
          >
            Acerca de PawTrack
          </h1>
          <p style={{ textAlign: "justify" }}>
            PawTrack es una plataforma integral diseñada para mejorar la gestión
            de clínicas veterinarias. Ofrecemos un sistema intuitivo que permite
            llevar un registro detallado de cada mascota. Con PawTrack, las veterinarias
            pueden organizar mejor su tiempo, aumentar la eficiencia y brindar
            un servicio de alta calidad.
          </p>
          <p style={{ textAlign: "justify" }}>
            Nuestro objetivo es revolucionar la atención veterinaria mediante el
            uso de tecnología avanzada, proporcionando una solución
            que facilita tanto a los médicos veterinarios como a los dueños de
            mascotas, gestionando de manera eficaz el bienestar de los animales.
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
              <Link to="../Home">
                <b>Volver al Inicio</b>
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
            src={AboutImage}
            alt="About PawTrack"
            className="img-fluid rounded shadow"
            style={{ maxWidth: "80%", maxHeight: "80%", borderRadius: "15px" }}
          />
        </div>
      </div>
    </Container>
  );
}

export default About;
