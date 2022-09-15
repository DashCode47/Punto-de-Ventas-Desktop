import Modal from "react-modal";
import "../App.css";
import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import FacturaItemsBox from "../Components/FacturaItemsBox/FacturaItemsBox";

const RegistromisCompras = ({
  switcher,
  abridorModal,
  datos,
  settoCero,
  productToBuy,
  total,
}) => {
  const customStyles = {
    overlay: {
      backgroundColor: "transparent",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
    },
  };

  return (
    <Modal
      isOpen={switcher}
      style={customStyles}
      appElement={document.getElementById("root") || undefined}
    >
      <div className="container-factura">
        <h2>Factura Corporacion X</h2>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "300px",
          }}
        >
          <div>
            <h4 className="title-factura">Tipo Documento</h4>
            <a>{datos.tipo}</a>
          </div>
          <div>
            <h4 className="title-factura">N Documento</h4>
            <a>{datos.data?.doc}</a>
          </div>
        </div>
        <div>
          <h4 className="title-factura">Fecha</h4>
          <a>{datos.fecha}</a>
        </div>

        <div className="titulos-panel">
          <h5 className="titulo-panl-factura">Producto</h5>
          <h5 className="titulo-panl-factura">Precio </h5>
          <h5 className="titulo-panl-factura">Cantidad</h5>
          <h5 className="titulo-panl-factura">IVA</h5>
          <h5 className="titulo-panl-factura">SubTotal</h5>
        </div>
        {productToBuy.map((x) => (
          <FacturaItemsBox key={x.key} valores={x} />
        ))}
        <div className="container-total">
          <a className="titulo-factura-Total">Total:</a>
          <a className="subtitulo-total">{parseFloat(total).toFixed(2)}</a>
        </div>

        <button className="button" onClick={() => abridorModal(true)}>
          <a className="aStyle">Cerrar</a>
        </button>
        <button className="button" onClick={() => console.log()}>
          <a className="aStyle">Imprimir</a>
        </button>
        <button className="button" onClick={() => abridorModal(true)}>
          <a className="aStyle">Enviar por correo</a>
        </button>
      </div>
    </Modal>
  );
};

export default RegistromisCompras;
