import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Inventarios from "../Screens/Registos/Inventarios/Inventarios";
import Compras from "../Screens/Registos/Compras/Compras";
import VentasTab from "../Screens/Registos/Ventas/VentasTab";
export default () => (
  <div className="tabs-container">
    <Tabs>
      <TabList>
        <Tab>Inventario</Tab>
        <Tab>Mis Compras</Tab>
        <Tab>Mis Ventas</Tab>
      </TabList>

      <TabPanel>
        <Inventarios />
      </TabPanel>
      <TabPanel>
        <Compras />
      </TabPanel>
      <TabPanel>
        <VentasTab />
      </TabPanel>
    </Tabs>
  </div>
);
