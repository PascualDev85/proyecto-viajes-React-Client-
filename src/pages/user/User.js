import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TravelComp } from "../../components/TravelComp";
import { FormCreateTravel } from "../../components/FormCreateTravel";

import { Button, Col, Container, Row } from "react-bootstrap";

export const User = () => {
  // manejador de estado para traer los datos de un usuario
  // y manejador de estado para traer los viajes del usuario
  const [user, setUser] = useState();
  const [travels, setTravels] = useState();

  // manejador de estado para crear un viaje
  const [showFormCreateTravel, setShowFormCreateTravel] = useState(false);

  // rescatar los parámetros dinámicos de la url
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // obtenemos toda la info de un usuario
    axios
      // a tener en cuenta como hacemos la promesa en el return tenemos que si existe (lo que sea que queremos mostrar) con una ternaria
      .get(`http://localhost:4000/users/oneUser/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // si existe res que me setee el setUser
        setUser(res.data.resultUser[0]);
        // si existe res que me setee el setTravels
        setTravels(res.data.resultTravel);
      })
      .catch((err) => {
        console.log("hay un error", err);
      });
    // los [] son lista de dependencies, si no se ponen, se ejecuta siempre, está pendiente de los estados el useEffect. Se pueden poner varias dependencias
  }, []);

  console.log(user);

  return (
    <Container fluid>
      {user ? (
        <Row>
          <Col>
            <h2>Usuario: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Direccion: {user.address}</p>
            <p>Teléfono: {user.phone}</p>
            <Button variant="success">Editar Usuario</Button>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col>
          <h2>Mis Viajes</h2>
          <hr />
          <Button
            // si showFormCreateTravel es true, entonces muestra el formulario crear viajes, si no, muestra los viajes
            onClick={() => setShowFormCreateTravel(true)}
            variant="success"
          >
            Crear Viajes
          </Button>
        </Col>

        {!showFormCreateTravel ? (
          // si showFormCreateTravel es false, entonces muestra los viajes
          <TravelComp
            travels={travels}
            setTravels={setTravels}
            // TravelComp es un componente de los viajes del usuario
          />
        ) : (
          //
          <FormCreateTravel
            // si showFormCreateTravel es true, entonces muestra el formulario crear viajes, si no, muestra los viajes
            // FormCreateTravel es un componente para crear viajes
            user={user}
            setShowFormCreateTravel={setShowFormCreateTravel}
            setTravels={setTravels}
          />
        )}
      </Row>
    </Container>
  );
};
