import React from "react";
import Collapsible from "react-collapsible";
import "../../../App.css";
import { IoMdArrowDropdown } from "react-icons/io";
const ContainerItems = ({ elemento }) => {
  return (
    <div className="compras-item-container">
      <Collapsible trigger={`Factura de fechas ${elemento.fecha}`}>
        <div className="collaps-items-compras-container">
          <div>
            <div className="header-container-compras">
              <h5 className="header-titulo">Codigo Prod.</h5>
              <h5 className="header-titulo">Nombre Prod.</h5>
              <h5 className="header-titulo">Precio Compra</h5>
              <h5 className="header-titulo">Cantidad</h5>
              <h5 className="header-titulo">Iva</h5>
              <h5 className="header-titulo">Total</h5>
            </div>
            {elemento.elementos.map((campo) => (
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
                <a className="campos-collapse-compra">{campo.data.codigo}</a>
                <a className="campos-collapse-compra">{campo.data.nombre}</a>
                <a className="campos-collapse-compra">
                  {"$" + campo.data.precioC}
                </a>
                <a className="campos-collapse-compra">{campo.data.cantidad}</a>
                <a className="campos-collapse-compra">{campo.iva}</a>
                <a className="campos-collapse-compra">
                  {"$" + parseFloat(campo.subtotal).toFixed(2)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default ContainerItems;
