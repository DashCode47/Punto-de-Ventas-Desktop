import React, { useState, useContext } from "react";
import "../../App.css";
import { MyContext } from "../../Context/Context";

const TabsBox = ({ children, titulo, href }) => {
  const { stado } = useContext(MyContext);
  const { setstado } = useContext(MyContext);
  const { onChange } = useContext(MyContext);

  return (
    <a href={href} className="txt">
      {children}
      {titulo}
    </a>
  );
};
export default TabsBox;
