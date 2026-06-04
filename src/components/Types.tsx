import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PanelTopOpen, PanelTopClose } from "lucide-react";

export default function Types() {
interface PokemonTypeData {
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: string;
}

  const [dataType, setDataType] = useState<PokemonTypeData[]>([]);
  const [show, setShow] = useState(false);

  const toggleOnClick = () => {
    setShow(!show);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isTypeModal = target.closest(".type-modal");
      const isTypeContainer = target.closest(".type-container");

      if (!isTypeModal && !isTypeContainer) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios.get(`https://tyradex.app/api/v1/types`).then((response) => {
      setDataType(
  response.data.filter(
    (type: any) =>
    type.name?.fr &&
    type.name.fr !== "Inconnu"
        )
      );
    });
  }, []);

  return (
    <>
      <button onClick={toggleOnClick} className="type-modal">
        <p className="nav-link">
          {"Types "}
          {show === false ? <PanelTopOpen /> : <PanelTopClose />}
        </p>
      </button>
      {show && (
        <nav>
          <ul className="type-container">
            <Link to="/" onClick={handleLinkClick}>
              <li className="type-card">
                <h2>Tous</h2>
                <img src="/pokeball.svg" alt="Tous les types" loading="lazy" />
              </li>
            </Link>
            {dataType?.map((t) => (
              <Link
                to={`/type/${t.name.fr}`}
                onClick={handleLinkClick}
              >
                <li className="type-card">
                  <h2>{t.name.fr}</h2>
                  <img src={t.sprites} alt={t.name.fr} loading="lazy" />
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
