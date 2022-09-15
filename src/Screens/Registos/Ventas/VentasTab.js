import React, { useContext, useEffect } from "react";
import { MyContext } from "../../../Context/Context";
import ContainerItems from "./ContainerItem";
const VentasTab = () => {
  const { ventaInfo } = useContext(MyContext);
  useEffect(() => {
    save();
  }, [ventaInfo]);
  let a = 6 + 3 + "3";
  const ff = (arr) => {
    return arr.map((x) => x + 3).filter((x) => x < 7);
  };

  const save = async () => {
    localStorage.setItem("ventas", JSON.stringify(ventaInfo));
  };

  const { setventaInfo } = useContext(MyContext);
  return (
    <div className="compras-container">
      {ventaInfo.length > 0 ? (
        ventaInfo.map((array) => (
          <ContainerItems elemento={array} key={array.key} />
        ))
      ) : (
        <h3>No hay ventas aun</h3>
      )}

      <button onClick={() => console.log(a)}>Eliminar todo</button>
    </div>
  );
};

export default VentasTab;
