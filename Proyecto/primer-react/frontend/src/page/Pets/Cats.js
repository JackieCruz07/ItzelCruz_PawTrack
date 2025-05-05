// Página para Gatos
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PetCards } from "../../components/pets/ItemPets/PetsCard";

export function CatsPage() {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Nuestros Gatos</h1>
          <p className="lead">Hi</p>
        </Col>
      </Row>
      <PetCards species="Gato" maxPerRow={3} />
    </Container>
  );
}
