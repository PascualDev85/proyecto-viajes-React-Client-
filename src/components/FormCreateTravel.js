import axios from "axios";
import React, { useState } from "react";

import { Button, Col, Row } from "react-bootstrap";

export const FormCreateTravel = ({
  setShowFormCreateTravel,
  user,
  setTravels,
}) => {
  // manejador de estado para crear un viaje
  const [regTravel, setRegTravel] = useState({
    city: "",
    country: "",
    description: "",
  });

  //   manejador de estado para guardar la imagen
  const [travelFiles, setTravelFiles] = useState();

  // función para setear los datos de los inputs del formulario de viajes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegTravel({ ...regTravel, [name]: value });
  };

  // función para setear las imagenes y guardarlas para enviarlas al backend, para enviar varias imágenes
  const handleFiles = (e) => {
    console.log(e.target.files);
    setTravelFiles(e.target.files);
  };

  // función para enviar los datos del formulario de viajes al backend
  const handleSubmit = (e) => {
    // fabrico un saco de tela
    //     const saco = new sacodetela
    //     const saco =  new ForData();

    // meto el viaje (necesito una herramienta que se llama append)

    //     saco.append(regTravel)

    // una bolsa de fotos

    // voy sacando fotos de una en una y a medida que las saco las meto en el saco de tela

    // for(coge todas las fotos de 1 en 1 y no pares hasta que se acaben)
    //     saco.append(foto1)
    //     saco.append(foto2)
    //     saco.append(foto3)

    // saco tengo regTravel y 3 fotos sueltas

    e.preventDefault();
    console.log("este es el user_id", user.user_id);

    const newFormData = new FormData();

    // creo una clase llamada FormData y la guarda en la constante newFormData
    // añado a ese constante a la propedad llamada "regTravel", lo paso a JSON y lo guardo en la constante newFormData para enviarlo al backend los datos del formulario

    newFormData.append("regTravel", JSON.stringify(regTravel));

    // si hay ficheros (fotos) entonces por cada foto que tenga, añado a la constante newFormData la foto que tenga una a una, en la propedad llamada file.
    if (travelFiles) {
      for (const elem of travelFiles) {
        newFormData.append("file", elem);
      }
    }

    // envio el formulario al backend
    axios
      .post(
        //   la id del usuario la envío por la url (paramas) y la rescato en el backend por los params y le envío el paquete newFormData que contiene los datos del formulario + las imágenes
        `http://localhost:4000/travels/createTravel/${user.user_id}`,
        newFormData
      )
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // si hay datos, entonces actualizo el estado de los viajes (metería el nuevo o último)
          setTravels(res.data);
          //   y cierro el formulario, me aparecerá los viajes del user.
          setShowFormCreateTravel(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row>
      <Col md={4}>
        <div className="formContainer m-4">
          <h1>Crear Nuevo viaje</h1>
          <hr />
          <form className="d-flex flex-column" encType="multipart/form">
            <label>Ciudad</label>
            <input
              className="m-2"
              type="text"
              name="city"
              placeholder="ciudad"
              value={regTravel.city}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Pais</label>
            <input
              className="m-2"
              type="text"
              name="country"
              placeholder="Pais"
              value={regTravel.country}
              onChange={handleChange}
              autoComplete="off"
            />

            <label>Description</label>
            <input
              className="m-2"
              type="textarea"
              name="description"
              placeholder="Descripción"
              value={regTravel.description}
              onChange={handleChange}
              autoComplete="off"
            />

            <label>Imágenes</label>
            <input
              className="m-2"
              type="file"
              onChange={handleFiles}
              multiple
            />

            <Button
              variant="success"
              className="m-2"
              type="submit"
              onClick={handleSubmit}
            >
              Guardar
            </Button>

            <Button
              variant="success"
              className="m-2"
              onClick={() => setShowFormCreateTravel(false)}
            >
              Cancelar
            </Button>
          </form>
        </div>
      </Col>
    </Row>
  );
};
//formulario de creación con:
// city
// country
// description
// input para subir fotos
//boton para hacer el submit
//boton para cacelar y nos cierre formulario
