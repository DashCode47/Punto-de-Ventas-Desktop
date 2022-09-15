import Modal from "react-modal";
import "../App.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../Context/Context";
import ItemInventBox from "../Components/ItemInventBox/ItemInventBox";
import BuyedItemsBox from "../Components/BuyedItemsBox/BuyedItemsBox";
import FacturaItemsBox from "../Components/FacturaItemsBox/FacturaItemsBox";

const FacturaModal = ({
  switcher,
  abridorModal,
  factura,
  productToBuy,
  total,
}) => {
  const { ventaInfo } = useContext(MyContext);
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
            <h4 className="title-factura">N Factura</h4>
            <a>{factura?.top?.numFact}</a>
          </div>
          <div>
            <h4 className="title-factura">Fecha</h4>
            <a>{factura.fecha}</a>
          </div>
        </div>

        <h4 className="title-factura">Nombre Cliente:</h4>
        <a>{factura?.top?.nombre}</a>
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
            <h4 className="title-factura">Tipo de Documento</h4>
            <a>{factura?.tipo}</a>
          </div>
          <div>
            <h4 className="title-factura">numero Doc</h4>
            <a>{factura?.top?.doc}</a>
          </div>
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
        <button className="button" onClick={() => console.log(factura)}>
          <a className="aStyle">Imprimir</a>
        </button>
        <button className="button" onClick={() => abridorModal(true)}>
          <a className="aStyle">Enviar por correo</a>
        </button>
      </div>
    </Modal>
  );
};

export default FacturaModal;
