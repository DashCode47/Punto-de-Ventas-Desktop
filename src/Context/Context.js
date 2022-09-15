import React, { createContext, useState, useContext } from "react";

export const MyContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [misCompras, setmisCompras] = useState(
    JSON.parse(localStorage.getItem("compras")) || []
  );

  const [ventaInfo, setventaInfo] = useState(
    JSON.parse(localStorage.getItem("ventas")) || []
  );

  const onDelete = (key) => {
    setdata(data.filter((data) => data.key !== key));
  };

  const onEdit = (updated, key) => {
    updated.key = Math.random().toString();
    setdata(data.map((item) => (item.key === key ? updated : item)));
  };

  return (
    <MyContext.Provider
      value={{
        data,
        setdata,
        onEdit,
        onDelete,
        ventaInfo,
        setventaInfo,
        misCompras,
        setmisCompras,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
