import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaHome, FaPaw, FaPhone, FaUser, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos desde la API al montar el componente
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pets");
        const result = await response.json();
        const combinedData = [
          ...result.cats,
          ...result.dogs,
          ...result.exotics,
        ];
        setData(combinedData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const exactResults = data.filter((item) =>
      item.nombre.toLowerCase() === searchTerm.toLowerCase() ||
      item.dueño.toLowerCase() === searchTerm.toLowerCase() ||
      item.edad.toString() === searchTerm ||
      item.especie.toLowerCase() === searchTerm.toLowerCase() ||
      item.raza.toLowerCase() === searchTerm.toLowerCase()
    );

    if (exactResults.length > 0) {
      const groupedResults = exactResults.reduce((acc, pet) => {
        const owner = pet.dueño.toLowerCase();
        if (!acc[owner]) {
          acc[owner] = [];
        }
        acc[owner].push(pet);
        return acc;
      }, {});

      const resultArray = Object.values(groupedResults).flat();
      
      navigate("/ViewSearch", { state: { pacientes: resultArray } });
    } else {
      const partialResults = data.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dueño.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.edad.toString().includes(searchTerm) ||
        item.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.raza.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (partialResults.length > 0) {
        const groupedResults = partialResults.reduce((acc, pet) => {
          const owner = pet.dueño.toLowerCase();
          if (!acc[owner]) {
            acc[owner] = [];
          }
          acc[owner].push(pet);
          return acc;
        }, {});

        const resultArray = Object.values(groupedResults).flat();
        
        navigate("/ViewSearch", { state: { pacientes: resultArray } });
      } else {
        alert("No se encontraron resultados para la búsqueda.");
      }
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
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#575757",
                }}
              >
                <FaPaw className="me-1" /> Mascotas
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="/ViewDogs">
                    Perros
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/ViewCats">
                    Gatos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/ViewExotics">
                    Exóticos
                  </a>
                </li>
              </ul>
            </div>
            <Nav.Link
              href="/Pacientes"
              className="d-flex align-items-center mx-2"
            >
              <FaTools className="me-1" /> Gestión
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="d-flex align-items-center mx-2"
            >
              <FaPhone className="me-1" /> Contacto
            </Nav.Link>
            <Nav.Link
              href="/profile"
              className="d-flex align-items-center mx-2"
            >
              <FaUser className="me-1" /> Perfil
            </Nav.Link>
            <Form
              className="d-flex ms-auto"
              onSubmit={handleSearchSubmit}
              style={{
                maxWidth: "300px",
                borderRadius: "25px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FormControl
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ border: "none", borderRadius: "0", boxShadow: "none" }}
              />
              <Button
                variant="outline-success"
                style={{
                  border: "none",
                  backgroundColor: "#575757",
                  color: "#fff",
                  borderRadius: "0",
                }}
                type="submit"
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
