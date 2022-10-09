import React, { useContext, useEffect } from "react";
import { MyContext } from "../../../Context/Context";
import ContainerItems from "./ContainerItem";
const VentasTab = () => {
  const { ventaInfo } = useContext(MyContext);
  const { setventaInfo } = useContext(MyContext);
  useEffect(() => {
    save();
  }, [ventaInfo]);

  const save = async () => {
    localStorage.setItem("ventas", JSON.stringify(ventaInfo));
  };

  return (
    <div className="compras-container">
      {ventaInfo.length > 0 ? (
        ventaInfo.map((array, index) => (
          <ContainerItems elemento={array} key={index} />
        ))
      ) : (
        <h3>No hay ventas aun</h3>
      )}

      <button
        onClick={() => {
          setventaInfo([]);
        }}
      >
        Eliminar todo
      </button>
    </div>
  );
};

export default VentasTab;
