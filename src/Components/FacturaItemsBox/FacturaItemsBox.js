import React, { useEffect } from "react";
import "../../App.css";
const FacturaItemsBox = ({ valores, factura, fechaC }) => {
  return (
    <div className="container-box-factura-ventas">
      <a className="item-box-buyed-factura">{factura?.fecha || fechaC}</a>
      <a className="item-box-buyed-factura">
        {factura?.top?.numFact || valores?.data?.n_factura}
      </a>

      <a className="item-box-buyed-name-factura">{valores?.data?.codigo}</a>
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
