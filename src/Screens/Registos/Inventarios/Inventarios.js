import "../../../App.css";
import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import ItemInventBox from "../../../Components/ItemInventBox/ItemInventBox";
import { MyContext } from "../../../Context/Context";

const Inventarios = () => {
  const { data } = useContext(MyContext);
  const { setdata } = useContext(MyContext);
  const [temporal, settemporal] = useState();

  useEffect(() => {
    save();
  }, [data]);

  const addInventario = (values) => {
    const elemento = {
      key: Math.random().toString(),
      data: values,
    };
    setdata((actualData) => {
      return [elemento, ...actualData];
    });
  };

  const save = async () => {
    localStorage.setItem("items", JSON.stringify(data));
  };
  const deleted = (key) => {
    alert("deleted");
    setdata(data.filter((item) => item.key !== key));
  };

  const state = (val) => {
    settemporal(val);
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
                onChange={props.handleChange("codigo")}
                value={props.values.codigo}
                className="input"
              />
              <h4 className="title">Nombre Producto</h4>
              <input
                onChange={props.handleChange("nombre")}
                value={props.values.nombre}
                className="input"
              />
              <h4 className="title">Precio</h4>
              <input
                onChange={props.handleChange("precio")}
                value={props.values.precio}
                className="input"
              />
              <h4 className="title">Stock</h4>
              <input
                onChange={props.handleChange("stock")}
                value={props.values.stock}
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
          <h4 className="pnl-title">Stock</h4>
        </div>
        {data.map((data) => (
          <ItemInventBox
            key={data.key}
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
