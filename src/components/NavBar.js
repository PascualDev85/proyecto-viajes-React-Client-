import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const NavBar = ({ isLogged, setIsLogged}) => {

    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userType, setUserType] = useState();

    const logOut = () =>{
      window.localStorage.removeItem("token");
      navigate("/");
      setIsLogged(false)
    }
    
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token){
      // console.log(token);
      console.log(jwtDecode(token));

      setUserId(jwtDecode(token).user.id);
      setUserName(jwtDecode(token).user.name);
      setUserType(jwtDecode(token).user.type);
    }
  
  }, [isLogged])
  

  return (
    <Navbar bg="light" expand="lg">
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

          {isLogged && userType === 0 &&
            <Nav.Link as={Link} to="/allUsers">
              Viajes de todo el mundo  
            </Nav.Link>}

          {isLogged && userType === 1 &&
            <Nav.Link as={Link} to="/admin">
              Vista Administrador
            </Nav.Link>}  
          
          </Nav>
        </Navbar.Collapse>
      {!isLogged ? (
        <div>
        <Button className="me-3" onClick={()=> navigate("/login")}>Login</Button>
        <Button className="me-3" onClick={() => navigate("/register")}>
          Register
        </Button>
        </div>
      ):(
        <div>
        <Button 
        className="me-3"
        onClick={()=> navigate(`/user/${userId}`)}>
          Perfil de: {userName }</Button>
        <Button className="me-3" onClick={logOut}>LogOut</Button>
        </div>)}

      </Container>
    </Navbar>
  );
};
