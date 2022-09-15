import React, { useEffect } from "react";
import "../../App.css";
const FacturaItemsBox = ({ valores }) => {
  return (
    <div className="container-box-factura-ventas">
      <a className="item-box-buyed-name-factura">{valores?.data?.nombre}</a>
      <a className="item-box-buyed-factura">
        {valores?.data?.precioC || valores?.data?.precio}
      </a>
      <a className="item-box-buyed-factura">
        {valores?.data?.cantidad || valores?.cantidad}
      </a>
      <a className="item-box-buyed-factura">
        {parseFloat(valores?.iva).toFixed(2) || valores?.iva}
      </a>
      <a className="item-box-buyed-factura">
        {parseFloat(valores.subtotal).toFixed(2)}
      </a>
    </div>
  );
};

export default FacturaItemsBox;
