import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FormModalEditTravel } from "./FormModalEditTravel";
import { PhotoGalery } from "./PhotoGalery";

import "./scss/travelComp.scss";

export const TravelComp = ({ travels, setTravels }) => {
  console.log(travels);

  // estado para mostar modal editar travel
  const [showEditTravel, setShowEditTravel] = useState(false);

  // estado para modificar el viaje
  const [travelAModificar, setTravelAModificar] = useState();

  const delTravel = (travel) => {
    //
    const travelModificado = travels.filter(
      (t) => t.travel_id !== travel.travel_id
    );
    setTravels(travelModificado);

    axios
      .put(`http://localhost:4000/travels/delTravel/${travel.travel_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("hay un error", err);
      });
  };

  return (
    <div>
      {travels
        ? travels.map((travel, index) => {
            return (
              <div key={index} className="travelCard">
                <div className="travelInfo">
                  <p>Id: {travel.travel_id}</p>
                  <h3>Ciudad: {travel.city}</h3>
                  <p>País: {travel.country}</p>
                  <p>Descripción: {travel.description}</p>
                  <Button
                    name={travel.travel_id}
                    onClick={() => {
                      setTravelAModificar({ ...travel, index: index });
                      setShowEditTravel(true);
                    }}
                    className="m-2"
                    variant="success"
                  >
                    Editar Viaje
                  </Button>
                  <Button
                    onClick={() => delTravel(travel)}
                    className="m-2"
                    variant="danger"
                  >
                    Borrar Viaje
                  </Button>
                </div>
                <div className="travelImgs">
                  <PhotoGalery travel={travel} />
                  {/* pasamos por params travels a PhotoGalery travel */}
                </div>
              </div>
            );
          })
        : null}

      {travelAModificar ? (
        <FormModalEditTravel
          showEditTravel={showEditTravel}
          setShowEditTravel={setShowEditTravel}
          travels={travels}
          travelAModificar={travelAModificar}
          setTravelAModificar={setTravelAModificar}
        />
      ) : null}
    </div>
  );
};
