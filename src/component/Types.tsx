import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PanelTopOpen, PanelTopClose } from "lucide-react";

export default function Types() {
  interface dataType {
    name: string;
    image: string;
  }

  const [dataType, setDataType] = useState<dataType[]>([]);
  const [show, setShow] = useState(false);

  const toggleOnClick = () => {
    setShow(!show);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  useEffect(() => {
    axios.get(`https://pokebuildapi.fr/api/v1/types`).then((response) => {
      setDataType(response.data);
    });
  }, []);

  return (
    <>
      <p className="type-nav">
        Types
        <button onClick={toggleOnClick} className="type-modal">
          {show === false ? <PanelTopOpen /> : <PanelTopClose />}
        </button>
      </p>
      {show && (
        <nav>
          <ul className="type-container">
            <Link to="/">
              <li className="type-card">
                <h2>Tous</h2>
                <img
                  src="../../public/pokeball.svg"
                  alt="Tous les types"
                  loading="lazy"
                />
              </li>
            </Link>
            {dataType?.map((t) => (
              <Link
                to={`/type/${t.name}`}
                key={t.name}
                onClick={handleLinkClick}
              >
                <li className="type-card">
                  <h2>{t.name}</h2>
                  <img src={t.image} alt={t.name} loading="lazy" />
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
