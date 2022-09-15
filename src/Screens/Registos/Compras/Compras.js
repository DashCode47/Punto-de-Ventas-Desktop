import React, { useContext, useEffect } from "react";
import { MyContext } from "../../../Context/Context";
import ContainerItems from "./ContainerItems";
const Compras = () => {
  const { misCompras } = useContext(MyContext);
  const { setmisCompras } = useContext(MyContext);
  useEffect(() => {
    save();
  }, [misCompras]);

  const save = async () => {
    localStorage.setItem("compras", JSON.stringify(misCompras));
  };

  return (
    <div className="compras-container">
      {misCompras.length > 0 ? (
        misCompras.map((array) => (
          <ContainerItems elemento={array} key={array.key} />
        ))
      ) : (
        <h3>No has registrado tus compras aun</h3>
      )}

      <button onClick={() => setmisCompras([])}>Eliminar todo</button>
    </div>
  );
};

export default Compras;
