import Modal from "react-modal";
import "../App.css";
import React, { useContext, useState } from "react";
import { MyContext } from "../Context/Context";
import ItemInventBox from "../Components/ItemInventBox/ItemInventBox";

const Search_modal = ({ switcher, abridorModal, takeDatosProducto }) => {
  const { data } = useContext(MyContext);
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
      <div className="centereddiv">
        <div className="panel">
          <div className="panel-titles">
            <h4 className="pnl-check"></h4>
            <h4 className="pnl-title">Codigo</h4>
            <h4 className="pnl-title">Nombre</h4>
            <h4 className="pnl-title">Precio</h4>
            <h4 className="pnl-title">Stock</h4>
          </div>
          {data.map((data) => (
            <button
              onClick={() => takeDatosProducto(data.data)}
              style={{ paddingLeft: 0 }}
              key={data.key}
            >
              <ItemInventBox
                key={data.key}
                valores={data}
                llave={data.key}
                renderButton={true}
              />
            </button>
          ))}
        </div>
        <button className="button" onClick={() => abridorModal(true)}>
          <a className="aStyle">Cerrar</a>
        </button>
      </div>
    </Modal>
  );
};

export default Search_modal;
