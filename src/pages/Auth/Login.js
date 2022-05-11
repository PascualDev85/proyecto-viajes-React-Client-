import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { Button, Col, Container, Row } from "react-bootstrap";
import "./scss/auth.scss";

export const Login = ({ setIsLogged }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // manejador de estado error
  const [showMessage, setMessage] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    // nos traemos el value y el name del los inputs
    setLogin({ ...login, [name]: value });
    //seteamos los campos de los inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // si los campos vienes vacios saldrá el mensaje de rellenar campos
    if (login.email === "" || login.password === "") {
      setMessage(true);
    } else {
      // hacemos la petición para el registro si está todo bien

      axios
        .post("http://localhost:4000/users/login", login)
        .then((res) => {
          console.log("estoy en then de login", res);

          // capturo el token que me mandan el server
          const token = res.data.token;

          // si el token esta en el localstorage entonces esta logueado
          setIsLogged(true);

          // guardo el token en el localstorage
          window.localStorage.setItem("token", token);

          const type = jwtDecode(token).user.type;
          console.log("el type de usuario", type);

          // dependiendo del type de usuario que nos redireccione a un sitio u otro

          {
            type === 0
              ? navigate("/allusers", { replace: true })
              : type === 1
              ? navigate("/admin", { replace: true })
              : navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log("hay un error");
          setMessage(true);
        });
    }
  };

  return (
    <Container fluid className="contAuth">
      <Row>
        <Col md={12}>
          <div className="divRegister">
            <input
              type="email"
              className="m-2"
              placeholder="Introduce tu email"
              autoComplete="off"
              name="email"
              required
              value={login.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="m-2"
              placeholder="Introduce tu password"
              autoComplete="off"
              name="password"
              required
              value={login.password}
              onChange={handleChange}
            />

            <Button variant="success" type="submit" onClick={handleSubmit}>
              Login
            </Button>
            {showMessage && <p>Usuario o contraseña incorrectos</p>}
            <hr />
            <p>¿ No estás registrado?</p>
            <Button onClick={() => navigate("/register")} variant="success">
              Registrarse
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
