import { Formik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../Context/Context";
import { format } from "date-fns";
import RegistromisCompras from "../../modals/registomisCompras";
import ListademisCompras from "../../Components/BuyedItemsBox/ListademisCompras";
import TipoDoc from "../../modals/TipoDoc";
const Compras = () => {
  const [switcher, setswitcher] = useState(false);
  const { misCompras } = useContext(MyContext);
  const { setmisCompras } = useContext(MyContext);
  const [factura, setfactura] = useState({});
  const [datosProducto, setDatosProducto] = useState([]); //datos producto ingresado
  const [productToBuy, setproductToBuy] = useState([]); //productos en el panel
  const [total, settotal] = useState(0);
  const [onCheck, setonCheck] = useState(false);
  const [switcherC, setswitcherC] = useState(false);
  const [tipo, settipo] = useState("");
  useEffect(() => {
    save();
  }, [misCompras]);

  const save = async () => {
    localStorage.setItem("compras", JSON.stringify(misCompras));
  };

  const abridorModal = (val) => {
    setswitcher(!val);
  };
  const abridorModalC = (val) => {
    setswitcherC(!val);
  };

  const onRegistrar = (values) => {
    const elemento = {
      fecha: format(new Date(values.fecha), "dd/MM/yyyy"),
      elementos: productToBuy,
      data: values,
      iva: values.iva,
      key: Math.random().toString(),
      /* subtotal: values.subtotal, */
      tipo: tipo,
    };
    setfactura(elemento);
    setmisCompras((data) => [elemento, ...data]);
  };

  const onAddProduct = (values) => {
    if (onCheck == true) {
      values.iva = values.precioC * values.cantidad * 0.12;
      values.subtotal = values.precioC * values.cantidad + values.iva;
    } else {
      values.iva = 0;
      values.subtotal = values.precioC * values.cantidad + values.iva;
    }
    const elemento = {
      fecha: format(new Date(values.fecha), "dd/MM/yyyy"),
      data: values,
      iva: parseFloat(values.iva).toFixed(2),
      key: Math.random().toString(),
      subtotal: values.subtotal,
      tipo: tipo,
    };
    setproductToBuy((data) => {
      return [elemento, ...data];
    });

    settotal(values.subtotal + total);
  };

  const settoCero = () => {
    settotal(0);
    setproductToBuy([]);
  };

  const deleted = (key) => {
    const getPrecioData = productToBuy.filter((item) => item.key == key);
    const getSubtotal = parseFloat(getPrecioData.map((x) => x.subtotal));
    settotal(total - getSubtotal);
    setproductToBuy(productToBuy.filter((item) => item.key !== key));
    alert("deleted");
  };
  const writeType = (val) => {
    settipo(val);
  };
  return (
    <div>
      <RegistromisCompras
        abridorModal={abridorModal}
        switcher={switcher}
        datos={factura}
        productToBuy={productToBuy}
        settoCero={settoCero}
        total={total}
      />
      <TipoDoc
        abridorModal={abridorModalC}
        switcher={switcherC}
        writeType={writeType}
      />
      <h1 className="title">Registrar mis Compras</h1>
      <Formik
        initialValues={{
          doc: "",
          razon: "",
          fecha: "",
          tipo: "",
          codigo: "",
          nombre: "",
          precioC: "",
          precioV: "",
          cantidad: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onRegistrar(values);
        }}
      >
        {(props) => (
          <div className="ventas">
            <div className="top-panel">
              <div className="info-compra-pnl">
                <h3 className="txt-inf-compra">Informacion Compra</h3>
                <div className="boxes-container">
                  <div>
                    <h4 className="txt-inf-compra">Fecha</h4>
                    <input
                      onChange={props.handleChange("fecha")}
                      value={props.values.fecha}
                      placeholder={"dd/MM/YYYY"}
                      type={"date"}
                    />
                  </div>
                  <div>
                    <h4 className="txt-inf-compra">n documento</h4>
                    <input
                      onChange={props.handleChange("doc")}
                      value={props.values.doc}
                    />
                  </div>
                </div>
              </div>

              <div className="info-compra-pnl">
                <h3 className="txt-inf-compra">Informacion Proveedor</h3>
                <div className="boxes-container">
                  <div>
                    <h4 className="txt-inf-compra"> Tipo Documento</h4>
                    <div className="collapsable-container">
                      <div className="collaps-items-container">
                        <button
                          className="collaps"
                          onClick={() => abridorModalC(false)}
                        >
                          {tipo || "Escoger"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="txt-inf-compra">Razon social</h4>
                    <input
                      onChange={props.handleChange("razon")}
                      value={props.values.razon}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="info-producto-pnl-compras">
              <h3 className="txt-inf-compra">Informacion Producto</h3>
              <div className="boxes-container">
                <div>
                  <h4 className="txt-inf-compra">Codigo Producto</h4>
                  <input
                    className="input"
                    onChange={props.handleChange("codigo")}
                    value={props.values.codigo}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Producto</h4>
                  <input
                    className="input"
                    onChange={props.handleChange("nombre")}
                    value={props.values.nombre}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Precio compra</h4>
                  <input
                    className="input"
                    onChange={props.handleChange("precioC")}
                    value={props.values.precioC}
                    type={"number"}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Precio Venta</h4>
                  <input
                    className="input"
                    onChange={props.handleChange("precioV")}
                    value={props.values.precioV}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Cantidad</h4>
                  <input
                    className="input"
                    onChange={props.handleChange("cantidad")}
                    value={props.values.cantidad}
                    type={"number"}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">IVA 12%</h4>
                  <input
                    type="checkbox"
                    defaultChecked={onCheck}
                    onChange={() => setonCheck(!onCheck)}
                  />
                </div>
                <button
                  className="btn-agregar"
                  onClick={() => onAddProduct(props.values)}
                >
                  Agregar
                </button>
              </div>
            </div>
            <div className="container-bottom-panel">
              <div className="panel-show">
                <div className="titulos-panel">
                  <h4 className="titulo-panl">Producto</h4>
                  <h4 className="titulo-panl">Precio </h4>
                  <h4 className="titulo-panl">Cantidad</h4>
                  <h4 className="titulo-panl">iva 12%</h4>
                  <h4 className="titulo-panl">SubTotal</h4>
                </div>
                {productToBuy.map((values) => (
                  <ListademisCompras
                    key={values.key}
                    valores={values}
                    llave={values.key}
                    deleted={deleted}
                  />
                ))}
              </div>
              <div className="btns-ventas">
                <h3>Total a pagar</h3>
                <input value={"$" + parseFloat(total).toFixed(2)} readOnly />
                <button
                  type="submit"
                  onClick={props.handleSubmit}
                  onMouseUp={() => abridorModal(false)}
                  className="btn-pagar"
                >
                  Registrar
                </button>
                <button
                  onClick={() =>
                    console.log(factura.elementos.map((x) => x.data.doc))
                  }
                  className="btn-pagar"
                >
                  cf
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export { Compras };
