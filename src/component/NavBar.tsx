import { Link } from "react-router-dom";
import Types from "./Types";

//todo trouver les bon type pour les props

export default function NavBar({ mode, setMode }) {
  const toggleOnClick = () => {
    setMode(!mode);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/teambuilder">Équipe aléatoire</Link>
        </li>
        <li>
          <Types />
        </li>
        <li>
          <button onClick={toggleOnClick}>
            {mode ? "Dark Mode" : "Light Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
