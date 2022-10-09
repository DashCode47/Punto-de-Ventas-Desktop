import Modal from "react-modal";
import "../App.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../Context/Context";
import ItemInventBox from "../Components/ItemInventBox/ItemInventBox";
import BuyedItemsBox from "../Components/BuyedItemsBox/BuyedItemsBox";
import FacturaItemsBox from "../Components/FacturaItemsBox/FacturaItemsBox";

const TipoDoc = ({ switcher, abridorModal, writeType }) => {
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
      padding: "1px",
    },
  };

  return (
    <Modal
      isOpen={switcher}
      style={customStyles}
      appElement={document.getElementById("root") || undefined}
    >
      <div className="container-tipoDoc">
        <h4>Tipo de documento</h4>
        <div className="close" onClick={() => abridorModal(true)}>
          X
        </div>
        <div className="titulos-modal-TipoDoc">
          <button
            className="titulo-modal-TipoDoc"
            onClick={() => [writeType("Cedula"), abridorModal(true)]}
          >
            Cedula
          </button>
          <button
            className="titulo-modal-TipoDoc"
            onClick={() => [writeType("RUC"), abridorModal(true)]}
          >
            RUC
          </button>
          <button
            className="titulo-modal-TipoDoc"
            onClick={() => [writeType("Pasaporte"), abridorModal(true)]}
          >
            Pasaporte
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TipoDoc;
