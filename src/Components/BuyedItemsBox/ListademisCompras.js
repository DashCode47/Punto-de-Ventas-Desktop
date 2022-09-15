import React, { useEffect } from "react";
import "../../App.css";
import { TiDelete } from "react-icons/ti";
const ListademisCompras = ({ deleted, llave, valores, getTotal }) => {
  const subtotal = (valores.cantidad * valores.precioC).toFixed(2);

  /*  useEffect(() => {
    getTotal(subtotal);
  }, [valores]); */

  return (
    <div className="container-box">
      <button className="item-box-check" onClick={() => deleted(llave)}>
        <TiDelete style={{ color: "#000000", fontSize: "23px" }} />
      </button>

      <a className="item-box-buyed-name">{valores.data.nombre}</a>
      <a className="item-box-buyed">{valores.data.precioC}</a>
      <a className="item-box-buyed">{valores.data.cantidad}</a>
      <a className="item-box-buyed">{valores.iva}</a>
      <a className="item-box-buyed">{valores.subtotal.toFixed(2)}</a>
    </div>
  );
};

export default ListademisCompras;
