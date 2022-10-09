import React, { useContext, useState, useEffect } from "react";
import Search_modal from "../../modals/search_modal";
import FacturaModal from "../../modals/facturaModal";
import TipoDoc from "../../modals/TipoDoc";
import { MyContext } from "../../Context/Context";
import { Formik } from "formik";
import { FcSearch } from "react-icons/fc";
import BuyedItemsBox from "../../Components/BuyedItemsBox/BuyedItemsBox";
import { format } from "date-fns";

const Ventas = () => {
  const { data } = useContext(MyContext);
  const { setdata } = useContext(MyContext);
  const { ventaInfo } = useContext(MyContext);
  const { setventaInfo } = useContext(MyContext);
  const [switcher, setswitcher] = useState(false);
  const [switcherB, setswitcherB] = useState(false);
  const [switcherC, setswitcherC] = useState(false);
  const [datosProducto, setDatosProducto] = useState([]);
  const [productToBuy, setproductToBuy] = useState([]);
  const [factura, setfactura] = useState({});
  const [cantidad, setcantidad] = useState(1);
  const [actualKey, setActualKey] = useState("");
  const [total, settotal] = useState(0);
  const [checked, setchecked] = useState(false);
  const [tipo, settipo] = useState("");

  const save = async () => {
    localStorage.setItem("ventas", JSON.stringify(ventaInfo));
  };

  useEffect(() => {
    save();
  }, [ventaInfo]);

  useEffect(() => {
    saveB();
  }, [data]);
  const saveB = async () => {
    localStorage.setItem("items", JSON.stringify(data));
  };

  const getByCodigo = (cod) => {
    const objeto = data.filter((item) => item.data.codigo === cod);
    const item = {
      codigo: cod,
      nombre: objeto.map((x) => x.data.nombre),
      precio: objeto.map((x) => x.data.precio),
      stock: objeto.map((x) => x.data.stock),
    };
    setDatosProducto(item);
  };

  const abridorModal = (val) => {
    setswitcher(!val);
  };
  const abridorModalB = (val) => {
    setswitcherB(!val);
  };
  const abridorModalC = (val) => {
    setswitcherC(!val);
  };
  const writeType = (val) => {
    settipo(val);
  };
  const onPagar = (values) => {
    const objeto = {
      fecha: format(new Date(values.fecha), "dd/MM/yyyy"),
      tipo: tipo,
      top: values,
      bot: productToBuy,
    };
    if (productToBuy.length > 0) {
      values.key = Math.random().toString();

      setventaInfo((data) => {
        return [objeto, ...data];
      });
      setfactura(objeto);
    }
  };
  const onAddProduct = () => {
    if (!datosProducto.codigo) {
      alert("Seleccione un producto de la lista");
    }
    if (datosProducto.stock < cantidad) {
      alert("No hay Stock");
    } else {
      if (checked) {
        datosProducto.iva = datosProducto.precio * cantidad * 0.12;
        datosProducto.subtotal =
          datosProducto.precio * cantidad + datosProducto.iva;
      } else {
        datosProducto.iva = 0;
        datosProducto.subtotal = datosProducto.precio * cantidad;
      }
      const updatedStockObj = {
        key: datosProducto.key,
        data: {
          codigo: datosProducto.codigo,
          precio: datosProducto.precio,
          nombre: datosProducto.nombre,
          iva: datosProducto.iva.toFixed(2),
          stock: datosProducto.stock - cantidad,
        },
      };
      setdata(
        data.map((obj) =>
          obj.data.codigo === datosProducto.codigo ? updatedStockObj : obj
        )
      );

      const elemento = {
        data: datosProducto,
        key: Math.random().toString(),
        cantidad: cantidad,
        subtotal: datosProducto.subtotal,
        iva: parseFloat(datosProducto.iva).toFixed(2),
      };
      setproductToBuy((data) => [elemento, ...data]);
      setcantidad(1);
      settotal(datosProducto.subtotal + total);
    }
    clearProducto();
  };

  const clearProducto = () => {
    const item = {
      codigo: "",
      nombre: "",
      precio: "",
      stock: "",
    };
    setDatosProducto(item);
  };
  const clearData = () => {
    const item = {
      codigo: "",
      nombre: "",
      precio: "",
      stock: "",
    };
    setDatosProducto(item);
    setproductToBuy([]);
  };
  const takeDatosProducto = (val, key) => {
    setDatosProducto(val);
    setActualKey(key);
    setcantidad("1");
  };

  const deleted = (key) => {
    const getPrecioData = productToBuy.filter((item) => item.key === key);
    const getPrecio = parseFloat(getPrecioData.map((x) => x.subtotal));

    const getStock = getPrecioData.map((x) => x.data.stock);
    const getCodigo = getPrecioData.map((x) => x.data.codigo);

    settotal(total - getPrecio);
    setproductToBuy(productToBuy.filter((item) => item.key !== key));

    const updatedDel = {
      key: Math.random().toString(),
      data: {
        codigo: getCodigo.toString(),
        precio: getPrecioData.map((x) => x.data.precio),
        nombre: getPrecioData.map((x) => x.data.nombre),
        iva: parseFloat(getPrecioData.map((x) => x.data.iva)).toFixed(2),
        stock: parseInt(getStock),
      },
    };
    setdata(
      data.map((obj) =>
        obj.data.codigo === getCodigo.toString() ? updatedDel : obj
      )
    );
  };

  return (
    <div className="ventas">
      <Search_modal
        switcher={switcher}
        abridorModal={abridorModal}
        takeDatosProducto={takeDatosProducto}
      />
      <FacturaModal
        factura={factura}
        abridorModal={abridorModalB}
        switcher={switcherB}
        productToBuy={productToBuy}
        total={total}
        clear={clearData}
      />
      <TipoDoc
        abridorModal={abridorModalC}
        switcher={switcherC}
        writeType={writeType}
      />
      <h1 className="title">Registrar Venta</h1>
      <Formik
        initialValues={{
          doc: "",
          mail: "",
          fecha: "",
          tipo: tipo,
          numFact: "",
          nombre: "",
        }}
        onSubmit={(values) => {
          onPagar(values);
        }}
      >
        {(props) => (
          <div>
            <div className="top-panel">
              <div className="info-compra-pnl">
                <h3 className="txt-inf-compra">Informacion venta</h3>
                <div className="boxes-container">
                  <div>
                    <h4 className="txt-inf-compra">Fecha</h4>
                    <input
                      onChange={props.handleChange("fecha")}
                      value={props.values.fecha || ""}
                      placeholder={"dd/MM/YYYY"}
                      type={"date"}
                    />
                  </div>
                  <div>
                    <h4 className="txt-inf-compra">Factura numero:</h4>
                    <input
                      onChange={props.handleChange("numFact")}
                      value={props.values.numFact || ""}
                      type={"number"}
                    />
                  </div>
                </div>
              </div>
              {/* ///////////////////////////////////////////////////INFO CLIENTE */}
              <div className="info-compra-pnl">
                <h3 className="txt-inf-compra">Informacion cliente</h3>

                <div className="boxes-container">
                  <div className="tipo-doc">
                    <h4 className="txt-inf-compra">Tipo Documento</h4>
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
                    <h4 className="txt-inf-compra">N~ Documento</h4>
                    <input
                      onChange={props.handleChange("doc")}
                      value={props.values.doc || ""}
                    />
                  </div>
                </div>
                <div className="boxes-container">
                  <div>
                    <h4 className="txt-inf-compra">Nombre:</h4>
                    <input
                      onChange={props.handleChange("nombre")}
                      value={props.values.nombre || ""}
                    />
                  </div>
                  <div>
                    <h4 className="txt-inf-compra">Correo</h4>
                    <input
                      onChange={props.handleChange("mail")}
                      value={props.values.mail || ""}
                      type={"email"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="info-producto-pnl">
              <div className="title-inf-product">
                <h3 className="txt-inf-compra">Informacion Producto</h3>
                <button
                  className="btn-search"
                  onClick={() => abridorModal(false)}
                >
                  <FcSearch />
                </button>
              </div>

              <div className="boxes-container">
                <div>
                  <h4 className="txt-inf-compra">Codigo Producto</h4>
                  <input
                    className="input"
                    value={datosProducto.codigo || ""}
                    onChange={(event) => getByCodigo(event.target.value)}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Producto</h4>
                  <input
                    className="input"
                    value={datosProducto.nombre || ""}
                    readOnly
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Precio</h4>
                  <input
                    className="input"
                    value={datosProducto.precio || ""}
                    readOnly
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">IVA 12%</h4>
                  <input
                    className="box-iva"
                    type={"checkbox"}
                    defaultChecked={checked}
                    onChange={() => setchecked(!checked)}
                  />
                </div>
                <div>
                  <h4 className="txt-inf-compra">Cantidad</h4>
                  <input
                    className="input-stock"
                    onChange={(event) => setcantidad(event.target.value)}
                    value={cantidad || ""}
                    type={"number"}
                  />
                </div>
                <button className="btn-agregar" onClick={() => onAddProduct()}>
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
                  <h4 className="titulo-panl">IVA 12%</h4>
                  <h4 className="titulo-panl">SubTotal</h4>
                </div>
                {productToBuy.map((values) => (
                  <BuyedItemsBox
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
                  onMouseUp={() =>
                    productToBuy.length > 0
                      ? abridorModalB(false)
                      : alert("Anada productos a la lista primero")
                  }
                  className="btn-pagar"
                >
                  Factura
                </button>
                <button
                  onClick={() =>
                    /*  setproductToBuy(productToBuy.map((item)=>item={})) */ clearData()
                  }
                  className="btn-pagar"
                >
                  clear
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export { Ventas };
