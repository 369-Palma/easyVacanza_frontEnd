import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const CustomNavbar = ({ claim }) => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="info" variant="light" fixed="top">
      <Container className="d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          <strong> EasyVacanza</strong> - {claim}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-flex align-items-end"
        >
          <Nav className="navLinks ms-auto ">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/offerte" ? "active" : ""
              }`}
              to="/offerte"
            >
              Offerte
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/eventi" ? "active" : ""
              }`}
              to="/eventi"
            >
              Eventi
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/prenotazione" ? "active" : ""
              }`}
              to="/prenotazione"
            >
              Prenota
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/login" ? "active" : ""
              }`}
              to="/login"
            >
              Login
            </Link>
            <NavDropdown title="Filtra per" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Tipologia alloggio
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tipologia vacanza
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Preferenze</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Cerca</Button>
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
