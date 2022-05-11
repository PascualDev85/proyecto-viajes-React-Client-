import React, { useEffect, useState } from "react";
import axios from "axios";

import "./scss/allUsers.scss";

export const AllUsers = () => {
  // este manejador de estado nos va atraer un array de objetos de todos los usuarios
  const [allUsers, setAllUsers] = useState([]);

  // solicitar todos los viajes de todos los usuarios para mostarlos en la página

  useEffect(() => {
    // capturar el token de nuestro localStorage
    const AUTH_TOKEN = window.localStorage.getItem("token");

    // configurar la cabecera de autenticación en una propiedad llamada authorization
    // y guarde nuestro token con la clave authorization con el Bearer token
    axios.defaults.headers.common["authorization"] = `Bearer ${AUTH_TOKEN}`;

    // solicitar todos los usuarios
    axios
      .get("http://localhost:4000/users/allUser")

      .then((res) => {
        console.log(res.data);
        res && setAllUsers(res.data);
        console.log(allUsers);
      })
      .catch((error) => {
        console.log("errorrrrrrr en el axios");
      });
  }, []);

  return (
    <div className="conAllUsers">
      {allUsers.map((user) => {
        return (
          <div className="usersACards" key={user.user_id}>
            <h3>Usuario:{user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        );
      })}
    </div>
  );
};
