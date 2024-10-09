import { Link } from "react-router-dom";
import { Sun, Moon, Dices, House } from "lucide-react";
import Types from "./Types";

interface NavBarProps {
  mode: boolean;
  setMode: (mode: boolean) => void;
}

export default function NavBar({ mode, setMode }: NavBarProps) {
  const toggleOnClick = () => {
    setMode(!mode);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home <House />
          </Link>
        </li>
        <li>
          <Link to="/teambuilder" className="nav-link">
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
