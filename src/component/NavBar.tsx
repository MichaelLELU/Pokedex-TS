import { Link } from "react-router-dom";
import { Sun, Moon, Dices, House } from "lucide-react";
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
          <Link to="/">
            Home <House />
          </Link>
        </li>
        <li>
          <Link to="/teambuilder">
            Équipe aléatoire <Dices />
          </Link>
        </li>
        <li>
          <Types />
        </li>
        <li>
          <button onClick={toggleOnClick} className="light-dark">
            {mode ? <Moon /> : <Sun />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
