import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const NavBarBoos = ({ setIsLogged, isLogged }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();

  const logOut = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    setIsLogged(false);
    // para que se cierre la sesion
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    // si el token esta en el localstorage entonces esta logueado
    if (token) {
      // console.log(token);
      console.log(jwtDecode(token));

      // capturo el token que me mandan el server (que es un objeto)
      setUserId(jwtDecode(token).user.id);
      setUserName(jwtDecode(token).user.name);
      setUserType(jwtDecode(token).user.type);
    }
  }, [isLogged]);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TRAVELS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            {isLogged && userType === 0 && (
              <Nav.Link as={Link} to="/allUsers">
                Viajes de todo el mundo
              </Nav.Link>
            )}

            {isLogged && userType === 1 && (
              <Nav.Link as={Link} to="/admin">
                Vista Administrador
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {!isLogged ? (
          <div>
            <Button
              variant="outline-success"
              className="me-3"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="success"
              className="me-3"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="me-3"
              variant="outline-success"
              onClick={() => navigate(`/user/${userId}`)}
            >
              Perfil de: {userName}
            </Button>
            <Button variant="success" className="me-3" onClick={logOut}>
              LogOut
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};
