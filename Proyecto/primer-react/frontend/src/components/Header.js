import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaHome, FaPaw, FaPhone, FaUser, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Informacion } from "../bd/DatosMascotas";

function Header() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const navigate = useNavigate(); // Hook para navegar

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Filtra los datos
    const results = Informacion.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por nombre de la mascota
    );

    // Si se encuentran resultados, navega a la página de gatos con los resultados
    if (results.length > 0) {
      navigate("/ViewCats", { state: { pacientes: results } });
    } else {
      alert("No se encontraron resultados para la búsqueda.");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-muted">
          PawTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/Home" className="d-flex align-items-center mx-2">
              <FaHome className="me-1" /> Inicio
            </Nav.Link>
            <div className="dropdown mx-2">
              <button
                className="btn dropdown-toggle d-flex align-items-center"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: "transparent", border: "none", color: '#575757' }}
              >
                <FaPaw className="me-1" /> Mascotas
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="/Pacientes/Perros">Perros</a></li>
                <li><a className="dropdown-item" href="/ViewCats">Gatos</a></li>
                <li><a className="dropdown-item" href="/ViewMascotas/Exoticos">Exóticos</a></li>
              </ul>
            </div>
            <Nav.Link href="/ViewInformacion" className="d-flex align-items-center mx-2">
              <FaTools className="me-1" /> Gestión
            </Nav.Link>
            <Nav.Link href="/contact" className="d-flex align-items-center mx-2">
              <FaPhone className="me-1" /> Contacto
            </Nav.Link>
            <Nav.Link href="/profile" className="d-flex align-items-center mx-2">
              <FaUser className="me-1" /> Perfil
            </Nav.Link>
            <Form className="d-flex ms-auto" onSubmit={handleSearchSubmit} style={{ maxWidth: "300px", borderRadius: "25px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
              <FormControl
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange} // Actualiza el estado del término de búsqueda
                style={{ border: "none", borderRadius: "0", boxShadow: "none" }}
              />
              <Button
                variant="outline-success"
                style={{
                  border: "none",
                  backgroundColor: "#575757",
                  color: "#fff",
                  borderRadius: "0"
                }}
                type="submit" // Envía el formulario
              >
                Buscar
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
