import React from "react";
import Collapsible from "react-collapsible";
import "../../../App.css";
const ContainerItems = ({ elemento, key }) => {
  return (
    <div className="compras-item-container">
      <Collapsible trigger={`Factura de fechas ${elemento.fecha}`}>
        <div className="collaps-items-compras-container">
          <div>
            <div className="header-container-compras">
              <h4 className="header-titulo">Codigo Prod.</h4>
              <h4 className="header-titulo">Nombre Prod.</h4>
              <h4 className="header-titulo">Precio Compra</h4>
              <h4 className="header-titulo">Cantidad</h4>
              <h4 className="header-titulo">Iva</h4>
              <h4 className="header-titulo">Total</h4>
            </div>
            {elemento.bot.map((campo) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#dfdfdf",
                  alignItems: "center",
                  borderBottomRightRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  height: "30px",
                  borderBottomStyle: "solid",
                  borderWidth: "1px",
                }}
                key={campo.key}
              >
                <h4 className="campos-collapse-compra">{campo.data.codigo}</h4>
                <h4 className="campos-collapse-compra">{campo.data.nombre}</h4>
                <h4 className="campos-collapse-compra">{campo.data.precio}</h4>
                <h4 className="campos-collapse-compra">{campo.cantidad}</h4>
                <h4 className="campos-collapse-compra">{campo.iva}</h4>
                <h4 className="campos-collapse-compra">
                  {parseFloat(campo.subtotal).toFixed(2)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default ContainerItems;
