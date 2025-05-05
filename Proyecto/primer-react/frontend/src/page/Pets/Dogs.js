// Página para Perros
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PetCards } from "../../components/pets/ItemPets/PetsCard";

export function DogsPage() {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Nuestros Perros</h1>
          <p className="lead">Hi</p>
        </Col>
      </Row>
      <PetCards species="Perro" maxPerRow={3} />
    </Container>
  );
}