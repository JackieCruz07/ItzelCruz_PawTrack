import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaHome,
  FaPaw,
  FaPhone,
  FaUser,
  FaTools,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../api/services/auth.service";
import { useAuth } from "../../../api/hooks/useAuth";
import axios from "axios";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pets");
        const result = response.data;
        const combinedData = [
          ...(result.Gato || []),
          ...(result.Perro || []),
          ...(result.Exotico || []),
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
    if (!searchTerm.trim()) return;

    const normalizedSearch = searchTerm.toLowerCase();

    const results = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(normalizedSearch) ||
        item.dueño.toLowerCase().includes(normalizedSearch) ||
        item.edad?.toString().includes(searchTerm) ||
        item.especie?.toLowerCase().includes(normalizedSearch) ||
        item.raza?.toLowerCase().includes(normalizedSearch)
    );

    if (results.length > 0) {
      navigate("/ViewSearch", { state: { pacientes: results } });
    } else {
      alert("No se encontraron resultados para la búsqueda.");
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (loading) {
    return null; // O un spinner de carga
  }

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

            <Dropdown className="mx-2">
              <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center"
                id="dropdown-pets"
              >
                <FaPaw className="me-1" /> Pacientes
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/ViewDogs">Perros</Dropdown.Item>
                <Dropdown.Item href="/ViewCats">Gatos</Dropdown.Item>
                <Dropdown.Item href="/ViewExotics">Exóticos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-2">
              <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center"
                id="dropdown-management"
              >
                <FaTools className="me-1" /> Gestión
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Pets">
                  <i className="me-2" /> Mascotas
                </Dropdown.Item>
                <Dropdown.Item href="/Citas">
                  <i className="me-2"></i> Citas
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              href="/contact"
              className="d-flex align-items-center mx-2"
            >
              <FaPhone className="me-1" /> Contacto
            </Nav.Link>

            {user ? (
              <Dropdown className="mx-2">
                <Dropdown.Toggle
                  variant="light"
                  className="d-flex align-items-center"
                  id="dropdown-profile"
                >
                  <FaUser className="me-1" /> {user.nombre || "Perfil"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Mi Perfil</Dropdown.Item>
                  {user.role === "admin" && (
                    <Dropdown.Item href="/admin">Panel Admin</Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="d-flex align-items-center mx-2"
              >
                <FaSignInAlt className="me-1" /> Iniciar sesión
              </Nav.Link>
            )}

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

