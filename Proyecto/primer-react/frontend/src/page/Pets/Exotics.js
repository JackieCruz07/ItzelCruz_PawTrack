// Página para Mascotas Exóticas
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PetCards } from "../../components/pets/ItemPets/PetsCard";

export function ExoticPetsPage() {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Mascotas Exóticas</h1>
          <p className="lead">Hi</p>
        </Col>
      </Row>
      <PetCards species="Exotico" maxPerRow={3} />
    </Container>
  );
}