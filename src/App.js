import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // si el token esta en el localstorage entonces esta logueado
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <AppRoutes isLogged={isLogged} setIsLogged={setIsLogged} />
    </>
  );
}

export default App;
