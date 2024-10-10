import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Dices, House } from "lucide-react";
import Types from "./Types";

interface NavBarProps {
  mode: boolean;
  setMode: (mode: boolean) => void;
}

export default function NavBar({ mode, setMode }: NavBarProps) {
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const navigate = useNavigate();
  const toggleOnClick = () => {
    setMode(!mode);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGeneration(value);
    if (value) navigate(value);
  };

  return (
    <>
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
            <label className="nav-link">
              Générations
              <select
                onChange={handleChange}
                value={selectedGeneration}
                className="styled-select"
              >
                <option value="">-- --</option>
                <option value="/generation/1">1 (Kanto)</option>
                <option value="/generation/2">2 (Johto)</option>
                <option value="/generation/3">3 (Hoenn)</option>
                <option value="/generation/4">4 (Sinnoh)</option>
                <option value="/generation/5">5 (Unys)</option>
                <option value="/generation/6">6 (Kalos)</option>
                <option value="/generation/7">7 (Alola)</option>
                <option value="/generation/8">8 (Galar)</option>
              </select>
            </label>
          </li>
          <li>
            <Types />
          </li>
        </ul>
      </nav>
      <button onClick={toggleOnClick} className="light-dark">
        {mode ? <Moon /> : <Sun />}
      </button>
    </>
  );
}
