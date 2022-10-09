import React, { useEffect, useState } from "react";
import "../../App.css";
import { TiDelete } from "react-icons/ti";
const BuyedItemsBox = ({ deleted, llave, valores }) => {
  return (
    <div className="container-box">
      <button className="item-box-check" onClick={() => deleted(llave)}>
        <TiDelete style={{ color: "#000000", fontSize: "23px" }} />
      </button>
      <a className="item-box-buyed-name">{valores.data.nombre || "null"}</a>
      <a className="item-box-buyed">{valores.data.precio || ""}</a>
      <a className="item-box-buyed">{valores.cantidad || ""}</a>
      <a className="item-box-buyed">
        {parseFloat(valores.iva).toFixed(2) || ""}
      </a>
      <a className="item-box-buyed">
        {parseFloat(valores.subtotal).toFixed(2) || ""}
      </a>
    </div>
  );
};

export default BuyedItemsBox;
