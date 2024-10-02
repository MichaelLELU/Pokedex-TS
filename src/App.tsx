import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./component/NavBar";
import "./App.css";

function App() {
  const [mode, setMode] = useState(false);

  return (
    <main className={mode === true ? "light" : "dark"}>
      <NavBar mode={mode} setMode={setMode} />
      <Outlet />
    </main>
  );
}

export default App;
