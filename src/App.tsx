import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./component/NavBar";
import "./App.css";

function App() {
  const [mode, setMode] = useState(false) as [boolean, (mode: boolean) => void];

  return (
    <div className={mode === true ? "light" : "dark"}>
      <NavBar mode={mode} setMode={setMode} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
