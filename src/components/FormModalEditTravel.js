import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";

export const FormModalEditTravel = ({
  setShowEditTravel,
  showEditTravel,
  travelAModificar,
  setTravelAModificar,
  travels,
}) => {
  console.log(travelAModificar);
  console.log(travels);

  // funcion para cambiar los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelAModificar({
      ...travelAModificar,
      [name]: value,
    });
  };

  // funcion para guardar los cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    travels[travelAModificar.index] = travelAModificar;
    axios
      .put(
        `http://localhost:4000/travels/editTravel/${travelAModificar.travel_id}`,
        travelAModificar
      )
      .then((res) => {
        console.log("Datos modificados correctamente", res);
        setShowEditTravel(false);
      })
      .catch((err) => {
        console.log("hay un error", err);
      });
  };

  const handleClose = () => {
    setShowEditTravel(false);
  };

  return (
    <>
      <Modal show={showEditTravel} onHide={() => setShowEditTravel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formContainer">
            <form className="d-flex flex-column p-4" encType="multipart/form">
              <label>Ciudad</label>
              <input
                className="m-2"
                type="text"
                name="city"
                placeholder="Ciudad"
                value={travelAModificar.city}
                onChange={handleChange}
                autoComplete="off"
              />
              <label>País</label>
              <input
                className="m-2"
                type="text"
                name="country"
                placeholder="País"
                value={travelAModificar.country}
                onChange={handleChange}
                autoComplete="off"
              />
              <label>Descripción</label>
              <input
                className="m-2"
                type="textarea"
                name="description"
                placeholder="Descripción"
                value={travelAModificar.description}
                onChange={handleChange}
                autoComplete="off"
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
