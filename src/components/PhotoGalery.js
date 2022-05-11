import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export const PhotoGalery = ({ travel }) => {
  // estado que me muestran las fotos del server
  const [photos, setPhotos] = useState([]);
  // estado que muestre el div para añadir las fotos
  const [showInput, setShowInput] = useState(false);
  // estado para guardar la foto que se van a subir
  const [travelImgs, setTravelImgs] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/travels/getImgs/${travel.travel_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // a tener cuenta cuando seteamos utilizamos useEffect para no hacer un bucle infinito
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log("hay un error", err);
      });
  }, []);

  // funcion manejo input de file de las fotos
  const handleFiles = (e) => {
    setTravelImgs(e.target.files);
  };

  // funcion para guardar el input de la foto
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    //  en este caso como el formulario no lleva texto no hace falta JSON ni nada de eso.
    if (travelImgs) {
      for (const element of travelImgs) {
        formData.append("file", element);
      }
    }
    axios
      // añadir o modificar las fotos
      .put(
        `http://localhost:4000/travels/addImgs/${travel.travel_id}`,
        formData
      )
      .then((res) => {
        // seteamos las fotos de fotos para añadir las nuevas
        setPhotos(res.data);
        // cierro el input de añadir fotos
        setShowInput(false);
      })
      .catch((err) => {
        console.log("hay un error", err);
      });
  };

  // funcion para eliminar las fotos
  const delImage = (photo) => {
    console.log("foto a eliminar", photo);
    console.log("foto a eliminar id", photo.photo_id);
    const fotosModficado = photos.filter(
      (elem) => elem.photo_id !== photo.photo_id
    );
    setPhotos(fotosModficado);
    axios
      .put(`http://localhost:4000/travels/delPhoto/${photo.photo_id}`)
      .then((res) => {
        console.log("foto eliminada");
      })
      .catch((err) => {
        console.log("hay un error", err);
        console.log("hay un error", err.response.data);
      });
  };

  return (
    <div className="photoGalery">
      {photos && (
        <>
          {photos.map((photo, index) => (
            <div className="contPhoto" key={index}>
              <img src={`/images/travel/${photo.photo_name}`} />
              <Button
                onClick={() => delImage(photo)}
                // en esta función al estar en un map tenemos que pasarle la función y la foto que se va a elimnar
                variant="danger"
              >
                Eliminar
              </Button>
            </div>
          ))}
        </>
      )}
      <div className="d-flex align-items-center justify-content-center">
        <Button
          className="m-5"
          variant="success"
          onClick={() => setShowInput(!showInput)}
        >
          {!showInput ? "Añadir foto" : "Cancelar"}
        </Button>

        {showInput && (
          <div>
            <input type="file" multiple onChange={handleFiles} />
            <Button
              className="my-2"
              variant="success"
              type="button"
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
