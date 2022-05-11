import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./scss/auth.scss";
import { Col, Container, Row, Button } from "react-bootstrap";

export const Register = () => {
  // estado para el formulario para mensaje de rellenar campos
  const [regMessage, setRegMessage] = useState("");

  //  estado para el formulario de registro
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  // metodo para redirigir a la pagina que quieras
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegister({ ...register, [name]: value });
    //seteamos los campos de los inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // si los campos vienes vacios saldrá el mensaje de rellenar campos
    if (
      register.name === "" ||
      register.email === "" ||
      register.password === ""
    ) {
      console.log("Algun campo esta vacio");
      setRegMessage(" * Debes rellenar todos los campos");
    } else {
      // hacemos la petición para el registro si está todo bien

      axios
        .post("http://localhost:4000/users/createUser", register)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.dat);
          console.log("hay un error");
          console.log("email duplicado");
          setRegMessage(" * El email ya existe, itroduce otro");
        });
    }
  };

  return (
    <Container fluid>
      <Row className="contAuth">
        <Col md={4}>
          <div className="divRegister">
            <input
              className="m-2"
              type="text"
              placeholder="Introduce tu nombre"
              autoComplete="off"
              name="name"
              required
              value={register.name}
              onChange={handleChange}
            />
            <input
              className="m-2"
              type="email"
              placeholder="Introduce tu email"
              autoComplete="off"
              name="email"
              required
              value={register.email}
              onChange={handleChange}
            />
            <input
              className="m-2"
              type="password"
              placeholder="Introduce tu password"
              autoComplete="off"
              name="password"
              required
              value={register.password}
              onChange={handleChange}
            />

            <Button variant="success" type="submit" onClick={handleSubmit}>
              Registrar
            </Button>
            {regMessage}
            <hr />
            <p>¿ Ya estás registrado?</p>
            <Button onClick={() => navigate("/login")} variant="success">
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
