import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="bg-light text-dark py-4 mt-4">
        <Container>
          <Row>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <h5 className="fw-bold">Pawtrack</h5>
              <p>Tu app de gestión Favorita.</p>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <h6>Contáctanos</h6>
              <p>
                <FaPhone /> +1 (52) 934-260-6814
              </p>
              <p>
                <FaEnvelope /> contacto@Pawtrack.com
              </p>
              <p>
                <FaMapMarkerAlt /> TecNM, Balancán, México
              </p>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <h6>Síguenos</h6>
              <p>Redes sociales (enlace)</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <p className="small text-muted">
                © 2024 Pawtrack. Todos los derechos reservados.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
