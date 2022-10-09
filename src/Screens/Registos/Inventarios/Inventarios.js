import "../../../App.css";
import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import ItemInventBox from "../../../Components/ItemInventBox/ItemInventBox";
import { MyContext } from "../../../Context/Context";

const Inventarios = () => {
  const { data } = useContext(MyContext);
  const { setdata } = useContext(MyContext);
  const [datosProducto, setDatosProducto] = useState([]);

  useEffect(() => {
    save();
  }, [data]);
  const save = async () => {
    localStorage.setItem("items", JSON.stringify(data));
  };

  const addInventario = (values) => {
    if (datosProducto.codigo) {
      values.iva = (values.precio * 0.12).toFixed(2);
      if (!values.nombre) {
        values.nombre = datosProducto.nombre;
      }
      if (!values.precio) {
        values.precio = datosProducto.precio;
      }
      values.codigo = datosProducto.codigo;
      const elemento = {
        key: Math.random().toString(),
        data: values,
      };

      if (data.filter((item) => item.data.codigo === values.codigo)) {
        const inventario2 = {
          key: elemento.key,
          data: {
            codigo: values.codigo,
            nombre: values.nombre,
            precio: values.precio,
            stock: parseInt(datosProducto.stock) + parseInt(values.stock),
            iva: 0.0,
          },
        };
        setdata(
          data.map((item) =>
            item.data.codigo === values.codigo ? inventario2 : item
          )
        );
      }
      if (data.filter((item) => item.data.codigo == values.codigo) < 1) {
        const inventario = {
          key: elemento.key,
          data: {
            codigo: values.codigo,
            nombre: values.nombre,
            precio: values.precio,
            stock: values.stock,
            iva: 0,
          },
        };
        setdata((actualData) => [inventario, ...actualData]);
      }
      clear(values);
    } else alert("Ingrese Datos");
  };
  const getByCodigo = (cod) => {
    const objeto = data.filter((item) => item.data.codigo == cod);
    const item = {
      codigo: cod,
      nombre: objeto.map((x) => x.data.nombre),
      precio: objeto.map((x) => x.data.precio),
      stock: objeto.map((x) => x.data.stock),
    };
    setDatosProducto(item);
  };

  const deleted = (key) => {
    alert("deleted");
    setdata(data.filter((item) => item.key !== key));
  };
  const clear = (values) => {
    values.nombre = "";
    values.precio = "";
    values.stock = "";
    const item = {
      codigo: "",
      nombre: "",
      precio: "",
      stock: "",
    };
    setDatosProducto(item);
  };

  return (
    <div className="inventario">
      <div className="left-panel">
        <Formik
          initialValues={{
            codigo: "",
            nombre: "",
            precio: "",
            stock: "",
          }}
          onSubmit={(values) => {
            addInventario(values);
          }}
        >
          {(props) => (
            <div className="container-form">
              <h3>Anadir Productos</h3>
              <h4 className="title">Codigo</h4>
              <input
                onChange={(event) => getByCodigo(event.target.value)}
                value={datosProducto.codigo || ""}
                className="input"
              />
              <h4 className="title">Nombre Producto</h4>
              <input
                onChange={props.handleChange("nombre")}
                value={props.values.nombre || datosProducto.nombre || ""}
                className="input"
              />
              <h4 className="title">Precio</h4>
              <input
                onChange={props.handleChange("precio")}
                value={props.values.precio || datosProducto.precio || ""}
                type={"number"}
                className="input"
              />
              <h4 className="title">Stock</h4>
              <input
                onChange={props.handleChange("stock")}
                value={props.values.stock || ""}
                type={"number"}
                className="input"
              />
              <button
                type="submit"
                onClick={props.handleSubmit}
                className="btn-registros-save"
              >
                Guardar
              </button>
            </div>
          )}
        </Formik>
      </div>

      <div className="panel">
        <div className="panel-titles">
          <h4 className="pnl-check"></h4>
          <h4 className="pnl-title">Codigo</h4>
          <h4 className="pnl-title">Nombre</h4>
          <h4 className="pnl-title">Precio</h4>
          <h4 className="pnl-title">IVA</h4>
          <h4 className="pnl-title">Stock</h4>
        </div>
        {data.map((data, index) => (
          <ItemInventBox
            key={index}
            valores={data}
            deleted={deleted}
            llave={data.key}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventarios;
