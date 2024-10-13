import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Dices, House, ChevronDown } from "lucide-react";
import { useMediaQuery } from "react-responsive";
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
    else navigate("/");
  };

  const toggleNavMenu = useMediaQuery({ query: "(max-width: 768px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        {toggleNavMenu && (
          <button
            type="button"
            /* @ts-expect-error popover api definitions are not yet available */
            popovertarget="menu"
            popovertargetaction="toggle"
            onClick={toggleMenu}
            className="menu-btn"
          >
            {"Menu "}
            <ChevronDown className={`menu-svg${isMenuOpen ? " open" : ""}`} />
          </button>
        )}
        <div id="menu" {...(toggleNavMenu ? { popover: "manual" } : {})}>
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
            <li>
              <button onClick={toggleOnClick} className="light-dark">
                {mode ? <Moon /> : <Sun />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
