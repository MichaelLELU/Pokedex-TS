import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./component/NavBar";
import BackToTopButton from "./component/backToTopButton/backToTopButton";
import { TeamProvider } from "./context/TeamContext";
import "./App.css";

function App() {
  const [mode, setMode] = useState(false) as [boolean, (mode: boolean) => void];

  return (
    <TeamProvider>
      {/* Wrapping the entire app in TeamProvider to provide team context */}
    <div className={mode === true ? "light" : "dark"}>
      <NavBar mode={mode} setMode={setMode} />
      <main>
        <Outlet />
        <BackToTopButton />
      </main>
    </div>
    </TeamProvider>
  );
}

export default App;
