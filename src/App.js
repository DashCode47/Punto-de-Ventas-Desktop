import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./Screens/HomeScreen/HomeScree";
import { Ventas } from "./Screens/Ventas/Ventas";
import { Inventarios } from "./Screens/Registos/Inventarios/Inventarios";
import { Compras } from "./Screens/Compras/Compras";
import "./App.css";
import ContextProvider from "./Context/Context";
import { BiDollar } from "react-icons/bi";
import { BsFillCartDashFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import TabsBox from "./Components/TabsBox/TabBox";
import Tabs from "./Tabs/Tabs";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <div className="AppContain">
            <header className="App-header">
              <a href="/ventas" className="txt">
                <BiDollar style={{ color: "white", fontWeight: "bold" }} />
                Ventas
              </a>

              <a className="txt" href="/compras">
                <BsFillCartDashFill
                  style={{ color: "white", fontWeight: "bold" }}
                />
                Compras
              </a>
              <a className="txt" href="/invent">
                <FaClipboardList
                  style={{ color: "white", fontWeight: "bold" }}
                />
                Registros
              </a>
              <a className="txt" href="/">
                <GoHome style={{ color: "white", fontWeight: "bold" }} />
                Home
              </a>
            </header>

            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/invent" element={<Tabs />} />
              <Route path="/compras" element={<Compras />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
