import React from "react";
import "../../App.css";
import { TiDelete } from "react-icons/ti";
const ItemInventBox = ({ deleted, llave, valores, renderButton }) => {
  return (
    <div className="container-box">
      {!renderButton ? (
        <button className="item-box-check" onClick={() => deleted(llave)}>
          <TiDelete style={{ color: "#000000", fontSize: "23px" }} />
        </button>
      ) : (
        <a>---------</a>
      )}
      <a className="item-box">{valores?.data?.codigo}</a>
      <a className="item-box">{valores?.data?.nombre}</a>
      <a className="item-box">{valores?.data?.precio}</a>
      <a className="item-box">{valores?.data?.iva}</a>
      <a className="item-box">{valores?.data?.stock}</a>
    </div>
  );
};

export default ItemInventBox;
