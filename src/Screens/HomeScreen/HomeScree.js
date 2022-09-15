import { FaHandPointLeft } from "react-icons/fa";
const HomeScreen = () => {
  return (
    <div className="home-container">
      <img
        src={require("../../icons/usher.png")}
        style={{ height: "150px", width: "150px" }}
      />
      <h1 style={{ color: "white" }}>Bienvenido Milton</h1>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <FaHandPointLeft style={{ fontSize: 70, color: "white" }} />
        <h3 style={{ color: "white" }}>
          Para empezar anade algunos productos al registro de inventarios
        </h3>
      </div>
    </div>
  );
};

export { HomeScreen };
